import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, Link } from 'react-router';
import { Button } from '../components/ui/button';
import { useAppStore } from '../store/useAppStore';
import { Sparkles, Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const lang = useAppStore((state) => state.lang);
  const toggleLang = useAppStore((state) => state.toggleLang);

  const navLinks = [
    { href: '#about', label: t('nav.about') },
    { href: '#method', label: t('nav.method') },
    { href: '#programs', label: t('nav.programs') },
    { href: '#showcase', label: t('nav.showcase') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/' + href);
    } else {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 h-20 flex items-center transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--paper)]/90 backdrop-blur-xl border-b border-[var(--line)] shadow-xs'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between gap-2">
        
        {/* Brand Logo & Name */}
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
        >
          <div className="p-1.5 rounded-xl bg-[var(--card-bg)] shadow-xs border border-[var(--line)] group-hover:scale-105 transition-transform flex items-center justify-center">
            <img src="/sanea-mark.png" alt={t('brand')} className="h-7 sm:h-8 w-auto brand-logo-img" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-extrabold text-xl sm:text-2xl text-[var(--ink)] leading-none mb-0.5 tracking-tight">{t('brand')}</span>
            <span className="text-[9px] sm:text-[10px] text-[var(--ink-faint)] font-mono tracking-wider">{t('subBrand')}</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-[var(--ink-soft)]">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-[var(--ink)] relative py-1 transition-colors group"
            >
              {link.label}
              <span className="absolute bottom-0 w-0 h-0.5 bg-[var(--orange)] transition-all duration-200 group-hover:w-full ltr:left-0 rtl:right-0" />
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Language Switcher Button */}
          <button
            onClick={toggleLang}
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-[var(--card-bg)] border border-[var(--line)] text-[var(--ink)] hover:text-[var(--orange)] transition-colors cursor-pointer shadow-xs text-xs font-bold flex items-center gap-1"
            title={lang === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
            aria-label="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-[var(--orange)]" />
            <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--line)] text-[var(--ink)] hover:text-[var(--orange)] transition-colors cursor-pointer shadow-xs"
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#FF9A3D]" /> : <Moon className="w-4 h-4 text-[#3B6FD1]" />}
          </button>

          {/* CTA Button */}
          <Button
            size="sm"
            onClick={() => navigate('/enrollment')}
            className="whitespace-nowrap px-3.5 sm:px-4 text-xs sm:text-sm font-bold shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-spin-slow shrink-0" />
            <span className="hidden xs:inline">{t('bookTrial')}</span>
            <span className="xs:hidden">{lang === 'ar' ? 'احجز' : 'Book'}</span>
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[var(--card-bg)] border border-[var(--line)] text-[var(--ink)]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-20 right-0 left-0 bg-[var(--card-bg)]/98 backdrop-blur-xl border-b border-[var(--line)] px-6 py-5 space-y-4 shadow-xl"
          >
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block py-2.5 text-base font-bold text-[var(--ink)] hover:text-[var(--orange)] transition-colors border-b border-[var(--line)]"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2">
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/enrollment');
                }}
                className="w-full justify-center py-3 text-base font-bold shadow-md"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>{t('bookFreeTrial')}</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
