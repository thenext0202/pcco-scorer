# Claude Code용 작업 킥오프 · pcco-scorer → 지침 채점 모드 추가

## 🎯 한 문장 요약
기존 pcco-scorer 레포(R-PCCO 프롬프트 채점)에 **I-MRKO 지침 채점 모드를 병렬로 추가**합니다. 기존 기능은 그대로 유지한 채 신규 경로/컴포넌트로 확장.

## 📖 작업 순서

### 1. 먼저 읽을 문서 (필수)
1. `docs/I-MRKO_채점_루브릭.md` — **채점 기준 상세** (Claude API 시스템 프롬프트 포함)
2. `docs/확장_개발_지침_I-MRKO.md` — **구체적 작업 명세** (Phase 1~8)

### 2. 선행 조건 확인
- [ ] `.env.local`에 ANTHROPIC_API_KEY, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY 설정됨
- [ ] Supabase Dashboard 접근 가능 (SQL 실행 권한)
- [ ] Railway 배포 접근 가능

### 3. 첫 작업: DB 마이그레이션
`docs/확장_개발_지침_I-MRKO.md` §3.2의 ALTER TABLE SQL을 **Supabase SQL Editor에서 먼저 실행**. 코드 배포 전에 스키마가 준비되어야 함.

### 4. Phase 순서대로 진행
- Phase 1: DB 스키마 (완료 후 다음)
- Phase 2: 타입 & 스키마
- Phase 3: 채점 프롬프트 & API
- Phase 4: 컴포넌트
- Phase 5: 홈 페이지 탭
- Phase 6: Host/Play/Board 페이지
- Phase 7: 메타데이터
- Phase 8: 검증

각 Phase 후 `npm run lint && npm run build` 통과 확인하고 커밋.

## 🚫 절대 건드리지 말 것
- `src/components/PromptScorer.tsx`
- `src/components/ScoreResult.tsx`
- `src/lib/scoringPrompt.ts`
- `src/app/api/score/route.ts` (파일 유지, 내용 변경 금지)
- 기존 R-PCCO 루브릭 문서

## ✅ 완료 확인 (Definition of Done)
1. 기존 R-PCCO 세션 코드가 여전히 작동
2. 홈 페이지에서 탭으로 두 모드 전환 가능
3. I-MRKO 세션 생성·참가·채점·리더보드 모두 작동
4. 슬라이드 8 "친절한 비서야" 지침 → F등급 15점 근처 나와야 맞음
5. 예시 3개 이상 포함 지침 → `example_trap -5` 감점 적용

## 💬 질문할 때
루브릭 해석 애매하면 `docs/I-MRKO_채점_루브릭.md` §0 설계 철학과 §1~6의 점수 기준표 재확인.
구현 디테일 애매하면 `docs/확장_개발_지침_I-MRKO.md`의 해당 Phase 섹션 재확인.

## 🎓 강의 맥락
- 1차 강의 "AI의 프롬프트란?" — R-PCCO 5요소 (역할/목적/맥락/제약/출력) → 기존 구현
- 2차 강의 "AI의 지침이란?" — I-MRKO 5요소 (정체성/임무/규칙/지식/출력) → 이번 추가
- 강사: 정금구 (AI 초보자 대상)
- 킬러 인사이트 1: "예시의 함정" (지침에 예시 넣지 말 것) → 채점 시 감점 반영
- 킬러 인사이트 2: "I/O 계약" (체인 접점) → 이번 버전엔 포함 안 함, v2 예정
