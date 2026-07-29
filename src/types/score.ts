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

// SSDHR 이미지 프롬프트 채점 결과 (3차 강의)
// 가점 항목 중 JSON 자산화·레퍼런스 분리는 케이스에 따라 N/A 가능 (points: null)
export interface ImageScoreResult {
  total_score: number;
  grade: "S" | "A" | "B" | "C" | "D" | "F";
  elements: {
    scene: ScoreElement;
    style: ScoreElement;
    detail: ScoreElement;
    hard: ScoreElement;
    reality: ScoreElement;
  };
  bonuses: Array<{ type: string; points: number | null; reason: string }>;
  penalties: Array<{ type: string; points: number; reason: string }>;
  strengths: string[];
  improvements: string[];
  improved_example: string;
}

// 바이브 코딩 5요소 채점 결과 (4차 강의 — R-PCCO 코딩 응용)
// elements 키는 R-PCCO와 동일 (role/purpose/context/constraints/output)이지만
// 코딩 맥락에 특화된 평가 기준 적용. improved_example은 Claude Artifacts에
// 그대로 붙여넣으면 즉시 작동하는 앱이 나오는 완성형 프롬프트.
export interface VibeScoreResult {
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

// 프롬프트 역설계 채점 결과 (10차 강의 — IG 아카이버 한 방 프롬프트)
// 4축 × 25점 구조: observe(기능 관찰) · spec(명세 구체성) · edge(예외·제약 인식) · structure(프롬프트 구조)
// improved_example은 모범답안이 아니라 "스스로 더 관찰하게 만드는 질문 가이드"
// (답 유출 방지 — 미관찰 기능의 구체명 노출 금지)
export interface ReverseScoreResult {
  total_score: number;
  grade: "S" | "A" | "B" | "C" | "D" | "F";
  elements: {
    observe: ScoreElement; // 0~25
    spec: ScoreElement; // 0~25
    edge: ScoreElement; // 0~25
    structure: ScoreElement; // 0~25
  };
  bonuses: Array<{ type: string; points: number; reason: string }>;
  penalties: Array<{ type: string; points: number; reason: string }>;
  strengths: string[];
  improvements: string[];
  improved_example: string;
}

// 통합 타입 (API 분기용)
export type AnyScoreResult =
  | PromptScoreResult
  | InstructionScoreResult
  | ImageScoreResult
  | VibeScoreResult
  | ReverseScoreResult;

// 모드 구분 유틸리티
export function isInstructionScore(
  r: AnyScoreResult
): r is InstructionScoreResult {
  return "identity" in r.elements;
}

export function isImageScore(r: AnyScoreResult): r is ImageScoreResult {
  return "scene" in r.elements;
}

export function isReverseScore(r: AnyScoreResult): r is ReverseScoreResult {
  return "observe" in r.elements;
}

// VibeScoreResult는 PromptScoreResult와 elements 키가 동일하므로
// 호출자가 명시적으로 모드를 알려줘야 구분 가능.
// (런타임에 둘을 구별할 수 있는 형태적 차이가 없음 — 사용처에서 mode 파라미터로 분기)
