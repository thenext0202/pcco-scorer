"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ReverseScoreResult } from "@/types/score";

interface ReverseScoreResultProps {
  result: ReverseScoreResult;
}

// ★ 역설계 모드는 4축 × 25점 (다른 모드의 5요소 × 20점과 다름)
const ELEMENT_INFO = {
  observe: {
    icon: "👀",
    name: "기능 관찰 (Observe)",
    hint: "프로그램이 하는 일을 얼마나 발견해 담았나",
  },
  spec: {
    icon: "🔬",
    name: "명세 구체성 (Specify)",
    hint: "AI가 재량 없이 만들 수 있는 수준까지 적었나",
  },
  edge: {
    icon: "⚠️",
    name: "예외·제약 인식 (Edge)",
    hint: "잘 안 될 때의 동작과 제약을 다뤘나",
  },
  structure: {
    icon: "🧩",
    name: "프롬프트 구조 (Structure)",
    hint: "역할·맥락·구획·제약·완료 기준",
  },
} as const;

const GRADE_COLORS = {
  S: "bg-amber-500 text-white",
  A: "bg-emerald-500 text-white",
  B: "bg-blue-500 text-white",
  C: "bg-slate-500 text-white",
  D: "bg-orange-500 text-white",
  F: "bg-rose-500 text-white",
} as const;

export default function ReverseScoreResultView({
  result,
}: ReverseScoreResultProps) {
  return (
    <div className="space-y-6">
      {/* 총점 및 등급 */}
      <Card>
        <CardHeader>
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-slate-900">
              {result.total_score}
              <span className="text-2xl text-slate-500">/100</span>
            </div>
            <Badge
              className={`${GRADE_COLORS[result.grade]} text-2xl px-6 py-2`}
            >
              {result.grade} 등급
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* 4축 상세 점수 */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-bold">📊 역설계 4축 점수</h3>
          <p className="text-sm text-slate-500">각 축 25점 만점</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {(Object.keys(ELEMENT_INFO) as Array<keyof typeof ELEMENT_INFO>).map(
            (key) => {
              const element = result.elements[key];
              const info = ELEMENT_INFO[key];
              const percentage = (element.score / 25) * 100;

              return (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{info.icon}</span>
                      <div>
                        <div className="font-semibold">{info.name}</div>
                        <div className="text-xs text-slate-500">
                          {info.hint}
                        </div>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-slate-700">
                      {element.score}/25
                    </span>
                  </div>

                  {/* 프로그레스 바 */}
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-teal-500 h-full transition-all duration-500 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  {/* 감지된 내용 */}
                  {element.detected && (
                    <div className="bg-slate-100 px-3 py-2 rounded text-sm text-slate-600 font-mono break-words">
                      &quot;{element.detected}&quot;
                    </div>
                  )}

                  {/* 피드백 */}
                  <p className="text-sm text-slate-600">{element.feedback}</p>
                </div>
              );
            }
          )}
        </CardContent>
      </Card>

      {/* 강점 */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-bold">✨ 강점</h3>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span className="text-slate-700">{strength}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* 개선점 */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-bold">🎯 개선점</h3>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.improvements.map((improvement, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span className="text-slate-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* 관찰 가이드 — ★ 모범답안이 아니라 스스로 확인할 질문 목록 (답 유출 방지) */}
      <Card className="border-2 border-teal-300 shadow-md">
        <CardHeader className="bg-teal-50">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-teal-900">
              🔍 다시 관찰하러 가기
            </h3>
            <p className="text-sm text-teal-700">
              정답은 프로그램 안에 있습니다. 아래를 직접 확인하고 프롬프트를
              보강해 보세요.
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
            {result.improved_example}
          </div>
          <p className="text-xs text-slate-500 text-center mt-4">
            💡 좋은 프롬프트는 글재주가 아니라 관찰의 양입니다. 프롬프트에 없는
            것은 만들어지지 않습니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
