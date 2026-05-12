"use client";

import { useState, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import VibeScoreResultView from "@/components/VibeScoreResult";
import type { VibeScoreResult } from "@/types/score";

const STORAGE_KEY = "vibe-coding-prompt-draft";
const MAX_LENGTH = 1500;
const MIN_LENGTH = 20;

interface VibeScorerProps {
  onSubmit?: (result: VibeScoreResult, prompt: string) => void;
  submitButtonText?: string;
  enableAutoSave?: boolean;
  hideRetryButton?: boolean;
}

export default function VibeScorer({
  onSubmit,
  submitButtonText = "채점하기",
  enableAutoSave = true,
  hideRetryButton = false,
}: VibeScorerProps) {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VibeScoreResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (enableAutoSave) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setPrompt(saved);
      }
    }
  }, [enableAutoSave]);

  useEffect(() => {
    if (!enableAutoSave) return;

    const timer = setTimeout(() => {
      if (prompt) {
        localStorage.setItem(STORAGE_KEY, prompt);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [prompt, enableAutoSave]);

  const handleScore = async () => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/score/vibe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "채점에 실패했습니다.");
      }

      const scoreResult: VibeScoreResult = await response.json();
      setResult(scoreResult);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

      if (onSubmit) {
        onSubmit(scoreResult, prompt);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt("");
    if (enableAutoSave) {
      localStorage.removeItem(STORAGE_KEY);
    }
    setResult(null);
    setError(null);
  };

  const handleRetry = () => {
    setResult(null);
    setError(null);
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isValid = prompt.trim().length >= MIN_LENGTH;
  const charCount = prompt.length;

  return (
    <div className="space-y-8">
      {/* 입력 영역 */}
      <div ref={inputRef}>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-1">
              <p className="text-sm text-slate-600">
                Claude Artifacts·Code에 던질 묘사형 프롬프트를 입력하세요.
                <br />
                <span className="text-slate-500">
                  역할 · 목적 · 맥락(디바이스!) · 제약 · 출력 5요소를 채우는 게 핵심.
                </span>
              </p>
            </div>
            <div className="space-y-2">
              <Textarea
                value={prompt}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_LENGTH) {
                    setPrompt(e.target.value);
                  }
                }}
                placeholder={`예시 (회식운 앱):\n너는 모바일 앱 UI 디자이너야. 회식 자리에서 직장인이 분위기 풀려고 핸드폰으로 잠깐 보는 앱을 만들거야. 사용자는 30~40대 직장인, 5초 안에 결과를 봐야 해. 버튼 하나 누르면 오늘의 회식운이 나오고, 다시뽑기 가능하게. 너무 진지하지 않고 살짝 유머 있게. 한 페이지 HTML로 만들어줘.`}
                className="min-h-[240px] text-base resize-none"
                maxLength={MAX_LENGTH}
              />
              <div className="flex items-center justify-between text-sm">
                <span
                  className={`${
                    charCount < MIN_LENGTH
                      ? "text-rose-500"
                      : charCount > 1200
                      ? "text-orange-500"
                      : "text-slate-500"
                  }`}
                >
                  {charCount < MIN_LENGTH &&
                    `최소 ${MIN_LENGTH}자 이상 입력하세요 • `}
                  {charCount}/{MAX_LENGTH}자
                </span>
                {prompt && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    지우기
                  </Button>
                )}
              </div>
            </div>

            <Button
              onClick={handleScore}
              disabled={!isValid || isLoading}
              className="w-full h-12 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700"
              size="lg"
            >
              {isLoading ? "채점 중..." : submitButtonText}
            </Button>

            {!isValid && prompt.length > 0 && (
              <p className="text-sm text-rose-500 text-center">
                프롬프트가 너무 짧습니다. 최소 {MIN_LENGTH}자 이상 입력해주세요.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 에러 표시 */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* 로딩 상태 */}
      {isLoading && (
        <div ref={resultRef} className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      )}

      {/* 결과 표시 */}
      {result && !isLoading && (
        <div ref={resultRef} className="space-y-6">
          <VibeScoreResultView result={result} />

          {!hideRetryButton && (
            <div className="text-center pt-4">
              <Button
                variant="outline"
                size="lg"
                onClick={handleRetry}
                className="w-full sm:w-auto"
              >
                다른 프롬프트 채점하기
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
