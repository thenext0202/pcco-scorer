"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

interface UpdateNotificationProps {
  onUpdate: () => void;
}

export default function UpdateNotification({
  onUpdate,
}: UpdateNotificationProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 컴포넌트 마운트 시 표시
    setShow(true);
  }, []);

  const handleUpdate = () => {
    setShow(false);
    onUpdate();
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 max-w-md">
        <RefreshCw className="w-5 h-5 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-semibold text-sm">새로운 버전이 있습니다</p>
          <p className="text-xs text-blue-100 mt-0.5">
            업데이트하여 최신 기능을 사용하세요
          </p>
        </div>
        <button
          onClick={handleUpdate}
          className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold text-sm hover:bg-blue-50 transition-colors flex-shrink-0"
        >
          새로고침
        </button>
      </div>
    </div>
  );
}
