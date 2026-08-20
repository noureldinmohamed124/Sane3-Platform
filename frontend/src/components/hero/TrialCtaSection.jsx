import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Sparkles } from 'lucide-react';

export default function TrialCtaSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section id="trial" className="py-20 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#002561] via-[#013584] to-[#002561] dark:from-[#0B1220] dark:via-[#141D30] dark:to-[#0B1220] p-10 sm:p-16 text-center text-white shadow-2xl border border-[var(--line)]"
        >
          {/* Glowing Ambient circles */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-radial from-[#F58220]/40 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-radial from-[#3B6FD1]/40 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-rakkas leading-tight text-white">
              {t('trial.title')}
            </h2>
            <p className="text-base sm:text-lg text-[#C9D4EE] leading-relaxed">
              {t('trial.desc')}
            </p>
            <Button size="lg" onClick={() => navigate('/enrollment')} className="mt-4">
              <Sparkles className="w-5 h-5 text-white" />
              {t('trial.cta')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
