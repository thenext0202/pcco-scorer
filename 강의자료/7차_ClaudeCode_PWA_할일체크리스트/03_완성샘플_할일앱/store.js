// ───────────────────────────────────────────────────────────
// 데이터 레이어 (store) — 폰에 저장/불러오기만 담당
//   loadTodos:  입력 없음        → 출력 todos 배열
//   saveTodos:  입력 todos 배열   → 출력 (localStorage에 저장)
// ───────────────────────────────────────────────────────────
const STORE_KEY = "todos";

function loadTodos() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTodos(todos) {
  localStorage.setItem(STORE_KEY, JSON.stringify(todos));
}
