import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SHOWCASE_PROJECTS } from '../../constants/landingData';
import { Sparkles, Trophy, User, ShieldCheck } from 'lucide-react';

export default function ShowcaseSection() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <section id="showcase" className="py-20 sm:py-28 px-4 sm:px-6 relative z-10 bg-[var(--paper-2)]/50 border-y border-[var(--line)]">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--orange-light)] text-[var(--orange)] text-xs font-bold font-en uppercase tracking-wider border border-[var(--orange)]/30">
            <Trophy className="w-3.5 h-3.5" />
            <span>{isEn ? 'STUDENT SHOWCASE' : 'إنجازات ومشاريع الطلاب'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-rakkas text-[var(--ink)] leading-tight">
            {isEn ? (
              <>
                Not ideas on paper. <br />
                <span className="text-[var(--orange)]">Working Products Built by Hands.</span>
              </>
            ) : (
              <>
                مش أفكار على ورق. <br />
                <span className="text-[var(--orange)]">منتجات شغالة بنتها أيادي طلابنا.</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed">
            {isEn
              ? 'Every project started with a student asking "What problem do I need to solve?" and ended with a fully functional hardware or software prototype.'
              : 'كل مشروع بدأ بسؤال حقيقي: "إيه المشكلة اللي محتاجين نحلها؟" وانتهى بمنتج تكنولوجي متكامل موثق في جواز سفر الطالب.'}
          </p>
        </div>

        {/* Showcase Grid (Optimized WebP images with lazy loading) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SHOWCASE_PROJECTS.map((proj) => {
            const webpSrc = proj.image.replace(/\.(jpeg|jpg|png)$/i, '.webp');
            return (
              <motion.div
                key={proj.id}
                whileHover={{ y: -6 }}
                className="rounded-3xl bg-[var(--card-bg)] border border-[var(--line)] shadow-xl overflow-hidden flex flex-col justify-between group hover:border-[var(--orange)]/60 transition-all"
              >
                {/* Project Image Box */}
                <div className="h-56 sm:h-64 w-full overflow-hidden relative bg-[var(--paper-2)]">
                  <picture>
                    <source srcSet={webpSrc} type="image/webp" />
                    <img
                      src={proj.image}
                      alt={isEn ? proj.titleEn : proj.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = '/images/workshops/workshop-1.webp';
                      }}
                    />
                  </picture>
                  <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
                    <span className="px-3.5 py-1.5 rounded-xl bg-[var(--card-bg)]/90 backdrop-blur-md border border-[var(--line)] text-xs font-bold text-[var(--ink)] shadow-md">
                      {proj.track}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
                        {isEn ? proj.titleEn : proj.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--orange)] bg-[var(--orange-light)]/40 px-2.5 py-1 rounded-lg">
                        <User className="w-3.5 h-3.5" />
                        {isEn ? proj.studentNameEn : proj.studentName}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed">
                      {isEn ? proj.problemEn : proj.problem}
                    </p>
                  </div>

                  {/* Tech Stack & Evidence Badge */}
                  <div className="space-y-3 pt-4 border-t border-[var(--line)]">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tools.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-[var(--paper-2)] text-[11px] font-mono font-semibold text-[var(--ink-soft)] border border-[var(--line)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-green-600 dark:text-green-400">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>{isEn ? proj.evidenceBadgeEn : proj.evidenceBadge}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
