import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { LEARNING_CYCLE_STAGES } from '../../constants/landingData';
import { Sparkles, Cpu, Lightbulb, RefreshCw, Layers, Wrench } from 'lucide-react';

export default function WhatWeDoSection() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <section id="method" className="py-20 sm:py-28 px-4 sm:px-6 relative z-10 bg-[var(--paper-2)]/60 border-y border-[var(--line)]">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--orange-light)] text-[var(--orange)] text-xs font-bold font-en uppercase tracking-wider border border-[var(--orange)]/30">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{isEn ? 'WHAT WE DO' : 'بنعمل إيه؟'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--ink)] leading-tight tracking-tight">
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

          <p className="text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed">
            {isEn
              ? 'Instructors never start with "Today we will learn variables". Instead, the student encounters a real challenge, discovers what is missing, learns the exact concept, and immediately builds with it.'
              : 'المدرب في صانع مبيبدأش الحصة بجملة "النهارده هنتعلم المتغيرات". الطالب بيتحط الأول قدام مشكلة حقيقية، يحس بالاحتياج، فيتعلم المفهوم الهندسي ويبني بيه فوراً.'}
          </p>
        </div>

        {/* Real Lab Visual + 8-Stage Learning Cycle Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Workshop Action Photo (WebP with high contrast badge & title) */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden shadow-2xl border border-[var(--line)] relative group h-[380px] sm:h-[480px] bg-[var(--card-bg)]">
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
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 pointer-events-none">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--orange)] text-xs font-extrabold text-white mb-1 shadow-lg">
                <Wrench className="w-4 h-4" />
                <span>{isEn ? 'Inside the Maker Lab' : 'من داخل مختبرات صانع'}</span>
              </div>
              <h4 className="text-base sm:text-lg font-extrabold text-white drop-shadow-lg leading-snug">
                {isEn ? 'Hardware Testing & Live Programming' : 'بناء واختبار الدوائر الإلكترونية والبرمجة الحية'}
              </h4>
            </div>
          </div>

          {/* 8-Stage Cycle Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {LEARNING_CYCLE_STAGES.map((cycle, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="p-4 sm:p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--line)] shadow-sm hover:shadow-md transition-all space-y-2 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-xl bg-[var(--orange)] text-white font-mono text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-mono font-bold text-[var(--ink-faint)] tracking-wider">
                    {cycle.step}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-sm sm:text-base text-[var(--ink)]">
                    {isEn ? cycle.titleEn : cycle.title}
                  </h4>
                  <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                    {cycle.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The 7 Questions Every Student Can Answer */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--card-bg)] border border-[var(--line)] shadow-xl space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--orange)] font-en">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE 7 CRITICAL QUESTIONS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--ink)]">
              {isEn ? 'Questions Every Sanea Student Can Confidently Answer' : 'أسئلة يجيب عنها طالب صانع بثقة في كل حصة'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
            {[
              { q: 'إحنا بنبني إيه النهارده؟', qEn: 'What are we building today?' },
              { q: 'ليه الميزة دي مهمة في المشروع؟', qEn: 'Why does this feature matter?' },
              { q: 'إيه المشكلة اللي بنحلها دلوقتي؟', qEn: 'What problem are we solving?' },
              { q: 'إيه المعرفة اللي احتجناها عشان نحلها؟', qEn: 'What knowledge did we need?' },
              { q: 'أنا اتعلمت إيه واستخدمته إزاي؟', qEn: 'What did I learn and how did I use it?' },
              { q: 'أقدر أستخدم المفهوم ده في مشروع تاني؟', qEn: 'Can I use this concept somewhere else?' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[var(--orange-light)] text-[var(--orange)] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="font-bold text-[var(--ink)]">
                  {isEn ? item.qEn : item.q}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
