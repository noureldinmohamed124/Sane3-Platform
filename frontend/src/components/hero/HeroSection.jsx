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
    <header className="py-16 md:py-24 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
        
        {/* Left text column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[var(--orange-light)] text-[var(--orange)] text-xs sm:text-sm font-semibold border border-[var(--orange)]/30">
            <span className="w-2 h-2 rounded-full bg-[var(--orange)] animate-pulse" />
            {t('heroEyebrow')}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-rakkas leading-tight text-[var(--ink)]">
            {t('heroTitle1')}<br />
            <span className="bg-gradient-to-r from-[var(--ink)] to-[var(--ink-2)] bg-clip-text text-transparent">
              {t('heroTitleHighlight')}
            </span>{' '}
            <span className="text-[var(--orange)]">{t('heroTitle2')}</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--ink-soft)] max-w-xl leading-relaxed">
            {t('heroDesc')}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button onClick={() => navigate('/enrollment')} className="px-6 text-sm sm:text-base shadow-lg">
              <Sparkles className="w-4 h-4" />
              {t('bookFreeTrial')}
            </Button>
            <Button href="#about" variant="outline" onClick={handleScrollToMethod} className="px-6 text-sm sm:text-base">
              <ArrowDown className="w-4 h-4 text-[var(--ink)]" />
              {t('howItWorks')}
            </Button>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--ink-faint)]">
            <span className="text-[var(--blue-accent)] font-bold">✓</span>
            {t('microcopy')}
          </div>
        </motion.div>

        {/* Right Visual Image Column (Optimized WebP with fetchPriority high) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative pt-4 sm:pt-0"
        >
          {/* Floating Badges */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 ltr:-right-3 rtl:-left-3 z-20 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[var(--card-bg)]/95 backdrop-blur-xl shadow-xl border border-[var(--line)] text-xs font-bold text-[var(--ink)]"
          >
            <Bot className="w-4 h-4 text-[var(--orange)]" />
            <span>{isEn ? 'Hands-on Maker Lab' : 'ورش بناء وعمل حقيقية'}</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-5 ltr:-left-3 rtl:-right-3 z-20 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[var(--card-bg)]/95 backdrop-blur-xl shadow-xl border border-[var(--line)] text-xs font-bold text-[var(--ink)]"
          >
            <Sparkles className="w-4 h-4 text-[var(--blue-accent)]" />
            <span>{isEn ? 'Need-First Learning Cycle' : 'من الاحتياج... للصنعة'}</span>
          </motion.div>

          {/* Image Container Frame */}
          <div className="relative rounded-3xl p-2 sm:p-3 bg-gradient-to-tr from-[var(--orange)]/30 via-transparent to-[var(--blue-accent)]/30 border border-[var(--line)] shadow-2xl overflow-hidden group">
            <div className="h-[340px] sm:h-[420px] w-full rounded-2xl overflow-hidden relative bg-[var(--paper-2)]">
              <picture>
                <source srcSet="/images/IMG_9962.webp" type="image/webp" />
                <img
                  src="/images/IMG_9962.jpg"
                  alt="Sanea Maker Workshop"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = '/images/workshops/workshop-2.webp';
                  }}
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Bottom Card Caption */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold font-en tracking-wider text-[var(--orange)]">
                    SANEA LABS
                  </div>
                  <div className="text-sm font-bold">
                    {isEn ? 'Real projects built by real kids' : 'أطفال وطلاب يبنون مشاريع تكنولوجية حقيقية'}
                  </div>
                </div>
                <img src="/sanea-mark.png" alt={t('brand')} className="h-6 w-auto brightness-200" />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </header>
  );
}
