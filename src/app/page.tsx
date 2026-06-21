'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useEco } from '@/components/ClientLayout';
import {
  Zap, Award, ShieldAlert, CheckCircle2, ChevronRight, TrendingDown,
  MapPin, CloudLightning, Leaf, UserPlus, Sparkles, FileSpreadsheet, ArrowUpRight
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

export default function Dashboard() {
  const { user, logs, missions, completeMission, getLeaderboard } = useEco();
  const [mounted, setMounted] = useState(false);
  const [activeAlert, setActiveAlert] = useState<any>(null);
  const [pwaPrompt, setPwaPrompt] = useState<any>(null);

  // Prevent Recharts hydration mismatch
  useEffect(() => {
    setMounted(true);

    // Simulate dynamic location-based emergency climate alert
    const alerts = [
      { id: 1, title: 'Extreme Heat Warning', message: 'Temperatures are expected to exceed 41°C. Reduce AC consumption to prevent grid strain; close blinds to insulate naturally.', severity: 'critical' },
      { id: 2, title: 'Poor Air Quality Warning (AQI 162)', message: 'High particulate matter detected. Prefer indoor air filtering and avoid driving heavy vehicles today.', severity: 'warning' }
    ];
    // Randomly show one alert
    setActiveAlert(alerts[Math.floor(Math.random() * alerts.length)]);

    // PWA Install detection
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setPwaPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const triggerInstall = () => {
    if (!pwaPrompt) return;
    pwaPrompt.prompt();
    pwaPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        setPwaPrompt(null);
      }
    });
  };

  if (!user) return null;

  // Chart data formatting
  const trendData = [...logs].reverse().map(log => {
    // Format date string to Month name
    const d = new Date(log.date);
    const month = d.toLocaleString('default', { month: 'short' });
    return {
      name: month,
      Emissions: log.total,
      Target: 180, // Target line aligned with climate targets
    };
  });

  const latestLog = logs[0] || { transport: 180, food: 120, energy: 110, shopping: 60, water: 30 };
  const pieData = [
    { name: 'Transport', value: latestLog.transport, color: '#10b981' },
    { name: 'Food', value: latestLog.food, color: '#00ff9d' },
    { name: 'Energy', value: latestLog.energy, color: '#059669' },
    { name: 'Shopping', value: latestLog.shopping, color: '#064e3b' },
    { name: 'Water', value: latestLog.water, color: '#34d399' },
  ];

  const handleMissionCheck = (missionId: string) => {
    const res = completeMission(missionId);
    if (res && res.leveledUp) {
      import('canvas-confetti').then((confetti) => {
        confetti.default({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/5 rounded-full blur-3xl -z-10" />
        <div>
          <div className="flex items-center gap-2 text-neon-green text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles size={14} className="animate-spin-slow" />
            <span>EcoVerse Climate Twin Live</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            Welcome back, {user.displayName}
          </h1>
          <p className="text-foreground/60 text-sm mt-1">
            Your digital climate twin is green and healthy. Keep up the good work!
          </p>
        </div>

        <div className="flex items-center gap-3">
          {pwaPrompt && (
            <button
              onClick={triggerInstall}
              className="px-4 py-2 rounded-xl bg-neon-green text-black font-semibold text-sm transition-all hover:bg-neon-green/90 hover:scale-105 flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,255,157,0.3)]"
            >
              <UserPlus size={16} />
              <span>Install App</span>
            </button>
          )}

          <Link
            href="/twin"
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neon-green/40 text-white font-medium text-sm transition-all flex items-center gap-1.5"
          >
            <span>Interact Twin</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      {/* Emergency Climate Alerts (Feature 14) */}
      {activeAlert && (
        <div className={`p-4 rounded-xl border flex gap-3 animate-pulse ${activeAlert.severity === 'critical'
            ? 'bg-red-500/10 border-red-500/30 text-red-200'
            : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
          }`}>
          <div className="shrink-0 p-1.5 rounded-lg bg-white/5">
            <CloudLightning size={18} className={activeAlert.severity === 'critical' ? 'text-red-400' : 'text-amber-400'} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs uppercase tracking-widest text-white">
                Climate Warning:
              </span>
              <span className="font-semibold text-sm">{activeAlert.title}</span>
            </div>
            <p className="text-xs text-foreground/75 mt-1 leading-relaxed">{activeAlert.message}</p>
          </div>
        </div>
      )}

      {/* Metric Cards (Feature 11) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Footprint */}
        <div className="p-4 rounded-xl glass-panel relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-neon-green/5 rounded-full blur-xl group-hover:bg-neon-green/10 transition-all" />
          <p className="text-xs font-medium text-foreground/50">Today's Footprint</p>
          <p className="text-2xl font-bold text-white mt-1">
            {Math.round(user.monthlyEmissions / 30)} <span className="text-xs font-normal text-foreground/40">kg CO2</span>
          </p>
          <div className="flex items-center gap-1 text-[10px] text-neon-green mt-2 font-medium">
            <TrendingDown size={12} />
            <span>4% lower than average</span>
          </div>
        </div>

        {/* Climate Age */}
        <div className="p-4 rounded-xl glass-panel relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all" />
          <p className="text-xs font-medium text-foreground/50">Climate Age</p>
          <p className="text-2xl font-bold text-white mt-1">
            {user.climateAge} <span className="text-xs font-normal text-foreground/40">years</span>
          </p>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-2 font-medium">
            <Leaf size={12} />
            <span>Eco-fit matching status</span>
          </div>
        </div>

        {/* Carbon Score */}
        <div className="p-4 rounded-xl glass-panel relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-teal-500/5 rounded-full blur-xl group-hover:bg-teal-500/10 transition-all" />
          <p className="text-xs font-medium text-foreground/50">Carbon Score</p>
          <p className="text-2xl font-bold text-white mt-1">
            {user.carbonScore} <span className="text-xs font-normal text-foreground/40">/ 100</span>
          </p>
          <div className="flex items-center gap-1 text-[10px] text-neon-green mt-2 font-medium">
            <CheckCircle2 size={12} />
            <span>Grade: A- (Sustained)</span>
          </div>
        </div>

        {/* Eco Level */}
        <div className="p-4 rounded-xl glass-panel relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-all" />
          <p className="text-xs font-medium text-foreground/50">Eco Level & Points</p>
          <p className="text-2xl font-bold text-white mt-1">
            {user.ecoPoints} <span className="text-xs font-normal text-foreground/40">EP</span>
          </p>
          <div className="flex items-center gap-1 text-[10px] text-amber-400 mt-2 font-bold uppercase tracking-wider">
            <Award size={12} />
            <span>{user.level}</span>
          </div>
        </div>
      </div>

      {/* Grid: Charts & Missions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emission Trend Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl glass-panel flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-white text-base">Carbon Footprint Trend</h2>
              <span className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-foreground/50">
                6-Month Outlook
              </span>
            </div>

            {/* Chart Area */}
            <div className="h-64 w-full">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00ff9d" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#00ff9d" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={11} />
                    <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} unit="kg" />
                    <Tooltip
                      contentStyle={{ background: '#06110b', borderColor: 'rgba(0, 255, 157, 0.2)', borderRadius: '8px' }}
                      labelStyle={{ color: '#00ff9d', fontSize: '12px' }}
                      itemStyle={{ color: '#ffffff', fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey="Emissions" stroke="#00ff9d" strokeWidth={2} fillOpacity={1} fill="url(#colorEmissions)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full flex items-center justify-center text-foreground/30 text-xs">
                  Loading Chart Components...
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between text-xs text-foreground/50">
            <span>Goal Target: 180kg CO2/Month</span>
            <Link href="/analytics" className="text-neon-green hover:underline flex items-center gap-0.5">
              <span>View Advanced Analytics</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Daily Eco Missions (Feature 6) */}
        <div className="p-5 rounded-2xl glass-panel flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white text-base">Daily Eco Missions</h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-green/10 border border-neon-green/20 text-neon-green font-bold uppercase tracking-wider">
              Earn Points
            </span>
          </div>

          <div className="space-y-3 flex-1">
            {missions.slice(0, 4).map((mission) => (
              <div
                key={mission.id}
                className={`p-3 rounded-xl border transition-all flex items-center justify-between ${mission.completed
                    ? 'bg-emerald-950/10 border-neon-green/20 text-foreground/45'
                    : 'bg-white/5 border-white/10 hover:border-neon-green/20 text-white'
                  }`}
              >
                <div className="max-w-[75%]">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${mission.category === 'Transportation' ? 'bg-indigo-500/10 text-indigo-300' :
                        mission.category === 'Food' ? 'bg-orange-500/10 text-orange-300' :
                          mission.category === 'Energy' ? 'bg-amber-500/10 text-amber-300' :
                            'bg-teal-500/10 text-teal-300'
                      }`}>
                      {mission.category}
                    </span>
                    <span className="text-neon-green text-xs font-semibold font-mono">+{mission.points} EP</span>
                  </div>
                  <p className="text-xs font-semibold mt-1 leading-snug truncate">{mission.title}</p>
                </div>

                <button
                  disabled={mission.completed}
                  onClick={() => handleMissionCheck(mission.id)}
                  className={`p-1.5 rounded-lg border transition-all ${mission.completed
                      ? 'bg-neon-green/10 border-transparent text-neon-green'
                      : 'bg-white/5 border-white/20 hover:border-neon-green hover:bg-neon-green hover:text-black text-foreground/60'
                    }`}
                >
                  <CheckCircle2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <Link
            href="/community"
            className="w-full text-center py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-medium text-white transition-all mt-4"
          >
            Explore Active Challenges
          </Link>
        </div>
      </div>

      {/* Row 3: Emission Breakdown & AI Quick Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Source Breakdown Chart */}
        <div className="p-5 rounded-2xl glass-panel">
          <h2 className="font-bold text-white text-base mb-4">Carbon Source Breakdown</h2>
          <div className="h-56 w-full flex items-center justify-center relative">
            {mounted ? (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: '#06110b', borderColor: 'rgba(0, 255, 157, 0.2)', borderRadius: '8px' }}
                      itemStyle={{ color: '#ffffff', fontSize: '11px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Score Indicator */}
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-[10px] text-foreground/45 uppercase font-bold tracking-widest">Monthly</span>
                  <span className="text-xl font-bold text-white leading-tight">{latestLog.total}</span>
                  <span className="text-[10px] text-foreground/45">kg CO2e</span>
                </div>
              </>
            ) : (
              <span className="text-foreground/35 text-xs">Loading Pie Chart...</span>
            )}
          </div>

          {/* Custom Legends */}
          <div className="grid grid-cols-5 gap-1.5 text-center mt-3 pt-3 border-t border-white/5">
            {pieData.map((d) => (
              <div key={d.name} className="flex flex-col items-center">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-[9px] text-foreground/50 mt-1">{d.name}</span>
                <span className="text-[10px] font-bold text-white font-mono">{d.value}kg</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Climate Coach Widget */}
        <div className="lg:col-span-2 p-5 rounded-2xl glass-panel flex flex-col justify-between border-l-2 border-l-neon-green/30">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 rounded bg-neon-green/10 text-neon-green">
                <span>🤖</span>
              </span>
              <h2 className="font-bold text-white text-base">Ask Your Climate Twin</h2>
            </div>
            <p className="text-xs text-foreground/60 leading-relaxed mb-4">
              Your Climate Twin is trained on global environmental reports and your personal habits. Ask anything about sustainable alternatives, travel emissions, or load custom roadmaps.
            </p>

            {/* Quick Prompts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              <Link
                href="/analyzer?q=Is riding a bike better than public transport?"
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-neon-green/20 hover:bg-neon-green/5 text-left transition-all text-xs"
              >
                <div className="font-semibold text-white">Cycling vs Transit</div>
                <div className="text-[10px] text-foreground/50 mt-0.5">Which transport mode saves the most CO2?</div>
              </Link>
              <Link
                href="/analyzer?q=How much CO2 does a flight produce?"
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-neon-green/20 hover:bg-neon-green/5 text-left transition-all text-xs"
              >
                <div className="font-semibold text-white">Aviation Carbon Costs</div>
                <div className="text-[10px] text-foreground/50 mt-0.5">Calculate short-haul vs long-haul impact.</div>
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-white/5 pt-3">
            <span className="text-[10px] text-foreground/40">Powered by Gemini Pro Intelligence</span>
            <Link
              href="/analyzer"
              className="px-4 py-1.5 rounded-lg bg-neon-green text-black font-semibold text-xs transition-all hover:bg-neon-green/90"
            >
              Start AI Coach Chat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
