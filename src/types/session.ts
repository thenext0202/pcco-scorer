export interface Session {
  id: string;
  code: string;
  title: string;
  host_name: string | null;
  // prompt = R-PCCO (1차), instruction = I-MRKO (2차), image = SSDHR (3차), vibe = 바이브 코딩 (4차), reverse = 프롬프트 역설계 (10차)
  mode: "prompt" | "instruction" | "image" | "vibe" | "reverse";
  created_at: string;
  expires_at: string;
}

export interface Submission {
  id: string;
  session_id: string;
  nickname: string;
  prompt: string;
  total_score: number;
  grade: "S" | "A" | "B" | "C" | "D" | "F";
  elements_json: {
    role: { score: number };
    purpose: { score: number };
    context: { score: number };
    constraints: { score: number };
    output: { score: number };
  };
  created_at: string;
}

// R-PCCO 프롬프트 채점 리더보드 엔트리
export interface PromptLeaderboardEntry {
  rank: number;
  id: string;
  nickname: string;
  total_score: number;
  grade: "S" | "A" | "B" | "C" | "D" | "F";
  mode: "prompt";
  elements: {
    role: number;
    purpose: number;
    context: number;
    constraints: number;
    output: number;
  };
  created_at: string;
  attempts?: number;      // 총 제출 횟수 (재제출 집계, 11차~)
  improvement?: number;   // 첫 제출 대비 최고점 상승폭 ("오늘의 성장왕")
}

// I-MRKO 지침 채점 리더보드 엔트리
export interface InstructionLeaderboardEntry {
  rank: number;
  id: string;
  nickname: string;
  total_score: number;
  grade: "S" | "A" | "B" | "C" | "D" | "F";
  mode: "instruction";
  elements: {
    identity: number;
    mission: number;
    rules: number;
    knowledge: number;
    output: number;
  };
  created_at: string;
  attempts?: number;      // 총 제출 횟수 (재제출 집계, 11차~)
  improvement?: number;   // 첫 제출 대비 최고점 상승폭 ("오늘의 성장왕")
}

// SSDHR 이미지 프롬프트 채점 리더보드 엔트리 (3차 강의)
export interface ImageLeaderboardEntry {
  rank: number;
  id: string;
  nickname: string;
  total_score: number;
  grade: "S" | "A" | "B" | "C" | "D" | "F";
  mode: "image";
  elements: {
    scene: number;
    style: number;
    detail: number;
    hard: number;
    reality: number;
  };
  created_at: string;
  attempts?: number;      // 총 제출 횟수 (재제출 집계, 11차~)
  improvement?: number;   // 첫 제출 대비 최고점 상승폭 ("오늘의 성장왕")
}

// 바이브 코딩 5요소 채점 리더보드 엔트리 (4차 강의 — R-PCCO 코딩 응용)
// elements 키는 prompt와 동일하지만 mode 필드로 구분
export interface VibeLeaderboardEntry {
  rank: number;
  id: string;
  nickname: string;
  total_score: number;
  grade: "S" | "A" | "B" | "C" | "D" | "F";
  mode: "vibe";
  elements: {
    role: number;
    purpose: number;
    context: number;
    constraints: number;
    output: number;
  };
  created_at: string;
  attempts?: number;      // 총 제출 횟수 (재제출 집계, 11차~)
  improvement?: number;   // 첫 제출 대비 최고점 상승폭 ("오늘의 성장왕")
}

// 프롬프트 역설계 채점 리더보드 엔트리 (10차 강의)
// ★ 다른 모드와 달리 4축 × 25점 구조 (요소당 만점 25)
export interface ReverseLeaderboardEntry {
  rank: number;
  id: string;
  nickname: string;
  total_score: number;
  grade: "S" | "A" | "B" | "C" | "D" | "F";
  mode: "reverse";
  elements: {
    observe: number;
    spec: number;
    edge: number;
    structure: number;
  };
  created_at: string;
  attempts?: number;      // 총 제출 횟수 (재제출 집계, 11차~)
  improvement?: number;   // 첫 제출 대비 최고점 상승폭 ("오늘의 성장왕")
}

// 통합 타입
export type LeaderboardEntry =
  | PromptLeaderboardEntry
  | InstructionLeaderboardEntry
  | ImageLeaderboardEntry
  | VibeLeaderboardEntry
  | ReverseLeaderboardEntry;
