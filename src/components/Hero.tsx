"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown, BookOpen, ExternalLink, Download } from "lucide-react";
import { heroContent, courses } from "@/data/content";
import { useState } from "react";

export default function Hero() {
  const [showCurriculum, setShowCurriculum] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background opacity-50" />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-accent-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent-secondary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Instructor badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8"
        >
          <Sparkles className="w-4 h-4 text-accent-primary" />
          <span className="text-sm text-text-muted">강사: {heroContent.instructor}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-[1.15] tracking-tight text-premium px-4"
        >
          {heroContent.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold gradient-text mb-4 px-4"
        >
          {heroContent.subtitle}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-text-muted max-w-3xl mx-auto mb-12 px-4"
        >
          {heroContent.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Main CTA - 실습 앱 사용하기 (강조) */}
          <a
            href="/practice"
            className="group relative px-6 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-2xl font-bold text-base sm:text-lg md:text-xl bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_100%] text-background hover:scale-[1.02] hover:bg-[position:100%_0] transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3 pulse-glow shadow-2xl btn-premium w-full sm:w-auto max-w-md"
          >
            <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform flex-shrink-0" />
            <span className="whitespace-nowrap">실습 앱 사용하기</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </a>

          {/* 보조 CTA — 커리큘럼 / 자료실 */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto max-w-md sm:max-w-none">
          {/* Curriculum Toggle Button */}
          <button
            onClick={() => setShowCurriculum(!showCurriculum)}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg glass-card hover:bg-accent-primary/10 hover:border-accent-primary transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto max-w-md"
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="whitespace-nowrap">커리큘럼 보기</span>
            <ChevronDown
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 flex-shrink-0 ${
                showCurriculum ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* 강의 자료실 */}
          <a
            href="/downloads"
            className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg glass-card hover:bg-accent-primary/10 hover:border-accent-primary transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto max-w-md"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="whitespace-nowrap">강의 자료실</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </a>
          </div>

          {/* Curriculum Accordion */}
          <AnimatePresence>
            {showCurriculum && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-3xl overflow-hidden"
              >
                <div className="glass-card p-4 sm:p-6 rounded-2xl mt-4 space-y-4 sm:space-y-6">
                  {courses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="border border-card-border rounded-xl p-4 sm:p-5 hover:border-accent-primary/50 transition-all card-interactive"
                    >
                      {/* Course header */}
                      <div className="mb-3">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="px-3 py-1 rounded-full bg-accent-primary/20 text-accent-primary text-xs font-bold whitespace-nowrap">
                              {course.framework}
                            </span>
                            <span className="text-xs sm:text-sm text-text-muted whitespace-nowrap">{course.duration}</span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold mb-1 break-words">{course.title}</h3>
                          <p className="text-xs sm:text-sm text-text-muted break-words">{course.subtitle}</p>
                        </div>
                      </div>

                      {/* Key points */}
                      <div className="mb-4">
                        <p className="text-xs sm:text-sm text-foreground italic border-l-2 border-accent-primary pl-3 py-1 bg-accent-primary/5 break-words">
                          "{course.heroQuote}"
                        </p>
                      </div>

                      {/* CTA */}
                      <a
                        href={`#${course.id}`}
                        className="inline-flex items-center gap-2 text-accent-primary hover:text-accent-secondary transition-colors font-semibold text-xs sm:text-sm group"
                      >
                        <span className="whitespace-nowrap">자세히 보기</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-text-muted"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
