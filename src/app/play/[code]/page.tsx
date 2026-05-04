"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import PromptScorer from "@/components/PromptScorer";
import InstructionScorer from "@/components/InstructionScorer";
import ImageScorer from "@/components/ImageScorer";
import { getSessionByCode, submitScore } from "@/lib/sessionApi";
import type { Session } from "@/types/session";
import type { AnyScoreResult } from "@/types/score";

export default function PlayPage() {
  const params = useParams();
  const code = params?.code as string;

  const [session, setSession] = useState<Session | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [nickname, setNickname] = useState("");
  const [hasNickname, setHasNickname] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [lastResult, setLastResult] = useState<AnyScoreResult | null>(null);
  const [lastPrompt, setLastPrompt] = useState<string>("");

  // 세션 조회
  useEffect(() => {
    const fetchSession = async () => {
      if (!code) return;

      try {
        const result = await getSessionByCode(code);
        if (!result) {
          setError("세션을 찾을 수 없습니다. 코드를 확인해주세요.");
          return;
        }

        setSession(result.session);
        setIsExpired(result.isExpired);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "세션 조회에 실패했습니다."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [code]);

  const handleSetNickname = () => {
    if (nickname.trim().length >= 2) {
      setHasNickname(true);
      toast.success(`환영합니다, ${nickname.trim()}님!`);
    }
  };

  const handleScoreComplete = (result: AnyScoreResult, prompt: string) => {
    setLastResult(result);
    setLastPrompt(prompt);
  };

  const handleSubmitToLeaderboard = async () => {
    if (!session || !lastResult || !lastPrompt) return;

    setIsSubmitting(true);
    try {
      await submitScore(session.id, nickname, lastPrompt, lastResult);
      setHasSubmitted(true);
      toast.success("리더보드에 등록되었습니다! 🎉");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "제출에 실패했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4 flex items-center justify-center">
        <p className="text-slate-600">세션 로딩 중...</p>
      </main>
    );
  }

  if (error || !session) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-6 mt-20">
          <Alert variant="destructive">
            <AlertDescription>{error || "세션을 찾을 수 없습니다."}</AlertDescription>
          </Alert>
          <Link href="/">
            <Button variant="outline" className="w-full">
              홈으로 돌아가기
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  if (isExpired) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-6 mt-20">
          <Alert>
            <AlertDescription>
              이 세션은 만료되었습니다. 강사에게 새 세션을 요청해주세요.
            </AlertDescription>
          </Alert>
          <Link href="/">
            <Button variant="outline" className="w-full">
              홈으로 돌아가기
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  if (!hasNickname) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-6 mt-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {session.title}
            </h1>
            {session.host_name && (
              <p className="text-slate-600">강사: {session.host_name}</p>
            )}
          </div>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  닉네임을 입력하세요
                </label>
                <p className="text-sm text-slate-500">
                  리더보드에 표시될 이름입니다
                </p>
                <Input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="예: 김철수"
                  maxLength={30}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSetNickname();
                    }
                  }}
                />
              </div>

              <Button
                onClick={handleSetNickname}
                disabled={nickname.trim().length < 2}
                className="w-full"
                size="lg"
              >
                시작하기
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* 세션 헤더 */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">{session.title}</h1>
          {session.host_name && (
            <p className="text-slate-600">강사: {session.host_name}</p>
          )}
          <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
            <Badge variant="outline">
              {session.mode === "instruction"
                ? "📘 지침 채점"
                : session.mode === "image"
                ? "🎨 이미지 프롬프트 채점"
                : "🎯 프롬프트 채점"}
            </Badge>
            <span>•</span>
            <span>참가자: {nickname}</span>
            <span>•</span>
            <span>코드: {code}</span>
          </div>
        </div>

        {/* 채점 UI - 세션 모드에 따라 자동 분기 */}
        {session.mode === "instruction" && (
          <InstructionScorer
            onSubmit={handleScoreComplete}
            submitButtonText="채점하기"
            enableAutoSave={false}
            hideRetryButton
          />
        )}
        {session.mode === "image" && (
          <ImageScorer
            onSubmit={handleScoreComplete}
            submitButtonText="채점하기"
            enableAutoSave={false}
            hideRetryButton
          />
        )}
        {session.mode === "prompt" && (
          <PromptScorer
            onSubmit={handleScoreComplete}
            submitButtonText="채점하기"
            enableAutoSave={false}
            hideRetryButton
          />
        )}

        {/* 제출 완료 */}
        {hasSubmitted && (
          <Card className="border-blue-300 bg-blue-50">
            <CardContent className="pt-6 text-center space-y-3">
              <p className="font-semibold text-slate-900">
                ✅ 리더보드에 등록되었습니다!
              </p>
              <Link href={`/play/${code}/board`} className="block">
                <Button
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  📊 리더보드 보기
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* 링크 — 제출 전에만 "리더보드 보기" 별도 노출, 제출 후엔 위 카드 버튼만 사용 */}
        <div className="flex gap-3 pt-4 pb-32 sm:pb-4">
          {!hasSubmitted && (
            <Link href={`/play/${code}/board`} className="flex-1">
              <Button variant="outline" className="w-full text-slate-700">
                📊 리더보드 보기
              </Button>
            </Link>
          )}
          <Link href="/" className={hasSubmitted ? "flex-1" : ""}>
            <Button variant="ghost" className={hasSubmitted ? "w-full" : ""}>
              홈
            </Button>
          </Link>
        </div>
      </div>

      {/* Sticky 리더보드 제출 CTA — 채점 완료 후 등록 전까지 화면 하단 고정 */}
      {lastResult && !hasSubmitted && (
        <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 pointer-events-none">
          <div className="max-w-2xl mx-auto pointer-events-auto">
            <Card className="border-2 border-green-400 bg-green-50 shadow-2xl shadow-green-200/50">
              <CardContent className="pt-4 pb-4 px-4 sm:px-6 space-y-2">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-semibold text-slate-800">
                      🎯 채점 완료! 리더보드에 등록하세요
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600">
                      총점 {lastResult.total_score}점 · {lastResult.grade}등급
                    </p>
                  </div>
                  <Button
                    onClick={handleSubmitToLeaderboard}
                    disabled={isSubmitting}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold shadow-md whitespace-nowrap"
                  >
                    {isSubmitting ? "제출 중..." : "리더보드에 등록하기 →"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
