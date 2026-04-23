export interface Session {
  id: string;
  code: string;
  title: string;
  host_name: string | null;
  mode: "prompt" | "instruction"; // prompt = R-PCCO, instruction = I-MRKO
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
}

// 통합 타입
export type LeaderboardEntry =
  | PromptLeaderboardEntry
  | InstructionLeaderboardEntry;
