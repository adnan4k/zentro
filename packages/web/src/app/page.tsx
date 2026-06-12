'use client';

import React from 'react';
import {
  HeroSection,
  SocialProof,
  ProblemSection,
  SolutionSection,
  FeatureGrid,
  ScreenshotShowcase,
  PricingSection,
  FAQSection,
} from '@/components/landing';
import { Footer } from '@/components/layout/Footer';
import { useCreateJob, isValidUrl } from '@/hooks/useCreateJob';

export default function HomePage() {
  const job = useCreateJob();

  return (
    <>
      <HeroSection
        url={job.url}
        onUrlChange={job.setUrl}
        style={job.style}
        onStyleChange={job.setStyle}
        duration={job.duration}
        onDurationChange={job.setDuration}
        isValidUrl={isValidUrl}
        isSubmitting={job.isSubmitting}
        error={job.error}
        onSubmit={job.submit}
      />
      <SocialProof />
      <ProblemSection />
      <SolutionSection />
      <FeatureGrid />
      <ScreenshotShowcase />
      <PricingSection />
      <FAQSection />
      <Footer />
    </>
  );
}
