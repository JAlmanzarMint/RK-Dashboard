# RK Logistics CEO Dashboard

Full-stack CEO dashboard for RK Logistics Group + OnTime Trucking.

**Stack:** Express 5 + Vite + React 18 + Tailwind CSS 3 + shadcn/ui + Recharts + Leaflet

---

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (Express + Vite on same port)
npm run dev
```

Open **http://localhost:5000** in your browser.

---

## Cursor Setup

1. Unzip this project into a folder (e.g. `rk-logistics-dashboard/`)
2. Open the folder in Cursor: **File → Open Folder**
3. Open Terminal in Cursor (`Ctrl+`` ` or `Cmd+`` `)
4. Run:
   ```bash
   npm install
   npm run dev
   ```
5. The dashboard will be live at `http://localhost:5000`

### Cursor Tips
- All pages are in `client/src/pages/` — each is a self-contained React component
- Data files are in `client/src/lib/` — edit these to change dashboard content
- Layout/sidebar is in `client/src/components/Layout.tsx`
- Routes are in `client/src/App.tsx`
- Styling: `client/src/index.css` (CSS variables + Tailwind)
- To add a new page: create the component in `pages/`, add route in `App.tsx`, add sidebar link in `Layout.tsx`

---

## Railway Deployment

### Option A: Deploy via GitHub (Recommended)

1. Push this project to a GitHub repo
2. Go to [railway.app](https://railway.app) → **New Project → Deploy from GitHub repo**
3. Select the repo
4. Railway auto-detects Node.js. Set these settings:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm run start`
5. Railway assigns a public URL automatically
6. (Optional) Add a custom domain in Railway settings

### Option B: Deploy via Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

### Railway Environment
- Railway automatically provides the `PORT` environment variable — the server reads it
- No database required — all data is in static TypeScript files
- No environment variables needed for the base dashboard
- Build output: `dist/index.cjs` (server) + `dist/public/` (frontend)

### Railway Settings (if needed)
| Setting | Value |
|---|---|
| Build Command | `npm run build` |
| Start Command | `npm run start` |
| Root Directory | `/` (default) |
| Node Version | 20+ |

---

## Project Structure

```
rk-logistics-dashboard/
├── client/                    # Frontend (React + Vite)
│   ├── index.html             # Entry HTML
│   └── src/
│       ├── App.tsx            # All routes
│       ├── main.tsx           # React entry point
│       ├── index.css          # Global styles + CSS variables
│       ├── components/
│       │   ├── Layout.tsx     # Sidebar + nav + dark mode
│       │   ├── PerplexityAttribution.tsx
│       │   └── ui/            # shadcn/ui components (40+)
│       ├── hooks/
│       │   ├── use-mobile.tsx
│       │   └── use-toast.ts
│       ├── lib/               # Data files + utilities
│       │   ├── data.ts                    # Core dashboard data
│       │   ├── competitorIntelData.ts     # Competitor customer/project data
│       │   ├── contentEngineData.ts       # Content engine data
│       │   ├── emailAnalysisData.ts       # Email analysis data
│       │   ├── emailMarketingData.ts      # Email marketing campaigns/metrics
│       │   ├── emailPulseData.ts          # Company email pulse data
│       │   ├── facilityPricingData.ts     # Facility pricing intake form
│       │   ├── facilityProfileData.ts     # 12 facility profiles
│       │   ├── facilityUtilizationData.ts # AI utilization data
│       │   ├── ottPricingData.ts          # OnTime Trucking pricing
│       │   ├── pressReleasesData.ts       # Press release drafting
│       │   ├── rfqData.ts                 # RFQ management
│       │   ├── routingOptimizationData.ts # Route optimizer data
│       │   ├── strategySimulationData.ts  # MiroFish simulation data
│       │   ├── queryClient.ts             # API client (TanStack Query)
│       │   └── utils.ts                   # Tailwind merge utility
│       └── pages/             # All page components (22 pages)
│           ├── Dashboard.tsx
│           ├── Goals.tsx
│           ├── BusinessDevelopment.tsx
│           ├── Customers.tsx
│           ├── Facilities.tsx
│           ├── FacilityPricing.tsx
│           ├── FacilityProfile.tsx
│           ├── FacilityUtilization.tsx
│           ├── BenchStrength.tsx
│           ├── OTTCarriers.tsx
│           ├── OTTQuoteCalculator.tsx
│           ├── RoutingOptimization.tsx
│           ├── Financials.tsx
│           ├── Liquidity.tsx
│           ├── EmailPulse.tsx
│           ├── Recruiting.tsx
│           ├── MarketIntel.tsx
│           ├── Technology.tsx
│           ├── Marketing.tsx             # + sub-tabs below
│           ├── ContentEngineTab.tsx
│           ├── SyntheticAudienceTab.tsx
│           ├── PressReleasesTab.tsx
│           ├── CompetitorPostsTab.tsx
│           ├── EmailMarketingTab.tsx
│           ├── StrategyHub.tsx
│           ├── StrategySimulation.tsx
│           ├── Pipeline.tsx
│           └── not-found.tsx
├── server/                    # Backend (Express)
│   ├── index.ts               # Server entry + middleware
│   ├── routes.ts              # API routes
│   ├── storage.ts             # Storage interface
│   ├── static.ts              # Static file serving (production)
│   └── vite.ts                # Vite dev server integration
├── shared/
│   └── schema.ts              # Shared types (Drizzle + Zod)
├── script/
│   └── build.ts               # Production build script
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── drizzle.config.ts
└── components.json            # shadcn/ui config
```

---

## Dashboard Pages (22 Total)

### CORE
| Page | Route | Description |
|---|---|---|
| Dashboard | `/` | Executive overview KPIs, revenue, EBITDA |
| Goals | `/goals` | Strategic goals tracking |
| Business Development | `/business-development` | BD pipeline + Competitor Intel tab |
| Customers | `/customers` | Customer management |

### OPERATIONS
| Page | Route | Description |
|---|---|---|
| Facilities | `/facilities` | 12 facility overview |
| Facility Pricing | `/facility-pricing` | Pricing intake form (from Rich Frainier emails) |
| Facility Profile | `/facility-profile` | Dock-to-Deal style facility profiles |
| Facility Utilization | `/facility-utilization` | AI-powered utilization analysis |
| Bench Strength | `/bench-strength` | Workforce bench strength |
| OTT Carriers | `/ott-carriers` | OnTime Trucking carrier management |
| OTT Pricing | `/ott-pricing` | LTL quote calculator |
| Route Optimizer | `/routing-optimization` | MiroFish-style route optimization |

### FINANCE
| Page | Route | Description |
|---|---|---|
| Financials | `/financials` | P&L, revenue breakdown |
| Liquidity | `/liquidity` | Cash flow, working capital |

### PEOPLE
| Page | Route | Description |
|---|---|---|
| Email Pulse | `/email-pulse` | Company email analytics (Coinbase-inspired) |
| Recruiting | `/recruiting` | Hiring pipeline |

### STRATEGY
| Page | Route | Description |
|---|---|---|
| Market Intel | `/market-intel` | Industry intelligence |
| Technology | `/technology` | Tech stack + innovation |
| Marketing | `/marketing` | 16 tabs: Overview, Social, Competitors, BD Activity, Action Items, Facilities, News, Ideas, Sales Emails, Reddit, YouTube, Content Engine, Audience Testing, Press Releases, Top Posts, Email Marketing |
| Strategy Hub | `/strategy` | Strategic planning |
| Strategy Simulation | `/strategy-simulation` | MiroFish weekly simulation (10 agents) |

---

## Design System

- **Primary:** Teal `hsl(174, 72%, 33%)` / `#0f766e`
- **Font:** Satoshi (Fontshare CDN)
- **Dark mode:** Toggle in top-right, uses `.dark` class on `<html>`
- **Components:** shadcn/ui (40+ components pre-installed)
- **Charts:** Recharts
- **Icons:** lucide-react
- **Maps:** Leaflet + react-leaflet

---

## Customizing Data

All dashboard data lives in TypeScript files under `client/src/lib/`. To update:

1. Edit the relevant `*Data.ts` or `data.ts` file
2. The dev server hot-reloads automatically
3. For production: `npm run build` then `npm run start`

No database is needed — all data is embedded in the frontend bundle.

---

## Routing

Uses `wouter` with hash-based routing (`useHashLocation`). All routes look like:
- `/#/` → Dashboard
- `/#/facilities` → Facilities
- `/#/marketing` → Marketing

This ensures routing works in any hosting environment (Railway, S3, Nginx, etc.) without server-side URL rewriting.

---

## Build Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (port 5000) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run check` | TypeScript type checking |

---

## License

MIT — RK Logistics Group / AOI Capital
