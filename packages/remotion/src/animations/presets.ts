import { interpolate, useCurrentFrame, type SpringConfig } from 'remotion';

export interface AnimationResult {
  transform: string;
  opacity: number;
}

export type AnimationFn = (
  frame: number,
  durationInFrames: number,
  intensity: number
) => AnimationResult;

/**
 * Zoom-in (Ken Burns effect): scale from 1.0 to 1.0 + intensity
 */
export function zoomIn(
  frame: number,
  durationInFrames: number,
  intensity: number = 0.6
): AnimationResult {
  const scale = interpolate(frame, [0, durationInFrames], [1, 1 + intensity * 0.15], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const translateY = interpolate(frame, [0, durationInFrames], [0, -intensity * 3], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const opacity = interpolate(frame, [0, durationInFrames * 0.15], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return {
    transform: `scale(${scale}) translateY(${translateY}%)`,
    opacity,
  };
}

/**
 * Zoom-out: scale from 1.15 to 1.0
 */
export function zoomOut(
  frame: number,
  durationInFrames: number,
  intensity: number = 0.6
): AnimationResult {
  const scale = interpolate(frame, [0, durationInFrames], [1 + intensity * 0.15, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const opacity = interpolate(frame, [0, durationInFrames * 0.15], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return {
    transform: `scale(${scale})`,
    opacity,
  };
}

/**
 * Pan-right: translate from -5% to 0
 */
export function panRight(
  frame: number,
  durationInFrames: number,
  intensity: number = 0.6
): AnimationResult {
  const translateX = interpolate(frame, [0, durationInFrames], [-intensity * 8, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const opacity = interpolate(frame, [0, durationInFrames * 0.2], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return {
    transform: `translateX(${translateX}%)`,
    opacity,
  };
}

/**
 * Pan-left: translate from 5% to 0
 */
export function panLeft(
  frame: number,
  durationInFrames: number,
  intensity: number = 0.6
): AnimationResult {
  const translateX = interpolate(frame, [0, durationInFrames], [intensity * 8, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const opacity = interpolate(frame, [0, durationInFrames * 0.2], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return {
    transform: `translateX(${translateX}%)`,
    opacity,
  };
}

/**
 * Scroll-up: translate from 10% downward to 0
 */
export function scrollUp(
  frame: number,
  durationInFrames: number,
  intensity: number = 0.6
): AnimationResult {
  const translateY = interpolate(frame, [0, durationInFrames], [intensity * 12, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const opacity = interpolate(frame, [0, durationInFrames * 0.2], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return {
    transform: `translateY(${translateY}%)`,
    opacity,
  };
}

/**
 * Fade-in: pure opacity transition with subtle scale
 */
export function fadeIn(
  frame: number,
  durationInFrames: number,
  intensity: number = 0.6
): AnimationResult {
  const opacity = interpolate(frame, [0, durationInFrames * 0.3], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const scale = interpolate(
    frame,
    [0, durationInFrames * 0.3],
    [1 - intensity * 0.05, 1],
    {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    }
  );

  return {
    transform: `scale(${scale})`,
    opacity,
  };
}

/**
 * Get the animation function for a given animation type
 */
export function getAnimationFn(type: string): AnimationFn {
  switch (type) {
    case 'zoom-in':
      return zoomIn;
    case 'zoom-out':
      return zoomOut;
    case 'pan-left':
      return panLeft;
    case 'pan-right':
      return panRight;
    case 'scroll-up':
      return scrollUp;
    case 'fade-in':
    default:
      return fadeIn;
  }
}
