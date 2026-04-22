# Railway 배포 가이드

이 문서는 R-PCCO Scorer를 Railway에 배포하는 상세 가이드입니다.

## 📋 사전 준비

배포 전 다음 항목을 준비하세요:

- ✅ GitHub 계정 및 저장소 생성
- ✅ Railway 계정 (https://railway.com)
- ✅ Anthropic API 키 (https://console.anthropic.com)
- ✅ Supabase 프로젝트 (https://supabase.com)
- ✅ Supabase DB 스키마 실행 완료

---

## 🚀 배포 단계

### Step 1: GitHub 저장소 생성 및 Push

1. GitHub에서 새 저장소 생성: https://github.com/new
   - 저장소 이름: `pcco-scorer` (또는 원하는 이름)
   - Public 또는 Private 선택
   - README, .gitignore는 추가하지 않음 (이미 로컬에 있음)

2. 로컬에서 원격 저장소 연결:

```bash
git remote add origin https://github.com/YOUR_USERNAME/pcco-scorer.git
git branch -M main
git push -u origin main
```

### Step 2: Railway 프로젝트 생성

1. https://railway.com 접속 → 로그인

2. 대시보드 우측 상단 **"New Project"** 클릭

3. **"Deploy from GitHub repo"** 선택

4. GitHub 연결이 안 되어 있다면:
   - "Configure GitHub App" 클릭
   - Railway에 접근 권한 부여
   - 특정 저장소만 선택하거나 모든 저장소 허용

5. `pcco-scorer` 저장소 선택

6. **"Deploy Now"** 클릭

7. Railway가 자동으로 감지:
   - ✅ Next.js 프로젝트
   - ✅ `railway.json` 설정
   - ✅ `package.json` 의존성
   - ✅ Node.js 20 이상

8. 첫 번째 빌드 시작 (2~4분 소요)
   - **Build Logs** 탭에서 진행 상황 확인
   - ⚠️ 환경 변수가 없어 런타임 에러 발생 예상 (정상)

### Step 3: 환경 변수 등록

첫 배포는 환경 변수가 없어 실패합니다. 다음 단계로 등록하세요:

1. 배포된 서비스 클릭

2. 상단 **Variables** 탭 이동

3. **Raw Editor** 버튼 클릭 (한 번에 붙여넣기)

4. 다음 내용 입력 (본인의 실제 값으로 교체):

```env
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxx...
```

5. **Update Variables** 클릭

6. Railway가 자동으로 **재배포 시작** (1~2분 소요)
   - `NEXT_PUBLIC_*` 변수는 빌드 타임에 번들에 포함되므로 재빌드 필요

### Step 4: 공개 도메인 생성

1. 서비스 → 상단 **Settings** 탭

2. 아래로 스크롤 → **Networking** 섹션

3. **"Generate Domain"** 클릭

4. 생성된 도메인 확인:
   - 형식: `pcco-scorer-production-xxxx.up.railway.app`
   - 복사 버튼으로 URL 복사

5. (선택) 커스텀 도메인 연결:
   - **Custom Domain** 섹션에서 본인 도메인 입력
   - DNS 설정 안내에 따라 CNAME 레코드 추가

### Step 5: 배포 확인

1. **Deployments** 탭에서 최신 배포 상태 확인
   - 🟢 **SUCCESS**: 정상 배포
   - 🔴 **FAILED**: Deploy Logs 확인

2. 생성된 도메인으로 접속
   - 메인 페이지 정상 로드 확인
   - `/api/health` (또는 `/`) 응답 확인

3. 기능 테스트:
   - ✅ 단독 채점 모드 동작
   - ✅ 세션 생성 (`/host`)
   - ✅ 참가자 입장 (`/play/[code]`)
   - ✅ 리더보드 실시간 업데이트 (`/play/[code]/board`)
   - ✅ PWA 설치 프롬프트 표시

---

## 🧪 배포 후 검증 시나리오

### 1. API 엔드포인트 테스트

```bash
curl -X POST https://YOUR-RAILWAY-URL.up.railway.app/api/score \
  -H "Content-Type: application/json" \
  -d '{"prompt":"너는 10년차 마케터야. 신제품 홍보를 위해 블로그 글을 써줘. 200자, 친근한 톤."}'
```

**예상 결과**: JSON 응답 (total_score, grade, elements 등)

### 2. 세션 생성 및 참가 테스트

1. `/host` 접속 → 세션 제목 입력 → 생성
2. 4자리 코드 확인
3. 시크릿창(또는 다른 브라우저)에서 `/play/[코드]` 입장
4. 닉네임 입력 → 프롬프트 채점 → 리더보드 제출
5. `/play/[코드]/board`에서 실시간 반영 확인

### 3. PWA 설치 테스트 (모바일)

1. 스마트폰에서 Railway URL 접속
2. iOS Safari: 공유 → "홈 화면에 추가"
3. Android Chrome: 메뉴 → "앱 설치"
4. 홈 화면 아이콘으로 실행 → 전체 화면 모드 확인

### 4. Lighthouse PWA 점수 확인

1. Chrome DevTools → Lighthouse 탭
2. Categories: Progressive Web App 체크
3. "Analyze page load" 클릭
4. **목표**: PWA 점수 90+ (100점 목표!)

### 5. 오프라인 동작 확인

1. DevTools → Network → Offline 체크
2. 페이지 새로고침
3. `/offline.html` 페이지 표시 확인

---

## 🔄 업데이트 및 롤백

### 코드 업데이트 배포

1. 로컬에서 코드 수정 후 커밋:

```bash
git add .
git commit -m "feat: 새 기능 추가"
git push
```

2. Railway가 자동으로 새 커밋 감지 → 자동 배포
3. Deployments 탭에서 진행 상황 확인

### 롤백 (이전 배포로 되돌리기)

1. Railway 대시보드 → **Deployments** 탭
2. 이전 배포 (SUCCEEDED 상태) 찾기
3. 우측 **"⋮"** 메뉴 → **"Redeploy"** 클릭
4. 이전 버전으로 즉시 되돌림

---

## ⚙️ 환경 변수 관리

### 환경 변수 추가/수정

1. Variables 탭 → Raw Editor
2. 변수 추가 또는 수정
3. Update Variables → 자동 재배포

### 주의사항

- `NEXT_PUBLIC_*` 변수 변경 시 **반드시 재빌드 필요**
- 서버 전용 변수(`ANTHROPIC_API_KEY`)는 재시작만으로 반영
- 환경 변수 삭제 시에도 재배포 발생

---

## 📊 모니터링 및 로그

### Logs 확인

1. 서비스 → **Logs** 탭
2. 실시간 로그 스트림 확인
3. 에러 발생 시 스택 트레이스 확인

### Metrics 확인

1. 서비스 → **Metrics** 탭
2. CPU, 메모리, 네트워크 사용량 확인
3. 요청 응답 시간 모니터링

---

## 🚨 문제 해결

### "Application failed to respond"

**원인**: Next.js가 PORT를 제대로 바인딩하지 못함

**해결**:
1. `next.config.ts`에 `output: "standalone"` 확인
2. Deploy Logs에서 "ready started server on ..." 메시지 확인
3. 없다면 빌드 에러 확인

### 환경 변수 에러

**원인**: 변수 오타 또는 누락

**해결**:
1. Variables 탭에서 철자 재확인
2. Supabase Key가 완전히 복사되었는지 확인 (매우 긺)
3. `npm run preflight` 로컬에서 테스트

### Supabase 연결 안 됨

**원인**: URL/Key 오류 또는 RLS 정책 문제

**해결**:
1. Supabase Dashboard → Settings → API에서 값 재확인
2. `docs/supabase_schema.sql` 재실행 (RLS 정책 포함)
3. Railway Logs에서 Supabase 에러 메시지 확인

### 빌드는 성공하지만 런타임 에러

**원인**: 환경 변수 빌드 타임/런타임 혼동

**해결**:
1. Deployments → 최신 배포 → "Redeploy" (재빌드)
2. `NEXT_PUBLIC_*` 변수는 반드시 재빌드 필요

---

## 💡 최적화 팁

### Cold Start 방지

Railway는 무료 플랜에서 일정 시간 무활동 시 Sleep 모드로 전환될 수 있습니다.

**해결**:
1. Settings → Resources → "App Sleeping" 비활성화 (Hobby 플랜)
2. 강의 당일 30분 전 접속하여 서비스 활성화

### 빌드 시간 단축

1. `output: "standalone"` 사용 (이미 적용됨)
2. 불필요한 의존성 제거
3. `.next` 캐시 활용 (Railway 자동)

---

## 📞 지원

- **Railway 문서**: https://docs.railway.com
- **Discord 커뮤니티**: https://discord.gg/railway
- **이슈 제출**: GitHub Issues
