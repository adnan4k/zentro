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
          <span className="text-sm font-medium text-[#fbf0d5]/60">
            {isFailed ? 'Failed' : status === 'completed' ? 'Complete' : 'Processing'}
          </span>
          <span className="text-sm font-mono text-[#fbf0d5]/40">{progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-[#fbf0d5]/5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              isFailed
                ? 'bg-red-500'
                : status === 'completed'
                  ? 'bg-green-400'
                  : 'bg-gradient-to-r from-[#F5DD9D] to-[#92A68A]'
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
                        ? 'bg-[#F5DD9D]/20 text-[#F5DD9D] ring-2 ring-[#F5DD9D]/30 animate-pulse-slow'
                        : isActive
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-[#fbf0d5]/5 text-[#fbf0d5]/20'
                  }`}
                >
                  {stepFailed ? '❌' : isActive ? '✓' : step.icon}
                </div>
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div
                    className={`absolute top-8 left-4 h-full w-px transition-colors duration-500 ${
                      isActive && !stepFailed ? 'bg-green-500/30' : 'bg-[#fbf0d5]/5'
                    }`}
                  />
                )}
              </div>

              {/* Step label */}
              <div className="flex-1 pt-1">
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isCurrent
                      ? 'text-[#F5DD9D]'
                      : isActive
                        ? 'text-[#fbf0d5]/80'
                        : 'text-[#fbf0d5]/25'
                  }`}
                >
                  {step.label}
                </span>
                {isCurrent && (
                  <span className="ml-2 inline-block text-xs text-[#F5DD9D]/60">
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
