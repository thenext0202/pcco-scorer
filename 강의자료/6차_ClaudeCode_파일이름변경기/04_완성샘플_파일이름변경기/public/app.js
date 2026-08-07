// 화면 ↔ 서버 API 연결.  (레이어 호출: scan → plan → apply / undo)
const $ = (id) => document.getElementById(id);
let lastPlan = null;        // 마지막 변경계획 (적용에 사용)
let lastFolder = '';

function setStatus(msg, kind) {
  const el = $('status');
  el.textContent = msg;
  el.className = 'status' + (kind ? ' ' + kind : '');
}

async function api(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || '요청 실패');
  return data;
}

// 현재 화면의 규칙을 객체로
function readRule() {
  return {
    prefix: $('prefix').value,
    suffix: $('suffix').value,
    find: $('find').value,
    replace: $('replace').value,
    space: $('space').value,
    lowercase: $('lowercase').checked,
    numbering: { enabled: $('numEnabled').checked, digits: Number($('numDigits').value) || 4, start: 1 },
  };
}

function renderTable(plan) {
  const tbody = $('table').querySelector('tbody');
  tbody.innerHTML = '';
  plan.forEach((p, i) => {
    const tr = document.createElement('tr');
    if (p.conflict) tr.className = 'conflict';
    tr.innerHTML =
      `<td>${i + 1}</td><td>${p.originalName}</td><td>→</td><td class="new">${p.newName}</td>`;
    tbody.appendChild(tr);
  });
  $('table').hidden = false;
}

// 미리보기: 수집 → 변환계획 (실제 변경 없음)
$('previewBtn').addEventListener('click', async () => {
  try {
    lastFolder = $('folderPath').value.trim();
    if (!lastFolder) return setStatus('폴더 경로를 입력하세요.', 'err');
    setStatus('읽는 중...');
    const scanned = await api('/api/scan', { folderPath: lastFolder });
    if (scanned.totalCount === 0) {
      $('applyBtn').disabled = true;
      return setStatus('폴더에 파일이 없습니다.', 'err');
    }
    const planned = await api('/api/plan', { files: scanned.files, rule: readRule() });
    lastPlan = planned.plan;
    renderTable(planned.plan);
    const conflicts = planned.conflictCount;
    if (conflicts > 0) {
      $('applyBtn').disabled = true;
      setStatus(`미리보기 ${planned.plan.length}개 · 충돌 ${conflicts}개 → 규칙을 고쳐주세요.`, 'err');
    } else {
      $('applyBtn').disabled = false;
      setStatus(`미리보기 ${planned.plan.length}개 · 충돌 없음. '적용'을 누르면 실제로 바뀝니다.`, 'ok');
    }
  } catch (e) {
    $('applyBtn').disabled = true;
    setStatus('오류: ' + e.message, 'err');
  }
});

// 적용: 제자리 변경
$('applyBtn').addEventListener('click', async () => {
  if (!lastPlan) return;
  if (!confirm('실제로 파일 이름을 바꿉니다. 진행할까요?')) return;
  try {
    setStatus('적용 중...');
    const r = await api('/api/apply', { folderPath: lastFolder, plan: lastPlan });
    $('applyBtn').disabled = true;
    setStatus(`${r.applied}개 변경 완료. 잘못됐으면 '되돌리기'를 누르세요.`, 'ok');
  } catch (e) {
    setStatus('오류: ' + e.message, 'err');
  }
});

// 되돌리기: 직전 변경 복원
$('undoBtn').addEventListener('click', async () => {
  try {
    const folder = $('folderPath').value.trim() || lastFolder;
    if (!folder) return setStatus('폴더 경로를 입력하세요.', 'err');
    setStatus('되돌리는 중...');
    const r = await api('/api/undo', { folderPath: folder });
    $('table').hidden = true;
    setStatus(`${r.restored}개 되돌렸습니다.`, 'ok');
  } catch (e) {
    setStatus('오류: ' + e.message, 'err');
  }
});
