import React from 'react';

const LOGOS = [
  { label: 'GitHub', letter: 'G' },
  { label: 'GitLab', letter: 'GL' },
  { label: 'Laravel', letter: 'L' },
  { label: 'React', letter: 'R' },
  { label: 'Vue', letter: 'V' },
];

export const SocialProof: React.FC = () => {
  return (
    <section className="border-y border-warm-200/50 bg-white py-12">
      <div className="container-wide">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.15em] text-warm-300">
          Trusted by teams worldwide
        </p>
        <div className="flex items-center justify-center gap-12 md:gap-16">
          {LOGOS.map((logo) => (
            <div
              key={logo.label}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-warm-100 text-sm font-bold text-warm-300 md:h-12 md:w-12"
              title={logo.label}
            >
              {logo.letter}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
