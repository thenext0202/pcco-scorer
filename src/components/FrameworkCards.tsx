"use client";

import { motion } from "framer-motion";
import { frameworks } from "@/data/content";

export default function FrameworkCards() {
  return (
    <section className="py-20 px-6 bg-background-secondary/50">
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
            평생 쓸 수 있는 공식
          </h2>
          <p className="text-xl text-text-muted">
            외워서 가져가는 프레임워크
          </p>
        </motion.div>

        {/* Frameworks grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {frameworks.map((framework, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl hover:border-accent-primary/50 transition-all duration-300 card-interactive tilt-hover"
            >
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-3xl font-bold gradient-text">
                    {framework.name}
                  </h3>
                  <span className="text-xs text-text-muted bg-background-tertiary px-2 py-1 rounded">
                    {framework.course}
                  </span>
                </div>
                <p className="text-sm text-text-muted">{framework.subtitle}</p>
              </div>

              {/* Elements */}
              <div className="space-y-3">
                {framework.elements.map((element, elementIndex) => (
                  <motion.div
                    key={elementIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + elementIndex * 0.05 }}
                    whileHover={{ x: 5, backgroundColor: "rgba(147, 51, 234, 0.1)" }}
                    className="p-3 rounded-lg bg-background-tertiary/50 border border-card-border hover:border-accent-primary/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-accent-primary">
                          {element.code}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-semibold text-foreground">
                            {element.name}
                          </span>
                          <span className="text-xs text-text-dim">
                            {element.english}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted">
                          {element.question}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-text-muted italic">
            💡 다섯 칸 중 하나라도 비면, 결과도 그만큼 흐려집니다
          </p>
        </motion.div>
      </div>
    </section>
  );
}
