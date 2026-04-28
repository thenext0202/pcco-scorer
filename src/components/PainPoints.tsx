"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { painPoints } from "@/data/content";

export default function PainPoints() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 px-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight text-premium">
            이런 적 있으신가요?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-muted">
            같은 AI, 왜 결과가 다를까요?
          </p>
        </motion.div>

        {/* Pain points grid */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-card p-4 sm:p-6 rounded-xl hover:border-accent-primary/50 transition-all duration-300 card-interactive"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base sm:text-lg font-semibold mb-2 text-foreground break-words">
                    "{point.quote}"
                  </p>
                  <p className="text-sm sm:text-base text-text-muted break-words">
                    → {point.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
