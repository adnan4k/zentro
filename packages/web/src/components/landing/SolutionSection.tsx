import React from 'react';

const STEPS = [
  {
    number: '1',
    title: 'Connect',
    description: 'Paste any website URL. Our engine captures it with smart scrolling and full-page screenshots.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  },
  {
    number: '2',
    title: 'Analyze',
    description: 'AI analyzes the page structure, picks key scenes, and plans the perfect cinematic sequence.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Generate',
    description: 'Download a polished MP4 video — complete with motion, transitions, and background music.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export const SolutionSection: React.FC = () => {
  return (
    <section id="how-it-works" className="bg-white py-24 md:py-32">
      <div className="container-wide">
        <div className="mb-16 text-center">
          <p className="section-label mb-4">How It Works</p>
          <h2 className="text-3xl font-bold tracking-tight text-warm-600 md:text-4xl">
            Three steps from URL to video
          </h2>
        </div>

        {/* Vertical timeline */}
        <div className="relative mx-auto max-w-2xl">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-warm-200 md:left-1/2 md:-translate-x-px" />

          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`relative flex items-start gap-8 pb-16 last:pb-0 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Numbered circle — centered on the line */}
              <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-4 border-white bg-warm-400 text-white shadow-card md:mx-auto md:absolute md:left-1/2 md:-translate-x-1/2">
                {step.icon}
              </div>

              {/* Content card — offset on desktop */}
              <div className={`pt-2 md:w-[calc(50%-48px)] ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <span className="inline-block mb-2 text-sm font-bold text-warm-400">
                  Step {step.number}
                </span>
                <h3 className="mb-2 text-xl font-semibold text-warm-600">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-warm-300">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
