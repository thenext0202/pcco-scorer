"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ClipboardList, Lock } from "lucide-react";
import type { Workbook } from "@/data/workbooks";

export default function WorkbookShelf({ workbooks }: { workbooks: Workbook[] }) {
  return (
    <main className="relative min-h-screen px-4 sm:px-6 py-12 sm:py-16">
      {/* 배경 */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* 돌아가기 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-accent-primary transition-colors mb-8 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 flex-shrink-0" />
          <span className="whitespace-nowrap">강의 소개로 돌아가기</span>
        </Link>

        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
            <ClipboardList className="w-4 h-4 text-accent-primary flex-shrink-0" />
            <span className="text-sm text-text-muted whitespace-nowrap">실습서 {workbooks.length}권</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-premium break-keep">
            실습서
          </h1>
          <p className="text-base sm:text-lg text-text-muted break-keep max-w-2xl">
            내려받지 않고 브라우저에서 바로 따라 하는 실습서입니다. 진행 상황과 입력한 내용은 쓰던
            브라우저에 저장됩니다.
          </p>
        </motion.div>

        {/* 실습서 카드 */}
        {workbooks.length === 0 ? (
          <p className="glass-card rounded-xl p-6 text-text-muted break-keep">
            준비 중인 실습서가 곧 올라옵니다.
          </p>
        ) : (
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            {workbooks.map((w, i) => (
              <motion.a
                key={w.slug}
                href={`/workbook/${w.slug}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i, 3) * 0.06 }}
                className="group glass-card card-interactive rounded-2xl p-5 sm:p-6 flex flex-col gap-4 min-h-[44px]"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-accent-primary/20 text-accent-primary text-xs font-bold whitespace-nowrap">
                    {w.category}
                  </span>
                  <span className="text-xs sm:text-sm text-text-muted whitespace-nowrap">{w.meta}</span>
                  {w.locked && (
                    <span className="inline-flex items-center gap-1 text-xs text-text-muted whitespace-nowrap ml-auto">
                      <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                      수강생 전용
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold break-keep mb-2">{w.title}</h2>
                  <p className="text-sm sm:text-base text-text-muted break-keep leading-relaxed">
                    {w.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {w.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md border border-card-border text-[11px] sm:text-xs text-text-muted whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="mt-auto inline-flex items-center gap-2 text-accent-primary font-semibold text-sm sm:text-base">
                  <span className="whitespace-nowrap">{w.locked ? "비밀번호 입력하고 열기" : "실습서 열기"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </span>
              </motion.a>
            ))}
          </div>
        )}

        {/* 안내 */}
        <p className="mt-14 sm:mt-20 text-xs sm:text-sm text-text-muted break-keep border-t border-card-border pt-6">
          실습서는 계속 추가됩니다. 수강생 전용 실습서의 비밀번호는 수업에서 안내합니다.
        </p>
      </div>
    </main>
  );
}
