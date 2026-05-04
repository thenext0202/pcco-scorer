"use client";

import { useState, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ImageScoreResultView from "@/components/ImageScoreResult";
import type { ImageScoreResult } from "@/types/score";

const STORAGE_KEY = "ssdhr-image-prompt-draft";
const MAX_LENGTH = 1500;
const MIN_LENGTH = 30;

interface ImageScorerProps {
  /**
   * 채점 완료 후 콜백 (세션 모드에서 사용)
   */
  onSubmit?: (result: ImageScoreResult, prompt: string) => void;

  /**
   * 제출 버튼 텍스트 (기본값: "채점하기")
   */
  submitButtonText?: string;

  /**
   * localStorage 자동 저장 활성화 (기본값: true)
   */
  enableAutoSave?: boolean;

  /**
   * 결과 영역 끝의 "다른 프롬프트 채점하기" 버튼을 숨김 (세션 모드용).
   */
  hideRetryButton?: boolean;
}

export default function ImageScorer({
  onSubmit,
  submitButtonText = "채점하기",
  enableAutoSave = true,
  hideRetryButton = false,
}: ImageScorerProps) {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ImageScoreResult | null>(null);
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
      const response = await fetch("/api/score/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "채점에 실패했습니다.");
      }

      const scoreResult: ImageScoreResult = await response.json();
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
            <div className="space-y-2">
              <Textarea
                value={prompt}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_LENGTH) {
                    setPrompt(e.target.value);
                  }
                }}
                placeholder={`이미지 생성 프롬프트를 입력하세요.\n\n예: 한국인 7세 남자 아이가 책상에서 일기 쓰는 모습, 탑뷰. photograph, 35mm f/2.8, warm earth tones, early 2000s Kodak Gold 200. 약간 삐뚤어진 글씨, 종이 살짝 구겨짐. 일기장에 "오늘은 비가 왔다" 정확히 명시, 글자 변형 금지. Negative: 깨진 글씨 금지, 여분 손가락 금지.`}
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
          <ImageScoreResultView result={result} />

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
