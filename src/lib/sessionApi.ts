import { supabase } from "./supabase";
import type { Session, Submission, LeaderboardEntry } from "@/types/session";
import type { AnyScoreResult } from "@/types/score";
import {
  isInstructionScore,
  isImageScore,
  isReverseScore,
} from "@/types/score";

/**
 * 4자리 랜덤 코드 생성 (I, O, 1, 0 제외)
 * 혼동하기 쉬운 문자를 제외한 대문자 알파벳과 숫자
 */
export function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // I, O, 1, 0 제외
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * 새 세션 생성
 * 코드 중복 시 최대 3회 재시도
 */
export async function createSession(
  title: string,
  hostName?: string,
  mode: "prompt" | "instruction" | "image" | "vibe" | "reverse" = "prompt"
): Promise<{ session: Session; code: string }> {
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    const code = generateCode();

    const { data, error } = await supabase
      .from("sessions")
      .insert({
        code,
        title,
        host_name: hostName || null,
        mode,
      })
      .select()
      .single();

    if (error) {
      // 중복 코드 에러인 경우 재시도
      if (error.code === "23505") {
        attempts++;
        continue;
      }
      throw new Error(`Failed to create session: ${error.message}`);
    }

    return { session: data as Session, code };
  }

  throw new Error("Failed to generate unique session code after 3 attempts");
}

/**
 * 코드로 세션 조회
 * 만료 여부 확인 포함
 */
export async function getSessionByCode(
  code: string
): Promise<{ session: Session; isExpired: boolean } | null> {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("code", code.toUpperCase())
    .single();

  if (error || !data) {
    return null;
  }

  const session = data as Session;
  const isExpired = new Date(session.expires_at) < new Date();

  return { session, isExpired };
}

/**
 * 점수 제출
 */
export async function submitScore(
  sessionId: string,
  nickname: string,
  prompt: string,
  result: AnyScoreResult
): Promise<Submission> {
  // 결과 타입에 따라 elements_json 구성
  let elements_json: Record<string, { score: number }>;
  if (isInstructionScore(result)) {
    elements_json = {
      identity: { score: result.elements.identity.score },
      mission: { score: result.elements.mission.score },
      rules: { score: result.elements.rules.score },
      knowledge: { score: result.elements.knowledge.score },
      output: { score: result.elements.output.score },
    };
  } else if (isImageScore(result)) {
    elements_json = {
      scene: { score: result.elements.scene.score },
      style: { score: result.elements.style.score },
      detail: { score: result.elements.detail.score },
      hard: { score: result.elements.hard.score },
      reality: { score: result.elements.reality.score },
    };
  } else if (isReverseScore(result)) {
    // 역설계 모드 (10차) — 4축 × 25점
    elements_json = {
      observe: { score: result.elements.observe.score },
      spec: { score: result.elements.spec.score },
      edge: { score: result.elements.edge.score },
      structure: { score: result.elements.structure.score },
    };
  } else {
    // prompt 또는 vibe 모드 — elements 키 구조가 동일하므로 같이 처리
    // (모드 구분은 sessions.mode 필드와 getLeaderboard 호출 시 mode 인자로 함)
    elements_json = {
      role: { score: result.elements.role.score },
      purpose: { score: result.elements.purpose.score },
      context: { score: result.elements.context.score },
      constraints: { score: result.elements.constraints.score },
      output: { score: result.elements.output.score },
    };
  }

  const { data, error } = await supabase
    .from("submissions")
    .insert({
      session_id: sessionId,
      nickname: nickname.trim(),
      prompt,
      total_score: result.total_score,
      grade: result.grade,
      elements_json,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to submit score: ${error.message}`);
  }

  return data as Submission;
}

/**
 * 리더보드 조회 (상위 N명)
 *
 * ★ 재제출 허용 (11차~, 초급반 "쏘고→읽고→고친다" 루프):
 * submitScore는 매번 insert하므로 한 사람이 여러 행을 가질 수 있다.
 * 여기서 닉네임별 최고점 1행으로 집계한다 — 클라이언트 집계라 DB 마이그레이션 불필요.
 * attempts(제출 횟수)와 improvement(첫 제출 대비 상승폭, "오늘의 성장왕")를 함께 계산.
 */
export async function getLeaderboard(
  sessionId: string,
  mode: "prompt" | "instruction" | "image" | "vibe" | "reverse",
  limit: number = 10
): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true }); // 시간순 전체 조회 — 첫 제출/최고점 판정용

  if (error) {
    throw new Error(`Failed to fetch leaderboard: ${error.message}`);
  }

  const all = data as Submission[];

  // 닉네임별 집계: 최고점 행 + 첫 제출 행 + 제출 횟수
  const byNickname = new Map<
    string,
    { best: Submission; first: Submission; attempts: number }
  >();
  for (const sub of all) {
    const key = sub.nickname.trim();
    const agg = byNickname.get(key);
    if (!agg) {
      byNickname.set(key, { best: sub, first: sub, attempts: 1 });
    } else {
      agg.attempts += 1;
      // 시간순 순회이므로 동점이면 먼저 제출한 행이 유지된다
      if (sub.total_score > agg.best.total_score) {
        agg.best = sub;
      }
    }
  }

  const ranked = Array.from(byNickname.values())
    .sort(
      (a, b) =>
        b.best.total_score - a.best.total_score ||
        new Date(a.best.created_at).getTime() -
          new Date(b.best.created_at).getTime() // 동점일 경우 먼저 제출한 사람 우선
    )
    .slice(0, limit);

  return ranked.map(({ best: sub, first, attempts }, index) => {
    const extras = {
      attempts,
      improvement: sub.total_score - first.total_score,
    };
    // elements_json은 JSONB라서 런타임에 다양한 구조를 가질 수 있음
    const elementsJson = sub.elements_json as Record<
      string,
      { score: number }
    >;

    if (mode === "instruction") {
      return {
        rank: index + 1,
        id: sub.id,
        nickname: sub.nickname,
        total_score: sub.total_score,
        grade: sub.grade,
        mode: "instruction" as const,
        elements: {
          identity: elementsJson.identity?.score ?? 0,
          mission: elementsJson.mission?.score ?? 0,
          rules: elementsJson.rules?.score ?? 0,
          knowledge: elementsJson.knowledge?.score ?? 0,
          output: elementsJson.output?.score ?? 0,
        },
        created_at: sub.created_at,
        ...extras,
      };
    } else if (mode === "image") {
      return {
        rank: index + 1,
        id: sub.id,
        nickname: sub.nickname,
        total_score: sub.total_score,
        grade: sub.grade,
        mode: "image" as const,
        elements: {
          scene: elementsJson.scene?.score ?? 0,
          style: elementsJson.style?.score ?? 0,
          detail: elementsJson.detail?.score ?? 0,
          hard: elementsJson.hard?.score ?? 0,
          reality: elementsJson.reality?.score ?? 0,
        },
        created_at: sub.created_at,
        ...extras,
      };
    } else if (mode === "reverse") {
      return {
        rank: index + 1,
        id: sub.id,
        nickname: sub.nickname,
        total_score: sub.total_score,
        grade: sub.grade,
        mode: "reverse" as const,
        elements: {
          observe: elementsJson.observe?.score ?? 0,
          spec: elementsJson.spec?.score ?? 0,
          edge: elementsJson.edge?.score ?? 0,
          structure: elementsJson.structure?.score ?? 0,
        },
        created_at: sub.created_at,
        ...extras,
      };
    } else if (mode === "vibe") {
      return {
        rank: index + 1,
        id: sub.id,
        nickname: sub.nickname,
        total_score: sub.total_score,
        grade: sub.grade,
        mode: "vibe" as const,
        elements: {
          role: elementsJson.role?.score ?? 0,
          purpose: elementsJson.purpose?.score ?? 0,
          context: elementsJson.context?.score ?? 0,
          constraints: elementsJson.constraints?.score ?? 0,
          output: elementsJson.output?.score ?? 0,
        },
        created_at: sub.created_at,
        ...extras,
      };
    } else {
      return {
        rank: index + 1,
        id: sub.id,
        nickname: sub.nickname,
        total_score: sub.total_score,
        grade: sub.grade,
        mode: "prompt" as const,
        elements: {
          role: elementsJson.role?.score ?? 0,
          purpose: elementsJson.purpose?.score ?? 0,
          context: elementsJson.context?.score ?? 0,
          constraints: elementsJson.constraints?.score ?? 0,
          output: elementsJson.output?.score ?? 0,
        },
        created_at: sub.created_at,
        ...extras,
      };
    }
  });
}
