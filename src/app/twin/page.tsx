'use client';

import { useEco } from '@/components/ClientLayout';
import EarthTwin from '@/components/EarthTwin';
import { 
  Car, Bus, Bike, Footprints, Flame, Sun, Wind, FlameKindling, 
  Egg, Leaf, Salad, ShieldAlert, Sparkles, Scale, Info, Zap
} from 'lucide-react';

export default function ClimateTwinPage() {
  const { user, updateHabits } = useEco();

  if (!user) return null;

  const transportOptions = [
    { id: 'car', label: 'Private Car', icon: Car, desc: 'Single commuter petrol/diesel vehicle', value: '180kg CO2/mo' },
    { id: 'public', label: 'Public Transit', icon: Bus, desc: 'City subways, commuter rail, or buses', value: '60kg CO2/mo' },
    { id: 'bike', label: 'Bicycle / E-Bike', icon: Bike, desc: 'Zero emissions active urban transport', value: '10kg CO2/mo' },
    { id: 'walk', label: 'Walking / Run', icon: Footprints, desc: 'Completely zero-impact travel mode', value: '2kg CO2/mo' },
  ];

  const foodOptions = [
    { id: 'meat-heavy', label: 'Meat Heavy', icon: FlameKindling, desc: 'Frequent red meats and animal fats', value: '120kg CO2/mo' },
    { id: 'low-carbon', label: 'Mixed Low-Carb', icon: Egg, desc: 'Poultry, dairy, and fish, limited beef', value: '75kg CO2/mo' },
    { id: 'vegetarian', label: 'Vegetarian', icon: Salad, desc: 'Ory organic grains, eggs, dairy, no meat', value: '50kg CO2/mo' },
    { id: 'vegan', label: 'Vegan / Plant', icon: Leaf, desc: 'Entirely plant-based raw or cooked diet', value: '30kg CO2/mo' },
  ];

  const energyOptions = [
    { id: 'grid', label: 'Standard Grid', icon: Flame, desc: 'Coal/Gas heavy municipal electricity grid', value: '115kg CO2/mo' },
    { id: 'mixed', label: 'Mixed Clean', icon: FlameKindling, desc: 'Standard power with green offset credits', value: '60kg CO2/mo' },
    { id: 'solar', label: 'Rooftop Solar', icon: Sun, desc: 'Residential solar array self-generation', value: '5kg CO2/mo' },
    { id: 'wind', label: 'Wind Co-op', icon: Wind, desc: '100% wind turbine community source', value: '2kg CO2/mo' },
  ];

  const shoppingOptions = [
    { id: 'high-consumption', label: 'High Spender', desc: 'Frequent purchases of fast fashion and goods', value: '120kg CO2/mo' },
    { id: 'moderate', label: 'Moderate Spender', desc: 'Conscious purchases, regular item lifespans', value: '60kg CO2/mo' },
    { id: 'minimalist', label: 'Minimalist', desc: 'Only buy essentials, prefer second-hand', value: '20kg CO2/mo' },
  ];

  const waterOptions = [
    { id: 'high', label: 'High usage', desc: 'Long showers, frequent washing, garden hose', value: '60kg CO2/mo' },
    { id: 'moderate', label: 'Moderate usage', desc: 'Standard showers, eco-cycle laundry cycles', value: '30kg CO2/mo' },
    { id: 'low', label: 'Water saver', desc: 'Low-flow fixtures, rainwater collection', value: '10kg CO2/mo' },
  ];

  const handleHabitChange = (category: string, value: string) => {
    const updatedHabits = {
      ...user.habits,
      [category]: value
    };
    updateHabits(updatedHabits);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="p-6 rounded-2xl glass-panel relative overflow-hidden">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
          AI Climate Twin Simulator
        </h1>
        <p className="text-foreground/60 text-sm mt-1 max-w-3xl">
          Your Climate Twin is a real-time mathematical simulation of your global carbon footprint. Select your lifestyle patterns below to see how changes in transportation, food, or home energy recalibrate your twin's health and score.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: Habit Configurations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Transportation Card Grid */}
          <div className="p-5 rounded-2xl glass-panel space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h2 className="font-bold text-white text-base flex items-center gap-2">
                <Car size={18} className="text-neon-green" />
                <span>Transportation Habit</span>
              </h2>
              <span className="text-[10px] text-foreground/40 font-mono">Weight: 40%</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {transportOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = user.habits.transport === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleHabitChange('transport', opt.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-300 flex items-start gap-3 group ${
                      isSelected 
                        ? 'bg-neon-green/10 border-neon-green text-white shadow-[0_0_15px_rgba(0,255,157,0.06)]' 
                        : 'bg-white/5 border-white/10 hover:border-white/20 text-foreground/70 hover:text-white'
                    }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 ${
                      isSelected ? 'bg-neon-green text-black' : 'bg-white/5 text-foreground/45 group-hover:text-neon-green transition-colors'
                    }`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-xs">{opt.label}</div>
                      <div className="text-[10px] text-foreground/40 mt-0.5 leading-snug">{opt.desc}</div>
                      <div className="text-[10px] font-bold text-neon-green mt-1 font-mono">{opt.value}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Food Consumptions */}
          <div className="p-5 rounded-2xl glass-panel space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h2 className="font-bold text-white text-base flex items-center gap-2">
                <Salad size={18} className="text-neon-green" />
                <span>Food & Diet Habit</span>
              </h2>
              <span className="text-[10px] text-foreground/40 font-mono">Weight: 25%</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {foodOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = user.habits.food === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleHabitChange('food', opt.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-300 flex items-start gap-3 group ${
                      isSelected 
                        ? 'bg-neon-green/10 border-neon-green text-white shadow-[0_0_15px_rgba(0,255,157,0.06)]' 
                        : 'bg-white/5 border-white/10 hover:border-white/20 text-foreground/70 hover:text-white'
                    }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 ${
                      isSelected ? 'bg-neon-green text-black' : 'bg-white/5 text-foreground/45 group-hover:text-neon-green transition-colors'
                    }`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-xs">{opt.label}</div>
                      <div className="text-[10px] text-foreground/40 mt-0.5 leading-snug">{opt.desc}</div>
                      <div className="text-[10px] font-bold text-neon-green mt-1 font-mono">{opt.value}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Energy Usage */}
          <div className="p-5 rounded-2xl glass-panel space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h2 className="font-bold text-white text-base flex items-center gap-2">
                <Sun size={18} className="text-neon-green" />
                <span>Home Energy Habit</span>
              </h2>
              <span className="text-[10px] text-foreground/40 font-mono">Weight: 20%</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {energyOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = user.habits.energy === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleHabitChange('energy', opt.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-300 flex items-start gap-3 group ${
                      isSelected 
                        ? 'bg-neon-green/10 border-neon-green text-white shadow-[0_0_15px_rgba(0,255,157,0.06)]' 
                        : 'bg-white/5 border-white/10 hover:border-white/20 text-foreground/70 hover:text-white'
                    }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 ${
                      isSelected ? 'bg-neon-green text-black' : 'bg-white/5 text-foreground/45 group-hover:text-neon-green transition-colors'
                    }`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-xs">{opt.label}</div>
                      <div className="text-[10px] text-foreground/40 mt-0.5 leading-snug">{opt.desc}</div>
                      <div className="text-[10px] font-bold text-neon-green mt-1 font-mono">{opt.value}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Shopping & Water Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shopping habits */}
            <div className="p-5 rounded-2xl glass-panel space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <h2 className="font-bold text-white text-sm">Shopping Consumption</h2>
                <span className="text-[9px] text-foreground/40">Weight: 10%</span>
              </div>
              <div className="flex flex-col gap-2">
                {shoppingOptions.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleHabitChange('shopping', opt.id)}
                    className={`p-3 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                      user.habits.shopping === opt.id 
                        ? 'bg-neon-green/10 border-neon-green text-white font-medium' 
                        : 'bg-white/5 border-white/10 text-foreground/70 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div>{opt.label}</div>
                      <div className="text-[9px] text-foreground/40 mt-0.5">{opt.desc}</div>
                    </div>
                    <span className="text-[10px] font-bold text-neon-green font-mono">{opt.value}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Water habits */}
            <div className="p-5 rounded-2xl glass-panel space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <h2 className="font-bold text-white text-sm">Water Footprint</h2>
                <span className="text-[9px] text-foreground/40">Weight: 5%</span>
              </div>
              <div className="flex flex-col gap-2">
                {waterOptions.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleHabitChange('water', opt.id)}
                    className={`p-3 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                      user.habits.water === opt.id 
                        ? 'bg-neon-green/10 border-neon-green text-white font-medium' 
                        : 'bg-white/5 border-white/10 text-foreground/70 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div>{opt.label}</div>
                      <div className="text-[9px] text-foreground/40 mt-0.5">{opt.desc}</div>
                    </div>
                    <span className="text-[10px] font-bold text-neon-green font-mono">{opt.value}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: EarthTwin & Computed twin results */}
        <div className="space-y-6">
          {/* Earth Avatar Panel */}
          <div className="p-5 rounded-2xl glass-panel relative flex flex-col items-center">
            <div className="absolute top-4 right-4 p-1.5 rounded-lg bg-neon-green/10 border border-neon-green/20 text-neon-green hover:scale-105 transition-transform" title="Live Model status">
              <Sparkles size={16} />
            </div>

            <EarthTwin score={user.carbonScore} />

            {/* Twin Stats list */}
            <div className="w-full mt-4 border-t border-white/5 pt-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground/50 flex items-center gap-1">
                  <Scale size={14} />
                  <span>Monthly Carbon Output</span>
                </span>
                <span className="font-bold text-white text-sm font-mono">{user.monthlyEmissions} kg CO2e</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground/50 flex items-center gap-1">
                  <Zap size={14} />
                  <span>Sustainability Score</span>
                </span>
                <span className="font-bold text-neon-green text-sm font-mono">{user.carbonScore}%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground/50 flex items-center gap-1">
                  <Info size={14} />
                  <span>Simulated Climate Age</span>
                </span>
                <span className="font-bold text-white text-sm font-mono">{user.climateAge} yrs</span>
              </div>
            </div>
          </div>

          {/* Education Info card */}
          <div className="p-5 rounded-2xl glass-panel bg-gradient-to-br from-[#06110c] to-[#040c08] space-y-3">
            <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
              <ShieldAlert size={16} className="text-neon-green" />
              <span>Climate Twin Dynamics</span>
            </h3>
            <p className="text-[11px] text-foreground/50 leading-relaxed">
              Your Climate Age acts as a gauge of physiological acceleration. If your footprint exceeds the global benchmark (400kg/mo), your twin suffers atmospheric thinning, showing heat glow anomalies and aging your simulated twin. Lowering emissions below 150kg/mo restores the ozone atmospheric shield.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
