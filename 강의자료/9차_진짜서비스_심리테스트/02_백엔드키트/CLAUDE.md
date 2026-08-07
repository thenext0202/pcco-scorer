# 심리테스트 공유 서비스 — 프로젝트 규칙 (백엔드 키트)

## 이 프로젝트는
수강생이 기획한 심리테스트를 **웹 서비스**로 구현한다.
- 화면·질문 수·채점 방식·기능: **`기획안.md`를 따른다 (자유)**
- 저장·공유·통계의 뒷단: **이 문서의 규칙을 따른다 (고정)**

## 절대 규칙 (반드시 지킬 것)

1. **빌드 도구 금지** — Next.js·Vite·React·npm 설치 없이 **순수 HTML/CSS/JS**만 사용한다. `index.html`을 브라우저로 열면 바로 작동해야 한다.

2. **단일 페이지** — 페이지는 `index.html` 하나. 화면 전환(시작→질문→결과)은 JS로 섹션을 보이고/숨겨서 처리한다.

3. **`db.js` 수정 금지** — 데이터 저장·불러오기·통계는 반드시 `db.js`가 제공하는 함수만 사용한다. Supabase를 직접 호출하는 코드를 새로 만들지 않는다.
   - `DB.isConnected()` → 창고(Supabase) 연결 여부 (true/false)
   - `DB.saveResult(data)` → 저장하고 **공유용 id(문자열)**를 돌려준다. `data`는 자유 JSON이되 **`result` 키(결과 유형/등급 이름, 문자열)를 반드시 포함**할 것.
   - `DB.loadResult(id)` → 저장했던 `data`를 그대로 돌려준다 (없으면 null).
   - `DB.getStats()` → `{ total, counts }` — 전체 응답 수와 result 값별 개수. 통계 표시("당신 유형은 전체의 N%")에 쓴다.

4. **공유 모드 규칙** — 주소에 `?id=...`가 있으면 테스트를 건너뛰고 `DB.loadResult(id)`로 **그 결과를 바로 표시**한다(공유받은 친구가 보는 화면). 이 화면에는 "나도 해보기" 버튼을 두고, 누르면 `?id` 없는 기본 주소로 이동해 테스트를 처음부터 풀 수 있게 한다.
   결과 화면의 "공유 링크"는 `현재주소?id=저장된id` 형식으로 만들고, 클립보드 복사 버튼을 제공한다.

5. **열쇠는 `config.js`에만** — Supabase URL과 anon key는 `config.js`의 `CONFIG`에만 둔다. 다른 파일에 하드코딩 금지.

6. **창고 없이도 작동** — `DB.isConnected()`가 false면(config.js가 비어 있으면) 테스트는 끝까지 정상 작동하되, **결과 저장·공유 버튼만 비활성화**하고 "🔌 창고 연결 대기 중 — Supabase를 연결하면 켜집니다" 문구를 보여준다. 절대 에러를 내거나 빈 화면이 되지 않는다.

7. **PWA 금지** — 서비스워커(sw.js), manifest.json, 오프라인 캐시를 넣지 않는다. 이 서비스는 링크로 방문하는 웹이고, 캐시는 자동배포 확인을 방해한다.

8. **모바일 우선** — 친구들이 폰으로 연다. 세로 화면 기준으로 디자인하고, 버튼 등 터치 타겟은 최소 44px. 한글은 `word-break: keep-all`.

9. **한국어 UI.** 이모지 활용은 자유.

## index.html에 반드시 포함할 스크립트 로드 순서
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="config.js"></script>
<script src="db.js"></script>
<!-- 그 아래에 앱 코드 -->
```

## 파일 구성 (구현 완료 후 기대 상태)
- `index.html` / `styles.css` / 앱 JS(구성 자유) — **새로 만든다**
- `config.js` / `db.js` — 키트 제공 (db.js는 수정 금지)
- `기획안.md` — 이 앱의 설계도 (수정하지 말고 보존 — 함께 커밋한다)
- `supabase_setup.sql` / `00_구현요청.md` / `README.md` — 키트 문서 (그대로 둔다)

## 로컬 확인 방법
브라우저로 `index.html`을 직접 열거나, `python -m http.server 8000` 후 `http://localhost:8000` 접속.

## 커밋 규칙
의미 있는 변경마다 커밋 1개. 메시지는 한국어로 간단히 (예: "결과 화면 디자인 수정", "Supabase 창고 연결").
