"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { VibeScoreResult } from "@/types/score";

interface VibeScoreResultProps {
  result: VibeScoreResult;
}

const ELEMENT_INFO = {
  role: { icon: "🎭", name: "역할 (Role)", hint: "어떤 개발자·디자이너로 부를 것인가" },
  purpose: { icon: "🎯", name: "목적 (Purpose)", hint: "왜 만드는 앱인가" },
  context: { icon: "🌍", name: "맥락 (Context)", hint: "누가·어떤 디바이스·어떤 상황" },
  constraints: { icon: "⛓️", name: "제약 (Constraints)", hint: "디자인·분량·기술·금지" },
  output: { icon: "📋", name: "출력 (Output)", hint: "결과물 형태 + 파일 종류" },
} as const;

const BONUS_LABEL: Record<string, string> = {
  device_specified: "디바이스 명시",
  tech_stack_clear: "기술 스택 명확",
  interaction_explicit: "인터랙션 구체",
  single_file_output: "단일 파일 출력 (Artifacts 호환)",
};

const GRADE_COLORS = {
  S: "bg-amber-500 text-white",
  A: "bg-emerald-500 text-white",
  B: "bg-blue-500 text-white",
  C: "bg-slate-500 text-white",
  D: "bg-orange-500 text-white",
  F: "bg-rose-500 text-white",
} as const;

export default function VibeScoreResultView({ result }: VibeScoreResultProps) {
  const handleCopyExample = async () => {
    try {
      await navigator.clipboard.writeText(result.improved_example);
      toast.success("복사 완료!", {
        description:
          "claude.ai로 가서 채팅창에 붙여넣으세요. Artifacts 미리보기에 앱이 나옵니다.",
      });
    } catch {
      toast.error("복사 실패", {
        description: "클립보드 복사에 실패했습니다.",
      });
    }
  };

  const handleOpenClaude = () => {
    window.open("https://claude.ai/new", "_blank", "noopener,noreferrer");
  };

  const appliedBonuses = result.bonuses.filter((b) => b.points > 0);
  const naBonuses = result.bonuses.filter((b) => b.points === 0);

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
          <h3 className="text-xl font-bold">📊 바이브 코딩 5요소 점수</h3>
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
                      <div>
                        <div className="font-semibold">{info.name}</div>
                        <div className="text-xs text-slate-500">{info.hint}</div>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-slate-700">
                      {element.score}/20
                    </span>
                  </div>

                  {/* 프로그레스 바 */}
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full transition-all duration-500 rounded-full"
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

      {/* 가점/감점 */}
      {(result.bonuses.length > 0 || result.penalties.length > 0) && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            {appliedBonuses.length > 0 && (
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">
                  ✨ 가점 (적용)
                </h4>
                <ul className="space-y-1">
                  {appliedBonuses.map((bonus, idx) => (
                    <li key={idx} className="text-sm text-slate-600">
                      <span className="font-semibold text-emerald-700">
                        +{bonus.points}점
                      </span>{" "}
                      <span className="text-slate-500">
                        ({BONUS_LABEL[bonus.type] ?? bonus.type})
                      </span>{" "}
                      — {bonus.reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {naBonuses.length > 0 && (
              <div>
                <h4 className="font-semibold text-slate-500 mb-2">
                  ➖ 미적용 가점
                </h4>
                <ul className="space-y-1">
                  {naBonuses.map((bonus, idx) => (
                    <li key={idx} className="text-sm text-slate-500">
                      <span className="text-slate-400">
                        ({BONUS_LABEL[bonus.type] ?? bonus.type})
                      </span>{" "}
                      — {bonus.reason}
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
                      <span className="font-semibold text-rose-700">
                        -{penalty.points}점
                      </span>{" "}
                      — {penalty.reason}
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

      {/* 개선 예시 — 강조: Artifacts 바로 실행 가능한 완성형 프롬프트 */}
      <Card className="border-2 border-indigo-300 shadow-md">
        <CardHeader className="bg-indigo-50">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-indigo-900">
              🚀 Artifacts 즉시 실행 프롬프트
            </h3>
            <p className="text-sm text-indigo-700">
              아래 프롬프트를 복사 → claude.ai에 붙여넣으면 미리보기에 작동하는 앱이 만들어집니다.
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm whitespace-pre-wrap font-mono overflow-x-auto leading-relaxed">
            {result.improved_example}
          </pre>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              size="lg"
              onClick={handleCopyExample}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              📋 프롬프트 복사
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleOpenClaude}
              className="flex-1 border-indigo-300 text-indigo-700 hover:bg-indigo-50"
            >
              ↗ claude.ai 열기
            </Button>
          </div>

          <p className="text-xs text-slate-500 text-center">
            💡 Tip: 결과가 마음에 안 들면 같은 대화에서 &quot;색 좀 더 부드럽게&quot;,
            &quot;글자 키워줘&quot; 같이 한 줄로 고치세요.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
