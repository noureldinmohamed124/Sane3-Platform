import React from 'react';
import { useTranslation } from 'react-i18next';

export default function NeedJourneySvg() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <svg viewBox="0 0 380 230" width="100%" role="img" aria-label="The Need Journey / رحلة الاحتياج">
      <defs>
        <marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        </marker>
      </defs>

      {/* Step 1: Project Question */}
      <g>
        <rect x="48" y="16" width="64" height="46" rx="10" fill="var(--card-bg)" stroke="var(--ink)" strokeWidth="1.8" />
        <text x="80" y="45" textAnchor="middle" fontSize="22" fontWeight="bold" fill="var(--ink)">?</text>
        <text x="80" y="76" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink-soft)">
          {isEn ? 'Project' : 'المشروع'}
        </text>
      </g>

      {/* Arrow 1 */}
      <line x1="118" y1="39" x2="143" y2="39" stroke="var(--ink)" strokeWidth="1.6" markerEnd="url(#ah)" />

      {/* Step 2: Discovery / Analysis */}
      <g>
        <circle cx="171" cy="39" r="21" fill="var(--card-bg)" stroke="var(--ink)" strokeWidth="1.8" />
        <path d="M163 33 q8 9 16 0" fill="none" stroke="var(--ink)" strokeWidth="1.6" />
        <circle cx="163" cy="34" r="2.2" fill="var(--ink)" />
        <circle cx="179" cy="34" r="2.2" fill="var(--ink)" />
        <text x="171" y="76" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink-soft)">
          {isEn ? 'Gap Analysis' : 'تحليل الفجوة'}
        </text>
      </g>

      {/* Arrow 2 */}
      <line x1="198" y1="39" x2="223" y2="39" stroke="var(--ink)" strokeWidth="1.6" markerEnd="url(#ah)" />

      {/* Step 3: Spark of Curiosity */}
      <g>
        <circle cx="251" cy="39" r="20" fill="var(--orange)" stroke="var(--ink)" strokeWidth="1.8" />
        <text x="251" y="47" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#fff">!</text>
        <text x="251" y="76" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--orange)">
          {isEn ? 'Spark' : 'شرارة الحماس'}
        </text>
      </g>

      {/* Vertical Dashed Connectors */}
      <line x1="171" y1="84" x2="171" y2="108" stroke="var(--ink)" strokeWidth="1.2" strokeDasharray="3 3" />
      <line x1="251" y1="84" x2="251" y2="108" stroke="var(--ink)" strokeWidth="1.2" strokeDasharray="3 3" />

      {/* Middle Row: Practical Practice & Timely Knowledge */}
      <g>
        {/* Practice Box */}
        <rect x="98" y="110" width="76" height="42" rx="10" fill="var(--card-bg)" stroke="var(--ink)" strokeWidth="1.8" />
        <text x="136" y="135" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">
          {isEn ? 'Practice' : 'تطبيق عملي'}
        </text>

        {/* Knowledge Box */}
        <rect x="188" y="110" width="145" height="42" rx="10" fill="var(--orange-light)" fillOpacity="0.4" stroke="var(--orange)" strokeWidth="1.6" strokeDasharray="4 3" />
        <text x="260" y="135" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--orange)">
          {isEn ? 'Just-in-Time Knowledge' : 'المعرفة بتيجي وقتها بالظبط'}
        </text>
      </g>

      {/* Arrow Down to Completion */}
      <line x1="136" y1="152" x2="136" y2="172" stroke="var(--ink)" strokeWidth="1.6" markerEnd="url(#ah)" />

      {/* Final Step: Completed Maker Product */}
      <g>
        <rect x="86" y="174" width="100" height="40" rx="10" fill="var(--blue-accent)" fillOpacity="0.14" stroke="var(--blue-accent)" strokeWidth="1.8" />
        <path d="M102 194 l6 6 12 -12" fill="none" stroke="var(--blue-accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <text x="145" y="198" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">
          {isEn ? 'Craft' : 'صنعة'}
        </text>
      </g>
    </svg>
  );
}
