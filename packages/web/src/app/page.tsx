'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { UrlInput } from '@/components/UrlInput';
import { StylePicker, DurationPicker } from '@/components/StylePicker';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { ScrollReveal } from '@/components/ScrollReveal';
import { StatsCounter } from '@/components/StatsCounter';
import { HowItWorks } from '@/components/HowItWorks';
import { Footer } from '@/components/Footer';

/* ───────── SVG icon constants (replaces emoji) ───────── */

const GlobeIcon = (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);

const FilmIcon = (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625h1.5a1.125 1.125 0 001.125-1.125m-2.625 0V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-2.625 0A1.125 1.125 0 0118 13.125v1.5m2.625-2.625c-.621 0-1.125.504-1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875A1.125 1.125 0 0016.875 12M18 10.875c.621 0 1.125-.504 1.125-1.125M16.875 12A1.125 1.125 0 0018 13.125M6 13.125c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125M6 13.125A1.125 1.125 0 014.875 12M18 13.125c0 .621.504 1.125 1.125 1.125M7.125 15.75h9.75m-9.75 0A1.125 1.125 0 016 16.875M7.125 15.75C6.504 15.75 6 16.254 6 16.875m11.25 0c0 .621-.504 1.125-1.125 1.125M18 16.875c0 .621-.504 1.125-1.125 1.125M6 16.875A1.125 1.125 0 004.875 18" />
  </svg>
);

const BoltIcon = (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

/* ───────── Feature card data ───────── */

const FEATURES = [
  { icon: GlobeIcon, title: 'Any Website', desc: 'Automated capture with smart scrolling' },
  { icon: FilmIcon, title: '5 Styles', desc: 'Cinematic, Modern, Minimal, Corporate, Tech' },
  { icon: BoltIcon, title: 'Fast Processing', desc: 'Async pipeline from URL to MP4' },
];

/* ───────── Page component ───────── */

export default function HomePage() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [style, setStyle] = useState('cinematic');
  const [duration, setDuration] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isValidUrl = useCallback((value: string) => {
    if (!value) return false;
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }, []);

  const handleSubmit = async () => {
    if (!isValidUrl(url)) return;

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, style, duration }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create job');
      }

      const { id } = await res.json();
      router.push(`/jobs/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      <div className="mx-auto max-w-2xl px-6 pb-20">
        {/* ═══════ Hero ═══════ */}
        <div className="mb-12 text-center">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F5DD9D]/10 bg-[#F5DD9D]/[0.03] px-4 py-1.5 text-xs text-[#F5DD9D]/60 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#BCC499] animate-pulse" />
            Automated video generation
          </div>

          <h1
            className="mb-4 text-5xl font-bold tracking-tight animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Turn any website into a{' '}
            <span className="gradient-text">cinematic demo video</span>
          </h1>

          <p
            className="text-lg text-[#fbf0d5]/50 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            Paste a URL, pick a style, and get a stunning marketing video in minutes.
            Powered by browser automation and cinematic rendering.
          </p>
        </div>

        {/* ═══════ Form card ═══════ */}
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="glass-card p-8 space-y-8">
            <UrlInput
              value={url}
              onChange={setUrl}
              onSubmit={handleSubmit}
              isValid={isValidUrl(url)}
              isSubmitting={isSubmitting}
            />

            <StylePicker value={style} onChange={setStyle} disabled={isSubmitting} />

            <DurationPicker value={duration} onChange={setDuration} disabled={isSubmitting} />

            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!isValidUrl(url) || isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-[#F5DD9D] to-[#92A68A] px-6 py-4 text-lg font-semibold text-[#1a2325] transition-all duration-300 hover:shadow-xl hover:shadow-[#F5DD9D]/25 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
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
                  Creating job...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>Generate Demo Video</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ═══════ Stats Counter ═══════ */}
        <ScrollReveal delay={100}>
          <StatsCounter />
        </ScrollReveal>

        {/* ═══════ Features grid ═══════ */}
        <ScrollReveal delay={200}>
          <div className="mt-16">
            <p className="mb-8 text-center text-sm font-medium text-[#fbf0d5]/40 uppercase tracking-widest">
              Why Zentro
            </p>
            <div className="grid grid-cols-3 gap-4">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="glass-card p-5 text-center group"
                >
                  <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#F5DD9D]/10 text-[#F5DD9D] group-hover:bg-[#F5DD9D]/20 group-hover:scale-110 transition-all duration-300">
                    {f.icon}
                  </div>
                  <h3 className="mb-1 text-sm font-semibold text-[#fbf0d5]/80 group-hover:text-[#fbf0d5] transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs text-[#fbf0d5]/40">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ═══════ How It Works ═══════ */}
        <ScrollReveal delay={300}>
          <HowItWorks />
        </ScrollReveal>
      </div>

      {/* ═══════ Footer ═══════ */}
      <Footer />
    </div>
  );
}
