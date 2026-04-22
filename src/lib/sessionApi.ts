import { supabase } from "./supabase";
import type { Session, Submission, LeaderboardEntry } from "@/types/session";
import type { ScoreResult } from "@/types/score";

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
  hostName?: string
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
  result: ScoreResult
): Promise<Submission> {
  const { data, error } = await supabase
    .from("submissions")
    .insert({
      session_id: sessionId,
      nickname: nickname.trim(),
      prompt,
      total_score: result.total_score,
      grade: result.grade,
      elements_json: {
        role: { score: result.elements.role.score },
        purpose: { score: result.elements.purpose.score },
        context: { score: result.elements.context.score },
        constraints: { score: result.elements.constraints.score },
        output: { score: result.elements.output.score },
      },
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
 */
export async function getLeaderboard(
  sessionId: string,
  limit: number = 10
): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("session_id", sessionId)
    .order("total_score", { ascending: false })
    .order("created_at", { ascending: true }) // 동점일 경우 먼저 제출한 사람 우선
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch leaderboard: ${error.message}`);
  }

  const submissions = data as Submission[];

  return submissions.map((sub, index) => ({
    rank: index + 1,
    id: sub.id,
    nickname: sub.nickname,
    total_score: sub.total_score,
    grade: sub.grade,
    elements: {
      role: sub.elements_json.role.score,
      purpose: sub.elements_json.purpose.score,
      context: sub.elements_json.context.score,
      constraints: sub.elements_json.constraints.score,
      output: sub.elements_json.output.score,
    },
    created_at: sub.created_at,
  }));
}
