import React from 'react';
import HeroSection from '../../components/hero/HeroSection';
import MarqueeStrip from '../../components/hero/MarqueeStrip';
import MethodSection from '../../features/curriculum/components/MethodSection';
import TracksSection from '../../features/curriculum/components/TracksSection';
import ShowcaseSection from '../../features/evidence/components/ShowcaseSection';
import WorkshopGallerySection from '../../features/students/components/WorkshopGallerySection';
import ParentsSection from '../../features/curriculum/components/ParentsSection';
import TrialCtaSection from '../../components/hero/TrialCtaSection';
import TrialBookingModal from '../../features/admissions/components/TrialBookingModal';

export default function LandingRoute() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <MethodSection />
      <TracksSection />
      <ShowcaseSection />
      <WorkshopGallerySection />
      <ParentsSection />
      <TrialCtaSection />

      <TrialBookingModal />
    </>
  );
}
