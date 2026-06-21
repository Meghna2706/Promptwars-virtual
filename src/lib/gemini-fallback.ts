// Contextual mock answers for Gemini questions, image scanning, and reports.

export const getMockChatResponse = (query: string): string => {
  const q = query.toLowerCase();
  
  if (q.includes('flight') || q.includes('plane') || q.includes('fly')) {
    return `### ✈️ Carbon Impact of Aviation

A typical commercial passenger flight produces substantial greenhouse gas emissions:
* **Short-haul flight (< 1,500 km)**: ~150g of CO2 per passenger kilometer.
* **Long-haul flight (> 1,500 km)**: ~110g of CO2 per passenger kilometer, though takeoff energy is averaged over more distance, radiative forcing at high altitudes multiplies the climate impact by **1.9x**.
* **Example**: A round trip from London to New York emits roughly **1.6 tonnes of CO2 equivalent (CO2e)** per economy passenger. This is equivalent to heating a European home for an entire year!

#### 🚀 Recommended Actions:
1. **Prefer Rail**: For distances under 800 km, high-speed rail has up to **90% lower** emissions.
2. **Offset Wisely**: If you must fly, fund gold-standard carbon offset projects that actively plant mangroves or expand solar infrastructure.
3. **Direct Flights**: Multi-stop flights increase emissions because takeoff and landing are the most carbon-intensive flight phases.`;
  }
  
  if (q.includes('bike') || q.includes('bicycle') || q.includes('cycling')) {
    return `### 🚴 Bicycle vs. Public Transport: The Carbon Breakdown

Riding a bicycle is the absolute gold standard for green urban transit. Let's compare the lifetime emissions (including manufacturing and food calorie fuel):

1. **Bicycle**: **8g to 20g CO2 per km**. The emissions mostly come from the agricultural production of the extra food calories burned while cycling.
2. **Electric Bicycle (E-bike)**: **15g to 22g CO2 per km**. E-bikes are extremely efficient because electric motors convert energy to motion far more efficiently than the human metabolism.
3. **Electric Train / Subway**: **25g to 45g CO2 per passenger-km** (depending on power grid composition).
4. **Diesel Bus**: **80g to 120g CO2 per passenger-km**.
5. **Private Gasoline Car**: **180g to 250g CO2 per km**.

#### 🏁 Verdict:
Cycling is **3-5x better** for the climate than public transport and **15-20x better** than driving a private vehicle. For commutes under 10 km, a bike or E-bike is the clear winner for both your carbon score and cardiovascular health!`;
  }
  
  if (q.includes('reduce') || q.includes('footprint') || q.includes('help') || q.includes('sustain')) {
    return `### 📉 Strategic Carbon Reduction Roadmap

Here are the four highest-impact areas where you can reduce your emissions immediately:

1. **Decarbonize Your Transportation (Impact: High)**
   * Swap 2 drives per week for public transit, cycling, or walking.
   * Shift to electric vehicles (EVs) if purchasing a car, saving up to **3.2 tonnes of CO2/year**.

2. **Transition to Clean Energy (Impact: High)**
   * Install residential solar panels or choose a green energy supplier tariff.
   * Lower your thermostat by 1.5°C to save ~**340kg of CO2/year**.

3. **Adopt a Low-Carbon Diet (Impact: Medium-High)**
   * Reduce red meat consumption. Swapping beef for poultry or plant proteins cuts food emissions by up to **60%**.
   * Reduce food waste; organic waste in landfills decomposes into methane, a potent greenhouse gas.

4. **Conscious Consumption (Impact: Medium)**
   * Practice minimalism. Reusing, repairing, and buying second-hand reduces the manufacturing and shipping footprint of products by **80%**.`;
  }

  // Default response
  return `### 🌱 EcoVerse Climate Twin Intelligence

Thank you for your question: *"${query}"*

As your Climate Twin, here are key insights for you:
* **Current Carbon Score**: 68/100.
* **Target Score**: 85/100 (which would align your lifestyle with the Paris Agreement targets to limit warming to 1.5°C).

**Personalized Suggestion**: I see you frequently use a private car. Sharing rides, switching to an electric vehicle, or working from home just 1 day per week will lower your annual emissions by approximately **380kg of CO2**. 

Would you like me to generate a custom 4-week step-by-step roadmap to help you transition your food, transport, or energy habits?`;
};

export interface ImageScanResult {
  category: string;
  name: string;
  carbonFootprint: string;
  sustainabilityRating: number; // out of 5
  alternatives: string[];
  explanation: string;
}

export const getMockImageScan = (fileName: string): ImageScanResult => {
  const name = fileName.toLowerCase();
  
  if (name.includes('burger') || name.includes('food') || name.includes('meat') || name.includes('beef') || name.includes('steak')) {
    return {
      category: 'Food item',
      name: 'Beef Burger & Fries combo',
      carbonFootprint: '7.8 kg CO2e',
      sustainabilityRating: 1,
      alternatives: [
        'Plant-based patty burger (saves 85% CO2)',
        'Chicken breast sandwich (saves 70% CO2)',
        'Local organic vegetable wraps'
      ],
      explanation: 'Beef is the single most carbon-intensive food source, requiring vast amounts of pastureland, water, and feed. Cattle also emit methane, which has a warming potential 28x higher than carbon dioxide.'
    };
  }
  
  if (name.includes('appliance') || name.includes('fridge') || name.includes('ac') || name.includes('dryer') || name.includes('electricity')) {
    return {
      category: 'Electric appliance',
      name: 'Non-Energy-Star Electric Tumble Dryer',
      carbonFootprint: '2.4 kg CO2 per load',
      sustainabilityRating: 2,
      alternatives: [
        'Solar or air-drying clothes on a rack (0kg CO2)',
        'Heat-pump tumble dryer (saves 50% energy)',
        'Energy Star certified models'
      ],
      explanation: 'Heating appliances (like dryers, electric heaters, and water boilers) require large currents of electrical power. If the local grid is powered by coal or gas, this results in significant indirect emissions.'
    };
  }
  
  if (name.includes('car') || name.includes('vehicle') || name.includes('suv') || name.includes('truck')) {
    return {
      category: 'Vehicle / Transportation',
      name: 'Internal Combustion Engine SUV',
      carbonFootprint: '220g CO2 per km',
      sustainabilityRating: 1.5,
      alternatives: [
        'Electric Vehicle / Hybrid (saves 65-80% CO2)',
        'City train / bus transit (saves 75% CO2)',
        'E-bicycle or carpooling services'
      ],
      explanation: 'Heavy SUVs burn fossil fuels at a high rate. Besides tailpipe carbon, oil drilling, refining, and transportation double the lifecycle footprint of regular fuel.'
    };
  }

  // Default Bill/Shopping scan
  return {
    category: 'Shopping item / Receipt',
    name: 'Paper/Plastic Packaging Item Pack',
    carbonFootprint: '1.2 kg CO2',
    sustainabilityRating: 3,
    alternatives: [
      'Items bought in bulk with zero packaging',
      'Post-consumer recycled cardboard packs',
      'Refillable glass canisters'
    ],
    explanation: 'Single-use plastics and mixed packaging require energy-intensive cracking of petroleum products and are seldom fully recycled. Cardboard is better, but only if sourced from FSC certified forests.'
  };
};

export const getMockWeeklyReport = (displayName: string, habits: any): string => {
  const score = habits.transport === 'bike' || habits.transport === 'walk' ? 'Excellent' : 'Needs Work';
  return `
# EcoVerse AI Weekly Sustainability Report
**Prepared for**: ${displayName}  
**Date**: June 21, 2026

---

## 📈 Executive Summary

Your Carbon Score is **${calculateTwinMetrics(habits).carbonScore}/100**. This week, your estimated lifestyle output was **${Math.round(calculateTwinMetrics(habits).monthlyEmissions / 4)} kg CO2**, placing you in the **${habits.transport === 'car' ? 'upper 40%' : 'lower 30%'}** of emitters in your region.

---

## 🔍 Category Deep-Dive

* **Transportation (Score: ${habits.transport === 'car' ? '20' : '90'})**: Your reliance on **${habits.transport}** is the primary contributor to your footprint. Switching to public transport or e-biking just twice a week will yield immediate gains.
* **Diet (Score: ${habits.food === 'meat-heavy' ? '30' : '85'})**: Food habits are based on **${habits.food}**. Plant-based diets reduce emissions by up to 2.1 tonnes of CO2 per year per person.
* **Energy (Score: ${habits.energy === 'grid' ? '40' : '95'})**: Power sourced via **${habits.energy}**. Clean renewable options reduce local grid loads significantly.

---

## 🎯 Next Week's Action Plan

1. **Unplug & Unwind**: Save 15kg of CO2 by turning off the standby switches on home electronics overnight.
2. **Active Travel**: Cycle or walk for any journeys under 3km instead of driving.
3. **Meatless Monday**: Commit to entirely vegetarian meals on Monday.

*“Every small change updates your digital twin toward a green, flourishing future.”*
`;
};
