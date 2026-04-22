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

**개발 완료일:** 2026-04-22
**개발자:** Claude Sonnet 4.5 (co-authored)
**강의:** "AI의 프롬프트란?" (정금구)

🚀 **Live:** https://pcco-scorer-production.up.railway.app/
