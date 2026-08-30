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
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (e, href) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/' + href);
    } else {
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId) || document.querySelector(href);
      if (targetElement) {
        // Adjust for fixed navbar height (80px)
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 flex items-center transition-all duration-300 w-full ${
          scrolled
            ? 'bg-[var(--paper)]/95 backdrop-blur-xl border-b border-[var(--line)] shadow-md'
            : 'bg-[var(--paper)]/85 backdrop-blur-md border-b border-[var(--line)]/50'
        }`}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 w-full flex items-center justify-between gap-2">
          
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center group shrink-0 active:scale-95 transition-transform"
            title="صانع | Sanea"
          >
            <div className="p-1 sm:p-2 rounded-2xl bg-[var(--card-bg)] shadow-xs border border-[var(--line)] group-hover:scale-105 transition-transform flex items-center justify-center">
              <img src="/sanea-mark.png" alt="صانع" className="h-7 sm:h-9 w-auto brand-logo-img object-contain" />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-bold text-[var(--ink-soft)]">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[var(--ink)] relative py-1 transition-colors group cursor-pointer"
              >
                {link.label}
                <span className="absolute bottom-0 w-0 h-0.5 bg-[var(--orange)] transition-all duration-200 group-hover:w-full ltr:left-0 rtl:right-0" />
              </a>
            ))}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="px-2 sm:px-3 py-1 sm:py-2 rounded-xl bg-[var(--card-bg)] border border-[var(--line)] text-[var(--ink)] hover:text-[var(--orange)] active:scale-95 transition-all cursor-pointer shadow-xs text-xs font-bold flex items-center gap-1 min-h-[34px] sm:min-h-[38px]"
              title={lang === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
              aria-label="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[var(--orange)]" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--line)] text-[var(--ink)] hover:text-[var(--orange)] active:scale-95 transition-all cursor-pointer shadow-xs min-h-[34px] sm:min-h-[38px] flex items-center justify-center"
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#FF9A3D]" /> : <Moon className="w-4 h-4 text-[#3B6FD1]" />}
            </button>

            {/* Desktop CTA Button */}
            <div className="hidden sm:block">
              <Button
                size="sm"
                onClick={() => navigate('/enrollment')}
                className="whitespace-nowrap px-4 py-2 text-xs sm:text-sm font-bold shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-white animate-spin-slow shrink-0" />
                <span>{t('bookTrial')}</span>
              </Button>
            </div>

            {/* Mobile Menu Burger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-xl bg-[var(--card-bg)] border border-[var(--line)] text-[var(--ink)] active:scale-95 transition-all cursor-pointer min-h-[34px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-16 right-0 left-0 bg-[var(--card-bg)] border-b border-[var(--line)] px-5 py-5 space-y-2 shadow-2xl z-50 w-full"
            >
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="w-full text-right rtl:text-right ltr:text-left py-3 text-sm font-bold text-[var(--ink)] hover:text-[var(--orange)] active:text-[var(--orange)] transition-colors border-b border-[var(--line)]/40 cursor-pointer block"
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-3">
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/enrollment');
                  }}
                  className="w-full justify-center py-3 text-sm font-bold shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>{t('bookFreeTrial')}</span>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop overlay to close drawer on click outside */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
