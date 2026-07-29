"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { getSessionByCode, getLeaderboard } from "@/lib/sessionApi";
import type { Session, LeaderboardEntry } from "@/types/session";

const GRADE_COLORS = {
  S: "bg-amber-500 text-white",
  A: "bg-emerald-500 text-white",
  B: "bg-blue-500 text-white",
  C: "bg-slate-500 text-white",
  D: "bg-orange-500 text-white",
  F: "bg-rose-500 text-white",
} as const;

const ELEMENT_LABELS_PROMPT = [
  { key: "role" as const, label: "R", icon: "🎭" },
  { key: "purpose" as const, label: "P", icon: "🎯" },
  { key: "context" as const, label: "C", icon: "🌍" },
  { key: "constraints" as const, label: "C", icon: "⛓️" },
  { key: "output" as const, label: "O", icon: "📋" },
] as const;

const ELEMENT_LABELS_INSTRUCTION = [
  { key: "identity" as const, label: "I", icon: "🎭" },
  { key: "mission" as const, label: "M", icon: "🎯" },
  { key: "rules" as const, label: "R", icon: "📏" },
  { key: "knowledge" as const, label: "K", icon: "📚" },
  { key: "output" as const, label: "O", icon: "📋" },
] as const;

const ELEMENT_LABELS_IMAGE = [
  { key: "scene" as const, label: "S", icon: "🎬" },
  { key: "style" as const, label: "S", icon: "🎨" },
  { key: "detail" as const, label: "D", icon: "🔍" },
  { key: "hard" as const, label: "H", icon: "🔒" },
  { key: "reality" as const, label: "R", icon: "⚖️" },
] as const;

// 바이브 코딩은 R-PCCO와 elements 키 동일, 라벨도 같음 (라벨 재사용)
const ELEMENT_LABELS_VIBE = ELEMENT_LABELS_PROMPT;

// ★ 역설계(10차)는 4축 × 25점 — 요소 개수·만점이 다름
const ELEMENT_LABELS_REVERSE = [
  { key: "observe" as const, label: "관찰", icon: "👀" },
  { key: "spec" as const, label: "명세", icon: "🔬" },
  { key: "edge" as const, label: "예외", icon: "⚠️" },
  { key: "structure" as const, label: "구조", icon: "🧩" },
] as const;

export default function BoardPage() {
  const params = useParams();
  const code = params?.code as string;

  const [session, setSession] = useState<Session | null>(null);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const participantUrl =
    typeof window !== "undefined" && code
      ? `${window.location.origin}/play/${code}`
      : "";

  // 세션 조회
  useEffect(() => {
    const fetchSession = async () => {
      if (!code) return;

      try {
        const result = await getSessionByCode(code);
        if (result) {
          setSession(result.session);
        }
      } catch (err) {
        console.error("Failed to fetch session:", err);
      }
    };

    fetchSession();
  }, [code]);

  // 초기 리더보드 조회
  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!session) return;

      try {
        const data = await getLeaderboard(session.id, session.mode, 10);
        setEntries(data);
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [session]);

  // Realtime 구독
  useEffect(() => {
    if (!session) return;

    const channel = supabase
      .channel("leaderboard-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "submissions",
          filter: `session_id=eq.${session.id}`,
        },
        async (payload) => {
          console.log("New submission:", payload);

          // 리더보드 갱신
          try {
            const data = await getLeaderboard(session.id, session.mode, 10);
            setEntries(data);

            // 새 항목 하이라이트
            if (payload.new && "id" in payload.new) {
              setHighlightedId(payload.new.id as string);
              setTimeout(() => setHighlightedId(null), 2000);
            }
          } catch (err) {
            console.error("Failed to refresh leaderboard:", err);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-900 text-white py-8 px-4 flex items-center justify-center">
        <p className="text-slate-400 text-xl">리더보드 로딩 중...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-slate-900 text-white py-8 px-4 flex items-center justify-center">
        <p className="text-slate-400 text-xl">세션을 찾을 수 없습니다</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white py-8 px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold">{session.title}</h1>
              <Badge variant="outline" className="text-lg px-3 py-1">
                {session.mode === "instruction"
                  ? "📘 지침 채점"
                  : session.mode === "image"
                  ? "🎨 이미지 프롬프트 채점"
                  : session.mode === "vibe"
                  ? "⚡ 바이브 코딩 채점"
                  : session.mode === "reverse"
                  ? "🔍 역설계 채점 (한 방 프롬프트)"
                  : "🎯 프롬프트 채점"}
              </Badge>
            </div>
            {session.host_name && (
              <p className="text-xl text-slate-400">강사: {session.host_name}</p>
            )}
            <div className="mt-4 flex items-center gap-4">
              <span className="text-3xl font-mono font-bold text-blue-400">
                {code}
              </span>
              <span className="text-slate-500">참가 코드</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg">
            <QRCodeSVG value={participantUrl} size={120} />
          </div>
        </div>

        {/* 리더보드 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-300">
            🏆 리더보드 (상위 10명)
          </h2>

          {entries.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-3xl text-slate-500 mb-2">👥</p>
              <p className="text-xl text-slate-400">
                아직 제출된 점수가 없습니다
              </p>
              <p className="text-slate-500 mt-2">
                참가자들이 제출하면 실시간으로 업데이트됩니다
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map((entry) => {
                const isHighlighted = entry.id === highlightedId;

                // 세션 모드에 따라 요소 라벨 및 값 선택
                const labels =
                  session.mode === "instruction"
                    ? ELEMENT_LABELS_INSTRUCTION
                    : session.mode === "image"
                    ? ELEMENT_LABELS_IMAGE
                    : session.mode === "vibe"
                    ? ELEMENT_LABELS_VIBE
                    : session.mode === "reverse"
                    ? ELEMENT_LABELS_REVERSE
                    : ELEMENT_LABELS_PROMPT;

                // 요소당 만점 — 역설계(4축)만 25, 나머지는 20
                const maxPerElement = session.mode === "reverse" ? 25 : 20;

                // 최대 점수 계산
                let elementValues: number[];
                if (entry.mode === "instruction") {
                  elementValues = [
                    entry.elements.identity,
                    entry.elements.mission,
                    entry.elements.rules,
                    entry.elements.knowledge,
                    entry.elements.output,
                  ];
                } else if (entry.mode === "image") {
                  elementValues = [
                    entry.elements.scene,
                    entry.elements.style,
                    entry.elements.detail,
                    entry.elements.hard,
                    entry.elements.reality,
                  ];
                } else if (entry.mode === "reverse") {
                  // 역설계 — 4축
                  elementValues = [
                    entry.elements.observe,
                    entry.elements.spec,
                    entry.elements.edge,
                    entry.elements.structure,
                  ];
                } else {
                  // prompt 또는 vibe — elements 키 구조가 같음
                  elementValues = [
                    entry.elements.role,
                    entry.elements.purpose,
                    entry.elements.context,
                    entry.elements.constraints,
                    entry.elements.output,
                  ];
                }
                const maxElement = Math.max(...elementValues);

                return (
                  <div
                    key={entry.id}
                    className={`bg-slate-800 rounded-lg p-6 transition-all duration-300 ${
                      isHighlighted
                        ? "ring-4 ring-yellow-400 shadow-lg shadow-yellow-400/50"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-6">
                        {/* 순위 */}
                        <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center">
                          <span className="text-3xl font-bold text-slate-300">
                            {entry.rank}
                          </span>
                        </div>

                        {/* 닉네임 */}
                        <div>
                          <p className="text-2xl font-semibold text-white">
                            {entry.nickname}
                          </p>
                        </div>
                      </div>

                      {/* 점수 및 등급 */}
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-5xl font-bold text-white">
                            {entry.total_score}
                          </p>
                          <p className="text-sm text-slate-400">점</p>
                        </div>
                        <Badge
                          className={`${
                            GRADE_COLORS[entry.grade]
                          } text-3xl px-6 py-3`}
                        >
                          {entry.grade}
                        </Badge>
                      </div>
                    </div>

                    {/* 요소 미니 바 (역설계는 4축, 나머지는 5요소) */}
                    <div
                      className={`grid ${
                        labels.length === 4 ? "grid-cols-4" : "grid-cols-5"
                      } gap-3 mt-4`}
                    >
                      {labels.map((element, idx) => {
                        const value = elementValues[idx];
                        return (
                          <div key={idx} className="text-center">
                            <div className="text-sm text-slate-400 mb-1">
                              {element.icon} {element.label}
                            </div>
                            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  value === maxElement
                                    ? "bg-yellow-400"
                                    : "bg-blue-500"
                                }`}
                                style={{
                                  width: `${(value / maxPerElement) * 100}%`,
                                }}
                              />
                            </div>
                              <div className="text-xs text-slate-500 mt-1">
                                {value}/{maxPerElement}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 푸터 */}
        <footer className="text-center text-slate-500 text-sm pt-8">
          <p>
            실시간 업데이트 •{" "}
            {session.mode === "instruction"
              ? "I-MRKO: Identity · Mission · Rules · Knowledge · Output"
              : session.mode === "image"
              ? "SSDHR: Scene · Style · Detail · Hard · Reality"
              : session.mode === "vibe"
              ? "바이브 코딩: 역할 · 목적 · 맥락(디바이스!) · 제약 · 출력 (R-PCCO 코딩 응용)"
              : session.mode === "reverse"
              ? "역설계 4축: 기능 관찰 · 명세 구체성 · 예외·제약 인식 · 프롬프트 구조 (각 25점)"
              : "R-PCCO: Role · Purpose · Context · Constraints · Output"}
          </p>
        </footer>
      </div>
    </main>
  );
}
