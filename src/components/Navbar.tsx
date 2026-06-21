'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, User, Bot, MapPin, Camera, PlayCircle, Users, 
  ShoppingBag, Trees, BarChart3, Menu, X, LogIn, LogOut, Award, Zap, RefreshCw
} from 'lucide-react';
import { mockSignInWithGoogle, mockSignOut, isFirebaseConfigured } from '@/lib/firebase';

interface NavbarProps {
  user: any;
  loading: boolean;
  onRefresh: () => void;
}

export default function Navbar({ user, loading, onRefresh }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [localUser, setLocalUser] = useState<any>(null);

  useEffect(() => {
    // Keep local check of login status
    const stored = localStorage.getItem('ecoverse_logged_in_user');
    if (stored) {
      setLocalUser(JSON.parse(stored));
    } else if (user) {
      setLocalUser(user);
    }
  }, [user]);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Climate Twin', path: '/twin', icon: User },
    { name: 'Carbon Analyzer', path: '/analyzer', icon: Bot },
    { name: 'Live Eco Map', path: '/map', icon: MapPin },
    { name: 'Image Scanner', path: '/scanner', icon: Camera },
    { name: 'Video Hub', path: '/videos', icon: PlayCircle },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    { name: 'Offsets', path: '/offset', icon: Trees },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  ];

  const handleSignIn = async () => {
    setAuthLoading(true);
    try {
      const u = await mockSignInWithGoogle();
      setLocalUser(u);
      window.location.reload();
    } catch (e) {
      console.error(e);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    setAuthLoading(true);
    try {
      await mockSignOut();
      setLocalUser(null);
      localStorage.removeItem('ecoverse_logged_in_user');
      window.location.reload();
    } catch (e) {
      console.error(e);
    } finally {
      setAuthLoading(false);
    }
  };

  // Get Level Badge Color
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Climate Hero': return 'from-red-500 to-amber-500 text-white';
      case 'Planet Guardian': return 'from-purple-500 to-indigo-500 text-white';
      case 'Forest': return 'from-teal-500 to-emerald-500 text-white';
      case 'Tree': return 'from-green-500 to-emerald-400 text-white';
      case 'Sapling': return 'from-lime-500 to-green-400 text-black';
      default: return 'from-emerald-950 to-emerald-800 text-neon-green border border-neon-green/30';
    }
  };

  return (
    <>
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-16 glass-panel border-b border-white/10 z-40 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground/80 hover:text-neon-green"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <Link href="/" className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-neon-green/10 border border-neon-green/20 text-neon-green">
              <Trees size={20} className="animate-pulse" />
            </span>
            <span className="font-bold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-neon-green">
              EcoVerse <span className="text-neon-green text-xs font-semibold px-1 py-0.5 rounded bg-neon-green/10 border border-neon-green/25 ml-1">AI</span>
            </span>
          </Link>
        </div>

        {/* Top bar right dashboard statistics */}
        <div className="flex items-center gap-3 md:gap-6">
          {user && (
            <div className="hidden sm:flex items-center gap-4">
              {/* Eco Points */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-neon-green/20">
                <Zap size={14} className="text-neon-green fill-neon-green/30 animate-bounce" />
                <span className="text-xs text-emerald-200">Points:</span>
                <span className="text-sm font-bold text-neon-green">{user.ecoPoints} EP</span>
              </div>

              {/* Level Badge */}
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${getLevelColor(user.level)} text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-emerald-950/20`}>
                <Award size={12} />
                <span>{user.level}</span>
              </div>
            </div>
          )}

          {/* User actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onRefresh}
              title="Reset Simulated Data"
              className="p-1.5 rounded-full hover:bg-white/5 text-foreground/50 hover:text-neon-green transition-colors"
            >
              <RefreshCw size={14} />
            </button>

            {localUser ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end hidden md:flex">
                  <span className="text-sm font-semibold text-white">{localUser.displayName}</span>
                  <span className="text-[10px] text-foreground/40">{localUser.email}</span>
                </div>
                
                <img 
                  src={localUser.photoURL} 
                  alt="Avatar" 
                  className="w-8 h-8 rounded-full border border-neon-green/40 shadow-inner"
                />

                <button 
                  onClick={handleSignOut}
                  disabled={authLoading}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/30 text-foreground/60 hover:text-red-400 transition-all text-xs flex items-center gap-1.5"
                >
                  <LogOut size={14} />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={handleSignIn}
                disabled={authLoading}
                className="px-3 py-1.5 rounded-lg bg-neon-green/10 border border-neon-green/30 hover:bg-neon-green hover:text-background text-neon-green font-medium transition-all text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,255,157,0.1)] hover:shadow-[0_0_15px_rgba(0,255,157,0.25)]"
              >
                <LogIn size={14} />
                <span>Google Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Desktop Sidebar Navigation */}
      <aside className="fixed top-16 left-0 bottom-0 w-64 glass-panel border-r border-white/10 hidden md:block z-30 p-4">
        <nav className="flex flex-col gap-1.5 h-full overflow-y-auto pr-1">
          <div className="text-[10px] text-foreground/35 font-bold uppercase tracking-widest pl-3 mb-2 mt-2">
            Climate Hub
          </div>
          
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.name} 
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm group ${
                  isActive 
                    ? 'bg-neon-green/10 text-neon-green border border-neon-green/20 font-medium' 
                    : 'text-foreground/75 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <Icon size={18} className={`transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? 'text-neon-green' : 'text-foreground/50 group-hover:text-neon-green'
                }`} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {user && (
            <div className="mt-auto border-t border-white/5 pt-4 pb-2">
              <div className="p-3 rounded-xl bg-neon-green/5 border border-neon-green/10 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground/50">Active Mission</span>
                  <span className="text-neon-green font-semibold">Ready</span>
                </div>
                <div className="text-xs font-medium text-white truncate">
                  Avoid plastic bottles today
                </div>
                <Link 
                  href="/twin"
                  className="text-[10px] text-center py-1 rounded bg-neon-green/10 hover:bg-neon-green hover:text-black font-semibold text-neon-green transition-all"
                >
                  Configure Twin
                </Link>
              </div>
            </div>
          )}
        </nav>
      </aside>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="w-64 h-full bg-background/95 border-r border-white/10 p-5 flex flex-col gap-4 animate-in slide-in-from-left duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm tracking-wider text-neon-green">NAVIGATION</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/5 text-foreground/50 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <nav className="flex flex-col gap-1.5 overflow-y-auto flex-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Link 
                    key={item.name} 
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm ${
                      isActive 
                        ? 'bg-neon-green/10 text-neon-green border border-neon-green/20' 
                        : 'text-foreground/75 hover:bg-white/5'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-neon-green' : 'text-foreground/50'} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {user && (
              <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground/50">Level: {user.level}</span>
                  <span className="text-neon-green">{user.ecoPoints} EP</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
