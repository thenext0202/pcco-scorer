"use client";

import { useState, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ReverseScoreResultView from "@/components/ReverseScoreResult";
import type { ReverseScoreResult } from "@/types/score";

const STORAGE_KEY = "reverse-prompt-draft";
const MAX_LENGTH = 4000;
const MIN_LENGTH = 50;

interface ReverseScorerProps {
  onSubmit?: (result: ReverseScoreResult, prompt: string) => void;
  submitButtonText?: string;
  enableAutoSave?: boolean;
  hideRetryButton?: boolean;
}

export default function ReverseScorer({
  onSubmit,
  submitButtonText = "채점하기",
  enableAutoSave = true,
  hideRetryButton = false,
}: ReverseScorerProps) {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ReverseScoreResult | null>(null);
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
      const response = await fetch("/api/score/reverse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "채점에 실패했습니다.");
      }

      const scoreResult: ReverseScoreResult = await response.json();
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
                직접 써본 프로그램(IG 아카이버)을 통째로 재현하는{" "}
                <span className="font-semibold">한 방 프롬프트</span>를
                입력하세요.
                <br />
                <span className="text-slate-500">
                  기준은 하나 — 이 프롬프트만 받은 AI가, 그 프로그램을 그대로
                  만들 수 있는가?
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
                placeholder={`관찰한 것을 전부 담으세요 — 화면에서 본 것, 결과물이 남는 모습, 이상하게 써봤을 때의 동작, "왜 이렇게 만들었을까" 싶었던 것까지.\n\n프롬프트에 없는 것은 만들어지지 않습니다.`}
                className="min-h-[320px] text-base resize-none"
                maxLength={MAX_LENGTH}
              />
              <div className="flex items-center justify-between text-sm">
                <span
                  className={`${
                    charCount < MIN_LENGTH
                      ? "text-rose-500"
                      : charCount > 3600
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
              className="w-full h-12 text-lg font-semibold bg-teal-600 hover:bg-teal-700"
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
          <ReverseScoreResultView result={result} />

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
