"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { InstructionScoreResult } from "@/types/score";

interface InstructionScoreResultProps {
  result: InstructionScoreResult;
}

const ELEMENT_INFO = {
  identity: { icon: "🎭", name: "정체성 (Identity)" },
  mission: { icon: "🎯", name: "임무 (Mission)" },
  rules: { icon: "📏", name: "규칙 (Rules)" },
  knowledge: { icon: "📚", name: "지식 (Knowledge)" },
  output: { icon: "📋", name: "출력 (Output)" },
} as const;

const GRADE_COLORS = {
  S: "bg-amber-500 text-white",
  A: "bg-emerald-500 text-white",
  B: "bg-blue-500 text-white",
  C: "bg-slate-500 text-white",
  D: "bg-orange-500 text-white",
  F: "bg-rose-500 text-white",
} as const;

export default function InstructionScoreResult({
  result,
}: InstructionScoreResultProps) {
  const handleCopyExample = async () => {
    try {
      await navigator.clipboard.writeText(result.improved_example);
      toast.success("복사 완료!", {
        description: "개선 예시가 클립보드에 복사되었습니다.",
      });
    } catch {
      toast.error("복사 실패", {
        description: "클립보드 복사에 실패했습니다.",
      });
    }
  };

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

      {/* 5요소 상세 점수 */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-bold">📊 요소별 점수</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          {(Object.keys(ELEMENT_INFO) as Array<keyof typeof ELEMENT_INFO>).map(
            (key) => {
              const element = result.elements[key];
              const info = ELEMENT_INFO[key];
              const percentage = (element.score / 20) * 100;

              return (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{info.icon}</span>
                      <span className="font-semibold">{info.name}</span>
                    </div>
                    <span className="text-lg font-bold text-slate-700">
                      {element.score}/20
                    </span>
                  </div>

                  {/* 프로그레스 바 */}
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-blue-500 h-full transition-all duration-500 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  {/* 감지된 내용 */}
                  {element.detected && (
                    <div className="bg-slate-100 px-3 py-2 rounded text-sm text-slate-600 font-mono">
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

      {/* 보너스/패널티 */}
      {(result.bonuses.length > 0 || result.penalties.length > 0) && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            {result.bonuses.length > 0 && (
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">
                  ✨ 보너스
                </h4>
                <ul className="space-y-1">
                  {result.bonuses.map((bonus, idx) => (
                    <li key={idx} className="text-sm text-slate-600">
                      +{bonus.points}점: {bonus.reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {result.penalties.length > 0 && (
              <div>
                <h4 className="font-semibold text-rose-700 mb-2">⚠️ 감점</h4>
                <ul className="space-y-1">
                  {result.penalties.map((penalty, idx) => (
                    <li key={idx} className="text-sm text-slate-600">
                      {penalty.points}점: {penalty.reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

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

      {/* 개선 예시 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">📝 개선 예시</h3>
            <Button variant="outline" size="sm" onClick={handleCopyExample}>
              복사
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <pre className="bg-slate-50 p-4 rounded-lg text-sm text-slate-800 whitespace-pre-wrap font-sans overflow-x-auto">
            {result.improved_example}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
