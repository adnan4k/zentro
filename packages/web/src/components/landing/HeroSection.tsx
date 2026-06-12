'use client';

import React from 'react';
import { StylePicker, DurationPicker } from '@/components/form/StylePicker';

interface HeroSectionProps {
  url: string;
  onUrlChange: (url: string) => void;
  style: string;
  onStyleChange: (style: string) => void;
  duration: number;
  onDurationChange: (duration: number) => void;
  isValidUrl: (url: string) => boolean;
  isSubmitting: boolean;
  error: string;
  onSubmit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  url,
  onUrlChange,
  style,
  onStyleChange,
  duration,
  onDurationChange,
  isValidUrl,
  isSubmitting,
  error,
  onSubmit,
}) => {
  const valid = isValidUrl(url);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && valid && !isSubmitting) {
      onSubmit();
    }
  };

  return (
    <section className="container-wide pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
        {/* Left — headline + inline form */}
        <div>
          <h1 className="mb-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-warm-600 md:text-6xl">
            Turn any website into
            <br />
            <span className="text-warm-400">videos in minutes</span>
          </h1>

          <p className="mb-10 max-w-md text-base leading-relaxed text-warm-300">
            Go from URL to finished video. No cameras, no crew, no editing skills
            required. Paste a link and get a cinematic marketing demo — complete
            with motion, transitions, and music.
          </p>

          {/* Inline input + embedded CTA */}
          <div id="hero-form" className="max-w-xl">
            <div
              className={`flex items-center gap-2 rounded-full border bg-white p-1.5 pl-5 shadow-card transition-all ${
                url && !valid ? 'border-red-300' : 'border-warm-200 focus-within:border-warm-400'
              }`}
            >
              <svg
                className={`h-5 w-5 flex-shrink-0 ${url ? 'text-warm-400' : 'text-warm-200'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>
              <input
                type="url"
                value={url}
                onChange={(e) => onUrlChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="https://yoursite.com"
                className="min-w-0 flex-1 bg-transparent text-base text-warm-600 placeholder-warm-200 outline-none"
                autoComplete="url"
                disabled={isSubmitting}
              />
              <button
                onClick={onSubmit}
                disabled={!valid || isSubmitting}
                className="flex-shrink-0 whitespace-nowrap rounded-full bg-warm-400 px-6 py-3 text-sm font-semibold text-white shadow-btn transition-all hover:bg-warm-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle
                        className="opacity-25"
                        cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Creating...
                  </span>
                ) : (
                  'Generate for free'
                )}
              </button>
            </div>

            {url && !valid && (
              <p className="mt-2 pl-5 text-xs text-red-500">
                Please enter a valid URL (e.g., https://example.com)
              </p>
            )}

            {error && (
              <div className="mt-3 rounded-card border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Compact customization */}
            <details className="group mt-5">
              <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-warm-300 transition-colors hover:text-warm-400 [&::-webkit-details-marker]:hidden">
                <svg
                  className="h-4 w-4 transition-transform group-open:rotate-90"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                Customize style &amp; duration
              </summary>
              <div className="mt-4 space-y-6 rounded-card border border-warm-200/50 bg-white p-5">
                <StylePicker value={style} onChange={onStyleChange} disabled={isSubmitting} />
                <DurationPicker value={duration} onChange={onDurationChange} disabled={isSubmitting} />
              </div>
            </details>
          </div>
        </div>

        {/* Right — tilted media collage */}
        <div className="relative hidden md:block">
          <div className="relative mx-auto aspect-square max-w-[460px]">
            {/* Back tile */}
            <div className="absolute right-0 top-0 h-[55%] w-[60%] rotate-6 overflow-hidden rounded-card border border-warm-200/50 bg-gradient-to-br from-warm-200 to-warm-100 shadow-card-hover">
              <div className="flex items-center gap-1.5 border-b border-warm-200/50 bg-white/60 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-red-300" />
                <span className="h-2 w-2 rounded-full bg-yellow-300" />
                <span className="h-2 w-2 rounded-full bg-green-300" />
              </div>
              <div className="space-y-2 p-4">
                <div className="h-4 w-2/3 rounded bg-white/70" />
                <div className="h-2.5 w-full rounded bg-white/50" />
                <div className="h-2.5 w-4/5 rounded bg-white/50" />
                <div className="mt-3 h-16 rounded-lg bg-white/40" />
              </div>
            </div>

            {/* Middle tile — dark browser mock */}
            <div className="absolute left-0 top-[18%] h-[52%] w-[64%] -rotate-3 overflow-hidden rounded-card border border-[#334155] bg-[#1E293B] shadow-card-hover">
              <div className="flex items-center gap-1.5 border-b border-[#334155] bg-[#0F172A] px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                <span className="h-2 w-2 rounded-full bg-yellow-400" />
                <span className="h-2 w-2 rounded-full bg-green-400" />
                <span className="ml-2 h-2.5 w-24 rounded bg-[#334155]" />
              </div>
              <div className="space-y-2 p-4">
                <div className="h-4 w-3/4 rounded bg-[#334155]" />
                <div className="h-2.5 w-full rounded bg-[#334155]/60" />
                <div className="h-2.5 w-5/6 rounded bg-[#334155]/60" />
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="aspect-video rounded bg-gradient-to-br from-warm-400/30 to-warm-200/20" />
                  <div className="aspect-video rounded bg-gradient-to-br from-warm-300/30 to-warm-100/20" />
                </div>
              </div>
            </div>

            {/* Front tile — video player */}
            <div className="absolute bottom-0 right-[8%] h-[48%] w-[58%] rotate-2 overflow-hidden rounded-card border border-warm-200/50 bg-warm-600 shadow-card-hover">
              <div className="relative h-full bg-gradient-to-br from-warm-500 to-warm-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-warm-500 shadow-xl transition-transform hover:scale-105">
                    <svg className="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>
                {/* Progress bar */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="h-1 rounded-full bg-white/20">
                    <div className="h-full w-1/3 rounded-full bg-white/80" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute left-[6%] bottom-[10%] -rotate-3 rounded-full border border-warm-200/50 bg-white px-4 py-2 text-xs font-semibold text-warm-400 shadow-card">
              ✦ Rendering in 1080p
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
