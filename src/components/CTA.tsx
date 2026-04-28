"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-6 sm:p-8 md:p-12 rounded-2xl text-center relative overflow-hidden card-interactive"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 blur-3xl" />

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight text-premium px-2 break-keep">
              오늘부터 AI를 다르게 쓰세요
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-muted mb-6 sm:mb-8 max-w-2xl mx-auto px-2 break-keep">
              생각을 구조화하는 사람이 AI를 지배합니다
            </p>

            {/* Practice app link - 강조 */}
            <div className="px-2">
              <p className="text-text-muted mb-4 sm:mb-6 text-sm sm:text-base md:text-lg break-keep">
                배운 내용을 바로 실습해보세요
              </p>
              <a
                href="/practice"
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_100%] text-background font-bold text-sm sm:text-base md:text-lg hover:scale-[1.02] hover:bg-[position:100%_0] transition-all duration-500 pulse-glow shadow-2xl btn-premium w-full sm:w-auto max-w-md mx-auto"
              >
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform flex-shrink-0" />
                <span className="break-keep">R-PCCO & I-MRKO 채점 앱 사용하기</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
