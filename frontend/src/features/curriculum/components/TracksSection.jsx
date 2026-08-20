import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { DEFAULT_TRACKS } from '../../../constants/landingData';
import { useAcademyProgramsQuery } from '../useProgramsQuery';
import { useAppStore } from '../../../store/useAppStore';
import CourseDetailsModal from '../../admissions/components/CourseDetailsModal';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function TracksSection() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const { data: apiPrograms = [] } = useAcademyProgramsQuery();
  const openCourseModal = useAppStore((state) => state.openCourseModal);
  const openTrialModal = useAppStore((state) => state.openTrialModal);

  const tracksToDisplay = apiPrograms.length > 0
    ? apiPrograms.map((p) => ({
        id: p.id,
        tag: p.name,
        title: p.name,
        desc: p.description,
        ageLabel: t('tracks.ageLabel'),
        ageValue: `${p.ageFrom} – ${p.ageTo}`,
        rawProgram: p,
      }))
    : DEFAULT_TRACKS.map((dt) => ({
        id: dt.id,
        tag: dt.tag,
        title: isEn ? dt.titleEn : dt.title,
        desc: isEn ? dt.descEn : dt.desc,
        ageLabel: isEn ? dt.ageLabelEn : dt.ageLabel,
        ageValue: dt.ageValue,
      }));

  const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

  return (
    <section id="tracks" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-14"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--orange-dark)] uppercase tracking-wider mb-2">
            <span className="w-5 h-0.5 bg-[var(--orange)]" />
            {t('tracks.kicker')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-rakkas text-[var(--ink)] leading-tight mb-4">
            {t('tracks.title')}
          </h2>
          <p className="text-[var(--ink-soft)]">
            {t('tracks.desc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracksToDisplay.map((track, idx) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              onClick={() => {
                if (track.rawProgram) {
                  openCourseModal(track.rawProgram);
                } else {
                  openTrialModal();
                }
              }}
              className="group relative rounded-2xl bg-[var(--card-bg)] p-7 shadow-sm border border-[var(--line)] cursor-pointer overflow-hidden transition-all hover:shadow-md"
            >
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[var(--ink)] to-[var(--blue-accent)]" />
              
              <div className="inline-block px-3 py-1 rounded-full bg-[var(--paper-2)] text-xs font-bold text-[var(--ink)] mb-4">
                {track.tag}
              </div>
              
              <h3 className="font-rakkas text-xl text-[var(--ink)] mb-2 group-hover:text-[var(--orange)] transition-colors flex items-center justify-between">
                <span>{track.title}</span>
                <ArrowIcon className="w-5 h-5 opacity-0 ltr:-translate-x-2 rtl:translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--orange)]" />
              </h3>

              <p className="text-sm text-[var(--ink-soft)] mb-6 leading-relaxed">{track.desc}</p>
              
              <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--ink-faint)]">
                <span>{track.ageLabel}</span>
                <span className="en font-semibold text-[var(--ink)]">{track.ageValue}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <CourseDetailsModal />
    </section>
  );
}
