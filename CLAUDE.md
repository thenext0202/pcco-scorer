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
- 현재: R-PCCO, I-MRKO 2개 강의
- 앞으로 새로운 강의가 계속 추가될 예정
- 확장 가능한 구조로 설계 필요

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

#### 2. 채점 모드 추가 (필요시)

새로운 프레임워크에 대한 채점이 필요한 경우:

1. **새 Scorer 컴포넌트 생성** (예: `src/components/NewFrameworkScorer.tsx`)
   - `PromptScorer.tsx` 또는 `InstructionScorer.tsx`를 참고하여 작성
   - 채점 프롬프트와 루브릭 커스터마이징

2. **practice 페이지에 탭 추가** (`src/app/practice/page.tsx`)
   ```typescript
   type Mode = "prompt" | "instruction" | "newframework";
   ```

3. **API 엔드포인트 확장** (필요시)
   - `src/app/api/score/route.ts` 수정
   - 새로운 채점 로직 추가

#### 3. 자동 렌더링 확인

- Hero 섹션: `courses` 배열에 추가하면 커리큘럼 보기에 자동 표시
- 강의 소개: CourseSection 컴포넌트가 자동으로 렌더링
- 복습 섹션: CourseDetail 컴포넌트가 데이터 기반으로 자동 생성

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

### 3. 채점 시스템
- **프롬프트 채점 (R-PCCO)**: Role, Purpose, Context, Constraints, Output
- **지침 채점 (I-MRKO)**: Identity, Mission, Rules, Knowledge, Output
- Claude Sonnet 4.6 API 실시간 채점
- 10점 만점 평가 + 피드백 제공

### 4. 세션 기능
- 4자리 코드로 세션 참가
- 실시간 리더보드 (Supabase Realtime)
- 자동 저장 기능

## 환경 변수
`.env.local` 파일에 다음 변수 설정 필요:
- `ANTHROPIC_API_KEY`: Claude API 키
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key

## 배포 정보
- **플랫폼**: Railway
- **URL**: https://pcco-scorer-production.up.railway.app/
- **Git**: 자동 배포 (main 브랜치 push 시)
