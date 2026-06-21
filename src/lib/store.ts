import { useState, useEffect } from 'react';

// Interfaces matching Firestore Schema
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  ecoPoints: number;
  level: 'Seed' | 'Sapling' | 'Tree' | 'Forest' | 'Planet Guardian' | 'Climate Hero';
  climateAge: number;
  carbonScore: number; // 0-100 (lower emissions -> higher score)
  monthlyEmissions: number; // in kg CO2
  habits: {
    transport: 'car' | 'public' | 'bike' | 'walk';
    food: 'meat-heavy' | 'vegetarian' | 'vegan' | 'low-carbon';
    energy: 'grid' | 'solar' | 'wind' | 'mixed';
    shopping: 'high-consumption' | 'moderate' | 'minimalist';
    water: 'high' | 'moderate' | 'low';
  };
}

export interface CarbonLog {
  id: string;
  uid: string;
  date: string; // YYYY-MM-DD
  transport: number; // kg CO2
  food: number; // kg CO2
  energy: number; // kg CO2
  shopping: number; // kg CO2
  water: number; // kg CO2
  total: number; // kg CO2
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  category: 'Transportation' | 'Food' | 'Energy' | 'Shopping' | 'Water';
  points: number;
  completed: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  badgeUrl: string;
  pointsRequired: number;
  unlocked: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  category: 'Renewable energy' | 'Sustainable living' | 'Electric vehicles' | 'Climate change' | 'Waste management';
  youtubeId: string;
  duration: string;
  points: number;
  watched: boolean;
  bookmarked: boolean;
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  category: 'Tree Plantation' | 'Recycling Drive' | 'Clean Energy' | 'Awareness';
  date: string;
  location: string;
  joined: boolean;
  participants: number;
  impactEstimate: string; // e.g. "Reduces 50kg CO2 per person"
}

export interface LeaderboardEntry {
  uid: string;
  displayName: string;
  photoURL: string;
  ecoPoints: number;
  level: string;
  rank: number;
  isCurrentUser?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'Reusable products' | 'Solar gadgets' | 'Sustainable fashion' | 'Eco home products';
  pricePoints: number;
  image: string;
  carbonSavings: string; // e.g. "12kg CO2/year"
  description: string;
}

export interface OffsetProject {
  id: string;
  title: string;
  description: string;
  costPoints: number;
  impactMetric: string; // e.g. "Offsets 100kg CO2"
  image: string;
  fundedCount: number;
}

// Level Mapping
export const LEVEL_THRESHOLD = {
  Seed: 0,
  Sapling: 200,
  Tree: 500,
  Forest: 1000,
  'Planet Guardian': 2000,
  'Climate Hero': 4000
};

export const getLevel = (points: number): UserProfile['level'] => {
  if (points >= LEVEL_THRESHOLD['Climate Hero']) return 'Climate Hero';
  if (points >= LEVEL_THRESHOLD['Planet Guardian']) return 'Planet Guardian';
  if (points >= LEVEL_THRESHOLD['Forest']) return 'Forest';
  if (points >= LEVEL_THRESHOLD['Tree']) return 'Tree';
  if (points >= LEVEL_THRESHOLD['Sapling']) return 'Sapling';
  return 'Seed';
};

// ----------------------------------------------------
// INITIAL MOCK / PRELOADED DATA
// ----------------------------------------------------

const DEFAULT_USER: UserProfile = {
  uid: 'eco-twin-user-id',
  email: 'climate.twin@ecoverse.ai',
  displayName: 'Eco Pioneer',
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  ecoPoints: 120,
  level: 'Seed',
  climateAge: 32,
  carbonScore: 68,
  monthlyEmissions: 410,
  habits: {
    transport: 'car',
    food: 'meat-heavy',
    energy: 'grid',
    shopping: 'moderate',
    water: 'moderate'
  }
};

const PRELOADED_CARBON_LOGS = (uid: string): CarbonLog[] => {
  const logs: CarbonLog[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 15);
    const dateStr = d.toISOString().split('T')[0];
    
    // Simulating slight improvement over past 6 months
    const multiplier = 1 - (i * 0.05); // higher i (further in past) means higher emissions
    logs.push({
      id: `log-month-${i}`,
      uid,
      date: dateStr,
      transport: Math.round(180 * multiplier),
      food: Math.round(120 * multiplier),
      energy: Math.round(110 * multiplier),
      shopping: Math.round(60 * multiplier),
      water: Math.round(30 * multiplier),
      total: Math.round((180 + 120 + 110 + 60 + 30) * multiplier)
    });
  }
  return logs;
};

const PRELOADED_MISSIONS: Mission[] = [
  { id: 'm-1', title: 'Avoid plastic bottles', description: 'Carry a reusable water container throughout the day.', category: 'Water', points: 30, completed: false },
  { id: 'm-2', title: 'Use public transit or bike', description: 'Swap a single car journey for the bus, train, or cycling.', category: 'Transportation', points: 50, completed: false },
  { id: 'm-3', title: 'Zero standby power', description: 'Unplug all electrical devices that are left on standby mode.', category: 'Energy', points: 25, completed: false },
  { id: 'm-4', title: 'Plant a local sapling', description: 'Plant a seed or native sapling in a garden or community space.', category: 'Energy', points: 100, completed: false },
  { id: 'm-5', title: 'Meat-free day', description: 'Consume entirely plant-based meals today.', category: 'Food', points: 40, completed: false }
];

const PRELOADED_ACHIEVEMENTS: Achievement[] = [
  { id: 'a-1', title: 'Green Init', description: 'Create your digital climate twin avatar.', badgeUrl: '🌱', pointsRequired: 0, unlocked: true },
  { id: 'a-2', title: 'Carbon Cutter', description: 'Reduce monthly emissions by 10% below average.', badgeUrl: '📉', pointsRequired: 150, unlocked: false },
  { id: 'a-3', title: 'Zero Waste Hero', description: 'Complete 5 water or plastic conservation missions.', badgeUrl: '♻️', pointsRequired: 300, unlocked: false },
  { id: 'a-4', title: 'Transit Champion', description: 'Rely purely on public transit/walking for a week.', badgeUrl: '🚴', pointsRequired: 500, unlocked: false },
  { id: 'a-5', title: 'Eco Guardian', description: 'Fund your first offset tree planting project.', badgeUrl: '🌳', pointsRequired: 800, unlocked: false }
];

const PRELOADED_VIDEOS: VideoItem[] = [
  { id: 'v-1', title: 'Introduction to Climate Science & Carbon Footprint', category: 'Climate change', youtubeId: 'Y3gqoDUt_ek', duration: '8:45', points: 30, watched: false, bookmarked: false },
  { id: 'v-2', title: 'How Wind and Solar Energy Power Our Future Grid', category: 'Renewable energy', youtubeId: 'RnvCbOCtM_A', duration: '6:12', points: 25, watched: false, bookmarked: false },
  { id: 'v-3', title: 'The Lifecycle of Electric Vehicle Batteries', category: 'Electric vehicles', youtubeId: '1o6m36EPr1M', duration: '11:20', points: 40, watched: false, bookmarked: false },
  { id: 'v-4', title: 'Zero-Waste Masterclass: Practical Home Tips', category: 'Waste management', youtubeId: 'OasbYWF4_S8', duration: '9:05', points: 30, watched: false, bookmarked: false },
  { id: 'v-5', title: 'Regenerative Agriculture: Can Soil Save Us?', category: 'Sustainable living', youtubeId: 'c2z6Tz-z8-8', duration: '7:50', points: 35, watched: false, bookmarked: false }
];

const PRELOADED_EVENTS: CommunityEvent[] = [
  { id: 'e-1', title: 'Green Oasis Tree Plantation', description: 'Join local volunteers to plant 100 native oak and pine trees in the municipal park.', category: 'Tree Plantation', date: 'Next Saturday at 9:00 AM', location: 'Greenwood Park Sector-4', joined: false, participants: 42, impactEstimate: 'Reduces 22kg CO2 per tree/year' },
  { id: 'e-2', title: 'Solar Gadgets Workshop', description: 'Learn how to construct solar lanterns and small power banks using recycled electronic scrap.', category: 'Clean Energy', date: 'June 28, 2026', location: 'TechLab Community Center', joined: false, participants: 18, impactEstimate: 'Saves 5kg grid-carbon per device built' },
  { id: 'e-3', title: 'Mega Plastic Recycling Drive', description: 'Bring single-use plastics and waste items to trade for local garden compost and saplings.', category: 'Recycling Drive', date: 'July 5, 2026', location: 'Downtown Civic Center Plaza', joined: false, participants: 89, impactEstimate: 'Avoids 1.2kg plastic land/water pollution' }
];

const PRELOADED_PRODUCTS: Product[] = [
  { id: 'p-1', name: 'Smart Solar Phone Charger', category: 'Solar gadgets', pricePoints: 150, image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=300', carbonSavings: '45kg CO2/year', description: 'Waterproof solar folding panels that fast-charge devices on clean sun energy.' },
  { id: 'p-2', name: 'Zero Waste Stainless Flask', category: 'Reusable products', pricePoints: 60, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=300', carbonSavings: '12kg CO2/year', description: 'Double-walled vacuum insulated canteen, replacing hundreds of plastic cups.' },
  { id: 'p-3', name: 'Organic Bamboo Dinnerware Set', category: 'Reusable products', pricePoints: 80, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=300', carbonSavings: '8kg CO2/year', description: 'Biodegradable, durable dining set manufactured with zero synthetic chemical resins.' },
  { id: 'p-4', name: 'Recycled Ocean Plastic Windbreaker', category: 'Sustainable fashion', pricePoints: 250, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=300', carbonSavings: '32kg CO2/year', description: 'Ultra-lightweight weather-resistant jacket spun from certified ocean plastic fibers.' }
];

const PRELOADED_OFFSETS: OffsetProject[] = [
  { id: 'o-1', title: 'Amazon Rainforest Protection', description: 'Protect threatened parcels of high-biodiversity rainforest from illegal deforestation.', costPoints: 100, impactMetric: 'Offsets 250kg CO2', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=350', fundedCount: 154 },
  { id: 'o-2', title: 'Sahara Solar Farm Expansion', description: 'Install photovotaic arrays providing clean energy, offsetting coal generation.', costPoints: 180, impactMetric: 'Offsets 500kg CO2', image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=350', fundedCount: 88 },
  { id: 'o-3', title: 'Coastal Mangrove Restoration', description: 'Plant blue carbon mangroves on degraded coastlines with 10x carbon absorption density.', costPoints: 80, impactMetric: 'Offsets 200kg CO2', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=350', fundedCount: 312 }
];

const MOCK_LEADERBOARD = (uid: string, currentPoints: number, currentName: string): LeaderboardEntry[] => [
  { uid: 'l-1', displayName: 'Sarah Jenkins (Climate Hero)', photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', ecoPoints: 4320, level: 'Climate Hero', rank: 1 },
  { uid: 'l-2', displayName: 'Marcus Aurelius', photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', ecoPoints: 2150, level: 'Planet Guardian', rank: 2 },
  { uid: 'l-3', displayName: 'EcoWarrior_01', photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', ecoPoints: 1100, level: 'Forest', rank: 3 },
  { uid: uid, displayName: currentName || 'You', photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', ecoPoints: currentPoints, level: getLevel(currentPoints), rank: 4, isCurrentUser: true },
  { uid: 'l-4', displayName: 'Jane Green', photoURL: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150', ecoPoints: 80, level: 'Seed', rank: 5 }
];

// Helper to calculate Carbon metrics based on habit selections
export const calculateTwinMetrics = (habits: UserProfile['habits']) => {
  let transportEmissions = 180;
  if (habits.transport === 'public') transportEmissions = 60;
  else if (habits.transport === 'bike') transportEmissions = 10;
  else if (habits.transport === 'walk') transportEmissions = 2;

  let foodEmissions = 120;
  if (habits.food === 'vegetarian') foodEmissions = 50;
  else if (habits.food === 'vegan') foodEmissions = 30;
  else if (habits.food === 'low-carbon') foodEmissions = 75;

  let energyEmissions = 115;
  if (habits.energy === 'solar') energyEmissions = 5;
  else if (habits.energy === 'wind') energyEmissions = 2;
  else if (habits.energy === 'mixed') energyEmissions = 60;

  let shoppingEmissions = 60;
  if (habits.shopping === 'high-consumption') shoppingEmissions = 120;
  else if (habits.shopping === 'minimalist') shoppingEmissions = 20;

  let waterEmissions = 30;
  if (habits.water === 'high') waterEmissions = 60;
  else if (habits.water === 'low') waterEmissions = 10;

  const total = transportEmissions + foodEmissions + energyEmissions + shoppingEmissions + waterEmissions;
  
  // Scoring formula: Score out of 100. Lower emissions is better.
  // Standard global average footprint is about 500kg CO2 per month in our system scale.
  // 500kg -> 0 score. 62kg -> 100 score.
  const score = Math.max(10, Math.min(99, Math.round(100 - ((total - 62) / (500 - 62)) * 90)));
  
  // Climate age: baseline age is, say, 30. Higher score makes you "younger" (healthier) or "older"
  const ageOffset = Math.round((50 - score) / 5);
  const climateAge = 30 + ageOffset;

  return {
    monthlyEmissions: total,
    carbonScore: score,
    climateAge: Math.max(18, climateAge)
  };
};

export const useEcoStore = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [logs, setLogs] = useState<CarbonLog[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [offsets, setOffsets] = useState<OffsetProject[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize Store from LocalStorage or preloads
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('ecoverse_user');
      const storedLogs = localStorage.getItem('ecoverse_logs');
      const storedMissions = localStorage.getItem('ecoverse_missions');
      const storedAchievements = localStorage.getItem('ecoverse_achievements');
      const storedVideos = localStorage.getItem('ecoverse_videos');
      const storedEvents = localStorage.getItem('ecoverse_events');
      
      let currentUser: UserProfile;
      if (storedUser) {
        currentUser = JSON.parse(storedUser);
      } else {
        currentUser = DEFAULT_USER;
        localStorage.setItem('ecoverse_user', JSON.stringify(currentUser));
      }
      setUser(currentUser);

      if (storedLogs) {
        setLogs(JSON.parse(storedLogs));
      } else {
        const initialLogs = PRELOADED_CARBON_LOGS(currentUser.uid);
        setLogs(initialLogs);
        localStorage.setItem('ecoverse_logs', JSON.stringify(initialLogs));
      }

      if (storedMissions) {
        setMissions(JSON.parse(storedMissions));
      } else {
        setMissions(PRELOADED_MISSIONS);
        localStorage.setItem('ecoverse_missions', JSON.stringify(PRELOADED_MISSIONS));
      }

      if (storedAchievements) {
        setAchievements(JSON.parse(storedAchievements));
      } else {
        setAchievements(PRELOADED_ACHIEVEMENTS);
        localStorage.setItem('ecoverse_achievements', JSON.stringify(PRELOADED_ACHIEVEMENTS));
      }

      if (storedVideos) {
        setVideos(JSON.parse(storedVideos));
      } else {
        setVideos(PRELOADED_VIDEOS);
        localStorage.setItem('ecoverse_videos', JSON.stringify(PRELOADED_VIDEOS));
      }

      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      } else {
        setEvents(PRELOADED_EVENTS);
        localStorage.setItem('ecoverse_events', JSON.stringify(PRELOADED_EVENTS));
      }

      setProducts(PRELOADED_PRODUCTS);
      setOffsets(PRELOADED_OFFSETS);
    } catch (e) {
      console.error("Failed to load ecoverse data from localStorage", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save utility helpers
  const saveUser = (updated: UserProfile) => {
    setUser(updated);
    localStorage.setItem('ecoverse_user', JSON.stringify(updated));
  };

  const saveLogs = (updated: CarbonLog[]) => {
    setLogs(updated);
    localStorage.setItem('ecoverse_logs', JSON.stringify(updated));
  };

  const saveMissions = (updated: Mission[]) => {
    setMissions(updated);
    localStorage.setItem('ecoverse_missions', JSON.stringify(updated));
  };

  const saveAchievements = (updated: Achievement[]) => {
    setAchievements(updated);
    localStorage.setItem('ecoverse_achievements', JSON.stringify(updated));
  };

  const saveVideos = (updated: VideoItem[]) => {
    setVideos(updated);
    localStorage.setItem('ecoverse_videos', JSON.stringify(updated));
  };

  const saveEvents = (updated: CommunityEvent[]) => {
    setEvents(updated);
    localStorage.setItem('ecoverse_events', JSON.stringify(updated));
  };

  // State mutation actions
  const updateHabits = (newHabits: UserProfile['habits']) => {
    if (!user) return;
    const { monthlyEmissions, carbonScore, climateAge } = calculateTwinMetrics(newHabits);
    const updatedUser: UserProfile = {
      ...user,
      habits: newHabits,
      monthlyEmissions,
      carbonScore,
      climateAge
    };
    saveUser(updatedUser);

    // Record a log for today if we don't have one or update the latest month
    const today = new Date().toISOString().split('T')[0];
    const newLog: CarbonLog = {
      id: `log-${Date.now()}`,
      uid: user.uid,
      date: today,
      transport: Math.round(monthlyEmissions * 0.4),
      food: Math.round(monthlyEmissions * 0.25),
      energy: Math.round(monthlyEmissions * 0.2),
      shopping: Math.round(monthlyEmissions * 0.1),
      water: Math.round(monthlyEmissions * 0.05),
      total: monthlyEmissions
    };
    
    // Add or replace today's log
    const updatedLogs = [newLog, ...logs.filter(l => l.date !== today)];
    saveLogs(updatedLogs);
  };

  const addPoints = (points: number) => {
    if (!user) return 0;
    const currentPoints = user.ecoPoints;
    const nextPoints = currentPoints + points;
    const currentLevel = user.level;
    const nextLevel = getLevel(nextPoints);

    const updatedUser: UserProfile = {
      ...user,
      ecoPoints: nextPoints,
      level: nextLevel
    };
    saveUser(updatedUser);

    // Check if new achievements are unlocked by this points increase
    const updatedAchievements = achievements.map(ach => {
      if (!ach.unlocked && nextPoints >= ach.pointsRequired) {
        return { ...ach, unlocked: true };
      }
      return ach;
    });
    saveAchievements(updatedAchievements);

    // Return true if level up occurred
    return nextLevel !== currentLevel;
  };

  const completeMission = (missionId: string) => {
    const targetMission = missions.find(m => m.id === missionId);
    if (!targetMission || targetMission.completed) return false;

    const updatedMissions = missions.map(m => {
      if (m.id === missionId) return { ...m, completed: true };
      return m;
    });
    saveMissions(updatedMissions);

    // Award points
    const leveledUp = addPoints(targetMission.points);
    return { leveledUp, pointsAwarded: targetMission.points };
  };

  const bookmarkVideo = (videoId: string) => {
    const updatedVideos = videos.map(v => {
      if (v.id === videoId) return { ...v, bookmarked: !v.bookmarked };
      return v;
    });
    saveVideos(updatedVideos);
  };

  const watchVideo = (videoId: string) => {
    const video = videos.find(v => v.id === videoId);
    if (!video || video.watched) return false;

    const updatedVideos = videos.map(v => {
      if (v.id === videoId) return { ...v, watched: true };
      return v;
    });
    saveVideos(updatedVideos);

    const leveledUp = addPoints(video.points);
    return { leveledUp, pointsAwarded: video.points };
  };

  const joinEvent = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    const updatedEvents = events.map(e => {
      if (e.id === eventId) {
        const isJoining = !e.joined;
        return {
          ...e,
          joined: isJoining,
          participants: isJoining ? e.participants + 1 : e.participants - 1
        };
      }
      return e;
    });
    saveEvents(updatedEvents);

    // Small incentive for joining events
    if (event && !event.joined) {
      addPoints(35);
    }
  };

  const purchaseProduct = (productId: string) => {
    if (!user) return false;
    const product = products.find(p => p.id === productId);
    if (!product || user.ecoPoints < product.pricePoints) return false;

    const updatedUser: UserProfile = {
      ...user,
      ecoPoints: user.ecoPoints - product.pricePoints
    };
    saveUser(updatedUser);
    
    // Deduct points, and unlock offset/purchase achievements
    return true;
  };

  const fundOffset = (projectId: string) => {
    if (!user) return false;
    const project = offsets.find(o => o.id === projectId);
    if (!project || user.ecoPoints < project.costPoints) return false;

    const updatedUser: UserProfile = {
      ...user,
      ecoPoints: user.ecoPoints - project.costPoints
    };
    saveUser(updatedUser);

    setOffsets(prev => prev.map(p => {
      if (p.id === projectId) return { ...p, fundedCount: p.fundedCount + 1 };
      return p;
    }));

    return true;
  };

  const resetAll = () => {
    localStorage.removeItem('ecoverse_user');
    localStorage.removeItem('ecoverse_logs');
    localStorage.removeItem('ecoverse_missions');
    localStorage.removeItem('ecoverse_achievements');
    localStorage.removeItem('ecoverse_videos');
    localStorage.removeItem('ecoverse_events');
    window.location.reload();
  };

  const getLeaderboard = (): LeaderboardEntry[] => {
    if (!user) return [];
    return MOCK_LEADERBOARD(user.uid, user.ecoPoints, user.displayName).sort((a, b) => b.ecoPoints - a.ecoPoints);
  };

  return {
    user,
    logs,
    missions,
    achievements,
    videos,
    events,
    products,
    offsets,
    loading,
    updateHabits,
    completeMission,
    bookmarkVideo,
    watchVideo,
    joinEvent,
    purchaseProduct,
    fundOffset,
    resetAll,
    getLeaderboard,
    addPoints
  };
};
