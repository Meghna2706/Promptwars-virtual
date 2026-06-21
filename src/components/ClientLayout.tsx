'use client';

import React, { createContext, useContext } from 'react';
import { useEcoStore } from '@/lib/store';
import Navbar from './Navbar';
import ParticleBackground from './ParticleBackground';

// Define context
const EcoContext = createContext<ReturnType<typeof useEcoStore> | null>(null);

export const useEco = () => {
  const context = useContext(EcoContext);
  if (!context) {
    throw new Error('useEco must be used within an EcoProvider');
  }
  return context;
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const store = useEcoStore();

  if (store.loading) {
    return (
      <div className="fixed inset-0 bg-[#020604] flex flex-col items-center justify-center z-50">
        <div className="relative w-20 h-20">
          {/* Glowing Green Spinners */}
          <div className="absolute inset-0 rounded-full border-2 border-neon-green/20"></div>
          <div className="absolute inset-0 rounded-full border-t-2 border-neon-green animate-spin"></div>
        </div>
        <p className="mt-4 text-neon-green text-sm tracking-wider font-semibold animate-pulse">
          INITIALIZING ECOVERSE TWIN...
        </p>
      </div>
    );
  }

  return (
    <EcoContext.Provider value={store}>
      <ParticleBackground />
      <Navbar user={store.user} loading={store.loading} onRefresh={store.resetAll} />
      
      {/* Content wrapper with sidebar padding */}
      <div className="min-h-screen pt-16 md:pl-64 relative z-10">
        <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </EcoContext.Provider>
  );
}
