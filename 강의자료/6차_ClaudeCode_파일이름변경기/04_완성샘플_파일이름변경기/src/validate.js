// ───────────────────────────────────────────────────────────
// 2.5단계 · 검증 (Validate)
// 입력: 변경계획 JSON         ← 계약2
// 출력: 충돌이 표시된 변경계획 (conflict=true 채움)
// 책임: 위험한 결과(빈 이름·중복)를 표시만 한다. 규칙은 안 바꾼다.
// (지침: specs/02_변환.md 검증 절)
// ───────────────────────────────────────────────────────────
const INVALID = /[\\/:*?"<>|]/; // 윈도우 파일명 금지 문자

function validate(planResult) {
  const plan = planResult.plan || [];

  // 새 이름 등장 횟수 세기 (중복 탐지)
  const counts = {};
  plan.forEach((p) => { counts[p.newName] = (counts[p.newName] || 0) + 1; });

  let conflictCount = 0;
  plan.forEach((p) => {
    const name = (p.newName || '').trim();

    // 비었거나, ".확장자"처럼 베이스(본 이름)가 없는 경우
    const empty = !name || /^\.[^.]*$/.test(name);
    const dup = counts[p.newName] > 1;             // 다른 파일과 새 이름이 같나
    const bad = INVALID.test(name);                // 금지 문자

    p.conflict = Boolean(empty || dup || bad);
    if (p.conflict) conflictCount += 1;
  });

  planResult.conflictCount = conflictCount;
  return planResult;
}

module.exports = { validate };
