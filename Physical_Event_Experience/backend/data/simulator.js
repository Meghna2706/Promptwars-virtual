// In-memory data store for the stadium simulation
const stadiumState = {
  gates: [
    { id: 'gate-n', name: 'North Gate', density: 'Low', waitTime: 5 },
    { id: 'gate-s', name: 'South Gate', density: 'Medium', waitTime: 15 },
    { id: 'gate-e', name: 'East Gate', density: 'High', waitTime: 45 },
    { id: 'gate-w', name: 'West Gate', density: 'Low', waitTime: 2 },
  ],
  foodStalls: [
    { id: 'food-1', name: 'Burger Point', waitTime: 10, queue: 15 },
    { id: 'food-2', name: 'Pizza Corner', waitTime: 25, queue: 30 },
    { id: 'food-3', name: 'Vegan Delight', waitTime: 5, queue: 3 },
    { id: 'food-4', name: 'Drinks & Snacks', waitTime: 15, queue: 20 },
  ],
  parkingZones: [
    { id: 'park-a', name: 'Zone A', capacity: 500, available: 120, status: 'Filling' },
    { id: 'park-b', name: 'Zone B', capacity: 800, available: 5, status: 'Full' },
    { id: 'park-c', name: 'Zone C', capacity: 1000, available: 850, status: 'Available' },
  ],
  alerts: [
    { id: 'alert-1', message: 'Gate E is currently experiencing high wait times. Please use Gate N or W.', type: 'warning', timestamp: Date.now() }
  ],
  stats: {
    totalAttendance: 45200,
    capacity: 55000,
  }
};

const DENSITY_LEVELS = ['Low', 'Medium', 'High'];

function simulateData(io) {
  // Update data every 5 seconds
  setInterval(() => {
    // 1. Randomize Gate Data
    stadiumState.gates = stadiumState.gates.map(gate => {
      // Fluctuate wait time by -5 to +5 minutes
      let newWait = gate.waitTime + (Math.floor(Math.random() * 11) - 5);
      newWait = Math.max(0, Math.min(newWait, 60)); // clamp 0-60
      
      let density = 'Low';
      if (newWait > 30) density = 'High';
      else if (newWait > 10) density = 'Medium';

      return { ...gate, waitTime: newWait, density };
    });

    // 2. Randomize Food Stall Data
    stadiumState.foodStalls = stadiumState.foodStalls.map(stall => {
      let newWait = stall.waitTime + (Math.floor(Math.random() * 5) - 2);
      newWait = Math.max(0, Math.min(newWait, 45));
      return { ...stall, waitTime: newWait, queue: Math.floor(newWait * 1.5) };
    });

    // 3. Randomize Parking Data
    stadiumState.parkingZones = stadiumState.parkingZones.map(zone => {
      let newAvail = zone.available + (Math.floor(Math.random() * 21) - 15); // more cars arriving than leaving
      newAvail = Math.max(0, Math.min(newAvail, zone.capacity));
      
      let status = 'Available';
      if (newAvail < zone.capacity * 0.1) status = 'Full';
      else if (newAvail < zone.capacity * 0.3) status = 'Filling';

      return { ...zone, available: newAvail, status };
    });

    // 4. Update Stats
    if (stadiumState.stats.totalAttendance < stadiumState.stats.capacity) {
        stadiumState.stats.totalAttendance += Math.floor(Math.random() * 50);
    }

    // Generate alerts based on state
    generateAlerts(io);

    // Broadcast new state to all connected clients
    io.emit('stadiumUpdate', stadiumState);

  }, 5000); // 5 second tick
}

function generateAlerts(io) {
  let newAlerts = [];
  
  // Gate alerts
  const crowdedGates = stadiumState.gates.filter(g => g.density === 'High');
  if (crowdedGates.length > 0) {
    const gateNames = crowdedGates.map(g => g.name).join(' and ');
    newAlerts.push({
      id: Date.now().toString(),
      message: `${gateNames} experiencing high traffic. Please seek alternative gates.`,
      type: 'warning',
      timestamp: Date.now()
    });
  }

  // Parking alerts
  const fullParking = stadiumState.parkingZones.filter(p => p.status === 'Full');
  if (fullParking.length > 0) {
      const parkNames = fullParking.map(p => p.name).join(' and ');
      newAlerts.push({
          id: (Date.now() + 1).toString(),
          message: `${parkNames} parking is full. Please proceed to Zone C.`,
          type: 'info',
          timestamp: Date.now()
      });
  }

  // Only keep the most recent 5 alerts to avoid spam
  if (newAlerts.length > 0) {
     stadiumState.alerts = [...newAlerts, ...stadiumState.alerts].slice(0, 5);
     io.emit('newAlert', newAlerts[0]);
  }
}

module.exports = { simulateData, stadiumState };
