import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { WORKSHOP_SLOTS } from '../../../constants/landingData';
import { Plus } from 'lucide-react';

export default function WorkshopGallerySection() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <section id="students" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-14"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--orange-dark)] uppercase tracking-wider mb-2">
            <span className="w-5 h-0.5 bg-[var(--orange)]" />
            {t('students.kicker')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-rakkas text-[var(--ink)] leading-tight mb-4">
            {t('students.title')}
          </h2>
          <p className="text-[var(--ink-soft)]">
            {t('students.desc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[160px]">
          {WORKSHOP_SLOTS.map((slot, idx) => (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className={`rounded-2xl overflow-hidden border border-[var(--line)] bg-[var(--card-bg)] p-4 flex flex-col items-center justify-center text-center text-xs text-[var(--ink-faint)] transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer ${
                slot.span > 1 ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[var(--paper-2)] shadow-sm flex items-center justify-center text-[var(--ink)] mb-2">
                <Plus className="w-5 h-5 text-[var(--orange)]" />
              </div>
              <span className="font-medium text-[var(--ink-soft)]">
                {isEn ? slot.titleEn : slot.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
