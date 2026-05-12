import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { VibeScoreResultSchema } from "@/lib/scoreSchema";
import { VIBE_SCORING_SYSTEM_PROMPT } from "@/lib/vibeScoringPrompt";
import { checkRateLimit } from "@/lib/rateLimit";
import type { VibeScoreResult } from "@/types/score";

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

// 바이브 코딩 프롬프트는 묘사형이라 일반 프롬프트와 비슷한 길이
const MIN_PROMPT_LENGTH = 20;
const MAX_PROMPT_LENGTH = 1500;

/**
 * 마크다운 코드 펜스 및 앞뒤 텍스트 제거, 순수 JSON만 추출
 */
function extractJSON(text: string): string {
  let cleaned = text.replace(/```[\w]*\s*/g, "").replace(/```\s*/g, "");
  cleaned = cleaned.trim();

  const firstBrace = cleaned.indexOf("{");
  if (firstBrace === -1) {
    throw new Error("No opening brace found in response");
  }

  let depth = 0;
  let lastBrace = -1;

  for (let i = firstBrace; i < cleaned.length; i++) {
    const char = cleaned[i];

    if (char === '"') {
      i++;
      while (i < cleaned.length && cleaned[i] !== '"') {
        if (cleaned[i] === "\\") i++;
        i++;
      }
      continue;
    }

    if (char === "{") {
      depth++;
    } else if (char === "}") {
      depth--;
      if (depth === 0) {
        lastBrace = i;
        break;
      }
    }
  }

  if (lastBrace === -1) {
    throw new Error("No matching closing brace found in response");
  }

  const extracted = cleaned.slice(firstBrace, lastBrace + 1);

  try {
    JSON.parse(extracted);
    return extracted;
  } catch (e) {
    throw new Error(
      `Extracted text is not valid JSON: ${e instanceof Error ? e.message : "Unknown error"}`
    );
  }
}

/**
 * Claude API 호출 및 응답 파싱 (바이브 코딩 5요소 채점)
 */
async function callClaudeAPI(
  prompt: string,
  retry: boolean = false
): Promise<VibeScoreResult> {
  const userMessage = retry
    ? `${prompt}\n\n중요: 반드시 유효한 JSON 형식으로만 응답하세요. 다른 텍스트는 포함하지 마세요.`
    : prompt;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    temperature: 0.1,
    system: VIBE_SCORING_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const responseText =
    message.content[0].type === "text" ? message.content[0].text : "";

  if (!responseText) {
    throw new Error("Empty response from Claude API");
  }

  const jsonText = extractJSON(responseText);
  const parsed = JSON.parse(jsonText);

  // Zod 검증
  const validated = VibeScoreResultSchema.parse(parsed);

  // total_score 재계산 (Claude의 계산 오류 방지)
  const elementsSum =
    validated.elements.role.score +
    validated.elements.purpose.score +
    validated.elements.context.score +
    validated.elements.constraints.score +
    validated.elements.output.score;

  // 가점 합계 최대 +8
  const bonusesSum = Math.min(
    validated.bonuses.reduce((sum, b) => sum + b.points, 0),
    8
  );

  // 감점 합계 최대 -10
  const penaltiesSum = Math.min(
    validated.penalties.reduce((sum, p) => sum + p.points, 0),
    10
  );

  const correctedTotal = Math.max(
    0,
    Math.min(100, elementsSum + bonusesSum - penaltiesSum)
  );

  return {
    ...validated,
    total_score: correctedTotal,
  } as VibeScoreResult;
}

function getClientIP(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * POST /api/score/vibe
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const clientIP = getClientIP(request);

  try {
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

    let body: { prompt?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body", code: "invalid_json" },
        { status: 400 }
      );
    }

    const { prompt } = body;

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

    let result: VibeScoreResult;
    try {
      result = await callClaudeAPI(trimmedPrompt);
    } catch (firstError) {
      console.error("First attempt failed, retrying...", {
        error:
          firstError instanceof Error ? firstError.message : "Unknown error",
        promptLength: trimmedPrompt.length,
        ip: clientIP,
      });

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

    const duration = Date.now() - startTime;
    console.log("Vibe coding scoring completed", {
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
    console.error("Unexpected error in /api/score/vibe", {
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
