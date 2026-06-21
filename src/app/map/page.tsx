'use client';

import LiveMap from '@/components/LiveMap';
import { Info, MapPin } from 'lucide-react';

export default function EcoMapPage() {
  return (
    <div className="space-y-4 h-full">
      {/* Page header */}
      <div className="p-4 rounded-xl glass-panel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <MapPin size={22} className="text-neon-green" />
            <span>Live Eco Map</span>
          </h1>
          <p className="text-xs text-foreground/50 mt-0.5">
            Locate sustainable infrastructure, EV chargers, recycling depots, and eco-friendly shops in your proximity.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-neon-green/5 border border-neon-green/10 text-[10px] text-neon-green flex items-center gap-1.5 max-w-xs">
          <Info size={14} className="shrink-0" />
          <span>Commuting via public transit or walking instead of personal gas vehicles reduces emissions by up to 88%!</span>
        </div>
      </div>

      {/* Main Map Component */}
      <LiveMap />
    </div>
  );
}
