import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { METHOD_STEPS } from '../../../constants/landingData';
import { Target, Puzzle, Settings, Rocket } from 'lucide-react';

const stepIcons = [
  <Target className="w-6 h-6 text-[var(--ink)]" />,
  <Puzzle className="w-6 h-6 text-[var(--ink)]" />,
  <Settings className="w-6 h-6 text-[var(--orange)]" />,
  <Rocket className="w-6 h-6 text-[var(--blue-accent)]" />,
];

export default function MethodSection() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <section id="method" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-14"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--orange-dark)] uppercase tracking-wider mb-2">
            <span className="w-5 h-0.5 bg-[var(--orange)]" />
            {t('method.kicker')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-rakkas text-[var(--ink)] leading-tight mb-4">
            {t('method.title')}
          </h2>
          <p className="text-[var(--ink-soft)]">
            {t('method.desc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METHOD_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-[var(--card-bg)] rounded-2xl p-7 shadow-sm border border-[var(--line)] transition-all hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--paper-2)] flex items-center justify-center mb-5">
                {stepIcons[idx]}
              </div>
              <div className="en text-xs font-bold tracking-wider text-[var(--ink-faint)] mb-2">{step.num}</div>
              <h3 className="font-rakkas text-xl text-[var(--ink)] mb-2">
                {isEn ? step.titleEn : step.title}
              </h3>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                {isEn ? step.descEn : step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
