import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SHOWCASE_PROJECTS } from '../../../constants/landingData';

export default function ShowcaseSection() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <section id="showcase" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-14"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--orange-dark)] uppercase tracking-wider mb-2">
            <span className="w-5 h-0.5 bg-[var(--orange)]" />
            {t('showcase.kicker')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-rakkas text-[var(--ink)] leading-tight mb-4">
            {t('showcase.title')}
          </h2>
          <p className="text-[var(--ink-soft)]">
            {t('showcase.desc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOWCASE_PROJECTS.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-[var(--card-bg)] overflow-hidden shadow-sm border border-[var(--line)] transition-all hover:shadow-xl"
            >
              <div className="h-48 bg-[var(--paper-2)] relative flex items-center justify-center border-b border-[var(--line)]">
                <span className="absolute top-3.5 ltr:right-3.5 rtl:left-3.5 px-3 py-1 rounded-full bg-[var(--card-bg)] text-xs font-bold text-[var(--ink)] shadow-sm border border-[var(--line)] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--blue-accent)]" />
                  {isEn ? proj.statusEn : proj.status}
                </span>
                <span className="text-6xl drop-shadow-md">{proj.icon}</span>
              </div>

              <div className="p-6">
                <div className="inline-block px-3 py-1 rounded-full bg-[var(--orange-light)] text-xs font-bold text-[var(--orange)] mb-3">
                  {proj.tag}
                </div>
                <h3 className="font-rakkas text-xl text-[var(--ink)] mb-2">
                  {isEn ? proj.titleEn : proj.title}
                </h3>
                <p className="text-sm text-[var(--ink-soft)] mb-4 leading-relaxed">
                  {isEn ? proj.descEn : proj.desc}
                </p>
                
                <div className="pt-3 border-t border-[var(--line)] flex items-center gap-2 text-xs text-[var(--ink-faint)]">
                  <span className="w-6 h-6 rounded-full bg-[var(--orange)] text-white font-bold flex items-center justify-center text-[10px]">
                    {proj.makerCount}
                  </span>
                  <span>
                    {isEn
                      ? `${proj.makerCount} ${t('showcase.makerStarted')} "${proj.starterIdeaEn}"`
                      : `${t('showcase.makerStarted')} "${proj.starterIdea}"`}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
