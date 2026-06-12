import React from 'react';
import { useCurrentFrame, useVideoConfig, Img, AbsoluteFill } from 'remotion';
import { getAnimationFn } from '../animations/presets';

interface SceneRendererProps {
  screenshotPath: string;
  animationType: string;
  animationIntensity: number;
  transition: string;
  isFirst: boolean;
}

export const SceneRenderer: React.FC<SceneRendererProps> = ({
  screenshotPath,
  animationType,
  animationIntensity,
  transition,
  isFirst,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const animationFn = getAnimationFn(animationType);
  const { transform, opacity } = animationFn(frame, durationInFrames, animationIntensity);

  return (
    <AbsoluteFill
      style={{
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background blur layer for depth */}
      <Img
        src={screenshotPath}
        style={{
          position: 'absolute',
          width: '110%',
          height: '110%',
          objectFit: 'cover',
          filter: 'blur(40px) brightness(0.3)',
          transform: 'scale(1.2)',
          opacity: 0.6,
        }}
      />

      {/* Main screenshot with animation */}
      <div
        style={{
          position: 'relative',
          width: '92%',
          height: '88%',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          transform,
          opacity,
        }}
      >
        <Img
          src={screenshotPath}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Subtle vignette overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.5) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Progress bar at bottom */}
      {!isFirst && (
        <div
          style={{
            position: 'absolute',
            bottom: '8%',
            left: '15%',
            right: '15%',
            height: '2px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${(frame / durationInFrames) * 100}%`,
              background: 'rgba(255,255,255,0.6)',
              borderRadius: '2px',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};
