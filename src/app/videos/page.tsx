'use client';

import { useState } from 'react';
import { useEco, VideoItem } from '@/components/ClientLayout';
import { PlayCircle, Bookmark, CheckCircle2, Award, ArrowUpRight, Flame, Clock, Sparkles } from 'lucide-react';

export default function VideoHubPage() {
  const { videos, bookmarkVideo, watchVideo } = useEco();
  const [selectedVid, setSelectedVid] = useState<VideoItem | null>(videos[0] || null);
  const [activeTab, setActiveTab] = useState<string>('All');
  const [watchedVids, setWatchedVids] = useState<Record<string, boolean>>({});

  const categories = [
    'All', 'Renewable energy', 'Sustainable living', 'Electric vehicles', 'Climate change', 'Waste management'
  ];

  const filteredVideos = activeTab === 'All'
    ? videos
    : videos.filter(v => v.category === activeTab);

  const handleWatchComplete = (videoId: string) => {
    const res = watchVideo(videoId);
    if (res) {
      setWatchedVids(prev => ({ ...prev, [videoId]: true }));
      // Level up confetti check
      if (res.leveledUp) {
        import('canvas-confetti').then((confetti) => {
          confetti.default({ particleCount: 120, spread: 70 });
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="p-5 rounded-2xl glass-panel">
        <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <PlayCircle size={22} className="text-neon-green" />
          <span>Video Learning Hub</span>
        </h1>
        <p className="text-xs text-foreground/50 mt-1">
          Expand your environmental knowledge. Complete educational videos from verified global channels to earn Eco Points (EP) and level up your Climate Twin.
        </p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: Video Player */}
        <div className="lg:col-span-2 space-y-4">
          {selectedVid ? (
            <div className="p-4 rounded-2xl glass-panel space-y-4">
              {/* Embed player container */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-white/5 shadow-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVid.youtubeId}?autoplay=0`}
                  title={selectedVid.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Title and Controls */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-1">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-neon-green uppercase tracking-widest">{selectedVid.category}</span>
                  <h2 className="text-base font-extrabold text-white leading-snug">{selectedVid.title}</h2>
                  <div className="flex items-center gap-3 text-[10px] text-foreground/40 mt-1">
                    <span className="flex items-center gap-1"><Clock size={12} /> {selectedVid.duration} mins</span>
                    <span>•</span>
                    <span className="text-neon-green font-semibold">Reward: {selectedVid.points} EP</span>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0 h-9">
                  <button
                    onClick={() => bookmarkVideo(selectedVid.id)}
                    className={`px-3 rounded-lg border transition-all flex items-center justify-center gap-1.5 text-xs ${
                      selectedVid.bookmarked 
                        ? 'bg-neon-green/10 border-neon-green text-neon-green' 
                        : 'bg-white/5 border-white/10 hover:border-white/20 text-foreground/75'
                    }`}
                  >
                    <Bookmark size={14} className={selectedVid.bookmarked ? 'fill-neon-green' : ''} />
                    <span>{selectedVid.bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                  </button>

                  <button
                    onClick={() => handleWatchComplete(selectedVid.id)}
                    disabled={selectedVid.watched}
                    className={`px-4 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                      selectedVid.watched 
                        ? 'bg-emerald-950/20 border border-neon-green/20 text-neon-green cursor-default' 
                        : 'bg-neon-green text-black hover:bg-neon-green/90 shadow-[0_0_15px_rgba(0,255,157,0.15)]'
                    }`}
                  >
                    {selectedVid.watched ? (
                      <>
                        <CheckCircle2 size={14} />
                        <span>EP Claimed</span>
                      </>
                    ) : (
                      <>
                        <Award size={14} />
                        <span>Claim points</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl glass-panel text-center flex flex-col items-center justify-center h-[350px]">
              <PlayCircle size={36} className="text-foreground/20" />
              <h3 className="text-sm font-bold text-white mt-3">Select Video</h3>
              <p className="text-xs text-foreground/45 mt-1">Select any video from the list to start watching.</p>
            </div>
          )}
        </div>

        {/* Right Side: List items */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-5 rounded-2xl glass-panel space-y-3">
            <h2 className="font-bold text-white text-xs uppercase tracking-wider pl-1">
              Video Lectures
            </h2>

            <div className="flex flex-col gap-2 max-h-[360px] overflow-y-auto pr-1">
              {filteredVideos.map(vid => {
                const isSelected = selectedVid?.id === vid.id;
                return (
                  <button
                    key={vid.id}
                    onClick={() => setSelectedVid(vid)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-3 group ${
                      isSelected 
                        ? 'bg-neon-green/10 border-neon-green text-white' 
                        : 'bg-white/5 border-white/5 hover:border-white/15 text-foreground/75 hover:text-white'
                    }`}
                  >
                    {/* Mock thumbnail overlay */}
                    <div className="w-14 h-10 shrink-0 bg-black/40 rounded border border-white/10 relative overflow-hidden flex items-center justify-center text-foreground/30 group-hover:text-neon-green transition-colors">
                      <img 
                        src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`} 
                        alt="" 
                        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-all"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <PlayCircle size={14} className="z-10" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] text-foreground/40 font-mono flex items-center justify-between">
                        <span>{vid.category}</span>
                        {vid.watched && <span className="text-neon-green font-bold flex items-center gap-0.5"><CheckCircle2 size={8} /> COMPLETED</span>}
                      </div>
                      <h4 className="text-xs font-bold truncate mt-1">{vid.title}</h4>
                      <div className="flex items-center justify-between text-[10px] text-foreground/45 mt-1 font-medium">
                        <span>{vid.duration} mins</span>
                        <span className="text-neon-green">+{vid.points} EP</span>
                      </div>
                    </div>
                  </button>
                );
              })}

              {filteredVideos.length === 0 && (
                <div className="text-center py-8 text-foreground/40 text-xs">
                  No videos under this category.
                </div>
              )}
            </div>
          </div>

          {/* Points Status widget */}
          <div className="p-4 rounded-xl glass-panel bg-gradient-to-br from-emerald-950/20 to-black/40 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-neon-green/10 border border-neon-green/20 text-neon-green">
                <Sparkles size={16} />
              </span>
              <div>
                <span className="text-[10px] text-foreground/50">Carbon Academy</span>
                <p className="text-xs font-bold text-white leading-tight">Learn Sustainability</p>
              </div>
            </div>
            <span className="text-xs text-neon-green font-mono font-bold">Earn up to 160 EP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
