'use client';

import React from 'react';

const STEPS = [
  {
    number: '1',
    title: 'Paste a URL',
    description: 'Enter any website URL — our engine captures it with smart scrolling.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  },
  {
    number: '2',
    title: 'Choose a Style',
    description: 'Pick from 5 cinematic styles — the AI plans scenes to match your brand.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Get Your Video',
    description: 'Download a polished MP4 demo video — ready to share in minutes.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <div className="mt-20">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-tight">
          How It{' '}
          <span className="gradient-text">Works</span>
        </h2>
        <p className="text-sm text-[#fbf0d5]/40">
          Three simple steps from URL to cinematic demo video
        </p>
      </div>

      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
        {/* Connecting line — desktop only */}
        <div className="absolute top-10 left-[20%] right-[20%] hidden md:block">
          <div className="h-px w-full bg-gradient-to-r from-[#F5DD9D]/5 via-[#F5DD9D]/20 to-[#F5DD9D]/5" />
        </div>

        {STEPS.map((step) => (
          <div key={step.number} className="relative flex flex-col items-center text-center">
            {/* Numbered circle */}
            <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#F5DD9D]/20 bg-[#F5DD9D]/10 text-[#F5DD9D] shadow-lg shadow-[#F5DD9D]/5">
              {step.icon}
            </div>
            <h3 className="mb-2 text-base font-semibold text-[#fbf0d5]/80">
              {step.title}
            </h3>
            <p className="max-w-xs text-sm leading-relaxed text-[#fbf0d5]/40">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
