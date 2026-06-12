'use client';

import React, { useState } from 'react';

const PLANS = [
  {
    name: 'Starter',
    description: 'For individuals getting started',
    monthlyPrice: 19,
    yearlyPrice: 15,
    features: [
      '5 videos per month',
      'All 5 cinematic styles',
      'Up to 60s duration',
      'HD 1080p output',
      'Email support',
    ],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    name: 'Pro',
    description: 'For growing teams and agencies',
    monthlyPrice: 49,
    yearlyPrice: 39,
    features: [
      '25 videos per month',
      'All 5 cinematic styles',
      'Up to 90s duration',
      'HD 1080p output',
      'Priority rendering',
      'Custom music',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Team',
    description: 'For larger organizations',
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: [
      'Unlimited videos',
      'All 5 cinematic styles',
      'Up to 120s duration',
      'HD 1080p + 4K output',
      'Fastest rendering',
      'Custom music + voiceover',
      'Dedicated support',
      'Team dashboard',
      'API access',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="container-wide py-24 md:py-32">
      <div className="mb-12 text-center">
        <p className="section-label mb-4">Pricing</p>
        <h2 className="text-3xl font-bold tracking-tight text-warm-600 md:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mt-4 text-warm-300">
          Start free. Upgrade when you need more.
        </p>
      </div>

      {/* Toggle */}
      <div className="mb-12 flex items-center justify-center gap-4">
        <span className={`text-sm font-medium ${!isYearly ? 'text-warm-600' : 'text-warm-300'}`}>
          Monthly
        </span>
        <button
          onClick={() => setIsYearly(!isYearly)}
          className={`relative h-7 w-12 rounded-full transition-colors ${
            isYearly ? 'bg-warm-400' : 'bg-warm-200'
          }`}
        >
          <span
            className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
              isYearly ? 'translate-x-[22px]' : 'translate-x-0.5'
            }`}
          />
        </button>
        <span className={`text-sm font-medium ${isYearly ? 'text-warm-600' : 'text-warm-300'}`}>
          Yearly
          <span className="ml-1.5 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
            Save 20%
          </span>
        </span>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`card p-8 flex flex-col ${
              plan.highlighted
                ? 'ring-2 ring-warm-400 shadow-card-hover scale-[1.02]'
                : ''
            }`}
          >
            <h3 className="mb-1 text-xl font-bold text-warm-600">{plan.name}</h3>
            <p className="mb-6 text-sm text-warm-300">{plan.description}</p>

            <div className="mb-8">
              <span className="text-4xl font-extrabold text-warm-600">
                ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
              </span>
              <span className="text-warm-300">/mo</span>
            </div>

            <ul className="mb-8 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-warm-300">
                  <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={`w-full rounded-btn py-3 text-sm font-semibold transition-all ${
                plan.highlighted
                  ? 'bg-warm-400 text-white shadow-btn hover:bg-warm-500 hover:shadow-card-hover'
                  : 'border border-warm-200 text-warm-400 hover:bg-warm-50'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
