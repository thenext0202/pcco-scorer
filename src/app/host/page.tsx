"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { createSession } from "@/lib/sessionApi";

export default function HostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [hostName, setHostName] = useState("");
  const [mode, setMode] = useState<"prompt" | "instruction">("prompt");
  const [isCreating, setIsCreating] = useState(false);
  const [sessionCode, setSessionCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreateSession = async () => {
    if (!title.trim()) {
      setError("세션 제목을 입력해주세요.");
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const { code } = await createSession(
        title.trim(),
        hostName.trim(),
        mode
      );
      setSessionCode(code);
      toast.success("세션이 생성되었습니다!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "세션 생성에 실패했습니다."
      );
    } finally {
      setIsCreating(false);
    }
  };

  const participantUrl =
    typeof window !== "undefined" && sessionCode
      ? `${window.location.origin}/play/${sessionCode}`
      : "";

  const handleCopyUrl = () => {
    if (participantUrl) {
      navigator.clipboard.writeText(participantUrl);
      toast.success("URL이 복사되었습니다!");
    }
  };

  const handleOpenBoard = () => {
    if (sessionCode) {
      window.open(`/play/${sessionCode}/board`, "_blank");
    }
  };

  if (sessionCode) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              세션이 생성되었습니다! 🎉
            </h1>
            <p className="text-slate-600">참가자들에게 코드를 공유하세요</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>세션 코드</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="inline-block bg-blue-50 px-12 py-6 rounded-lg border-2 border-blue-300">
                  <p className="text-6xl font-bold tracking-wider text-blue-600 font-mono">
                    {sessionCode}
                  </p>
                </div>
                <p className="text-sm text-slate-600 mt-4">
                  참가자들이 이 코드로 접속합니다
                </p>
              </div>

              <div className="border-t pt-6">
                <p className="text-sm font-medium text-slate-700 mb-3">
                  QR 코드 (스캔하여 참가)
                </p>
                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-lg border">
                    <QRCodeSVG value={participantUrl} size={200} />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 space-y-3">
                <p className="text-sm font-medium text-slate-700">
                  참가 링크
                </p>
                <div className="flex gap-2">
                  <Input value={participantUrl} readOnly className="font-mono" />
                  <Button onClick={handleCopyUrl} variant="outline">
                    복사
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleOpenBoard}
              className="flex-1"
              size="lg"
            >
              📊 리더보드 화면 열기
            </Button>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full" size="lg">
                홈으로 돌아가기
              </Button>
            </Link>
          </div>

          <Alert>
            <AlertDescription>
              💡 이 세션은 24시간 후 자동으로 만료됩니다.
            </AlertDescription>
          </Alert>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            새 세션 만들기
          </h1>
          <p className="text-slate-600">
            강의용 리더보드 세션을 생성합니다
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                세션 제목 <span className="text-rose-500">*</span>
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: AI 프롬프트 실습 - 2026년 4월"
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                강사 이름 (선택)
              </label>
              <Input
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                placeholder="예: 정금구"
                maxLength={50}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                채점 모드 <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMode("prompt")}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    mode === "prompt"
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="font-semibold">🎯 프롬프트 채점</div>
                  <div className="text-xs text-slate-500 mt-1">
                    1차 강의 · R-PCCO 5요소
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setMode("instruction")}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    mode === "instruction"
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="font-semibold">📘 지침 채점</div>
                  <div className="text-xs text-slate-500 mt-1">
                    2차 강의 · I-MRKO 5요소
                  </div>
                </button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleCreateSession}
              disabled={isCreating || !title.trim()}
              className="w-full"
              size="lg"
            >
              {isCreating ? "생성 중..." : "세션 생성"}
            </Button>
          </CardContent>
        </Card>

        <Link href="/">
          <Button variant="ghost" className="w-full">
            ← 돌아가기
          </Button>
        </Link>
      </div>
    </main>
  );
}
