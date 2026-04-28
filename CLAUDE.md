# AI 채점기 (R-PCCO & I-MRKO Scorer)

## 프로젝트 개요
AI 프롬프트 강의용 자동 채점 PWA. 두 가지 모드를 지원합니다:
- **프롬프트 채점**: R-PCCO 5요소(역할/목적/맥락/제약/출력)
- **지침 채점**: I-MRKO 5요소(정체성/임무/규칙/지식/출력)

Claude Sonnet 4.6 모델을 활용한 실시간 채점과 리더보드를 제공.
수강생들의 프롬프트/지침 작성 능력 향상과 학습 동기 부여를 목표로 함.

## 기술 스택
- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **AI**: Anthropic SDK (Claude Sonnet 4.6 - `claude-sonnet-4-6`)
- **Backend**: Supabase (Database & Realtime)
- **Deployment**: Railway
- **PWA**: Service Worker (수동 구현, 자동 업데이트 지원)

## 폴더 구조
```
src/
  app/          # Next.js App Router 라우팅
  components/   # React 컴포넌트 (shadcn은 components/ui/ 하위)
  lib/          # 유틸리티 함수, API 클라이언트
  types/        # TypeScript 타입 정의
docs/           # 프로젝트 문서
public/         # 정적 파일
```

## 코딩 규칙
- TypeScript strict mode 사용
- 함수형 컴포넌트 사용
- Server Component 우선, 필요 시 Client Component로 전환
- 한국어 주석 허용 (복잡한 로직 설명 시)
- Import 순서: React → Next.js → 외부 라이브러리 → 내부 모듈 → 타입 → 스타일
- 파일명: kebab-case (컴포넌트는 PascalCase)

## 커밋 규칙
Conventional Commits 준수:
- `feat:` 새로운 기능 추가
- `fix:` 버그 수정
- `chore:` 빌드, 설정 변경
- `docs:` 문서 수정
- `refactor:` 코드 리팩토링
- `style:` 코드 포맷팅
- `test:` 테스트 코드

## 환경 변수
`.env.local` 파일에 다음 변수 설정 필요:
- `ANTHROPIC_API_KEY`: Claude API 키
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key
