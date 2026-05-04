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
    </main>
  );
}
