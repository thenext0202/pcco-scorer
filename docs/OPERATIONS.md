# 운영 매뉴얼

R-PCCO Scorer 강의 운영을 위한 체크리스트 및 장애 대응 가이드입니다.

---

## ⏰ 강의 시작 30분 전 체크리스트

### 1. Anthropic API 잔액 확인

1. https://console.anthropic.com 접속
2. 좌측 메뉴 → **Billing** 클릭
3. **Credits Balance** 확인
   - 권장: 최소 $5 이상
   - 예상 사용량: 30명 × 5회 채점 = 약 $0.30~$0.50

**부족할 경우**:
- Add Credits → 카드 등록 후 충전
- 또는 강의 시작 전 테스트 세션으로 잔액 확인

### 2. Supabase 서비스 상태 확인

1. https://supabase.com/dashboard 접속
2. 프로젝트 선택
3. **Database** → **Tables**에서 `sessions`, `submissions` 테이블 확인
4. SQL Editor → 간단한 쿼리 실행:

```sql
SELECT COUNT(*) FROM sessions;
SELECT COUNT(*) FROM submissions;
```

**정상 응답 확인** (숫자 반환)

### 3. Railway 서비스 상태 확인

1. https://railway.com 대시보드 접속
2. `pcco-scorer` 프로젝트 클릭
3. 서비스 상태 확인:
   - 🟢 **ACTIVE**: 정상 (Metrics에서 CPU/메모리 확인)
   - 🟡 **SLEEPING**: 서비스 접속하여 활성화
   - 🔴 **CRASHED**: Logs 확인 후 재배포

4. Deployments 탭에서 최신 배포 **SUCCESS** 확인

### 4. 테스트 세션 동작 확인

1. Railway 도메인으로 `/host` 접속
2. 테스트 세션 생성:
   - 제목: "사전 테스트"
   - 강사 이름: (본인 이름)
3. 4자리 코드 복사
4. 새 탭에서 `/play/[코드]` 접속
   - 닉네임: "테스트"
   - 간단한 프롬프트 입력 → 채점
   - "리더보드에 등록하기" 클릭
5. `/play/[코드]/board` 접속
   - 리더보드에 "테스트" 닉네임 표시 확인
   - 실시간 업데이트 확인 (새로고침 없이)

**모든 단계 정상 동작 시 ✅ 준비 완료**

### 5. 프로젝터용 리더보드 미리 열기

1. 실제 강의 세션 생성
2. `/play/[코드]/board` URL 복사
3. 프로젝터에 연결된 PC/노트북에서 열기
4. 전체 화면 (F11)
5. 브라우저 주소창 숨기기 (Chrome 전체 화면 모드)

---

## 🎯 강의 진행 워크플로우

### 세션 시작 (강의 시작 5분 전)

1. `/host` 에서 실제 세션 생성:
   - 제목: "AI 프롬프트 실습 - 2026년 4월 22일"
   - 강사 이름: (본인 이름)

2. 4자리 코드를 PPT 또는 칠판에 크게 표시

3. QR 코드 화면 공유 (선택):
   - 세션 생성 화면의 QR 코드 캡처
   - 또는 https://qr-code-generator.com 에서 생성:
     - URL: `https://YOUR-RAILWAY-URL.up.railway.app/play/ABCD`
     - PNG 다운로드 → PPT에 삽입

4. 리더보드 화면 프로젝터에 띄우기:
   - `/play/[코드]/board` 전체 화면
   - 다크 테마로 가독성 최적화됨

### 수강생 참가 안내 (강의 중)

**말로 안내:**
> "스마트폰이나 노트북으로 (Railway URL) 접속하세요.
> 메인 페이지에서 '세션 참가하기' 버튼을 누르고,
> 코드 **ABCD**를 입력하면 됩니다."

**화면에 표시:**
```
📱 R-PCCO Scorer
https://pcco-scorer-production-xxxx.up.railway.app

코드: ABCD
```

### 채점 및 제출 안내

> "프롬프트를 작성하고 '채점하기' 버튼을 누르세요.
> 결과를 확인한 후 '리더보드에 등록하기'를 누르면
> 여러분의 점수가 화면에 실시간으로 표시됩니다!"

---

## 🚨 강의 중 장애 대응

### 문제 1: 채점 API 먹통 (Anthropic API 장애)

**증상**:
- "채점 중..." 무한 로딩
- 에러 메시지: "채점에 실패했습니다"

**원인**:
- Anthropic API 다운타임
- API 키 잔액 부족
- Rate Limit 초과

**즉시 대응**:
1. Anthropic Console → Status 확인
2. Rate Limit 초과 시 잠시 대기 (1분 후 재시도)
3. 임시 해결: 단독 채점 모드만 안내
   - "세션 모드 일시 중단, 개별 채점으로 연습하세요"

**Railway 환경 변수로 Mock 모드 활성화** (긴급):
```
1. Railway → Variables → Raw Editor
2. 추가: NEXT_PUBLIC_USE_MOCK=true
3. 자동 재배포 (1~2분)
4. 더미 데이터로 채점 동작
```

### 문제 2: Supabase 연결 안 됨 (세션/리더보드 장애)

**증상**:
- 세션 생성 실패
- "세션을 찾을 수 없습니다"
- 리더보드 빈 화면

**원인**:
- Supabase 서비스 다운타임
- 네트워크 문제

**즉시 대응**:
1. Supabase Status 확인: https://status.supabase.com
2. 단독 채점 모드로 전환 안내:
   - "리더보드 기능은 일시 중단됩니다"
   - "개별 채점으로 연습하고, 점수는 직접 기록하세요"

### 문제 3: Railway 서비스 먹통

**증상**:
- 사이트 접속 불가
- 502 Bad Gateway
- 504 Gateway Timeout

**원인**:
- Railway 플랫폼 장애
- 배포 실패

**즉시 대응**:
1. Railway → Deployments 탭
2. 이전 배포 (SUCCEEDED) 찾기
3. **"Redeploy"** 클릭 (롤백)
4. 1~2분 후 복구 확인

**대안**:
- 로컬 개발 서버로 임시 운영:
  ```bash
  npm run dev
  ngrok http 3000  # 공개 URL 생성
  ```
- ngrok URL을 QR 코드로 공유

### 문제 4: 일부 학생만 접속 안 됨

**증상**:
- 일부 학생: "사이트를 찾을 수 없습니다"
- 대부분은 정상 접속

**원인**:
- 학생 네트워크/방화벽 문제
- 브라우저 캐시
- 오타

**해결**:
1. URL 재확인 (오타 없는지)
2. 다른 브라우저 시도 (Safari → Chrome)
3. 시크릿 모드 (Ctrl+Shift+N)
4. Wi-Fi → 모바일 데이터 전환

---

## 📊 QR 코드 제작 (강의 준비)

### 방법 1: R-PCCO Scorer 자동 생성 (권장)

세션 생성 화면에서 자동으로 QR 코드가 표시됩니다.
- 우클릭 → "이미지 저장" → PPT에 삽입

### 방법 2: 온라인 생성기 사용

1. https://qr-code-generator.com 접속
2. URL 입력:
   ```
   https://YOUR-RAILWAY-URL.up.railway.app/play/ABCD
   ```
   (실제 Railway URL과 코드로 교체)

3. **High Resolution** 선택
4. **Download PNG** 클릭
5. PPT에 큼직하게 배치 (최소 10cm × 10cm)

**팁**:
- QR 코드 아래에 코드 숫자도 함께 표시
- 학생들이 스캔 실패 시 수동 입력 가능

---

## 📈 강의 후 데이터 정리 (선택)

### 세션 데이터 확인

Supabase Dashboard → SQL Editor:

```sql
-- 오늘 생성된 세션 확인
SELECT * FROM sessions
WHERE created_at::date = CURRENT_DATE
ORDER BY created_at DESC;

-- 특정 세션의 제출 내역
SELECT nickname, total_score, grade, created_at
FROM submissions
WHERE session_id = 'SESSION_UUID'
ORDER BY total_score DESC;

-- 평균 점수
SELECT AVG(total_score) as avg_score
FROM submissions
WHERE session_id = 'SESSION_UUID';
```

### 데이터 백업 (CSV 다운로드)

1. Supabase Dashboard → **Table Editor**
2. `submissions` 테이블 선택
3. 필터: `session_id = 'SESSION_UUID'`
4. 우측 상단 **⋮** → **Export as CSV**

### 오래된 세션 정리 (7일 후)

```sql
-- 7일 이전 세션 삭제 (submissions도 자동 삭제됨 - CASCADE)
DELETE FROM sessions
WHERE created_at < NOW() - INTERVAL '7 days';
```

---

## 💡 강의 팁

### 리더보드 활용

- 상위 3명에게 간단한 보상 (스티커, 칭찬 등)
- 중간중간 "현재 1등은 OO님입니다!" 멘트
- 실시간 업데이트 효과 강조 → 학생 참여 동기 부여

### 프롬프트 작성 가이드

첫 제출 전 예시 안내:
> "좋은 프롬프트 예시:
> '너는 10년차 B2B 마케터야. 스타트업 CTO가 우리 제품을 검토하도록 1500자 블로그 글을 써줘. 30~40대 CTO 대상, 네이버 블로그, 월요일 아침. 전문용어는 괄호로 설명. 중간 제목 3개, 표 1개 포함.'"

### 시간 배분

- 세션 참가 및 첫 채점: 10분
- 개선 및 재제출 (2~3회): 15분
- 리더보드 확인 및 피드백: 5분
- **총 30분** (표준 실습 시간)

---

## 🔧 유지보수

### 정기 점검 (월 1회)

- [ ] Anthropic API 사용량 확인 (Console → Usage)
- [ ] Supabase 데이터베이스 용량 확인 (무료: 500MB)
- [ ] Railway 배포 로그 확인 (에러 없는지)
- [ ] 테스트 세션 생성 → 전체 기능 동작 확인

### 업데이트 배포

1. 로컬에서 코드 수정
2. 테스트: `npm run build && npm start`
3. 커밋 및 푸시:
   ```bash
   git add .
   git commit -m "fix: 버그 수정"
   git push
   ```
4. Railway 자동 배포 (2~3분)
5. 배포 URL로 기능 재확인

---

## 📞 긴급 연락처

- **Anthropic Support**: support@anthropic.com
- **Supabase Support**: https://supabase.com/support
- **Railway Support**: https://help.railway.com

---

**강의 성공을 기원합니다! 🎓✨**
