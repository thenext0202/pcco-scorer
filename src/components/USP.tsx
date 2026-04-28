"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { usps } from "@/data/content";

export default function USP() {
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
            다른 AI 강의와 다른 점
          </h2>
          <p className="text-xl text-text-muted">
            왜 이 강의인가?
          </p>
        </motion.div>

        {/* USPs grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usps.map((usp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 rounded-xl hover:border-accent-primary/50 transition-all duration-300 card-interactive"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-primary/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-accent-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{usp.title}</h3>
                  <p className="text-text-muted text-sm">{usp.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
