'use client';

import { useState } from 'react';
import { useEco } from '@/components/ClientLayout';
import { ShoppingBag, CheckCircle2, AlertTriangle, ArrowRight, Zap, Leaf } from 'lucide-react';

export default function MarketplacePage() {
  const { user, products, purchaseProduct } = useEco();
  const [activeTab, setActiveTab] = useState<string>('All');
  const [purchaseMsg, setPurchaseMsg] = useState<Record<string, { type: 'success' | 'error'; text: string }>>({});

  if (!user) return null;

  const categories = ['All', 'Reusable products', 'Solar gadgets', 'Sustainable fashion', 'Eco home products'];

  const filteredProducts = activeTab === 'All'
    ? products
    : products.filter(p => p.category === activeTab);

  const handleBuy = (productId: string, price: number) => {
    if (user.ecoPoints < price) {
      setPurchaseMsg(prev => ({
        ...prev,
        [productId]: { type: 'error', text: `Insufficient Points. You need ${price - user.ecoPoints} more EP.` }
      }));
      return;
    }

    const success = purchaseProduct(productId);
    if (success) {
      setPurchaseMsg(prev => ({
        ...prev,
        [productId]: { type: 'success', text: 'Simulated Purchase Successful! Item added to inventory.' }
      }));
      import('canvas-confetti').then((confetti) => {
        confetti.default({ particleCount: 50, spread: 30 });
      });
      // Clear message after 3 seconds
      setTimeout(() => {
        setPurchaseMsg(prev => {
          const clone = { ...prev };
          delete clone[productId];
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
            <ShoppingBag size={22} className="text-neon-green" />
            <span>Green Marketplace</span>
          </h1>
          <p className="text-xs text-foreground/50 mt-1">
            Redeem your earned Eco Points for premium sustainable merchandise and clean gadgets, saving carbon emissions in your household daily.
          </p>
        </div>

        {/* EP Balance panel */}
        <div className="px-4 py-2 rounded-xl bg-emerald-950/30 border border-neon-green/30 text-right">
          <span className="text-[10px] text-foreground/50 font-bold block uppercase">Points Balance</span>
          <span className="text-lg font-black text-neon-green font-mono">{user.ecoPoints} EP</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 border transition-all ${
              activeTab === cat 
                ? 'bg-neon-green/10 border-neon-green text-neon-green' 
                : 'bg-white/5 border-white/5 text-foreground/50 hover:border-white/15 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(prod => {
          const msg = purchaseMsg[prod.id];
          return (
            <div 
              key={prod.id} 
              className="rounded-2xl glass-panel p-4 flex flex-col justify-between border-white/10 hover:border-neon-green/20 transition-all group relative overflow-hidden"
            >
              <div>
                {/* Image */}
                <div className="aspect-square w-full rounded-xl overflow-hidden bg-black/40 border border-white/5 relative">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-neon-green/10 border border-neon-green/25 text-[9px] font-bold text-neon-green uppercase tracking-wider font-mono">
                    {prod.category}
                  </span>
                </div>

                {/* Info */}
                <h3 className="font-bold text-white text-xs mt-3 group-hover:text-neon-green transition-colors">
                  {prod.name}
                </h3>
                <p className="text-[10px] text-foreground/45 mt-1 leading-snug line-clamp-2">
                  {prod.description}
                </p>
                
                {/* Savings tag */}
                <div className="mt-2.5 flex items-center gap-1 text-[10px] text-emerald-300 font-semibold bg-emerald-950/20 px-2 py-1 rounded w-max">
                  <Leaf size={10} className="text-neon-green fill-neon-green/20" />
                  <span>Saves: {prod.carbonSavings}</span>
                </div>
              </div>

              {/* Purchase controls */}
              <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-foreground/40 font-mono">Cost (points)</span>
                  <span className="font-black text-neon-green text-sm font-mono flex items-center gap-0.5">
                    <Zap size={12} className="fill-neon-green" />
                    <span>{prod.pricePoints} EP</span>
                  </span>
                </div>

                {/* Purchase messages */}
                {msg && (
                  <div className={`p-2 rounded text-[9px] flex items-center gap-1.5 leading-snug ${
                    msg.type === 'success' 
                      ? 'bg-emerald-950/20 border border-neon-green/20 text-neon-green' 
                      : 'bg-red-500/10 border-red-500/20 text-red-300'
                  }`}>
                    {msg.type === 'success' ? <CheckCircle2 size={12} className="shrink-0" /> : <AlertTriangle size={12} className="shrink-0" />}
                    <span>{msg.text}</span>
                  </div>
                )}

                <button
                  onClick={() => handleBuy(prod.id, prod.pricePoints)}
                  className="w-full py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-neon-green hover:text-black hover:border-transparent font-bold text-xs text-white transition-all flex items-center justify-center gap-1 group-hover:bg-white/10"
                >
                  <span>Redeem Now</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
