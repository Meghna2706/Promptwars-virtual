'use client';

import { useState } from 'react';
import { useEco } from '@/components/ClientLayout';
import { Camera, Upload, RefreshCw, Star, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export default function ImageScannerPage() {
  const { addPoints } = useEco();
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [pointsEarned, setPointsEarned] = useState(0);

  // Preset mock items for easy user testing
  const presets = [
    { name: 'beef_burger.jpg', label: 'Beef Burger Combo', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=200' },
    { name: 'gas_suv.jpg', label: 'Gasoline SUV', url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=200' },
    { name: 'dryer_appliance.jpg', label: 'Tumble Dryer', url: 'https://images.unsplash.com/photo-1610557892470-76d747e2f53f?auto=format&fit=crop&q=80&w=200' },
    { name: 'shopping_receipt.jpg', label: 'Shopping Bill', url: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=200' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setImageName(file.name);
      setScanResult(null);
      setPointsEarned(0);
    };
    reader.readAsDataURL(file);
  };

  const handlePresetSelect = (preset: typeof presets[0]) => {
    setImage(preset.url);
    setImageName(preset.name);
    setScanResult(null);
    setPointsEarned(0);
  };

  const startScan = async () => {
    if (!image) return;
    setScanning(true);
    setPointsEarned(0);

    try {
      const res = await fetch('/api/gemini/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: image.startsWith('http') ? 'MOCK_URL_IMAGE' : image,
          imageName: imageName,
          mimeType: 'image/jpeg'
        })
      });
      const data = await res.json();
      
      setTimeout(() => {
        setScanResult(data.result);
        setScanning(false);
        
        // Award points for daily scanning
        const isLeveledUp = addPoints(20);
        setPointsEarned(20);
        
        if (isLeveledUp) {
          import('canvas-confetti').then((confetti) => {
            confetti.default({ particleCount: 100, spread: 60 });
          });
        }
      }, 1500); // scan animation duration
    } catch (e) {
      console.error(e);
      setScanning(false);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={14} 
          className={i <= rating ? 'text-neon-green fill-neon-green' : 'text-foreground/20'} 
        />
      );
    }
    return <div className="flex gap-0.5">{stars}</div>;
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="p-5 rounded-2xl glass-panel">
        <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <Camera size={22} className="text-neon-green" />
          <span>AI Image Carbon Scanner</span>
        </h1>
        <p className="text-xs text-foreground/50 mt-1">
          Upload any picture of food, home appliances, receipts, or vehicles. EcoVerse AI Vision analyzes the items, calculates lifecycle carbon models, and recommends sustainable substitutes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: Upload Panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-5 rounded-2xl glass-panel space-y-4">
            <h2 className="font-bold text-white text-xs uppercase tracking-wider">
              Scanned Subject
            </h2>

            {image ? (
              <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
                <img 
                  src={image} 
                  alt="Scanned Object Preview" 
                  className="w-full h-full object-cover"
                />
                
                {/* Scanner Laser Bar Animation */}
                {scanning && (
                  <div className="absolute inset-x-0 h-1 bg-neon-green shadow-[0_0_15px_rgba(0,255,157,0.8)] animate-[bounce_1.5s_infinite] z-20" />
                )}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <label className="p-2 rounded-lg bg-black/60 border border-white/20 text-white cursor-pointer hover:bg-black/80 transition-all text-xs">
                    Change Image
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>
            ) : (
              <label className="border-2 border-dashed border-white/10 hover:border-neon-green/30 rounded-xl aspect-square flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-neon-green/5 group">
                <Upload size={32} className="text-foreground/30 group-hover:text-neon-green group-hover:scale-110 transition-all" />
                <span className="text-xs text-white font-semibold mt-3">Upload Image File</span>
                <span className="text-[10px] text-foreground/40 mt-1">Supports PNG, JPG up to 5MB</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                  className="hidden" 
                />
              </label>
            )}

            <div className="flex gap-2">
              <button
                disabled={!image || scanning}
                onClick={startScan}
                className="flex-1 py-2.5 rounded-xl bg-neon-green text-black font-bold text-xs hover:bg-neon-green/90 transition-all flex items-center justify-center gap-1.5 disabled:opacity-40"
              >
                {scanning ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Analyzing Image...</span>
                  </>
                ) : (
                  <>
                    <Camera size={14} />
                    <span>Analyze Footprint</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Presets Container */}
          <div className="p-4 rounded-xl glass-panel space-y-2">
            <h3 className="text-[10px] text-foreground/45 font-bold uppercase tracking-wider pl-1">
              Select Preset Tester
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {presets.map(p => (
                <button
                  key={p.name}
                  onClick={() => handlePresetSelect(p)}
                  className="p-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/15 text-left transition-all flex items-center gap-2 group"
                >
                  <img src={p.url} className="w-8 h-8 object-cover rounded" alt="" />
                  <span className="text-[10px] text-foreground/80 group-hover:text-white truncate font-medium">{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Scan Results Card */}
        <div className="lg:col-span-2 space-y-4">
          {scanResult ? (
            <div className="p-6 rounded-2xl glass-panel border border-neon-green/35 bg-[#06120b]/60 space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-neon-green uppercase tracking-widest">
                    {scanResult.category}
                  </span>
                  <h2 className="text-xl font-extrabold text-white mt-0.5">
                    {scanResult.name}
                  </h2>
                </div>

                <div className="text-right">
                  <span className="text-[9px] text-foreground/40 font-mono">Sustainability</span>
                  <div className="mt-0.5">
                    {renderStars(scanResult.sustainabilityRating)}
                  </div>
                </div>
              </div>

              {/* Emissions Callout */}
              <div className="p-4 rounded-xl bg-neon-green/5 border border-neon-green/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-foreground/50">Estimated Lifecycle Footprint</span>
                  <p className="text-2xl font-black text-neon-green mt-0.5 font-mono">{scanResult.carbonFootprint}</p>
                </div>
                <div className="p-2 rounded bg-neon-green text-black">
                  <Star size={18} className="fill-black" />
                </div>
              </div>

              {/* Detail explanation */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Analysis Narrative</h3>
                <p className="text-xs text-foreground/75 leading-relaxed">{scanResult.explanation}</p>
              </div>

              {/* Alternatives List */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <span>Carbon-Reduction Alternatives</span>
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {scanResult.alternatives.map((alt: string, i: number) => (
                    <div 
                      key={i}
                      className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs text-white flex items-center justify-between"
                    >
                      <span>{alt}</span>
                      <ArrowRight size={12} className="text-neon-green" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Point earned notification */}
              {pointsEarned > 0 && (
                <div className="p-3 rounded-lg bg-emerald-950/20 border border-neon-green/20 flex items-center gap-2 text-xs text-neon-green font-semibold animate-bounce">
                  <CheckCircle2 size={16} />
                  <span>Successful Scan! Awarded +{pointsEarned} Eco Points.</span>
                </div>
              )}
            </div>
          ) : (
            <div className="border border-white/10 rounded-2xl p-8 text-center flex flex-col items-center justify-center h-80 glass-panel">
              <div className="p-4 rounded-full bg-white/5 text-foreground/35 border border-white/5 mb-3">
                <Camera size={32} />
              </div>
              <h3 className="text-sm font-bold text-white">No Scan Data</h3>
              <p className="text-xs text-foreground/45 max-w-sm mt-1">
                Upload a picture of an appliance, travel receipt, or food item, and click "Analyze Footprint" to load the AI visual reports.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
