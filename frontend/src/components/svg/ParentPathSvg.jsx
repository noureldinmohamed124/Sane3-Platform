import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ParentPathSvg() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <svg viewBox="0 0 300 240" width="100%" role="img" aria-label="Student Progression / مسار تطور هوية الطالب">
      {/* Background Line */}
      <line x1="50" y1="185" x2="250" y2="55" stroke="var(--line)" strokeWidth="14" strokeLinecap="round" />

      {/* Progress Circles */}
      <circle cx="50" cy="185" r="8" fill="var(--ink)" />
      <circle cx="100" cy="152.5" r="8" fill="var(--ink)" />
      <circle cx="150" cy="120" r="9" fill="var(--blue-accent)" />
      <circle cx="200" cy="87.5" r="9" fill="var(--orange)" />
      <circle cx="250" cy="55" r="13" fill="var(--orange)" stroke="var(--ink)" strokeWidth="2.5" />

      {/* Perfectly Centered Labels */}
      <text x="50" y="218" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--ink-soft)">
        {isEn ? 'Follower' : 'متابع'}
      </text>

      <text x="250" y="32" textAnchor="middle" fontFamily={isEn ? 'Space Grotesk, sans-serif' : 'Rakkas, serif'} fontSize="20" fontWeight="bold" fill="var(--ink)">
        {isEn ? 'Maker' : 'صانع'}
      </text>
    </svg>
  );
}
