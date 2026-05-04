# AI 채점기 (R-PCCO & I-MRKO Scorer)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Railway](https://img.shields.io/badge/Railway-Deployed-purple?logo=railway)
![Supabase](https://img.shields.io/badge/Supabase-Realtime-green?logo=supabase)
![License](https://img.shields.io/badge/License-MIT-yellow)

AI 프롬프트 강의 "AI의 프롬프트란?" (정금구) 부속 **강의 소개 페이지 + 실습 앱**입니다.

### 📚 강의 소개 페이지 (`/`)
- R-PCCO & I-MRKO 프레임워크 상세 설명
- 전체 강의 커리큘럼 복습 섹션 (MD 파일 기반)
- FAQ, Before/After 예시, 실습 앱 바로가기

### 🎯 실습 앱 (`/practice`)
- **프롬프트 채점**: R-PCCO 5요소(역할/목적/맥락/제약/출력)
- **지침 채점**: I-MRKO 5요소(정체성/임무/규칙/지식/출력)
- 세션 모드 (강사/수강생) + 단독 연습 모드
- 실시간 리더보드 및 AI 자동 채점

## 🔗 Live Demo

🚀 **https://pcco-scorer-production.up.railway.app/**

실시간으로 프롬프트를 채점하고 리더보드에 참가해보세요!

## ✨ 주요 기능

### 강의 소개 페이지
- 📖 **상세 커리큘럼** - R-PCCO & I-MRKO 전체 강의 내용 복습 섹션
- 🎨 **학습 최적화 디자인** - 블랙 배경 (메인), 화이트 배경 (복습 섹션)
- ✨ **Framer Motion 애니메이션** - 부드러운 페이지 전환 및 호버 효과
- 📱 **완전한 반응형** - 모바일/태블릿/데스크톱 최적화
- 🔗 **실습 앱 통합** - 원클릭으로 실습 앱 바로가기

### 실습 앱 핵심 기능
- 🤖 **AI 자동 채점** - Claude Sonnet 4.6 기반 R-PCCO/I-MRKO 5요소 평가
- 🎯 **이중 모드 지원** - 프롬프트(R-PCCO)와 지침(I-MRKO) 채점 모드 선택
- 📊 **상세 피드백** - 요소별 점수 + 개선 제안 + 90점 이상 예시 자동 생성
- 🏆 **실시간 리더보드** - Supabase Realtime으로 즉시 업데이트
- 👥 **세션 모드** - 강사 세션 생성 (비밀번호 보호), 수강생 코드 참가 + 단독 연습 모드

### PWA & 사용성
- 📱 **PWA 지원** - 홈화면 설치, 오프라인 폴백, 자동 업데이트 알림
- 💾 **자동 저장** - 작성 중인 텍스트 로컬 보존 (LocalStorage)
- 🎓 **교육 최적화** - QR 코드, 다크 테마 리더보드, 프로젝터 모드

### 안정성 & 보안
- ⚖️ **보너스/감점 시스템** - 측정가능규칙(+3), 예시함정(-5) 등 세밀한 평가
- 🔢 **점수 재계산** - 서버 사이드 검증으로 AI 계산 오류 방지
- 🛡️ **Rate Limiting** - IP당 요청 제한으로 API 비용 보호

## 🛠️ 기술 스택

**Frontend**
- Next.js 16 (App Router)
- TypeScript 5
- Tailwind CSS 4
- shadcn/ui
- Framer Motion (랜딩 페이지 애니메이션)

**Backend & AI**
- Anthropic Claude API (Sonnet 4.6)
- Supabase (PostgreSQL + Realtime)

**Deployment**
- Railway (Railpack)
- PWA (Service Worker, Manifest)

## 🚀 로컬 실행

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/pcco-scorer.git
cd pcco-scorer
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 3개 변수를 설정하세요:

```env
# Anthropic Claude API 키
ANTHROPIC_API_KEY=sk-ant-api03-...

# Supabase 프로젝트 정보
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**환경 변수 발급 방법:**

- **Anthropic API 키**: https://console.anthropic.com/settings/keys
- **Supabase URL/Key**: https://supabase.com/dashboard → 프로젝트 → Settings → API

### 4. Supabase 데이터베이스 스키마 생성

1. Supabase Dashboard → SQL Editor 이동
2. `docs/supabase_schema.sql` 파일 내용 복사
3. 새 쿼리에 붙여넣기 → Run

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 6. 빌드 테스트

```bash
npm run build
npm start
```

## 📦 Railway 배포

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/)

### 수동 배포 방법

자세한 배포 가이드는 [`docs/DEPLOY.md`](docs/DEPLOY.md)를 참고하세요.

**요약:**

1. GitHub 저장소에 코드 push
2. Railway 대시보드에서 "New Project" → "Deploy from GitHub"
3. 저장소 선택 → 자동 빌드 시작
4. Variables 탭에서 환경 변수 3개 등록
5. Settings → Networking → "Generate Domain"
6. 배포 URL로 접속하여 테스트

## 📂 프로젝트 구조

```
src/
  app/
    page.tsx           # 랜딩 페이지 (강의 소개) - 루트 경로
    practice/
      page.tsx         # 실습 앱 (AI 채점기)
    host/              # 세션 생성 페이지 (강사용, 비밀번호: 7962)
    play/[code]/       # 참가자 채점 페이지
    play/[code]/board/ # 실시간 리더보드
    install/           # PWA 설치 가이드
    globals.css        # 통합 스타일 (랜딩 + 실습 앱)

  components/
    ui/                    # shadcn/ui 컴포넌트
    Hero.tsx               # 랜딩: 히어로 섹션
    CourseSection.tsx      # 랜딩: 강의 소개 섹션
    CourseDetail.tsx       # 랜딩: 상세 복습 섹션
    Framework.tsx          # 랜딩: 프레임워크 설명
    FAQ.tsx                # 랜딩: FAQ 섹션
    CTA.tsx                # 랜딩: CTA 섹션
    PromptScorer.tsx       # 실습: 프롬프트 채점
    InstructionScorer.tsx  # 실습: 지침 채점

  data/
    content.ts         # 랜딩 페이지 콘텐츠 (전체 커리큘럼 포함)

  lib/                 # 유틸리티 및 API
  types/               # TypeScript 타입 정의

docs/
  supabase_schema.sql  # DB 스키마
  DEPLOY.md            # 배포 가이드
  OPERATIONS.md        # 운영 매뉴얼

public/
  icons/            # PWA 아이콘
  manifest.json     # PWA 매니페스트
  sw.js             # Service Worker
  offline.html      # 오프라인 폴백

scripts/
  generate-icons.ts # PWA 아이콘 생성
  preflight.ts      # 배포 전 환경 검증
```

## 🎯 사용 시나리오

### 강의 복습 (랜딩 페이지)

1. `/` 접속 → 강의 소개 확인
2. "커리큘럼 보기" 클릭 → R-PCCO & I-MRKO 강의 개요 확인
3. "강의 복습하기" 클릭 → 전체 강의 내용 상세 학습
4. "실습 앱 사용하기" 클릭 → `/practice` 이동

### 강사 (세션 모드)

1. `/practice` 접속 → "세션 만들기" 클릭
2. 비밀번호(`7962`) 입력 → `/host` 이동
3. 세션 제목 입력 → 채점 모드 선택 (프롬프트/지침) → "세션 생성"
4. 4자리 코드 + QR 코드 화면 공유
5. `/play/[코드]/board` 새 탭으로 열어 프로젝터 공유
6. 수강생들이 제출하면 리더보드 실시간 업데이트

### 수강생

1. `/practice` 접속 → "세션 참가하기" → 코드 입력
2. 닉네임 입력
3. 텍스트 작성 (세션 모드에 따라 프롬프트 또는 지침) → "채점하기"
4. 결과 확인 후 "리더보드에 등록하기"
5. "← 강의 소개로 돌아가기" 버튼으로 랜딩 페이지 복귀 가능

### 개인 연습 (단독 모드)

1. `/practice` 접속 → 하단 "단독 채점 모드"
2. 탭에서 프롬프트/지침 모드 선택
3. 텍스트 입력 → 채점 결과 즉시 확인
4. 개선 예시 복사 버튼으로 학습

## 📚 문서

- **[개발 히스토리](docs/DEVELOPMENT.md)** - Phase 1~9 전체 개발 과정 및 기술 의사결정
- **[배포 가이드](docs/DEPLOY.md)** - Railway 배포 상세 가이드
- **[운영 매뉴얼](docs/OPERATIONS.md)** - 강의 전 체크리스트, 장애 대응, QR 코드 제작
- **[R-PCCO 루브릭](docs/R-PCCO_채점_루브릭.md)** - 프롬프트 채점 기준
- **[I-MRKO 루브릭](docs/I-MRKO_채점_루브릭.md)** - 지침 채점 기준

## 🐛 문제 해결

### "Application failed to respond" (Railway)
- `next.config.ts`에 `output: "standalone"` 확인
- Deploy Logs에서 빌드/시작 에러 확인

### 환경 변수 에러
- Railway Variables에서 오타 확인
- `NEXT_PUBLIC_*` 변수 변경 시 Redeploy (재빌드) 필요

### Supabase 연결 실패
- `.env.local`의 URL/Key 재확인
- Supabase 대시보드에서 프로젝트 상태 확인

### PWA 설치 안 됨
- HTTPS 환경에서만 가능 (Railway 자동 제공)
- Chrome DevTools → Application → Manifest 확인

## 🤝 기여

이슈 및 PR은 언제든 환영합니다!

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일 참고

## 🎯 프로젝트 방향성

이 프로젝트는 **지속적으로 강의가 추가되는 플랫폼**입니다.
- 현재: R-PCCO, I-MRKO 2개 강의 운영 중
- 향후: 새로운 AI 관련 강의 계속 추가 예정
- 확장 가능한 구조로 설계되어 강의 추가 시 최소한의 작업으로 통합 가능

## 📌 프로젝트 통합 히스토리

**2026-05-04**: 3차 강의(SSDHR 이미지 프롬프트) 채점 앱 + 세션 모드 확장 + 리더보드 CTA 개선
- 3차 강의 "이미지 프롬프트 설계 가이드" 랜딩 페이지 추가 (9단 구조 · 90분 분량)
- SSDHR 채점 시스템 구축 (5요소 × 20점 + 가점 5종 nullable + 감점 7종)
  - 가점 항목 중 JSON 자산화·레퍼런스 분리는 케이스 미해당 시 N/A 처리
- 세션 모드 `'image'` 지원 (DB CHECK 제약 v3 마이그레이션 포함)
- 리더보드 등록 CTA 미발견 이슈 수정
  - sticky bottom 배치로 모바일·데스크톱 모두 항상 시야 노출
  - 세션 모드에선 결과 끝의 "다른 X 채점하기" 버튼 숨김
  - 제출 완료 후 중복 "리더보드 보기" 버튼 제거 + 텍스트 가독성 개선

**2026-04-29**: 모바일 및 웹 반응형 최적화
- 4-5단계 브레이크포인트 반응형 디자인 (xs → sm → md → lg → xl)
- 텍스트 줄바꿈 최적화 (한글 break-keep, 영문 break-words)
- 터치 타겟 최소 44px × 44px 보장
- 버튼 레이아웃 개선 (모바일 전체 너비, 아이콘 고정)
- 가로 스크롤 방지 및 자동 하이픈 처리
- 패딩/간격 반응형 시스템 구축

**2026-04-28**: 강의 소개 랜딩 페이지와 AI 채점 실습 앱 통합
- 랜딩 페이지를 루트(`/`)로, 실습 앱을 `/practice`로 재구성
- Framer Motion 애니메이션 추가
- 전체 강의 커리큘럼 복습 섹션 구현 (MD 파일 기반)
- 양방향 네비게이션 추가 (랜딩 ↔ 실습)
- 세션 만들기 비밀번호 보호 추가 (7962)
- 블랙 배경 디자인 + 학습 최적화 화이트 복습 섹션

자세한 내용은 [`CLAUDE.md`](CLAUDE.md) 참고

---

**Made with ❤️ for "AI의 프롬프트란?" 강의**
