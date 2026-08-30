import React from 'react';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import Navbar from './Navbar';
import Footer from './Footer';
import OrbBackground from '../components/common/OrbBackground';
import ScrollToTop from '../components/common/ScrollToTop';
import ScrollToTopButton from '../components/ui/ScrollToTopButton';
import WhatsAppFloatingButton from '../components/ui/WhatsAppFloatingButton';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col relative bg-[var(--paper)] transition-colors duration-300 w-full max-w-[100vw] overflow-x-hidden">
      <ScrollToTop />
      <OrbBackground />
      <Navbar />
      {/* Top spacer to offset fixed navbar height */}
      <div className="h-16 sm:h-20 w-full shrink-0" aria-hidden="true" />
      
      <main className="flex-1 z-10 w-full max-w-full">
        <Outlet />
      </main>
      
      <Footer />
      {/* Floating Action Buttons */}
      <ScrollToTopButton />
      <WhatsAppFloatingButton />
      <Toaster position="top-center" richColors dir="rtl" />
    </div>
  );
}
