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
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-premium">
            이런 적 있으신가요?
          </h2>
          <p className="text-xl text-text-muted">
            같은 AI, 왜 결과가 다를까요?
          </p>
        </motion.div>

        {/* Pain points grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-card p-6 rounded-xl hover:border-accent-primary/50 transition-all duration-300 card-interactive"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-accent-primary" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-2 text-foreground">
                    "{point.quote}"
                  </p>
                  <p className="text-text-muted">
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
