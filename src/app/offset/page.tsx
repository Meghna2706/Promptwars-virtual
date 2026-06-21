'use client';

import { useState } from 'react';
import { useEco } from '@/components/ClientLayout';
import { Trees, CheckCircle2, AlertTriangle, HelpCircle, Leaf, Sparkles, PlusCircle } from 'lucide-react';

export default function CarbonOffsetPage() {
  const { user, offsets, fundOffset } = useEco();
  const [backedMsg, setBackedMsg] = useState<Record<string, { type: 'success' | 'error'; text: string }>>({});

  if (!user) return null;

  const handleFund = (projectId: string, costPoints: number) => {
    if (user.ecoPoints < costPoints) {
      setBackedMsg(prev => ({
        ...prev,
        [projectId]: { type: 'error', text: `Requires ${costPoints - user.ecoPoints} more EP.` }
      }));
      return;
    }

    const success = fundOffset(projectId);
    if (success) {
      setBackedMsg(prev => ({
        ...prev,
        [projectId]: { type: 'success', text: 'Thank you! Simulated Offset Project funded.' }
      }));
      import('canvas-confetti').then((confetti) => {
        confetti.default({ particleCount: 70, spread: 50 });
      });
      setTimeout(() => {
        setBackedMsg(prev => {
          const clone = { ...prev };
          delete clone[projectId];
          return clone;
        });
      }, 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="p-5 rounded-2xl glass-panel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <Trees size={22} className="text-neon-green" />
            <span>Carbon Offset Registry</span>
          </h1>
          <p className="text-xs text-foreground/50 mt-1">
            Neutralize your remaining greenhouse emissions by allocating your earned Eco Points (EP) directly to gold-standard global carbon offsets.
          </p>
        </div>

        {/* EP Balance panel */}
        <div className="px-4 py-2 rounded-xl bg-emerald-950/30 border border-neon-green/30 text-right">
          <span className="text-[10px] text-foreground/50 font-bold block uppercase">Points Balance</span>
          <span className="text-lg font-black text-neon-green font-mono">{user.ecoPoints} EP</span>
        </div>
      </div>

      {/* Reforestation and Offset Projects list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offsets.map(proj => {
          const msg = backedMsg[proj.id];
          return (
            <div 
              key={proj.id}
              className="rounded-2xl glass-panel overflow-hidden border border-white/10 hover:border-neon-green/20 transition-all flex flex-col justify-between group"
            >
              {/* Cover Image */}
              <div className="h-44 w-full relative">
                <img 
                  src={proj.image} 
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020604] to-transparent" />
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-neon-green text-black font-extrabold text-[9px] uppercase tracking-wider font-mono shadow-md">
                  {proj.impactMetric}
                </span>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm group-hover:text-neon-green transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-[10px] text-foreground/45 mt-1 leading-relaxed">
                    {proj.description}
                  </p>
                  
                  <div className="mt-2.5 text-[10px] text-foreground/50">
                    Backers registered: <strong className="text-white font-mono">{proj.fundedCount}</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-2 mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] text-foreground/40 font-mono">Funding cost</span>
                    <span className="font-bold text-neon-green font-mono">{proj.costPoints} EP</span>
                  </div>

                  {msg && (
                    <div className={`p-2 rounded text-[9px] flex items-center gap-1 leading-snug ${
                      msg.type === 'success' 
                        ? 'bg-emerald-950/20 border border-neon-green/20 text-neon-green' 
                        : 'bg-red-500/10 border-red-500/20 text-red-300'
                    }`}>
                      {msg.type === 'success' ? <CheckCircle2 size={11} className="shrink-0" /> : <AlertTriangle size={11} className="shrink-0" />}
                      <span>{msg.text}</span>
                    </div>
                  )}

                  <button
                    onClick={() => handleFund(proj.id, proj.costPoints)}
                    className="w-full py-2 rounded-lg bg-neon-green text-black hover:bg-neon-green/90 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(0,255,157,0.1)] hover:shadow-[0_0_15px_rgba(0,255,157,0.2)]"
                  >
                    <PlusCircle size={14} />
                    <span>Fund Offset Project</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Information Box */}
      <div className="p-5 rounded-2xl glass-panel flex gap-4 items-start bg-gradient-to-br from-[#06120b] to-black">
        <div className="p-2 rounded bg-neon-green/10 text-neon-green shrink-0">
          <HelpCircle size={20} />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-white text-xs uppercase tracking-wider">How Offset Math works</h3>
          <p className="text-[10px] text-foreground/50 leading-relaxed max-w-3xl">
            Green carbon credits are certified portfolios backed by the VCS (Verified Carbon Standard) and Gold Standard. Funding a project using your Eco Points simulates a retirement of credit, subtracting kg CO2 equivalents from your cumulative global footprint ledger. Complete daily missions and visual scanner tasks to gain EP!
          </p>
        </div>
      </div>
    </div>
  );
}
