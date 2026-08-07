// 자체 테스트 — 실행: node test.js
// 임시 폴더를 만들어 수집→변환→검증→적용→되돌리기 전 과정을 자동 점검한다.
const fs = require('fs');
const path = require('path');
const os = require('os');
const { collect } = require('./src/collect');
const { transform } = require('./src/transform');
const { validate } = require('./src/validate');
const { apply, undo } = require('./src/output');

let pass = 0, fail = 0;
function check(name, cond) {
  if (cond) { pass++; console.log('  ✅', name); }
  else { fail++; console.log('  ❌', name); }
}

// 임시 폴더 + 더미 파일
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'renamer-test-'));
['IMG_1.JPG', 'IMG_2.JPG', '내 사진.png'].forEach((n) => fs.writeFileSync(path.join(dir, n), ''));
fs.mkdirSync(path.join(dir, '하위폴더'));

console.log('\n[수집]');
const scanned = collect(dir);
check('파일 3개 수집(하위폴더 제외)', scanned.totalCount === 3);

console.log('[변환 + 검증] 접두사 여행_ + 순번 3자리');
let p = transform(scanned.files, { prefix: '여행_', numbering: { enabled: true, digits: 3 } });
validate(p);
check('충돌 0', p.conflictCount === 0);
check('첫 새 이름 = 여행_001.png', p.plan[0].newName === '여행_001.png');

console.log('[검증] 일부러 중복 만들기');
let bad = { plan: [
  { originalName: 'a', newName: 'x.txt', conflict: false },
  { originalName: 'b', newName: 'x.txt', conflict: false },
] };
validate(bad);
check('중복 2건 충돌 감지', bad.conflictCount === 2);

console.log('[적용]');
const ar = apply(dir, p.plan);
check('3개 적용됨', ar.applied === 3);
const after = fs.readdirSync(dir).filter((n) => n !== '.rename-history.json' && n !== '하위폴더');
check('실제로 새 이름 존재', after.includes('여행_001.png'));

console.log('[되돌리기]');
const ur = undo(dir);
check('3개 복원됨', ur.restored === 3);
const restored = fs.readdirSync(dir);
check('원래 이름 복원', restored.includes('내 사진.png') && restored.includes('IMG_1.JPG'));

console.log('[안전] 시스템 경로 거부');
let blocked = false;
try { collect('C:/Windows'); } catch (e) { blocked = true; }
check('시스템 폴더 거부', blocked);

// 정리
fs.rmSync(dir, { recursive: true, force: true });
console.log(`\n결과: ${pass} 통과, ${fail} 실패`);
process.exit(fail ? 1 : 0);
