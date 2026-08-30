import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Sparkles, CalendarCheck } from 'lucide-react';

export default function TrialCtaSection() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <section id="trial" className="py-12 sm:py-20 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-[var(--line)] p-8 sm:p-16 text-center text-white bg-[#001845]"
        >
          {/* Workshop Background Image with clear, vibrant visibility */}
          <picture>
            <source srcSet="/images/IMG_9962.webp" type="image/webp" />
            <img
              src="/images/IMG_9962.jpg"
              alt="Sanea Lab Activity"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-65 scale-105 pointer-events-none filter contrast-110"
            />
          </picture>

          {/* Balanced gradient overlay so both photo and text are crystal clear */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#001438]/95 via-[#001e54]/75 to-[#001438]/85 dark:from-[#070C16]/95 dark:via-[#0E1726]/80 dark:to-[#070C16]/90 pointer-events-none" />

          {/* Glowing Ambient circles */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-radial from-[#F58220]/50 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-radial from-[#3B6FD1]/50 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F58220]/30 text-[#FFB067] border border-[#F58220]/50 text-xs font-extrabold font-en shadow-sm">
              <CalendarCheck className="w-4 h-4 text-[var(--orange)]" />
              <span>{isEn ? 'FREE TRIAL SESSION' : 'حصة تجريبية مجانية بالكامل'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white tracking-tight drop-shadow-md">
              {t('trial.title')}
            </h2>
            <p className="text-xs sm:text-base lg:text-lg text-[#E2E8F8] leading-relaxed font-semibold drop-shadow">
              {t('trial.desc')}
            </p>
            <div className="pt-2">
              <Button size="lg" onClick={() => navigate('/enrollment')} className="px-8 py-3.5 text-sm sm:text-base font-extrabold shadow-xl">
                <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
                {t('trial.cta')}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
