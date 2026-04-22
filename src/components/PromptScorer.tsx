"use client";

import { useState, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ScoreResult from "@/components/ScoreResult";
import type { ScoreResult as ScoreResultType } from "@/types/score";

const STORAGE_KEY = "r-pcco-prompt-draft";
const MAX_LENGTH = 1000;
const MIN_LENGTH = 30;

interface PromptScorerProps {
  /**
   * 채점 완료 후 콜백 (세션 모드에서 사용)
   * @param result 채점 결과
   * @param prompt 입력한 프롬프트
   */
  onSubmit?: (result: ScoreResultType, prompt: string) => void;

  /**
   * 제출 버튼 텍스트 (기본값: "채점하기")
   */
  submitButtonText?: string;

  /**
   * localStorage 자동 저장 활성화 (기본값: true)
   */
  enableAutoSave?: boolean;
}

export default function PromptScorer({
  onSubmit,
  submitButtonText = "채점하기",
  enableAutoSave = true,
}: PromptScorerProps) {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScoreResultType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  // localStorage에서 입력값 복원
  useEffect(() => {
    if (enableAutoSave) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setPrompt(saved);
      }
    }
  }, [enableAutoSave]);

  // 입력값 자동 저장 (500ms debounce)
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
      // 실제 API 호출
      const response = await fetch("/api/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "채점에 실패했습니다.");
      }

      const scoreResult: ScoreResultType = await response.json();
      setResult(scoreResult);

      // 결과 영역으로 스크롤
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

      // 콜백 호출 (세션 모드)
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
            <div className="space-y-2">
              <Textarea
                value={prompt}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_LENGTH) {
                    setPrompt(e.target.value);
                  }
                }}
                placeholder="여기에 프롬프트를 입력하세요. 예: 너는 10년차 마케터야. 신제품 홍보를 위해..."
                className="min-h-[200px] text-base resize-none"
                maxLength={MAX_LENGTH}
              />
              <div className="flex items-center justify-between text-sm">
                <span
                  className={`${
                    charCount < MIN_LENGTH
                      ? "text-rose-500"
                      : charCount > 800
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
              className="w-full h-12 text-lg font-semibold"
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
          <ScoreResult result={result} />

          {/* 다른 프롬프트 채점하기 버튼 */}
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
        </div>
      )}
    </div>
  );
}
