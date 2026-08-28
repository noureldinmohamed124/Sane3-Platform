import React from 'react';
import HeroSection from '../../components/hero/HeroSection';
import MarqueeStrip from '../../components/hero/MarqueeStrip';
import AboutSection from '../../components/sections/AboutSection';
import WhatWeDoSection from '../../components/sections/WhatWeDoSection';
import ProgramsSection from '../../components/sections/ProgramsSection';
import ShowcaseSection from '../../components/sections/ShowcaseSection';
import TrialCtaSection from '../../components/hero/TrialCtaSection';

export default function LandingRoute() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      
      {/* 1. احنا مين (Who We Are) */}
      <AboutSection />

      {/* 2. بنعمل إيه (What We Do & 8-Stage Cycle) */}
      <WhatWeDoSection />

      {/* 3. البرامج الأكاديمية (Our Programs & Tracks) */}
      <ProgramsSection />

      {/* 4. إنجازات الطلاب (Student Showcases with Real Project Assets) */}
      <ShowcaseSection />

      {/* Trial CTA Booking */}
      <TrialCtaSection />
    </>
  );
}
