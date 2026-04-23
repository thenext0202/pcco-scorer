"use client";

import { useEffect, useState } from "react";
import UpdateNotification from "./UpdateNotification";

export default function ServiceWorkerRegister() {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null
  );
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);

  useEffect(() => {
    // 프로덕션 환경에서만 서비스 워커 등록
    if (
      process.env.NODE_ENV === "production" &&
      typeof window !== "undefined" &&
      "serviceWorker" in navigator
    ) {
      const registerServiceWorker = () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("Service Worker registered:", registration.scope);

            // 업데이트 감지
            registration.addEventListener("updatefound", () => {
              const newWorker = registration.installing;
              if (!newWorker) return;

              newWorker.addEventListener("statechange", () => {
                if (
                  newWorker.state === "installed" &&
                  navigator.serviceWorker.controller
                ) {
                  // 새 버전이 설치되었고, 기존 버전이 실행 중
                  console.log("New version available!");
                  setWaitingWorker(newWorker);
                  setShowUpdateNotification(true);
                }
              });
            });

            // 주기적으로 업데이트 확인 (1시간마다)
            setInterval(
              () => {
                registration.update().catch((error) => {
                  console.error("Service Worker update check failed:", error);
                });
              },
              60 * 60 * 1000
            ); // 1시간

            // 페이지 포커스 시에도 업데이트 확인
            document.addEventListener("visibilitychange", () => {
              if (!document.hidden) {
                registration.update().catch((error) => {
                  console.error("Service Worker update check failed:", error);
                });
              }
            });
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error);
          });
      };

      // 페이지 로드 완료 후 등록
      if (document.readyState === "complete") {
        registerServiceWorker();
      } else {
        window.addEventListener("load", registerServiceWorker);
      }

      // Service Worker 제어권 변경 감지 (Safari 호환성)
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        // 새 Service Worker가 활성화됨 - 페이지 새로고침
        window.location.reload();
      });
    }
  }, []);

  const handleUpdate = () => {
    if (!waitingWorker) return;

    // 새 Service Worker에게 skipWaiting 메시지 전송
    waitingWorker.postMessage({ type: "SKIP_WAITING" });
    setShowUpdateNotification(false);
  };

  return (
    <>
      {showUpdateNotification && <UpdateNotification onUpdate={handleUpdate} />}
    </>
  );
}
