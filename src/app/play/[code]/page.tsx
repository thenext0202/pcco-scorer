"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import PromptScorer from "@/components/PromptScorer";
import { getSessionByCode, submitScore } from "@/lib/sessionApi";
import type { Session } from "@/types/session";
import type { ScoreResult } from "@/types/score";

const NICKNAME_STORAGE_KEY = "r-pcco-nickname";

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

  const [lastResult, setLastResult] = useState<ScoreResult | null>(null);
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

  // 닉네임 복원
  useEffect(() => {
    const saved = localStorage.getItem(NICKNAME_STORAGE_KEY);
    if (saved) {
      setNickname(saved);
      setHasNickname(true);
    }
  }, []);

  const handleSetNickname = () => {
    if (nickname.trim().length >= 2) {
      localStorage.setItem(NICKNAME_STORAGE_KEY, nickname.trim());
      setHasNickname(true);
      toast.success(`환영합니다, ${nickname.trim()}님!`);
    }
  };

  const handleScoreComplete = (result: ScoreResult, prompt: string) => {
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
            <span>참가자: {nickname}</span>
            <span>•</span>
            <span>코드: {code}</span>
          </div>
        </div>

        {/* 채점 UI */}
        <PromptScorer
          onSubmit={handleScoreComplete}
          submitButtonText="채점하기"
          enableAutoSave={false}
        />

        {/* 리더보드 제출 */}
        {lastResult && !hasSubmitted && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6 text-center space-y-3">
              <p className="font-medium text-slate-800">
                이 점수를 리더보드에 올리시겠어요?
              </p>
              <p className="text-sm text-slate-600">
                총점: {lastResult.total_score}점 / 등급: {lastResult.grade}
              </p>
              <Button
                onClick={handleSubmitToLeaderboard}
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "제출 중..." : "리더보드에 등록하기"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* 제출 완료 */}
        {hasSubmitted && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6 text-center space-y-3">
              <p className="font-medium text-slate-800">
                ✅ 리더보드에 등록되었습니다!
              </p>
              <Link href={`/play/${code}/board`}>
                <Button variant="outline" className="w-full">
                  리더보드 보기
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* 링크 */}
        <div className="flex gap-3 pt-4">
          <Link href={`/play/${code}/board`} className="flex-1">
            <Button variant="outline" className="w-full">
              📊 리더보드 보기
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost">홈</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
