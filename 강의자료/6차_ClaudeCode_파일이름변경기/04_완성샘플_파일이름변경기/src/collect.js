// ───────────────────────────────────────────────────────────
// 1단계 · 수집 (Collect)
// 입력: folderPath (문자열)
// 출력: 파일목록 JSON  → 계약1  { folderPath, totalCount, sortBy, files[] }
// 책임: 폴더를 읽어 '파일 목록'만 만든다. 이름은 절대 바꾸지 않는다.
// (지침: specs/01_수집.md)
// ───────────────────────────────────────────────────────────
const fs = require('fs');
const path = require('path');

// 위험 경로 차단: 드라이브 루트, 시스템 폴더
function isUnsafe(folderPath) {
  if (/^[A-Za-z]:[\\/]?$/.test(folderPath)) return true; // C:\ 같은 루트
  if (folderPath === '/' || folderPath === '') return true;
  return /([A-Za-z]:[\\/])?(Windows|Program Files|System32)/i.test(folderPath)
    && !/test|연습|sample|temp/i.test(folderPath);
}

// 이름을 base + ext 로 분리 ("내 사진.png" → baseName="내 사진", ext=".png")
function splitName(name) {
  const ext = path.extname(name);
  const baseName = ext ? name.slice(0, -ext.length) : name;
  return { baseName, ext };
}

function collect(folderPath, options = {}) {
  const { sortBy = 'name', limit = 500 } = options;

  if (!folderPath || typeof folderPath !== 'string') {
    throw new Error('폴더 경로가 필요합니다.');
  }
  if (isUnsafe(folderPath)) {
    throw new Error('시스템 폴더/드라이브 루트는 대상이 될 수 없습니다.');
  }

  let stat;
  try {
    stat = fs.statSync(folderPath);
  } catch (e) {
    throw new Error('폴더를 찾을 수 없습니다. 경로를 확인하세요.');
  }
  if (!stat.isDirectory()) throw new Error('폴더가 아닙니다(파일 경로인 것 같아요).');

  // 하위 폴더는 제외하고, 바로 아래 '파일'만. 기록 파일도 제외.
  let names = fs.readdirSync(folderPath, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .filter((n) => n !== '.rename-history.json');

  if (sortBy === 'name') names.sort((a, b) => a.localeCompare(b, 'ko'));

  if (names.length > limit) {
    throw new Error(`파일이 너무 많습니다(${names.length}개). 최대 ${limit}개까지 지원합니다.`);
  }

  const files = names.map((name, i) => {
    const { baseName, ext } = splitName(name);
    return { originalName: name, baseName, ext, index: i + 1 };
  });

  return { folderPath, totalCount: files.length, sortBy, files };
}

module.exports = { collect, isUnsafe, splitName };
