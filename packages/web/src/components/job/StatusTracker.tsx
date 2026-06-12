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
          <span className="text-sm font-medium text-warm-600">
            {isFailed ? 'Failed' : status === 'completed' ? 'Complete' : 'Processing'}
          </span>
          <span className="text-sm font-mono text-warm-300">{progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-warm-100 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              isFailed
                ? 'bg-red-500'
                : status === 'completed'
                  ? 'bg-green-500'
                  : 'bg-warm-400'
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
                      ? 'bg-red-100 text-red-500'
                      : isCurrent
                        ? 'bg-warm-400 text-white ring-4 ring-warm-400/20 animate-pulse'
                        : isActive
                          ? 'bg-green-100 text-green-600'
                          : 'bg-warm-100 text-warm-200'
                  }`}
                >
                  {stepFailed ? '✕' : isActive && !isCurrent ? '✓' : step.icon}
                </div>
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div
                    className={`absolute top-8 left-4 h-full w-px transition-colors duration-500 ${
                      isActive && !stepFailed ? 'bg-green-300' : 'bg-warm-200/60'
                    }`}
                  />
                )}
              </div>

              {/* Step label */}
              <div className="flex-1 pt-1">
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isCurrent
                      ? 'text-warm-600'
                      : isActive
                        ? 'text-warm-400'
                        : 'text-warm-200'
                  }`}
                >
                  {step.label}
                </span>
                {isCurrent && (
                  <span className="ml-2 inline-block text-xs text-warm-300">
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
