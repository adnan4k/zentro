'use client';

import React, { useState } from 'react';

const FAQS = [
  {
    question: 'What is Zentro?',
    answer:
      'Zentro is an automated video generation platform that turns any website URL into a cinematic marketing demo video. It uses browser automation to capture your site and render it with professional motion design.',
  },
  {
    question: 'How long does it take to generate a video?',
    answer:
      'Most videos are ready within 2-5 minutes depending on duration and complexity. Our async pipeline captures screenshots, plans scenes, and renders video in parallel for maximum speed.',
  },
  {
    question: 'What formats do you support?',
    answer:
      'All videos are exported as MP4 files at 1080p HD resolution (1920×1080). Pro plans also include 4K output. Videos are optimized for web, social media, and presentations.',
  },
  {
    question: 'Can I customize the video style?',
    answer:
      'Yes! Choose from 5 cinematic styles — Cinematic, Modern, Minimal, Corporate, and Tech. Each has unique motion design, color grading, and transitions tailored to different brand aesthetics.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Absolutely. Every plan starts with a free trial so you can generate your first video and see the quality before committing. No credit card required.',
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-warm-200/50">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-base font-semibold text-warm-600 pr-4">
          {question}
        </span>
        <svg
          className={`h-5 w-5 flex-shrink-0 text-warm-300 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-48 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-sm leading-relaxed text-warm-300">{answer}</p>
      </div>
    </div>
  );
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="container-wide py-24 md:py-32">
      <div className="mb-12 text-center">
        <p className="section-label mb-4">FAQ</p>
        <h2 className="text-3xl font-bold tracking-tight text-warm-600 md:text-4xl">
          Frequently asked questions
        </h2>
      </div>

      <div className="mx-auto max-w-2xl divide-y divide-warm-200/50">
        {FAQS.map((faq, i) => (
          <AccordionItem
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
};
