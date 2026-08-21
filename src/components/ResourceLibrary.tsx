"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  FileText,
  FileType2,
  FileArchive,
  FileCode2,
  BookOpen,
} from "lucide-react";
import type { ResourceGroup, ResourceKind } from "@/data/resources";

/** 페이지(서버 컴포넌트)가 실제 파일을 읽어 size를 채워 넘긴다 */
export interface SizedResourceGroup extends Omit<ResourceGroup, "items"> {
  /** 랜딩에 복습 섹션(CourseDetail)이 마운트된 강의인지 */
  hasDetail: boolean;
  items: (ResourceGroup["items"][number] & { size: string })[];
}

const KIND_META: Record<
  ResourceKind,
  { label: string; icon: typeof FileText; className: string }
> = {
  pdf: { label: "PDF", icon: FileText, className: "text-rose-300 bg-rose-500/10" },
  docx: { label: "DOCX", icon: FileType2, className: "text-sky-300 bg-sky-500/10" },
  zip: { label: "ZIP", icon: FileArchive, className: "text-amber-300 bg-amber-500/10" },
  txt: { label: "TXT", icon: FileCode2, className: "text-emerald-300 bg-emerald-500/10" },
  md: { label: "MD", icon: FileCode2, className: "text-violet-300 bg-violet-500/10" },
};

export default function ResourceLibrary({ groups }: { groups: SizedResourceGroup[] }) {
  const totalCount = groups.reduce((sum, g) => sum + g.items.length, 0);

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
            <BookOpen className="w-4 h-4 text-accent-primary flex-shrink-0" />
            <span className="text-sm text-text-muted whitespace-nowrap">
              자료 {totalCount}개 · {groups.length}개 강의
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-premium break-keep">
            강의 자료실
          </h1>
          <p className="text-base sm:text-lg text-text-muted break-keep max-w-2xl">
            수업에서 쓴 슬라이드·워크시트·실습 파일을 차수별로 모았습니다. 눌러서 바로
            받으세요.
          </p>
        </motion.div>

        {/* 차수 바로가기 */}
        <div className="flex flex-wrap gap-2 mb-10 sm:mb-14">
          {groups.map((g) => (
            <a
              key={g.courseId}
              href={`#res-${g.courseId}`}
              className="px-3 py-2 rounded-lg glass-card text-xs sm:text-sm font-semibold hover:border-accent-primary hover:text-accent-primary transition-all whitespace-nowrap"
            >
              {g.label}
            </a>
          ))}
        </div>

        {/* 차수별 자료 */}
        <div className="space-y-10 sm:space-y-14">
          {groups.map((group, gi) => (
            <motion.section
              key={group.courseId}
              id={`res-${group.courseId}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: Math.min(gi, 3) * 0.05 }}
              className="scroll-mt-24"
            >
              {/* 강의 헤더 */}
              <div className="mb-5">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-accent-primary/20 text-accent-primary text-xs font-bold whitespace-nowrap">
                    {group.label}
                  </span>
                  <span className="text-xs sm:text-sm text-text-muted whitespace-nowrap">
                    {group.framework}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold break-keep mb-2">
                  {group.title}
                </h2>
                {group.hasDetail && (
                  <Link
                    href={`/#${group.courseId}`}
                    className="text-xs sm:text-sm text-accent-primary hover:text-accent-secondary transition-colors font-semibold"
                  >
                    이 강의 복습 내용 보기 →
                  </Link>
                )}
              </div>

              {/* 파일 목록 */}
              <div className="grid gap-3 sm:grid-cols-2">
                {group.items.map((item) => {
                  const meta = KIND_META[item.kind];
                  const Icon = meta.icon;
                  return (
                    <a
                      key={item.file}
                      href={item.file}
                      download={item.downloadName}
                      className="group glass-card card-interactive rounded-xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4 min-h-[44px]"
                    >
                      <span
                        className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center ${meta.className}`}
                      >
                        <Icon className="w-5 h-5" />
                      </span>

                      <span className="flex-1 min-w-0">
                        <span className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-bold text-sm sm:text-base break-keep">
                            {item.title}
                          </span>
                          <span className="text-[10px] sm:text-xs text-text-muted whitespace-nowrap">
                            {meta.label} · {item.size}
                          </span>
                        </span>
                        <span className="block text-xs sm:text-sm text-text-muted break-keep leading-relaxed">
                          {item.description}
                        </span>
                      </span>

                      <Download className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-text-muted group-hover:text-accent-primary group-hover:translate-y-0.5 transition-all mt-1" />
                    </a>
                  );
                })}
              </div>
            </motion.section>
          ))}
        </div>

        {/* 안내 */}
        <p className="mt-14 sm:mt-20 text-xs sm:text-sm text-text-muted break-keep border-t border-card-border pt-6">
          자료는 강의 진행에 따라 계속 추가됩니다. 차수별 상세 복습 내용은 강의 소개 페이지에서 볼 수
          있습니다.
        </p>
      </div>
    </main>
  );
}
