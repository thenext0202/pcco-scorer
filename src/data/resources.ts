// 강의 부록 자료실 데이터
//
// 실제 파일은 public/downloads/<차수키>/ 아래에 있다. (예: public/downloads/c11/slides.pdf)
// 디스크에는 ASCII 파일명으로 두고, 수강생이 받을 때의 한글 파일명은 downloadName으로 지정한다.
// (같은 도메인에서 서빙되므로 <a download="..."> 가 그대로 먹힌다)
//
// ⚠️ 절대 금지 — 강사 전용 자료는 여기에 넣지 말 것:
//    기획안 / 인수인계 / 해부 정답지 / 채점기준표 / 구조지도 강사원본
//    특히 10차 채점기준표는 진단·분반 오염 위험이 있다.
//
// 파일 용량은 하드코딩하지 않는다 — /downloads 페이지가 빌드 시점에 실제 파일을 읽어 계산한다.
// 파일이 없으면 그 항목은 자동으로 목록에서 빠지므로 죽은 링크가 생기지 않는다.

export type ResourceKind = "pdf" | "docx" | "zip" | "txt" | "md";

export interface ResourceItem {
  /** public 폴더 기준 경로 (그대로 href로 사용) */
  file: string;
  /** 수강생 PC에 저장될 파일명 */
  downloadName: string;
  title: string;
  description: string;
  kind: ResourceKind;
}

export interface ResourceGroup {
  /** content.ts의 courses[].id 와 동일 — 랜딩 복습 섹션 앵커로 사용 */
  courseId: string;
  /** "6차" 처럼 짧은 배지 라벨 */
  label: string;
  title: string;
  framework: string;
  items: ResourceItem[];
}

export const resourceGroups: ResourceGroup[] = [
  {
    courseId: "course-1",
    label: "1차",
    title: "AI의 프롬프트란?",
    framework: "R-PCCO",
    items: [
      {
        file: "/downloads/c01/slides.pdf",
        downloadName: "1강_AI프롬프트_슬라이드.pdf",
        title: "슬라이드",
        description: "역할·목적·맥락·제약·출력 다섯 칸을 짚는 수업 슬라이드 전체",
        kind: "pdf",
      },
    ],
  },
  {
    courseId: "course-2",
    label: "2차",
    title: "AI의 지침이란?",
    framework: "I-MRKO",
    items: [
      {
        file: "/downloads/c02/slides.pdf",
        downloadName: "2강_AI지침_슬라이드.pdf",
        title: "슬라이드",
        description: "한 번 세팅하고 평생 쓰는 지침 설계 — 수업 슬라이드 전체",
        kind: "pdf",
      },
    ],
  },
  {
    courseId: "course-3",
    label: "3차",
    title: "이미지 프롬프트 설계 가이드",
    framework: "SSDHR",
    items: [
      {
        file: "/downloads/c03/slides.pdf",
        downloadName: "3강_이미지프롬프트_슬라이드.pdf",
        title: "슬라이드",
        description: "설명이 아니라 제어 시스템 — 9단 구조 수업 슬라이드 전체",
        kind: "pdf",
      },
    ],
  },
  {
    courseId: "course-4",
    label: "4차",
    title: "바이브 코딩이란?",
    framework: "R-PCCO (코딩 응용판)",
    items: [
      {
        file: "/downloads/c04/slides.pdf",
        downloadName: "4강_바이브코딩_슬라이드.pdf",
        title: "슬라이드",
        description: "AI한테 묘사하면 앱이 된다 — 수업 슬라이드 전체",
        kind: "pdf",
      },
    ],
  },
  {
    courseId: "course-5",
    label: "5차",
    title: "AI 자동화 이해",
    framework: "BATLR",
    items: [
      {
        file: "/downloads/c05/slides.pdf",
        downloadName: "5강_AI자동화이해_슬라이드.pdf",
        title: "슬라이드",
        description: "쪼개기·에셋화·도구·연결·기록 5단계 수업 슬라이드 전체",
        kind: "pdf",
      },
    ],
  },
  {
    courseId: "course-6",
    label: "6차",
    title: "Claude Code 실전",
    framework: "빌드 5단계",
    items: [
      {
        file: "/downloads/c06/slides.pdf",
        downloadName: "6강_ClaudeCode실전_슬라이드.pdf",
        title: "슬라이드",
        description: "수업에서 띄운 슬라이드 전체",
        kind: "pdf",
      },
      {
        file: "/downloads/c06/prompts.txt",
        downloadName: "6강_실습_프롬프트모음.txt",
        title: "실습 프롬프트 모음",
        description: "라이브에서 그대로 복붙해 쓴 프롬프트만 모은 파일",
        kind: "txt",
      },
      {
        file: "/downloads/c06/practice-commands.md",
        downloadName: "6강_따라하기_명령어.md",
        title: "따라 하기 명령어",
        description: "설치부터 실행까지 순서대로 적힌 실습 진행표",
        kind: "md",
      },
      {
        file: "/downloads/c06/standard-structure-guide.md",
        downloadName: "6강_표준구조_가이드.md",
        title: "표준 구조 가이드",
        description: "어떤 프로젝트든 이 뼈대로 — 폴더·문패 표준안",
        kind: "md",
      },
      {
        file: "/downloads/c06/practice-files.zip",
        downloadName: "6강_실습_연습파일.zip",
        title: "실습용 연습 파일",
        description: "이름이 엉망인 파일 30여 개 — 이름 변경기를 돌려볼 재료",
        kind: "zip",
      },
      {
        file: "/downloads/c06/sample-app.zip",
        downloadName: "6강_완성샘플_파일이름변경기.zip",
        title: "완성 샘플 — 파일 이름 변경기",
        description: "강의에서 만든 도구의 완성본 전체 소스",
        kind: "zip",
      },
    ],
  },
  {
    courseId: "course-7",
    label: "7차",
    title: "잘 짠 앱을 '내 앱'으로 (PWA)",
    framework: "PWA 5요소",
    items: [
      {
        file: "/downloads/c07/slides.pdf",
        downloadName: "7강_PWA_슬라이드.pdf",
        title: "슬라이드",
        description: "수업에서 띄운 슬라이드 전체",
        kind: "pdf",
      },
      {
        file: "/downloads/c07/todo-app.zip",
        downloadName: "7강_할일앱_실습_배포본.zip",
        title: "할 일 앱 실습 배포본",
        description: "레이어 4겹으로 잘 짜인 완성 PWA — 받아서 바로 개조 시작",
        kind: "zip",
      },
    ],
  },
  {
    courseId: "course-8",
    label: "8차",
    title: "자동화 설계 — 실전 공장을 해부하다",
    framework: "PILOT",
    items: [
      {
        file: "/downloads/c08/slides.pdf",
        downloadName: "8강_자동화설계_슬라이드.pdf",
        title: "슬라이드",
        description: "수업에서 띄운 슬라이드 전체",
        kind: "pdf",
      },
      {
        file: "/downloads/c08/design-template.docx",
        downloadName: "8강_내자동화_설계도_템플릿.docx",
        title: "내 자동화 설계도 템플릿",
        description: "PILOT 다섯 칸 빈 양식 — 내 자동화를 한 장으로",
        kind: "docx",
      },
    ],
  },
  {
    courseId: "course-9",
    label: "9차",
    title: "진짜 서비스 만들기 — 심리테스트",
    framework: "살아있는 서비스 5요소",
    items: [
      {
        file: "/downloads/c09/slides.pdf",
        downloadName: "9강_진짜서비스_슬라이드.pdf",
        title: "슬라이드",
        description: "수업에서 띄운 슬라이드 전체",
        kind: "pdf",
      },
      {
        file: "/downloads/c09/planning-prompt.txt",
        downloadName: "9강_테스트기획_프롬프트.txt",
        title: "테스트 기획 프롬프트",
        description: "내 심리테스트 문항·결과를 뽑아내는 출발 프롬프트",
        kind: "txt",
      },
      {
        file: "/downloads/c09/backend-kit.zip",
        downloadName: "9강_백엔드키트.zip",
        title: "백엔드 키트",
        description: "db.js 계약 3함수 · CLAUDE.md 규칙서 · Supabase SQL · 참고 샘플",
        kind: "zip",
      },
    ],
  },
  {
    courseId: "course-10",
    label: "10차",
    title: "거꾸로 만들기 — 한 방 프롬프트 역설계",
    framework: "역설계 3단계",
    items: [
      {
        file: "/downloads/c10/slides.pdf",
        downloadName: "10강_거꾸로만들기_슬라이드.pdf",
        title: "슬라이드",
        description: "수업에서 띄운 슬라이드 전체",
        kind: "pdf",
      },
      {
        file: "/downloads/c10/observation-worksheet.docx",
        downloadName: "10강_관찰워크시트.docx",
        title: "관찰 워크시트",
        description: "완성 프로그램을 뜯어보며 채우는 관찰 기록지",
        kind: "docx",
      },
      {
        file: "/downloads/c10/prompt-sheet.docx",
        downloadName: "10강_프롬프트작성지.docx",
        title: "한 방 프롬프트 작성지",
        description: "관찰한 내용을 프롬프트 한 편으로 옮겨 적는 양식",
        kind: "docx",
      },
    ],
  },
  {
    courseId: "course-11",
    label: "11차",
    title: "그린다 — 머릿속에 구조를 그리는 법",
    framework: "레이어 4겹",
    items: [
      {
        file: "/downloads/c11/slides.pdf",
        downloadName: "11강_구조그리기_슬라이드.pdf",
        title: "슬라이드",
        description: "수업에서 띄운 슬라이드 전체",
        kind: "pdf",
      },
      {
        file: "/downloads/c11/structure-worksheet.docx",
        downloadName: "11강_구조도_워크시트.docx",
        title: "구조도 워크시트",
        description: "데이터·동작·화면·연결 네 칸 빈 양식 — 소재 하나를 그려보는 용도",
        kind: "docx",
      },
    ],
  },
  {
    courseId: "course-12",
    label: "12차",
    title: "구조를 그린다 — 개발 세계의 지도",
    framework: "개발 지도 3층",
    items: [
      {
        file: "/downloads/c12/slides.pdf",
        downloadName: "12강_개발구조_슬라이드.pdf",
        title: "슬라이드",
        description: "수업에서 띄운 슬라이드 전체 (부록 「전체 지도 한 장」 포함)",
        kind: "pdf",
      },
      {
        file: "/downloads/c12/design-homework.docx",
        downloadName: "12강_설계지_숙제템플릿.docx",
        title: "설계지 (숙제 템플릿)",
        description: "내 앱 폴더 구조를 그리는 양식 — 작성 순서 5단계 + 완성 예시 포함",
        kind: "docx",
      },
      {
        file: "/downloads/c12/dev-glossary.docx",
        downloadName: "12강_개발용어사전.docx",
        title: "개발 용어 사전",
        description: "블록형 핸드북 — 브라우저·서버·API·DB를 처음부터 짚는 용어집",
        kind: "docx",
      },
    ],
  },
];
