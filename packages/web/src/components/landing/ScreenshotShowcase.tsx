import React from 'react';

const SCREENSHOTS = [
  {
    label: 'Dashboard',
    title: 'Monitor your video pipeline',
    description: 'Track job progress, view completed renders, and manage your video library from a single dashboard.',
  },
  {
    label: 'Video Player',
    title: 'Preview and download instantly',
    description: 'Watch your generated videos in-browser and download HD MP4 files with one click.',
  },
];

export const ScreenshotShowcase: React.FC = () => {
  return (
    <section id="showcase" className="bg-white py-24 md:py-32">
      <div className="container-wide">
        <div className="mb-16 text-center">
          <p className="section-label mb-4">Product</p>
          <h2 className="text-3xl font-bold tracking-tight text-warm-600 md:text-4xl">
            See it in action
          </h2>
        </div>

        <div className="space-y-24">
          {SCREENSHOTS.map((shot, i) => (
            <div
              key={shot.label}
              className={`grid grid-cols-1 gap-12 items-center md:grid-cols-2 ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Text */}
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <p className="section-label mb-3">{shot.label}</p>
                <h3 className="mb-4 text-2xl font-bold text-warm-600">
                  {shot.title}
                </h3>
                <p className="text-warm-300 leading-relaxed">
                  {shot.description}
                </p>
              </div>

              {/* Screenshot placeholder */}
              <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                <div className="aspect-video rounded-card border border-warm-200/50 bg-warm-100 shadow-card overflow-hidden">
                  {/* Mock browser chrome */}
                  <div className="flex items-center gap-2 border-b border-warm-200/50 bg-white px-4 py-3">
                    <span className="h-3 w-3 rounded-full bg-red-300" />
                    <span className="h-3 w-3 rounded-full bg-yellow-300" />
                    <span className="h-3 w-3 rounded-full bg-green-300" />
                  </div>
                  {/* Mock content */}
                  <div className="p-6 space-y-3">
                    <div className="h-4 w-1/3 rounded bg-warm-200/40" />
                    <div className="flex gap-4">
                      <div className="h-20 w-1/3 rounded-lg bg-gradient-to-br from-warm-200/50 to-warm-100" />
                      <div className="h-20 w-1/3 rounded-lg bg-gradient-to-br from-warm-200/50 to-warm-100" />
                      <div className="h-20 w-1/3 rounded-lg bg-gradient-to-br from-warm-200/50 to-warm-100" />
                    </div>
                    <div className="h-32 w-full rounded-lg bg-gradient-to-br from-warm-200/30 to-warm-50" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
