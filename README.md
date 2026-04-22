# R-PCCO Scorer

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Railway](https://img.shields.io/badge/Railway-Deployed-purple?logo=railway)
![Supabase](https://img.shields.io/badge/Supabase-Realtime-green?logo=supabase)
![License](https://img.shields.io/badge/License-MIT-yellow)

AI 프롬프트 강의 "AI의 프롬프트란?" (정금구) 부속 실습 앱입니다. 작성한 프롬프트를 R-PCCO 5요소(역할/목적/맥락/제약/출력)로 자동 채점하고 실시간 리더보드를 제공합니다.

## 🔗 Live Demo

> **배포 후 여기에 Railway URL을 입력하세요**
>
> 예: https://pcco-scorer-production.up.railway.app

## ✨ 주요 기능

- 🤖 **AI 자동 채점** - Claude Sonnet 4.6 모델 기반 R-PCCO 5요소 평가
- 📊 **상세 피드백** - 요소별 점수, 감지된 내용, 구체적 개선 제안
- 🏆 **실시간 리더보드** - Supabase Realtime으로 즉시 업데이트
- 👥 **세션 모드** - 강사가 세션 생성, 수강생 코드 입력으로 참가
- 📱 **PWA 지원** - 홈 화면에 설치 가능, 오프라인 폴백
- 🎓 **교육 최적화** - QR 코드, 프로젝터용 다크 테마 리더보드

## 🛠️ 기술 스택

**Frontend**
- Next.js 16 (App Router)
- TypeScript 5
- Tailwind CSS 4
- shadcn/ui

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
  app/              # Next.js App Router 페이지
    /host           # 세션 생성 페이지 (강사용)
    /play/[code]    # 참가자 채점 페이지
    /play/[code]/board  # 실시간 리더보드
    /install        # PWA 설치 가이드
  components/       # React 컴포넌트
    /ui             # shadcn/ui 컴포넌트
  lib/              # 유틸리티 및 API
  types/            # TypeScript 타입 정의

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

### 강사 (세션 모드)

1. `/host` 접속 → 세션 제목 입력 → "세션 생성"
2. 4자리 코드 + QR 코드 화면 공유
3. `/play/[코드]/board` 새 탭으로 열어 프로젝터 공유
4. 수강생들이 제출하면 리더보드 실시간 업데이트

### 수강생

1. 메인 페이지 → "세션 참가하기" → 코드 입력
2. 닉네임 입력
3. 프롬프트 작성 → "채점하기"
4. 결과 확인 후 "리더보드에 등록하기"

### 개인 연습 (단독 모드)

1. 메인 페이지 하단 "단독 채점 모드"
2. 프롬프트 입력 → 채점 결과 즉시 확인
3. 개선 예시 복사 버튼으로 학습

## 📖 운영 가이드

강의 전 준비사항, 장애 대응, QR 코드 제작 등은 [`docs/OPERATIONS.md`](docs/OPERATIONS.md)를 참고하세요.

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

---

**Made with ❤️ for "AI의 프롬프트란?" 강의**
