"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, CheckCircle2, Lightbulb, Target, ChevronDown, Quote } from "lucide-react";
import { courses, courseDetails } from "@/data/content";
import { useState } from "react";

interface CourseDetailProps {
  courseId: string;
}

export default function CourseDetail({ courseId }: CourseDetailProps) {
  const [isOpen, setIsOpen] = useState(false);
  const course = courses.find((c) => c.id === courseId);
  const detail = courseDetails.find((d) => d.id === courseId) as any;

  if (!course || !detail) return null;

  return (
    <section id={courseId} className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Toggle Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full glass-card p-4 sm:p-6 md:p-8 rounded-2xl hover:border-accent-primary/50 transition-all duration-300 text-left group"
        >
          <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="px-3 py-1 rounded-full bg-accent-primary/20 border border-accent-primary/30 whitespace-nowrap">
                  <span className="text-accent-primary font-bold text-xs sm:text-sm">
                    {course.framework}
                  </span>
                </div>
                <span className="text-text-dim text-xs sm:text-sm whitespace-nowrap">
                  {course.duration} · {course.level}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 gradient-text break-words">
                {courseId === "course-1" ? "1차 강의 복습하기" : "2차 강의 복습하기"}
              </h2>
              <p className="text-sm sm:text-base text-text-secondary break-words">{course.title} - {course.subtitle}</p>
            </div>
            <div className="flex-shrink-0">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent-primary/20 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-accent-primary" />
              </div>
            </div>
          </div>
        </motion.button>

        {/* Content - Only shown when open - 화이트 배경 */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden mt-6"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 space-y-8 sm:space-y-10 md:space-y-12 text-gray-900">
                {/* Hero Message */}
                {detail.heroMessage && (
                  <div className="border-l-4 border-accent-primary pl-4 sm:pl-6 py-2">
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 italic break-words leading-snug">
                      "{detail.heroMessage}"
                    </p>
                  </div>
                )}

                {/* Promises */}
                {detail.promises && (
                  <div className="bg-accent-primary/5 rounded-xl p-4 sm:p-6 border-2 border-accent-primary/20">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 flex items-center gap-2">
                      <Target className="w-5 h-5 sm:w-6 sm:h-6 text-accent-primary flex-shrink-0" />
                      <span className="break-words">이 강의 후 달라지는 3가지</span>
                    </h3>
                    <div className="space-y-3">
                      {detail.promises.map((promise: string, index: number) => (
                        <div key={index} className="flex items-start gap-2 sm:gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-primary text-white flex items-center justify-center text-sm font-bold mt-0.5">
                            {index + 1}
                          </span>
                          <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words">{promise}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Before/After Example */}
                {detail.beforeAfterExample && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {detail.beforeAfterExample.title}
                    </h3>
                    {detail.beforeAfterExample.subtitle && (
                      <p className="text-gray-600 mb-4">{detail.beforeAfterExample.subtitle}</p>
                    )}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                        <div className="font-bold text-red-700 mb-3">{detail.beforeAfterExample.before.label}</div>
                        <div className="bg-white rounded p-4 mb-3 border border-red-100">
                          <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">{detail.beforeAfterExample.before.prompt}</pre>
                        </div>
                        <div className="text-sm text-red-600 italic">→ {detail.beforeAfterExample.before.result}</div>
                      </div>
                      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                        <div className="font-bold text-green-700 mb-3">{detail.beforeAfterExample.after.label}</div>
                        <div className="bg-white rounded p-4 mb-3 border border-green-100">
                          <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">{detail.beforeAfterExample.after.prompt}</pre>
                        </div>
                        <div className="text-sm text-green-600 italic font-semibold">→ {detail.beforeAfterExample.after.result}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="border-t-2 border-gray-200"></div>

                {/* Parts */}
                <div className="space-y-16">
                  {detail.parts?.map((part: any, partIndex: number) => (
                    <div key={partIndex}>
                      {/* Part Title */}
                      <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-gray-300">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent-primary text-white flex items-center justify-center">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">
                          {part.title}
                        </h3>
                      </div>

                      {/* Part Intro (if exists) */}
                      {part.intro && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 rounded-r-xl">
                          <h4 className="text-xl font-bold text-gray-900 mb-3">{part.intro.subtitle}</h4>
                          <p className="text-gray-700 mb-3">{part.intro.text}</p>
                          {part.intro.missing && (
                            <ul className="space-y-2 mb-3">
                              {part.intro.missing.map((item: string, i: number) => (
                                <li key={i} className="text-gray-600 flex items-start gap-2">
                                  <span className="text-yellow-600">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {part.intro.result && (
                            <p className="text-gray-700 italic bg-white p-3 rounded border border-yellow-200">
                              → {part.intro.result}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Part Content */}
                      <div className="space-y-8">
                        {part.content?.map((item: any, itemIndex: number) => (
                          <div
                            key={itemIndex}
                            className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                          >
                            <h4 className="text-xl font-bold text-gray-900 mb-3">
                              {item.subtitle}
                            </h4>

                            {item.quote && (
                              <div className="bg-accent-primary/10 border-l-4 border-accent-primary p-4 rounded-r mb-4">
                                <p className="text-gray-800 italic font-medium">"{item.quote}"</p>
                              </div>
                            )}

                            <p className="text-gray-700 leading-relaxed mb-4">
                              {item.text}
                            </p>

                            {item.details && Array.isArray(item.details) && (
                              <ul className="space-y-2 mb-4 ml-4">
                                {item.details.map((detail: string, i: number) => (
                                  <li key={i} className="text-gray-700 flex items-start gap-2">
                                    <span className="text-accent-primary font-bold">•</span>
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {item.details2 && Array.isArray(item.details2) && (
                              <ul className="space-y-2 mb-4 ml-4">
                                {item.details2.map((detail: string, i: number) => (
                                  <li key={i} className="text-gray-700 flex items-start gap-2">
                                    <span className="text-accent-primary font-bold">•</span>
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {item.questions && Array.isArray(item.questions) && (
                              <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg mb-4">
                                <div className="text-sm text-indigo-600 font-semibold mb-2">목적을 뽑아내는 3가지 질문</div>
                                <ul className="space-y-2">
                                  {item.questions.map((q: string, i: number) => (
                                    <li key={i} className="text-gray-700 flex items-start gap-2">
                                      <span className="text-indigo-600 font-bold">{i + 1}.</span>
                                      <span>{q}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {item.dimensions && Array.isArray(item.dimensions) && (
                              <div className="space-y-2 mb-4">
                                {item.dimensions.map((dim: any, i: number) => (
                                  <div key={i} className="bg-blue-50 border border-blue-200 p-3 rounded">
                                    <span className="font-semibold text-blue-700">{dim.label}: </span>
                                    <span className="text-gray-700">{dim.question} — {dim.example}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {item.constraints && Array.isArray(item.constraints) && (
                              <ul className="space-y-2 mb-4 ml-4">
                                {item.constraints.map((c: string, i: number) => (
                                  <li key={i} className="text-gray-700 flex items-start gap-2">
                                    <span className="text-accent-primary font-bold">•</span>
                                    <span>{c}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {item.formats && Array.isArray(item.formats) && (
                              <ul className="space-y-2 mb-4 ml-4">
                                {item.formats.map((f: string, i: number) => (
                                  <li key={i} className="text-gray-700 flex items-start gap-2">
                                    <span className="text-accent-primary font-bold">•</span>
                                    <span>{f}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {item.platforms && Array.isArray(item.platforms) && (
                              <ul className="space-y-2 mb-4 ml-4">
                                {item.platforms.map((p: string, i: number) => (
                                  <li key={i} className="text-gray-700 flex items-start gap-2">
                                    <span className="text-purple-600 font-bold">→</span>
                                    <span>{p}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {item.beforeAfter && (
                              <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-red-50 border border-red-200 p-4 rounded">
                                  <div className="text-sm font-semibold text-red-600 mb-2">Before</div>
                                  <p className="text-gray-700">{item.beforeAfter.before}</p>
                                </div>
                                <div className="bg-green-50 border border-green-200 p-4 rounded">
                                  <div className="text-sm font-semibold text-green-600 mb-2">After</div>
                                  <p className="text-gray-700">{item.beforeAfter.after}</p>
                                </div>
                              </div>
                            )}

                            {item.template && (
                              <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg mb-4 font-mono text-sm">
                                <pre className="whitespace-pre-wrap text-gray-800">{item.template}</pre>
                              </div>
                            )}

                            {item.oneline && (
                              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
                                <div className="text-sm text-blue-600 font-semibold mb-2">한 줄 압축형</div>
                                <p className="text-gray-700 italic">{item.oneline}</p>
                              </div>
                            )}

                            {item.principles && Array.isArray(item.principles) && (
                              <ul className="space-y-2 mb-4 ml-4">
                                {item.principles.map((p: string, i: number) => (
                                  <li key={i} className="text-gray-700 flex items-start gap-2">
                                    <span className="text-green-600 font-bold">✓</span>
                                    <span>{p}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {item.conclusion && (
                              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r mb-4">
                                <p className="text-gray-700 italic">{item.conclusion}</p>
                              </div>
                            )}

                            {item.signal && (
                              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r mb-4">
                                <p className="text-gray-700 font-semibold">📌 신호: {item.signal}</p>
                              </div>
                            )}

                            {item.comparison && Array.isArray(item.comparison) && (
                              <ul className="space-y-2 mb-4 ml-4">
                                {item.comparison.map((c: string, i: number) => (
                                  <li key={i} className="text-gray-700 flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">→</span>
                                    <span>{c}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {item.analogy && typeof item.analogy === 'object' && (
                              <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg mb-4">
                                <div className="text-sm text-purple-600 font-semibold mb-2">{item.analogy.title || '비유'}</div>
                                {item.analogy.items && Array.isArray(item.analogy.items) && (
                                  <ul className="space-y-2 mb-2">
                                    {item.analogy.items.map((a: string, i: number) => (
                                      <li key={i} className="text-gray-700 flex items-start gap-2">
                                        <span className="text-purple-600">•</span>
                                        <span>{a}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                                {item.analogy.conclusion && (
                                  <p className="text-gray-700 italic mt-2 border-t border-purple-200 pt-2">{item.analogy.conclusion}</p>
                                )}
                              </div>
                            )}

                            {item.quote2 && (
                              <div className="bg-accent-primary/10 border-l-4 border-accent-primary p-4 rounded-r mb-4">
                                <p className="text-gray-800 italic font-medium">"{item.quote2}"</p>
                              </div>
                            )}

                            {item.formula && (
                              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
                                <div className="text-sm text-blue-600 font-semibold mb-1">공식</div>
                                <code className="text-gray-800 font-mono text-sm">{item.formula}</code>
                              </div>
                            )}

                            {item.analogy && typeof item.analogy === 'string' && (
                              <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg mb-4">
                                <div className="text-sm text-purple-600 font-semibold mb-2">비유</div>
                                <p className="text-gray-700 italic">{item.analogy}</p>
                              </div>
                            )}

                            {item.tip && (
                              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r mb-4">
                                <div className="flex items-start gap-2">
                                  <Lightbulb className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                  <p className="text-sm text-gray-700">
                                    <span className="font-semibold text-green-700">💡 Tip: </span>
                                    {item.tip}
                                  </p>
                                </div>
                              </div>
                            )}

                            {item.example && typeof item.example === 'string' && !item.table && (
                              <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                                <div className="text-sm text-indigo-600 font-semibold mb-2">예시</div>
                                <p className="text-gray-700">{item.example}</p>
                              </div>
                            )}

                            {item.table && (
                              <div className="overflow-x-auto mt-4">
                                <div className="text-sm font-semibold text-gray-600 mb-2">{item.table.title}</div>
                                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                                  <tbody>
                                    {item.table.rows.map((row: any, rowIndex: number) => (
                                      <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        {Object.values(row).map((cell: any, cellIndex: number) => (
                                          <td key={cellIndex} className={`p-3 border border-gray-200 ${cellIndex === 0 ? 'font-semibold bg-gray-100' : ''}`}>
                                            {cell}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Conclusion */}
                {detail.conclusion && (
                  <div className="bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 border-2 border-accent-primary/30 rounded-2xl p-8 text-center">
                    <Quote className="w-12 h-12 text-accent-primary mx-auto mb-4" />
                    <div className="whitespace-pre-line text-gray-800 text-lg leading-relaxed font-medium">
                      {detail.conclusion}
                    </div>
                  </div>
                )}

                {/* Challenge */}
                {detail.challenge && (
                  <div className="bg-accent-primary text-white rounded-2xl p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                        <Target className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3">
                          🎯 도전 과제
                        </h3>
                        <p className="leading-relaxed text-lg opacity-95">
                          {detail.challenge}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* FAQs */}
                {detail.faqs && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">자주 나오는 질문 (FAQ)</h3>
                    <div className="space-y-4">
                      {detail.faqs.map((faq: any, index: number) => (
                        <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                          <div className="font-bold text-gray-900 mb-2">Q. {faq.q}</div>
                          <div className="text-gray-700">A. {faq.a}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
