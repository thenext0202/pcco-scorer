"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-12 rounded-2xl text-center relative overflow-hidden card-interactive"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 blur-3xl" />

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-premium">
              오늘부터 AI를 다르게 쓰세요
            </h2>
            <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
              생각을 구조화하는 사람이 AI를 지배합니다
            </p>

            {/* Practice app link - 강조 */}
            <div>
              <p className="text-text-muted mb-6 text-lg">
                배운 내용을 바로 실습해보세요
              </p>
              <a
                href="/practice"
                className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_100%] text-background font-bold text-lg hover:scale-[1.02] hover:bg-[position:100%_0] transition-all duration-500 pulse-glow shadow-2xl btn-premium"
              >
                <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                R-PCCO & I-MRKO 채점 앱 사용하기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
