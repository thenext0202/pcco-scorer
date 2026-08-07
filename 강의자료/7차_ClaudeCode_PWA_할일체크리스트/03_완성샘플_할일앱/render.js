// ───────────────────────────────────────────────────────────
// 화면 레이어 (render) — 데이터를 화면(DOM)으로 그린다
//   입력 todos 배열 → 출력 화면. 데이터를 바꾸지는 않는다(읽기 전용).
// ───────────────────────────────────────────────────────────

// 할 일 목록을 그린다:  (todos, 목록요소) → 화면
function renderTodos(todos, listEl) {
  listEl.innerHTML = "";
  todos.forEach((t) => {
    const li = document.createElement("li");
    li.className = "item" + (t.done ? " done" : "");
    li.innerHTML =
      '<label class="chk">' +
      '  <input type="checkbox" class="toggle" data-id="' + t.id + '"' + (t.done ? " checked" : "") + " />" +
      '  <span class="text"></span>' +
      "</label>" +
      '<button class="del" data-id="' + t.id + '" aria-label="삭제">🗑</button>';
    li.querySelector(".text").textContent = t.text; // 사용자 입력은 textContent로 안전하게
    listEl.appendChild(li);
  });
}

// 남은 개수 + 빈 상태 안내:  (todos, 개수요소, 빈상태요소) → 화면
function renderCount(todos, countEl, emptyEl) {
  const left = todos.filter((t) => !t.done).length;
  countEl.textContent = todos.length ? left + "개 남음" : "";
  emptyEl.style.display = todos.length ? "none" : "block";
}
