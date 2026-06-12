import fs from 'fs';
import path from 'path';
import type { VideoStyle } from '../../api/src/types';

const STYLE_TRACK_MAP: Record<VideoStyle, string[]> = {
  cinematic: ['cinematic-epic.mp3', 'cinematic-inspire.mp3'],
  modern: ['modern-sleek.mp3', 'modern-beat.mp3'],
  minimal: ['minimal-clean.mp3', 'minimal-ambient.mp3'],
  corporate: ['corporate-professional.mp3', 'corporate-trust.mp3'],
  tech: ['tech-futuristic.mp3', 'tech-innovation.mp3'],
};

const FALLBACK_TRACK = 'cinematic-epic.mp3';

export function selectTrack(style: VideoStyle, musicDir: string): string {
  const tracks = STYLE_TRACK_MAP[style] || STYLE_TRACK_MAP['cinematic'];
  const available = tracks.filter((t) => fs.existsSync(path.join(musicDir, t)));

  if (available.length > 0) {
    // Pick randomly from available tracks matching the style
    return path.join(musicDir, available[Math.floor(Math.random() * available.length)]);
  }

  // Fallback: try the fallback track
  const fallbackPath = path.join(musicDir, FALLBACK_TRACK);
  if (fs.existsSync(fallbackPath)) {
    return fallbackPath;
  }

  // Last resort: return any .mp3 in the directory
  try {
    const files = fs.readdirSync(musicDir);
    const mp3 = files.find((f) => f.endsWith('.mp3') || f.endsWith('.wav'));
    if (mp3) return path.join(musicDir, mp3);
  } catch {
    // Directory may not exist
  }

  return '';
}

export function hasMusic(musicDir: string): boolean {
  try {
    const files = fs.readdirSync(musicDir);
    return files.some((f) => f.endsWith('.mp3') || f.endsWith('.wav'));
  } catch {
    return false;
  }
}

/**
 * Returns instructions for setting up music.
 * In a full deployment, this would use ffmpeg to trim/loop the audio.
 * For MVP with Remotion, we pass the audio file path directly and let
 * Remotion's <Audio> component handle looping via loopVolumeCurve.
 */
export function getMusicInstructions(trackPath: string, _durationSec: number): string {
  if (!trackPath || !fs.existsSync(trackPath)) {
    return '';
  }
  // Return the absolute path — Remotion's <Audio> can load local files
  return trackPath;
}
