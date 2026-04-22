# R-PCCO Scorer

AI 프롬프트 강의 수강생을 위한 자동 채점 PWA입니다. 작성한 프롬프트를 R-PCCO 5요소(역할/목적/맥락/제약/출력)로 평가하고 실시간 리더보드를 제공합니다.

## 주요 기능

- ✅ Claude Sonnet 4.6 기반 자동 채점
- 📊 R-PCCO 5요소 개별 점수 및 피드백
- 🏆 실시간 리더보드
- 📱 PWA 지원 (오프라인 사용 가능)

## 기술 스택

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Anthropic Claude API
- Supabase
- Vercel

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
ANTHROPIC_API_KEY=your_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 4. 빌드 및 배포

```bash
npm run build
npm start
```

## 프로젝트 구조

```
src/
  app/          # 라우팅 및 페이지
  components/   # 재사용 가능한 컴포넌트
  lib/          # 유틸리티 및 API 클라이언트
  types/        # TypeScript 타입 정의
docs/           # 프로젝트 문서
```

## 라이선스

MIT License

Copyright (c) 2026 R-PCCO Scorer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
