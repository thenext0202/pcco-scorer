# 파일 이름 일괄 변경기

## 개요
내 폴더의 파일 이름을 규칙대로 **제자리에서** 바꾸는 Node 로컬 도구.
- 기술: Node 내장 모듈만 (`http`, `fs`, `path`) — 추가 설치 없음
- 실행: `node server.js` → http://localhost:3000

## 구조 (3단계 레이어 · 단계 사이는 JSON으로만)
- `src/collect.js`   : 1단계 수집 (folderPath → 파일목록 JSON)
- `src/transform.js` : 2단계 변환계획 (규칙 → 변경계획 JSON)
- `src/validate.js`  : 2.5 검증 (빈이름·중복·금지문자)
- `src/output.js`    : 3단계 출력 (fs.rename 제자리 변경 + 되돌리기)
- `specs/*.md`       : 각 단계 I/O 계약(포·필·범·메)
- `server.js`        : 로컬 서버(정적 + API)
- `public/*`         : 화면(UI)

## 코드 규칙
- 한 모듈 = 한 단계 책임. 단계 사이는 JSON으로만 주고받는다.
- 주석은 한국어 OK. import 순서: 내장 모듈 → 내부 모듈.

## 실행 / 점검
- 실행: `node server.js`
- 구문 점검: `node --check server.js`

## 절대 하지 마세요
- 미리보기·검증 없이 파일 변경 ❌
- 지정 폴더 '바로 아래' 외 재귀 변경 ❌
- 시스템 폴더(C:\Windows 등)·드라이브 루트 대상 ❌
- `.env` 값을 코드/깃에 노출 ❌
