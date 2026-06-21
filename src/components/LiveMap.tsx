'use client';

import { useState } from 'react';
import { MapPin, Navigation, Search, Check, Zap, Trees, ShieldAlert, Footprints, Trash2, ArrowRight } from 'lucide-react';

interface EcoLocation {
  id: string;
  name: string;
  category: 'EV Charging' | 'Recycling' | 'Public Transport' | 'Water Refill' | 'Sustainable Store' | 'Solar Location' | 'Tree Plantation';
  lat: number;
  lng: number;
  address: string;
  savings: string; // e.g. "1.2 kg CO2"
  distance: string; // e.g. "0.8 km"
  details: string;
}

const MOCK_ECO_LOCATIONS: EcoLocation[] = [
  { id: '1', name: 'ChargePoint Supercharger', category: 'EV Charging', lat: 100, lng: 140, address: '482 Broadway St', savings: '4.8 kg CO2/charge', distance: '1.2 km', details: '6 ultra-fast 150kW CCS chargers powered by local solar arrays.' },
  { id: '2', name: 'Metro Transit Hub', category: 'Public Transport', lat: 150, lng: 220, address: 'Union Square Stn', savings: '2.5 kg CO2/trip', distance: '0.4 km', details: 'Subway lines L1 and L3, connections to electric bus grid.' },
  { id: '3', name: 'E-Waste Recycling Center', category: 'Recycling', lat: 240, lng: 90, address: '89 Recycle Blvd', savings: '12 kg CO2/device', distance: '3.1 km', details: 'Accepts batteries, old phones, copper wires, and computers.' },
  { id: '4', name: 'EcoVibe Organic Grocery', category: 'Sustainable Store', lat: 80, lng: 260, address: '12 Green Way', savings: '1.1 kg CO2/visit', distance: '1.8 km', details: 'Bulk foods, zero packaging, local organic supplier produce.' },
  { id: '5', name: 'Greenwood Forest Tree Zone', category: 'Tree Plantation', lat: 290, lng: 280, address: 'East Meadow Reserve', savings: '22 kg CO2/tree/year', distance: '4.5 km', details: 'Active reforestation project. Volunteers plant saplings every Sunday.' },
  { id: '6', name: 'HydroFill Water Kiosk', category: 'Water Refill', lat: 160, lng: 110, address: 'City Central Park North', savings: '0.4 kg CO2/bottle', distance: '0.8 km', details: 'Filtered chilled spring water station, 100% free of charge.' },
  { id: '7', name: 'Downtown Solar Plaza', category: 'Solar Location', lat: 210, lng: 190, address: 'Roof Level, Civic Mall', savings: '18kg CO2/day', distance: '2.3 km', details: 'Community solar canopy providing free public device charging outlets.' }
];

export default function LiveMap() {
  const [locations, setLocations] = useState<EcoLocation[]>(MOCK_ECO_LOCATIONS);
  const [selectedLoc, setSelectedLoc] = useState<EcoLocation | null>(MOCK_ECO_LOCATIONS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCat, setFilterCat] = useState<string>('All');
  const [routing, setRouting] = useState(false);
  const [routeDrawn, setRouteDrawn] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.toLowerCase();
    const filtered = MOCK_ECO_LOCATIONS.filter(loc => 
      loc.name.toLowerCase().includes(q) || 
      loc.category.toLowerCase().includes(q) || 
      loc.address.toLowerCase().includes(q)
    );
    setLocations(filtered);
    if (filtered.length > 0) {
      setSelectedLoc(filtered[0]);
    }
  };

  const handleFilter = (cat: string) => {
    setFilterCat(cat);
    setRouteDrawn(false);
    if (cat === 'All') {
      setLocations(MOCK_ECO_LOCATIONS);
    } else {
      setLocations(MOCK_ECO_LOCATIONS.filter(loc => loc.category === cat));
    }
  };

  const startRoute = () => {
    setRouting(true);
    setTimeout(() => {
      setRouting(false);
      setRouteDrawn(true);
    }, 1200); // Simulate routing animation delay
  };

  const categories = [
    'All', 'EV Charging', 'Public Transport', 'Recycling', 'Sustainable Store', 'Tree Plantation', 'Water Refill', 'Solar Location'
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
      {/* Map Control Sidebar */}
      <div className="lg:col-span-1 flex flex-col justify-between h-full space-y-4">
        <div className="space-y-4 flex-1 overflow-y-auto pr-1">
          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Eco Locations..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder:text-foreground/30 focus:border-neon-green/50 outline-none transition-all"
            />
            <Search size={14} className="absolute left-3.5 top-3.5 text-foreground/30" />
          </form>

          {/* Category Quick Filter */}
          <div className="space-y-1.5">
            <h3 className="text-[10px] text-foreground/45 font-bold uppercase tracking-wider pl-1">
              Category Filters
            </h3>
            <div className="flex flex-wrap gap-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-medium border transition-all ${
                    filterCat === cat 
                      ? 'bg-neon-green/10 border-neon-green text-neon-green font-semibold' 
                      : 'bg-white/5 border-white/5 text-foreground/60 hover:border-white/15 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Location Results List */}
          <div className="space-y-2">
            <h3 className="text-[10px] text-foreground/45 font-bold uppercase tracking-wider pl-1">
              Eco Hubs Found ({locations.length})
            </h3>
            <div className="space-y-2 max-h-56 lg:max-h-80 overflow-y-auto pr-1">
              {locations.map(loc => (
                <button
                  key={loc.id}
                  onClick={() => {
                    setSelectedLoc(loc);
                    setRouteDrawn(false);
                  }}
                  className={`w-full p-3 rounded-xl border text-left transition-all ${
                    selectedLoc?.id === loc.id 
                      ? 'bg-neon-green/10 border-neon-green text-white shadow-[0_0_10px_rgba(0,255,157,0.05)]' 
                      : 'bg-white/5 border-white/5 hover:border-white/15 text-foreground/70 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                      loc.category === 'EV Charging' ? 'bg-amber-500/10 text-amber-300' :
                      loc.category === 'Tree Plantation' ? 'bg-green-500/10 text-green-300' :
                      loc.category === 'Recycling' ? 'bg-emerald-500/10 text-emerald-300' :
                      'bg-teal-500/10 text-teal-300'
                    }`}>
                      {loc.category}
                    </span>
                    <span className="text-[9px] text-foreground/40 font-mono">{loc.distance}</span>
                  </div>
                  <h4 className="text-xs font-bold mt-1.5">{loc.name}</h4>
                  <p className="text-[10px] text-foreground/45 truncate mt-0.5">{loc.address}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Location Info Card */}
        {selectedLoc && (
          <div className="p-4 rounded-xl glass-panel border border-neon-green/20 space-y-3 bg-[#06120b]/80 shadow-[0_0_20px_rgba(0,255,157,0.05)]">
            <div>
              <span className="text-[9px] text-neon-green font-bold uppercase tracking-wider">{selectedLoc.category}</span>
              <h3 className="font-bold text-white text-sm mt-0.5">{selectedLoc.name}</h3>
              <p className="text-[10px] text-foreground/40 mt-0.5">{selectedLoc.address}</p>
            </div>
            <p className="text-[10px] text-foreground/60 leading-relaxed">{selectedLoc.details}</p>
            
            <div className="grid grid-cols-2 gap-2 text-center border-t border-white/5 pt-2 text-[10px]">
              <div>
                <div className="text-foreground/40">Savings</div>
                <div className="font-bold text-neon-green font-mono">{selectedLoc.savings}</div>
              </div>
              <div>
                <div className="text-foreground/40">Distance</div>
                <div className="font-bold text-white font-mono">{selectedLoc.distance}</div>
              </div>
            </div>

            <button
              onClick={startRoute}
              disabled={routing}
              className="w-full py-2 rounded-lg bg-neon-green text-black font-bold text-xs hover:bg-neon-green/90 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {routing ? (
                <>
                  <Zap size={14} className="animate-spin" />
                  <span>Computing ECO Route...</span>
                </>
              ) : (
                <>
                  <Navigation size={14} />
                  <span>Directions & Savings</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Futuristic Vector Interactive Map View */}
      <div className="lg:col-span-3 rounded-2xl glass-panel border border-white/10 relative overflow-hidden h-full flex flex-col justify-end min-h-[350px]">
        {/* Glowing HUD indicators */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-[#020604]/80 backdrop-blur border border-white/10 text-[10px] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            <span className="text-foreground/60 font-mono">MAP: ECOVERSE_METROPOLIS</span>
          </div>
        </div>

        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-[#020604]/80 backdrop-blur border border-white/10 text-[10px] flex items-center gap-1.5 text-neon-green font-mono font-bold">
            <span>SAVINGS INDEX: +92%</span>
          </div>
        </div>

        {/* Vector SVG Grid Visualizer */}
        <div className="absolute inset-0 bg-[#020804] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,255,157,0.06),rgba(0,0,0,0))] flex items-center justify-center">
          <svg className="w-full h-full text-white/5 opacity-80" viewBox="0 0 400 400">
            {/* Grid Lines */}
            <defs>
              <pattern id="cityGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cityGrid)" />

            {/* City Road Network */}
            <path d="M 40 160 L 360 160 M 200 40 L 200 360 M 120 40 L 120 360 M 280 40 L 280 360 M 40 240 L 360 240" fill="none" stroke="rgba(0, 255, 157, 0.12)" strokeWidth="3" />
            <path d="M 40 100 L 360 100 M 40 300 L 360 300 M 80 40 L 80 360 M 320 40 L 320 360" fill="none" stroke="rgba(0, 255, 157, 0.08)" strokeWidth="1.5" />

            {/* River feature */}
            <path d="M 0 380 Q 100 340 180 350 T 400 320" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="18" strokeLinecap="round" />
            
            {/* Reforestation Zone */}
            <circle cx="290" cy="280" r="35" fill="rgba(16, 185, 129, 0.08)" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
            
            {/* Route Animation */}
            {routeDrawn && selectedLoc && (
              <>
                {/* Starting location: Central User point (200, 160) */}
                <path 
                  d={`M 200 160 H ${selectedLoc.lng} V ${selectedLoc.lat}`} 
                  fill="none" 
                  stroke="#00ff9d" 
                  strokeWidth="3.5" 
                  strokeLinecap="round"
                  className="animate-in fade-in duration-300"
                  strokeDasharray="8 4"
                />
                
                {/* User Pin */}
                <circle cx="200" cy="160" r="6" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" className="animate-pulse" />
                <text x="210" y="163" fill="#ffffff" fontSize="8" fontWeight="bold">Current Location</text>
              </>
            )}

            {/* Map Markers for matching filtered locations */}
            {locations.map(loc => {
              const isSelected = selectedLoc?.id === loc.id;
              return (
                <g 
                  key={loc.id} 
                  transform={`translate(${loc.lng}, ${loc.lat})`}
                  onClick={() => {
                    setSelectedLoc(loc);
                    setRouteDrawn(false);
                  }}
                  className="cursor-pointer group"
                >
                  {/* Pin Glow ring */}
                  <circle 
                    cx="0" 
                    cy="0" 
                    r={isSelected ? '14' : '9'} 
                    fill={isSelected ? 'rgba(0, 255, 157, 0.25)' : 'rgba(0, 255, 157, 0.08)'} 
                    className="transition-all group-hover:scale-125"
                  />
                  {/* Marker Pin */}
                  <circle 
                    cx="0" 
                    cy="0" 
                    r={isSelected ? '6' : '4'} 
                    fill={isSelected ? '#00ff9d' : '#10b981'} 
                    stroke="#020604" 
                    strokeWidth="1.5" 
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Dynamic Route Info Overlay panel */}
        {routeDrawn && selectedLoc && (
          <div className="m-4 z-20 p-3 rounded-xl bg-[#020604]/90 backdrop-blur border border-neon-green/30 text-xs text-white max-w-sm flex items-center justify-between gap-4 animate-in slide-in-from-bottom-2">
            <div className="flex gap-2.5 items-center">
              <div className="p-2 rounded bg-neon-green/10 text-neon-green">
                <Footprints size={16} className="animate-bounce" />
              </div>
              <div>
                <span className="font-bold text-neon-green">Route Calculated</span>
                <p className="text-[10px] text-foreground/50">Walk/Transit saves {selectedLoc.savings}</p>
              </div>
            </div>
            <div className="font-mono font-bold text-white text-xs">{selectedLoc.distance}</div>
          </div>
        )}
      </div>
    </div>
  );
}
