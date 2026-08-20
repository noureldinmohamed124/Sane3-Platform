import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, Bot, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import NeedJourneySvg from '../svg/NeedJourneySvg';

export default function HeroSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleScrollToMethod = (e) => {
    e.preventDefault();
    const methodSection = document.getElementById('method');
    if (methodSection) {
      methodSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="py-20 md:py-28 relative z-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
        
        {/* Left text column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
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

          <p className="text-lg text-[var(--ink-soft)] max-w-xl leading-relaxed">
            {t('heroDesc')}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button onClick={() => navigate('/enrollment')}>
              <Sparkles className="w-4 h-4" />
              {t('bookFreeTrial')}
            </Button>
            <Button href="#method" variant="outline" onClick={handleScrollToMethod}>
              <ArrowDown className="w-4 h-4 text-[var(--ink)]" />
              {t('howItWorks')}
            </Button>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--ink-faint)]">
            <span className="text-[var(--blue-accent)] font-bold">✓</span>
            {t('microcopy')}
          </div>
        </motion.div>

        {/* Right Glass Visual Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative pt-6 sm:pt-4"
        >
          {/* Floating Badges */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-3 ltr:-right-4 rtl:-left-4 z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[var(--card-bg)] shadow-xl border border-[var(--line)] text-xs font-semibold text-[var(--ink)]"
          >
            <Bot className="w-4 h-4 text-[var(--orange)]" />
            <span>{t('robotics')}</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-4 ltr:-left-4 rtl:-right-4 z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[var(--card-bg)] shadow-xl border border-[var(--line)] text-xs font-semibold text-[var(--ink)]"
          >
            <Cpu className="w-4 h-4 text-[var(--blue-accent)]" />
            <span>{t('ai')}</span>
          </motion.div>

          {/* Glass Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 relative">
            <div className="absolute -top-4 ltr:left-8 rtl:right-8 bg-[var(--orange)] text-white text-xs font-rakkas px-4 py-1.5 rounded-full shadow-md z-10">
              {t('needJourney')}
            </div>
            <NeedJourneySvg />
            <p className="text-center text-xs text-[var(--ink-soft)] mt-3">
              {t('needJourneyCaption')}
            </p>
            <img src="/sanea-mark.png" alt={t('brand')} className="h-7 w-auto mx-auto mt-4 brand-logo-img" />
          </div>
        </motion.div>

      </div>
    </header>
  );
}
