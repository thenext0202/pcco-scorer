// ───────────────────────────────────────────────────────────
// 3단계 · 출력 (Output)
// 입력: 변경계획 JSON + folderPath   ← 계약2 (검증 완료본)
// 출력: 제자리 rename 실행 + 되돌리기 기록(.rename-history.json)
// 책임: 실제 파일을 바꾼다. 규칙 계산은 안 한다.
// (지침: specs/03_출력.md)
// ───────────────────────────────────────────────────────────
const fs = require('fs');
const path = require('path');

const HISTORY = '.rename-history.json';

// 충돌/무변경 항목은 건너뛰고, 안전한 항목만 적용.
// 이름 맞교환(A↔B) 같은 경우를 위해 2단계(임시이름 경유)로 처리.
function apply(folderPath, plan) {
  const changes = (plan || []).filter(
    (p) => !p.conflict && p.newName && p.newName !== p.originalName
  );

  if (changes.length === 0) {
    return { applied: 0, skipped: (plan || []).length, history: null };
  }

  // 1차: 원본 → 임시 이름
  const temps = changes.map((c, i) => {
    const from = path.join(folderPath, c.originalName);
    const tmp = path.join(folderPath, `.tmp_rn_${i}_${process.pid}`);
    fs.renameSync(from, tmp);
    return { tmp, to: c.newName, from: c.originalName };
  });

  // 2차: 임시 → 최종 새 이름
  temps.forEach((t) => fs.renameSync(t.tmp, path.join(folderPath, t.to)));

  // 되돌리기 기록 남기기
  const history = {
    appliedAt: new Date().toISOString(),
    folderPath,
    changes: changes.map((c) => ({ from: c.originalName, to: c.newName })),
  };
  fs.writeFileSync(
    path.join(folderPath, HISTORY),
    JSON.stringify(history, null, 2),
    'utf8'
  );

  return { applied: changes.length, skipped: (plan || []).length - changes.length, history };
}

// 직전 변경을 되돌린다 (to → from)
function undo(folderPath) {
  const histPath = path.join(folderPath, HISTORY);
  if (!fs.existsSync(histPath)) {
    throw new Error('되돌릴 기록이 없습니다.');
  }
  const history = JSON.parse(fs.readFileSync(histPath, 'utf8'));

  const temps = [];
  history.changes.forEach((c, i) => {
    const cur = path.join(folderPath, c.to);
    if (!fs.existsSync(cur)) return; // 이미 사라졌으면 건너뜀
    const tmp = path.join(folderPath, `.tmp_undo_${i}_${process.pid}`);
    fs.renameSync(cur, tmp);
    temps.push({ tmp, to: c.from });
  });
  temps.forEach((t) => fs.renameSync(t.tmp, path.join(folderPath, t.to)));

  fs.unlinkSync(histPath);
  return { restored: temps.length };
}

module.exports = { apply, undo, HISTORY };
