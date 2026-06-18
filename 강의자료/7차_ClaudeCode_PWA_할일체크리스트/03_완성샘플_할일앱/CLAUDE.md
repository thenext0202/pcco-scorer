# 할 일 체크리스트 (PWA 스타터)

## 개요
폰에 설치하는 할 일 앱. 순수 HTML/CSS/JS PWA. **레이어로 나뉜 스타터** — 읽고·개조하고·배포한다.
- 실행: `node server.js` → http://localhost:3000
- 배포: Vercel(정적, 기본) / 대안 Railway(server.js)
- vercel.json(framework:null, outputDirectory:".") + .vercelignore(server.js·specs·*.md 제외) → Vercel 정적 배포. server.js를 배포에 포함하면 Node 함수로 오감지돼 500 발생.

## 레이어 구조 (한 파일 = 한 책임)
- `store.js`   — 데이터: load/save (localStorage 키 "todos")
- `actions.js` — 동작: addTodo·toggleTodo·removeTodo — **순수 함수**((목록,입력)→새 목록)
- `render.js`  — 화면: renderTodos·renderCount (데이터 읽기 전용, 변경 안 함)
- `app.js`     — 연결: 이벤트 → actions → store → render. 모든 변경은 update() 한 곳.

## 개조 규칙 (수정 시)
- 기능 추가: **actions.js**에 순수 함수부터 → app.js에서 연결 → render.js·css로 표시
- 모양 변경: **styles.css**(또는 render.js의 마크업)
- 데이터 형태 변경: **store.js** + actions.js 함께
- 사용자 입력은 textContent로(XSS 방지). 데이터는 localStorage에만(서버로 안 보냄).

## PWA 5요소 ↔ 파일
- 화 index.html·styles.css / 저 store.js / 정 manifest.json·icons / 오 sw.js / 배 Vercel

## 절대 하지 마세요
- 코드 바꾸고 sw.js의 CACHE 버전(vN) 안 올리기 → 옛 화면이 캐시돼 보임
- render.js에서 데이터(todos)를 직접 바꾸기 → 화면 레이어는 읽기만
- HTTPS 아닌 곳에서 '설치 안 된다'고 당황 (로컬은 localhost만 예외)
