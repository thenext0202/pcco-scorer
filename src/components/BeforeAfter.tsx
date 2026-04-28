"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { courses } from "@/data/content";

export default function BeforeAfter() {
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
            한 줄 차이로 달라지는 결과
          </h2>
          <p className="text-xl text-text-muted">
            Before vs After 비교
          </p>
        </motion.div>

        {/* Course comparisons */}
        <div className="space-y-16">
          {courses.map((course, courseIndex) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: courseIndex * 0.2 }}
            >
              {/* Course badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1 rounded-full bg-accent-primary/20 text-accent-primary text-sm font-semibold">
                  {course.framework}
                </span>
                <h3 className="text-2xl font-bold">{course.beforeAfter.title}</h3>
              </div>

              {/* Comparison grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Before */}
                <div className="glass-card p-6 rounded-xl border-red-500/30 card-interactive">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                      <X className="w-5 h-5 text-red-400" />
                    </div>
                    <span className="font-semibold text-red-400">
                      {course.beforeAfter.before.label}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-text-muted mb-2">프롬프트:</p>
                      <p className="font-mono text-sm bg-background/50 p-3 rounded">
                        {course.beforeAfter.before.prompt}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-text-muted mb-2">결과:</p>
                      <p className="text-sm text-text-dim italic">
                        → {course.beforeAfter.before.result}
                      </p>
                    </div>
                  </div>
                </div>

                {/* After */}
                <div className="glass-card p-6 rounded-xl border-green-500/30 card-interactive">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="font-semibold text-green-400">
                      {course.beforeAfter.after.label}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-text-muted mb-2">프롬프트:</p>
                      <p className="font-mono text-sm bg-background/50 p-3 rounded">
                        {course.beforeAfter.after.prompt}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-text-muted mb-2">결과:</p>
                      <p className="text-sm text-green-400 font-semibold">
                        ✓ {course.beforeAfter.after.result}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
