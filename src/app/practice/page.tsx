"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PromptScorer from "@/components/PromptScorer";
import InstructionScorer from "@/components/InstructionScorer";

type Mode = "prompt" | "instruction";

export default function Home() {
  const [mode, setMode] = useState<Mode>("prompt");
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [sessionCode, setSessionCode] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleJoinSession = () => {
    if (sessionCode.trim().length === 4) {
      window.location.href = `/play/${sessionCode.toUpperCase()}`;
    }
  };

  const handleHostSession = () => {
    if (password === "7962") {
      window.location.href = "/host";
    } else {
      setPasswordError("비밀번호가 올바르지 않습니다");
      setPassword("");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* 뒤로가기 버튼 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 transition-all shadow-sm hover:shadow-md font-semibold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>강의 소개로 돌아가기</span>
        </Link>

        {/* 헤더 */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-900">AI 채점기</h1>
          <p className="text-slate-600">
            프롬프트와 지침을 AI로 채점받기
          </p>
        </div>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => {
              setShowPasswordModal(!showPasswordModal);
              setPasswordError("");
              setPassword("");
            }}
            className="w-full sm:w-auto"
          >
            🎓 세션 만들기 (강사용)
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowJoinModal(!showJoinModal)}
            className="w-full sm:w-auto"
          >
            👥 세션 참가하기
          </Button>
        </div>

        {/* 세션 만들기 비밀번호 입력 */}
        {showPasswordModal && (
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">
                  강사 비밀번호
                </label>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && password.length > 0) {
                        handleHostSession();
                      }
                    }}
                    placeholder="비밀번호 입력"
                    className="text-center text-lg"
                  />
                  <Button
                    onClick={handleHostSession}
                    disabled={password.length === 0}
                  >
                    확인
                  </Button>
                </div>
                {passwordError && (
                  <p className="text-sm text-red-600 text-center font-medium">
                    {passwordError}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

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
          <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center">
            단독 채점 모드
          </h2>

          {/* 탭 토글 */}
          <div className="flex gap-2 mb-6 p-1 bg-slate-100 rounded-lg w-fit mx-auto">
            <button
              onClick={() => setMode("prompt")}
              className={`px-6 py-2 rounded-md transition-all ${
                mode === "prompt"
                  ? "bg-white shadow text-blue-600 font-semibold"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              🎯 프롬프트 채점 (R-PCCO)
            </button>
            <button
              onClick={() => setMode("instruction")}
              className={`px-6 py-2 rounded-md transition-all ${
                mode === "instruction"
                  ? "bg-white shadow text-blue-600 font-semibold"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              📘 지침 채점 (I-MRKO)
            </button>
          </div>

          {/* 모드별 채점기 */}
          {mode === "prompt" ? (
            <PromptScorer enableAutoSave={false} />
          ) : (
            <InstructionScorer enableAutoSave={false} />
          )}
        </div>

        {/* 푸터 */}
        <footer className="text-center text-sm text-slate-500 pt-8">
          <p>
            {mode === "prompt"
              ? "R-PCCO: Role(역할) · Purpose(목적) · Context(맥락) · Constraints(제약) · Output(출력)"
              : "I-MRKO: Identity(정체성) · Mission(임무) · Rules(규칙) · Knowledge(지식) · Output(출력)"}
          </p>
        </footer>
      </div>
    </main>
  );
}
