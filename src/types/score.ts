export interface ScoreElement {
  score: number; // 0, 5, 10, 15, 20
  level: string; // "none" | "vague" | "basic" | "good" | "excellent" 등
  detected: string | null; // 감지된 원문 발췌
  feedback: string; // 한 줄 피드백
}

// R-PCCO 프롬프트 채점 결과 (1차 강의)
export interface PromptScoreResult {
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

// 하위 호환: 기존 코드가 ScoreResult를 사용하는 경우
export type ScoreResult = PromptScoreResult;

// I-MRKO 지침 채점 결과 (2차 강의)
export interface InstructionScoreResult {
  total_score: number;
  grade: "S" | "A" | "B" | "C" | "D" | "F";
  elements: {
    identity: ScoreElement;
    mission: ScoreElement;
    rules: ScoreElement;
    knowledge: ScoreElement;
    output: ScoreElement;
  };
  bonuses: Array<{ type: string; points: number; reason: string }>;
  penalties: Array<{ type: string; points: number; reason: string }>;
  strengths: string[];
  improvements: string[];
  improved_example: string;
}

// 통합 타입 (API 분기용)
export type AnyScoreResult = PromptScoreResult | InstructionScoreResult;

// 모드 구분 유틸리티
export function isInstructionScore(
  r: AnyScoreResult
): r is InstructionScoreResult {
  return "identity" in r.elements;
}
