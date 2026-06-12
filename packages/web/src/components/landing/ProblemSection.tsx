import React from 'react';

const PROBLEMS = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Manual screen recording is slow',
    description: 'Recording, editing, and polishing a demo video takes hours — often requiring multiple tools and retakes.',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    ),
    title: 'No consistent brand style',
    description: 'Marketing teams struggle to maintain a cohesive look across product demos without a designer.',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: 'Outsourcing is expensive',
    description: 'Agency-produced videos cost thousands and take weeks — out of reach for most startups.',
  },
];

export const ProblemSection: React.FC = () => {
  return (
    <section className="container-wide py-24 md:py-32">
      <div className="mb-16 text-center">
        <p className="section-label mb-4">The Problem</p>
        <h2 className="text-3xl font-bold tracking-tight text-warm-600 md:text-4xl">
          Creating product demos shouldn&apos;t be this hard
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {PROBLEMS.map((problem) => (
          <div key={problem.title} className="card p-8">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-btn bg-warm-50 text-warm-400">
              {problem.icon}
            </div>
            <h3 className="mb-3 text-lg font-semibold text-warm-600">
              {problem.title}
            </h3>
            <p className="text-sm leading-relaxed text-warm-300">
              {problem.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
