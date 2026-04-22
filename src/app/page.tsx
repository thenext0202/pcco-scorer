"use client";

import { useState, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import ScoreResult from "@/components/ScoreResult";
import { getMockScore } from "@/lib/mockScore";
import type { ScoreResult as ScoreResultType } from "@/types/score";

const STORAGE_KEY = "r-pcco-prompt-draft";
const MAX_LENGTH = 1000;

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScoreResultType | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  // localStorage에서 입력값 복원
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPrompt(saved);
    }
  }, []);

  // 입력값 자동 저장 (500ms debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (prompt) {
        localStorage.setItem(STORAGE_KEY, prompt);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [prompt]);

  const handleScore = async () => {
    setIsLoading(true);
    setResult(null);

    // 500ms 로딩 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 500));

    const scoreResult = getMockScore(prompt);
    setResult(scoreResult);
    setIsLoading(false);

    // 결과 영역으로 스크롤
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleClear = () => {
    setPrompt("");
    localStorage.removeItem(STORAGE_KEY);
    setResult(null);
  };

  const handleRetry = () => {
    setResult(null);
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isValid = prompt.trim().length >= 30;
  const charCount = prompt.length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* 헤더 */}
        <div ref={inputRef} className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-900">
            R-PCCO Scorer
          </h1>
          <p className="text-slate-600">
            당신의 프롬프트, 5요소로 채점합니다
          </p>
        </div>

        {/* 입력 영역 */}
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
                    charCount < 30
                      ? "text-rose-500"
                      : charCount > 800
                      ? "text-orange-500"
                      : "text-slate-500"
                  }`}
                >
                  {charCount < 30 && "최소 30자 이상 입력하세요 • "}
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
              {isLoading ? "채점 중..." : "채점하기"}
            </Button>

            {!isValid && prompt.length > 0 && (
              <p className="text-sm text-rose-500 text-center">
                프롬프트가 너무 짧습니다. 최소 30자 이상 입력해주세요.
              </p>
            )}
          </CardContent>
        </Card>

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

        {/* 푸터 */}
        <footer className="text-center text-sm text-slate-500 pt-8">
          <p>
            R-PCCO: Role(역할) · Purpose(목적) · Context(맥락) ·
            Constraints(제약) · Output(출력)
          </p>
        </footer>
      </div>
    </main>
  );
}
