import type { ScoreResult } from "@/types/score";

/**
 * 더미 채점 함수
 * Phase 4에서 실제 Claude API 호출로 교체될 예정
 *
 * @param prompt - 사용자가 입력한 프롬프트
 * @returns 모의 채점 결과
 */
export function getMockScore(prompt: string): ScoreResult {
  const length = prompt.length;

  // 입력 길이에 따른 기본 점수 계산
  let baseScore: number;
  let grade: "S" | "A" | "B" | "C" | "D" | "F";

  if (length < 30) {
    baseScore = 20;
    grade = "F";
  } else if (length < 100) {
    baseScore = 45;
    grade = "D";
  } else if (length < 250) {
    baseScore = 65;
    grade = "C";
  } else if (length < 400) {
    baseScore = 82;
    grade = "B";
  } else {
    baseScore = 95;
    grade = "A";
  }

  // 더미 데이터 생성
  const mockResult: ScoreResult = {
    total_score: baseScore,
    grade: grade,
    elements: {
      role: {
        score: length < 30 ? 0 : length < 100 ? 10 : 15,
        level: length < 30 ? "none" : length < 100 ? "basic" : "good",
        detected: length >= 30 ? prompt.substring(0, 30) + "..." : null,
        feedback: length < 30
          ? "역할이 명시되지 않았습니다."
          : "역할이 비교적 명확합니다.",
      },
      purpose: {
        score: length < 50 ? 5 : length < 150 ? 10 : 15,
        level: length < 50 ? "vague" : length < 150 ? "basic" : "good",
        detected: length >= 50 ? prompt.substring(0, 40) + "..." : null,
        feedback: length < 50
          ? "목적이 모호합니다."
          : "목적이 어느 정도 드러납니다.",
      },
      context: {
        score: length < 100 ? 5 : length < 250 ? 15 : 20,
        level: length < 100 ? "vague" : length < 250 ? "good" : "excellent",
        detected: length >= 100 ? "맥락 정보 포함됨" : null,
        feedback: length < 100
          ? "배경 맥락이 부족합니다."
          : "충분한 맥락 정보가 제공되었습니다.",
      },
      constraints: {
        score: length < 150 ? 0 : length < 300 ? 10 : 15,
        level: length < 150 ? "none" : length < 300 ? "basic" : "good",
        detected: length >= 150 ? "제약사항 일부 포함" : null,
        feedback: length < 150
          ? "제약 조건이 명시되지 않았습니다."
          : "제약사항이 포함되어 있습니다.",
      },
      output: {
        score: length < 200 ? 10 : 20,
        level: length < 200 ? "basic" : "excellent",
        detected: length >= 200 ? "출력 형식 언급됨" : null,
        feedback: length < 200
          ? "출력 형식을 더 구체적으로 명시하세요."
          : "출력 형식이 명확합니다.",
      },
    },
    bonuses: length > 300
      ? [
          { type: "detail", points: 5, reason: "상세한 설명이 포함됨" },
          { type: "structure", points: 3, reason: "구조화된 프롬프트" }
        ]
      : [],
    penalties: length < 50
      ? [{ type: "too_short", points: -5, reason: "너무 짧은 프롬프트" }]
      : [],
    strengths: length < 100
      ? ["간결함"]
      : [
          "역할과 목적이 명확함",
          "충분한 맥락 정보 제공",
          "구조화된 프롬프트"
        ],
    improvements: length < 100
      ? [
          "역할을 더 구체적으로 명시하세요",
          "목적과 기대 결과를 추가하세요",
          "맥락 정보를 보강하세요",
          "제약 조건을 명확히 하세요"
        ]
      : length < 250
      ? [
          "제약 조건을 추가하세요",
          "출력 형식을 더 상세히 명시하세요"
        ]
      : [
          "예시를 추가하면 더욱 좋습니다"
        ],
    improved_example: length < 100
      ? `너는 10년차 마케팅 전문가야. 신제품 런칭을 앞두고 있는 스타트업의 SNS 마케팅 전략을 수립해줘.

[맥락]
- 타겟: 2030 여성
- 예산: 월 300만원
- 제품: 친환경 화장품

[제약]
- 인플루언서 마케팅 필수 포함
- 3개월 단위 계획

[출력]
마크다운 표 형식으로 월별 실행 계획 작성`
      : prompt + "\n\n+ 위 내용에 구체적인 예시나 수치를 추가하면 더욱 완벽합니다.",
  };

  return mockResult;
}
