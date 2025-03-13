
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useIsMobile } from '@/hooks/use-mobile';

export function Shell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex min-h-screen flex-col ${className}`}>
      <Navbar />
      <main className={`flex-1 ${isMobile ? 'pt-20' : 'pt-24'} pb-10`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
