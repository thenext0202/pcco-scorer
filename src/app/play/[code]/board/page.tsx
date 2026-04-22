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
        const data = await getLeaderboard(session.id, 10);
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
            const data = await getLeaderboard(session.id, 10);
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
            <h1 className="text-4xl font-bold mb-2">{session.title}</h1>
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
                const maxElement = Math.max(
                  entry.elements.role,
                  entry.elements.purpose,
                  entry.elements.context,
                  entry.elements.constraints,
                  entry.elements.output
                );

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

                    {/* 5요소 미니 바 */}
                    <div className="grid grid-cols-5 gap-3 mt-4">
                      {[
                        { label: "R", value: entry.elements.role, icon: "🎭" },
                        {
                          label: "P",
                          value: entry.elements.purpose,
                          icon: "🎯",
                        },
                        {
                          label: "C",
                          value: entry.elements.context,
                          icon: "🌍",
                        },
                        {
                          label: "C",
                          value: entry.elements.constraints,
                          icon: "⛓️",
                        },
                        { label: "O", value: entry.elements.output, icon: "📋" },
                      ].map((element, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-sm text-slate-400 mb-1">
                            {element.icon} {element.label}
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                element.value === maxElement
                                  ? "bg-yellow-400"
                                  : "bg-blue-500"
                              }`}
                              style={{ width: `${(element.value / 20) * 100}%` }}
                            />
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {element.value}/20
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 푸터 */}
        <footer className="text-center text-slate-500 text-sm pt-8">
          <p>실시간 업데이트 • R-PCCO Scorer</p>
        </footer>
      </div>
    </main>
  );
}
