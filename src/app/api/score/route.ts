import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { ScoreResultSchema } from "@/lib/scoreSchema";
import { SCORING_SYSTEM_PROMPT } from "@/lib/scoringPrompt";
import { checkRateLimit } from "@/lib/rateLimit";
import type { ScoreResult } from "@/types/score";

// Node Runtime 사용 (Edge Runtime 금지)
export const runtime = "nodejs";

// Anthropic API 키 검증
if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error(
    "ANTHROPIC_API_KEY is not set. Please add it to your .env.local file."
  );
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MIN_PROMPT_LENGTH = 30;
const MAX_PROMPT_LENGTH = 1000;

/**
 * 마크다운 코드 펜스 및 앞뒤 텍스트 제거, 순수 JSON만 추출
 */
function extractJSON(text: string): string {
  // 마크다운 ```json ... ``` 펜스 제거
  let cleaned = text.replace(/```json\s*/g, "").replace(/```\s*/g, "");

  // 첫 { 부터 마지막 } 까지만 추출
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("No valid JSON object found in response");
  }

  return cleaned.slice(firstBrace, lastBrace + 1);
}

/**
 * Claude API 호출 및 응답 파싱
 */
async function callClaudeAPI(
  prompt: string,
  retry: boolean = false
): Promise<ScoreResult> {
  const userMessage = retry
    ? `${prompt}\n\n중요: 반드시 유효한 JSON 형식으로만 응답하세요. 다른 텍스트는 포함하지 마세요.`
    : prompt;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000, // 복잡한 프롬프트 처리를 위해 증가
    temperature: 0.1, // JSON 안정성을 위해 더 낮게 조정
    system: SCORING_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  // 응답 텍스트 추출
  const responseText =
    message.content[0].type === "text" ? message.content[0].text : "";

  if (!responseText) {
    throw new Error("Empty response from Claude API");
  }

  // JSON 추출 및 파싱
  const jsonText = extractJSON(responseText);
  const parsed = JSON.parse(jsonText);

  // Zod 검증
  const validated = ScoreResultSchema.parse(parsed);

  return validated as ScoreResult;
}

/**
 * IP 주소 추출
 */
function getClientIP(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * POST /api/score
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const clientIP = getClientIP(request);

  try {
    // Rate Limit 체크
    const rateLimitResult = checkRateLimit(clientIP);
    if (!rateLimitResult.allowed) {
      const retryAfter = Math.ceil(
        (rateLimitResult.resetAt - Date.now()) / 1000
      );
      return NextResponse.json(
        {
          error: "요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.",
          code: "rate_limited",
          hint: `${retryAfter}초 후에 다시 시도하세요.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": retryAfter.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": new Date(
              rateLimitResult.resetAt
            ).toISOString(),
          },
        }
      );
    }

    // 요청 body 파싱
    let body: { prompt?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          error: "Invalid JSON body",
          code: "invalid_json",
        },
        { status: 400 }
      );
    }

    const { prompt } = body;

    // 입력 검증
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        {
          error: "prompt 필드가 필요합니다.",
          code: "invalid_input",
          hint: "요청 body에 { prompt: string } 형태로 전송하세요.",
        },
        { status: 400 }
      );
    }

    const trimmedPrompt = prompt.trim();

    if (trimmedPrompt.length < MIN_PROMPT_LENGTH) {
      return NextResponse.json(
        {
          error: `프롬프트가 너무 짧습니다. 최소 ${MIN_PROMPT_LENGTH}자 이상 입력해주세요.`,
          code: "too_short",
          hint: `현재 ${trimmedPrompt.length}자입니다.`,
        },
        { status: 400 }
      );
    }

    if (trimmedPrompt.length > MAX_PROMPT_LENGTH) {
      return NextResponse.json(
        {
          error: `프롬프트가 너무 깁니다. 최대 ${MAX_PROMPT_LENGTH}자까지 입력 가능합니다.`,
          code: "too_long",
          hint: `현재 ${trimmedPrompt.length}자입니다.`,
        },
        { status: 400 }
      );
    }

    // Claude API 호출 (재시도 포함)
    let result: ScoreResult;
    try {
      result = await callClaudeAPI(trimmedPrompt);
    } catch (firstError) {
      console.error("First attempt failed, retrying...", {
        error:
          firstError instanceof Error ? firstError.message : "Unknown error",
        promptLength: trimmedPrompt.length,
        ip: clientIP,
      });

      // 재시도
      try {
        result = await callClaudeAPI(trimmedPrompt, true);
      } catch (retryError) {
        console.error("Retry also failed", {
          error:
            retryError instanceof Error ? retryError.message : "Unknown error",
          promptLength: trimmedPrompt.length,
          ip: clientIP,
        });

        return NextResponse.json(
          {
            error: "채점 결과 파싱에 실패했습니다. 다시 시도해주세요.",
            code: "parsing_failed",
            hint: "잠시 후 다시 시도하거나, 프롬프트를 조금 수정해보세요.",
          },
          { status: 500 }
        );
      }
    }

    // 성공 로그 (프롬프트 본문은 로그 안 함)
    const duration = Date.now() - startTime;
    console.log("Scoring completed", {
      promptLength: trimmedPrompt.length,
      totalScore: result.total_score,
      grade: result.grade,
      duration: `${duration}ms`,
      ip: clientIP,
    });

    return NextResponse.json(result, {
      headers: {
        "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
        "X-Response-Time": `${duration}ms`,
      },
    });
  } catch (error) {
    // 예상하지 못한 에러
    console.error("Unexpected error in /api/score", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      ip: clientIP,
    });

    return NextResponse.json(
      {
        error: "서버 오류가 발생했습니다.",
        code: "internal_error",
        hint: "잠시 후 다시 시도해주세요.",
      },
      { status: 500 }
    );
  }
}
