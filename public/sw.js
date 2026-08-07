// R-PCCO Scorer Service Worker
// 수동 구현, 최소 기능만 포함

// 빌드 시마다 자동으로 변경되는 버전 (타임스탬프 기반)
const BUILD_VERSION = "1780561314812";
const CACHE_NAME = `pcco-scorer-${BUILD_VERSION}`;
const OFFLINE_URL = "/offline.html";

// 핵심 정적 리소스 (설치 시 캐시)
const STATIC_RESOURCES = [
  "/",
  "/offline.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/maskable-192.png",
  "/icons/maskable-512.png",
];

// 메시지 이벤트: 업데이트 처리
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// 설치 이벤트: 정적 리소스 캐시
self.addEventListener("install", (event) => {
  console.log(`Service Worker installing: ${CACHE_NAME}`);
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_RESOURCES);
    })
  );
  // 자동 활성화는 하지 않고, 사용자 확인 후 skipWaiting
});

// 활성화 이벤트: 오래된 캐시 정리
self.addEventListener("activate", (event) => {
  console.log(`Service Worker activating: ${CACHE_NAME}`);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => {
            console.log(`Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          })
      );
    })
  );
  // 모든 클라이언트 즉시 제어
  return self.clients.claim();
});

// Fetch 이벤트: 요청 전략
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API 요청: 항상 네트워크 (캐시 금지)
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(fetch(request));
    return;
  }

  // 정적 자산: Cache First
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/")
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((response) => {
          // 성공한 응답만 캐시
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      })
    );
    return;
  }

  // 그 외 페이지: Network First, 실패 시 오프라인 페이지
  event.respondWith(
    fetch(request)
      .then((response) => {
        // 성공한 응답 캐시
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // 네트워크 실패 시 캐시 확인
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // 페이지 요청이면 오프라인 페이지 반환
          if (request.mode === "navigate") {
            return caches.match(OFFLINE_URL);
          }
          // 그 외에는 그냥 실패
          return new Response("Network error", {
            status: 408,
            headers: { "Content-Type": "text/plain" },
          });
        });
      })
  );
});
