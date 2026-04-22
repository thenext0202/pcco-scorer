export interface Session {
  id: string;
  code: string;
  title: string;
  host_name: string | null;
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

export interface LeaderboardEntry {
  rank: number;
  id: string;
  nickname: string;
  total_score: number;
  grade: "S" | "A" | "B" | "C" | "D" | "F";
  elements: {
    role: number;
    purpose: number;
    context: number;
    constraints: number;
    output: number;
  };
  created_at: string;
}
