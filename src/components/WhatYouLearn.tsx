"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";
import { courses } from "@/data/content";

export default function WhatYouLearn() {
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
            수강 후 달라지는 것
          </h2>
          <p className="text-xl text-text-muted">
            90분 뒤, 당신은 이렇게 변합니다
          </p>
        </motion.div>

        {/* Courses */}
        <div className="space-y-12">
          {courses.map((course, courseIndex) => (
            <motion.div
              key={course.id}
              id={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: courseIndex * 0.1 }}
              className="scroll-mt-20"
            >
              <div className="glass-card p-8 rounded-2xl card-interactive">
                {/* Course header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-6 border-b border-card-border">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full bg-accent-primary/20 text-accent-primary text-sm font-semibold">
                        {course.level}
                      </span>
                      <span className="text-text-muted">{course.duration}</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-2">{course.title}</h3>
                    <p className="text-xl text-text-muted">{course.subtitle}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary">
                      <p className="text-sm font-semibold opacity-90">핵심 공식</p>
                      <p className="text-2xl font-bold">{course.framework}</p>
                      <p className="text-xs opacity-80">{course.frameworkFull}</p>
                    </div>
                  </div>
                </div>

                {/* Hero quote */}
                <div className="mb-6 p-4 border-l-4 border-accent-primary bg-accent-primary/5 rounded">
                  <p className="text-lg italic text-foreground">
                    "{course.heroQuote}"
                  </p>
                </div>

                {/* Promises */}
                <div className="space-y-4">
                  {course.promises.map((promise, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      </div>
                      <p className="text-foreground flex-1">{promise}</p>
                    </div>
                  ))}
                </div>

                {/* Killer insights (2차 강의만) */}
                {course.killerInsights && (
                  <div className="mt-6 pt-6 border-t border-card-border">
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-5 h-5 text-accent-primary" />
                      <h4 className="text-lg font-bold">킬러 인사이트</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {course.killerInsights.map((insight, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg bg-accent-primary/10 border border-accent-primary/30"
                        >
                          <p className="font-semibold text-accent-primary mb-1">
                            {insight.title}
                          </p>
                          <p className="text-sm text-text-muted mb-2">
                            {insight.description}
                          </p>
                          <p className="text-xs italic text-text-dim">
                            "{insight.quote}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
