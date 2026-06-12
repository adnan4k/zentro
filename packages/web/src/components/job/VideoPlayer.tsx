'use client';

import React, { useState, useRef } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  jobId: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, jobId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = `zentro-${jobId}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full">
      {/* Video container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-card border border-warm-200/50 bg-black shadow-card group">
        <video
          ref={videoRef}
          src={videoUrl}
          className="h-full w-full object-contain"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          controls
          poster="/zentro-poster.png"
        />

        {/* Custom overlay when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 group-hover:opacity-100">
            <button
              onClick={handlePlay}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-warm-400/95 text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-warm-500 hover:scale-110"
            >
              <svg className="ml-1.5 h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Controls bar */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={isPlaying ? handlePause : handlePlay}
            className="flex h-10 w-10 items-center justify-center rounded-btn border border-warm-200 bg-white text-warm-400 transition-all hover:bg-warm-50 hover:text-warm-500"
          >
            {isPlaying ? (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="ml-0.5 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <span className="text-sm text-warm-300">HD 1080p · MP4</span>
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 rounded-btn bg-warm-400 px-5 py-2.5 text-sm font-semibold text-white shadow-btn transition-all hover:bg-warm-500 hover:shadow-card-hover active:scale-95"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download MP4
        </button>
      </div>
    </div>
  );
};
