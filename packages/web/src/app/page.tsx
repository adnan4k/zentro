'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { UrlInput } from '@/components/UrlInput';
import { StylePicker, DurationPicker } from '@/components/StylePicker';

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
    <div className="mx-auto max-w-2xl px-6 pb-20">
      {/* Hero */}
      <div className="mb-12 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-white/50">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          Automated video generation
        </div>
        <h1 className="mb-4 text-5xl font-bold tracking-tight">
          Turn any website into a{' '}
          <span className="gradient-text">cinematic demo video</span>
        </h1>
        <p className="text-lg text-white/40 leading-relaxed">
          Paste a URL, pick a style, and get a stunning marketing video in minutes.
          Powered by browser automation and cinematic rendering.
        </p>
      </div>

      {/* Form card */}
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
          className="w-full rounded-xl bg-gradient-to-r from-[#5a5aff] to-[#7c7cff] px-6 py-4 text-lg font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#5a5aff]/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
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

      {/* Features grid */}
      <div className="mt-16 grid grid-cols-3 gap-4">
        {[
          { icon: '🌐', title: 'Any Website', desc: 'Automated capture with smart scrolling' },
          { icon: '🎬', title: '5 Styles', desc: 'Cinematic, Modern, Minimal, Corporate, Tech' },
          { icon: '⚡', title: 'Fast Processing', desc: 'Async pipeline from URL to MP4' },
        ].map((f) => (
          <div key={f.title} className="glass-card p-5 text-center">
            <div className="mb-3 text-2xl">{f.icon}</div>
            <h3 className="mb-1 text-sm font-semibold text-white/80">{f.title}</h3>
            <p className="text-xs text-white/35">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
