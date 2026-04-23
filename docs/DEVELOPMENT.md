# R-PCCO Scorer 개발 히스토리

"AI의 프롬프트란?" 강의용 실시간 프롬프트 채점 PWA 개발 전체 기록

---

## 📋 프로젝트 개요

**목적:** AI 프롬프트 강의에서 수강생들이 작성한 프롬프트를 R-PCCO 5요소로 실시간 채점하고 리더보드 제공

**핵심 가치:**
- 즉각적인 피드백 제공
- 게임화된 학습 경험 (리더보드)
- 실시간 경쟁을 통한 동기부여

---

## 🛠️ 기술 스택

### Frontend
- **Next.js 16** (App Router)
- **TypeScript 5**
- **Tailwind CSS 4**
- **shadcn/ui** (Radix UI 기반 컴포넌트)
- **Sonner** (Toast 알림)

### Backend & AI
- **Anthropic Claude API**
  - Model: `claude-sonnet-4-6`
  - max_tokens: 4000
  - temperature: 0.1
- **Supabase**
  - PostgreSQL (sessions, submissions 테이블)
  - Realtime Subscriptions (리더보드 실시간 업데이트)
  - Row Level Security (RLS) 정책

### PWA
- Service Worker (수동 구현)
- Web App Manifest
- 오프라인 폴백 페이지
- 설치 가능 (iOS/Android)

### Deployment
- **Railway** (Railpack 빌더)
- **GitHub** (thenext0202/pcco-scorer)
- 자동 배포 (git push 시 자동 배포)

---

## 📅 개발 단계별 히스토리

### Phase 1: 프로젝트 초기 설정 (2026-04-22)

**작업 내용:**
- Next.js 14 프로젝트 생성 (나중에 16으로 자동 업그레이드됨)
- TypeScript, Tailwind CSS, shadcn/ui 설정
- 폴더 구조 설계
- Git 초기화

**이슈:**
- create-next-app이 한글 폴더명("프롬포트 채점") 거부
- 해결: 서브폴더 생성 후 파일 이동

**파일:**
- `package.json` - 의존성 정의
- `tsconfig.json` - TypeScript 설정
- `tailwind.config.ts` - Tailwind 커스텀 설정
- `.gitignore` - Git 제외 파일

---

### Phase 2: 채점 UI 및 Mock 데이터

**작업 내용:**
- ScoreResult 타입 정의 (`src/types/score.ts`)
- Mock 채점 함수 (`src/lib/mockScore.ts`)
- ScoreResult 컴포넌트 - 요소별 점수 시각화
- 메인 페이지 UI 구성
- Sonner Toaster 추가

**주요 컴포넌트:**
- `src/components/ScoreResult.tsx` - 채점 결과 표시
- `src/app/page.tsx` - 메인 페이지

---

### Phase 3: Claude API 통합

**작업 내용:**
- Anthropic SDK 설치 (`@anthropic-ai/sdk`)
- Zod 스키마 정의 (`src/lib/scoreSchema.ts`)
- 상세 채점 루브릭 작성 (`src/lib/scoringPrompt.ts`)
- API 라우트 구현 (`src/app/api/score/route.ts`)
- Rate Limiter 추가 (`src/lib/rateLimit.ts`)

**채점 루브릭:**
- **R** (Role): 0/5/10/15/20점
- **P** (Purpose): 0/5/10/15/20점
- **C₁** (Context): 0/5/10/15/20점
- **C₂** (Constraints): 0/5/10/15/20점
- **O** (Output): 0/5/10/15/20점
- 보너스: 일관성+3, 창의적제약+3, 자기검증+4
- 감점: 역할과장-2, 부정형과다-2, 모순-3

**테스트:**
```bash
curl -X POST http://localhost:3000/api/score \
  -H "Content-Type: application/json" \
  -d '{"prompt":"너는 10년차 마케터야. 신제품 홍보 글을 써줘."}'
```

---

### Phase 4: Supabase 세션 & 리더보드

**작업 내용:**
- Supabase 클라이언트 설정 (`src/lib/supabase.ts`)
- DB 스키마 생성 (`docs/supabase_schema.sql`)
- Session 타입 정의 (`src/types/session.ts`)
- Session API 함수 (`src/lib/sessionApi.ts`)
- PromptScorer 컴포넌트 추출 (재사용)
- `/host` - 세션 생성 페이지
- `/play/[code]` - 참가자 채점 페이지
- `/play/[code]/board` - 실시간 리더보드

**DB 테이블:**
```sql
sessions (
  id uuid,
  code text (4자리),
  title text,
  host_name text,
  created_at timestamp,
  expires_at timestamp
)

submissions (
  id uuid,
  session_id uuid (FK),
  nickname text,
  prompt text,
  total_score integer,
  grade text,
  elements jsonb,
  created_at timestamp
)
```

**핵심 기능:**
- 4자리 세션 코드 생성 (I, O, 1, 0 제외)
- QR 코드 자동 생성
- Realtime Subscriptions으로 리더보드 실시간 업데이트
- 24시간 세션 만료

---

### Phase 5: PWA 전환

**작업 내용:**
- Sharp 설치 (이미지 생성)
- SVG 아이콘 생성 (`public/icon.svg`)
- 아이콘 생성 스크립트 (`scripts/generate-icons.ts`)
- 모든 크기 아이콘 생성 (192, 512, maskable, favicon)
- Web App Manifest (`public/manifest.json`)
- Service Worker (`public/sw.js`)
- 오프라인 폴백 (`public/offline.html`)
- 설치 프롬프트 컴포넌트
- `/install` 가이드 페이지

**PWA 기능:**
- 홈 화면에 설치 가능
- 오프라인 폴백
- 캐시 전략: API=network-only, static=cache-first

---

### Phase 7: Railway 배포

**작업 내용:**
- `next.config.ts` 수정 (`output: "standalone"`)
- `package.json` engines 추가
- `railway.json` 생성
- Preflight 스크립트 (`scripts/preflight.ts`)
- 환경 변수 검증 (`src/lib/env.ts`)
- README 대대적 개편
- `docs/DEPLOY.md` 생성
- `docs/OPERATIONS.md` 생성

**GitHub:**
- 계정: thenext0202
- 저장소: pcco-scorer (public)
- URL: https://github.com/thenext0202/pcco-scorer

**Railway:**
- 프로젝트: pcco-scorer
- 자동 배포: git push 시 자동 배포
- 도메인: https://pcco-scorer-production.up.railway.app/

---

## 🐛 주요 이슈 & 해결

### 1. Zod v4 호환성 에러 (빌드 실패)

**문제:**
```
Type error: Property 'errors' does not exist on type 'ZodError<unknown>'.
```

**원인:** Zod v4에서 `error.errors` → `error.issues`로 변경

**해결:**
```typescript
// Before
const missing = error.errors.map(...)

// After
const missing = error.issues.map(...)
```

**커밋:** `fix: Zod v4 호환성 수정 (errors → issues)`

---

### 2. 닉네임 localStorage 저장 문제

**문제:** 여러 사용자가 같은 PC 사용 시 이전 닉네임이 남아있음

**해결:** localStorage 저장 기능 제거
- `/play/[code]/page.tsx`에서 NICKNAME_STORAGE_KEY 제거
- `localStorage.getItem/setItem` 제거

**커밋:** `fix: 닉네임 localStorage 저장 제거`

---

### 3. 복잡한 프롬프트 파싱 실패

**문제:** 복잡한 프롬프트 입력 시 "채점 결과 파싱에 실패했습니다" 에러

**원인:**
1. Claude가 JSON 앞뒤에 설명 텍스트 추가
2. 마크다운 코드 펜스(```json) 추가
3. JSON 구조 자체가 깨짐

**시도한 해결책 (실패):**
- Assistant Prefill (`{`로 시작 강제)
  - **실패 이유:** claude-sonnet-4-6은 prefill 미지원 (2026년 2월부터)
  - 참고: https://blog.laozhang.ai/en/posts/claude-opus-prefill-error-fix

**최종 해결책:**
1. **max_tokens 증가:** 2000 → 4000
2. **temperature 감소:** 0.2 → 0.1
3. **extractJSON 함수 대폭 개선:**
   - 모든 코드 펜스 패턴 제거
   - 중괄호 깊이 추적 (중첩 객체 처리)
   - 문자열 내부 중괄호 무시
   - JSON 유효성 사전 검증

```typescript
function extractJSON(text: string): string {
  // 1. 마크다운 제거
  let cleaned = text.replace(/```[\w]*\s*/g, "").replace(/```\s*/g, "");

  // 2. 중괄호 매칭 (깊이 추적)
  let depth = 0;
  for (let i = firstBrace; i < cleaned.length; i++) {
    if (char === "{") depth++;
    else if (char === "}") {
      depth--;
      if (depth === 0) break; // 최상위 객체 끝
    }
  }

  // 3. JSON 유효성 검증
  JSON.parse(extracted);
  return extracted;
}
```

**커밋:** `feat: extractJSON 함수 대폭 개선`

---

### 4. 자동 저장으로 인한 빈칸 문제

**문제:** 사이트 접속 시 이전 프롬프트가 자동으로 입력되어 있음

**원인:** PromptScorer 컴포넌트의 `enableAutoSave={true}` (기본값)

**해결:**
```tsx
// src/app/page.tsx
<PromptScorer enableAutoSave={false} />
```

**커밋:** `fix: 자동 저장 비활성화`

---

### 5. 점수 합산 오류 (만점인데 98점)

**문제:** 요소별 점수가 전부 20점(총 100점)인데 total_score가 98점으로 나옴

**원인:** 시스템 프롬프트에 total_score 계산 공식이 명시되지 않아 Claude가 임의로 계산

**해결:** 시스템 프롬프트에 명확한 계산 공식 추가
```
total_score = role점수 + purpose점수 + context점수 + constraints점수 + output점수
              + 보너스합계 - 감점합계
(최소 0점, 최대 100점)
```

**커밋:** `fix: 점수 합산 공식 명시`

---

## 📊 현재 API 설정 (최종)

```typescript
// src/app/api/score/route.ts
const message = await anthropic.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 4000,        // 복잡한 프롬프트 처리
  temperature: 0.1,        // JSON 안정성
  system: SCORING_SYSTEM_PROMPT,
  messages: [
    {
      role: "user",
      content: userMessage,
    },
  ],
});
```

**환경 변수:**
- `ANTHROPIC_API_KEY` (서버 전용)
- `NEXT_PUBLIC_SUPABASE_URL` (클라이언트)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (클라이언트)

---

## 🎯 고득점 프롬프트 예시

**93점 프롬프트 (검증됨):**
```
너는 15년차 B2B SaaS 콘텐츠 마케터야. 30대 스타트업 CTO가 데모 신청 버튼을 클릭하도록 블로그 글을 써줘. 대상은 기술 스택 전환을 고민 중인 30대 CTO, 네이버 블로그, 점심 후 검색 중. 1500자, 전문적이되 권위적이지 않게, 전문용어는 괄호 풀이, 제목 3개와 표 1개 포함. 마크다운으로, 구조는 도입 100자 - 본문 3섹션 - 비교표 - 결론 CTA.
```

**요소별 분석:**
- R (Role): 20점 - "15년차 B2B SaaS 콘텐츠 마케터"
- P (Purpose): 15점 - "데모 신청 버튼 클릭"
- C (Context): 20점 - Who/Where/Why 3차원
- C (Constraints): 15점 - 분량/톤/어휘/구조
- O (Output): 20점 - 마크다운 + 섹션 구조
- 보너스: +3점 (일관성)
- **총점: 93점 (A등급)**

---

### Phase 8: I-MRKO 지침 채점 모드 추가 (2026-04-23)

**목적:** 2차 강의 "AI의 지침이란?"를 위한 I-MRKO 지침 채점 기능 추가

**핵심 요구사항:**
- 기존 R-PCCO 기능 완전 보존 (하위 호환성)
- I-MRKO 5요소 채점 추가
- 프롬프트/지침 모드 선택 가능

---

#### Phase 0: 환경 세팅

**작업 내용:**
- `feat/instruction-mode` 브랜치 생성
- 문서 3개 추가:
  - `docs/I-MRKO_채점_루브릭.md` - 상세 채점 기준
  - `docs/확장_개발_지침_I-MRKO.md` - 개발 가이드
  - `CLAUDE_CODE_KICKOFF.md` - 킥오프 문서

**커밋:** `docs: add I-MRKO extension planning documents`

---

#### Phase 1: DB 스키마 확장

**작업 내용:**
- `sessions` 테이블에 `mode` 컬럼 추가
- 기본값: `'prompt'` (기존 세션 호환)
- CHECK 제약: `'prompt'` 또는 `'instruction'`
- 인덱스 추가: `idx_sessions_mode`

**SQL:**
```sql
ALTER TABLE sessions
  ADD COLUMN IF NOT EXISTS mode VARCHAR(20) NOT NULL DEFAULT 'prompt'
  CHECK (mode IN ('prompt', 'instruction'));

CREATE INDEX IF NOT EXISTS idx_sessions_mode ON sessions(mode);
```

**커밋:** `feat: add mode column to sessions table`

---

#### Phase 2: TypeScript 타입 & Zod 스키마

**작업 내용:**
- `src/types/score.ts` 확장
  - `InstructionScoreResult` 타입 추가 (I-MRKO 5요소)
  - `AnyScoreResult` 통합 타입
  - `isInstructionScore()` 타입 가드
- `src/lib/scoreSchema.ts` 확장
  - `InstructionScoreResultSchema` Zod 스키마
- `src/types/session.ts` 확장
  - `Session` 인터페이스에 `mode` 추가
  - `PromptLeaderboardEntry` / `InstructionLeaderboardEntry` 분리

**I-MRKO 5요소:**
```typescript
{
  identity: ScoreElement,   // 정체성 (이름, 역할, 성격)
  mission: ScoreElement,     // 임무 (상시 업무 범위)
  rules: ScoreElement,       // 규칙 (측정 가능한 Do/Don't)
  knowledge: ScoreElement,   // 지식 (상시 참고 자료)
  output: ScoreElement       // 출력 (기본 답변 포맷)
}
```

**커밋:** `feat: add instruction score types and schema`

---

#### Phase 3: I-MRKO 채점 프롬프트 & API

**작업 내용:**
- `src/lib/instructionScoringPrompt.ts` 생성
  - 루브릭 기반 시스템 프롬프트 (I-MRKO 5요소)
  - 예시 함정 감지 (-5점)
  - Few-shot 예시 포함
- `src/app/api/score/instruction/route.ts` 생성
  - MIN: 100자, MAX: 5000자 (지침은 프롬프트보다 김)
  - Claude Sonnet 4.6 모델 사용
  - `InstructionScoreResult` 반환

**채점 루브릭:**
- **I** (Identity): 0/5/10/15/20점
- **M** (Mission): 0/5/10/15/20점
- **R** (Rules): 0/5/10/15/20점 ⭐ 측정 가능성 중시
- **K** (Knowledge): 0/5/10/15/20점
- **O** (Output): 0/5/10/15/20점
- 보너스: 측정가능규칙+3, 레이어링+2, 이유명시+2, 임무경계+2, 자기검증+4
- 감점: 예시함정-5 (★), 정체성과장-2, 규칙모순-3, 부정형과다-2

**커밋:** `feat: add I-MRKO scoring prompt and API route`

---

#### Phase 4: I-MRKO 컴포넌트

**작업 내용:**
- `src/components/InstructionScorer.tsx` 생성
  - `PromptScorer.tsx` 기반, I-MRKO용 커스터마이징
  - STORAGE_KEY: `"i-mrko-instruction-draft"`
  - MIN: 100자, MAX: 5000자
  - API 엔드포인트: `/api/score/instruction`
  - placeholder: "AI 지침을 입력하세요..."
- `src/components/InstructionScoreResult.tsx` 생성
  - I-MRKO 5요소 아이콘: 🎭 I / 🎯 M / 📏 R / 📚 K / 📋 O

**커밋:** `feat: add InstructionScorer and InstructionScoreResult components`

---

#### Phase 5: 홈 페이지 탭 토글

**작업 내용:**
- `src/app/page.tsx` 수정
  - 헤더: "R-PCCO Scorer" → **"AI 채점기"**
  - 탭 토글 UI 추가: 프롬프트 채점 ↔ 지침 채점
  - 모드별 채점기 조건부 렌더링
  - 푸터: 동적 5요소 설명

**커밋:** `feat: add mode tab toggle to home page`

---

#### Phase 6: Host/Play/Board 모드 분기

**작업 내용:**
- `src/app/host/page.tsx` 수정
  - 모드 선택 라디오 버튼 추가
  - "🎯 프롬프트 채점" / "📘 지침 채점" 선택
- `src/lib/sessionApi.ts` 확장
  - `createSession()`에 `mode` 파라미터 추가
  - `submitScore()`: `AnyScoreResult` 처리 (타입 가드)
  - `getLeaderboard()`: 모드별 요소 매핑
- `src/app/play/[code]/page.tsx` 수정
  - 세션 모드에 따라 채점기 자동 분기
  - 모드 배지 표시
- `src/app/play/[code]/board/page.tsx` 수정
  - 요소 라벨 상수: `ELEMENT_LABELS_PROMPT` / `ELEMENT_LABELS_INSTRUCTION`
  - 모드별 5요소 미니바 표시
  - 동적 푸터

**커밋:** `feat: add mode selection and branching to Host/Play/Board pages`

---

#### Phase 7: 메타데이터 & PWA 업데이트

**작업 내용:**
- `src/app/layout.tsx` 수정
  - title: **"AI 채점기 - 프롬프트 & 지침 채점"**
  - description: I-MRKO 반영
  - appleWebApp.title: "AI채점기"
- `public/manifest.json` 수정
  - name: **"AI 채점기 - 프롬프트 & 지침"**
  - short_name: "AI채점기"
- `README.md` 업데이트
  - 제목: "AI 채점기 (R-PCCO & I-MRKO Scorer)"
  - 이중 모드 지원 명시
  - 사용 시나리오 업데이트

**커밋:** `feat: update metadata and PWA to reflect I-MRKO support`

---

#### Phase 8: 검증 & Lint 수정

**작업 내용:**
- Lint 에러 수정 (Phase 0-7 파일만)
  - `host/page.tsx`: unused router import 제거
  - `InstructionScoreResult.tsx`: unused error variable 제거, 따옴표 이스케이프
  - `InstructionScorer.tsx`: useState lazy initialization
  - `sessionApi.ts`: unused import 제거
- 빌드 검증 통과
- E2E 테스트 체크리스트 제공

**커밋:** `fix: resolve lint errors in Phase 0-7 files`

---

#### 중요 버그 수정: 점수 계산 오류

**문제:**
- 시스템 프롬프트에서 `penalties.points`가 음수(-5)로 예시됨
- 계산식: `total_score = elements_sum - penalties_sum + bonuses_sum`
- 실제: `elements_sum - (-5) = elements_sum + 5` ❌ 패널티가 보너스로!

**해결:**
- `penalties.points`를 양수(5)로 변경
- 계산식 명확화: "penalties와 bonuses 모두 양수로 저장"
- 실제 계산: `80 - 5 = 75` ✅

**커밋:** `fix: correct penalty calculation in I-MRKO scoring prompt`

---

#### 배포

**Supabase:**
- DB 스키마 v2 적용 (mode 컬럼 추가)
- 기존 세션 자동으로 `mode='prompt'` 설정

**GitHub:**
- `feat/instruction-mode` 브랜치 → `master` 병합
- 19 files changed, 2427 insertions(+), 110 deletions(-)

**Railway:**
- 자동 배포 완료
- 실시간 접속 확인: I-MRKO 탭 정상 작동

**검증:**
- 하위 호환성: 기존 R-PCCO 정상 작동 ✅
- I-MRKO 모드: 지침 채점 정상 작동 ✅
- 점수 계산: 정확한 합산 ✅
- PWA: "AI 채점기" 이름 표시 ✅

**완료일:** 2026-04-23

---

## 🔮 향후 개선 사항

### 1. Structured Outputs 적용
- Anthropic API의 최신 기능 활용
- JSON 스키마 정의로 응답 형식 강제
- 파싱 안정성 극대화

### 2. 프롬프트 히스토리
- 사용자별 채점 이력 저장
- 점수 변화 그래프
- 개선 추세 분석

### 3. 다국어 지원
- 영어 프롬프트 채점
- 다국어 UI (i18n)

### 4. 고급 통계
- 세션별 평균 점수
- 요소별 취약점 분석
- 개선 제안 자동 생성

### 5. 관리자 대시보드
- 세션 관리 (수동 종료, 연장)
- 실시간 모니터링
- 제출 내역 CSV 다운로드

---

## 📚 주요 문서

- `README.md` - 프로젝트 개요 및 로컬 실행
- `docs/DEPLOY.md` - Railway 배포 가이드
- `docs/OPERATIONS.md` - 강의 운영 매뉴얼
- `docs/supabase_schema.sql` - DB 스키마
- `docs/DEVELOPMENT.md` - 이 문서

---

## 🎓 강의 운영 체크리스트

### 강의 30분 전
- [ ] Anthropic API 잔액 확인 ($5 이상)
- [ ] Supabase 서비스 상태 확인
- [ ] Railway 서비스 ACTIVE 확인
- [ ] 테스트 세션 생성 및 동작 확인
- [ ] 프로젝터용 리더보드 미리 열기

### 강의 중
- [ ] 실제 세션 생성 (제목, 강사명)
- [ ] 4자리 코드 화면 공유
- [ ] 리더보드 전체 화면 (F11)
- [ ] 수강생 참가 안내
- [ ] 실시간 업데이트 확인

### 강의 후
- [ ] 세션 데이터 확인 (SQL)
- [ ] CSV 백업 (선택)
- [ ] 오래된 세션 정리 (7일 후)

---

## 📞 긴급 상황 대응

### API 먹통
- Anthropic Console → Status 확인
- Mock 모드 활성화 (NEXT_PUBLIC_USE_MOCK=true)

### Supabase 연결 실패
- Status 페이지 확인
- 단독 채점 모드로 전환 안내

### Railway 서비스 다운
- Deployments → Redeploy (롤백)
- 또는 로컬 서버 + ngrok 임시 운영

---

**초기 개발:** 2026-04-22 (R-PCCO 프롬프트 채점)
**확장 개발:** 2026-04-23 (I-MRKO 지침 채점 추가)
**개발자:** Claude Sonnet 4.5 (co-authored)
**강의:**
- 1차: "AI의 프롬프트란?" → R-PCCO 모드
- 2차: "AI의 지침이란?" → I-MRKO 모드

🚀 **Live:** https://pcco-scorer-production.up.railway.app/

**주요 기능:**
- 🎯 **R-PCCO 프롬프트 채점** (Role · Purpose · Context · Constraints · Output)
- 📘 **I-MRKO 지침 채점** (Identity · Mission · Rules · Knowledge · Output)
- 🏆 **실시간 리더보드** (Supabase Realtime)
- 👥 **세션 모드** (강사/수강생)
- 📱 **PWA 지원** (설치 가능)
