import React from 'react';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import Navbar from './Navbar';
import Footer from './Footer';
import OrbBackground from '../components/common/OrbBackground';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col relative bg-[var(--paper)] transition-colors duration-300">
      <OrbBackground />
      <Navbar />
      <main className="flex-1 z-10">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-center" richColors dir="rtl" />
    </div>
  );
}
