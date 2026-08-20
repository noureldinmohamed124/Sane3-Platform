import React from 'react';
import { MARQUEE_ITEMS } from '../../constants/landingData';

export default function MarqueeStrip() {
  const items = [
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
  ];

  return (
    <div className="py-4 sm:py-5 border-y border-[var(--line)] bg-white/40 dark:bg-white/[0.03] overflow-hidden select-none" dir="ltr">
      <div className="animate-marquee-track flex items-center gap-6 sm:gap-12 pr-6 sm:pr-12">
        {/* First Half */}
        {items.map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-2.5 sm:gap-3 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[var(--orange)] shrink-0" />
            <span className="en font-bold text-xs sm:text-sm text-[var(--ink-soft)] tracking-wider whitespace-nowrap">
              {item}
            </span>
          </div>
        ))}

        {/* Second Half (Exact Duplicate for Continuous Loop) */}
        {items.map((item, idx) => (
          <div key={`dup-${idx}`} className="inline-flex items-center gap-2.5 sm:gap-3 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[var(--orange)] shrink-0" />
            <span className="en font-bold text-xs sm:text-sm text-[var(--ink-soft)] tracking-wider whitespace-nowrap">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
