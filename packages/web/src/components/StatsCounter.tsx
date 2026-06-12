'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';

interface Stat {
  target: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { target: 500, suffix: '+', label: 'Videos Generated' },
  { target: 5, suffix: '', label: 'Cinematic Styles' },
  { target: 99, suffix: '%', label: 'Satisfaction Rate' },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const { ref, isInView } = useInView();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 2000;

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export const StatsCounter: React.FC = () => {
  const { ref, isInView } = useInView();

  return (
    <div ref={ref} className="mt-16">
      <p className="mb-8 text-center text-sm font-medium text-[#fbf0d5]/40 uppercase tracking-widest">
        Trusted by teams worldwide
      </p>
      <div className="grid grid-cols-3 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className={`glass-card p-6 text-center transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="mb-1 text-3xl font-bold gradient-text">
              <AnimatedNumber target={stat.target} suffix={stat.suffix} />
            </div>
            <p className="text-xs text-[#fbf0d5]/40">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
