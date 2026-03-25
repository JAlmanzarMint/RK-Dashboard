# Cursor Setup Prompt — RK Logistics CEO Dashboard

Copy and paste this entire prompt into Cursor's AI chat (Cmd+L / Ctrl+L) after opening the unzipped project folder.

---

## PROMPT

I have a complete full-stack React + Express dashboard project that I need you to set up and verify locally, then prepare for Railway deployment. Here's exactly what to do:

### Step 1: Install and Run

Open the terminal and run:

```bash
npm install
npm run dev
```

Wait for the message `serving on port 5000`, then confirm the dev server is running at http://localhost:5000.

If there are any dependency resolution errors, run `npm install --legacy-peer-deps` instead.

### Step 2: Verify the Project Structure

This is a fullstack app with this architecture:
- **Frontend:** React 18 + Vite + Tailwind CSS 3 + shadcn/ui + Recharts + Leaflet
- **Backend:** Express 5 (serves API + static files on same port)
- **Routing:** wouter with hash-based routing (`useHashLocation`)
- **Build:** Vite builds frontend to `dist/public/`, esbuild bundles server to `dist/index.cjs`
- **No database** — all data is in TypeScript files under `client/src/lib/`

Key files:
- `client/src/App.tsx` — all routes (22 pages)
- `client/src/components/Layout.tsx` — sidebar navigation + dark mode toggle
- `client/src/index.css` — CSS variables, teal theme (`--primary: 174 72% 33%`), Satoshi font
- `client/src/lib/*.ts` — all dashboard data files
- `client/src/pages/*.tsx` — all page components
- `server/index.ts` — Express server entry, reads `PORT` env var
- `server/static.ts` — serves `dist/public/` in production
- `script/build.ts` — production build (Vite + esbuild)
- `railway.toml` — Railway deployment config (already included)

### Step 3: Build for Production

Run the production build:

```bash
npm run build
```

This should:
1. Build the frontend via Vite → output to `dist/public/`
2. Bundle the server via esbuild → output to `dist/index.cjs`

Verify it works:

```bash
npm run start
```

Confirm the production server starts on port 5000 and serves the dashboard.

### Step 4: Prepare for Railway Deployment

The project is already configured for Railway:

1. `railway.toml` is included with build and start commands
2. `Procfile` is included as a fallback
3. The server reads `process.env.PORT` (Railway provides this automatically)
4. No environment variables are required
5. No database is needed

To deploy:

```bash
git init
git add .
git commit -m "RK Logistics CEO Dashboard - initial commit"
```

Then either:
- Push to GitHub and connect the repo in Railway's dashboard (recommended)
- Or use Railway CLI: `railway login && railway init && railway up`

### Step 5: Verify All 22 Pages Work

Navigate to each route and confirm it renders:

| Route | Page |
|---|---|
| `/#/` | Dashboard (executive KPIs) |
| `/#/goals` | Goals |
| `/#/business-development` | Business Development + Competitor Intel tab |
| `/#/customers` | Customers |
| `/#/facilities` | Facilities (12 facilities) |
| `/#/facility-pricing` | Facility Pricing (intake form) |
| `/#/facility-profile` | Facility Profile (Dock-to-Deal style) |
| `/#/facility-utilization` | Utilization AI |
| `/#/bench-strength` | Bench Strength |
| `/#/ott-carriers` | OTT Carriers |
| `/#/ott-pricing` | OTT Pricing (LTL quote calculator) |
| `/#/routing-optimization` | Route Optimizer (5 tabs) |
| `/#/financials` | Financials |
| `/#/liquidity` | Liquidity |
| `/#/email-pulse` | Email Pulse |
| `/#/recruiting` | Recruiting |
| `/#/market-intel` | Market Intel |
| `/#/technology` | Technology |
| `/#/marketing` | Marketing (16 sub-tabs including Email Marketing) |
| `/#/strategy` | Strategy Hub |
| `/#/strategy-simulation` | Strategy Simulation (MiroFish, 5 tabs) |
| `/#/pipeline` | Pipeline |

### Important Notes

- **DO NOT use localStorage or sessionStorage** — they are not used in this project and should never be added
- **Tailwind CSS v3** is used — do NOT upgrade to v4 or use v4 syntax (`@import "tailwindcss"`, `@theme`)
- **Dark mode** uses the `.dark` class on `<html>` with `useState` seeded from `prefers-color-scheme`
- All shadcn/ui components are pre-installed in `client/src/components/ui/`
- Charts use Recharts, maps use Leaflet/react-leaflet, icons use lucide-react
- The `queryClient.ts` uses empty `API_BASE` — API calls are same-origin (Express serves everything)

If anything fails to compile or render, fix it and let me know what you changed.
