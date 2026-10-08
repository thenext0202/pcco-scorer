import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import BeforeAfter from "@/components/BeforeAfter";
import WhatYouLearn from "@/components/WhatYouLearn";
import FrameworkCards from "@/components/FrameworkCards";
import USP from "@/components/USP";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import CourseDetail from "@/components/CourseDetail";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <div className="section-divider max-w-6xl mx-auto" />
      <PainPoints />
      <div className="section-divider max-w-6xl mx-auto" />
      <BeforeAfter />
      <div className="section-divider max-w-6xl mx-auto" />
      <WhatYouLearn />
      <div className="section-divider max-w-6xl mx-auto" />
      <FrameworkCards />
      <div className="section-divider max-w-6xl mx-auto" />
      <USP />
      <div className="section-divider max-w-6xl mx-auto" />
      <FAQ />
      <div className="section-divider max-w-6xl mx-auto" />
      <CTA />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-1" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-2" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-3" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-4" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-5" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-6" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-7" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-8" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-9" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-10" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-11" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-12" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-13" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-14" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-15" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-16" />
      <div className="section-divider max-w-6xl mx-auto" />
      <CourseDetail courseId="course-17" />

      {/* Footer — 실습 앱 링크 (작게) */}
      <footer className="py-10 px-6 text-center">
        <a
          href="/practice"
          className="text-xs text-text-muted/60 hover:text-accent-primary underline underline-offset-4 transition-colors"
        >
          실습 앱 사용하기
        </a>
      </footer>
    </main>
  );
}
