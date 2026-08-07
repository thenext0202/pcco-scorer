// ───────────────────────────────────────────────────────────
// [오] 서비스워커 — 앱 파일을 캐시해 인터넷 없이도 열리게
// 코드를 바꾸면 아래 버전(v2)을 v3, v4...로 올려 캐시를 갱신한다.
// ───────────────────────────────────────────────────────────
const CACHE = "todo-pwa-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./store.js",
  "./actions.js",
  "./render.js",
  "./app.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
