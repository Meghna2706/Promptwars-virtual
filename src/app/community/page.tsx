'use client';

import { useEco } from '@/components/ClientLayout';
import { 
  Users, Award, Calendar, CheckCircle2, ChevronRight, Trophy, Zap, 
  Trees, Leaf, ShieldAlert, Heart, CalendarPlus
} from 'lucide-react';

export default function CommunityPage() {
  const { user, achievements, events, getLeaderboard, joinEvent } = useEco();

  if (!user) return null;

  const leaderboard = getLeaderboard();

  // Aggregate statistics for Community Impact Dashboard
  const communityStats = [
    { label: 'Reforested Trees', value: '14,820', icon: Trees, color: 'text-neon-green', desc: 'Active seedlings planted globally' },
    { label: 'Plastic Saved', value: '5,280 kg', icon: Leaf, color: 'text-emerald-400', desc: 'Avoided from landfill decomposition' },
    { label: 'Carbon Reduced', value: '84.2 tons', icon: Award, color: 'text-teal-300', desc: 'Collective CO2 offsets registered' }
  ];

  const handleJoin = (eventId: string) => {
    joinEvent(eventId);
    // Trigger confetti on join
    import('canvas-confetti').then((confetti) => {
      confetti.default({ particleCount: 60, spread: 40 });
    });
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="p-5 rounded-2xl glass-panel relative overflow-hidden">
        <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <Users size={22} className="text-neon-green" />
          <span>Community Impact & Gamification</span>
        </h1>
        <p className="text-xs text-foreground/50 mt-1">
          Participate in municipal tree planting and eco events. Climb the regional leaderboard, complete missions, and unlock prestigious badges reflecting your real-world footprint reductions.
        </p>
      </div>

      {/* Community Impact Dashboard Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {communityStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="p-4 rounded-xl glass-panel relative overflow-hidden group">
              <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-white/5 rounded-full blur-xl group-hover:scale-125 transition-transform" />
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg bg-white/5 ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-foreground/50 font-semibold">{stat.label}</span>
                  <p className="text-xl font-bold text-white leading-tight mt-0.5">{stat.value}</p>
                </div>
              </div>
              <p className="text-[10px] text-foreground/40 mt-2 pl-0.5">{stat.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Grid: Events & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Community Events */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-2xl glass-panel space-y-4">
            <h2 className="font-bold text-white text-sm flex items-center gap-2 border-b border-white/5 pb-2">
              <Calendar size={18} className="text-neon-green" />
              <span>Local Sustainability Events</span>
            </h2>

            <div className="space-y-4">
              {events.map((event) => (
                <div 
                  key={event.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row justify-between gap-4 ${
                    event.joined 
                      ? 'bg-emerald-950/10 border-neon-green/30' 
                      : 'bg-white/5 border-white/5 hover:border-white/12'
                  }`}
                >
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-neon-green/10 text-neon-green uppercase tracking-wider">
                        {event.category}
                      </span>
                      <span className="text-[10px] text-foreground/50 font-mono">{event.date}</span>
                    </div>

                    <h3 className="text-xs font-bold text-white">{event.title}</h3>
                    <p className="text-[10px] text-foreground/60 leading-relaxed">{event.description}</p>

                    <div className="flex items-center gap-4 text-[10px] text-foreground/45 pt-1">
                      <span>Location: <strong className="text-white font-medium">{event.location}</strong></span>
                      <span>Participants: <strong className="text-neon-green font-mono">{event.participants}</strong></span>
                    </div>
                  </div>

                  <div className="shrink-0 flex md:flex-col justify-between md:justify-center items-end gap-2 border-t md:border-t-0 border-white/5 pt-2 md:pt-0">
                    <span className="text-[10px] font-bold text-neon-green font-mono hidden md:block">
                      {event.impactEstimate}
                    </span>
                    <button
                      onClick={() => handleJoin(event.id)}
                      className={`px-4 py-2 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 ${
                        event.joined 
                          ? 'bg-neon-green/10 border border-neon-green/20 text-neon-green hover:bg-neon-green hover:text-black shadow-[0_0_10px_rgba(0,255,157,0.05)]' 
                          : 'bg-neon-green text-black hover:bg-neon-green/90 shadow-[0_0_10px_rgba(0,255,157,0.15)]'
                      }`}
                    >
                      {event.joined ? (
                        <>
                          <CheckCircle2 size={12} />
                          <span>Joined</span>
                        </>
                      ) : (
                        <>
                          <CalendarPlus size={12} />
                          <span>Join event (+35 EP)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard & Achievements sidebar */}
        <div className="space-y-6">
          {/* Leaderboard Card */}
          <div className="p-5 rounded-2xl glass-panel space-y-4">
            <h2 className="font-bold text-white text-sm flex items-center gap-2 border-b border-white/5 pb-2">
              <Trophy size={18} className="text-neon-green" />
              <span>Regional Leaderboard</span>
            </h2>

            <div className="space-y-2">
              {leaderboard.map((entry) => (
                <div 
                  key={entry.uid}
                  className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs transition-all ${
                    entry.isCurrentUser 
                      ? 'bg-neon-green/10 border-neon-green text-white font-medium' 
                      : 'bg-white/5 border-white/5 text-foreground/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-mono font-bold text-[10px] text-foreground/45 w-4 text-center">
                      #{entry.rank}
                    </span>
                    <img src={entry.photoURL} alt="" className="w-6 h-6 rounded-full border border-white/10 shrink-0" />
                    <span className="truncate pr-1">{entry.displayName}</span>
                  </div>
                  <span className="font-bold text-neon-green shrink-0 font-mono text-[10px]">
                    {entry.ecoPoints} EP
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements badge cabinet */}
          <div className="p-5 rounded-2xl glass-panel space-y-4">
            <h2 className="font-bold text-white text-sm flex items-center gap-2 border-b border-white/5 pb-2">
              <Award size={18} className="text-neon-green" />
              <span>Badges Cabinet</span>
            </h2>

            <div className="grid grid-cols-2 gap-2">
              {achievements.map((ach) => (
                <div 
                  key={ach.id}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-between ${
                    ach.unlocked 
                      ? 'bg-emerald-950/10 border-neon-green/20' 
                      : 'bg-white/5 border-white/5 opacity-55'
                  }`}
                >
                  <span className="text-2xl py-1">{ach.badgeUrl}</span>
                  <div>
                    <h4 className="text-[10px] font-bold text-white mt-1 leading-snug">{ach.title}</h4>
                    <p className="text-[8px] text-foreground/50 leading-tight mt-0.5 line-clamp-2">{ach.description}</p>
                  </div>
                  {!ach.unlocked && (
                    <span className="text-[8px] text-amber-500 font-bold font-mono mt-1 uppercase">
                      Req: {ach.pointsRequired} EP
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
