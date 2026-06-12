'use client';

import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -10 }}
    >
      {/* Gold orb — top left */}
      <div
        className="gradient-orb"
        style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(245,221,157,0.25) 0%, transparent 70%)',
          top: '-10%',
          left: '-5%',
          animation: 'float 20s ease-in-out infinite',
        }}
      />

      {/* Sage orb — top right */}
      <div
        className="gradient-orb"
        style={{
          width: 450,
          height: 450,
          background: 'radial-gradient(circle, rgba(188,196,153,0.2) 0%, transparent 70%)',
          top: '30%',
          right: '-5%',
          animation: 'floatSlow 30s ease-in-out infinite',
        }}
      />

      {/* Teal orb — bottom center */}
      <div
        className="gradient-orb"
        style={{
          width: 350,
          height: 350,
          background: 'radial-gradient(circle, rgba(80,98,102,0.2) 0%, transparent 70%)',
          bottom: '10%',
          left: '50%',
          animation: 'floatSlower 35s ease-in-out infinite',
        }}
      />
    </div>
  );
};
