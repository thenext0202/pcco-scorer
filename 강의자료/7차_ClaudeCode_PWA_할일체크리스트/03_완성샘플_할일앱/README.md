# 할 일 체크리스트 (PWA 스타터)

폰 홈 화면에 깔아 쓰는 할 일 앱. 순수 HTML/CSS/JS **PWA**(설치 + 오프라인 + 저장).
이 앱은 **레이어로 잘 나뉜 스타터**입니다 — 구조를 읽고, 내 입맛대로 개조하고, 배포해 보세요.

## 실행 (로컬)
```bash
node server.js
```
브라우저에서 http://localhost:3000 열기. (서비스워커는 localhost 또는 HTTPS에서 동작)

## 구조 (4개 레이어)
- `store.js`   — 데이터: 저장/불러오기 (localStorage)
- `actions.js` — 동작: (목록, 입력) → 새 목록 (순수 함수)
- `render.js`  — 화면: 목록 → 화면 그리기
- `app.js`     — 연결: 이벤트 → actions → store → render
- 자세히: `specs/레이어_구조.md`

## PWA 5요소 (화·정·오·저·배)
- 화(화면) `index.html` · `styles.css`
- 저(저장) `store.js` (localStorage)
- 정(정보) `manifest.json` · `icons/`
- 오(오프라인) `sw.js`
- 배(배포) Vercel(기본) / 대안 Railway(`server.js`)
  - `vercel.json`·`.vercelignore` 포함 → Vercel이 정적 사이트로 배포(서버 함수 오감지 방지, `server.js`는 배포 제외)

## 개조하기
`개조_미션.md` 참고 — 디자인(이름·색·테마) + 기능(중요 표시·통계 등)을 더해 '내 앱'으로.
코드를 바꾸면 `sw.js`의 `CACHE` 버전을 올리세요(v2 → v3).

## 폰에 설치 (배포 후)
1. Vercel 등에 배포해 HTTPS URL 받기
2. 폰 브라우저에서 그 URL 열기 → 안드로이드(Chrome) "홈 화면에 추가" / 아이폰(Safari) 공유 → "홈 화면에 추가"
3. 비행기모드로 열어 오프라인 확인
