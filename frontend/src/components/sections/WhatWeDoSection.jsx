import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { LEARNING_CYCLE_STAGES } from '../../constants/landingData';
import { Sparkles, Lightbulb, Wrench } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export default function WhatWeDoSection() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <section id="method" className="py-10 sm:py-24 px-4 sm:px-6 relative z-10 bg-[var(--paper-2)]/60 border-y border-[var(--line)] overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-16">
        
        {/* Header Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
          className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--orange-light)] text-[var(--orange)] text-xs font-bold font-en uppercase tracking-wider border border-[var(--orange)]/30">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{isEn ? 'WHAT WE DO' : 'بنعمل إيه؟'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--ink)] leading-tight tracking-tight">
            {isEn ? (
              <>
                Concepts are named only after <br />
                <span className="text-[var(--orange)]">the need is truly felt.</span>
              </>
            ) : (
              <>
                مش بنشرح المفهوم الأول. <br />
                <span className="text-[var(--orange)]">بنخلق الاحتياج الحقيقي له.</span>
              </>
            )}
          </h2>

          <p className="text-xs sm:text-base text-[var(--ink-soft)] leading-relaxed">
            {isEn
              ? 'Instructors never start with "Today we will learn variables". Instead, the student encounters a real challenge, discovers what is missing, learns the exact concept, and immediately builds with it.'
              : 'المدرب في صانع مبيبدأش الحصة بجملة "النهارده هنتعلم المتغيرات". الطالب بيتحط الأول قدام مشكلة حقيقية، يحس بالاحتياج، فيتعلم المفهوم الهندسي ويبني بيه فوراً.'}
          </p>
        </motion.div>

        {/* Real Lab Visual + 8-Stage Learning Cycle Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
          {/* Workshop Action Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 rounded-3xl overflow-hidden shadow-xl border border-[var(--line)] relative group h-[260px] sm:h-[460px] bg-[var(--card-bg)]"
          >
            <picture>
              <source srcSet="/images/workshops/workshop-5.webp" type="image/webp" />
              <img
                src="/images/workshops/workshop-5.jpeg"
                alt="Hands-on workshop activity"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white space-y-1.5 pointer-events-none">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--orange)] text-xs font-extrabold text-white mb-1 shadow-md">
                <Wrench className="w-3.5 h-3.5" />
                <span>{isEn ? 'Inside the Maker Lab' : 'من داخل مختبرات صانع'}</span>
              </div>
              <h4 className="text-sm sm:text-lg font-extrabold text-white drop-shadow-md leading-snug">
                {isEn ? 'Hardware Testing & Live Programming' : 'بناء واختبار الدوائر الإلكترونية والبرمجة الحية'}
              </h4>
            </div>
          </motion.div>

          {/* 8-Stage Cycle Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="lg:col-span-7 grid grid-cols-2 gap-2.5 sm:gap-3.5"
          >
            {LEARNING_CYCLE_STAGES.map((cycle, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="p-3 sm:p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--line)] shadow-2xs space-y-1 relative hover:border-[var(--orange)]/60 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-lg bg-[var(--orange)] text-white font-mono text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-[var(--ink-faint)] tracking-wider">
                    {cycle.step}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs sm:text-sm text-[var(--ink)]">
                    {isEn ? cycle.titleEn : cycle.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-[var(--ink-soft)] leading-snug line-clamp-2">
                    {cycle.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* The 7 Questions Every Student Can Answer */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
          className="p-5 sm:p-8 rounded-3xl bg-[var(--card-bg)] border border-[var(--line)] shadow-lg space-y-4"
        >
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 text-xs font-bold text-[var(--orange)] font-en">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE 7 CRITICAL QUESTIONS</span>
            </div>
            <h3 className="text-base sm:text-xl font-extrabold text-[var(--ink)]">
              {isEn ? 'Questions Every Sanea Student Can Confidently Answer' : 'أسئلة يجيب عنها طالب صانع بثقة في كل حصة'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 text-xs sm:text-sm">
            {[
              { q: 'إحنا بنبني إيه النهارده؟', qEn: 'What are we building today?' },
              { q: 'ليه الميزة دي مهمة في المشروع؟', qEn: 'Why does this feature matter?' },
              { q: 'إيه المشكلة اللي بنحلها دلوقتي؟', qEn: 'What problem are we solving?' },
              { q: 'إيه المعرفة اللي احتجناها عشان نحلها؟', qEn: 'What knowledge did we need?' },
              { q: 'أنا اتعلمت إيه واستخدمته إزاي؟', qEn: 'What did I learn and how did I use it?' },
              { q: 'أقدر أستخدم المفهوم ده في مشروع تاني؟', qEn: 'Can I use this concept somewhere else?' },
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[var(--paper-2)] border border-[var(--line)] flex items-start gap-2.5 hover:border-[var(--orange)]/40 transition-colors">
                <span className="w-4 h-4 rounded-full bg-[var(--orange-light)] text-[var(--orange)] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="font-bold text-xs text-[var(--ink)]">
                  {isEn ? item.qEn : item.q}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
