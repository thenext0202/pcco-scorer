/**
 * 실습서(워크북) 메타데이터.
 *
 * 실습서는 단일 HTML 파일이다. `public/workbooks/{slug}.html` 에 두면
 * `next.config.ts` 의 rewrite 로 `/workbook/{slug}` 주소에서 그대로 열린다.
 *
 * 새 실습서 추가: ① public/workbooks/{slug}.html 복사 ② 아래 배열에 항목 추가. 끝.
 * (파일이 없으면 목록에서 자동으로 빠진다 — 죽은 링크 방지)
 */
export interface Workbook {
  /** 주소에 쓰이는 이름. 영문 소문자·하이픈만 — public/workbooks/{slug}.html 과 일치해야 한다 */
  slug: string;
  title: string;
  /** 카드에 보이는 한두 문장 소개 */
  summary: string;
  /** 분야 라벨 (예: 퍼포먼스 마케팅) */
  category: string;
  /** "실습 13개 · 약 7시간" 같은 분량 표시 */
  meta: string;
  tags: string[];
  /** 비밀번호 잠금 여부 — 카드에 자물쇠 표시만 한다. 실제 잠금은 HTML 파일 자체의 암호화가 담당 */
  locked: boolean;
}

export const workbooks: Workbook[] = [
  {
    slug: "performance",
    title: "AI 활용 퍼포먼스 마케팅 실습서",
    summary:
      "감으로 켜고 끄던 광고를 내 숫자로 판단하게 만듭니다. 영점 계산부터 지표 판독, 증액·감액, 보고, 자동화까지 실무 순서 그대로.",
    category: "퍼포먼스 마케팅",
    meta: "9개 장 · 실습 13개 · 약 7시간",
    tags: ["영점 계산기", "지표 판독", "프롬프트 23종", "Claude Code"],
    locked: true,
  },
];
