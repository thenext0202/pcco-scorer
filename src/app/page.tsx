"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PromptScorer from "@/components/PromptScorer";

export default function Home() {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [sessionCode, setSessionCode] = useState("");

  const handleJoinSession = () => {
    if (sessionCode.trim().length === 4) {
      window.location.href = `/play/${sessionCode.toUpperCase()}`;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-900">R-PCCO Scorer</h1>
          <p className="text-slate-600">
            당신의 프롬프트, 5요소로 채점합니다
          </p>
        </div>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/host">
            <Button variant="outline" className="w-full sm:w-auto">
              🎓 세션 만들기 (강사용)
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => setShowJoinModal(!showJoinModal)}
            className="w-full sm:w-auto"
          >
            👥 세션 참가하기
          </Button>
        </div>

        {/* 세션 참가 입력 */}
        {showJoinModal && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">
                  세션 코드 (4자리)
                </label>
                <div className="flex gap-2">
                  <Input
                    value={sessionCode}
                    onChange={(e) =>
                      setSessionCode(e.target.value.toUpperCase())
                    }
                    placeholder="예: A2B5"
                    maxLength={4}
                    className="uppercase text-center text-lg font-mono"
                  />
                  <Button
                    onClick={handleJoinSession}
                    disabled={sessionCode.length !== 4}
                  >
                    참가
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="border-t border-slate-200 pt-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 text-center">
            단독 채점 모드
          </h2>

          {/* 채점 UI */}
          <PromptScorer enableAutoSave={false} />
        </div>

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
