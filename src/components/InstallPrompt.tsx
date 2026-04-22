"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const DISMISS_KEY = "r-pcco-install-dismissed";
const VISIT_COUNT_KEY = "r-pcco-visit-count";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // 이미 dismiss했거나 설치됨 확인
    if (localStorage.getItem(DISMISS_KEY) === "true") {
      return;
    }

    // 이미 설치된 경우
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true
    ) {
      return;
    }

    // beforeinstallprompt 이벤트 캐치
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // 방문 횟수 카운트
    const visitCount = parseInt(
      localStorage.getItem(VISIT_COUNT_KEY) || "0",
      10
    );
    const newVisitCount = visitCount + 1;
    localStorage.setItem(VISIT_COUNT_KEY, newVisitCount.toString());

    // 3번째 방문 또는 첫 방문 후 30초 후 표시
    if (newVisitCount >= 3) {
      setShowPrompt(true);
    } else if (newVisitCount === 1) {
      setTimeout(() => setShowPrompt(true), 30000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, "true");
    setShowPrompt(false);
  };

  if (!showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom-4">
      <Card className="border-blue-200 bg-blue-50 shadow-lg">
        <CardContent className="pt-4 space-y-3">
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">
              📱 앱으로 설치하기
            </h3>
            <p className="text-sm text-slate-600">
              R-PCCO Scorer를 홈 화면에 추가하고 언제든 빠르게 접속하세요!
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleInstall} className="flex-1" size="sm">
              설치
            </Button>
            <Button
              onClick={handleDismiss}
              variant="ghost"
              size="sm"
              className="flex-1"
            >
              나중에
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
