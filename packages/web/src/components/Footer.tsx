import React from 'react';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-[#F5DD9D]/10 bg-[#1a2325] py-12">
      <div className="mx-auto max-w-2xl px-6 text-center">
        {/* Logo mark */}
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#F5DD9D] to-[#92A68A] text-xs font-bold text-[#1a2325] shadow-lg shadow-[#F5DD9D]/20">
            Z
          </span>
          <span className="text-lg font-bold gradient-text">Zentro</span>
        </div>

        <p className="mb-4 text-sm text-[#fbf0d5]/30">
          Transform any website into a cinematic demo video.
        </p>

        <p className="text-xs text-[#fbf0d5]/20">
          &copy; {year} Zentro. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
