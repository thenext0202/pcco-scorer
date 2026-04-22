export interface ScoreElement {
  score: number; // 0, 5, 10, 15, 20
  level: string; // "none" | "vague" | "basic" | "good" | "excellent" 등
  detected: string | null; // 감지된 원문 발췌
  feedback: string; // 한 줄 피드백
}

export interface ScoreResult {
  total_score: number;
  grade: "S" | "A" | "B" | "C" | "D" | "F";
  elements: {
    role: ScoreElement;
    purpose: ScoreElement;
    context: ScoreElement;
    constraints: ScoreElement;
    output: ScoreElement;
  };
  bonuses: Array<{ type: string; points: number; reason: string }>;
  penalties: Array<{ type: string; points: number; reason: string }>;
  strengths: string[];
  improvements: string[];
  improved_example: string;
}
