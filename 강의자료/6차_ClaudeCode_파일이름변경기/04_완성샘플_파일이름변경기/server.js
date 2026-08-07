// ───────────────────────────────────────────────────────────
// 로컬 서버 (Node 내장 http만 사용 — 추가 설치 0)
// - public/ 정적 파일 서빙
// - API: /api/scan · /api/plan · /api/apply · /api/undo
// 실행:  node server.js  → http://localhost:3000
// ───────────────────────────────────────────────────────────
const http = require('http');
const fs = require('fs');
const path = require('path');

const { collect } = require('./src/collect');
const { transform } = require('./src/transform');
const { validate } = require('./src/validate');
const { apply, undo } = require('./src/output');

const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, 'public');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
};

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (c) => { data += c; });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch (e) { reject(new Error('잘못된 요청 형식(JSON)')); }
    });
    req.on('error', reject);
  });
}

// 정적 파일
function serveStatic(req, res) {
  let urlPath = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(PUBLIC, path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, ''));
  if (!filePath.startsWith(PUBLIC)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(filePath, (err, content) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
    res.end(content);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'POST' && req.url.startsWith('/api/')) {
      const body = await readBody(req);

      if (req.url === '/api/scan') {
        const result = collect(body.folderPath);          // 1단계
        return sendJson(res, 200, result);
      }
      if (req.url === '/api/plan') {
        const planned = transform(body.files, body.rule);  // 2단계
        validate(planned);                                 // 2.5단계
        return sendJson(res, 200, planned);
      }
      if (req.url === '/api/apply') {
        const result = apply(body.folderPath, body.plan);  // 3단계
        return sendJson(res, 200, result);
      }
      if (req.url === '/api/undo') {
        const result = undo(body.folderPath);
        return sendJson(res, 200, result);
      }
      return sendJson(res, 404, { error: '알 수 없는 API' });
    }
    return serveStatic(req, res);
  } catch (e) {
    sendJson(res, 400, { error: e.message });
  }
});

server.listen(PORT, () => {
  console.log(`파일 이름 변경기 → http://localhost:${PORT}`);
});
