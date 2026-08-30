import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, Bot } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';

export default function HeroSection() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const handleScrollToMethod = (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="py-8 sm:py-16 md:py-20 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-16 items-center">
        
        {/* Left text column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="space-y-4 sm:space-y-6 text-center lg:text-start"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--orange-light)] text-[var(--orange)] text-xs sm:text-sm font-bold border border-[var(--orange)]/30 mx-auto lg:mx-0 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[var(--orange)] animate-pulse" />
            <span>{t('heroEyebrow')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-[var(--ink)] tracking-tight">
            {t('heroTitle1')}<br />
            <span className="text-[var(--ink)]">
              {t('heroTitleHighlight')}
            </span>{' '}
            <span className="text-[var(--orange)]">{t('heroTitle2')}</span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-[var(--ink-soft)] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
            {t('heroDesc')}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
            <Button
              onClick={() => navigate('/enrollment')}
              className="px-6 sm:px-8 py-3 text-sm sm:text-base font-bold shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>{t('bookFreeTrial')}</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleScrollToMethod}
              className="px-6 sm:px-8 py-3 text-sm sm:text-base font-bold"
            >
              <ArrowDown className="w-4 h-4 text-[var(--orange)]" />
              <span>{t('howItWorks')}</span>
            </Button>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-[var(--ink-faint)] pt-1">
            <span className="text-[var(--blue-accent)] font-bold">✓</span>
            <span>{t('microcopy')}</span>
          </div>
        </motion.div>

        {/* Right Visual Image Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative pt-2 sm:pt-0 max-w-md sm:max-w-lg mx-auto w-full"
        >
          {/* Floating Badges */}
          <div className="absolute -top-3 ltr:right-2 rtl:left-2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--card-bg)]/95 backdrop-blur-xl shadow-lg border border-[var(--line)] text-[11px] sm:text-xs font-bold text-[var(--ink)]">
            <Bot className="w-3.5 h-3.5 text-[var(--orange)]" />
            <span>{isEn ? 'Hands-on Maker Lab' : 'ورش بناء وعمل حقيقية'}</span>
          </div>

          <div className="absolute -bottom-3 ltr:left-2 rtl:right-2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--card-bg)]/95 backdrop-blur-xl shadow-lg border border-[var(--line)] text-[11px] sm:text-xs font-bold text-[var(--ink)]">
            <Sparkles className="w-3.5 h-3.5 text-[var(--blue-accent)]" />
            <span>{isEn ? 'Need-First Learning' : 'من الاحتياج... للصنعة'}</span>
          </div>

          {/* Image Container Frame */}
          <div className="relative rounded-3xl p-2 bg-gradient-to-tr from-[var(--orange)]/30 via-transparent to-[var(--blue-accent)]/30 border border-[var(--line)] shadow-2xl overflow-hidden group">
            <div className="h-[280px] sm:h-[380px] w-full rounded-2xl overflow-hidden relative bg-[var(--paper-2)]">
              <picture>
                <source srcSet="/images/IMG_9962.webp" type="image/webp" />
                <img
                  src="/images/IMG_9962.jpg"
                  alt="Sanea Maker Workshop"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = '/images/workshops/workshop-2.webp';
                  }}
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              
              {/* Bottom Card Caption */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-bold font-en tracking-wider text-[var(--orange)]">
                    SANEA LABS
                  </div>
                  <div className="text-xs sm:text-sm font-bold">
                    {isEn ? 'Real projects built by real kids' : 'أطفال وطلاب يبنون مشاريع تكنولوجية حقيقية'}
                  </div>
                </div>
                <img src="/sanea-mark.png" alt={t('brand')} className="h-6 w-auto brand-logo-img" />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </header>
  );
}
