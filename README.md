# EcoVerse AI – Personal Climate Twin

EcoVerse AI is a startup-level premium climate intelligence platform designed to help individuals understand, track, predict, and offset their carbon footprint. The application unifies a dynamic Climate Twin avatar, Gemini-powered carbon chat coach, image scanners, live maps, educational video hub, marketplace, and community gamification mechanics in a gorgeous neon-dark glassmorphism dashboard.

---

## 🚀 Key Features Built-In

1. **AI Climate Twin**: Re-computes footprint metrics (Score, Climate Age, Monthly Outputs) in real-time as users customize their transportation, food, energy, shopping, and water profiles.
2. **Rotating Earth Avatar**: A canvas-based spinning Earth globe that shifts atmosphere and soil colors (vibrant green/blue vs toxic smog brown/orange) matching the twin's score.
3. **AI Carbon Analyzer**: A conversational assistant trained on climate science to answer questions and formulate roadmaps.
4. **Live Eco Map**: Styled vector metropolis city map showing hotspots for EV chargers, subways, recycling plants, and tree plantation zones with route drawing and offset savings.
5. **AI Image Carbon Scanner**: Visual scanner with laser overlays where users upload or click preset items (burgers, dryers, vehicles) to get full lifecycle analysis reports.
6. **Video Learning Hub**: Embedded video player featuring educational sustainability clips, watch progress trackers, bookmarks, and point claims.
7. **Gamification & Badges**: Unlockable cabinet of level badges (Seed -> Climate Hero) dynamically updating from active points counts.
8. **Daily Eco Missions**: Active challenges (Avoid plastic bottles, plant a tree) that check off to yield EP points and confetti upgrades.
9. **Carbon Forecasting AI**: Recharts line-charts predicting 1-year carbon output comparison paths (BAU vs Recommended).
10. **Community Challenges**: Shared event calendars where users join cleaning/planting drives, updating participant stats in real-time.
11. **Advanced Analytics**: Detailed emission breakdown charts (Recharts Area/Pie) and printable PDF reports.
12. **Data Exporters**: Download clean CSV datasheets of carbon history or trigger print layouts.
13. **Green Marketplace**: Redeem earned EP for solar chargers, canteens, and apparel.
14. **Carbon Offsets**: Fund reforestation, blue carbon mangrove, and solar projects with EP.
15. **Emergency Climate Alerts**: Dynamic location warnings (Heat wave, AQI reports) displaying insulating tips.

---

## 🛠️ Tech Stack

* **Frontend**: Next.js 15 (App Router), TypeScript, React 19
* **Styling**: Tailwind CSS v4, Vanilla CSS variables, Glassmorphism
* **Animations**: Canvas Renderers, Framer Motion
* **Analytics**: Recharts
* **AI Intelligence**: Google Gemini 1.5 Flash (via `@google/generative-ai` SDK)
* **Auth & DB**: Firebase Authentication & Firestore (with automated LocalStorage mock fallback layer)
* **PWA**: manifest.json, launcher configurations, offline-mode ready

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Dashboard)
│   ├── twin/page.tsx (Climate Twin)
│   ├── analyzer/page.tsx (Carbon Analyzer Chat)
│   ├── map/page.tsx (Live Eco Map)
│   ├── scanner/page.tsx (AI Image Scanner)
│   ├── videos/page.tsx (Video Learning Hub)
│   ├── community/page.tsx (Challenges, Events)
│   ├── marketplace/page.tsx (Green Marketplace)
│   ├── offset/page.tsx (Carbon Offset & Reforestation)
│   ├── analytics/page.tsx (Advanced Analytics & Exports)
│   ├── api/
│   │   ├── gemini/
│   │   │   ├── chat/route.ts
│   │   │   ├── scan/route.ts
│   │   │   └── report/route.ts
│   └── manifest.json
├── components/
│   ├── Navbar.tsx
│   ├── ParticleBackground.tsx
│   ├── EarthTwin.tsx (Animated Earth)
│   ├── LiveMap.tsx (Interactive Grid Map)
│   └── ClientLayout.tsx (Shared context state provider)
└── lib/
    ├── firebase.ts (Firebase SDK + Local authentication fallback)
    ├── gemini-fallback.ts (Mock AI response generator)
    └── store.ts (Local database & state management)
```

---

## ⚙️ Quick Start

### 1. Configure Keys (Optional)
Copy `.env.example` to `.env.local` and fill in your keys:
```bash
cp .env.example .env.local
```
*Note: If no keys are specified, the app automatically runs in a highly functional offline-first mock database mode with preloaded stats, mock maps, and mock AI coach conversations.*

### 2. Install Packages
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💎 Premium Design Details
* **Zero Hydration Errors**: Custom mounted checks ensure that client-side Recharts charts load seamlessly inside Next.js.
* **Auto-Resilient Architecture**: All forms, event sign-ups, offset funding, and marketplace purchases automatically update state in `localStorage` so they persist through page reloads.
* **Confetti Triggers**: Leveling up or completing crucial eco actions triggers particle confetti bursts.
* **Modern Gradients**: Immersive, deep forest backgrounds (`#020604`) coupled with neon green highlight lines.
