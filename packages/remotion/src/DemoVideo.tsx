import React from 'react';
import { AbsoluteFill, Sequence, Audio, useVideoConfig, staticFile } from 'remotion';
import { SceneRenderer } from './components/SceneRenderer';

interface Scene {
  id: string;
  sectionType: string;
  screenshotPath: string;
  startTime: number;
  endTime: number;
  animation: {
    type: string;
    intensity: number;
  };
  transition: string;
}

interface DemoVideoProps {
  scenes: Scene[];
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  musicPath: string;
}

export const DemoVideo: React.FC<DemoVideoProps> = ({
  scenes,
  durationInFrames,
  fps,
  width,
  height,
  musicPath,
}) => {
  const videoConfig = useVideoConfig();

  if (!scenes || scenes.length === 0) {
    return (
      <AbsoluteFill
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 48,
          fontFamily: 'system-ui, sans-serif',
          fontWeight: 600,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 72, marginBottom: 20 }}>🎬</div>
          <div>Zentro</div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 400,
              opacity: 0.6,
              marginTop: 12,
            }}
          >
            Waiting for scene data...
          </div>
        </div>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {/* Background music */}
      {musicPath && (
        <Audio
          src={musicPath}
          volume={0.25}
          loop
        />
      )}

      {/* Render each scene as a sequence */}
      {scenes.map((scene, index) => {
        const startFrame = Math.round(scene.startTime * fps);
        const endFrame = Math.round(scene.endTime * fps);
        const sceneDurationInFrames = endFrame - startFrame;

        return (
          <React.Fragment key={scene.id}>
            <Sequence
              from={startFrame}
              durationInFrames={sceneDurationInFrames}
              name={`${scene.sectionType}-${index}`}
            >
              <SceneRenderer
                screenshotPath={scene.screenshotPath}
                animationType={scene.animation.type}
                animationIntensity={scene.animation.intensity}
                transition={scene.transition}
                isFirst={index === 0}
              />
            </Sequence>
          </React.Fragment>
        );
      })}

      {/* Title card at the beginning */}
      {scenes.length > 0 && scenes[0].metadata && (
        <Sequence from={0} durationInFrames={Math.round(1.5 * fps)} name="title-card">
          <AbsoluteFill
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
            }}
          >
            <div
              style={{
                color: '#fff',
                fontSize: 36,
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 200,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                opacity: 0.9,
              }}
            >
              {(scenes[0] as any).metadata?.textContent?.split(' ').slice(0, 5).join(' ') ||
                'Welcome'}
            </div>
          </AbsoluteFill>
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
