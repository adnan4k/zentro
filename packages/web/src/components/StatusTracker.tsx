'use client';

import React from 'react';

const STEPS = [
  { key: 'queued', label: 'Queued', icon: '⏳' },
  { key: 'capturing', label: 'Capturing Website', icon: '📸' },
  { key: 'planning', label: 'Planning Scenes', icon: '🎬' },
  { key: 'rendering', label: 'Rendering Video', icon: '🎥' },
  { key: 'completed', label: 'Completed', icon: '✅' },
] as const;

const STEP_ORDER = ['queued', 'capturing', 'planning', 'rendering', 'completed'] as const;

interface StatusTrackerProps {
  status: string;
  progress: number;
}

export const StatusTracker: React.FC<StatusTrackerProps> = ({ status, progress }) => {
  const currentStepIndex = STEP_ORDER.indexOf(status as any);
  const isFailed = status === 'failed';

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-white/60">
            {isFailed ? 'Failed' : status === 'completed' ? 'Complete' : 'Processing'}
          </span>
          <span className="text-sm font-mono text-white/40">{progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              isFailed
                ? 'bg-red-500'
                : status === 'completed'
                  ? 'bg-green-400'
                  : 'bg-gradient-to-r from-[#5a5aff] to-[#9d9dff]'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="relative">
        {STEPS.map((step, i) => {
          const isActive = currentStepIndex >= i;
          const isCurrent = currentStepIndex === i;
          const stepFailed = isFailed && i <= currentStepIndex;

          return (
            <div key={step.key} className="flex items-start gap-4 py-2">
              {/* Step indicator */}
              <div className="relative flex-shrink-0">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all duration-500 ${
                    stepFailed
                      ? 'bg-red-500/20 text-red-400'
                      : isCurrent
                        ? 'bg-[#5a5aff]/20 text-[#5a5aff] ring-2 ring-[#5a5aff]/30 animate-pulse-slow'
                        : isActive
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-white/5 text-white/20'
                  }`}
                >
                  {stepFailed ? '❌' : isActive ? '✓' : step.icon}
                </div>
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div
                    className={`absolute top-8 left-4 h-full w-px transition-colors duration-500 ${
                      isActive && !stepFailed ? 'bg-green-500/30' : 'bg-white/5'
                    }`}
                  />
                )}
              </div>

              {/* Step label */}
              <div className="flex-1 pt-1">
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isCurrent
                      ? 'text-[#5a5aff]'
                      : isActive
                        ? 'text-white/80'
                        : 'text-white/25'
                  }`}
                >
                  {step.label}
                </span>
                {isCurrent && (
                  <span className="ml-2 inline-block text-xs text-[#5a5aff]/60">
                    {status === 'capturing' && 'Scrolling & screenshotting...'}
                    {status === 'planning' && 'Detecting sections...'}
                    {status === 'rendering' && 'Compositing video...'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
