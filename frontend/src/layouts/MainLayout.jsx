import React from 'react';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import Navbar from './Navbar';
import Footer from './Footer';
import OrbBackground from '../components/common/OrbBackground';
import ScrollToTop from '../components/common/ScrollToTop';
import ScrollToTopButton from '../components/ui/ScrollToTopButton';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col relative bg-[var(--paper)] transition-colors duration-300 w-full max-w-full overflow-x-hidden">
      <ScrollToTop />
      <OrbBackground />
      <Navbar />
      <main className="flex-1 z-10 w-full max-w-full">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
      <Toaster position="top-center" richColors dir="rtl" />
    </div>
  );
}
