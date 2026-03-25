// MiroFish-Style Strategy Simulation Data
// Weekly AI swarm intelligence simulation for RK Logistics + OnTime Trucking
// Generates forecasts, strategy reviews, and competitive scenario analysis

// ─── Simulation Agents ──────────────────────────────────────────────
export interface SimAgent {
  id: string;
  persona: string;
  role: string;
  perspective: string;
  avatar: string; // emoji
  bias: string;
  confidence: number;
}

export const simulationAgents: SimAgent[] = [
  { id: "AGT-01", persona: "Market Analyst", role: "Tracks macro 3PL/logistics trends, freight indices, warehouse demand", perspective: "bearish", avatar: "📊", bias: "data-driven, skeptical of growth claims", confidence: 0.88 },
  { id: "AGT-02", persona: "Competitor Strategist", role: "Monitors GXO, XPO, Ryder, DHL, NFI moves and market positioning", perspective: "aggressive", avatar: "🎯", bias: "assumes competitors will act rationally to protect share", confidence: 0.82 },
  { id: "AGT-03", persona: "Customer Advocate", role: "Represents voice of LAM, KLA, Tesla, Panasonic and pipeline accounts", perspective: "demanding", avatar: "🏭", bias: "prioritizes service quality over cost optimization", confidence: 0.91 },
  { id: "AGT-04", persona: "Financial Controller", role: "Models P&L, cash flow, EBITDA impact of strategic decisions", perspective: "conservative", avatar: "💰", bias: "risk-averse, focused on margin protection", confidence: 0.94 },
  { id: "AGT-05", persona: "Operations Director", role: "Evaluates facility capacity, labor, fleet utilization constraints", perspective: "pragmatic", avatar: "⚙️", bias: "grounds strategy in operational reality", confidence: 0.90 },
  { id: "AGT-06", persona: "Growth Catalyst", role: "Identifies expansion opportunities, M&A targets, new verticals", perspective: "bullish", avatar: "🚀", bias: "optimistic about market capture, tolerates short-term risk", confidence: 0.78 },
  { id: "AGT-07", persona: "Risk Sentinel", role: "Identifies threats: customer concentration, lease exposure, labor market", perspective: "cautious", avatar: "🛡️", bias: "worst-case scenario planner, flags tail risks", confidence: 0.86 },
  { id: "AGT-08", persona: "Technology Scout", role: "Evaluates automation, WMS, TMS, AI/ML opportunities for competitive edge", perspective: "forward-looking", avatar: "🤖", bias: "believes technology adoption is existential", confidence: 0.80 },
  { id: "AGT-09", persona: "Labor Economist", role: "Models warehouse labor supply, wage pressure, retention dynamics", perspective: "realistic", avatar: "👷", bias: "labor is the binding constraint in logistics growth", confidence: 0.85 },
  { id: "AGT-10", persona: "Real Estate Analyst", role: "Tracks industrial RE market, lease rates, expansion site analysis", perspective: "cyclical", avatar: "🏗️", bias: "real estate timing drives long-term profitability", confidence: 0.83 },
];

// ─── Simulation Runs ────────────────────────────────────────────────
export interface SimulationRun {
  id: string;
  weekOf: string;
  runDate: string;
  agentsDeployed: number;
  iterationsRun: number;
  convergenceScore: number; // 0-100, how much agents agreed
  seedSources: string[];
  executionTime: string;
  status: "completed" | "running" | "scheduled";
}

export const simulationRuns: SimulationRun[] = [
  { id: "SIM-W12-2026", weekOf: "Mar 17-21, 2026", runDate: "2026-03-21", agentsDeployed: 10, iterationsRun: 2400, convergenceScore: 78, seedSources: ["Q4 2025 financials", "FY2025 P&L", "Facility lease portfolio", "LAM/KLA contract terms", "CBRE industrial RE report Q1 2026", "BLS warehouse labor data", "Competitor earnings (GXO, XPO Q4)", "Tesla Fremont expansion news", "Panasonic Kansas battery plant update"], executionTime: "4m 32s", status: "completed" },
  { id: "SIM-W11-2026", weekOf: "Mar 10-14, 2026", runDate: "2026-03-14", agentsDeployed: 10, iterationsRun: 2200, convergenceScore: 72, seedSources: ["Monthly ops report Feb 2026", "OTT P&L Feb 2026", "Competitor job postings scan", "Freight rate index March", "Customer pipeline CRM export"], executionTime: "3m 58s", status: "completed" },
  { id: "SIM-W10-2026", weekOf: "Mar 3-7, 2026", runDate: "2026-03-07", agentsDeployed: 10, iterationsRun: 2100, convergenceScore: 81, seedSources: ["Board deck draft Q1", "Facility utilization scans", "LAM Research earnings call transcript", "Industrial REIT cap rates Q1", "OTT route efficiency data Feb"], executionTime: "4m 11s", status: "completed" },
  { id: "SIM-W13-2026", weekOf: "Mar 24-28, 2026", runDate: "2026-03-28", agentsDeployed: 10, iterationsRun: 0, convergenceScore: 0, seedSources: [], executionTime: "—", status: "scheduled" },
];

// ─── Forecast Outputs ───────────────────────────────────────────────
export interface ForecastMetric {
  metric: string;
  current: string;
  q2Forecast: string;
  q3Forecast: string;
  q4Forecast: string;
  fy2026: string;
  confidence: number;
  trend: "up" | "down" | "flat";
  agentConsensus: string; // which agents agree
}

export const revenueForecasts: ForecastMetric[] = [
  { metric: "RK Revenue", current: "$26.8M (Q1 run rate)", q2Forecast: "$27.4M", q3Forecast: "$28.1M", q4Forecast: "$29.2M", fy2026: "$111.5M", confidence: 0.82, trend: "up", agentConsensus: "7/10 agree (Financial Controller + Risk Sentinel flag LAM concentration risk)" },
  { metric: "OTT Revenue", current: "$1.8M (Q1 run rate)", q2Forecast: "$2.0M", q3Forecast: "$2.2M", q4Forecast: "$2.4M", fy2026: "$8.4M", confidence: 0.76, trend: "up", agentConsensus: "6/10 agree (Operations Director questions driver hiring pipeline)" },
  { metric: "Combined EBITDA", current: "$4.0M (Q1 run rate)", q2Forecast: "$4.2M", q3Forecast: "$4.5M", q4Forecast: "$4.8M", fy2026: "$17.5M", confidence: 0.79, trend: "up", agentConsensus: "7/10 agree (Labor Economist warns wage pressure may erode 0.3-0.5pp)" },
  { metric: "EBITDA Margin", current: "15.0%", q2Forecast: "14.8%", q3Forecast: "15.2%", q4Forecast: "15.5%", fy2026: "15.1%", confidence: 0.74, trend: "flat", agentConsensus: "5/10 split (Growth Catalyst vs Financial Controller on investment timing)" },
  { metric: "Facility Utilization", current: "72%", q2Forecast: "75%", q3Forecast: "78%", q4Forecast: "80%", fy2026: "76% avg", confidence: 0.85, trend: "up", agentConsensus: "8/10 agree (Tesla + Panasonic volume driving utilization at Kato and Patterson)" },
  { metric: "Customer Count", current: "38 active", q2Forecast: "41", q3Forecast: "44", q4Forecast: "47", fy2026: "47", confidence: 0.71, trend: "up", agentConsensus: "6/10 agree (Competitor Strategist notes GXO aggressively pricing to defend)" },
];

// ─── Strategy Review Sections ───────────────────────────────────────
export interface StrategyInsight {
  id: string;
  category: "growth" | "risk" | "operations" | "financial" | "competitive" | "technology";
  title: string;
  summary: string;
  details: string[];
  agentSource: string;
  severity: "critical" | "high" | "medium" | "low";
  recommendation: string;
  timeHorizon: "immediate" | "30_days" | "90_days" | "6_months";
  estimatedImpact: string;
}

export const strategyInsights: StrategyInsight[] = [
  {
    id: "INS-01", category: "risk", title: "LAM Research Revenue Concentration Exceeds Threshold",
    summary: "LAM represents 31% of RK revenue — above the 25% single-customer risk threshold. Their Q4 earnings showed semiconductor equipment orders softening, and new SVP Global Ops Rammohan may review vendor partnerships.",
    details: [
      "LAM revenue: $32.7M of $105.4M FY2025 (31.0%)",
      "Semiconductor equipment orders down 8% QoQ per SEMI data",
      "Vinu Rammohan promoted to SVP Global Operations — historically triggers vendor reviews within 6 months",
      "LAM's Fremont campus consolidation could reduce external warehousing needs by 15-20%",
      "Mitigation: Accelerate Panasonic and Tesla pipeline to reduce LAM dependency to <25% by Q4",
    ],
    agentSource: "Risk Sentinel + Financial Controller",
    severity: "critical",
    recommendation: "Assign Rich Frainier to schedule quarterly business review with LAM's new SVP Global Ops within 30 days. Simultaneously accelerate pipeline conversion for Panasonic Kansas and Tesla expansion to reduce concentration.",
    timeHorizon: "30_days",
    estimatedImpact: "Revenue protection: $8-12M at risk if LAM reduces scope",
  },
  {
    id: "INS-02", category: "growth", title: "Panasonic Kansas Battery Plant Creates $4-6M Opportunity",
    summary: "Panasonic's De Soto, Kansas battery gigafactory is ramping production Q3 2026. They need regional 3PL for battery component warehousing and sequenced delivery. RK has no Midwest presence but could partner or acquire.",
    details: [
      "Panasonic investing $4B in Kansas gigafactory — 4,000+ jobs by end of 2026",
      "Current 3PL partner (CEVA) struggling with specialized battery storage requirements",
      "RK already handles Panasonic at Kato facility — proven relationship",
      "Nearest RK facility: Whitmore Lake, MI (800 mi from De Soto, KS)",
      "Option A: Partner with regional 3PL in Kansas City — lower risk, $2-3M opportunity",
      "Option B: Acquire small KC warehouse operation — higher risk, $4-6M opportunity",
    ],
    agentSource: "Growth Catalyst + Customer Advocate",
    severity: "high",
    recommendation: "Joe should engage Panasonic's supply chain team directly about Kansas needs. Simultaneously identify 2-3 acquisition targets in Kansas City metro with 100K+ sqft and FDA/hazmat capabilities.",
    timeHorizon: "90_days",
    estimatedImpact: "$4-6M incremental annual revenue + strategic Midwest entry",
  },
  {
    id: "INS-03", category: "competitive", title: "GXO Launching AI-Powered WMS — Competitive Threat to Mid-Market",
    summary: "GXO announced 'GXO Smart' AI warehouse platform in Q4 earnings. They're targeting mid-market semiconductor/EV customers — directly overlapping RK's sweet spot. Pricing is aggressive: 15% below market.",
    details: [
      "GXO Smart combines robotic picking + AI inventory forecasting + customer portal",
      "Pilot sites: 3 facilities in CA, TX, OH — operational by Q3 2026",
      "Targeting companies with $20-100M annual logistics spend (RK's core market)",
      "Announced 'no long-term commitment' pricing to capture share",
      "RK's technology stack (legacy WMS) is 2 generations behind GXO Smart",
      "However: GXO's 221M sqft scale means less flexibility/customization than RK",
    ],
    agentSource: "Competitor Strategist + Technology Scout",
    severity: "high",
    recommendation: "Accelerate WMS modernization roadmap. RK's advantage is customization and relationship depth — formalize this into a 'Dedicated Ops' positioning against GXO's scale-first approach. Budget $200-400K for WMS upgrade in FY2026.",
    timeHorizon: "6_months",
    estimatedImpact: "Defensive: protect $15-20M in revenue from customers GXO will target",
  },
  {
    id: "INS-04", category: "operations", title: "Vista Ridge TX Lease Renewal — Negotiate or Relocate",
    summary: "Vista Ridge lease expires Dec 2027. Current rate is $6.80/sqft NNN — 22% below market. Landlord (Prologis) will seek $8.50+ at renewal. Decision needed by Q3 2026 to preserve options.",
    details: [
      "193K sqft facility, Kyle TX — serves Tesla Austin + regional accounts",
      "Current rent: $6.80/sqft ($1.31M/yr). Market rate: $8.50-9.00/sqft ($1.64-1.74M/yr)",
      "Annual cost increase at renewal: $330-430K",
      "Alternative: New build-to-suit in San Marcos (15 mi south) — $7.20/sqft, 5-year term",
      "Tesla volume at Vista Ridge growing 12% YoY — need the capacity",
      "Recommendation: Negotiate 5-year extension at $7.50/sqft with 3% annual escalators + TI allowance",
    ],
    agentSource: "Real Estate Analyst + Financial Controller",
    severity: "medium",
    recommendation: "Engage Prologis broker for early renewal discussions. Target $7.50/sqft with $500K TI allowance for dock upgrades. Have San Marcos alternative ready as leverage. Decision deadline: August 2026.",
    timeHorizon: "90_days",
    estimatedImpact: "Annual savings of $190-240K vs market rate renewal",
  },
  {
    id: "INS-05", category: "financial", title: "OTT Margin Compression from Driver Wage Inflation",
    summary: "Tri-state area CDL driver wages up 9.2% YoY. OTT's driver cost ratio is approaching 68% of revenue — above the 65% threshold for sustainable margin. Route optimization can partially offset.",
    details: [
      "Average OTT driver cost: $72K/yr → trending to $78K by Q4 2026",
      "Driver cost as % of OTT revenue: 66.8% (target: <65%)",
      "Industry benchmark for final-mile: 58-62% driver cost ratio",
      "Route optimizer shows potential to handle 15% more stops per driver per day",
      "Alternative: Shift 20% of volume to independent contractors (1099) — saves $4.20/hr but adds compliance risk",
      "Agent debate: Growth Catalyst says invest in volume to spread fixed costs; Financial Controller says raise rates 5-7%",
    ],
    agentSource: "Labor Economist + Financial Controller",
    severity: "high",
    recommendation: "Implement two-pronged approach: (1) Deploy route optimizer to increase stops/driver/day by 15%, (2) Selective rate increases of 4-6% for non-contracted customers. Target driver cost ratio <64% by Q4.",
    timeHorizon: "30_days",
    estimatedImpact: "Margin recovery: 1.5-2.0pp on OTT operations ($126-168K annually)",
  },
  {
    id: "INS-06", category: "technology", title: "Warehouse Automation ROI Window Closing",
    summary: "Amazon Robotics and 6 River Systems prices dropped 30% in 2025. Small-fleet AMR solutions now viable at RK's volume. Competitors deploying faster — RK risks falling 2+ years behind.",
    details: [
      "AMR (Autonomous Mobile Robot) fleet for 175K sqft: $180-250K capital + $3K/mo/unit",
      "ROI timeline: 14-18 months at current labor rates ($19.50/hr avg)",
      "Locus Robotics offering 'Robotics-as-a-Service' — $0 capex, $1,500/bot/month",
      "GXO, Ryder, DHL all deploying AMRs at scale in 2026",
      "Best fit for RK: Christy facility (highest pick volume, standard racking)",
      "Risk of waiting: customer expectations shifting — LAM RFP in Q3 may require automation capabilities",
    ],
    agentSource: "Technology Scout + Operations Director",
    severity: "medium",
    recommendation: "Pilot 5-unit Locus Robotics RaaS deployment at Christy facility. Low capex ($7,500/mo), measurable ROI in 90 days. Use results to build business case for broader rollout before LAM Q3 RFP.",
    timeHorizon: "90_days",
    estimatedImpact: "15-25% pick efficiency gain at pilot site; competitive positioning for LAM retention",
  },
  {
    id: "INS-07", category: "growth", title: "CATL North America Entry — First-Mover 3PL Advantage",
    summary: "CATL (world's largest EV battery maker) is establishing NA operations with a Michigan facility. They need a 3PL partner who understands hazmat battery storage. RK's Whitmore Lake is 40 minutes away.",
    details: [
      "CATL investing $3.5B in Marshall, MI battery plant — opening H2 2026",
      "Current CATL volume with RK is small ($180K/yr) but growing 40% QoQ",
      "CATL's NA logistics team is 3 people — they need a partner, not just a vendor",
      "Whitmore Lake facility has hazmat certification + battery storage capability",
      "Competitor: NFI has a Detroit warehouse but no battery specialization",
      "Opportunity to become CATL's exclusive NA 3PL — $2-4M in Year 1, $8-12M by Year 3",
    ],
    agentSource: "Growth Catalyst + Customer Advocate",
    severity: "high",
    recommendation: "Joe should personally engage CATL's NA supply chain director (Li Wei). Position Whitmore Lake as turnkey solution: hazmat-certified, battery storage, 40 min from Marshall. Propose exclusive 3PL partnership with volume-based pricing.",
    timeHorizon: "30_days",
    estimatedImpact: "$2-4M Year 1 revenue; potential $8-12M by 2028",
  },
  {
    id: "INS-08", category: "risk", title: "Foxconn AI Server Demand Could Overwhelm Patterson Capacity",
    summary: "Foxconn's AI server assembly contract is driving rapid volume growth at Patterson facility. Current utilization at 84% — projected to hit 95% by Q3 if Foxconn volumes continue on trajectory.",
    details: [
      "Patterson sqft: 145K. Current utilization: 84%",
      "Foxconn volume growth: +22% MoM for last 3 months",
      "AI server components require climate-controlled storage — Patterson has 2 of 3 zones at capacity",
      "Overflow plan: Delta Electronics volume could shift to Morton (12 mi away)",
      "Capital needed: $85K for additional climate control unit if retaining all volume",
      "Risk: turning away Foxconn volume damages long-term relationship for their larger NA expansion",
    ],
    agentSource: "Operations Director + Risk Sentinel",
    severity: "high",
    recommendation: "Immediately commission climate control expansion at Patterson ($85K, 6-week install). Simultaneously prepare overflow protocol to Morton for non-climate Delta volume. Do not let capacity constraint become a customer loss.",
    timeHorizon: "immediate",
    estimatedImpact: "Protect $3.2M Foxconn annual revenue + position for $5M+ expansion",
  },
];

// ─── Agent Debate Log ───────────────────────────────────────────────
export interface AgentDebate {
  topic: string;
  round: number;
  exchanges: { agent: string; position: string; confidence: number }[];
  resolution: string;
  consensusLevel: "strong" | "moderate" | "split";
}

export const agentDebates: AgentDebate[] = [
  {
    topic: "Should RK pursue Kansas City acquisition for Panasonic?",
    round: 3,
    exchanges: [
      { agent: "Growth Catalyst", position: "Yes — first-mover advantage in Midwest. Panasonic relationship de-risks the investment. Target $4-6M revenue in 18 months.", confidence: 0.85 },
      { agent: "Financial Controller", position: "Cautious. Acquisition requires $2-4M capital. Leverage ratio already at 3.2x EBITDA. Prefer partnership model to limit downside.", confidence: 0.88 },
      { agent: "Risk Sentinel", position: "Against standalone acquisition. RK has no Midwest operational infrastructure. Cultural integration risk is high for a remote facility.", confidence: 0.82 },
      { agent: "Customer Advocate", position: "Panasonic expects dedicated capability, not a partnership. They want RK's quality standards, not a local operator's. Favors acquisition.", confidence: 0.79 },
      { agent: "Operations Director", position: "Compromise: acquire a small facility (60-80K sqft) with an embedded RK ops manager. Scale up only after proving unit economics over 2 quarters.", confidence: 0.91 },
    ],
    resolution: "Consensus reached on phased approach: Start with partnership in Q2, convert to small acquisition in Q4 if Panasonic volume materializes. Operations Director's compromise won majority support.",
    consensusLevel: "moderate",
  },
  {
    topic: "Rate increase strategy for OTT: how aggressive?",
    round: 2,
    exchanges: [
      { agent: "Financial Controller", position: "Need 6-8% increase across the board to restore margin. Non-negotiable given wage inflation.", confidence: 0.92 },
      { agent: "Customer Advocate", position: "Blanket increase will lose 2-3 key accounts. Saia and TForce are already shopping alternatives. Maximum 4% for top accounts.", confidence: 0.87 },
      { agent: "Competitor Strategist", position: "Market supports 5-6%. Roadrunner just raised 7%. But timing matters — implement in Q2 when seasonal volume gives us leverage.", confidence: 0.84 },
      { agent: "Growth Catalyst", position: "Don't raise rates — grow volume. 15% more stops per driver via route optimization equals the same margin impact without customer risk.", confidence: 0.72 },
    ],
    resolution: "Tiered approach: 5% for new customers, 3% for top 10 accounts with volume commitments, route optimization to cover the remaining gap. Implement Q2.",
    consensusLevel: "moderate",
  },
  {
    topic: "WMS modernization: build, buy, or RaaS?",
    round: 4,
    exchanges: [
      { agent: "Technology Scout", position: "RaaS (Robotics-as-a-Service) via Locus Robotics — minimal capex, prove ROI in 90 days, then scale. Modern WMS integration included.", confidence: 0.88 },
      { agent: "Financial Controller", position: "RaaS has better cash flow profile. $7.5K/mo vs $250K upfront. But long-term TCO is 40% higher over 5 years.", confidence: 0.90 },
      { agent: "Operations Director", position: "Our team can't absorb a major WMS migration right now. Christy and Mowry are at capacity. Pilot at one site first.", confidence: 0.93 },
      { agent: "Competitor Strategist", position: "Speed matters more than perfection. GXO Smart launches Q3. We need something customer-facing by Q3 or we lose the narrative.", confidence: 0.81 },
    ],
    resolution: "Unanimous: Pilot Locus RaaS at Christy (5 units, 90-day trial). Parallel track WMS vendor evaluation for broader modernization. Decision on full deployment by Q4.",
    consensusLevel: "strong",
  },
];

// ─── Weekly Scorecard ───────────────────────────────────────────────
export interface WeeklyScore {
  dimension: string;
  score: number; // 0-100
  change: number; // vs last week
  status: "improving" | "declining" | "stable";
  keyDriver: string;
}

export const weeklyScorecard: WeeklyScore[] = [
  { dimension: "Revenue Momentum", score: 74, change: 2, status: "improving", keyDriver: "Tesla Q1 volume above forecast; Panasonic pipeline advancing" },
  { dimension: "Margin Health", score: 68, change: -1, status: "declining", keyDriver: "OTT wage pressure; Christy overtime costs above budget" },
  { dimension: "Customer Retention", score: 82, change: 0, status: "stable", keyDriver: "Zero churn in Q1; LAM renewal conversations positive but unconfirmed" },
  { dimension: "Competitive Position", score: 71, change: -3, status: "declining", keyDriver: "GXO Smart announcement; Ryder expanding CA semi-conductor vertical" },
  { dimension: "Operational Efficiency", score: 76, change: 1, status: "improving", keyDriver: "Route optimizer reducing OTT deadhead; Patterson throughput up 8%" },
  { dimension: "Growth Pipeline", score: 79, change: 4, status: "improving", keyDriver: "CATL expanding; Foxconn AI server demand accelerating; Lucid re-engaged" },
  { dimension: "Financial Resilience", score: 72, change: 0, status: "stable", keyDriver: "Leverage at 3.2x — stable but leaves limited room for acquisitions" },
  { dimension: "Technology Readiness", score: 58, change: 2, status: "improving", keyDriver: "Locus pilot approved; still 2 years behind competitors on WMS" },
  { dimension: "Talent & Culture", score: 75, change: -2, status: "declining", keyDriver: "Driver turnover at OTT up 4pp; warehouse labor market tightening in Fremont" },
  { dimension: "Strategic Alignment", score: 80, change: 1, status: "improving", keyDriver: "Board aligned on Panasonic/CATL strategy; OTT integration on track" },
];

// ─── Scenario Trees ─────────────────────────────────────────────────
export interface ScenarioNode {
  id: string;
  label: string;
  probability: number;
  revenueImpact: string;
  ebitdaImpact: string;
  description: string;
  children?: ScenarioNode[];
}

export const scenarioTree: ScenarioNode = {
  id: "ROOT", label: "FY2026 Base Case", probability: 1.0, revenueImpact: "$111.5M", ebitdaImpact: "$17.5M",
  description: "Current trajectory with existing customer base, moderate growth, and operational improvements",
  children: [
    {
      id: "BULL", label: "Bull Case", probability: 0.25, revenueImpact: "$124M", ebitdaImpact: "$20.5M",
      description: "Panasonic Kansas + CATL expansion + Tesla volume surge + successful rate increases",
      children: [
        { id: "BULL-1", label: "Panasonic Kansas Win", probability: 0.40, revenueImpact: "+$4-6M", ebitdaImpact: "+$0.8M", description: "Secure exclusive 3PL partnership for Kansas gigafactory" },
        { id: "BULL-2", label: "CATL NA Partnership", probability: 0.35, revenueImpact: "+$3-4M", ebitdaImpact: "+$0.6M", description: "Become CATL's primary NA 3PL as Marshall plant ramps" },
        { id: "BULL-3", label: "Foxconn AI Expansion", probability: 0.60, revenueImpact: "+$2M", ebitdaImpact: "+$0.4M", description: "Foxconn doubles AI server volume at Patterson" },
      ],
    },
    {
      id: "BASE", label: "Base Case", probability: 0.50, revenueImpact: "$111.5M", ebitdaImpact: "$17.5M",
      description: "Organic growth from existing accounts, moderate new customer acquisition, stable margins",
    },
    {
      id: "BEAR", label: "Bear Case", probability: 0.25, revenueImpact: "$98M", ebitdaImpact: "$13.2M",
      description: "LAM reduces scope + semiconductor downturn + aggressive competitor pricing + wage inflation",
      children: [
        { id: "BEAR-1", label: "LAM Scope Reduction", probability: 0.30, revenueImpact: "-$8M", ebitdaImpact: "-$2.4M", description: "LAM consolidates to in-house warehousing, reducing RK volume 25%" },
        { id: "BEAR-2", label: "Semi Downturn", probability: 0.20, revenueImpact: "-$5M", ebitdaImpact: "-$1.5M", description: "Broad semiconductor equipment order slowdown impacts KLA, LAM, Delta" },
        { id: "BEAR-3", label: "GXO Pricing War", probability: 0.15, revenueImpact: "-$3M", ebitdaImpact: "-$1.2M", description: "GXO Smart undercuts RK by 15% on 3 key accounts" },
      ],
    },
  ],
};

// ─── CEO Action Items ───────────────────────────────────────────────
export interface ActionItem {
  id: string;
  priority: 1 | 2 | 3;
  action: string;
  owner: string;
  deadline: string;
  category: string;
  linkedInsight: string;
  status: "new" | "in_progress" | "completed" | "overdue";
}

export const ceoActionItems: ActionItem[] = [
  { id: "ACT-01", priority: 1, action: "Schedule QBR with LAM's Vinu Rammohan (new SVP Global Ops)", owner: "Rich Frainier", deadline: "Apr 15, 2026", category: "Customer Retention", linkedInsight: "INS-01", status: "new" },
  { id: "ACT-02", priority: 1, action: "Engage Panasonic supply chain team on Kansas facility needs", owner: "Joe (CEO)", deadline: "Apr 1, 2026", category: "Growth", linkedInsight: "INS-02", status: "new" },
  { id: "ACT-03", priority: 1, action: "Approve Patterson climate control expansion ($85K)", owner: "Joe (CEO)", deadline: "Mar 28, 2026", category: "Operations", linkedInsight: "INS-08", status: "new" },
  { id: "ACT-04", priority: 2, action: "Contact CATL NA supply chain director Li Wei", owner: "Joe (CEO)", deadline: "Apr 10, 2026", category: "Growth", linkedInsight: "INS-07", status: "new" },
  { id: "ACT-05", priority: 2, action: "Initiate Locus Robotics RaaS pilot evaluation for Christy", owner: "Operations", deadline: "Apr 30, 2026", category: "Technology", linkedInsight: "INS-06", status: "new" },
  { id: "ACT-06", priority: 2, action: "Implement tiered OTT rate increase (5% new / 3% top accounts)", owner: "Ruth (OTT)", deadline: "Apr 15, 2026", category: "Financial", linkedInsight: "INS-05", status: "new" },
  { id: "ACT-07", priority: 2, action: "Engage Prologis on Vista Ridge early renewal at $7.50/sqft", owner: "Rich Frainier", deadline: "May 30, 2026", category: "Real Estate", linkedInsight: "INS-04", status: "new" },
  { id: "ACT-08", priority: 3, action: "Evaluate 2-3 Kansas City warehouse acquisition targets", owner: "Joe (CEO)", deadline: "Jun 30, 2026", category: "M&A", linkedInsight: "INS-02", status: "new" },
  { id: "ACT-09", priority: 3, action: "Begin WMS vendor evaluation (parallel to Locus pilot)", owner: "Operations", deadline: "Jul 31, 2026", category: "Technology", linkedInsight: "INS-03", status: "new" },
  { id: "ACT-10", priority: 3, action: "Develop 'Dedicated Ops' positioning paper vs GXO Smart", owner: "Marketing", deadline: "May 15, 2026", category: "Competitive", linkedInsight: "INS-03", status: "new" },
];

// ─── Composite Health Score ─────────────────────────────────────────
export const compositeHealth = {
  overall: 73,
  previousWeek: 71,
  trend: "improving" as const,
  summary: "RK Logistics + OTT combined health score improved 2 points this week, driven by growth pipeline strength (CATL, Foxconn momentum) and operational efficiency gains from route optimization. Offset by margin pressure from wage inflation and competitive positioning decline following GXO Smart announcement. Critical near-term action: protect LAM relationship and approve Patterson expansion.",
  riskLevel: "moderate" as const,
  outlook: "Cautiously optimistic. Base case projects $111.5M revenue and $17.5M EBITDA for FY2026. Bull case of $124M requires winning at least 2 of 3 growth bets (Panasonic Kansas, CATL NA, Foxconn expansion). Bear case of $98M only materializes if LAM reduces scope AND semiconductor downturn deepens.",
};
