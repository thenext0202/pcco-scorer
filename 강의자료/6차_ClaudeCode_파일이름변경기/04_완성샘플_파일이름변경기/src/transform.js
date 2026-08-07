// ───────────────────────────────────────────────────────────
// 2단계 · 변환계획 (Transform)
// 입력: 파일목록 JSON(files[]) + 규칙(rule)   ← 계약1
// 출력: 변경계획 JSON  → 계약2  { rule, conflictCount, plan[] }
// 책임: '새 이름'을 계산만 한다. 실제로 바꾸지 않는다.
// (지침: specs/02_변환.md)
// ───────────────────────────────────────────────────────────

function pad(num, digits) {
  return String(num).padStart(digits, '0');
}

// 규칙을 사람이 읽을 설명으로
function describeRule(rule) {
  const parts = [];
  if (rule.numbering && rule.numbering.enabled) {
    const pre = rule.prefix ? `${rule.prefix} + ` : '';
    parts.push(`${pre}순번 ${rule.numbering.digits || 4}자리`);
  } else {
    if (rule.find) parts.push(`'${rule.find}'→'${rule.replace || ''}'`);
    if (rule.space === 'underscore') parts.push('공백→_');
    if (rule.space === 'remove') parts.push('공백 제거');
    if (rule.prefix) parts.push(`접두사 '${rule.prefix}'`);
    if (rule.suffix) parts.push(`접미사 '${rule.suffix}'`);
  }
  if (rule.lowercase) parts.push('소문자화');
  return parts.length ? parts.join(', ') : '변경 없음';
}

function newNameFor(file, rule) {
  let base = file.baseName;
  let ext = file.ext;

  if (rule.numbering && rule.numbering.enabled) {
    // 순번 모드: 원래 이름을 버리고 (접두사) + 순번 (+ 접미사)
    const digits = rule.numbering.digits || 4;
    const start = rule.numbering.start || 1;
    const seq = pad(start + (file.index - 1), digits);
    base = (rule.prefix || '') + seq + (rule.suffix || '');
  } else {
    // 일반 모드: 원래 이름에 규칙을 순서대로 적용
    if (rule.find) base = base.split(rule.find).join(rule.replace || '');
    if (rule.space === 'underscore') base = base.replace(/\s+/g, '_');
    else if (rule.space === 'remove') base = base.replace(/\s+/g, '');
    if (rule.prefix) base = rule.prefix + base;
    if (rule.suffix) base = base + rule.suffix;
  }

  if (rule.lowercase) {
    base = base.toLowerCase();
    ext = ext.toLowerCase();
  }
  return base + ext;
}

function transform(files, rule) {
  rule = rule || {};
  const plan = files.map((f) => ({
    originalName: f.originalName,
    newName: newNameFor(f, rule),
    conflict: false, // 검증 단계(validate.js)에서 채움
  }));
  return { rule: describeRule(rule), conflictCount: 0, plan };
}

module.exports = { transform, newNameFor, describeRule };
