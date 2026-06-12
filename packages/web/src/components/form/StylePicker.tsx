'use client';

import React from 'react';

const STYLES = [
  {
    id: 'cinematic',
    label: 'Cinematic',
    description: 'Dramatic, epic feel with sweeping motions',
    icon: '🎬',
  },
  {
    id: 'modern',
    label: 'Modern',
    description: 'Sleek and contemporary presentation',
    icon: '✨',
  },
  {
    id: 'minimal',
    label: 'Minimal',
    description: 'Clean, understated, and elegant',
    icon: '◻️',
  },
  {
    id: 'corporate',
    label: 'Corporate',
    description: 'Professional and trustworthy',
    icon: '🏢',
  },
  {
    id: 'tech',
    label: 'Tech',
    description: 'Futuristic and innovation-focused',
    icon: '🚀',
  },
] as const;

interface StylePickerProps {
  value: string;
  onChange: (style: string) => void;
  disabled?: boolean;
}

export const StylePicker: React.FC<StylePickerProps> = ({ value, onChange, disabled }) => {
  return (
    <div className="w-full">
      <label className="mb-3 block text-sm font-medium text-warm-300">Video Style</label>
      <div className="grid grid-cols-5 gap-2">
        {STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onChange(style.id)}
            disabled={disabled}
            className={`flex flex-col items-center gap-2 rounded-btn border p-4 text-center transition-all duration-300 ${
              value === style.id
                ? 'border-warm-400 bg-warm-50 shadow-[0_0_0_3px_rgba(141,121,102,0.1)]'
                : 'border-warm-200 bg-white hover:border-warm-300 hover:bg-warm-50'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span className="text-2xl">{style.icon}</span>
            <span className={`text-sm font-medium ${value === style.id ? 'text-warm-400' : 'text-warm-300'}`}>
              {style.label}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-warm-300">
        {STYLES.find((s) => s.id === value)?.description}
      </p>
    </div>
  );
};

interface DurationPickerProps {
  value: number;
  onChange: (duration: number) => void;
  disabled?: boolean;
}

export const DurationPicker: React.FC<DurationPickerProps> = ({ value, onChange, disabled }) => {
  return (
    <div className="w-full">
      <label className="mb-3 block text-sm font-medium text-warm-300">
        Duration: <span className="text-warm-400 font-semibold">{value}s</span>
      </label>
      <div className="flex items-center gap-4">
        <span className="text-xs text-warm-300">30s</span>
        <input
          type="range"
          min={30}
          max={90}
          step={5}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          disabled={disabled}
          className="flex-1 h-1.5 rounded-full appearance-none bg-warm-200 cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-warm-400
            [&::-webkit-slider-thumb]:shadow-btn
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            disabled:opacity-40"
        />
        <span className="text-xs text-warm-300">90s</span>
      </div>
      <div className="mt-2 flex justify-between text-xs text-warm-200">
        <span>Quick</span>
        <span>Full demo</span>
      </div>
    </div>
  );
};
