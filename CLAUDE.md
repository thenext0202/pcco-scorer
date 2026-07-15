# AI 채점기 (R-PCCO & I-MRKO Scorer)

## 프로젝트 개요
AI 프롬프트 강의용 자동 채점 PWA + 강의 소개 랜딩 페이지.

### 주요 기능
1. **강의 소개 랜딩 페이지** (`/`)
   - 2개 강의 소개 (R-PCCO 프롬프트 프레임워크, I-MRKO 지침 프레임워크)
   - 상세한 강의 복습 섹션 (MD 파일 기반 전체 커리큘럼)
   - Framer Motion 애니메이션
   - 블랙 배경 디자인 (눈의 피로 최소화)
   - 복습 섹션은 화이트 배경 + 검정 텍스트 (학습 최적화)

2. **실습 앱** (`/practice`)
   - 프롬프트 채점: R-PCCO 5요소(역할/목적/맥락/제약/출력)
   - 지침 채점: I-MRKO 5요소(정체성/임무/규칙/지식/출력)
   - 세션 기반 실시간 리더보드
   - 강사용 세션 만들기 (비밀번호 보호: `7962`)
   - 수강생용 세션 참가 기능

Claude Sonnet 4.6 모델을 활용한 실시간 채점과 리더보드를 제공.
수강생들의 프롬프트/지침 작성 능력 향상과 학습 동기 부여를 목표로 함.

## 프로젝트 구조
### 페이지 라우팅
- `/` - 강의 소개 랜딩 페이지
- `/practice` - AI 채점 실습 앱
- `/host` - 세션 만들기 (강사용, 비밀번호 보호)
- `/play/[code]` - 세션 참가 (수강생용)

### 네비게이션 흐름
1. 사용자가 랜딩 페이지 방문 → 강의 소개 확인
2. "실습 앱 사용하기" 버튼 클릭 → `/practice` 이동
3. 실습 앱에서 "← 강의 소개로 돌아가기" 버튼으로 랜딩 페이지 복귀
4. 세션 만들기 시 비밀번호(`7962`) 입력 필요

## 기술 스택
- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui
- **Animation**: Framer Motion (랜딩 페이지)
- **AI**: Anthropic SDK (Claude Sonnet 4.6 - `claude-sonnet-4-6`)
- **Backend**: Supabase (Database & Realtime)
- **Deployment**: Railway
- **PWA**: Service Worker (수동 구현, 자동 업데이트 지원)

## 폴더 구조
```
src/
  app/
    page.tsx               # 랜딩 페이지 (강의 소개)
    practice/
      page.tsx             # 실습 앱 (AI 채점기)
    host/                  # 세션 호스트 페이지
    play/[code]/           # 세션 참가 페이지
    globals.css            # 글로벌 스타일 (랜딩 + 실습 앱 통합)
  components/
    ui/                    # shadcn/ui 컴포넌트
    Hero.tsx               # 랜딩: 히어로 섹션
    CourseSection.tsx      # 랜딩: 강의 소개 섹션
    CourseDetail.tsx       # 랜딩: 강의 상세 복습 섹션
    Framework.tsx          # 랜딩: 프레임워크 설명
    FAQ.tsx                # 랜딩: FAQ 섹션
    CTA.tsx                # 랜딩: CTA 섹션
    PromptScorer.tsx       # 실습: 프롬프트 채점
    InstructionScorer.tsx  # 실습: 지침 채점
  data/
    content.ts             # 랜딩 페이지 콘텐츠 (강의 상세 내용 포함)
  lib/                     # 유틸리티 함수, API 클라이언트
  types/                   # TypeScript 타입 정의
docs/                      # 프로젝트 문서
public/                    # 정적 파일
```

## 프로젝트 통합 히스토리
### 통합 전 구조
- **프로젝트 A**: AI 강의 랜딩 페이지 (`D:\개발\ai-course-landing`)
- **프로젝트 B**: AI 채점 실습 앱 (`D:\개발\프롬포트 채점`)

### 통합 과정 (2026-04-28)
1. **파일 이동**
   - `프로젝트 B/src/app/page.tsx` → `src/app/practice/page.tsx`
   - 랜딩 페이지를 루트(`/`)로 설정

2. **컴포넌트 복사**
   - `프로젝트 A/components/*` → `src/components/`
   - Hero, CourseSection, CourseDetail, Framework, FAQ, CTA

3. **데이터 복사**
   - `프로젝트 A/data/content.ts` → `src/data/content.ts`
   - 전체 강의 커리큘럼 포함 (MD 파일 기반)

4. **스타일 통합**
   - `globals.css` 병합 (랜딩 페이지 + shadcn/ui 스타일)
   - 블랙 배경 디자인 적용

5. **의존성 추가**
   - `framer-motion` 설치
   - `lucide-react` (이미 있음)

6. **네비게이션 추가**
   - 랜딩 → 실습: "실습 앱 사용하기" 버튼 (`/practice`)
   - 실습 → 랜딩: "← 강의 소개로 돌아가기" 버튼 (`/`)

7. **보안 강화**
   - 세션 만들기 비밀번호 보호 추가 (7962)

### 모바일 최적화 (2026-04-29)
1. **반응형 디자인 구현**
   - 4-5단계 브레이크포인트 적용 (xs → sm → md → lg → xl)
   - 모바일 우선 접근 방식

2. **텍스트 가독성 개선**
   - 한글 텍스트: `break-keep` (단어 단위 줄바꿈)
   - 긴 영문: `break-words` (강제 줄바꿈)
   - 제목/버튼: `whitespace-nowrap` (한 줄 유지)

3. **터치 인터페이스 최적화**
   - 버튼/링크 최소 터치 타겟: 44px × 44px
   - 모바일 버튼: 전체 너비 + 최대 너비 제한
   - 아이콘 크기 고정 (`flex-shrink-0`)

4. **레이아웃 조정**
   - 그리드: `grid sm:grid-cols-2 lg:grid-cols-3`
   - 패딩: `p-4 sm:p-6 md:p-8 lg:p-12`
   - 갭: `gap-2 sm:gap-3 md:gap-4`

5. **글로벌 CSS 추가**
   - 가로 스크롤 방지
   - 자동 하이픈 처리
   - 모바일 전용 스타일 (`@media max-width: 640px`)

### 3차 강의 (SSDHR) 추가 + 세션 확장 + CTA 개선 (2026-05-04)

1. **3차 강의 랜딩 추가**
   - `src/data/content.ts`에 `course-3` (이미지 프롬프트 설계 가이드, 90분, 9단 구조) 추가
   - `frameworks[]`에 SSDHR 카드 추가 (장면·스타일·디테일·강제·물리)
   - `CourseDetail`의 차수 제목을 `courses` 인덱스 기반으로 일반화 (4차 이상도 자동 대응)
   - 커밋: `3091c18`

2. **SSDHR 채점 시스템 구축**
   - `docs/SSDHR_채점_루브릭.md` 작성 (5요소 × 20점 + 가점 5종 + 감점 7종)
   - 가점 N/A 처리: JSON 자산화·레퍼런스 분리는 케이스 미해당 시 `points: null`
   - 신규: `src/lib/imageScoringPrompt.ts`, `/api/score/image`, `ImageScorer`, `ImageScoreResult`
   - `practice` 페이지에 3번째 탭 🎨 이미지 (SSDHR) 추가
   - Zod 스키마: `ImageBonusSchema`의 `points: z.number().nullable()`로 N/A 표현

3. **세션 모드 'image' 확장**
   - DB: `sessions.mode` CHECK 제약을 `('prompt', 'instruction', 'image')`로 확장 (v3 마이그레이션, 사용자 수동 실행)
   - `Session.mode`, `ImageLeaderboardEntry`, `LeaderboardEntry` 유니온 확장
   - `sessionApi.ts`: `createSession`/`submitScore`/`getLeaderboard`에 image 분기
   - `/host`: 모드 선택 UI 2칸 → 3칸 반응형
   - `/play/[code]`: image 분기 → `ImageScorer` 마운트
   - `/play/[code]/board`: `ELEMENT_LABELS_IMAGE` 추가 + 모드별 분기

4. **리더보드 등록 CTA UX 개선**
   - 문제: 결과 영역이 길어 그 아래 등록 카드를 사용자가 놓침
   - 모든 Scorer에 `hideRetryButton` prop 추가 → 세션 모드에선 "다른 X 채점하기" 버튼 숨김
   - 등록 카드를 `fixed inset-x-0 bottom-0 z-50`으로 sticky bottom 배치
   - 제출 완료 카드 버튼: outline → solid blue (`<Link>` inherit color 흐림 해결)
   - 하단 "리더보드 보기"는 `!hasSubmitted`일 때만 표시 (중복 제거)
   - 커밋: `5f4a6ad`

### 4차 강의 (바이브 코딩) 추가 + 세션 vibe 모드 (2026-05-12)

1. **4차 강의 랜딩 추가**
   - `src/data/content.ts`에 `course-4` (바이브 코딩이란?, 125분, R-PCCO 코딩 응용) 추가
   - `frameworks[]`에 '바이브 코딩 5요소' 카드 추가 (R-PCCO 코딩판)
   - 4차는 R-PCCO를 코딩 맥락으로 변형 — 같은 5요소지만 평가 기준이 다름
   - Hero·FrameworkCards는 `content.ts` 데이터만 추가하면 자동 렌더링됨
   - ⚠️ CourseDetail은 자동 아님 — `src/app/page.tsx`에 `<CourseDetail courseId="course-N" />` 수동 마운트 필요
   - 커밋: `d74802e`

2. **바이브 코딩 채점 시스템 구축**
   - `docs/바이브코딩_채점_루브릭.md` 작성 (5요소 × 20점 + 가점 4종 + 감점 5종)
   - 신규: `src/lib/vibeScoringPrompt.ts`, `/api/score/vibe`, `VibeScorer`, `VibeScoreResult`, `VibeScoreResultSchema`
   - `practice` 페이지에 4번째 탭 ⚡ 바이브 코딩 추가
   - **★ 핵심 설계**: `improved_example`이 일반 피드백이 아니라 **claude.ai에 그대로 붙여넣으면 Artifacts에 즉시 작동하는 완성형 프롬프트**
     - 시스템 프롬프트에서 6가지 필수 항목 강제 (역할/목적/Who+Where+When/제약/인터랙션/단일 파일 출력 종결)
     - 결과 화면에 인디고 강조 카드 + 큰 복사 버튼 + 'claude.ai 열기' 외부 링크
   - **Where(디바이스) 캡 규칙**: 맥락에서 Where 미명시 시 최대 10점 — 코딩에서 디바이스 누락은 결과를 산으로 보냄
   - 가점 4종: `device_specified` (+3), `tech_stack_clear` (+2), `interaction_explicit` (+2), `single_file_output` (+2)
   - 커밋: `8c7c210`

3. **세션 모드 'vibe' 확장**
   - DB: `sessions.mode` CHECK 제약을 `('prompt', 'instruction', 'image', 'vibe')`로 확장 (v4 마이그레이션, 사용자 수동 실행)
   - `Session.mode`, `VibeLeaderboardEntry`, `LeaderboardEntry` 유니온 확장
   - `sessionApi.ts`: `createSession`/`submitScore`/`getLeaderboard`에 vibe 분기
     - elements 키는 prompt와 동일(role/purpose/context/constraints/output)이라 마이그레이션 없이 호환
   - `/host`: 모드 선택 UI 3칸 → 4칸 반응형 (`sm:grid-cols-2 lg:grid-cols-4`)
   - `/play/[code]`: vibe 분기 → `VibeScorer` 마운트, Badge "⚡ 바이브 코딩 채점"
   - `/play/[code]/board`: `ELEMENT_LABELS_VIBE = ELEMENT_LABELS_PROMPT` 재사용
   - 커밋: `8c7c210`

### 5차 강의 (AI 자동화 이해) 추가 — 랜딩만 (2026-05-21)

1. **5차 강의 랜딩 추가**
   - `src/data/content.ts`에 `course-5` (AI 자동화 이해, 120분, BATLR 5단계) 추가
   - `frameworks[]`에 BATLR 카드 추가 (Break·Asset·Tool·Link·Record — 쪼·에·도·연·기)
   - 5차는 5요소가 아니라 **5단계 프로세스**(쪼개기→에셋화→도구→연결→기록) — 기존 R-PCCO·I-MRKO·SSDHR과 성격이 다름
   - 핵심 한 문장: "AI가 못하는 게 아니라, 전달이 부족한 겁니다"
   - 메인 비유: 요리 (재료=인풋, 도구=스펙, 완성품=아웃풋 — 3기둥)
   - 채점 모드 없음 (랜딩만 추가)

2. **CourseDetail 수동 마운트 함정 발견**
   - 데이터(`content.ts`)만 추가했더니 복습 페이지가 안 보임
   - 원인: `src/app/page.tsx`에서 `<CourseDetail courseId="..." />`를 명시 호출하는 구조
   - 해결: `page.tsx`에 `<CourseDetail courseId="course-5" />` 한 줄 추가
   - CLAUDE.md "새 강의 추가 가이드"에 ⚠️ 경고 추가 (이전 4차 히스토리의 "자동 렌더링" 문구는 잘못된 설명이었음)

### 6차 강의 (Claude Code 실전) 추가 — 랜딩만 (2026-06-04)

1. **6차 강의 랜딩 추가**
   - `src/data/content.ts`에 `course-6` (Claude Code 실전, 118분 +배포 보너스, 빌드 5단계) 추가
   - `courses`·`frameworks`·`courseDetails`에 `course-6` 추가 + `heroContent.ctas`에 "6차 강의 보기"(`#course-6`) 버튼 추가
   - 6차 프레임워크는 **빌드 5단계**(묘사·실행·분리·갖춤·공유) — claude.ai Artifacts와 달리 "내 컴퓨터에서 진짜 실행되는 도구"를 만드는 표준 흐름
   - 핵심 한 문장: "Claude Code의 맥락엔 '내 컴퓨터'가 들어간다 — 묘사하면 진짜 도구가 된다"
   - 권장 선수강: 1·2·4차 (프롬프트·지침·바이브 코딩)
   - 채점 모드 없음 (랜딩만 추가)

2. **CourseDetail 수동 마운트 (5차에서 발견한 함정 재적용)**
   - `src/app/page.tsx`에 `<CourseDetail courseId="course-6" />` 한 줄 추가 — 데이터만 넣으면 복습 페이지가 안 보임

### 7차 강의 (PWA 할 일 앱) 추가 — 랜딩만 (2026-06-18)

1. **7차 강의 랜딩 추가**
   - `src/data/content.ts`에 `course-7` (Claude Code로 잘 짠 앱을 '내 앱'으로 / PWA, 112분, PWA 5요소) 추가
   - `courses`·`frameworks`·`courseDetails`에 `course-7` 추가 + `heroContent.ctas`에 "7차 강의 보기"(`#course-7`) 버튼 추가
   - 7차 프레임워크는 **PWA 5요소**(화·정·오·저·배 — 화면·정보·오프라인·저장·배포) — 웹페이지를 폰 앱으로 만드는 5요소
   - 핵심 흐름: 잘 짜인 PWA를 받아 → 레이어 4겹(데이터·동작·화면·연결) 구조를 읽고 → 디자인+기능을 내 입맛대로 개조 → HTTPS 배포 후 폰 홈 화면에 설치·공유
   - 6차 떡밥 회수: "무엇을 만드느냐가 배포를 정한다" — 6차 변경기는 내 파일을 만져 URL 배포 불가였지만, 할 일 앱은 안 만지니 URL 배포가 정답
   - 채점 모드 없음 (랜딩만 추가)

2. **CourseDetail 수동 마운트 (반복 적용)**
   - `src/app/page.tsx`에 `<CourseDetail courseId="course-7" />` 한 줄 추가 — 데이터만 넣으면 복습 페이지가 안 보임

### 8차 강의 (자동화 설계 / PILOT) 추가 — 랜딩만 (2026-07-08)

1. **8차 강의 랜딩 추가**
   - `src/data/content.ts`에 `course-8` (자동화 설계 — 실전 공장을 해부하다, 120분, PILOT) 추가
   - `courses`·`frameworks`·`courseDetails`에 `course-8` 추가 + `heroContent.ctas`에 "8차 강의 보기"(`#course-8`) 버튼 추가
   - 8차 프레임워크는 **PILOT**(Pipeline 쪼갠다·I/O 정한다·Layer 나눈다·Oversight 지킨다·Trace 남긴다) — 어떤 자동화에도 쓰는 설계 5원칙
   - 교보재: 사용자가 실제 구현한 "제품 광고 영상 자동생성 공장"(`D:\개발\AI 영상 자동화 구축`)을 **해부** → 설계 원리 5개를 뽑아 → 각자 '내 자동화 설계도' 1장을 그리는 방식 (코드 실습 없음, 순수 설계)
   - 핵심 흐름: 공장 견학 → PILOT 5칼로 해부 → 설계 실습. 하이라이트 "가로로 쪼개고(P) 세로로 나눈다(L)" 두 축
   - 이전 강의 회수: 2차 I/O 계약 = I, 6차 레이어 = L, 5차 기록(Record) = T. "MCP now → API later" 이식 개념(API·MCP 눈높이 설명 포함)
   - 채점 모드 없음 (랜딩만 추가)
   - 강의자료: `강의자료/8차_자동화설계_영상공장/` (기획안·해부노트·설계도 템플릿 docx·러닝시트·슬라이드)

2. **CourseDetail 수동 마운트 (반복 적용)**
   - `src/app/page.tsx`에 `<CourseDetail courseId="course-8" />` 한 줄 추가 — 데이터만 넣으면 복습 페이지가 안 보임

### 9차 강의 (진짜 서비스 만들기 / GitHub·Vercel·Supabase) 추가 — 랜딩만 (2026-07-15)

1. **9차 강의 랜딩 추가**
   - `src/data/content.ts`에 `course-9` (진짜 서비스 만들기 — 심리테스트 공유 서비스, 180분, 살아있는 서비스 5요소) 추가
   - `courses`·`frameworks`·`courseDetails`에 `course-9` 추가 + `heroContent.ctas`에 "9차 강의 보기"(`#course-9`) 버튼 추가
   - 9차 프레임워크는 **살아있는 서비스 5요소**(몸·기억·무대·창고·맥박) — 몸(앱 코드)·기억(GitHub)·무대(Vercel)·창고(Supabase)·맥박(push→자동배포)
   - 핵심 한 문장: "코드는 GitHub에, 실행은 Vercel에, 데이터는 Supabase에 산다 — 셋 다 내 컴퓨터가 아니라서 내 컴퓨터를 꺼도 서비스는 산다"
   - 킬러 인사이트: ① 공유 링크 = DB의 존재 증명 (localStorage로는 논리적으로 불가능) ② push가 곧 배포 (7차 택배 → 9차 컨베이어 벨트)
   - 방식: **백엔드 키트** — 앞단(화면·질문·기능)은 수강생이 기획안대로 바이브 코딩, 강사는 뒷단(db.js 계약 3함수·CLAUDE.md 규칙서·SQL)만 제공. 웹으로 확정(PWA 아님 — 서비스워커 캐시가 자동배포 데모 방해, PWA는 심화 숙제)
   - 이전 강의 회수: 7차 localStorage '저(Save)'의 한계 → 창고 / 7차 배포 치트시트의 "대안: GitHub→Vercel 자동배포"가 메인 코스로 / 6차 CLAUDE.md("AI한테 한 장")가 키트 규칙서로 실전 투입 / 8차 L(나눈다) = 세 집 분리
   - 권장 선수강: 6차(Claude Code)·7차(PWA 배포)
   - 채점 모드 없음 (랜딩만 추가)
   - 강의자료: `강의자료/9차_진짜서비스_심리테스트/` (기획안 v2.1 — 이론부 정식 편성 · 백엔드키트 · 테스트기획 프롬프트 · 러닝시트 · 슬라이드 2종[이름 유/무] PDF)

2. **CourseDetail 수동 마운트 (반복 적용)**
   - `src/app/page.tsx`에 `<CourseDetail courseId="course-9" />` 한 줄 추가 — 데이터만 넣으면 복습 페이지가 안 보임

## 코딩 규칙
- TypeScript strict mode 사용
- 함수형 컴포넌트 사용
- Server Component 우선, 필요 시 Client Component로 전환
- 한국어 주석 허용 (복잡한 로직 설명 시)
- Import 순서: React → Next.js → 외부 라이브러리 → 내부 모듈 → 타입 → 스타일
- 파일명: kebab-case (컴포넌트는 PascalCase)

## 중요 구현 세부사항

### 비밀번호 보호 (세션 만들기)
```typescript
// src/app/practice/page.tsx
const [showPasswordModal, setShowPasswordModal] = useState(false);
const [password, setPassword] = useState("");
const [passwordError, setPasswordError] = useState("");

const handleHostSession = () => {
  if (password === "7962") {
    window.location.href = "/host";
  } else {
    setPasswordError("비밀번호가 올바르지 않습니다");
    setPassword("");
  }
};
```

### CourseDetail 컴포넌트 (복잡한 데이터 구조 처리)
```typescript
// src/components/CourseDetail.tsx
// 다양한 데이터 타입 지원: string, object, array
// 예: analogy, example, table, beforeAfter, template 등
{item.analogy && typeof item.analogy === 'object' && (
  <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg mb-4">
    {/* object 렌더링 */}
  </div>
)}
```

### 내부 라우팅
```typescript
// 모든 practice app 링크를 내부 라우트로 변경
// Before: href="https://pcco-scorer-production.up.railway.app"
// After: href="/practice"
```

### 모바일 최적화 (2026-04-29 추가)

**글로벌 CSS 유틸리티** (`src/app/globals.css`):
```css
/* 모바일 전용 최적화 */
@media (max-width: 640px) {
  body {
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  html, body {
    overflow-x: hidden;  /* 가로 스크롤 방지 */
    max-width: 100vw;
  }

  button, a {
    min-height: 44px;  /* 터치 타겟 최소 크기 */
    min-width: 44px;
  }
}

/* 텍스트 줄바꿈 유틸리티 */
.break-keep {
  word-break: keep-all;      /* 한글 단어 단위 줄바꿈 */
  overflow-wrap: break-word;
}

.break-words {
  word-wrap: break-word;     /* 강제 줄바꿈 */
  overflow-wrap: break-word;
  word-break: break-word;
}
```

**컴포넌트별 반응형 패턴**:

1. **Hero.tsx** - 타이틀 및 버튼
```tsx
// 타이틀: 4단계 반응형
className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"

// 버튼: 모바일 전체 너비
className="w-full sm:w-auto max-w-md px-6 sm:px-10 md:px-12"
```

2. **FrameworkCards.tsx** - 그리드 레이아웃
```tsx
// 1열 → 2열 → 3열
className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
```

3. **CourseDetail.tsx** - 패딩 조정
```tsx
// 점진적 패딩 증가
className="p-4 sm:p-6 md:p-8 lg:p-12"
```

**모바일 최적화 체크리스트**:
- [x] 반응형 텍스트 크기 (4-5단계 브레이크포인트)
- [x] 텍스트 줄바꿈 최적화 (break-keep, break-words)
- [x] 버튼 터치 타겟 최소 44px
- [x] 가로 스크롤 방지
- [x] 모바일 우선 패딩/간격 조정
- [x] 아이콘 크기 고정 (flex-shrink-0)
- [ ] 모바일 복습 섹션 추가 최적화 (향후)
- [ ] 터치 제스처 최적화 (향후)

## 커밋 규칙
Conventional Commits 준수:
- `feat:` 새로운 기능 추가
- `fix:` 버그 수정
- `chore:` 빌드, 설정 변경
- `docs:` 문서 수정
- `refactor:` 코드 리팩토링
- `style:` 코드 포맷팅
- `test:` 테스트 코드

## 트러블슈팅

### React 렌더링 에러: "Objects are not valid as a React child"
- **원인**: 복잡한 객체를 직접 렌더링하려고 할 때
- **해결**: 타입 체킹 추가 (`typeof === 'object'`, `Array.isArray()`)
- **위치**: `CourseDetail.tsx`

### CSS 충돌
- **원인**: 랜딩 페이지와 실습 앱의 globals.css 병합
- **해결**: 두 스타일 모두 유지, 순서 주의 (shadcn/ui 먼저, 커스텀 스타일 나중)

### 포트 충돌
- **증상**: "Port 3000 already in use"
- **해결**: Next.js가 자동으로 다른 포트 할당 (3004 등)

## 프로젝트 방향성

**⚠️ 중요**: 이 프로젝트는 **지속적으로 강의가 추가되는 플랫폼**입니다.
- 현재: R-PCCO(1차), I-MRKO(2차), SSDHR(3차), 바이브 코딩(4차), AI 자동화 이해(5차), Claude Code 실전(6차), PWA(7차), 자동화 설계 PILOT(8차), 진짜 서비스 만들기(9차) — 9개 강의
- 채점 모드는 1~4차(prompt·instruction·image·vibe) 4종, 5차 이후는 랜딩만
- 앞으로 새로운 강의가 계속 추가될 예정
- 확장 가능한 구조로 설계 필요

### 채점 모드 추가 시 영향 받는 파일 (체크리스트)
새 채점 모드(예: 5차 강의 전용) 추가 시 다음을 모두 손대야 함:
1. `src/lib/{mode}ScoringPrompt.ts` 신규 작성 (시스템 프롬프트)
2. `src/lib/scoreSchema.ts` — `{Mode}ScoreResultSchema` Zod 추가
3. `src/types/score.ts` — `{Mode}ScoreResult` 타입 + `AnyScoreResult` union 확장
4. `src/types/session.ts` — `Session.mode` union 확장 + `{Mode}LeaderboardEntry` 추가
5. `src/app/api/score/{mode}/route.ts` — image/vibe route 패턴 복사 후 시스템 프롬프트만 교체
6. `src/components/{Mode}Scorer.tsx` + `{Mode}ScoreResult.tsx` 신규 작성
7. `src/lib/sessionApi.ts` — `createSession`/`submitScore`/`getLeaderboard`에 mode 분기 추가
8. `src/app/practice/page.tsx` — 탭 추가 + `Mode` union 확장
9. `src/app/host/page.tsx` — 모드 선택 카드 추가 + 그리드 칸 수 조정
10. `src/app/play/[code]/page.tsx` — Badge 라벨 + Scorer 마운트 분기
11. `src/app/play/[code]/board/page.tsx` — `ELEMENT_LABELS_{MODE}` 추가
12. `docs/supabase_schema.sql` — `sessions_mode_check` 재정의 마이그레이션 추가
13. `docs/{프레임워크}_채점_루브릭.md` 신규 작성
14. `CLAUDE.md` — 통합 히스토리 + Course N + 채점 시스템 섹션 갱신

### 새 강의 추가 가이드

#### 1. 강의 데이터 추가 (`src/data/content.ts`)

**courses 배열에 새 강의 추가:**
```typescript
{
  id: "course-3",  // 고유 ID
  framework: "새 프레임워크명",
  duration: "3시간",
  title: "강의 제목",
  subtitle: "부제목",
  heroQuote: "히어로 섹션 인용문",
}
```

**courseDetails 객체에 상세 내용 추가:**
```typescript
"course-3": {
  id: "course-3",
  heroMessage: "강의 핵심 메시지",
  promises: ["배울 내용 1", "배울 내용 2"],
  parts: [
    {
      title: "Part 1. 파트 제목",
      content: [
        {
          subtitle: "소제목",
          text: "내용",
          // 필요에 따라 details, table, example 등 추가
        }
      ]
    }
  ],
  faqs: [...]  // FAQ 추가
}
```

#### 2. ⚠️ CourseDetail 수동 마운트 (필수, 빠뜨리기 쉬움)

`src/app/page.tsx`에 `<CourseDetail courseId="course-N" />`를 명시적으로 추가해야 함. **데이터만 넣으면 복습 페이지가 안 보임.**

```tsx
// src/app/page.tsx
<CourseDetail courseId="course-4" />
<div className="section-divider max-w-6xl mx-auto" />
<CourseDetail courseId="course-5" />  // 새 강의 추가 시 이 줄을
```

> Hero·FrameworkCards·CourseSection은 `courses[]`·`frameworks[]` 배열을 자동 순회하지만, CourseDetail은 `courseId` prop으로 명시 호출하는 구조.

#### 3. 채점 모드 추가 (필요시)

새로운 프레임워크에 대한 채점이 필요한 경우:

1. **새 Scorer 컴포넌트 생성** (예: `src/components/NewFrameworkScorer.tsx`)
   - `PromptScorer.tsx` 또는 `InstructionScorer.tsx`를 참고하여 작성
   - 채점 프롬프트와 루브릭 커스터마이징

2. **practice 페이지에 탭 추가** (`src/app/practice/page.tsx`)
   ```typescript
   // 현재 4개 모드. 새 모드 추가 시 union 확장
   type Mode = "prompt" | "instruction" | "image" | "vibe" | "newframework";
   ```
   ※ `Session.mode`, `sessionApi.ts`의 함수 시그니처, host 페이지 useState 타입도 같이 확장 필요 — 위 "채점 모드 추가 시 영향 받는 파일" 14단계 체크리스트 참고

3. **API 엔드포인트 확장** (필요시)
   - `src/app/api/score/route.ts` 수정
   - 새로운 채점 로직 추가

#### 4. 렌더링 동작 정리

| 컴포넌트 | 동작 | 새 강의 추가 시 |
|---------|------|----------------|
| Hero | `courses[]` 배열 자동 순회 | 코드 수정 불필요 |
| CourseSection | `courses[]` 배열 자동 순회 | 코드 수정 불필요 |
| FrameworkCards | `frameworks[]` 배열 자동 순회 | 코드 수정 불필요 |
| **CourseDetail** | **`courseId` prop으로 명시 호출** | **⚠️ `page.tsx`에 수동 마운트 필수** |

## 향후 개선 사항
- [ ] 강의 복습 섹션 프린트 기능
- [ ] 세션 참가자별 진행도 트래킹
- [ ] 채점 기록 다운로드 (PDF/CSV)
- [ ] 다크모드/라이트모드 토글 (랜딩 페이지)
- [ ] 강의 자료 검색 기능
- [x] ~~모바일 최적화 (기본)~~ ✅ 완료 (2026-04-29)
  - [ ] 모바일 복습 섹션 추가 최적화 (표, 긴 텍스트 블록)
  - [ ] 터치 제스처 (스와이프, 핀치 줌)
  - [ ] 모바일 네비게이션 개선
- [ ] 세션 비밀번호 변경 기능 (관리자 패널)
- [ ] **강의 관리 시스템** (강의 추가/수정/삭제 UI)
- [ ] **강의별 실습 앱 자동 생성** (새 강의 추가 시 채점 모드 자동 매핑)
- [x] ~~3차 강의 (SSDHR 이미지 프롬프트) 추가~~ ✅ 완료 (2026-05-04)
- [x] ~~4차 강의 (바이브 코딩) 랜딩 + 채점 + 세션 모드~~ ✅ 완료 (2026-05-12)
- [x] ~~5차 강의 (AI 자동화 이해 / BATLR) 랜딩 추가~~ ✅ 완료 (2026-05-21, 랜딩만)
- [ ] **바이브 코딩 시리즈 2~6주차 추가** (Claude Code 설치, CLAUDE.md/README.md 작성 실습, 본인 프로젝트, 배포 등)
- [ ] **바이브 코딩 채점기 v2** — improved_example을 Claude API로 실제 실행해서 작동 여부 자체 검증

## 디자인 시스템
### 랜딩 페이지 (강의 소개)
- **배경**: Pure Black (`hsl(0, 0%, 0%)`) - 눈의 피로 최소화
- **강조 색상**: 따뜻한 오렌지/살구색 (`hsl(15, 80%, 68%)`)
- **복습 섹션**: 화이트 배경 + 검정 텍스트 - 학습 최적화
- **애니메이션**: Framer Motion (부드러운 페이드인, 호버 효과)

### 실습 앱
- **배경**: Slate 그라데이션
- **카드**: 글래스모피즘 디자인
- **모드 구분**: 블루(프롬프트), 그린(지침)

### 반응형 디자인 (모바일 최적화)
**브레이크포인트**:
- `sm`: 640px (모바일 가로/작은 태블릿)
- `md`: 768px (태블릿)
- `lg`: 1024px (데스크톱)
- `xl`: 1280px (큰 데스크톱)

**텍스트 크기 전략**:
```tsx
// 점진적 확대 (모바일 → 데스크톱)
className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
```

**텍스트 줄바꿈**:
- `break-keep`: 한글 단어 단위 줄바꿈 (제목, 중요 텍스트)
- `break-words`: 긴 영문/URL 강제 줄바꿈
- `whitespace-nowrap`: 버튼 텍스트 한 줄 유지

**버튼 레이아웃**:
- 모바일: `w-full max-w-md` (전체 너비, 최대 너비 제한)
- 아이콘: `flex-shrink-0` (크기 고정)
- 터치 타겟: 최소 44px × 44px

**간격 시스템**:
- 패딩: `p-4 sm:p-6 md:p-8 lg:p-12`
- 갭: `gap-2 sm:gap-3 md:gap-4`
- 마진: `mb-4 sm:mb-6 md:mb-12`

## 주요 기능 상세

### 1. 강사용 기능
- **세션 만들기**: 비밀번호 `7962` 입력 필요
- 비밀번호 오류 시 에러 메시지 표시
- `/host` 페이지로 리다이렉트

### 2. 강의 복습 섹션
- **데이터 소스**: `src/data/content.ts`
- MD 파일 기반 전체 커리큘럼 내용
- 토글 기능으로 접기/펼치기 가능
- **Course 1 (R-PCCO)**:
  - Part 1: 왜 프롬프트인가
  - Part 2-5: R-PCCO 5요소 상세 설명
  - Before/After 예시, 표, 비유, 습관 체크리스트
- **Course 2 (I-MRKO)**:
  - Part 1: 왜 지침인가
  - Part 2-6: I-MRKO 5요소 + I/O Contract 상세 설명
  - Before/After 예시, 표, 템플릿, 비교
- **Course 3 (SSDHR)**:
  - Part 1: 한 줄 원리 (제어 시스템)
  - Part 2-5: SSDHR 5단 + 메타 규칙 + JSON 자산화 + 레퍼런스 통제
  - Before/After 예시, JSON 템플릿, 9단 구조표
- **Course 4 (바이브 코딩)**:
  - Part 1: 왜 바이브 코딩인가 (코딩 아니라 묘사)
  - Part 2: 바이브 코딩 5요소 (R-PCCO 코딩 응용)
  - Part 3: AI한테 한 장, 사람한테 한 장 (CLAUDE.md + README.md)
  - Before/After 예시 (운세 앱), 카드형 5요소 표, 3대 습관
- **Course 5 (AI 자동화 이해)**:
  - Part 1: 왜 자동화는 실패하는가 (한 줄 원리·3기둥·핵심 한 문장)
  - Part 2: 자동화 5단계 BATLR — 쪼개기·에셋화·도구·연결·기록
  - Part 3: 설계 데모 — 후킹 카드 1장 (4개 에셋 분해, 망하는 요청 vs 되는 요청)
  - Before/After 예시 (후킹 영상), 3기둥 표, 5단계 체크카드, 3대 습관
  - 채점 모드 없음 (랜딩만)

### 3. 채점 시스템 (4종)
- **프롬프트 채점 (R-PCCO)**: Role, Purpose, Context, Constraints, Output
- **지침 채점 (I-MRKO)**: Identity, Mission, Rules, Knowledge, Output
- **이미지 프롬프트 채점 (SSDHR)**: Scene, Style, Detail, Hard, Reality
- **바이브 코딩 채점 (R-PCCO 코딩 응용)**: 역할·목적·맥락(디바이스!)·제약·출력
  - **★ improved_example이 Artifacts 즉시 실행 가능한 완성형 프롬프트**
  - Where(디바이스) 미명시 시 맥락 점수 10점 캡
  - 가점: 디바이스 명시 / 기술 스택 / 인터랙션 / 단일 파일 출력
- Claude Sonnet 4.6 (`claude-sonnet-4-6`) API 실시간 채점
- 100점 만점 + S~F 등급 + 강점·개선점·개선 예시 피드백

### 4. 세션 기능
- 4자리 코드로 세션 참가 (혼동 문자 I, O, 1, 0 제외)
- 실시간 리더보드 (Supabase Realtime)
- 자동 저장 기능 (localStorage)
- 모드별 분기: prompt / instruction / image / vibe
- 24시간 후 자동 만료

## 환경 변수
`.env.local` 파일에 다음 변수 설정 필요:
- `ANTHROPIC_API_KEY`: Claude API 키
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key

## 배포 정보
- **플랫폼**: Railway
- **URL**: https://pcco-scorer-production.up.railway.app/
- **Git**: 자동 배포 (main 브랜치 push 시)
