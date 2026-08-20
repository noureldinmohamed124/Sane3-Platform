import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PARENT_POINTS, PARENT_POINTS_EN } from '../../../constants/landingData';
import ParentPathSvg from '../../../components/svg/ParentPathSvg';

export default function ParentsSection() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const points = isEn ? PARENT_POINTS_EN : PARENT_POINTS;

  return (
    <section id="parents" className="py-24 relative z-10 bg-gradient-to-b from-transparent via-[var(--paper-2)]/30 to-transparent">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: isEn ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--orange-dark)] uppercase tracking-wider mb-2">
            <span className="w-5 h-0.5 bg-[var(--orange)]" />
            {t('parents.kicker')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-rakkas text-[var(--ink)] leading-tight mb-8">
            {t('parents.title')}
          </h2>

          <div className="space-y-4">
            {points.map((point, idx) => (
              <div key={idx} className="flex gap-4 p-4 rounded-xl border border-[var(--line)] bg-[var(--card-bg)] backdrop-blur-sm shadow-xs">
                <span className="w-7 h-7 rounded-lg bg-[var(--paper-2)] text-[var(--ink)] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <p className="text-sm text-[var(--ink)] leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[var(--card-bg)] rounded-3xl p-8 shadow-md border border-[var(--line)]"
        >
          <ParentPathSvg />
        </motion.div>
      </div>
    </section>
  );
}
