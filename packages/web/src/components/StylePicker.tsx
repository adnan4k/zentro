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
      <label className="mb-3 block text-sm font-medium text-white/60">Video Style</label>
      <div className="grid grid-cols-5 gap-2">
        {STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onChange(style.id)}
            disabled={disabled}
            className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all duration-300 ${
              value === style.id
                ? 'border-[#5a5aff] bg-[#5a5aff]/10 shadow-lg shadow-[#5a5aff]/10 scale-[1.02]'
                : 'border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span className="text-2xl">{style.icon}</span>
            <span className={`text-sm font-medium ${value === style.id ? 'text-white' : 'text-white/60'}`}>
              {style.label}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-white/30">
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
      <label className="mb-3 block text-sm font-medium text-white/60">
        Duration: <span className="text-white">{value}s</span>
      </label>
      <div className="flex items-center gap-4">
        <span className="text-xs text-white/30">30s</span>
        <input
          type="range"
          min={30}
          max={90}
          step={5}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          disabled={disabled}
          className="flex-1 h-1.5 rounded-full appearance-none bg-white/10 cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-[#5a5aff]
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:shadow-[#5a5aff]/30
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            disabled:opacity-40"
        />
        <span className="text-xs text-white/30">90s</span>
      </div>
      <div className="mt-2 flex justify-between text-xs text-white/20">
        <span>Quick</span>
        <span>Full demo</span>
      </div>
    </div>
  );
};
