'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { StatusTracker } from '@/components/StatusTracker';
import { VideoPlayer } from '@/components/VideoPlayer';

interface JobData {
  id: string;
  url: string;
  style: string;
  duration: number;
  status:
    | 'queued'
    | 'capturing'
    | 'planning'
    | 'rendering'
    | 'completed'
    | 'failed';
  progress: number;
  createdAt: string;
  outputPath?: string;
  sceneData?: Array<{
    id: string;
    sectionType: string;
    startTime: number;
    endTime: number;
    animation: { type: string };
    metadata: { textContent: string };
  }>;
  error?: string;
}

export default function JobPage() {
  const params = useParams();
  const jobId = params.id as string;

  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchJob = useCallback(async () => {
    try {
      const res = await fetch(`/api/jobs/${jobId}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data: JobData = await res.json();
      setJob(data);

      // Stop polling when job reaches a terminal state
      if (data.status === 'completed' || data.status === 'failed') {
        setLoading(false);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [jobId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let stopped = false;

    const poll = async () => {
      if (stopped) return;
      const isTerminal = await fetchJob();
      setLoading(false);
      if (!isTerminal && !stopped) {
        interval = setTimeout(poll, 2000); // Poll every 2s
      }
    };

    poll();

    return () => {
      stopped = true;
      clearTimeout(interval);
    };
  }, [fetchJob]);

  if (loading && !job) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <div className="glass-card p-12">
          <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-[#F5DD9D]/10 border-t-[#F5DD9D]" />
          <p className="text-[#fbf0d5]/50">Loading job status...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <div className="glass-card p-12">
          <div className="mb-4 text-4xl">🔍</div>
          <h2 className="mb-2 text-xl font-semibold">Job Not Found</h2>
          <p className="mb-6 text-[#fbf0d5]/40">This job may have been removed or never existed.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-[#fbf0d5]/10 px-5 py-2.5 text-sm font-medium text-[#fbf0d5] transition-all hover:bg-[#fbf0d5]/15"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 pb-20">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[#fbf0d5]/40 hover:text-[#fbf0d5]/70 transition-colors mb-4"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          New Video
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">
          {job.status === 'completed'
            ? 'Your video is ready!'
            : job.status === 'failed'
              ? 'Video generation failed'
              : 'Generating your video'}
        </h1>
        <div className="mt-2 flex items-center gap-3 text-sm text-[#fbf0d5]/40">
          <span className="truncate max-w-md">{job.url}</span>
          <span className="rounded border border-white/10 px-2 py-0.5 text-xs capitalize">
            {job.style}
          </span>
          <span className="text-xs">{job.duration}s</span>
        </div>
      </div>

      {/* Main content */}
      <div className="space-y-6">
        {/* Status tracker */}
        {job.status !== 'completed' && job.status !== 'failed' && (
          <div className="glass-card p-6">
            <StatusTracker status={job.status} progress={job.progress} />
          </div>
        )}

        {/* Error state */}
        {job.status === 'failed' && (
          <div className="glass-card border-red-500/20 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-500/10 text-lg">
                ❌
              </div>
              <div>
                <h3 className="font-semibold text-red-400">Generation Failed</h3>
                <p className="mt-1 text-sm text-[#fbf0d5]/50">{job.error || 'An unknown error occurred.'}</p>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg bg-[#fbf0d5]/10 px-5 py-2.5 text-sm font-medium text-[#fbf0d5] transition-all hover:bg-[#fbf0d5]/15"
              >
                Try Again
              </Link>
            </div>
          </div>
        )}

        {/* Completed: Video player */}
        {job.status === 'completed' && (
          <div className="glass-card p-6">
            <VideoPlayer videoUrl={`/api/jobs/${job.id}/video`} jobId={job.id} />
          </div>
        )}

        {/* Scene info (after completion) */}
        {job.status === 'completed' && job.sceneData && (
          <div className="glass-card p-6">
            <h3 className="mb-4 text-sm font-semibold text-[#fbf0d5]/60 uppercase tracking-wider">
              Scene Breakdown
            </h3>
            <div className="space-y-2">
              {job.sceneData.map((scene, i) => (
                <div
                  key={scene.id}
                  className="flex items-center gap-4 rounded-lg bg-[#fbf0d5]/[0.02] px-4 py-3 border border-[#F5DD9D]/5"
                >
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded bg-[#F5DD9D]/10 text-xs font-mono text-[#F5DD9D]">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-[#fbf0d5]/70 capitalize">
                      {scene.sectionType}
                    </span>
                    <span className="ml-2 text-xs text-[#fbf0d5]/30 truncate">
                      — {scene.metadata.textContent?.substring(0, 60)}
                    </span>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className="text-xs font-mono text-[#fbf0d5]/40">
                      {scene.startTime}s–{scene.endTime}s
                    </span>
                    <span className="ml-2 rounded border border-[#F5DD9D]/10 px-1.5 py-0.5 text-xs text-[#fbf0d5]/30">
                      {scene.animation.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Job metadata */}
        <div className="text-center text-xs text-[#fbf0d5]/15">
          Job ID: {job.id} · Created: {new Date(job.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
