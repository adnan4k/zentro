'use client';

import React, { useState } from 'react';

interface UrlInputProps {
  value: string;
  onChange: (url: string) => void;
  onSubmit: () => void;
  isValid: boolean;
  isSubmitting: boolean;
}

export const UrlInput: React.FC<UrlInputProps> = ({
  value,
  onChange,
  onSubmit,
  isValid,
  isSubmitting,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValid && !isSubmitting) {
      onSubmit();
    }
  };

  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-[#fbf0d5]/60">
        Website URL
      </label>
      <div
        className={`flex items-center gap-3 rounded-xl border px-5 py-4 transition-all duration-300 ${
          isFocused
            ? 'border-[#F5DD9D] bg-[#F5DD9D]/[0.06] shadow-lg shadow-[#F5DD9D]/10'
            : 'border-[#F5DD9D]/10 bg-[#F5DD9D]/[0.02]'
        } ${!isValid && value ? 'border-red-500/50' : ''}`}
      >
        <svg
          className={`h-5 w-5 flex-shrink-0 ${value ? 'text-[#F5DD9D]' : 'text-[#F5DD9D]/20'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="https://example.com"
          className="flex-1 bg-transparent text-lg text-[#fbf0d5] placeholder-[#fbf0d5]/20 outline-none"
          autoComplete="url"
          disabled={isSubmitting}
        />
        {value && isValid && (
          <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      {value && !isValid && (
        <p className="mt-2 text-xs text-red-400">Please enter a valid URL (e.g., https://example.com)</p>
      )}
    </div>
  );
};
