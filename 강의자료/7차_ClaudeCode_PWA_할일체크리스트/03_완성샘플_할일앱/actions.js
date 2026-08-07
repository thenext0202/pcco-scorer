// ───────────────────────────────────────────────────────────
// 동작 레이어 (actions) — 순수 함수: (현재 목록 + 입력) → 새 목록
//   화면도 저장도 건드리지 않는다. 오직 '데이터 → 데이터'.
//   그래서 입력/출력이 가장 명확하고, 기능 추가도 여기서 시작한다.
// ───────────────────────────────────────────────────────────

// 할 일 추가:  (todos, "장보기") → 끝에 추가된 새 todos
function addTodo(todos, text) {
  const v = text.trim();
  if (!v) return todos;
  return [...todos, { id: String(Date.now()), text: v, done: false }];
}

// 완료 토글:  (todos, id) → 그 항목의 done이 뒤집힌 새 todos
function toggleTodo(todos, id) {
  return todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
}

// 삭제:  (todos, id) → 그 항목이 빠진 새 todos
function removeTodo(todos, id) {
  return todos.filter((t) => t.id !== id);
}
