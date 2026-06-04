// 강의 홍보 페이지 컨텐츠 데이터

export const heroContent = {
  title: "AI 활용 실전 시리즈",
  subtitle: "생각을 구조화하는 사람이 AI를 지배한다",
  tagline: "AI 시대 진짜 경쟁력은 AI의 성능이 아니라 당신의 설계력입니다",
  instructor: "정금구",
  ctas: [
    { text: "1차 강의 보기", href: "#course-1", variant: "primary" },
    { text: "2차 강의 보기", href: "#course-2", variant: "secondary" },
    { text: "3차 강의 보기", href: "#course-3", variant: "secondary" },
    { text: "4차 강의 보기", href: "#course-4", variant: "secondary" },
    { text: "5차 강의 보기", href: "#course-5", variant: "secondary" },
    { text: "6차 강의 보기", href: "#course-6", variant: "secondary" },
    { text: "실습 앱 사용하기", href: "https://pcco-scorer-production.up.railway.app", variant: "outline", external: true }
  ]
};

export const painPoints = [
  {
    quote: "ChatGPT 써봤는데, 그냥 검색이랑 별 차이 없던데?",
    description: "같은 AI를 써도 결과가 완전히 다른 이유"
  },
  {
    quote: "주간 보고서 쓸 때마다 '너는 10년차 기획자야...' 매번 복붙하고 있다",
    description: "반복되는 프롬프트를 한 번에 설정하는 법"
  },
  {
    quote: "팀원은 AI로 1시간 만에 끝내는데, 나는 3시간 걸린다",
    description: "AI 결과의 품질을 결정하는 단 하나의 차이"
  },
  {
    quote: "GPTs 만들어봤는데, 그냥 기본 ChatGPT랑 다를 게 없더라",
    description: "범용 AI를 내 전용 AI로 바꾸는 설정의 기술"
  }
];

export const courses = [
  {
    id: "course-1",
    title: "AI의 프롬프트란?",
    subtitle: "AI 결과를 바꾸는 단 하나의 차이",
    duration: "105분",
    level: "초급 ~ 중급",
    framework: "R-PCCO",
    frameworkFull: "역할·목적·맥락·제약·출력",
    heroQuote: "프롬프트는 AI의 능력이 아니라, 내 사고력의 증폭기입니다",
    tagline: "AI에게 질문하지 말고, 설계하라",

    promises: [
      "AI 결과가 별로일 때 'AI가 왜 이래'가 아니라 '내 프롬프트 어디가 부족했지'를 먼저 묻게 된다",
      "모든 요청에 역할·목적·맥락·제약·출력 다섯 칸을 자동으로 체크하게 된다",
      "자기 업무에 맞는 나만의 프롬프트 템플릿을 최소 하나 가지고 돌아간다"
    ],

    beforeAfter: {
      title: "여행 추천 요청",
      before: {
        label: "Before",
        prompt: "여행 추천해줘",
        result: "파리·도쿄·제주 같은 뻔한 나열"
      },
      after: {
        label: "After (R-PCCO 적용)",
        prompt: "너는 10년차 여행 플래너야. 30대 후반 맞벌이 부부, 3박 4일, 1인 150만 원 예산, 힐링+현지 맛집, 일본 제외 동·동남아 3곳, 도시별 표로.",
        result: "조건에 맞는 3개 도시, 근거+일정표까지"
      }
    },

    curriculum: [
      { section: "오프닝", time: "5분", slides: "1~2" },
      { section: "Part 1 — 왜 프롬프트인가", time: "15분", slides: "3~7" },
      { section: "Part 2 — 5대 핵심 요소 (R-PCCO)", time: "35분", slides: "8~15" },
      { section: "Part 3 — 질문 → 설계", time: "10분", slides: "16~17" },
      { section: "실습 워크숍", time: "30분", slides: "18" },
      { section: "마무리", time: "10분", slides: "19~22" }
    ]
  },
  {
    id: "course-2",
    title: "AI의 지침이란?",
    subtitle: "한 번 세팅하고 평생 쓰는 AI 만들기",
    duration: "148분",
    level: "중급 ~ 고급",
    framework: "I-MRKO",
    frameworkFull: "정체성·임무·규칙·지식·출력",
    heroQuote: "범용 AI를 내 전용 AI로 바꾸는 설정의 기술",
    tagline: "한 번 세팅하면 평생 쓰는 AI를 만드세요",
    prerequisite: "AI의 프롬프트란? (R-PCCO) 선수 강의",

    promises: [
      "매번 R-PCCO 타이핑하지 않고도 같은 품질의 결과를 얻는다",
      "내 이름이 박힌 AI 어시스턴트 1대를 만들어서 돌아간다",
      "다른 어디서도 잘 안 가르치는 '예시의 함정'과 '지침 체인 설계'를 마스터한다"
    ],

    beforeAfter: {
      title: "회의록 요청 (지침 세팅 후)",
      before: {
        label: "Before (매번 길게)",
        prompt: "회의록 써줘. 결정사항이랑 TODO 구분해서 표로, A4 1장 내로, 중립적 톤으로, 담당자랑 기한 포함해서...",
        result: "매번 같은 지시를 반복 입력"
      },
      after: {
        label: "After (I-MRKO 지침 세팅)",
        prompt: "오늘 회의록 써줘.",
        result: "한 줄 명령으로 완벽한 회의록 생성"
      }
    },

    curriculum: [
      { section: "오프닝 + R-PCCO 복습", time: "7분", slides: "1~3" },
      { section: "Part 1 — 프롬프트 vs 지침", time: "13분", slides: "4~7" },
      { section: "Part 2 — 지침 5요소 (I-MRKO)", time: "25분", slides: "8~14" },
      { section: "Part 3 — 예시의 함정 + 레이어링", time: "15분", slides: "15~17", highlight: true },
      { section: "Part 4 — 지침 체인 설계", time: "33분", slides: "18~25", highlight: true },
      { section: "Part 5 — 플랫폼별 적용", time: "10분", slides: "26~27" },
      { section: "실습 워크숍", time: "30분", slides: "28" },
      { section: "마무리 + Q&A", time: "15분", slides: "29~31" }
    ],

    killerInsights: [
      {
        title: "예시의 함정",
        description: "지침에 예시를 넣으면 왜 망하는가",
        quote: "예시 1개는 복사, 3개는 감옥"
      },
      {
        title: "지침 체인 설계",
        description: "여러 AI를 엮는 I/O 계약 설계",
        quote: "체인의 성패는 지침이 아니라 지침 사이의 '접점'에 달렸다"
      }
    ]
  },
  {
    id: "course-3",
    title: "이미지 프롬프트 설계 가이드",
    subtitle: "설명이 아니라 제어 시스템",
    duration: "90분",
    level: "초급 ~ 고급",
    framework: "SSDHR",
    frameworkFull: "장면·스타일·디테일·강제·물리",
    heroQuote: "프롬프트는 설명이 아니라 제어 시스템이다",
    tagline: "묘사가 아니라 시각을 설계하라",

    promises: [
      "9단 구조(SSDHR + 메타 2단 + 고급 2단)로 어떤 이미지 케이스든 분해해서 설계할 수 있게 된다",
      "잘 나온 결과를 JSON으로 자산화해서 시리즈물·캐릭터에 그대로 재사용할 수 있게 된다",
      "사진을 첨부할 때 무엇을 유지·변경·무시할지 분리해서 지시하는 법을 마스터한다"
    ],

    beforeAfter: {
      title: "이미지 생성 요청",
      before: {
        label: "Before (묘사형)",
        prompt: "따뜻한 색감, 옛날 필름 느낌, 한국인 7세 남자 아이가 일기 쓰는 모습",
        result: "비슷한데 어디가 어색한 평범한 결과 (방향성·우선순위·충돌·자유 해석)"
      },
      after: {
        label: "After (9단 구조 설계)",
        prompt: "[자연어 장면] 한국인 7세 남자 아이가 책상에서 일기를 쓰는 모습, 탑뷰. [Style Lock — JSON] [Hard] 글자 정확히 동일 [Negative] 깨진 글씨·여분 손가락 금지",
        result: "의도대로 통제된 결과, 시리즈 100컷에 그대로 재사용 가능"
      }
    },

    curriculum: [
      { section: "오프닝", time: "5분", slides: "1~3" },
      { section: "Part 1 — 한 줄 원리", time: "8분", slides: "4~5" },
      { section: "Part 2 — 핵심 5단 (SSDHR)", time: "25분", slides: "6~13" },
      { section: "Part 3 — 메타 규칙", time: "10분", slides: "14~16" },
      { section: "Part 4 — JSON 자산화", time: "15분", slides: "17~21", highlight: true },
      { section: "Part 5 — 레퍼런스 기반", time: "15분", slides: "22~26", highlight: true },
      { section: "실습 워크숍", time: "7분", slides: "27" },
      { section: "마무리 + Q&A", time: "5분", slides: "28~32" }
    ],

    killerInsights: [
      {
        title: "JSON 자산화",
        description: "스타일을 코드처럼 관리, 시리즈물에 그대로 재사용",
        quote: "Style Lock + Character Lock은 시리즈 내내 그대로, scene만 교체"
      },
      {
        title: "레퍼런스 통제",
        description: "사진 첨부 시 유지·변경·무시 분리",
        quote: "사진을 첨부하는 순간, 프롬프트는 '설계도'가 아니라 '수정 지시서'가 된다"
      }
    ]
  },
  {
    id: "course-4",
    title: "바이브 코딩이란?",
    subtitle: "AI한테 묘사하면 앱이 된다 — 바이브 코딩 5요소 입문",
    duration: "125분",
    level: "초급 (코딩 무경험 OK)",
    framework: "R-PCCO (코딩 응용판)",
    frameworkFull: "역할·목적·맥락·제약·출력 — 코딩 5요소",
    heroQuote: "바이브 코딩은 코드를 짜는 게 아니라, AI한테 묘사하는 것이다",
    tagline: "묘사를 잘하는 사람이 앱을 만든다",
    prerequisite: "(권장) AI의 프롬프트란? (R-PCCO)",

    promises: [
      "'나 코딩 못 하는데 앱 만들 수 있을까?' 의심이 사라진다 — 코딩 아니라 묘사라는 걸 체화한다",
      "이미 배운 R-PCCO 5요소를 코딩 맥락에 그대로 응용할 수 있게 된다",
      "채점기 점수 + 진짜 작동하는 자기소개 앱 1개를 손에 들고 돌아간다"
    ],

    beforeAfter: {
      title: "운세 앱 만들기",
      before: {
        label: "Before (모호)",
        prompt: "운세 앱 만들어줘",
        result: "운세 텍스트만 줄줄. 친구한테 보낼 수 없는 '그냥 글'"
      },
      after: {
        label: "After (5요소 적용)",
        prompt: "너는 모바일 앱 UI 디자이너야. 회식 자리에서 직장인이 분위기 풀려고 핸드폰으로 잠깐 보는 앱을 만들거야. 30~40대 직장인이 5초 안에 결과 확인. 버튼 하나로 회식운, 다시뽑기 가능. 너무 진지하지 않게. 한 페이지 HTML로 만들어줘.",
        result: "버튼 클릭되는 진짜 작동하는 회식운 앱 (Artifacts 미리보기)"
      }
    },

    curriculum: [
      { section: "오프닝 + 약속", time: "10분", slides: "1~3" },
      { section: "Part 1 — 왜 바이브 코딩인가", time: "15분", slides: "4~7" },
      { section: "Part 2 — 바이브 코딩 5요소", time: "30분", slides: "8~14" },
      { section: "워밍업 — 회원가입 + 짝꿍", time: "15분", slides: "15" },
      { section: "실습 워크숍 — 채점 + 첫 앱", time: "35분", slides: "16", highlight: true },
      { section: "Part 3 — 다음 단계 예고", time: "15분", slides: "17~19", highlight: true },
      { section: "마무리 + Q&A", time: "5분", slides: "20~22" }
    ],

    killerInsights: [
      {
        title: "AI한테 한 장, 사람한테 한 장",
        description: "CLAUDE.md(AI 지침) + README.md(사람 소개서) 짝 구조",
        quote: "코드를 잘 짜는 게 아니라, 두 장의 종이를 잘 깔아두는 것"
      },
      {
        title: "Artifacts 실습",
        description: "claude.ai에 묘사하면 옆 미리보기에 진짜 작동하는 앱이 뜬다",
        quote: "친구한테 보내면 '어 이거 네가 만든 거야?' 소리 나오는 앱"
      }
    ]
  },
  {
    id: "course-5",
    title: "AI 자동화 이해",
    subtitle: "AI에게 일을 제대로 시키는 법 — 빈껍데기를 결과물로 바꾸는 설계",
    duration: "120분",
    level: "초급 ~ 중급",
    framework: "BATLR",
    frameworkFull: "쪼개기·에셋화·도구·연결·기록 — 자동화 5단계",
    heroQuote: "AI가 못하는 게 아니라, 전달이 부족한 겁니다",
    tagline: "결과의 질은 AI 성능이 아니라, 내 설계가 정한다",
    prerequisite: "(권장) 1~4차 강의 — 프롬프트·지침·이미지·바이브 코딩",

    promises: [
      "결과가 빈껍데기일 때 'AI가 별로네'가 아니라 '내 설계 어디가 부족했지'를 먼저 묻게 된다",
      "모든 자동화를 인풋(재료)·스펙(도구)·아웃풋(완성품) 3기둥으로 쪼개는 사고가 자동 작동한다",
      "내 업무에 바로 쓸 자동화 설계도(plan.md) 한 장을 손에 들고 돌아간다"
    ],

    beforeAfter: {
      title: "후킹 영상 만들기",
      before: {
        label: "Before (큰 단어)",
        prompt: "후킹 영상 만들어줘",
        result: "'지금 안 보면 후회합니다!' 어디서 본 듯한 평균값 — 다시 만들어야 함"
      },
      after: {
        label: "After (초미세 단어까지 설계)",
        prompt: "공포 소구 / 0~2초 충격 비주얼 / 병명 텍스트 위치 / 앵글 / 자막 색까지 다섯 가지 설계해서 만들어줘.",
        result: "의도한 디테일이 그대로 — 바로 사용 가능"
      }
    },

    curriculum: [
      { section: "오프닝", time: "6분", slides: "1~2" },
      { section: "Part 1 — 왜 자동화는 실패하는가", time: "20분", slides: "3~7" },
      { section: "Part 2 — 자동화 5단계 (BATLR, 휴식 포함)", time: "56분", slides: "8~17", highlight: true },
      { section: "Part 3 — 설계 데모 (후킹 카드 1장)", time: "20분", slides: "18~20", highlight: true },
      { section: "마무리 & Q&A", time: "18분", slides: "21~24" }
    ],

    killerInsights: [
      {
        title: "API 문서는 LLM에 넣어라",
        description: "새 도구 API 문서를 통째로 LLM에 넣고 '내가 쓸 파라미터만 정리해줘'",
        quote: "코딩 몰라도 됨 — 단, '그런 기술이 있다'는 이름은 알아둘 것"
      },
      {
        title: "덧바르기 금지",
        description: "수정 5개 모았다 한 번에 반영하면 뭐가 원인인지 못 찾는다",
        quote: "1개 고치면 계획서부터 갱신 — 그러면 오류 10개가 1개로 줄어든다"
      }
    ]
  },
  {
    id: "course-6",
    title: "Claude Code 실전",
    subtitle: "묘사하면 내 컴퓨터에서 도는 도구가 된다 — 만들고·쪼개고·배포까지",
    duration: "118분 (+배포 보너스)",
    level: "초급 (코딩 무경험 OK) ~ 중급",
    framework: "빌드 5단계",
    frameworkFull: "묘사·실행·분리·갖춤·공유 — 프로그램 만드는 표준 흐름",
    heroQuote: "Claude Code의 맥락엔 '내 컴퓨터'가 들어간다 — 묘사하면 진짜 도구가 된다",
    tagline: "코드를 짜지 말고, 내 컴퓨터에서 돌 프로그램을 묘사하라",
    prerequisite: "(권장) 1·2·4차 — 프롬프트·지침·바이브 코딩",

    promises: [
      "claude.ai Artifacts와 달리, 내 컴퓨터에서 진짜 실행되고 내 파일을 다루는 프로그램을 만들 수 있게 된다",
      "프로그램이 2단계 이상으로 커지면 '레이어로 쪼개 지침으로 넘기는' 설계가 손에 붙는다 (2차 I/O 계약의 코드판)",
      "어떤 프로그램이든 그대로 시작할 '재사용 스캐폴드' 한 벌(CLAUDE.md·README·DEVLOG·specs…)을 들고 돌아간다"
    ],

    beforeAfter: {
      title: "파일 이름 일괄 변경기 만들기",
      before: {
        label: "Before (모호)",
        prompt: "파일 이름 바꿔주는 프로그램 만들어줘",
        result: "터미널만 깜빡, 뭘 어떻게 써야 할지 모를 결과"
      },
      after: {
        label: "After (빌드 5단계)",
        prompt: "너는 작은 프로그램을 잘 만드는 개발자야. 폴더를 정하면 그 안 파일 이름을 규칙대로 제자리에서 바꾸고, 바꾸기 전 미리보기·되돌리기까지. Node.js로, 브라우저에서 버튼으로.",
        result: "내 컴퓨터에서 진짜 도는 도구 + 레이어 구조 + git 백업까지"
      }
    },

    curriculum: [
      { section: "오프닝 + 복습", time: "8분", slides: "1~3" },
      { section: "Part 1 — 왜 Claude Code인가", time: "12분", slides: "4~6" },
      { section: "Part 2 — 만능 5단계 + 첫 버전", time: "15분", slides: "7~9" },
      { section: "Part 3 — 로컬 서버 테스트", time: "12분", slides: "10~11" },
      { section: "Part 4 — 미리보기 + 계획 모드", time: "15분", slides: "12~13" },
      { section: "Part 5 — 디버깅", time: "12분", slides: "14" },
      { section: "Part 6 — 레이어 / I-O 계약", time: "22분", slides: "15~20", highlight: true },
      { section: "Part 7 — 재사용 스캐폴드", time: "14분", slides: "21~23", highlight: true },
      { section: "Part 8~9 — git · 공유", time: "20분", slides: "24~25" },
      { section: "실습 + 마무리", time: "18분", slides: "26~32" }
    ],

    killerInsights: [
      {
        title: "레이어 + I/O 계약 (코드판)",
        description: "2단계 이상이면 단계로 쪼개 JSON으로 넘긴다 — 2차 지침 체인의 코드 버전",
        quote: "한 단계는 한 책임 — 접점은 산문이 아니라 약속(계약)으로"
      },
      {
        title: "재사용 스캐폴드",
        description: "프로그램 = 코드 + 구조 파일들. 다음 프로그램도 이 한 장으로 시작한다",
        quote: "초보가 무너지는 건 실력이 아니라 구조가 없어서다"
      }
    ]
  }
];

export const frameworks = [
  {
    name: "R-PCCO",
    subtitle: "프롬프트 설계 공식",
    course: "1차 강의",
    elements: [
      { code: "R", name: "역할", english: "Role", question: "누가 말하는가?" },
      { code: "P", name: "목적", english: "Purpose", question: "왜 필요한가?" },
      { code: "C", name: "맥락", english: "Context", question: "누구에게? 어디서?" },
      { code: "C", name: "제약", english: "Constraints", question: "분량·톤·금지어?" },
      { code: "O", name: "출력", english: "Output", question: "어떤 모양으로?" }
    ]
  },
  {
    name: "I-MRKO",
    subtitle: "지침 설계 공식",
    course: "2차 강의",
    elements: [
      { code: "I", name: "정체성", english: "Identity", question: "이름 + 역할 + 성격" },
      { code: "M", name: "임무", english: "Mission", question: "주로 뭘 돕는가" },
      { code: "R", name: "규칙", english: "Rules", question: "측정 가능한 Do/Don't" },
      { code: "K", name: "지식", english: "Knowledge", question: "상시 참고 자료" },
      { code: "O", name: "출력", english: "Output", question: "기본 답변 포맷" }
    ]
  },
  {
    name: "I/O 계약",
    subtitle: "체인 접점 설계",
    course: "2차 강의 (고급)",
    elements: [
      { code: "포", name: "포맷", english: "Format", question: "표/JSON/Markdown" },
      { code: "필", name: "필수항목", english: "Required", question: "반드시 들어갈 정보" },
      { code: "범", name: "범위", english: "Scope", question: "분량·개수·깊이" },
      { code: "메", name: "메타정보", english: "Metadata", question: "신뢰도·출처·불확실" }
    ]
  },
  {
    name: "SSDHR",
    subtitle: "이미지 프롬프트 핵심 5단",
    course: "3차 강의",
    elements: [
      { code: "S", name: "장면", english: "Scene", question: "주체·행동·환경·구도?" },
      { code: "S", name: "스타일", english: "Style", question: "매체·카메라·색감·앵커?" },
      { code: "D", name: "디테일", english: "Detail", question: "어떤 불완전함을 설계?" },
      { code: "H", name: "강제 규칙", english: "Hard", question: "절대 어기면 안 될 것?" },
      { code: "R", name: "물리 규칙", english: "Reality", question: "방향·일관성·인과?" }
    ]
  },
  {
    name: "바이브 코딩 5요소",
    subtitle: "R-PCCO 코딩 응용판",
    course: "4차 강의",
    elements: [
      { code: "R", name: "역할", english: "Role", question: "어떤 개발자·디자이너?" },
      { code: "P", name: "목적", english: "Purpose", question: "왜 만드는 앱?" },
      { code: "C", name: "맥락", english: "Context", question: "누가 어디서 어떤 기기로?" },
      { code: "C", name: "제약", english: "Constraints", question: "디자인·분량·기술·금지?" },
      { code: "O", name: "출력", english: "Output", question: "어떤 모양·파일?" }
    ]
  },
  {
    name: "BATLR",
    subtitle: "자동화 5단계 (쪼·에·도·연·기)",
    course: "5차 강의",
    elements: [
      { code: "B", name: "쪼개기", english: "Break", question: "초미세 단어까지 + MECE?" },
      { code: "A", name: "에셋화", english: "Asset-ize", question: "어떤 부품으로 분리?" },
      { code: "T", name: "도구", english: "Tool", question: "어떤 AI·API로?" },
      { code: "L", name: "연결", english: "Link", question: "레이어로 어떻게 쌓나?" },
      { code: "R", name: "기록", english: "Record", question: "계획서에 적었나?" }
    ]
  },
  {
    name: "빌드 5단계",
    subtitle: "프로그램 만드는 표준 흐름 (묘·실·분·갖·공)",
    course: "6차 강의",
    elements: [
      { code: "묘", name: "묘사", english: "Describe", question: "R-PCCO로 뭘 만들지?" },
      { code: "실", name: "실행", english: "Run", question: "로컬 서버로 돌려봤나?" },
      { code: "분", name: "분리", english: "Layer", question: "2단계 이상이면 레이어로?" },
      { code: "갖", name: "갖춤", english: "Scaffold", question: "필수 파일(CLAUDE.md 등) 갖췄나?" },
      { code: "공", name: "공유", english: "Share", question: "git·GitHub로 나눴나?" }
    ]
  }
];

export const usps = [
  {
    title: "공식이 있다",
    description: "R-PCCO, I-MRKO, I/O 계약. 외워서 평생 쓸 수 있는 프레임워크"
  },
  {
    title: "즉시 실습",
    description: "강의 30분이 실습. 듣기만 하지 않고 직접 만들어 간다"
  },
  {
    title: "킬러 인사이트",
    description: "예시의 함정, 지침 체인 설계 등 다른 강의에서 잘 안 다루는 주제"
  },
  {
    title: "플랫폼 독립적",
    description: "Claude, ChatGPT, Gemini 어디든 적용. 심지어 코딩(CLAUDE.md)까지"
  },
  {
    title: "시리즈 구조",
    description: "1차(프롬프트) → 2차(지침)로 단계적 심화"
  }
];

export const faqs = [
  {
    question: "프롬프트가 너무 길어지는데?",
    answer: "결과가 좋으면 OK. 템플릿으로 저장해두면 됩니다. 그리고 2차 강의에서 배우는 '지침'을 활용하면 매번 길게 쓸 필요가 없어집니다."
  },
  {
    question: "ChatGPT vs Claude vs Gemini 차이?",
    answer: "원리는 같습니다. Claude는 긴 문서/분석, ChatGPT는 창의, Gemini는 검색 연동에 강점이 있습니다. 이 강의의 R-PCCO, I-MRKO 공식은 모든 플랫폼에서 동일하게 작동합니다."
  },
  {
    question: "회사 기밀 넣어도 되나요?",
    answer: "절대 금지입니다. 기업용 보안 버전(Enterprise)에서만 사용하세요. 일반 버전은 학습 데이터로 사용될 수 있습니다."
  },
  {
    question: "지침이 너무 길어지는데요?",
    answer: "섹션 헤더(## 정체성, ## 규칙)로 쪼개세요. 지식은 파일로 분리할 수 있습니다. 2차 강의에서 '4층 레이어링' 기법을 배웁니다."
  },
  {
    question: "1차 강의만 들어도 되나요?",
    answer: "물론입니다. 1차 강의만으로도 AI 활용 능력이 크게 향상됩니다. 하지만 같은 프롬프트를 반복해서 쓰고 계신다면 2차 강의에서 배우는 '지침 설계'가 필수입니다."
  },
  {
    question: "AI가 거짓말할 때 막을 수 있나요?",
    answer: "일부 가능합니다. '불확실하면 모른다고 답해'라는 제약을 추가하세요. 하지만 최종 검증은 사람이 해야 합니다."
  }
];

export const quotes = [
  "프롬프트는 AI의 능력이 아니라, 내 사고력의 증폭기다",
  "AI가 잘못한 게 아닙니다. 프롬프트가 잘못한 겁니다",
  "지침은 AI를 범용에서 전용으로 바꾸는 설정이다",
  "지침은 규칙, 예시는 족쇄",
  "체인의 성패는 지침이 아니라 지침 사이의 '접점'에 달렸다",
  "뭐든 다 해주는 AI는 결국 뭐 하나 제대로 못 하는 AI다",
  "생각을 구조화하는 사람이 AI를 지배한다"
];

// 강의 상세 내용
export const courseDetails = [
  {
    id: "course-1",
    heroMessage: "프롬프트는 AI의 능력이 아니라, 내 사고력의 증폭기다.",
    promises: [
      "AI 결과가 별로일 때 'AI가 왜 이래'가 아니라 '내 프롬프트 어디가 부족했지'를 먼저 묻게 된다",
      "모든 요청에 역할·목적·맥락·제약·출력 다섯 칸을 자동으로 체크하게 된다 (R-PCCO 공식)",
      "자기 업무에 맞는 나만의 프롬프트 템플릿을 최소 하나 가지고 돌아간다"
    ],
    beforeAfterExample: {
      title: "Before / After — 여행 추천 요청",
      subtitle: "한 줄 차이로 '재검색 필요' vs '즉시 공유 가능'으로 갈린다",
      before: {
        label: "❌ 프롬프트 A (모호)",
        prompt: "여행 추천해줘.",
        result: "파리·도쿄·제주 같은 뻔한 나열"
      },
      after: {
        label: "✅ 프롬프트 B (설계)",
        prompt: "너는 10년차 여행 플래너야.\n30대 후반 맞벌이 부부, 3박 4일, 1인 150만 원 예산,\n힐링 + 현지 맛집 중심.\n일본 제외한 동·동남아 3곳을 추천.\n도시별 '이유 / 대표 음식 / 일정'을 표로.",
        result: "조건에 맞는 3개 도시가 근거와 일정표까지 딸려 나옴"
      }
    },
    parts: [
      {
        title: "Part 1. 왜 프롬프트인가",
        content: [
          {
            subtitle: "문제 제기 — 같은 AI, 왜 결과가 다를까?",
            text: "같은 AI를 써도 결과가 완전히 다릅니다. 차이를 만드는 변수는 딱 하나 — 프롬프트.",
            quote: "누구는 ChatGPT로 광고 카피를 뽑고, IR 자료 초안을 만들고, 논문까지 씁니다. 또 누구는 '영혼 없는 뻔한 답'만 받죠. 같은 AI인데 왜 이렇게 다를까요?"
          },
          {
            subtitle: "AI 작동 원리 — 한 줄 요약",
            text: "AI는 '그럴듯한 다음 단어'를 확률로 고르는 기계다.",
            details: [
              "모호한 입력 → 평균적이고 무난한 답 (평범한 출력)",
              "구체적 입력 → 좁고 정밀한 답 (정밀한 출력)"
            ],
            analogy: "택시 비유: '어디 가자'라고 하는 사람과 '강남역 11번 출구, 20분 내'라고 말하는 사람의 도착 시간이 같을 수 있을까?"
          },
          {
            subtitle: "프롬프트의 정의",
            text: "프롬프트는 AI에게 주는 '지시서'다. 질문이 아니라 설계다.",
            quote: "AI는 '유능한 신입사원'이지만, 매일 아침 맥락이 0인 상태로 출근한다. 어제 대화는 잊었고, 내 회사도 모르고, 내 일정도 모른다. 그래서 지시서가 필요하다."
          },
          {
            subtitle: "오늘의 핵심 한 문장",
            quote: "프롬프트는 AI의 능력이 아니라, 내 사고력의 증폭기다.",
            text: "자율주행 자동차가 아무리 좋아도, 목적지를 말 안 해주면 주차장에 서 있다. AI도 똑같다. 엔진은 엄청난데 방향키는 사용자 손에 있다."
          }
        ]
      },
      {
        title: "Part 2. 5대 핵심 요소 (R-PCCO)",
        intro: {
          subtitle: "나쁜 프롬프트 해부 — '마케팅 글 써줘'",
          text: "이 한 줄에는 4가지가 비어 있다:",
          missing: [
            "대상 — 20대? 60대? B2B? B2C?",
            "목적 — 홍보? 설득? 전환? 인지?",
            "톤 — 친근? 격식? 위트?",
            "채널 — 블로그? 인스타? 메일?"
          ],
          result: "어느 회사에 붙여도 되는, 동시에 어느 곳에도 안 어울리는 글 = 평범함의 함정"
        },
        content: [
          {
            subtitle: "① 역할 (Role) — 누구인지부터 알려줘라",
            text: "같은 주제라도 '누가 말하느냐'에 따라 톤·깊이·선택지가 완전히 달라진다.",
            example: "'건강식' 하나를 두고도:",
            details: [
              "영양사 → 영양소 비율",
              "요리사 → 맛 조합",
              "의사 → 질환 맥락",
              "다이어트 코치 → 식단 설계"
            ],
            formula: "너는 [경력]년차 [전문 분야] 전문가야.",
            tip: "과장된 역할('너는 세계 최고의 천재 박사야')은 오히려 덜 효과적. 실재할 법한 역할에 AI가 더 잘 반응한다.",
            table: {
              title: "Before / After — '아침식사 추천해줘'",
              rows: [
                { role: "역할 지정 없음", result: "계란, 빵, 우유 — 뻔한 나열" },
                { role: "15년차 스포츠 영양사", result: "운동 전후 단백질·탄수화물 배율, 혈당 반응, 수분 보충" },
                { role: "당뇨 상담 10년 임상 영양사", result: "GI 지수, 당 부하 계산, 피해야 할 가공식품 목록" },
                { role: "간편식 전문 요리 유튜버", result: "3분 컷, 자취생 친화, 재료 2~3개 현실 레시피" }
              ]
            }
          },
          {
            subtitle: "② 목적 (Purpose) — 왜 필요한지 말해라",
            text: "같은 '공기청정기 소개글'이라도 목적에 따라 완전히 달라진다:",
            table: {
              title: "목적에 따른 결과 방향",
              rows: [
                { purpose: "판매 전환", result: "강한 CTA + 한정 혜택" },
                { purpose: "교육", result: "공기질 과학과 원리" },
                { purpose: "보도자료", result: "통계와 제3자 인용" },
                { purpose: "IR", result: "시장 규모와 성장 지표" }
              ]
            },
            questions: [
              "누가 무엇을 하게 만들고 싶은가?",
              "성공의 측정 기준은?",
              "실패하면 어떤 나쁜 결과가?"
            ],
            tip: "목적은 '~하기 위해서'로 끝나는 한 문장으로 적어라. 한 문장으로 못 쓰면 스스로도 목적을 모르는 상태다."
          },
          {
            subtitle: "③ 맥락 (Context) — 상황이 빠지면 결과도 흔들린다",
            text: "맥락의 3차원:",
            dimensions: [
              { label: "Who", question: "누가 읽는가", example: "연령, 직무, 지식 수준" },
              { label: "Where", question: "어디에 쓰이나", example: "플랫폼, 채널, 문서 종류" },
              { label: "Why", question: "어떤 상황에서", example: "시간대, 감정, 긴급도" }
            ],
            example: "'50대 공무원 중간관리자, 부서 카톡 공지, 월요일 오전 5초 스캔' — 이 한 줄이 결과를 완전히 바꾼다. 뻔한 교육 안내문이 아니라, 카톡에 그대로 붙여넣을 수 있는 500자 공지가 나온다.",
            tip: "가장 많이 빠뜨리는 건 '읽는 사람의 지식 수준'"
          },
          {
            subtitle: "④ 제약 (Constraints) — 제한이 결과를 선명하게 만든다",
            quote: "제약이 많을수록 AI는 정밀하게 최적화한다. 무제한 가능성 속에선 평범함이 안전한 선택이다.",
            constraints: [
              "분량 — 200자, 3문단",
              "톤 — 친근, 격식, 학술",
              "어휘 — 전문용어 금지, 초등생 수준",
              "구조 — 표, 리스트, Q&A"
            ],
            beforeAfter: {
              before: "신제품 광고 카피 3개 써줘",
              after: "30자 이내, 20대 여성 대상, 친근한 반말, 이모지 1개, 가격보다 감정을 먼저 건드리는 카피 3개"
            },
            tip: "'하지 마' 금지형보다 '하게 써줘' 긍정형이 훨씬 효과적. 처음엔 제약 2~3개로 시작."
          },
          {
            subtitle: "⑤ 출력 형식 (Output) — 결과의 '모양'을 먼저 지정하라",
            text: "요청이 없으면 AI는 기본값으로 '긴 문단 산문'을 쓴다. 그러나 실무에서는 다양한 모양이 필요하다.",
            formats: [
              "문서 (보고서·제안서)",
              "표 (비교·옵션)",
              "리스트 (단계·옵션)",
              "체크리스트 (실행·검토)",
              "대본 (영상·방송)",
              "단계별 가이드 (튜토리얼)"
            ],
            formula: "결과를 [형식]으로 보여줘. [세부 구조].",
            example: "표로 보여줘. 열은 제품명/가격/핵심혜택/구매자 유형, 3행",
            tip: "형식을 먼저 지정하면 받고 나서 다시 가공할 시간이 사라진다."
          }
        ]
      },
      {
        title: "Part 3. 질문 → 설계",
        content: [
          {
            subtitle: "R-PCCO 통합 템플릿",
            template: "역할: 너는 OO 전문가야.\n목적: OO을 위해서.\n맥락: 대상은 OO, 상황은 OO.\n제약: OO자 이내, OO 톤.\n출력: OO 형식으로 보여줘.\n요청: OO.",
            oneline: "너는 [역할]이야. [목적]을 위해 [대상]에게 제공할 [요청]을 [제약]으로, [형식]으로.",
            principles: [
              "다섯 칸 중 하나라도 비면 결과도 흐려진다",
              "한 번에 완벽 추구하지 말고 3회 대화로 완성하라"
            ]
          },
          {
            subtitle: "수준별 결과 차이 — 회의록 써줘",
            table: {
              title: "프롬프트 수준 = 결과 수준 = 실무 수준",
              rows: [
                { level: "단순", prompt: "회의록 써줘", quality: "★" },
                { level: "실무", prompt: "기획 회의 회의록을 결정사항·TODO 구분해서 표로", quality: "★★★" },
                { level: "전문가", prompt: "너는 회의록 10년차 비서야. 2~3시 기획회의(5명, 스타트업 주간미팅) 녹취를 A4 1쪽 내로. 구조: 결정·액션(담당·기한)·후속. 중립·간결. 표.", quality: "★★★★★" }
              ]
            },
            conclusion: "프롬프트 수준이 곧 결과 수준이고, 결과 수준이 곧 실무 수준이 된다."
          }
        ]
      }
    ],
    habits: [
      {
        title: "역할 먼저 지정",
        description: "새 대화마다 '너는 OO야'로 시작"
      },
      {
        title: "목적·형식 명확",
        description: "결과물의 모양을 요청 전에 머리로 그려두기"
      },
      {
        title: "짧게 반복 개선",
        description: "한 방에 끝내려 하지 말고 3회 대화로 완성"
      }
    ],
    checkCard: [
      { code: "R", name: "역할", question: "너는 누구인가 (경력·업종·직무)" },
      { code: "P", name: "목적", question: "왜 필요한가 (~하기 위해서)" },
      { code: "C", name: "맥락", question: "누구에게, 어디서, 언제 읽나" },
      { code: "C", name: "제약", question: "분량·톤·어휘·금지사항" },
      { code: "O", name: "출력", question: "어떤 모양으로 (표·리스트·대본)" }
    ],
    conclusion: "AI가 잘못한 게 아닙니다. 프롬프트가 잘못한 겁니다.\n\n생각 → 프롬프트 → 결과\n\n구조화, 명확성, 실행력 — AI 시대의 경쟁력.\n\n생각을 구조화하는 사람이 AI를 지배한다.",
    challenge: "오늘부터 딱 3번만, 모든 AI 요청에 역할·목적·맥락·제약·출력을 넣어보세요. 3번만 해보면 바로 감이 옵니다. 일주일 뒤 일하는 방식이 확실히 달라져 있을 겁니다.",
    faqs: [
      {
        q: "프롬프트가 너무 길어지는데?",
        a: "결과가 좋으면 OK. 템플릿으로 저장해두면 됩니다."
      },
      {
        q: "ChatGPT vs Claude vs Gemini 차이?",
        a: "원리는 같음. Claude는 긴 문서/분석, ChatGPT는 창의, Gemini는 검색 연동에 강점."
      },
      {
        q: "회사 기밀 넣어도 되나?",
        a: "절대 금지. 기업용 보안 버전(Enterprise)에서만."
      },
      {
        q: "AI가 거짓말할 때 막을 수 있나?",
        a: "일부 가능. '불확실하면 모른다고 답해' 제약 추가. 하지만 최종 검증은 사람이."
      }
    ]
  },
  {
    id: "course-2",
    heroMessage: "지침은 AI를 범용에서 전용으로 바꾸는 설정이다.",
    promises: [
      "매번 R-PCCO 타이핑하지 않고도 같은 품질의 결과를 얻는 법을 안다",
      "Claude Projects, GPTs, Gemini Gems 중 하나를 직접 만들어 돌아간다 — 내 이름이 박힌 AI 어시스턴트 1대",
      "(킬러 인사이트) 지침에서 예시를 쓰면 왜 망하는지, 그리고 여러 AI를 엮는 지침 체인 설계를 배운다"
    ],
    beforeAfterExample: {
      title: "Before / After — 회의록 요청 (지침 세팅 후)",
      subtitle: "매번 같은 설명 vs 한 줄 명령",
      before: {
        label: "❌ Before (매번 길게)",
        prompt: "회의록 써줘. 결정사항이랑 TODO 구분해서 표로, A4 1장 내로, 중립적 톤으로, 담당자랑 기한 포함해서...",
        result: "매번 같은 지시를 반복 입력"
      },
      after: {
        label: "✅ After (I-MRKO 지침 세팅)",
        prompt: "오늘 회의록 써줘.",
        result: "한 줄 명령으로 완벽한 회의록 생성"
      }
    },
    parts: [
      {
        title: "Part 1. 프롬프트 vs 지침",
        content: [
          {
            subtitle: "문제 제기 — 같은 일을 매번 다시 설명하고 있나요?",
            text: "주간 보고서 쓸 때마다 '너는 10년차 기획자야, 200자, 표로...' 매번 복붙. 이메일 답장 받을 때마다 '격식 있게, 5줄로, 친근하지만 프로페셔널...' 매번 타이핑.",
            signal: "같은 R-PCCO를 3번 이상 썼다면, 그건 지침으로 옮길 때가 됐다는 뜻이다."
          },
          {
            subtitle: "핵심 차이 — 프롬프트 vs 지침",
            text: "지난주 비유 연장: AI는 매일 맥락 0으로 출근하는 신입사원.",
            comparison: [
              "프롬프트 = 매일 아침 그 신입한테 A4 한 장짜리 지시서를 쥐여주는 것",
              "지침 = 입사 첫날 오리엔테이션을 한 번 제대로 해두는 것 (회사 소개, 직무, 규정, 보고 양식까지)"
            ],
            table: {
              title: "프롬프트 vs 지침",
              rows: [
                { aspect: "성격", prompt: "오늘의 지시서", instruction: "입사 패키지" },
                { aspect: "적용", prompt: "1회성", instruction: "상시" },
                { aspect: "쓰는 곳", prompt: "채팅창", instruction: "프로젝트 / GPTs / Gems 설정" },
                { aspect: "비유", prompt: "알바 인수인계", instruction: "정규직 오리엔테이션" },
                { aspect: "전형적 길이", prompt: "매번 5~10줄", instruction: "한 번 30~100줄" }
              ]
            }
          },
          {
            subtitle: "한 줄 원리 — 지침은 AI의 '기본 성격'을 바꾼다",
            analogy: {
              title: "배우 비유",
              items: [
                "프롬프트 = 배우에게 대사를 주는 것 ('이번엔 이렇게 말해줘')",
                "지침 = 배우에게 배역을 주는 것 ('당신은 10년차 형사 김철수, 원칙주의자, 말투는 단호함')"
              ],
              conclusion: "배역이 정해지면 대사는 한 줄만 줘도 그 사람답게 말한다."
            },
            quote: "프롬프트는 AI를 움직이고, 지침은 AI의 출발점을 바꾼다."
          },
          {
            subtitle: "오늘 가장 중요한 한 문장",
            quote: "지침은 AI를 범용에서 전용으로 바꾸는 설정이다.",
            text: "ChatGPT, Claude, Gemini의 기본값은 범용이다. 누구한테나 다 쓸 수 있게 만들어져 있어 답변이 '뭐 다 조금씩 들어간 평범한 답'으로 나오기 쉽다 (= 평범함의 함정).\n\n지침을 넣는다는 건 이 범용 AI를 내 전용으로 바꾸는 작업이다."
          }
        ]
      },
      {
        title: "Part 2. 지침 5요소 (I-MRKO)",
        intro: {
          subtitle: "나쁜 지침 해부 — '친절하게 답해주는 비서가 돼줘'",
          text: "이런 지침은 다섯 칸이 다 비어 있다:",
          missing: [
            "정체성? 그냥 '비서'. 경력도 성격도 없음",
            "임무? 범위 없음. 뭐든 다 함",
            "규칙? 없음. 뭐가 되고 뭐가 안 되는지 불명",
            "지식? 없음. 회사 정보 0",
            "출력? 없음. 매번 긴 산문으로 옴"
          ],
          result: "그냥 기본 ChatGPT랑 똑같음. 평범함의 함정의 지침 버전."
        },
        content: [
          {
            subtitle: "오늘의 공식 — I-MRKO (정·임·규·지·출)",
            text: "좋은 지침은 다섯 칸으로 만들어진다. R-PCCO와 뼈대가 같다. 이름만 바뀐 게 아니라, 1회성이 상시로 옮겨온 것.",
            table: {
              title: "R-PCCO (지난주) → I-MRKO (오늘)",
              rows: [
                { rpcco: "R · 역할 (Role)", imrko: "I · 정체성 (Identity) = 역할 + 성격" },
                { rpcco: "P · 목적 (Purpose)", imrko: "M · 임무 (Mission) = 상시 업무 범위" },
                { rpcco: "C · 제약 (Constraints)", imrko: "R · 규칙 (Rules) = 상시 규정" },
                { rpcco: "C · 맥락 (Context)", imrko: "K · 지식 (Knowledge) = 상시 참고 자료" },
                { rpcco: "O · 출력 (Output)", imrko: "O · 출력 (Output) = 기본 포맷" }
              ]
            }
          },
          {
            subtitle: "① 정체성 (Identity) — 이름 + 역할 + 성격",
            text: "지난주 역할(Role)에 이름과 성격을 더한 것.",
            formula: "너는 [이름]이라는 [경력/역할]이야. 성격은 [특성 2~3개].",
            table: {
              title: "Before / After",
              rows: [
                { before: "친절한 비서 (모호)", after: "너는 '정비서'라는 10년차 임원 비서. 간결·선제안·숫자 우선." }
              ]
            },
            tip: "이름이 있으면 AI가 그 이름에 맞는 일관된 말투를 유지한다. 대화가 길어져도 캐릭터가 안 흔들린다."
          },
          {
            subtitle: "② 임무 (Mission) — 범위를 좁혀야 품질이 오른다",
            formula: "너는 [구체적 업무 3가지]를 주로 돕는다. 그 외 요청은 짧게 답하고 본업으로 돌려라.",
            example: "너는 ① 주간 보고 초안 ② 회의록 요약 ③ 이메일 톤 교정, 이 세 가지를 주로 돕는다. 그 외 요청엔 짧게만 답하고 본업 제안해라.",
            quote: "뭐든 다 해주는 AI는 결국 뭐 하나 제대로 못 하는 AI다.",
            tip: "임무를 좁게 잡을수록 나중에 다른 AI와 '체인'으로 조합하기 쉬워진다. → Part 4"
          },
          {
            subtitle: "③ 규칙 (Rules) — 측정 가능하게 써라",
            text: "초보자가 거의 다 하는 실수: 추상적으로 쓰기.",
            table: {
              title: "추상적 vs 측정 가능",
              rows: [
                { abstract: "간결하게 답해라 ❌", measurable: "결론 1줄 + 근거 3줄 이내로 답해라 ✅" },
                { abstract: "친근하게 써라 ❌", measurable: "반말 사용, 문장 끝에 '요' 금지 ✅" },
                { abstract: "전문적으로 답해라 ❌", measurable: "모든 수치엔 출처 표기. 추측 시 '추측'이라 먼저 밝혀라 ✅" },
                { abstract: "자연스러운 말투로 ❌", measurable: "'~에 있어서', '~을 통하여', '~라는 것' 금지 ✅" }
              ]
            },
            details: [
              "숫자로 — 글자 수, 줄 수, 항목 수",
              "금지어로 — '이 표현 쓰지 마'",
              "이유와 함께 — '~이므로 ~해라' (AI가 새 상황에 응용함)",
              "Do 3개 + Don't 3개 — 많으면 충돌"
            ],
            quote: "규칙은 AI가 읽는 게 아니라 AI를 가두는 것이다."
          },
          {
            subtitle: "④ 지식 (Knowledge) — AI가 항상 참고하는 자료실",
            text: "지난주 '맥락(Context)'의 상시 버전. 매번 설명할 필요 없는 정보를 한 번 올려둔다.",
            details: [
              "회사 / 팀 용어집",
              "자주 쓰는 포맷 샘플",
              "고객 페르소나 정의",
              "작년 보고서 원본",
              "브랜드 가이드"
            ],
            platforms: [
              "Claude Projects → '프로젝트 지식'",
              "GPTs → 'Knowledge' 업로드",
              "Gemini Gems → 파일 첨부"
            ],
            tip: "⚠️ 보안 주의: 회사 기밀·개인정보·영업비밀은 절대 올리지 말 것. 일반 버전은 학습 데이터로 쓰일 수 있음. 기업용 보안 버전(Claude for Enterprise, ChatGPT Enterprise, Gemini for Workspace)에서만 취급."
          },
          {
            subtitle: "⑤ 출력 (Output) — 기본 답변 포맷을 박아둬라",
            text: "지난주에 배운 출력 형식을 기본값으로 박아두는 것.",
            example: "모든 답변은\n① 결론 1줄\n② 근거 3줄\n③ 다음 행동 1개,\n이 순서로 쓴다.",
            table: {
              title: "Before / After",
              rows: [
                {
                  before: "회의록 써줘. 결정사항이랑 TODO 구분해서 표로, A4 1장 내로, 중립적 톤으로, 담당자랑 기한 포함해서...",
                  after: "오늘 회의록 써줘."
                }
              ]
            },
            tip: "출력 포맷은 체인의 시작점이다. 다음 AI의 입력이 되므로, 구조화된 포맷(표·리스트·JSON)이 유리하다. → Part 4"
          }
        ]
      },
      {
        title: "Part 3. 예시의 함정 + 레이어링",
        content: [
          {
            subtitle: "🔥 킬러 인사이트 ① — 지침에 예시 넣지 마라",
            quote: "예시 1개는 복사, 3개는 감옥.",
            details: [
              "예시 1개 → AI가 그 예시를 복사. 표면을 흉내 냄",
              "예시 3개 → 그 3개 안에만 갇힘. 예시가 AI의 감옥이 됨",
              "예시 5~10개 → 지침이 비대해지고 유지보수 불가"
            ],
            table: {
              title: "지침 vs 프롬프트에서의 예시",
              rows: [
                { aspect: "예시 효과 (지침)", result: "고착 → 범위가 좁아짐" },
                { aspect: "예시 효과 (프롬프트)", result: "방향 잡기 → 도움 됨" },
                { aspect: "기본 전략 (지침)", result: "규칙·측정값·금지어" },
                { aspect: "기본 전략 (프롬프트)", result: "필요하면 예시 써도 OK" },
                { aspect: "이유 (지침)", result: "매번 다른 요청에 적용됨" },
                { aspect: "이유 (프롬프트)", result: "그 한 번만 잘 되면 됨" }
              ]
            },
            text: "예시 없이 해결하는 4가지 방법:",
            details2: [
              "규칙을 측정 가능하게 써라",
              "금지어를 명시해라 — '~라는 표현 금지'",
              "이유와 함께 써라 — '~이므로 ~해라' (AI가 응용함)",
              "예시가 꼭 필요한 딱 한 경우 = 고정 포맷 템플릿 (회의록 양식, API 응답 구조 등)"
            ],
            quote2: "지침은 규칙, 예시는 족쇄."
          },
          {
            subtitle: "지침은 쌓는 것이다 — 4층 설계",
            text: "지침은 한 방에 완성하지 않는다. 층층이 쌓는다.",
            table: {
              title: "지침 레이어링 4층 구조",
              rows: [
                { layer: "1층", name: "뼈대", content: "I-MRKO 5요소 기본 (각 한 단락씩, 총 10줄 이내)" },
                { layer: "2층", name: "측정값", content: "추상 규칙을 숫자·금지어로 구체화 ('간결하게' → '결론 1줄 + 근거 3줄')" },
                { layer: "3층", name: "엣지 케이스", content: "규칙 충돌·불확실할 때 처리법 ('모를 땐 모른다고 먼저 답해라')" },
                { layer: "4층", name: "지식 주입", content: "파일·자료 업로드 (용어집·포맷 샘플·레퍼런스 문서)" }
              ]
            },
            tip: "순서가 중요: 1층 만들고 → 써보고 → 부족한 걸 2층으로 보강 → 써보고 → 3층 → 4층."
          },
          {
            subtitle: "레이어링 원칙 3가지",
            details: [
              "작게 시작해라 — 첫 버전은 I-MRKO 한 단락씩, 총 10줄 이내",
              "써보고 추가해라 — 실제로 20~30번 돌려보면 어디가 구멍인지 보인다",
              "충돌 나면 섹션으로 쪼개라 — ## 정체성, ## 규칙, ## 출력 같은 헤더로 구조화"
            ],
            quote: "지침은 작게 심고, 크게 기르는 나무다."
          }
        ]
      },
      {
        title: "Part 4. 지침 체인 설계",
        content: [
          {
            subtitle: "🔥 킬러 인사이트 ② — 한 AI로 안 되는 일",
            text: "논문 한 편 쓰려면: 자료 조사 → 구조 설계 → 초안 작성 → 비판 검토 → 문장 다듬기",
            quote: "이걸 AI 한 대한테 다 시키면 한 가지도 제대로 못 한다. 임무가 너무 넓기 때문.",
            table: {
              title: "단일 AI vs 체인 AI",
              rows: [
                { aspect: "구조", single: "한 AI가 5단계 다 함", chain: "5개 AI가 한 단계씩" },
                { aspect: "품질", single: "품질 흔들림", chain: "각 단계 품질 높음" },
                { aspect: "지침", single: "긴 지침 1개 (유지보수 어려움)", chain: "짧은 지침 여러 개 (부분 개선 가능)" },
                { aspect: "사용", single: "한 대화로 끝 (간편)", chain: "릴레이 필요 (세팅 부담)" },
                { aspect: "적합", single: "단순 업무에 유리", chain: "복잡·반복 업무에 유리" }
              ]
            }
          },
          {
            subtitle: "체인의 두 형태",
            table: {
              title: "수동 체인 vs 단일 AI 내부 단계",
              rows: [
                { aspect: "구조", manual: "AI 1 → 복사 → AI 2 → 복사 → AI 3", internal: "한 AI 안에서 '1단계 → 2단계 → 3단계' 순차" },
                { aspect: "지침 위치", manual: "각 AI에 따로 (짧고 전문적)", internal: "하나의 긴 지침 안에 단계별 규칙" },
                { aspect: "장점", manual: "독립 개선 가능, 재사용 쉬움", internal: "세팅 간단, 한 대화로 끝" },
                { aspect: "단점", manual: "수동 복붙 번거로움", internal: "한 AI가 모든 단계 소화" },
                { aspect: "추천", manual: "단계별 전문성 다를 때", internal: "단계 명확하고 연관성 높을 때" }
              ]
            }
          },
          {
            subtitle: "체인의 심장 — I/O 계약 (Input/Output Contract)",
            quote: "체인의 성패는 지침이 아니라 지침 사이의 '접점'에 달렸다.",
            text: "대부분의 사람이 여기서 망한다. 각 지침은 잘 썼는데 결과물이 엉망인 이유 = 접점 때문.\n\nAI 1의 출력이 AI 2의 입력이 되는데, AI 1이 애매하게 던지면 AI 2가 제대로 받을 수 없다.",
            analogy: "AI 1 → [접점 = 계약] → AI 2\n지침 A     · 포맷           지침 B\n          · 필수항목\n          · 범위\n          · 메타정보"
          },
          {
            subtitle: "I/O 계약 4요소 — 포·필·범·메",
            table: {
              title: "I/O 계약 구성 요소",
              rows: [
                { element: "포 (Format)", meaning: "어떤 구조로 넘길지", example: "Markdown 표 / JSON / 번호 리스트 / ## 헤더 섹션" },
                { element: "필 (Required)", meaning: "반드시 들어갈 정보", example: "주장 / 근거 / 출처 / 신뢰도" },
                { element: "범 (Scope)", meaning: "분량·개수·깊이 한계", example: "최대 5개 항목, 각 3줄 이내" },
                { element: "메 (Metadata)", meaning: "내용에 대한 정보", example: "신뢰도 상/중/하, 출처 URL, 불확실 표시" }
              ]
            },
            quote: "원칙: 구조화된 포맷일수록 다음 AI가 잘 읽는다. 산문은 체인의 적."
          },
          {
            subtitle: "실전 예시 — 블로그 글 작성 3단계 체인",
            table: {
              title: "블로그 글 작성 체인 구조",
              rows: [
                {
                  stage: "AI 1 (기획)",
                  role: "10년차 콘텐츠 기획자",
                  mission: "주제 → 글 구조 설계",
                  output: "표 형식 · 제목 후보 3개 · 목차(H2 5개) · 타깃 · 핵심 메시지 · 난이도"
                },
                {
                  stage: "접점 1",
                  role: "전달",
                  mission: "복사 붙여넣기 또는 '위 기획안을 바탕으로...'",
                  output: "-"
                },
                {
                  stage: "AI 2 (초안)",
                  role: "블로그 글쓰기 전문가",
                  mission: "기획안 → 초안 작성",
                  output: "Markdown · 도입부·본문(H2별 3문단)·마무리 · 2,000자 · 섹션 끝 '검토 포인트'"
                },
                {
                  stage: "접점 2",
                  role: "전달",
                  mission: "Markdown 초안 + 검토 포인트",
                  output: "-"
                },
                {
                  stage: "AI 3 (교정)",
                  role: "20년차 국어 편집자",
                  mission: "문장 단위 교정",
                  output: "수정본 + 수정 근거 표"
                }
              ]
            }
          },
          {
            subtitle: "체인의 3대 실수 + 해결법",
            details: [
              "실수 ① 포맷 안 맞추기\n증상: AI 1은 표로 줬는데 AI 2는 산문을 기대함 → 다음 AI가 해석 실패\n해결: 두 지침에 같은 포맷 규약 명시. '입력은 표로 온다' / '출력은 표로 낸다'",

              "실수 ② 지침 간 역할 겹치기\n증상: AI 1도 교정하고 AI 3도 교정 → 엉뚱하게 수정되거나 중복 작업\n해결: 각 지침의 임무를 배타적으로 정의. '너는 교정 안 한다', '너는 기획 안 한다'\n원칙: 한 AI = 한 책임 (Single Responsibility)",

              "실수 ③ 검증 단계 빠뜨리기\n증상: AI 1 결과가 잘못됐는데 AI 2가 그대로 받아서 증폭 → 뒤로 갈수록 오류 누적\n해결: 중간에 '검토' 역할 AI 끼워넣기. '이전 단계 결과에 오류가 있으면 먼저 지적해라'"
            ]
          },
          {
            subtitle: "체인 설계 원칙 5가지 — 작·단·포·검·재",
            details: [
              "작게 시작하라 — 첫 체인은 2단계로. 3단계 이상은 익숙해진 후",
              "한 AI = 한 책임 — 임무를 배타적으로. '너는 이건 절대 하지 마라'",
              "접점은 포맷으로 고정 — 표·Markdown·JSON·섹션 헤더. 산문 금지",
              "검증을 체인 중간에 끼워라 — 3단계 이상이면 반드시 검증 1개",
              "재사용 가능하게 설계하라 — 범용 역할(교정 AI, 검증 AI)은 다른 업무에도 쓸 수 있게"
            ]
          }
        ]
      },
      {
        title: "Part 5. 플랫폼별 적용",
        content: [
          {
            subtitle: "세 플랫폼 비교",
            table: {
              title: "Claude Projects vs GPTs vs Gemini Gems",
              rows: [
                { aspect: "지침 입력란", claude: "프로젝트 지침", gpts: "Instructions", gemini: "Instructions" },
                { aspect: "지식 업로드", claude: "프로젝트 지식 (파일 다수)", gpts: "Knowledge (파일)", gemini: "파일 첨부" },
                { aspect: "공유 방식", claude: "팀 / 링크", gpts: "GPT Store / 링크", gemini: "개인 / 공유" },
                { aspect: "강점", claude: "긴 문서 처리, 정밀 분석", gpts: "외부 툴 연동 (액션)", gemini: "구글 생태계 연동" },
                { aspect: "추천 용도", claude: "문서 작업, 글쓰기", gpts: "자동화, 외부 API", gemini: "지메일·드라이브 연계" }
              ]
            },
            quote: "그릇은 달라도 I-MRKO라는 담는 방식은 같다. 하나 정해서 집중하라."
          },
          {
            subtitle: "예고 — 바이브 코딩의 지침 (CLAUDE.md)",
            text: "Claude Code, Cursor 같은 AI 코딩 툴에는 프로젝트 루트에 CLAUDE.md 파일을 둔다.\n여기에 '이 프로젝트는 뭐고, 어떤 스타일로 코딩해라, 이런 건 하지 마라' 같은 지침을 써둔다.",
            quote: "이게 바로 I-MRKO다. 텍스트 박스가 아니라 파일로 들어간 것뿐.\n\n지침은 플랫폼을 초월하는 공통 언어다."
          }
        ]
      }
    ],
    habits: [
      {
        title: "3번 쓰면 지침으로 옮긴다",
        description: "같은 R-PCCO를 3번 이상 썼다면 신호"
      },
      {
        title: "지침은 버전 관리한다",
        description: "v1, v2, v3로 진화. 완벽한 첫 버전은 없다"
      },
      {
        title: "지침 + 짧은 프롬프트로 일한다",
        description: "지침이 잘 세팅되면 매 요청은 '오늘 회의록 써줘' 한 줄"
      }
    ],
    checkCard: [
      { code: "I", name: "정체성", question: "이름 + 역할 + 성격" },
      { code: "M", name: "임무", question: "주로 뭘 돕는가 (3가지)" },
      { code: "R", name: "규칙", question: "측정 가능한 Do/Don't" },
      { code: "K", name: "지식", question: "상시 참고 자료" },
      { code: "O", name: "출력", question: "기본 답변 포맷" }
    ],
    conclusion: "프롬프트는 요청, 지침은 설정, 체인은 조합.\n\n지난주엔 요청을 잘하는 법을, 오늘은 설정과 조합을 배웠다.\n\n범용 AI를 내 전용 AI로 바꾸고, 여러 전용 AI를 한 팀으로 엮는 사람이 진짜 AI 시대의 경쟁력을 갖는다.",
    challenge: "오늘부터 3번, 반복 업무에서 I-MRKO로 지침을 만들어보세요. 3번만 해보면 일주일 뒤엔 나만의 AI 어시스턴트 3대가 생겨 있을 겁니다.",
    faqs: [
      {
        q: "지침이 너무 길어지는데요?",
        a: "섹션 헤더(## 정체성, ## 규칙)로 쪼개기. 지식은 파일로 분리."
      },
      {
        q: "지침과 프롬프트가 충돌하면?",
        a: "보통 최근 입력(프롬프트)이 우선. 단 지침에 '이 규칙은 예외 없음'이라 못 박으면 지침 우선."
      },
      {
        q: "회사 기밀 넣어도 되나요?",
        a: "절대 금지. Enterprise/팀 버전에서만."
      },
      {
        q: "예시 정말 하나도 넣으면 안 되나요?",
        a: "'고정 포맷 템플릿'만 예외. 톤·스타일엔 절대 금물."
      },
      {
        q: "세 플랫폼 중 뭐가 최고?",
        a: "용도별. 글·문서는 Claude, 자동화는 GPTs, 구글 연계는 Gems."
      },
      {
        q: "체인 만들 때 AI 몇 개가 적당?",
        a: "초보자는 2개. 익숙해지면 3~5개. 5개 넘어가면 접점 관리 어려워짐."
      },
      {
        q: "체인 중간에 결과가 이상하면 어디서부터 고쳐야?",
        a: "맨 앞부터. 뒤쪽 오류는 보통 앞쪽 오류가 증폭된 결과."
      },
      {
        q: "단일 AI 내부 단계 vs 수동 체인 중 뭐?",
        a: "속도·간편함은 단일 AI, 품질·재사용성은 수동 체인. 단일 AI로 시작해서 필요하면 분해."
      }
    ]
  },
  {
    id: "course-3",
    heroMessage: "프롬프트는 '설명'이 아니라 '제어 시스템'이다.",
    promises: [
      "묘사를 던지면 AI가 평균값으로 채우고, 설계하면 빈 칸이 사라진다는 사고방식을 갖게 된다",
      "9단 구조(SSDHR + 메타 2단 + 고급 2단)로 어떤 케이스든 분해해서 설계할 수 있게 된다",
      "JSON 자산화와 레퍼런스 분리 — 다른 어디서도 잘 안 가르치는 두 개의 킬러 인사이트를 마스터한다"
    ],
    beforeAfterExample: {
      title: "Before / After — 묘사 vs 설계",
      subtitle: "같은 도구를 써도 결과 퀄리티가 차원이 달라지는 이유",
      before: {
        label: "❌ 묘사형 프롬프트",
        prompt: "따뜻한 색감, 옛날 필름 느낌, 한국인 7세 남자 아이가 일기 쓰는 모습",
        result: "비슷한데 어디가 어색한 평범한 결과 (4대 함정: 방향성 부재 / 우선순위 없음 / 충돌 / 자유 해석)"
      },
      after: {
        label: "✅ 9단 구조 설계",
        prompt: "[자연어 장면] 한국인 7세 남자 아이가 책상에서 일기를 쓰는 모습, 탑뷰.\n일기장: \"오늘은 비가 왔다\"\n\n[Style Lock — JSON]\n{ \"medium\": \"photograph\", \"era\": \"early 2000s\", ... }\n\n[Hard Constraints] 글자 정확히 동일\n[Negative] 깨진 글씨·여분 손가락 금지",
        result: "의도대로 통제된 결과 + 시리즈 100컷에 그대로 재사용 가능"
      }
    },
    parts: [
      {
        title: "Part 1. 한 줄 원리 — 설명이 아니라 제어 시스템",
        intro: {
          subtitle: "문제 제기 — 묘사를 잘했는데 왜 결과가 평범할까?",
          text: "초보 프롬프트의 4대 함정. 한 번 길게 써도 결과가 어색했다면 보통 4가지 중 하나는 빠져 있다.",
          missing: [
            "방향성 부재 — 길게 묘사했는데 뭐가 제일 중요한지 모름",
            "우선순위 없음 — 핵심과 부가가 섞여 있음",
            "충돌 — '사실적인 사진 + 수채화 느낌' 같이 모순된 지시가 한 프롬프트에",
            "자유 해석 — 빈 칸을 AI가 평균값(=흔한 결과)으로 채움"
          ],
          result: "비슷한데 어디가 어색한, 그 묘한 이미지가 나온다"
        },
        content: [
          {
            subtitle: "한 줄 압축 — 설명 vs 제어",
            quote: "프롬프트는 '설명'이 아니라 '제어 시스템'이다.",
            text: "설명은 'AI가 알아서 잘 그려주길' 기대하는 방식. 빈 칸은 AI가 평균값으로 채워서 평범해진다.\n\n제어 시스템은 5단계로 분해해서 각 층의 자유도를 명확히 설계한다. 빈 칸을 남기지 않는다.\n\n한 단계 더 나아가면, 프롬프트는 '재사용 가능한 시각 자산'이 된다.",
            tip: "이 한 줄이 오늘 강의의 사상적 토대. 묘사 → 설계 → 자산. 이 세 단계를 머릿속에 박아두라."
          },
          {
            subtitle: "오늘의 지도 — 9단 구조 (5 + 2 + 2)",
            text: "9개라고 들으면 많아 보이지만 사실 3덩어리. 핵심 5단이 이미지 자체를 만들고, 메타 2단이 모든 단계에 작동하고, 고급 2단이 재사용·통제를 담당한다.",
            table: {
              title: "9단 구조 한눈에",
              rows: [
                { layer: "CORE 5", elements: "① 장면 ② 스타일 ③ 디테일 ④ 강제 ⑤ 물리", role: "이미지를 만든다" },
                { layer: "META 2", elements: "⑥ 위생 ⑦ 반복 개선", role: "모든 단계에 적용" },
                { layer: "ADV 2", elements: "⑧ JSON 자산화 ⑨ 레퍼런스", role: "재사용·통제" }
              ]
            }
          }
        ]
      },
      {
        title: "Part 2. 핵심 5단 (SSDHR)",
        intro: {
          subtitle: "5단 뼈대 — 위에서 아래로 책임 분담",
          text: "5단은 위층이 비면 아래층이 무용지물. 항상 위에서부터 채운다.",
          missing: [
            "① 장면 (Scene) — 누가·무엇을·어디서·어떤 구도",
            "② 스타일 (Style) — 매체·카메라·색감·앵커 (4 레이어)",
            "③ 디테일 (Detail) — 불완전함을 설계 + AI 약점 5가지 통제",
            "④ 강제 규칙 (Hard) — 절대 어기면 안 되는 것",
            "⑤ 물리 규칙 (Reality) — 방향·일관성·인과"
          ],
          result: "이 순서가 핵심. ①번이 비면 ②~⑤번이 다 흔들린다"
        },
        content: [
          {
            subtitle: "① 장면 (Scene) — 4요소를 먼저 박는다",
            text: "주체 · 행동 · 환경 · 구도. 이 4개 중 하나라도 비면 이후 모든 단계가 흔들린다.",
            details: [
              "주체 — 누가/무엇이. 인물·사물·동물·풍경",
              "행동 — 무엇을 하고 있는지. 동사를 명시하라 ('있는 모습'보다 '쓰는 모습'이 훨씬 강함)",
              "환경 — 어디서, 언제. 장소·시간·날씨",
              "구도 — 카메라 시점, 앵글, 거리"
            ],
            example: "'한국인 7세 남자 아이가 책상에 앉아 일기를 쓰는 모습, 위에서 내려다본 탑뷰' — 이 한 문장에 4요소가 다 들어있다."
          },
          {
            subtitle: "② 스타일 (Style) — 4 레이어로 분리",
            text: "'사실적으로'라고만 쓰면 매번 다르게 해석된다. 4 레이어로 분리해서 따로 지정하라.",
            table: {
              title: "스타일 4 레이어",
              rows: [
                { layer: "L1 매체", example: "photograph / illustration / 3D render / watercolor" },
                { layer: "L2 카메라", example: "35mm, f/2.8, ISO 400, shallow depth of field" },
                { layer: "L3 색감", example: "warm earth tones, golden hour, low contrast, slightly desaturated" },
                { layer: "L4 앵커", example: "early 2000s, Kodak Gold 200, documentary photography" }
              ]
            },
            tip: "카메라 사양이 실사 결과를 일러스트풍으로 빠지지 않게 잡아주는 핵심. 생존 작가/특정 IP 참조는 피하고 사조나 매체 단위로 앵커를 걸 것."
          },
          {
            subtitle: "③ 디테일 (Detail) — 불완전함을 설계하라",
            quote: "완벽한 이미지는 'AI스러워' 보인다. 인간미는 어긋남에서 나온다.",
            text: "'더 정교하게'가 아니라 '이만큼 어긋나게'를 설계한다. 손때, 미세한 비대칭, 일정하지 않은 글자 간격, 종이 구김 — 이런 게 빠지면 너무 매끈해서 가짜처럼 보인다.",
            details: [
              "글자 간격이 일정하지 않음",
              "약간 삐뚤어진 글씨",
              "연필 필압이 일정하지 않음",
              "종이가 살짝 구겨져 있음"
            ],
            quote2: "잘 쓴 프롬프트 = 정교한 묘사, 가 아니다. 잘 쓴 프롬프트 = 인간미를 설계하는 프롬프트."
          },
          {
            subtitle: "③-2 디테일 — AI가 자주 틀리는 5곳",
            text: "AI가 특히 잘 틀리는 5개 영역. 우선순위 순서로 외울 것. 그냥 두면 분명 한두 개는 틀려서 온다.",
            table: {
              title: "AI 약점 우선순위",
              rows: [
                { rank: "1순위", area: "텍스트", action: "정확한 문장 명시 + OCR 가능 여부" },
                { rank: "2순위", area: "손가락", action: "'정확히 다섯 손가락' + 사물 잡는 방향" },
                { rank: "3순위", area: "시선", action: "'카메라를 보지 않음' / '왼쪽 아래 응시' 명시" },
                { rank: "4순위", area: "물리적 접촉", action: "'연필이 종이에 실제로 닿아 있음'" },
                { rank: "5순위", area: "그림자 방향", action: "광원 위치와 그림자 방향 일치" }
              ]
            },
            tip: "모델별 강약 다름. Flux는 텍스트 우수, Midjourney는 손가락 우수. 본인이 자주 쓰는 모델의 약점을 파악할 것."
          },
          {
            subtitle: "④ 강제 규칙 (Hard) — 자유 해석을 차단",
            quote: "강제 규칙은 울타리다. 모호하면 그건 규칙이 아니라 권유다.",
            text: "AI가 절대 어기면 안 되는 항목. 텍스트·로고·숫자·고유명사가 들어가면 무조건 강제 규칙으로 못 박을 것. 안 그러면 한 글자 다른 결과가 나온다.",
            details: [
              "반드시 포함 — '일기장에 \"오늘은 비가 왔다\"가 적혀 있음'",
              "절대 변형 금지 — '글자 하나도 바꾸지 말 것'",
              "정확성 검증 — 'OCR로 읽혀야 함' / '로고 비율 유지'"
            ]
          },
          {
            subtitle: "⑤ 물리 규칙 (Reality) — '뭔가 이상함'을 막는 층",
            text: "고급 프롬프트와 평범한 프롬프트가 갈리는 결정적 층.",
            details: [
              "방향성 — 앞뒤·좌우·위아래 (예: 탑뷰에서 글씨는 카메라 기준 180도 뒤집혀야)",
              "물리적 일관성 — 광원과 그림자 일치, 중력, 사물이 떠 있지 않은지",
              "행동 흐름 — 손 움직임과 필기 방향 일치, 동작과 결과의 인과"
            ],
            tip: "진단 팁 — 결과 보고 '왜 이상한지 콕 집어 말하기 어려운데 이상한' 이미지면 거의 다 물리 규칙 실패."
          }
        ]
      },
      {
        title: "Part 3. 메타 규칙 — 위생 + 반복 개선",
        content: [
          {
            subtitle: "⑥ 프롬프트 위생 — 4가지 원칙",
            text: "5단을 잘 짜도 메타 규칙을 어기면 결과가 흔들린다. 5단 전체에 걸쳐 작동하는 원칙들.",
            details: [
              "토큰 순서 — 앞쪽일수록 가중치 높음. 핵심을 앞 25% 안에 배치",
              "충돌 회피 — 모순된 지시('사실적인 사진' + '수채화 느낌')는 무작위 결과를 만든다. 하나의 시각 언어만",
              "네거티브 — '무엇을 만들지' + '무엇을 만들지 말지' 둘 다. 깨진 글씨·여분 손가락·과한 채도 금지",
              "길이 — 단순 30~60단어, 복잡 80~120단어. 길수록 좋은 게 아니라 핵심 토큰의 가중치가 희석됨"
            ],
            tip: "이 4가지 중 가장 자주 어기는 게 '충돌'. 본인 프롬프트에서 충돌 표현부터 잡아내라."
          },
          {
            subtitle: "토큰 순서 실전 — 같은 단어여도 위치에 따라 결과가 다르다",
            text: "스타일을 앞에 두면 모델이 인물보다 '질감'을 우선시해서 인물이 흐릿한 평균값으로 빠진다. 핵심 주체부터 앞에 배치하라.",
            table: {
              title: "토큰 위치별 들어가야 할 것",
              rows: [
                { position: "앞 25%", content: "핵심 주체 + 행동 (장면 정의의 4요소)" },
                { position: "중간", content: "스타일 4 레이어 + 디테일" },
                { position: "뒤", content: "강제 규칙, 네거티브, 후처리 효과" }
              ]
            }
          },
          {
            subtitle: "⑦ 반복 개선 루프 — 무너진 층만 고친다",
            quote: "전체를 다시 쓰지 마라. 무너진 층만 고쳐라.",
            text: "한 번에 완벽한 결과는 없다. 결과 마음에 안 들면 통째로 다시 쓰는 게 가장 흔한 실수 — 잘 됐던 부분까지 다시 흔들린다.",
            details: [
              "1차 생성 → 5단 구조로 베이스 작성",
              "실패 진단 → 어느 층(장면·스타일·디테일·강제·물리)이 무너졌는지 식별",
              "해당 층만 수정 → 다른 부분 그대로 두기",
              "국지적 인페인팅 → 손·텍스트 같은 작은 문제는 부분 재생성"
            ]
          }
        ]
      },
      {
        title: "Part 4. 🔥 킬러 인사이트 ① — JSON으로 스타일을 자산화",
        content: [
          {
            subtitle: "왜 JSON인가",
            quote: "JSON은 스타일을 코드처럼 관리하는 방식이다.",
            text: "자연어 프롬프트의 가장 큰 약점은 재현성. '따뜻한 색감, 옛날 필름 느낌, 살짝 흐릿한' 이렇게 쓰면 모델이 매번 조금씩 다르게 해석한다. 시리즈 1번과 5번 톤이 미묘하게 다른 이유.",
            details: [
              "항목별로 명확하게 인식",
              "시리즈물·캐릭터 락에 강함",
              "한 키만 바꿔서 부분 수정 가능",
              "충돌이 한눈에 보임"
            ]
          },
          {
            subtitle: "표준 Style JSON 구조 — 8개 키",
            text: "스타일을 8개 키로 분리한다 — medium, era, camera, lighting, color, texture, composition, reference_anchor. 2~3단 깊이까지만. 한 번 만들어두면 다음 프로젝트에 그대로 복붙.",
            template: "{\n  \"medium\": \"photograph\",\n  \"era\": \"early 2000s\",\n  \"camera\": { \"lens\": \"35mm\", \"aperture\": \"f/2.8\" },\n  \"lighting\": { \"source\": \"natural\", \"direction\": \"side-left\" },\n  \"color\": { \"palette\": [\"warm beige\", \"muted brown\"] },\n  \"texture\": { \"grain\": \"fine film grain\" },\n  \"reference_anchor\": \"Kodak Gold 200 aesthetic\"\n}",
            tip: "GPT-4o · Claude · Gemini · MJ V6+ · Flux 등 자연어 이해력 강한 모델에서 잘 작동. SDXL 같은 키워드 기반 모델은 키-값을 콤마로 풀어 써야 함."
          },
          {
            subtitle: "시리즈물의 비밀 — Style Lock + Character Lock + Scene",
            text: "고정할 것과 바뀔 것을 분리한다. 시리즈 일관성의 핵심.",
            table: {
              title: "Lock 분리 구조",
              rows: [
                { name: "style_lock", scope: "시리즈 내내 고정", content: "매체·시대·카메라·조명·색감·그레인 (톤 고정)" },
                { name: "character_lock", scope: "시리즈 내내 고정", content: "외형·헤어·의상·고유 특징 (정체성 고정)" },
                { name: "scene", scope: "컷마다 교체", content: "행동·장소·카메라 앵글·시간대" }
              ]
            },
            tip: "1편~10편 만들 때 두 Lock은 그대로 두고 scene만 바꿔서 생성. 일관성이 자동으로 유지된다. 웹툰·동화책·광고 시리즈에서 게임 체인저."
          },
          {
            subtitle: "실전은 자연어 + JSON 하이브리드 — 3분할 구조",
            text: "JSON만 던지면 모델이 너무 경직되게 해석할 때가 있다. 3분할 구조가 가장 안정적.",
            template: "[자연어 장면]\n한국인 7세 남자 아이가 책상에서 일기를 쓰는 모습, 탑뷰.\n일기장: \"오늘은 비가 왔다\"\n\n[Style Lock — JSON]\n{ \"medium\": \"photograph\", \"era\": \"early 2000s\", ... }\n\n[Hard Constraints] 글자 정확히 동일, 글자 방향 아이 기준 정상\n[Negative] 깨진 글씨·여분 손가락·과한 채도 금지",
            details: [
              "자연어 장면 묘사 — 의도를 자연스럽게 전달",
              "Style Lock JSON — 시각 속성을 키-값으로 고정",
              "Hard Constraints + Negative — 절대 어기면 안 되는 것"
            ]
          },
          {
            subtitle: "JSON 사용 5가지 함정",
            text: "JSON은 만능이 아니다. 5가지 함정을 알고 가야 한다.",
            table: {
              title: "JSON 함정 + 해결",
              rows: [
                { trap: "모델별 차이", solution: "SDXL은 키워드 나열, 자연어 강한 모델은 JSON" },
                { trap: "키 언어", solution: "키는 영어, 값은 영어 위주 + 필요시 한글" },
                { trap: "중첩 깊이", solution: "2~3단까지만. 4단 이상은 일부 키 무시됨" },
                { trap: "긴 값", solution: "한 키에 긴 산문 X. 짧고 구체적으로 (값당 ~10단어)" },
                { trap: "맹신", solution: "JSON은 '참조'지 '지시'가 아니다. 강제 규칙은 자연어로 한 번 더 명시" }
              ]
            }
          }
        ]
      },
      {
        title: "Part 5. 🔥 킬러 인사이트 ② — 레퍼런스 통제",
        content: [
          {
            subtitle: "사진을 첨부하는 순간 게임이 바뀐다",
            quote: "사진을 첨부하는 순간, 프롬프트는 '설계도'가 아니라 '수정 지시서'가 된다.",
            text: "텍스트만 쓸 때 프롬프트는 모든 시각 정보를 글로 설명하는 '설계도'. 사진이 들어오면 시각 정보의 90%가 이미 이미지에 담겨 있어서 프롬프트는 '수정 지시서'로 바뀐다.\n\n핵심 사고 — '무엇을 유지하고, 무엇을 변경하고, 무엇을 무시할지' 분리. 묘사가 아니라 분리가 핵심.",
            tip: "이걸 모르고 첨부 사진 옆에 묘사만 쓰면 결과가 뒤섞인다. 사진의 색감만 가져오려 했는데 인물도 따라오고, 인물만 가져오려 했는데 배경도 따라온다 — 레퍼런스 실패의 가장 흔한 원인."
          },
          {
            subtitle: "레퍼런스는 4가지 역할 중 하나로만",
            text: "한 이미지에 여러 역할을 동시에 시키지 말 것. 역할별로 별도 이미지를 준비하라 — 캐릭터 시트, 스타일 레퍼런스, 구도 레퍼런스 따로따로.",
            table: {
              title: "레퍼런스 4가지 역할",
              rows: [
                { role: "스타일", takes: "색감·조명·질감·분위기", ignores: "인물·사물·구도 무시" },
                { role: "캐릭터", takes: "얼굴·체형·헤어·의상", ignores: "배경·포즈·조명 무시" },
                { role: "구도", takes: "카메라 앵글·배치·프레이밍", ignores: "색감·인물·배경 무시" },
                { role: "사물", takes: "특정 사물(로고·제품 등)", ignores: "그 외 모든 요소 무시" }
              ]
            }
          },
          {
            subtitle: "다중 레퍼런스는 라벨링으로 통제",
            text: "2~4장 동시 사용 시 각 이미지의 추출 대상을 명확히 라벨링하라. 모델이 각 이미지에서 무엇을 가져올지 명확히 인식한다.",
            template: "[라벨링]\n- Image A: Character reference (주인공)\n- Image B: Style reference (색감/조명)\n- Image C: Composition reference (구도)\n\n[지시] Image A의 인물을, Image B의 스타일로,\n       Image C의 구도로 그려줘.",
            platforms: [
              "GPT-4o · Claude · Gemini — 'Image A', '첫 번째 이미지', '왼쪽 이미지' 다 잘 인식",
              "Midjourney — --cref (캐릭터), --sref (스타일) 같은 전용 파라미터",
              "Flux Kontext — 멀티 레퍼런스 + 자연어 지시 잘 작동"
            ]
          },
          {
            subtitle: "실전 — 캐릭터 락 + 스타일 락 동시 운용",
            text: "웹툰·동화책·광고 시리즈에서 가장 많이 쓰는 패턴. 새 장면 부분만 컷마다 교체하면 시리즈 일관성을 유지하면서 100컷 이상 만들 수 있다.",
            template: "[레퍼런스]\n- Image A: 주인공 캐릭터 (얼굴/외형 기준)\n- Image B: 시리즈 시각 스타일 (색감/조명/질감)\n\n[지시] Image A의 인물을 정확히 유지하고,\n       Image B의 시각 스타일로 새 장면을 그려줘.\n\n[Character Lock 보강]\n한국인 7세 남자 아이 / 짧은 검은 머리 / 왼쪽 뺨 작은 점\n\n[Style Lock 보강]\n2000년대 디지털카메라 감성 / 따뜻한 자연광 / fine film grain\n\n[Hard / Negative] ...",
            tip: "한 번 잘 잡아두면 다음 프로젝트에 그대로 재사용. 캐릭터만 바꾸거나 스타일만 바꿔서 빠르게 변형도 됨."
          },
          {
            subtitle: "레퍼런스 실패 5대 패턴 + 해결",
            text: "대부분의 레퍼런스 실패는 이 5개로 설명된다. 미리 알면 진단이 즉시 가능.",
            table: {
              title: "실패 패턴 + 해결",
              rows: [
                { pattern: "인물이 미묘하게 달라짐", cause: "레퍼런스 한 장만 + 텍스트 보강 없음", solution: "여러 각도 캐릭터 시트 + 텍스트로 정체성 못 박기" },
                { pattern: "스타일은 맞는데 인물이 바뀜", cause: "스타일 레퍼런스 안의 인물 정보까지 흡수", solution: "인물이 다른 두 스타일 레퍼런스 + '인물은 무시' 명시" },
                { pattern: "구도가 너무 똑같이 따라함", cause: "모델이 레퍼런스를 '복사 대상'으로 인식", solution: "'스타일만, 구도는 새로' 명시" },
                { pattern: "하나만 강하게 반영", cause: "라벨이 모호하거나 우선순위 미지정", solution: "명시적 라벨링 + 'Image A 우선' 가중치 지시" },
                { pattern: "컷마다 인물 변화 (드리프트)", cause: "생성된 결과를 다시 다음 레퍼런스로 사용 (미세한 변화 누적)", solution: "항상 원본 레퍼런스만 사용" }
              ]
            }
          }
        ]
      },
      {
        title: "Part 6. 정리 — 9가지 특징 + 체크카드 3장",
        content: [
          {
            subtitle: "좋은 프롬프트의 9가지 특징",
            text: "오늘 배운 9단 구조의 결과물. 이 9개를 만족하면 결과가 흔들리지 않는다.",
            details: [
              "단계적 설계 — 5단 구조로 뼈대를 잡는다",
              "모호함 제거 — 자유 해석 여지를 남기지 않는다",
              "약점 보완 — 텍스트·손·시선·접촉·그림자를 명시 통제",
              "우선순위 — 토큰 순서로 중요도를 표현",
              "충돌 없음 — 하나의 시각 언어만 일관되게",
              "양방향 정의 — '만들 것'과 '만들지 않을 것' 모두 명시",
              "반복 가능 — 같은 결과를 다시 낼 수 있다",
              "자산화 — JSON으로 코드처럼 관리·재사용",
              "레퍼런스 분리 — 유지/변경/무시를 명확히 구분"
            ]
          },
          {
            subtitle: "체크카드 3장 — 책상에 붙여두세요",
            text: "상황 따라 꺼내 쓰는 카드 3장. 작업할 때마다 어떤 상황인지 먼저 판단하고 해당 카드를 꺼내 쓴다.",
            table: {
              title: "상황별 템플릿",
              rows: [
                { card: "CARD 1 — 단일 이미지", structure: "5단 베이스 (장면·스타일·디테일·강제·물리) + Negative" },
                { card: "CARD 2 — 시리즈물", structure: "자연어 + JSON Lock 하이브리드 (Style Lock + Character Lock + Scene 교체)" },
                { card: "CARD 3 — 레퍼런스", structure: "라벨링 → 유지/변경/무시 분리 → 새 장면 → Lock 텍스트 보강 → Hard / Negative" }
              ]
            }
          },
          {
            subtitle: "잘 쓰는 사람의 3대 습관",
            text: "기술보다 더 결정적인 건 습관이다. 잘 쓰는 분들의 공통점 3가지.",
            details: [
              "진단부터 한다 — 결과가 어긋나면 어느 층(장면·스타일·디테일·강제·물리)이 무너졌는지 먼저 본다. 전체를 다시 쓰지 않는다",
              "자산을 모은다 — 잘 나온 결과의 style_lock·character_lock JSON을 저장. 다음 프로젝트에 그대로 써서 작업 속도가 빨라진다",
              "레퍼런스를 분리한다 — 사진을 첨부할 때 항상 유지·변경·무시 세 축으로 지시문을 작성. 머릿속에 디폴트로 박아둔다"
            ]
          }
        ]
      }
    ],
    habits: [
      {
        title: "진단부터 한다",
        description: "결과가 어긋나면 어느 층이 무너졌는지 먼저. 전체를 다시 쓰지 않는다"
      },
      {
        title: "자산을 모은다",
        description: "잘 나온 결과의 Lock JSON을 저장. 다음 프로젝트에 그대로 재사용"
      },
      {
        title: "레퍼런스를 분리한다",
        description: "유지·변경·무시 세 축으로 분리해서 지시"
      }
    ],
    checkCard: [
      { code: "S", name: "장면", question: "주체·행동·환경·구도 4요소" },
      { code: "S", name: "스타일", question: "매체·카메라·색감·앵커 4 레이어" },
      { code: "D", name: "디테일", question: "불완전함 + AI 약점 5가지 통제" },
      { code: "H", name: "강제 규칙", question: "텍스트·로고·숫자는 무조건 못 박기" },
      { code: "R", name: "물리 규칙", question: "방향·일관성·인과 — '뭔가 이상함' 차단" }
    ],
    conclusion: "프롬프트는 '설명'이 아니라 '제어 시스템'이다.\n\n그리고 한 단계 더 나아가면 — '재사용 가능한 시각 자산'으로 관리된다.\n\n묘사를 잘하는 사람은 어디든 있다. 시각을 설계하는 사람은 적다. 시각을 자산화하는 사람은 더 적다.\n\n오늘부터 그 두 번째, 세 번째 그룹으로.",
    challenge: "오늘부터 딱 3번, 9단 구조(SSDHR + 메타 + JSON·레퍼런스)로 이미지 프롬프트를 설계해보세요. 일주일 뒤에 결과 퀄리티가 분명히 다릅니다.",
    faqs: [
      {
        q: "9단 다 적용하면 너무 길어지는데요?",
        a: "모든 케이스에 다 쓸 필요 없음. 간단한 이미지는 5단만, 시리즈는 +JSON, 레퍼런스 있으면 +9단."
      },
      {
        q: "JSON과 자연어 중 뭐가 좋아요?",
        a: "모델별. 자연어 강한 모델(GPT-4o·Claude·Flux)은 JSON 가능, SDXL 계열은 키워드 나열이 더 잘 먹힘."
      },
      {
        q: "시리즈에서 인물이 자꾸 미세하게 바뀌어요",
        a: "드리프트 현상. 생성된 결과를 다시 레퍼런스로 쓰지 마세요. 항상 원본 레퍼런스만 사용."
      },
      {
        q: "네거티브 프롬프트 정말 효과 있나요?",
        a: "모델별. SDXL은 매우 효과, MJ는 약함, GPT-4o는 자연어 부정문이 더 잘 먹힘."
      },
      {
        q: "Lock JSON은 어디에 저장하나요?",
        a: "노션·옵시디언·스프레드시트. 프로젝트별 폴더에 .json 파일로 검색 가능하게 관리."
      },
      {
        q: "모델이 강제 규칙을 어기면?",
        a: "대부분 토큰 순서·길이 문제. 강제 규칙을 앞쪽으로 옮기고, 자연어로 한 번 더 명시."
      }
    ]
  },
  {
    id: "course-4",
    heroMessage: "바이브 코딩은 코드를 짜는 게 아니라, AI한테 묘사하는 것이다.",
    promises: [
      "'나 코딩 못 하는데 앱 만들 수 있을까?' 의심이 사라진다 — 코딩 아니라 묘사라는 걸 몸으로 받아들인다",
      "지난 강의에서 배운 R-PCCO 5요소를 코딩 맥락에 그대로 응용한다 — 역할 한 줄이 디자인 톤을 결정한다",
      "채점기 점수 + 진짜 작동하는 자기소개 앱 1개를 손에 들고 돌아간다 — 친구한테 보낼 수 있는 결과물"
    ],
    beforeAfterExample: {
      title: "Before / After — 운세 앱 만들기 (라이브 데모)",
      subtitle: "같은 의도, 다른 묘사 — 글 vs 진짜 작동하는 앱",
      before: {
        label: "❌ 묘사 A (모호)",
        prompt: "운세 앱 만들어줘",
        result: "운세 텍스트만 줄줄. '오늘은 동쪽으로 가면...' 이건 앱이 아니라 글"
      },
      after: {
        label: "✅ 묘사 B (5요소 적용)",
        prompt: "너는 모바일 앱 UI 디자이너야.\n회식 자리에서 직장인들이 분위기 풀려고 핸드폰으로 잠깐 보는 앱.\n사용자는 30~40대 직장인, 5초 안에 결과 확인.\n버튼 하나로 회식운, 다시뽑기 가능, 살짝 유머 있게.\n한 페이지 HTML로 만들어줘.",
        result: "버튼이 진짜 클릭되는, 핸드폰처럼 생긴 회식운 앱"
      }
    },
    parts: [
      {
        title: "Part 1. 왜 바이브 코딩인가",
        content: [
          {
            subtitle: "문제 제기 — 코딩 못해도 진짜 앱 만들 수 있나?",
            text: "솔직히 이런 생각 하시죠. '나 코딩 한 줄도 안 해봤는데?', '영어 잘 못 하는데?', '뭐 설치해야 하는 거 아냐?' — 세 가지 다 안 하셔도 됩니다.",
            details: [
              "코딩 안 가르칩니다 — 한 줄도 안 짜요. 변수·함수 그런 거 하나도 안 다룸",
              "영어 안 씁니다 — 한국어로만 갑니다. 결과 똑같이 나옴",
              "오늘은 설치도 안 합니다 — 브라우저 + Claude 계정만 있으면 끝"
            ],
            quote: "오늘 필요한 건 딱 하나 — 묘사하는 능력. 그거 하나면 됩니다."
          },
          {
            subtitle: "한 줄 원리 — AI는 묘사한 대로 만든다",
            text: "지난 강의에서 배웠죠. AI는 '그럴듯한 다음 단어'를 확률로 고른다. 코딩에서도 똑같습니다. 모호하게 묘사하면 평균적이고 무난한 코드. 구체적으로 묘사하면 그 자리에 딱 맞는 앱.",
            analogy: "건축가 비유: AI는 설계도 한 장 받고 그대로 짓는 건축가다. 설계도가 흐릿하면 흐릿한 건물이 나온다. 건축가 탓이 아니라 설계도가 흐릿했던 것.",
            tip: "결과가 별로면 AI 탓하지 마세요. 내 묘사가 흐릿했던 거예요."
          },
          {
            subtitle: "오늘의 핵심 한 문장",
            quote: "바이브 코딩은 코드를 짜는 게 아니라, AI한테 묘사하는 것이다.",
            text: "코드는 AI가 짭니다. 여러분이 하실 일은 — 코드 외우는 게 아니라, 만들고 싶은 걸 잘 묘사하는 거예요. 그러면 AI가 코드로 옮겨줍니다."
          }
        ]
      },
      {
        title: "Part 2. 바이브 코딩 5요소 (R-PCCO 코딩 응용)",
        intro: {
          subtitle: "나쁜 묘사 해부 — '앱 만들어줘'",
          text: "이 한 줄에는 다섯 칸이 다 비어 있다:",
          missing: [
            "누가 만드는 앱? (역할 미정)",
            "왜 만드는 앱? (목적 미정)",
            "누가 어디서 쓸 앱? (맥락 미정)",
            "어떤 모양·크기·기술? (제약 미정)",
            "결과물 형태는? (출력 미정)"
          ],
          result: "다섯 칸이 비니까 AI가 빈 칸을 '평범함'으로 채운다 → 어디에 붙여도 어색한 앱"
        },
        content: [
          {
            subtitle: "① 역할 (Role) — 어떤 개발자로 부를 것인가",
            text: "같은 '자기소개 페이지 만들어줘'라도 '너는 누구야'를 알려주면 결과가 완전히 달라진다. 역할 한 줄이 디자인 톤을 결정.",
            formula: "너는 [경력]년차 [전문 분야] 전문가야.",
            table: {
              title: "역할별 자기소개 페이지 결과",
              rows: [
                { role: "10년차 모바일 UI 디자이너", result: "모바일 우선, 터치 친화, 큰 버튼" },
                { role: "행정 사이트 UX 디자이너", result: "격식 있고, 정보 위주, 가독성 우선" },
                { role: "게임 인터페이스 디자이너", result: "강렬한 색, 애니메이션" },
                { role: "미니멀리스트 웹디자이너", result: "흰 배경, 큰 여백, 군더더기 없음" }
              ]
            },
            tip: "'실재할 법한' 이름이 제일 잘 먹힘. '세계 최고의 천재 디자이너' 같은 과장된 역할은 오히려 덜 효과적."
          },
          {
            subtitle: "② 목적 (Purpose) — 왜 이 앱이 필요한가",
            text: "같은 '자기소개 페이지'라도 왜 만드는지에 따라 완전 다른 앱이 나온다. 목적 없으면 AI는 '평범함'으로 채운다.",
            table: {
              title: "목적별 자기소개 페이지 성격",
              rows: [
                { purpose: "채용 지원용", result: "깔끔, 전문성, 경력 강조, 포트폴리오 링크" },
                { purpose: "친구·SNS 공유용", result: "캐주얼, 사진 위주, 재미 요소, 인터랙션" },
                { purpose: "회사 IR용", result: "신뢰감, 데이터·숫자 위주, 보수적" },
                { purpose: "결혼정보업체 가입용", result: "따뜻한 톤, 라이프스타일, 취미 강조" }
              ]
            },
            questions: [
              "누가 이 앱을 보고 무엇을 하길 원하나? (지원? 연락? 투자?)",
              "성공의 측정 기준은? (면접 통과? 좋아요? 미팅 요청?)",
              "실패하면 어떤 나쁜 결과가? (서류 탈락? 무관심?)"
            ],
            tip: "목적은 '~하기 위해서'로 끝나는 한 문장으로. 한 문장으로 못 쓰면 본인도 목적을 모르는 상태."
          },
          {
            subtitle: "③ 맥락 (Context) — 누가, 어디서, 언제",
            text: "맥락의 3차원. 코딩에선 특히 '어떤 디바이스'가 빠지면 결과가 산으로 간다.",
            dimensions: [
              { label: "Who", question: "누가 쓰나", example: "면접관? 친구? 60대 부모님? 투자자?" },
              { label: "Where", question: "어디서·어떤 기기에서", example: "모바일? 데스크탑? 태블릿? — 바이브 코딩만의 특수 변수" },
              { label: "When", question: "어떤 상황·시점", example: "출퇴근 5초 스캔? 면접관 3분 검토? 발표 중 60초?" }
            ],
            example: "'면접관이 PC에서 3분간 검토할 자기소개 페이지'와 '친구가 카톡으로 받아서 핸드폰에서 30초간 훑을 자기소개 페이지'는 완전히 다른 디자인이어야 한다.",
            tip: "디바이스를 안 알려주면 AI가 데스크탑 기준으로 만든다 → 핸드폰에서 글자 깨지고 버튼 안 보임. 가장 많이 빠뜨리는 건 '읽는 사람의 IT 친숙도'."
          },
          {
            subtitle: "④ 제약 (Constraints) — 가두면 선명해진다",
            quote: "제약이 없으면 AI가 가장 안전한 선택(=평범)을 한다. 가둬야 정밀해진다.",
            text: "코딩에서 제약은 네 종류로 나눠 생각하면 편하다.",
            table: {
              title: "코딩 제약 4종",
              rows: [
                { type: "디자인", example: "흰 배경 / 검정·회색 톤 / 둥근 모서리 / 파스텔" },
                { type: "분량·크기", example: "한 페이지 / 스크롤 한 화면 / 모바일 한 손 조작" },
                { type: "기술", example: "HTML 한 파일 / 외부 라이브러리 없이 / 이미지 없이 텍스트만" },
                { type: "금지", example: "이모지 금지 / 외부 이미지 금지 / 자동 재생 금지" }
              ]
            },
            beforeAfter: {
              before: "자기소개 페이지 만들어줘",
              after: "한 페이지 안에, 검정·회색 톤, 이미지 없이 텍스트만, 모바일 한 손 조작 가능하게 자기소개 페이지 만들어줘"
            },
            tip: "'하지 마' 금지형보다 '이렇게 해줘' 긍정형이 더 잘 먹힘. 처음엔 제약 2~3개부터."
          },
          {
            subtitle: "⑤ 출력 (Output) — 결과물의 모양과 파일",
            text: "코딩의 출력 = 결과물 형태 + 파일 종류. 출력 안 정하면 AI가 기본값으로 텍스트 답변을 준다 → 글로만 답해버림.",
            formats: [
              "한 페이지 HTML — 자기소개·랜딩 페이지",
              "React 컴포넌트 — 재사용할 UI 조각",
              "인터랙티브 미니 앱 — 룰렛·계산기·퀴즈",
              "데이터 시각화 — 차트·대시보드",
              "간단 게임 — 워크샵·아이스브레이킹",
              "정적 페이지 — 문서·포트폴리오"
            ],
            formula: "결과를 [형식]으로 만들어줘. [세부 구조].",
            example: "한 페이지 HTML로 만들어줘. 위에 이름, 가운데 사진 자리, 아래 연락처.",
            tip: "1주차 권장 출력은 '한 페이지 HTML' 하나만. 나머지는 4주차부터 자연스럽게."
          }
        ]
      },
      {
        title: "Part 3. AI한테 한 장, 사람한테 한 장 — CLAUDE.md + README.md",
        content: [
          {
            subtitle: "공감 진입 — 실습에서 느낀 피곤함",
            text: "5요소 매번 다시 쓰는 거 좀 피곤하셨죠. 더 큰 문제: 다음 주에 비슷한 앱 또 만들면? 또 5요소 다 써야 함. 한 달 뒤 친구가 '이거 어떻게 만들었어?' 물으면? 본인도 기억 안 남. 6개월 뒤 폴더 다시 열면? '어 이거 뭐였더라'.",
            tip: "이걸 해결하는 게 두 장의 종이 — CLAUDE.md, README.md."
          },
          {
            subtitle: "두 파일을 짝으로 — 폴더 안에 같이",
            text: "바이브 코딩 프로젝트엔 종이 두 장이 같이 들어간다.",
            table: {
              title: "두 파일의 역할",
              rows: [
                { file: "CLAUDE.md", target: "AI한테", content: "'너는 이 프로젝트에서 이렇게 행동해라' — 정·임·규·지·출 (I-MRKO 그대로)" },
                { file: "README.md", target: "사람한테", content: "'이 프로젝트는 뭐고, 어떻게 쓰는 거고, 누가 만들었다' — 6개월 뒤의 나와 친구를 위한" }
              ]
            },
            template: "# CLAUDE.md\n## 정체성\n너는 10년차 모바일 UI 디자이너야.\n## 임무\n채용 지원용 자기소개 페이지 만들기\n## 규칙\n- 한 페이지에 다 넣기\n- 검정·회색 톤\n- 모바일 한 손 조작\n\n---\n\n# README.md\n# 김민수 자기소개 페이지\n채용 지원용 한 페이지 자기소개입니다.\n## 만든 방법\nClaude로 만들었어요. (2026년 5월)\n## 어떻게 보나\n브라우저에서 index.html 열면 됩니다."
          },
          {
            subtitle: "왜 둘이 짝이어야 하나",
            quote: "코드를 잘 짜는 게 아니라, 두 장의 종이를 잘 깔아두는 것.",
            text: "CLAUDE.md만 있으면 AI는 잘 작동하는데 본인이 까먹는다. README.md만 있으면 본인은 기억나는데 AI가 매번 5요소 다시 들어야 한다. AI한테 한 장, 미래의 나한테 한 장 — 이게 바이브 코딩 하는 사람들의 기본 습관.",
            tip: "오늘 직접 만들진 않음. 4주차에 본격적으로. 오늘은 이름 두 개만 — CLAUDE.md, README.md."
          },
          {
            subtitle: "Claude Code 예고 — 2주차부터 쓸 본격 도구",
            text: "오늘은 브라우저 Artifacts. 다음 주부터는 Claude Code (터미널 도구)로. 원리는 똑같다 — 5요소 그대로 쓰임.",
            table: {
              title: "Artifacts vs Claude Code",
              rows: [
                { aspect: "어디서", artifacts: "브라우저 (claude.ai)", code: "내 컴퓨터 (터미널)" },
                { aspect: "결과물", artifacts: "채팅창 옆 미리보기", code: "진짜 파일로 폴더에 저장" },
                { aspect: "두 장 종이", artifacts: "없음", code: "CLAUDE.md + README.md 깔 수 있음" },
                { aspect: "5요소 적용", artifacts: "동일", code: "동일" }
              ]
            },
            tip: "터미널 처음 보시는 분 걱정 마세요. 2주차 첫 30분이 설치 도와드리는 시간."
          }
        ]
      }
    ],
    habits: [
      {
        title: "묘사부터 시작한다",
        description: "코드 외울 생각 마세요. 5요소부터 채우고, 그 다음 AI한테. 코드는 AI가 짭니다"
      },
      {
        title: "작게 쪼개서 만든다",
        description: "'쇼핑몰 만들어줘' 안 됨. '상품 목록부터' → '장바구니 버튼' → '결제 화면' 한 단계씩"
      },
      {
        title: "대화로 고친다 (안 풀리면 새 대화로 도망)",
        description: "한 번에 완성 안 됨. '○○ 바꿔줘'로 대화. 그래도 안 풀리면 새 대화 시작 — 거짓말처럼 풀리는 경우 많음"
      }
    ],
    checkCard: [
      { code: "R", name: "역할", question: "어떤 개발자? (10년차 UI 디자이너)" },
      { code: "P", name: "목적", question: "왜 만드는 앱? (채용 지원용)" },
      { code: "C", name: "맥락", question: "누가 어디서? (면접관 PC 3분)" },
      { code: "C", name: "제약", question: "색·크기·기술? (한 페이지, 흰 배경)" },
      { code: "O", name: "출력", question: "어떤 파일? (HTML 한 파일)" }
    ],
    conclusion: "바이브 코딩은 코딩이 아니라 묘사다.\n\n묘사를 잘하는 사람이 앱을 만든다.\n\n1차 강의에서 '프롬프트는 내 사고력의 증폭기', 2차에서 '지침은 범용 AI를 전용으로 바꾸는 설정'이라 했다. 오늘은 그 둘을 코딩으로 확장했다. 같은 메시지의 다른 버전.\n\n코드는 AI가 짠다. 여러분이 할 일은 두 장의 종이를 잘 깔아두는 것 — CLAUDE.md, README.md.",
    challenge: "오늘부터 다음 주까지 5요소로 앱 3번 만들기. 그냥 3번. 그러면 다음 주 오실 때 감 잡고 오실 겁니다.",
    faqs: [
      {
        q: "영어로 해야 더 잘 되나요?",
        a: "한국어로도 충분. 다만 전문 용어(HTML, CSS 등)는 영어 그대로 써도 OK."
      },
      {
        q: "노트북 없으면 6주 못 따라가나요?",
        a: "1~2주차는 핸드폰으로도 OK. 3주차부터는 노트북 권장. 슬랙으로 미리 준비 안내."
      },
      {
        q: "비용이 얼마나 드나요?",
        a: "claude.ai 무료 플랜으로 1~3주차 충분. 4주차부터 Claude Code 비용 발생 가능 — docs.claude.com 참고."
      },
      {
        q: "한 번 만든 거 수정 어떻게 해요?",
        a: "같은 대화에서 '○○ 바꿔줘' 한 마디. 안 풀리면 새 대화 시작."
      },
      {
        q: "진짜 개발자처럼 되는 건가요?",
        a: "정직하게 — 한계 있음. 만들 수 있는 것/없는 것은 6주차에 본격 안내."
      },
      {
        q: "만든 거 다른 사람한테 어떻게 보여줘요?",
        a: "5주차에 배포 다룸. 친구한테 URL 보내는 것까지."
      },
      {
        q: "회사 비밀 정보 넣어도 되나요?",
        a: "절대 금지. 일반 버전은 학습 데이터로 쓰일 수 있음."
      },
      {
        q: "AI가 거짓말할 때 어떻게 알아요?",
        a: "본인이 만든 결과 직접 클릭해서 작동 확인. 4주차에 자세히 다룸."
      }
    ]
  },
  {
    id: "course-5",
    heroMessage: "AI가 못하는 게 아니라, 전달이 부족한 겁니다.",
    promises: [
      "결과가 빈껍데기일 때 'AI가 별로네'가 아니라 '내 설계 어디가 부족했지'를 먼저 묻게 된다 — AI 탓이 사라진다",
      "모든 자동화를 인풋(재료)·스펙(도구)·아웃풋(완성품) 3기둥으로 분해하는 사고가 자동 작동한다",
      "내 업무에 바로 쓸 자동화 설계도(plan.md) 한 장을 손에 들고 돌아간다 — 작게 시작하는 첫 번째 자동화"
    ],
    beforeAfterExample: {
      title: "Before / After — '후킹 영상 만들어줘'",
      subtitle: "큰 단어만 던진 요청 vs 초미세 단어까지 설계한 요청",
      before: {
        label: "❌ 묘사 A (큰 단어)",
        prompt: "후킹 영상 만들어줘",
        result: "AI가 3초 고민하다 '지금 안 보면 후회합니다!' 어디서 본 듯한 평균값을 뱉음 → 다시 만들어야 함"
      },
      after: {
        label: "✅ 묘사 B (초미세 단어까지 설계)",
        prompt: "공포 소구 / 0~2초 충격 비주얼 / 병명 텍스트 위치 / 앵글 / 자막 색 — 다섯 가지를 설계해서 만들어줘.",
        result: "의도한 디테일이 그대로 — 한쪽은 다시 만들어야 하고, 한쪽은 바로 사용 가능"
      }
    },
    parts: [
      {
        title: "Part 1. 왜 자동화는 실패하는가",
        content: [
          {
            subtitle: "문제 제기 — 같은 AI, 왜 누구는 빈껍데기?",
            text: "누구는 AI로 영상을 하루 수십 개씩 자동으로 찍어 올리고, 상품을 수천 개씩 자동 소싱한다. 또 누구는 '결과물이 매번 똑같고 영혼이 없다'며 포기한다. 같은 AI인데 왜 이렇게 다를까? 차이를 만드는 변수는 딱 하나 — 내가 어떻게 전달하고 설계했느냐.",
            tip: "최근 AI에게 시켰다가 실망한 자동화 하나만 떠올려보세요. 그게 오늘 강의의 실습 재료가 됩니다."
          },
          {
            subtitle: "한 줄 원리 — AI는 내 노하우를 모른다",
            text: "AI에 큰 단어를 던지면, 세상에서 가장 흔한 단어를 조합해 뱉는다. 흔한 단어는 핵심 단어가 아니다. 너무 일반적이라 전문성이 떨어진다. 왜? AI는 내 머릿속 경험·노하우를 모르기 때문.",
            analogy: "요리사 비유: '맛있는 거 해줘'라고 한 사람과 '마늘 2쪽, 미디엄으로 구워'라고 한 사람. 누구 접시가 내 입맛에 맞을까? AI도 똑같다. 단어 단위로 쪼개서 전달해야 한다.",
            tip: "'요리 비유'는 오늘 강의 전체를 관통하는 핵심 — 재료·도구·완성품으로 계속 우려먹는다."
          },
          {
            subtitle: "한 줄 정의 — 자동화 = 쪼개서 넘기는 설계",
            text: "자동화를 한 줄로 정의하면: '일을 부품으로 쪼개 AI에게 넘기는 설계.' 이걸 요리 하나로 묶을 수 있다 — 자동화의 3기둥.",
            table: {
              title: "자동화의 3기둥 (요리 비유)",
              rows: [
                { pillar: "인풋 (재료)", meaning: "어떤 재료를 어떤 비율로 넣느냐", example: "제품 설명·레퍼런스 이미지·고객 데이터" },
                { pillar: "스펙 (도구)", meaning: "오븐이냐 후라이팬이냐", example: "어떤 LLM·이미지AI·API로 처리할지" },
                { pillar: "아웃풋 (완성품)", meaning: "완성품 + 잘 됐는지 보는 눈", example: "1080×1350 PNG / 검증 기준" }
              ]
            },
            tip: "이 세 칸을 정의하는 게 자동화의 전부. 뒤에 나올 5단계가 이 3기둥을 채우는 구체적 방법."
          },
          {
            subtitle: "핵심 한 문장 — 전달이 부족한 것",
            quote: "AI가 못하는 게 아니라, 전달이 부족한 겁니다.",
            text: "자율주행차가 아무리 좋아도 목적지를 안 알려주면 주차장에 서 있다. AI도 똑같다. 엔진은 이미 충분히 강력한데, 방향키는 여러분 손에 있다. 결과의 질은 AI가 아니라 내 설계가 정한다."
          }
        ]
      },
      {
        title: "Part 2. 자동화 5단계 — BATLR (쪼·에·도·연·기)",
        intro: {
          subtitle: "나쁜 자동화 해부 — '인스타 광고 영상 자동화해줘'",
          text: "이 한 줄에는 네 가지가 다 비어 있다:",
          missing: [
            "인풋이 안 정해졌다 — 어떤 제품·데이터를 어떤 형식으로 넣을지",
            "요소를 안 쪼갰다 — '영상'을 후킹·메시지·CTA로 안 나눴다",
            "도구가 없다 — 어떤 생성 AI로 만들지",
            "아웃풋이 없다 — 규격도, 검증 기준도 없다"
          ],
          result: "네 칸이 비니까 AI가 빈 칸을 '평범함'으로 채운다 → 운 좋으면 먹을 만한, 십중팔구 내 맛은 아닌 결과"
        },
        content: [
          {
            subtitle: "① 쪼개기 (Break) — 초미세 단어 + MECE",
            text: "큰 단어 → 중간 단어 → 작은 단어 → 초미세 단어로 마인드맵 그리듯 내려야 한다. 초미세 단어가 곧 AI에게 줄 체크리스트.",
            example: "'후킹' (큰 단어) → '공포·호기심·선망 후킹' (중간) → '충격 비주얼·병명 텍스트' (작은) → '앵글·폰트 크기·노출 초·배경음' (초미세)",
            table: {
              title: "쪼개기 데모 — '예쁜 얼굴' 분해",
              rows: [
                { level: "큰 단어", word: "예쁜 얼굴" },
                { level: "중간 단어", word: "청순 / 걸크러쉬 / 이국적" },
                { level: "작은 단어", word: "눈매 / 코 라인 / 입술 두께" },
                { level: "초미세 단어", word: "얼짱 각도 (얼굴형마다 다름) / 조명 방향 / 그림자 농도" }
              ]
            },
            tip: "쪼갠 걸 MECE — 빠짐없이(완전성)·겹치지 않게(독립성) 정리. 중복되거나 빠지면 스펙 자체가 엉망이 된다."
          },
          {
            subtitle: "② 에셋화 (Asset-ize) — 레고 블럭처럼",
            text: "완성품을 부품(에셋)으로 분리하면 스펙 관리·부분 수정·재사용이 가능해진다. 에셋 = 인풋의 단위.",
            analogy: "레고 비유: 레고 성을 통째로 '똑같이 만들어줘' 하면 어렵다. '이 벽은 빨간 블럭 10개, 탑은 파란 블럭 5개'로 나눠두면 누구든 조립한다.",
            example: "15초 광고 영상 → 에셋 1 후킹(0~2초) / 에셋 2 메인 메시지 / 에셋 3 CTA / 에셋 4 오디오. 이렇게 하면 부분만 수정·재사용 가능. 전체 다시 만들 필요 없음.",
            tip: "에셋 찾는 법 = 역설계. ① 만들고 싶은 결과물 → ② 어떤 요소로 구성됐지? → ③ 각 요소의 비율·스펙은? 단, 역설계하려면 그 분야를 알아야 한다. 빵을 안 만들어 본 사람은 크루아상을 역설계할 수 없다."
          },
          {
            subtitle: "③ 도구 (Tool) — 스펙은 오븐이고 냄비다",
            text: "레시피가 완벽해도 도구를 모르면 결과가 안 나온다. 같은 재료라도 오븐이냐 후라이팬이냐에 따라 다른 게 나온다.",
            table: {
              title: "도구별 강점 (입문자 인식용)",
              rows: [
                { type: "이미지", tools: "미드저니 (감성) / DALL·E (텍스트 처리) / 스테이블디퓨전 (세밀 조정)" },
                { type: "영상", tools: "런웨이 / 피카 / 클링 / Veo" },
                { type: "음성", tools: "일레븐랩스 등" },
                { type: "API", tools: "코드로 AI를 부르는 통로 — 크기·스타일·품질 등 파라미터가 결과 좌우" }
              ]
            },
            quote: "API 문서는 LLM에 통째로 넣고 '내가 쓸 파라미터만 예제 코드와 정리해줘'라고 시켜라.",
            tip: "남이 좋다고 무조건 좋은 게 아니다. 내 워크플로우에 직접 붙여 테스트해봐야 안다. 단, '그런 기술이 있다'는 이름 정도는 알아둬야 그걸 시킬 수 있다."
          },
          {
            subtitle: "④ 연결 (Link) — 평면이 아니라 레이어로",
            text: "자동화는 평면이 아니라 입체, 레이어로 쌓인다. 앞 단계의 아웃풋이 다음 단계의 인풋이 된다.",
            example: "L1: 레퍼런스·카피 모아 '에셋 파일' 생성 → L2: 이미지 생성과 카피 생성이 동시에 돌아가 한 장면 완성 → L3: 장면들을 영상으로 조립",
            analogy: "파스타 비유: 면 삶는 타이밍에 소스도 같이 완성돼야 한다. 한 번에 안 그려지면, 레고처럼 하나씩 쌓아라.",
            tip: "입문자에겐 가장 추상적인 단계. '동시에 작동'과 '순서대로 연결'을 구분해서 이해해야 한다."
          },
          {
            subtitle: "⑤ 기록 (Record) — 덧바르기 금지",
            quote: "1개 고치면 계획서를 바로 업데이트한다.",
            text: "자동화는 수정이 정말 많다. 그런데 수정 5개를 모았다 한 번에 반영하면, 문제 생겼을 때 5개 중 뭐가 원인인지 다시 삽질하게 된다. 이게 '덧바르기'다.",
            beforeAfter: {
              before: "수정 5개 모았다 한 번에 반영 → 오류 터지면 원인 못 찾음",
              after: "1개 고치면 계획서부터 갱신 → 전체 영향 확인 → 오류 10개가 1개로 줄어듦"
            },
            tip: "계획서는 거창할 필요 없음. 메모장·노션·plan.md 한 장이면 충분. 계획서 없이 덧바르는 건 지도 없이 산 오르는 것."
          }
        ]
      },
      {
        title: "Part 3. 설계 데모 — 후킹 카드 1장",
        content: [
          {
            subtitle: "데모 인트로 — 작게 시작하라",
            text: "5단계를 직접 엮어본다. 실습은 아니고 설계 사고 과정만 따라가는 데모. 목표는 작게: '제품 설명 한 단락 → 인스타 후킹 카드 한 장'. 코드는 안 본다.",
            tip: "거대한 자동화 말고 카드 1장으로 시작 — 입문자의 부담을 확 줄이는 출발점."
          },
          {
            subtitle: "①② 쪼개고 에셋으로 정의",
            text: "'후킹 카드'는 큰 단어. 4개 부품으로 내린다.",
            table: {
              title: "후킹 카드 4개 에셋",
              rows: [
                { asset: "에셋 1 헤드라인", spec: "제품 핵심 18자 이내 1줄 / 공포·호기심 소구 중 하나" },
                { asset: "에셋 2 배경 이미지", spec: "헤드라인 키워드 기반 / 포토리얼 / 세로형" },
                { asset: "에셋 3 텍스트 스타일", spec: "굵게 / 상단 배치 / 노랑·흰색 고대비" },
                { asset: "에셋 4 캔버스", spec: "1080×1350 / 안전 여백 64px" }
              ]
            },
            tip: "각 에셋이 독립 부품이라 나중에 '배경만 바꿔줘'가 가능해진다."
          },
          {
            subtitle: "③④⑤ 도구·연결·계획서 — 망하는 요청 vs 되는 요청",
            text: "3기둥으로 정리 → 레이어로 연결 → 계획서 한 장으로.",
            table: {
              title: "3기둥 정리",
              rows: [
                { pillar: "인풋", value: "제품 설명 텍스트" },
                { pillar: "스펙", value: "헤드라인 = LLM / 배경 = 이미지AI / 합성 = 코드" },
                { pillar: "아웃풋", value: "1080×1350 PNG 파일" }
              ]
            },
            beforeAfter: {
              before: "'인스타 카드 만들어줘' → 망함",
              after: "'L1에서 헤드라인 3개 뽑고, L2 배경 만들고, L3에서 합쳐줘. 스펙은 계획서 참고' → 됨"
            },
            tip: "이 모든 걸 plan.md 한 장에 적고, 1개 고칠 때마다 갱신. 이게 오늘 배운 5단계가 한 문장에 다 녹아있는 모습."
          }
        ]
      }
    ],
    habits: [
      {
        title: "작게 시작한다",
        description: "한 번에 다 만들지 않는다. 레고처럼 하나 만들고 확인하고 또 쌓는다. 거대한 자동화 말고 카드 1장부터"
      },
      {
        title: "부품으로 쪼갠다",
        description: "결과물을 에셋으로 분리하고 스펙을 정의한다. 그래야 수정·재사용이 쉬워진다"
      },
      {
        title: "계획서로 움직인다",
        description: "머릿속이 아니라 문서로. plan.md 한 장. 1개 고치면 계획서부터 갱신. 결국 핵심은 — AI를 사람 대하듯, 어제 기억 없는 유능한 팀원에게 일 시키듯"
      }
    ],
    checkCard: [
      { code: "B", name: "쪼개기", question: "초미세 단어까지? + MECE 정리됐나?" },
      { code: "A", name: "에셋화", question: "부품으로 분리됐나? 역설계 가능?" },
      { code: "T", name: "도구", question: "어떤 생성 AI·API로? 파라미터는?" },
      { code: "L", name: "연결", question: "레이어로 입체 조립됐나?" },
      { code: "R", name: "기록", question: "계획서에 적으며 진행 중인가?" }
    ],
    conclusion: "AI가 못하는 게 아니라, 설계가 부족한 겁니다.\n\n순서를 잊지 마세요. 생각 → 쪼개고 설계 → 자동화.\n\n앞으로 AI가 아무리 좋아져도, 결과의 질은 여러분의 설계가 결정합니다. 일을 구조화하는 사람이 AI를 다룹니다. 도구를 탓하지 말고, 도구를 이해하세요.\n\n1차에서 '프롬프트는 내 사고력의 증폭기', 2차에서 '지침은 범용 AI를 전용으로 바꾸는 설정', 4차에서 '바이브 코딩은 묘사다'라고 했습니다. 오늘 5차는 그 모든 걸 묶는 메시지 — 자동화는 일을 부품으로 쪼개서 AI에게 넘기는 설계입니다.",
    challenge: "오늘부터 딱 하나만 — 지금 하고 있는 업무 하나를 골라, 인풋(재료)·스펙(도구)·아웃풋(완성품)으로 쪼개보세요. 한 번만 해보면 감이 옵니다.",
    faqs: [
      {
        q: "코딩 못해도 되나요?",
        a: "됩니다. API 문서는 LLM이 정리해줍니다. 단 기술 '이름'은 알아두세요 — 그래야 그걸 시킬 수 있습니다."
      },
      {
        q: "어디서부터 시작하죠?",
        a: "내가 제일 잘 아는 분야의 작은 작업 하나부터. 빵 안 만들어본 사람은 크루아상 역설계 못 합니다."
      },
      {
        q: "도구가 너무 많은데 다 써봐야 하나요?",
        a: "하나만 깊게. 내 워크플로우에 붙여 테스트하며 천천히 늘리세요."
      },
      {
        q: "자동화가 자꾸 깨져요.",
        a: "십중팔구 계획서 없이 덧바른 것. 1개 수정 → 바로 기록 원칙만 지켜도 오류 10개가 1개로 줄어듭니다."
      },
      {
        q: "거대한 자동화부터 만들어도 되나요?",
        a: "안 됩니다. '광고 영상 자동화해줘'는 망합니다. '후킹 카드 1장'부터 — 작게 시작, 레이어로 쌓기."
      },
      {
        q: "어떤 도구가 제일 좋아요?",
        a: "남이 좋다고 무조건 좋은 게 아닙니다. 이미지면 미드저니·DALL·E·스테이블디퓨전 강점이 다 다릅니다. 직접 워크플로우에 붙여 테스트하세요."
      },
      {
        q: "AI한테 시키면 시킬수록 더 못하는 느낌인데요?",
        a: "큰 단어로 시켰을 가능성 높음. '후킹'이 아니라 '공포 소구 / 0~2초 충격 비주얼 / 병명 텍스트 위치' 수준까지 쪼개세요."
      },
      {
        q: "회사 비밀 정보 넣어도 되나요?",
        a: "절대 금지. 일반 버전은 학습 데이터로 쓰일 수 있음."
      }
    ]
  },
  {
    id: "course-6",
    heroMessage: "Claude Code의 맥락엔 '내 컴퓨터'가 들어간다 — 묘사하면 진짜 도구가 된다.",
    promises: [
      "claude.ai Artifacts와 달리, 내 컴퓨터에서 진짜 실행되고 내 파일을 다루는 프로그램을 만들 수 있게 된다",
      "프로그램이 2단계 이상으로 커지면 '레이어로 쪼개 지침으로 넘기는' 설계가 손에 붙는다 — 2차 I/O 계약의 코드 버전",
      "어떤 프로그램이든 그대로 시작할 '재사용 스캐폴드' 한 벌(CLAUDE.md·README·DEVLOG·specs…)을 들고 돌아간다"
    ],
    beforeAfterExample: {
      title: "Before / After — '파일 이름 바꿔주는 프로그램 만들어줘'",
      subtitle: "막연한 한 줄 vs 빌드 5단계로 묘사한 요청",
      before: {
        label: "❌ 막연한 요청",
        prompt: "파일 이름 바꿔주는 프로그램 만들어줘",
        result: "터미널만 깜빡 → 뭘 어떻게 써야 할지 모를 결과, 다시 설명해야 함"
      },
      after: {
        label: "✅ 빌드 5단계로 묘사",
        prompt: "너는 작은 프로그램을 잘 만드는 개발자야. 폴더를 정하면 그 안 파일 이름을 규칙대로 제자리에서 바꾸고, 바꾸기 전 미리보기·되돌리기까지. Node.js로, 브라우저에서 버튼으로.",
        result: "내 컴퓨터에서 진짜 도는 도구 — 레이어로 깔끔히 나뉘고, git으로 백업까지"
      }
    },
    parts: [
      {
        title: "Part 1. 왜 Claude Code인가",
        content: [
          {
            subtitle: "문제 제기 — 4차에서 만든 운세 앱, 지금 어디 있죠?",
            text: "claude.ai Artifacts로 만든 앱은 브라우저 안에만 있었다. 닫으면 사라지고, 내 컴퓨터 파일은 못 만진다. '내 다운로드 폴더 정리해줘' 같은 진짜 일은 못 한다. 그걸 하는 게 Claude Code — 터미널에서 도는 AI 코딩 도구다.",
            tip: "오늘은 같은 R-PCCO를 그대로 쓴다. 단, '맥락'에 내 컴퓨터·내 폴더·실행 환경이 들어갈 뿐."
          },
          {
            subtitle: "한 줄 차이 — Artifacts vs Claude Code",
            text: "같은 'AI로 만들기'지만 도는 곳과 남는 것이 다르다.",
            table: {
              title: "모래상자 vs 내 컴퓨터",
              rows: [
                { aspect: "어디서 도나", artifacts: "브라우저 모래상자", claudecode: "내 컴퓨터에서 진짜로" },
                { aspect: "내 파일 접근", artifacts: "못 함", claudecode: "내 폴더·파일 직접" },
                { aspect: "파일 개수", artifacts: "보통 단일 파일", claudecode: "여러 파일(레이어)" },
                { aspect: "잘하는 일", artifacts: "빠른 웹 시제품", claudecode: "진짜 도구·자동화·공유" }
              ]
            }
          },
          {
            subtitle: "막히면 슬래시 — 외울 건 네 개 + 토큰 절약 하나",
            text: "슬래시 한 글자로 강력해지는 단축어. 그리고 plan(계획) 모드는 Shift+Tab으로 전환한다.",
            details: [
              "/help — 명령어 목록 (막혔을 때 첫 명령)",
              "/init — CLAUDE.md(설명서) 자동 생성 (새 폴더 시작 시)",
              "/clear — 대화 비우기 (새 작업 시작 시)",
              "/permissions — 권한 허용/차단 설정",
              "/compact — 지금까지 요약해 토큰 절약 (대화가 길어질 때)",
              "Shift+Tab — plan(계획) 모드 전환 (위험 변경 전 '계획만 먼저'). 쉽게는 '먼저 계획만 보여줘'라고 말해도 됨"
            ]
          }
        ]
      },
      {
        title: "Part 2. 만들고 → 돌려보고 → 고친다",
        content: [
          {
            subtitle: "만능 5단계 + R-PCCO로 묘사",
            text: "어떤 작업이든 통하는 흐름: ①폴더 준비 → ②claude 실행 → ③의도 설명(R-PCCO) → ④단계별 → ⑤확인·반복. 핵심은 3번, 의도 설명이다.",
            example: "역할 '작은 프로그램 잘 만드는 개발자' / 목적 '폴더 파일 이름 제자리에서 바꾸기' / 맥락 'Windows·Node.js·브라우저' / 제약 '미리보기·한글 안전·단순하게' / 출력 '실행 한 줄로 열리는 한 페이지'.",
            tip: "코드를 한 줄도 안 쓴다. 우리가 아는 R-PCCO로 '묘사'만 한다."
          },
          {
            subtitle: "화면을 읽어라 — Context · Tools · Permissions",
            text: "이 세 단어를 알면 Claude Code의 모든 동작이 한 번에 보인다.",
            table: {
              title: "핵심 개념 3",
              rows: [
                { concept: "Context (맥락)", meaning: "지금 Claude가 아는 모든 것 — 대화·파일·지침" },
                { concept: "Tools (도구)", meaning: "컴퓨터에 손대는 능력 — Read·Write·Bash. 화면에 떠서 '지금 뭘 하는지' 보임" },
                { concept: "Permissions (권한)", meaning: "위험한 작업 전 묻는 안전벨트 — '1초 읽고' 승인" }
              ]
            },
            quote: "권한 확인을 빨리 가려고 다 Yes 누르지 말 것 — 신규 실수 1위."
          },
          {
            subtitle: "로컬 서버로 바로 돌려본다",
            text: "'로컬 서버로 띄워줘' 하면 Claude가 Node.js로 서버를 켠다. 브라우저에서 localhost:3000(3000은 '포트', 프로그램의 문 번호)을 열면 — 내 컴퓨터에서 진짜 도는 순간. Artifacts엔 없던 경험이다.",
            tip: "포트 충돌이 나면 '다른 포트로 띄워줘' 한마디."
          },
          {
            subtitle: "에러는 적이 아니라 정보다 — 디버깅 5요소",
            text: "'안 돼요 고쳐주세요'는 정보가 0이라 Claude가 추측한다. 다섯 가지를 주면 5분이면 고쳐진다.",
            details: [
              "① 무슨 명령을 했는지",
              "② 에러 메시지 전체 (일부 X)",
              "③ 환경 (OS·버전)",
              "④ 언제부터",
              "⑤ 원하는 결과"
            ]
          }
        ]
      },
      {
        title: "Part 3. 레이어로 쪼개기 — I/O 계약 (핵심)",
        content: [
          {
            subtitle: "문제 — 한 파일에 다 엉켰다",
            text: "규칙·미리보기·적용·되돌리기가 한 파일에 뒤섞이면, 수정하려 할 때 어디를 건드릴지 헷갈린다. 2차 강의에서 배운 그 원리를 꺼낼 때다.",
            tip: "프로그램도 글처럼 '레이어로 쌓는다'. 한 방에 완성하지 않는다."
          },
          {
            subtitle: "원칙 — 한 단계 한 책임, 접점은 계약으로",
            quote: "체인의 성패는 지침이 아니라 지침 사이의 '접점'에 달렸다. 산문은 체인의 적.",
            text: "일이 커지면 단계로 나누고, 한 단계는 한 가지 책임만 진다. 수집은 변환 안 하고, 변환은 저장 안 한다. 단계 사이는 반드시 구조화된 데이터(JSON)로 넘긴다."
          },
          {
            subtitle: "3단계로 — 수집 → 변환계획 → 출력",
            text: "파일 변경기를 세 단계로 쪼갠다. 사이엔 '계약(JSON)'이 흐른다.",
            table: {
              title: "3단계 레이어",
              rows: [
                { stage: "1 수집", role: "폴더 → 파일 목록", contract: "→ 파일목록 JSON" },
                { stage: "2 변환계획", role: "규칙 → 새 이름 계획 (저장 안 함)", contract: "→ 변경계획 JSON" },
                { stage: "3 출력", role: "계획대로 제자리 변경 + 되돌리기 기록", contract: "—" }
              ]
            },
            example: "한 덩어리였던 코드가 collect·transform·output 파일로 갈라진다. Artifacts는 단일 파일에 욱여넣어야 했다 — 멀티파일, 이게 Claude Code의 가치.",
            tip: "각 단계 지침(스펙)을 코드보다 '먼저' 쓰고, '이 약속대로 구현해줘'라고 시킨다 (스펙 우선)."
          },
          {
            subtitle: "접점에 적는 것 — 포·필·범·메",
            text: "단계 사이로 넘기는 데이터의 약속. 넘기는 쪽·받는 쪽 지침에 '같은 포맷'을 적어야 안 깨진다.",
            table: {
              title: "I/O 계약 4요소",
              rows: [
                { element: "포 (Format)", meaning: "어떤 구조로 — JSON / 표 / 헤더 섹션" },
                { element: "필 (Required)", meaning: "반드시 들어갈 항목" },
                { element: "범 (Scope)", meaning: "개수·분량·깊이 한계" },
                { element: "메 (Metadata)", meaning: "충돌 표시·개수 등 메타정보" }
              ]
            }
          }
        ]
      },
      {
        title: "Part 4. 재사용 스캐폴드 + git·공유",
        content: [
          {
            subtitle: "프로그램 = 코드 + 구조 파일들",
            text: "초보가 무너지는 건 실력이 아니라 구조가 없어서다. 어떤 프로그램이든 이 파일 뼈대로 시작한다.",
            table: {
              title: "있으면 안 무너지는 파일들",
              rows: [
                { file: "CLAUDE.md", role: "AI가 매 세션 자동으로 읽는 설명서", auto: "자동" },
                { file: "specs/*.md", role: "단계별 지침(I/O 계약)", auto: "자동(참조)" },
                { file: "README.md", role: "사람용 설명서", auto: "—" },
                { file: "DEVLOG.md / HANDOVER.md", role: "개발로그 / 인수인계", auto: "—" },
                { file: ".env / .gitignore", role: "비밀·설정 / 깃 제외", auto: "—" }
              ]
            },
            tip: "처음부터 다 만들지 말 것 — 최소 3개로 시작해 작게 키운다."
          },
          {
            subtitle: "git 안전망 + 공유의 진실",
            text: "git은 시간 여행 — 큰 작업 전 커밋해두면 AI가 망쳐도 한 줄로 되돌린다. 그리고 이 도구는 URL로 남이 못 쓴다.",
            beforeAfter: {
              before: "Vercel에 URL 배포 → 남이 못 씀 (배포된 웹서버는 방문자 파일을 못 만짐)",
              after: "GitHub로 코드 공유 → 남이 받아 자기 컴퓨터에서 실행. (남의 파일 안 만지는 앱은 URL 배포가 맞다)"
            },
            quote: "무엇을 만드느냐가 배포 방식을 정한다."
          }
        ]
      }
    ],
    habits: [
      {
        title: "묘사는 R-PCCO로, 커지면 레이어로",
        description: "프로그램 요청도 역할·목적·맥락·제약·출력. 2단계 이상이면 단계로 쪼개고 단계별 지침을 쓴다"
      },
      {
        title: "위험한 일은 미리보기·plan·git 먼저",
        description: "되돌릴 수 없는 일은 먼저 보여주고, 큰 변경은 계획 모드로, 작업 전엔 git 백업"
      },
      {
        title: "구조부터 깐다",
        description: "작게 요청 → 돌려보고 → 다음. 그리고 코드보다 파일 구조(스캐폴드)를 먼저 갖춘다"
      }
    ],
    checkCard: [
      { code: "묘", name: "묘사", question: "R-PCCO로 뭘 만들지 정했나?" },
      { code: "실", name: "실행", question: "로컬 서버로 돌려 확인했나?" },
      { code: "분", name: "분리", question: "2단계 이상이면 레이어로 쪼갰나?" },
      { code: "갖", name: "갖춤", question: "CLAUDE.md·README·스펙 등 갖췄나?" },
      { code: "공", name: "공유", question: "git 백업 + 공유까지 했나?" }
    ],
    conclusion: "Claude Code의 맥락엔 '내 컴퓨터'가 들어갑니다.\n\n순서를 잊지 마세요. 묘사 → 실행 → 분리 → 갖춤 → 공유.\n\n1차에서 '프롬프트는 사고력의 증폭기', 2차에서 '지침은 범용을 전용으로', 4차에서 '바이브 코딩은 묘사다'라고 했습니다. 6차는 그걸 내 컴퓨터로 가져옵니다 — 묘사하면 진짜 도는 프로그램이 되고, 커지면 레이어로 쪼개고, 구조를 갖춰 남과 나눕니다. 오늘 만든 건 도구 하나지만, 진짜 배운 건 '어떤 프로그램이든 시작하는 법'입니다.",
    challenge: "오늘부터 딱 하나만 — 평소 귀찮던 작업 하나를 골라, Claude Code에 '○○해주는 작은 도구 만들어줘'라고 묘사해 보세요. 그리고 기능이 2단계를 넘어가면, 하는 일에 따라 단계로 쪼개 보세요.",
    faqs: [
      {
        q: "코딩 못해도 되나요?",
        a: "됩니다. 코드를 직접 쓰지 않고 '무엇을 원하는지' 한국어로 묘사하면 Claude Code가 만들어줍니다. 단, Node.js·포트 같은 '이름'은 알아두면 좋아요."
      },
      {
        q: "뭘 설치해야 하나요?",
        a: "Claude Code와 Node.js입니다. Claude Code를 깔면 Node는 대개 같이 있습니다. 윈도우는 'Git Bash'(검은 명령 창)에서 claude를 켭니다."
      },
      {
        q: "Artifacts(4차)랑 뭐가 다른가요?",
        a: "Artifacts는 브라우저 안 모래상자라 내 파일을 못 만지고 닫으면 사라집니다. Claude Code는 내 컴퓨터에서 진짜 실행되고, 내 폴더를 다루고, git으로 남습니다."
      },
      {
        q: "내가 만든 프로그램, 남도 쓸 수 있나요?",
        a: "내 파일을 직접 만지는 도구는 URL 배포로는 남이 못 씁니다(브라우저 보안). GitHub로 코드를 공유해 각자 자기 컴퓨터에서 실행합니다. 반대로 남의 파일을 안 만지는 웹앱은 URL 배포가 맞습니다."
      },
      {
        q: "프로그램이 자꾸 복잡해져요.",
        a: "2단계 이상이면 '하는 일'에 따라 레이어로 쪼개세요. 단계 사이는 JSON으로 넘기고, 각 단계는 한 가지 책임만 — 수정이 훨씬 쉬워집니다."
      }
    ]
  }
];
