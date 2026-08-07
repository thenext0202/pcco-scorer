// ───────────────────────────────────────────────────────────
// 연결 레이어 (app) — 레이어들을 잇는다
//   흐름:  이벤트 → 동작(actions)으로 새 목록 계산
//          → 저장(store)  → 화면(render)
//   모든 변경은 update() 한 곳을 거친다 (저장+화면을 동시에).
// ───────────────────────────────────────────────────────────
let todos = loadTodos(); // [store] 시작할 때 폰에서 불러오기

const listEl = document.getElementById("list");
const countEl = document.getElementById("count");
const emptyEl = document.getElementById("empty");
const formEl = document.getElementById("form");
const inputEl = document.getElementById("input");

// 새 목록을 받아 → 저장하고 → 화면을 다시 그린다 (변경의 단일 통로)
function update(newTodos) {
  todos = newTodos;
  saveTodos(todos);                       // [store] 저장
  renderTodos(todos, listEl);             // [render] 목록
  renderCount(todos, countEl, emptyEl);   // [render] 개수/빈상태
}

// 추가 (form 제출 / Enter)
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  update(addTodo(todos, inputEl.value)); // [actions] → update
  inputEl.value = "";
  inputEl.focus();
});

// 완료 토글 / 삭제 (목록 클릭 위임)
listEl.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (!id) return;
  if (e.target.classList.contains("toggle")) update(toggleTodo(todos, id));
  if (e.target.classList.contains("del")) update(removeTodo(todos, id));
});

// 첫 화면
renderTodos(todos, listEl);
renderCount(todos, countEl, emptyEl);

// [오] 서비스워커 등록 (HTTPS 또는 localhost에서만 동작)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
