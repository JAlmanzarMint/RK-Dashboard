// ═══════════════════════════════════════════════════════
// RK Logistics Content Engine + Synthetic Audiences Data
// ═══════════════════════════════════════════════════════

// ──────────────────────────────────────────────────────
// 1. SYNTHETIC AUDIENCE PERSONAS
// ──────────────────────────────────────────────────────

export interface SyntheticPersona {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  avatar: string; // initials
  color: string;
  demographics: {
    age: string;
    education: string;
    decisionAuth: string;
    budgetRange: string;
  };
  psychographics: {
    priorities: string[];
    painPoints: string[];
    contentPrefs: string[];
    platforms: string[];
  };
  evaluationCriteria: string[];
}

export const syntheticPersonas: SyntheticPersona[] = [
  {
    id: "vp-supply-chain",
    name: "Sarah Chen",
    title: "VP Supply Chain",
    company: "Tier-1 Semiconductor Mfg",
    industry: "Semiconductor",
    avatar: "SC",
    color: "#6366f1",
    demographics: { age: "42-48", education: "MS Industrial Eng, MBA", decisionAuth: "Final say on 3PL selection up to $5M", budgetRange: "$2M-8M annually" },
    psychographics: {
      priorities: ["Supply continuity", "Tariff mitigation", "Cleanroom-grade handling", "FTZ optimization"],
      painPoints: ["Fragmented 3PL capabilities", "Tariff exposure on re-exported components", "Lack of semiconductor-specific expertise"],
      contentPrefs: ["Data-driven whitepapers", "Case studies with ROI metrics", "Industry index reports"],
      platforms: ["LinkedIn (daily)", "Industry journals", "Gartner reports"],
    },
    evaluationCriteria: ["Technical credibility", "ROI quantification", "Industry-specific knowledge", "Compliance awareness"],
  },
  {
    id: "cfo-ev",
    name: "Marcus Williams",
    title: "CFO",
    company: "Mid-size EV Battery Manufacturer",
    industry: "EV/Battery",
    avatar: "MW",
    color: "#059669",
    demographics: { age: "45-52", education: "MBA Finance, CPA", decisionAuth: "Final budget approval, cost reduction mandates", budgetRange: "$5M-15M logistics spend" },
    psychographics: {
      priorities: ["Total cost reduction", "Working capital optimization", "FTZ duty deferral", "Insurance & risk transfer"],
      painPoints: ["Hidden costs in segmented supply chains", "Tariff unpredictability", "Cash flow tied up in duty payments"],
      contentPrefs: ["Financial analyses", "Cost comparison matrices", "Regulatory impact briefs"],
      platforms: ["LinkedIn (3x/week)", "WSJ", "CFO.com", "Industry conferences"],
    },
    evaluationCriteria: ["Financial rigor", "Savings quantification", "Regulatory expertise", "Credibility of claims"],
  },
  {
    id: "plant-mgr",
    name: "David Rodriguez",
    title: "Plant Manager",
    company: "Solar Panel Assembly",
    industry: "Clean Energy",
    avatar: "DR",
    color: "#d97706",
    demographics: { age: "38-45", education: "BS Mechanical Eng", decisionAuth: "Recommender to VP Ops, facility-level decisions", budgetRange: "$500K-2M warehouse" },
    psychographics: {
      priorities: ["On-time delivery to production line", "Damage-free handling", "Scalable labor during ramps", "Safety compliance"],
      painPoints: ["Labor shortages during production spikes", "Warehouse proximity to plant", "Material handling damage rates"],
      contentPrefs: ["Video walkthroughs", "Operational case studies", "Quick-read infographics"],
      platforms: ["LinkedIn (2x/week)", "YouTube (tutorials)", "Reddit (r/supplychain)"],
    },
    evaluationCriteria: ["Operational practicality", "Real-world examples", "Visual proof of capabilities", "Proximity & response time"],
  },
  {
    id: "procurement-dir",
    name: "Jennifer Park",
    title: "Director of Procurement",
    company: "Consumer Electronics OEM",
    industry: "Electronics",
    avatar: "JP",
    color: "#dc2626",
    demographics: { age: "35-42", education: "MS Supply Chain Mgmt", decisionAuth: "3PL shortlist, RFP creation", budgetRange: "$1M-5M" },
    psychographics: {
      priorities: ["Vendor consolidation", "SLA compliance", "Multi-site capability", "Technology integration"],
      painPoints: ["Too many 3PL vendors to manage", "Inconsistent service levels", "Lack of visibility across sites"],
      contentPrefs: ["Comparison guides", "RFP templates", "Benchmark data", "LinkedIn thought leadership"],
      platforms: ["LinkedIn (daily)", "Supply Chain Dive", "Procurement Leaders"],
    },
    evaluationCriteria: ["Breadth of capabilities", "Multi-site proof", "Technology/WMS sophistication", "Client testimonials"],
  },
  {
    id: "ops-director",
    name: "Robert Kim",
    title: "Director of Operations",
    company: "Industrial Equipment Distributor",
    industry: "Industrial/Distribution",
    avatar: "RK",
    color: "#7c3aed",
    demographics: { age: "40-50", education: "BS Business, Lean Six Sigma", decisionAuth: "Operational vendor selection", budgetRange: "$1M-3M" },
    psychographics: {
      priorities: ["Throughput optimization", "Inventory accuracy", "Continuous improvement", "Scalable operations"],
      painPoints: ["Seasonal demand volatility", "Aging warehouse infrastructure", "Integration with ERP systems"],
      contentPrefs: ["Process improvement stories", "KPI benchmarks", "Industry trend reports", "Podcasts"],
      platforms: ["LinkedIn (3x/week)", "Reddit", "YouTube", "IndustryWeek"],
    },
    evaluationCriteria: ["Operational excellence proof", "Lean/continuous improvement culture", "Technology adoption", "Flexibility"],
  },
  {
    id: "logistics-analyst",
    name: "Aisha Patel",
    title: "Senior Logistics Analyst",
    company: "Fortune 500 Tech Co",
    industry: "Technology",
    avatar: "AP",
    color: "#0891b2",
    demographics: { age: "28-35", education: "MS Data Analytics", decisionAuth: "Analyst/recommender to VP", budgetRange: "Influences $10M+ decisions" },
    psychographics: {
      priorities: ["Data accuracy", "Benchmarking", "Trend analysis", "Automation potential"],
      painPoints: ["Lack of industry benchmarks", "Manual data collection", "Difficulty comparing 3PL performance"],
      contentPrefs: ["Index reports with methodology", "Interactive dashboards", "Data visualizations", "Research papers"],
      platforms: ["LinkedIn (daily)", "Reddit (r/dataisbeautiful, r/supplychain)", "Substack newsletters"],
    },
    evaluationCriteria: ["Data methodology transparency", "Analytical rigor", "Freshness of insights", "Actionable recommendations"],
  },
];

// ──────────────────────────────────────────────────────
// 2. SYNTHETIC AUDIENCE REVIEWS OF CURRENT MARKETING
// ──────────────────────────────────────────────────────

export interface AudienceReview {
  personaId: string;
  overallScore: number; // 1-10
  credibilityScore: number;
  relevanceScore: number;
  actionabilityScore: number;
  engagementScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  wouldShare: boolean;
  wouldContact: boolean;
  quote: string;
}

export const currentMarketingReviews: AudienceReview[] = [
  {
    personaId: "vp-supply-chain",
    overallScore: 7.2,
    credibilityScore: 8.1,
    relevanceScore: 7.5,
    actionabilityScore: 6.8,
    engagementScore: 6.5,
    strengths: [
      "Strong competitor analysis shows market awareness",
      "Conference presence indicates industry commitment",
      "Customer news integration demonstrates client focus",
      "GBP/facility data shows operational transparency",
    ],
    weaknesses: [
      "Missing semiconductor-specific content and terminology",
      "No FTZ expertise showcased despite it being a key differentiator",
      "Social media presence is critically underweight vs competitors",
      "No thought leadership publications to establish authority",
    ],
    suggestions: [
      "Create a monthly semiconductor logistics index or report",
      "Publish FTZ case studies with specific duty savings figures",
      "Develop LinkedIn content series on cleanroom handling standards",
      "Add customer testimonials from semi companies (anonymized if needed)",
    ],
    wouldShare: false,
    wouldContact: true,
    quote: "The data is there but it's not speaking my language. I need to see semiconductor-specific expertise, not just general warehouse metrics.",
  },
  {
    personaId: "cfo-ev",
    overallScore: 6.8,
    credibilityScore: 7.0,
    relevanceScore: 6.2,
    actionabilityScore: 6.5,
    engagementScore: 7.0,
    strengths: [
      "Hidden Costs whitepaper shows financial depth",
      "Revenue/EBITDA metrics provide business credibility",
      "Competitor financial data enables benchmarking",
      "BD pipeline shows growth trajectory",
    ],
    weaknesses: [
      "Not enough ROI/savings quantification for prospects",
      "FTZ duty deferral savings not prominently featured",
      "Missing total cost of ownership comparisons",
      "No financial case studies with before/after metrics",
    ],
    suggestions: [
      "Lead with dollars saved, not operational metrics",
      "Create FTZ calculator content showing duty deferral impact",
      "Publish quarterly tariff impact briefs for EV/battery sector",
      "Add working capital optimization case study with CFO-level metrics",
    ],
    wouldShare: true,
    wouldContact: true,
    quote: "I see operational excellence, but I need to understand the financial impact. Show me the money — duty savings, working capital freed up, total cost reduction.",
  },
  {
    personaId: "plant-mgr",
    overallScore: 6.1,
    credibilityScore: 6.5,
    relevanceScore: 5.8,
    actionabilityScore: 5.5,
    engagementScore: 6.5,
    strengths: [
      "Facility map shows geographic reach clearly",
      "Multiple locations suggest scalability",
      "GBP data shows community presence",
    ],
    weaknesses: [
      "No video content — I want to see the facilities",
      "Missing operational KPIs (dock-to-stock times, damage rates)",
      "No labor scalability case studies",
      "Content is too high-level, not practical enough",
    ],
    suggestions: [
      "Create facility tour videos for each major location",
      "Publish dock-to-stock and damage rate benchmarks",
      "Add labor flex case studies showing ramp-up capabilities",
      "Create short-form video content showing daily operations",
    ],
    wouldShare: false,
    wouldContact: false,
    quote: "I need to see your warehouse in action before I'd consider you. Dashboards and data are fine, but show me a facility walkthrough and I'm interested.",
  },
  {
    personaId: "procurement-dir",
    overallScore: 7.5,
    credibilityScore: 7.8,
    relevanceScore: 7.2,
    actionabilityScore: 7.5,
    engagementScore: 7.5,
    strengths: [
      "Multi-facility coverage across 5 states is compelling",
      "Comprehensive competitor analysis aids decision-making",
      "BD pipeline shows active account management",
      "Email campaigns show sales enablement maturity",
    ],
    weaknesses: [
      "No RFP response content or templates",
      "Missing service-level benchmarks vs competitors",
      "No vendor consolidation case studies",
      "Technology/WMS capabilities not prominently featured",
    ],
    suggestions: [
      "Create vendor consolidation ROI calculator",
      "Publish SLA benchmark comparison tool",
      "Develop RFP template series for different logistics needs",
      "Feature WMS/technology integration capabilities",
    ],
    wouldShare: true,
    wouldContact: true,
    quote: "This is a solid marketing operation for a mid-size 3PL. The multi-site capability is the differentiator — lead with that in everything.",
  },
  {
    personaId: "ops-director",
    overallScore: 6.5,
    credibilityScore: 7.0,
    relevanceScore: 6.3,
    actionabilityScore: 6.0,
    engagementScore: 6.8,
    strengths: [
      "Conference presence shows industry engagement",
      "Customer news tracking shows proactive account management",
      "Competitor intel is thorough and actionable",
    ],
    weaknesses: [
      "No continuous improvement or Lean content",
      "Missing KPI benchmarks for warehouse operations",
      "Reddit and YouTube strategies are plans, not execution",
      "No podcast or long-form thought leadership",
    ],
    suggestions: [
      "Start a monthly operations excellence series",
      "Publish warehouse KPI benchmarks by industry vertical",
      "Execute on Reddit strategy — the plan is good, just do it",
      "Create a quarterly State of Warehousing report",
    ],
    wouldShare: false,
    wouldContact: true,
    quote: "Good strategic thinking but I'm not seeing execution yet on the newer channels. The competitor analysis is excellent though — that alone shows sophistication.",
  },
  {
    personaId: "logistics-analyst",
    overallScore: 8.0,
    credibilityScore: 8.5,
    relevanceScore: 7.8,
    actionabilityScore: 8.0,
    engagementScore: 8.2,
    strengths: [
      "DHTSCI and OTTFI indices are exactly what I look for",
      "Data-driven approach across all sections",
      "Competitor benchmarking methodology is sound",
      "Social media gap analysis shows analytical rigor",
    ],
    weaknesses: [
      "Index reports need more frequent publication cadence",
      "Missing interactive data tools (calculators, comparison widgets)",
      "No API or data feed for enterprise integration",
      "Methodology section for indices could be more transparent",
    ],
    suggestions: [
      "Publish DHTSCI weekly or bi-weekly for higher engagement",
      "Create interactive freight rate calculator",
      "Add detailed methodology pages for each index",
      "Build shareable data visualizations for social media",
    ],
    wouldShare: true,
    wouldContact: true,
    quote: "The DHTSCI is genuinely useful. If you published this more frequently with deeper methodology, it would become my go-to industry reference.",
  },
];

// Aggregated feedback
export const syntheticAudienceSummary = {
  avgOverall: 7.0,
  avgCredibility: 7.5,
  avgRelevance: 6.8,
  avgActionability: 6.7,
  avgEngagement: 7.1,
  wouldSharePct: "50%",
  wouldContactPct: "83%",
  topStrength: "Data-driven competitor analysis and industry indices",
  topWeakness: "Lack of video content and industry-specific thought leadership",
  topOpportunity: "Monthly publications (DHTSCI, freight reports) as lead-gen magnets",
  iterationFocus: [
    "Add ROI/financial quantification to all content",
    "Create video content showing facility capabilities",
    "Increase publication cadence for index reports",
    "Develop industry-vertical-specific content tracks",
    "Execute on Reddit/YouTube strategies immediately",
  ],
};

// ──────────────────────────────────────────────────────
// 3. WEEKLY LINKEDIN POSTS FOR SALESFORCE
// ──────────────────────────────────────────────────────

export interface LinkedInPost {
  id: string;
  week: string;
  title: string;
  category: string;
  targetAudience: string;
  platform: "RK Company" | "Salesforce" | "CEO" | "OTT";
  content: string;
  hashtags: string[];
  cta: string;
  mediaType: "image" | "carousel" | "video" | "document" | "poll";
  mediaDescription: string;
  audienceScores: { personaId: string; score: number; feedback: string }[];
  iteration: number;
  status: "draft" | "reviewed" | "approved" | "posted";
}

export const weeklyLinkedInPosts: LinkedInPost[] = [
  // Week of March 16, 2026
  {
    id: "li-w12-1",
    week: "Mar 16–20",
    title: "Tariff Squeeze on EV Battery Supply Chains",
    category: "Thought Leadership",
    targetAudience: "EV/Battery Executives, Supply Chain Leaders",
    platform: "Salesforce",
    content: `The regulatory squeeze on EV battery supply chains just got tighter.\n\nWith FEOC restrictions now covering 25%+ ownership thresholds and Section 301 tariffs hitting 25% on Chinese battery cells, the logistics playbook has fundamentally changed.\n\nHere's what we're seeing at RK Logistics:\n\n→ 35-65% price increases on segmented semiconductor & battery components\n→ FTZ-to-FTZ transfers saving clients 12-18% on duty exposure\n→ Working capital freed up by $2.3M avg through strategic duty deferral\n\nThe companies winning right now aren't just absorbing costs — they're restructuring their logistics networks around FTZ advantages.\n\nIs your supply chain optimized for the new tariff reality?\n\n#EVBattery #SupplyChain #ForeignTradeZone #Tariffs #Logistics`,
    hashtags: ["#EVBattery", "#SupplyChain", "#ForeignTradeZone", "#Tariffs", "#Logistics"],
    cta: "Comment with your biggest tariff challenge — we'll share our playbook",
    mediaType: "carousel",
    mediaDescription: "4-slide carousel: 1) Tariff timeline graphic 2) FEOC threshold diagram 3) FTZ savings calculator snapshot 4) RK FTZ network map",
    audienceScores: [
      { personaId: "vp-supply-chain", score: 8.5, feedback: "Highly relevant. The FTZ savings figure is exactly what I'd share with my VP." },
      { personaId: "cfo-ev", score: 9.0, feedback: "The $2.3M working capital figure catches my eye. This is CFO-speak." },
      { personaId: "procurement-dir", score: 7.5, feedback: "Good awareness builder but I'd want more specifics on implementation timeline." },
    ],
    iteration: 2,
    status: "approved",
  },
  {
    id: "li-w12-2",
    week: "Mar 16–20",
    title: "The Hidden Cost of Fragmented 3PL Networks",
    category: "Pain Point",
    targetAudience: "Procurement Directors, Operations VPs",
    platform: "Salesforce",
    content: `Your company probably uses 4-7 different 3PLs.\n\nAnd that fragmentation is costing you more than you think.\n\nOur latest research into semiconductor supply chain segmentation found:\n\n📊 Average coordination overhead: 15-22% of total logistics spend\n📊 Data integration failures: 3.2 incidents/quarter per additional vendor\n📊 SLA compliance drops 8% for every 3PL added beyond the 3rd\n\nThe math is clear: vendor consolidation with a multi-site 3PL saves 18-30% in total cost of ownership.\n\nRK Logistics operates 13 facilities across 5 states — one partner, one WMS, one point of contact.\n\nHow many 3PLs are you managing today?\n\n#Logistics #3PL #SupplyChainManagement #CostReduction #Warehousing`,
    hashtags: ["#Logistics", "#3PL", "#SupplyChainManagement", "#CostReduction", "#Warehousing"],
    cta: "Download our Hidden Costs whitepaper (link in comments)",
    mediaType: "image",
    mediaDescription: "Infographic showing fragmentation costs: coordination overhead, data failures, SLA impact with RK's single-partner solution",
    audienceScores: [
      { personaId: "procurement-dir", score: 9.2, feedback: "This is literally my problem statement. The data points are shareable." },
      { personaId: "ops-director", score: 8.0, feedback: "The SLA compliance stat resonates. I've seen this in our own operations." },
      { personaId: "logistics-analyst", score: 7.8, feedback: "Good data, but I'd want to see the methodology behind those figures." },
    ],
    iteration: 2,
    status: "approved",
  },
  {
    id: "li-w12-3",
    week: "Mar 16–20",
    title: "DHTSCI Index Drop: What It Means for Your Logistics",
    category: "Index Report",
    targetAudience: "All Supply Chain Professionals",
    platform: "RK Company",
    content: `📉 DHTSCI March 2026: 46.2 (down 7.6 points MoM)\n\nThe Durable High-Technology Supply Chain Index just posted its steepest monthly decline since Q3 2024.\n\nKey drivers:\n→ Red Sea diversions adding 12-18 days to Asia-US routes\n→ ASML delivery backlogs rippling through semiconductor supply chains\n→ Applied Materials $252M BIS penalty creating compliance uncertainty\n→ Northeast freight costs surging to $2.46/mile\n\nWhat this means for logistics planning:\n\n1️⃣ Buffer inventory strategies need recalibration\n2️⃣ FTZ utilization becomes more critical as duties compound\n3️⃣ Dual-sourcing from non-FEOC countries accelerating\n4️⃣ Near-shoring activity up 23% QoQ in our network\n\nFull report in comments.\n\n#DHTSCI #Semiconductor #SupplyChain #FreightRates #Logistics`,
    hashtags: ["#DHTSCI", "#Semiconductor", "#SupplyChain", "#FreightRates", "#Logistics"],
    cta: "Subscribe to the monthly DHTSCI report",
    mediaType: "document",
    mediaDescription: "2-page executive summary of DHTSCI March 2026 with charts showing index trend, component breakdown, and 90-day outlook",
    audienceScores: [
      { personaId: "logistics-analyst", score: 9.5, feedback: "This is exactly the kind of indexed data I share with my team. Outstanding." },
      { personaId: "vp-supply-chain", score: 8.8, feedback: "The actionable takeaways at the bottom elevate this from data to intelligence." },
      { personaId: "cfo-ev", score: 7.5, feedback: "The cost implications need more dollar quantification but directionally valuable." },
    ],
    iteration: 3,
    status: "approved",
  },
  // Week of March 23, 2026
  {
    id: "li-w13-1",
    week: "Mar 23–27",
    title: "Gigafactory Scale Logistics: Beyond the Obvious",
    category: "Industry Insight",
    targetAudience: "EV/Battery Manufacturing Leaders",
    platform: "Salesforce",
    content: `Everyone talks about gigafactory construction timelines.\n\nNobody talks about the logistics nightmare that follows.\n\nWhen a 50GWh battery plant comes online, the inbound logistics alone require:\n\n🏭 400+ daily truck movements\n🏭 12,000+ unique SKUs in active rotation\n🏭 99.7% on-time delivery to avoid $180K/hr line-down penalties\n🏭 Hazmat compliance for 60%+ of inbound materials\n\nRK Logistics has supported gigafactory-scale ramps for clients processing 2,000+ pallets daily through our FTZ network.\n\nThe difference between a successful ramp and a costly delay? A logistics partner who's done it before.\n\nWhat's the biggest logistics challenge in your facility ramp?\n\n#Gigafactory #EVBattery #Logistics #Manufacturing #SupplyChain`,
    hashtags: ["#Gigafactory", "#EVBattery", "#Logistics", "#Manufacturing", "#SupplyChain"],
    cta: "Book a gigafactory logistics readiness assessment",
    mediaType: "carousel",
    mediaDescription: "5 slides: 1) Gigafactory logistics by the numbers 2) Inbound flow diagram 3) FTZ network overlay 4) Ramp timeline 5) RK capabilities",
    audienceScores: [
      { personaId: "plant-mgr", score: 9.0, feedback: "Finally, someone who understands ramp logistics. The $180K/hr stat will get my VP's attention." },
      { personaId: "cfo-ev", score: 8.5, feedback: "The line-down cost figure makes the business case crystal clear." },
      { personaId: "ops-director", score: 7.0, feedback: "Relevant to large operations. The daily truck movement scale is impressive." },
    ],
    iteration: 2,
    status: "approved",
  },
  {
    id: "li-w13-2",
    week: "Mar 23–27",
    title: "OTTFI at 112.1: Northeast Freight Tightening",
    category: "Index Report",
    targetAudience: "Freight Buyers, Shippers, Carriers",
    platform: "OTT",
    content: `📊 On Time Trucking Freight Index: 112.1 (March 2026)\n\nThe tristate freight market is tightening faster than anyone expected.\n\nKey findings from our latest report:\n\n🚛 Flatbed rejection rates hit 42.7% — highest since Feb 2024\n🚛 Northeast LTL costs at $2.46/mile, up 11% YoY\n🚛 Last-mile complexity index up 18% as e-commerce reverse logistics surge\n🚛 Capacity shifting to intermodal, squeezing short-haul availability\n\nFor shippers in the NY/NJ/CT corridor:\n→ Lock in Q2 rates NOW before April capacity crunch\n→ Consider consolidated LTL with partners like Saia, TForce\n→ Last-mile co-loading can reduce costs 15-22%\n\nFull Tristate Freight Market Report in comments.\n\n#Freight #Trucking #LTL #Logistics #TriState #NewYork`,
    hashtags: ["#Freight", "#Trucking", "#LTL", "#Logistics", "#TriState", "#NewYork"],
    cta: "Get the full Tristate Freight Market Report",
    mediaType: "document",
    mediaDescription: "OTTFI March 2026 one-page summary with trend chart, regional heat map, and carrier performance matrix",
    audienceScores: [
      { personaId: "logistics-analyst", score: 9.0, feedback: "The OTTFI is a unique metric. No one else publishes tristate-specific freight data." },
      { personaId: "ops-director", score: 8.2, feedback: "Actionable rate advice. The timing callout is genuinely useful." },
      { personaId: "procurement-dir", score: 8.0, feedback: "I'd share this with my transportation team. The carrier consolidation tip is practical." },
    ],
    iteration: 2,
    status: "approved",
  },
  {
    id: "li-w13-3",
    week: "Mar 23–27",
    title: "Inverted Tariff Strategy: A Masterclass",
    category: "Technical Deep Dive",
    targetAudience: "Trade Compliance, Procurement, CFOs",
    platform: "Salesforce",
    content: `Most companies pay duties on finished goods.\n\nSmart companies use inverted tariff structures to pay less.\n\nHere's the concept:\nWhen component duty rates exceed finished product rates, manufacturing in an FTZ lets you choose the LOWER rate.\n\nReal example from our network:\n→ Component duty: 25% (Section 301 tariff)\n→ Finished product duty: 3.2% (normal MFN rate)\n→ Savings per $1M in components: $218,000\n\nThis isn't a loophole. It's a 90-year-old provision in the Foreign Trade Zones Act, and it's being dramatically underutilized.\n\nRK Logistics operates activated FTZs at 6 facilities, specifically designed for this strategy.\n\nAre you leaving money on the table?\n\n#FTZ #ForeignTradeZone #Tariffs #TradeCompliance #Manufacturing`,
    hashtags: ["#FTZ", "#ForeignTradeZone", "#Tariffs", "#TradeCompliance", "#Manufacturing"],
    cta: "Request our FTZ savings assessment",
    mediaType: "carousel",
    mediaDescription: "4 slides: 1) Inverted tariff diagram 2) Savings calculation 3) FTZ activation process 4) RK FTZ facility network",
    audienceScores: [
      { personaId: "cfo-ev", score: 9.5, feedback: "The $218K per $1M figure is incredibly compelling. I'm calculating our exposure right now." },
      { personaId: "vp-supply-chain", score: 9.0, feedback: "This is the kind of expertise that differentiates a 3PL. Sharing with our trade compliance team." },
      { personaId: "procurement-dir", score: 8.5, feedback: "Practical, specific, and actionable. This would make our RFP shortlist wider." },
    ],
    iteration: 3,
    status: "approved",
  },
];

// BESS/EV Battery LinkedIn Posts from PDF
export const bessLinkedInPosts: LinkedInPost[] = [
  {
    id: "bess-1",
    week: "Q2 Queue",
    title: "The Regulatory Squeeze on EV Battery Logistics",
    category: "BESS/EV",
    targetAudience: "EV Battery Executives, Compliance Teams",
    platform: "Salesforce",
    content: `⚡ FEOC + Section 301 + IRA = A logistics puzzle most 3PLs can't solve.\n\nNew FEOC restrictions now flag companies with just 25% Chinese entity ownership. Combined with 25% tariffs on battery cells and the IRA's domestic content requirements, the compliance maze has never been more complex.\n\nAt RK Logistics, we've built our FTZ network specifically for this moment:\n\n✅ FEOC-compliant chain-of-custody documentation\n✅ Duty deferral on battery components in FTZ storage\n✅ IRA-qualifying domestic processing capabilities\n✅ Hazmat-certified handling for lithium-ion cells\n\nThe penalty for getting this wrong? Loss of $7,500/vehicle tax credits.\nThe opportunity for getting it right? Competitive advantage measured in billions.\n\n#BESS #EVBattery #FEOC #IRA #ForeignTradeZone #Logistics`,
    hashtags: ["#BESS", "#EVBattery", "#FEOC", "#IRA", "#ForeignTradeZone", "#Logistics"],
    cta: "Download our BESS Compliance Logistics Guide",
    mediaType: "carousel",
    mediaDescription: "Regulatory timeline showing FEOC, Section 301, and IRA milestones with RK's compliance capabilities at each stage",
    audienceScores: [
      { personaId: "cfo-ev", score: 9.2, feedback: "The $7,500/vehicle credit risk framing is perfect for getting executive attention." },
      { personaId: "vp-supply-chain", score: 8.8, feedback: "Comprehensive regulatory awareness. This positions RK as the expert." },
      { personaId: "logistics-analyst", score: 8.0, feedback: "Good regulatory context. Would benefit from a compliance checklist download." },
    ],
    iteration: 2,
    status: "approved",
  },
  {
    id: "bess-2",
    week: "Q2 Queue",
    title: "Transporting 500lb Battery Packs Safely",
    category: "BESS/EV",
    targetAudience: "Operations Managers, Safety Officers",
    platform: "Salesforce",
    content: `A single EV battery pack weighs 500-1,200 lbs.\nIt contains enough energy to power a house for 2 days.\nAnd it needs to arrive damage-free, every time.\n\nThe logistics of BESS transportation are uniquely challenging:\n\n🔋 UN3481 classification for lithium-ion (special handling required)\n🔋 Temperature-controlled environments for storage & transit\n🔋 Thermal runaway containment protocols\n🔋 State-by-state permit variations for oversize loads\n\nRK Logistics has invested in:\n→ Certified hazmat handling teams at every CA facility\n→ Climate-controlled staging areas for battery modules\n→ Real-time SoC (State of Charge) monitoring\n→ Emergency response protocols developed with local fire departments\n\nSafe battery logistics isn't just about compliance — it's about protecting your $50M production schedule.\n\n#BatterySafety #EVLogistics #Hazmat #BESS #SupplyChain`,
    hashtags: ["#BatterySafety", "#EVLogistics", "#Hazmat", "#BESS", "#SupplyChain"],
    cta: "Schedule a facility safety walkthrough",
    mediaType: "video",
    mediaDescription: "60-second walkthrough of battery handling procedures at RK's Fremont facility, showing climate-controlled storage and safety protocols",
    audienceScores: [
      { personaId: "plant-mgr", score: 9.5, feedback: "This is the content I've been looking for. Real safety protocols, not just platitudes." },
      { personaId: "ops-director", score: 8.5, feedback: "The fire department coordination detail adds credibility. Shows operational maturity." },
      { personaId: "vp-supply-chain", score: 8.0, feedback: "Safety is table stakes but the specificity here sets RK apart." },
    ],
    iteration: 2,
    status: "approved",
  },
  {
    id: "bess-3",
    week: "Q2 Queue",
    title: "Free Up $2M+ in Working Capital with FTZ Strategy",
    category: "BESS/EV",
    targetAudience: "CFOs, Finance Directors, Procurement VPs",
    platform: "Salesforce",
    content: `Your EV battery supply chain is sitting on trapped capital.\n\nEvery day a component sits in a non-FTZ warehouse, you're paying duties on items that haven't even been sold yet.\n\nThe math on FTZ duty deferral for battery manufacturers:\n\n💰 Average duty rate on battery components: 15-25%\n💰 Average inventory holding period: 45-90 days\n💰 Working capital freed per $10M in annual component flow: $2.1-3.8M\n💰 Annual cash flow improvement: 18-32%\n\nRK Logistics FTZ advantages:\n→ Activated FTZ status at 6 facilities\n→ Weekly entry filing (vs per-shipment) reducing admin by 80%\n→ Zone-to-zone transfers between our facilities at zero duty\n→ Full customs brokerage integration\n\nStop paying duties on inventory. Start deploying that capital.\n\n#WorkingCapital #FTZ #EVBattery #CFO #SupplyChainFinance`,
    hashtags: ["#WorkingCapital", "#FTZ", "#EVBattery", "#CFO", "#SupplyChainFinance"],
    cta: "Request a working capital impact assessment",
    mediaType: "carousel",
    mediaDescription: "Before/After comparison showing working capital tied up with vs without FTZ, including cash flow waterfall chart",
    audienceScores: [
      { personaId: "cfo-ev", score: 9.8, feedback: "This is speaking directly to me. The working capital quantification is exactly right." },
      { personaId: "vp-supply-chain", score: 8.5, feedback: "I'd forward this to our CFO. The zone-to-zone transfer benefit is underappreciated." },
      { personaId: "procurement-dir", score: 8.0, feedback: "Financial framing makes the logistics decision an executive priority." },
    ],
    iteration: 3,
    status: "approved",
  },
  {
    id: "bess-4",
    week: "Q2 Queue",
    title: "Gigafactory Scale: The Logistics Nobody Talks About",
    category: "BESS/EV",
    targetAudience: "Plant Managers, Operations Directors",
    platform: "Salesforce",
    content: `Gigafactory announcements make headlines.\nGigafactory logistics failures don't — because they're quietly devastating.\n\nWhen a 35GWh battery plant runs at full capacity:\n\n📦 2,200+ pallets processed daily\n📦 24/7 receiving docks with <15 min turnaround target\n📦 400+ supplier origins across 12 countries\n📦 $180K/hour in line-down penalties when materials are late\n\nThe logistics partner you choose before the plant opens determines whether you hit production targets or spend Q1 firefighting.\n\nRK Logistics supports gigafactory-scale operations with:\n→ Dedicated on-site logistics teams\n→ Real-time inventory visibility across our FTZ network\n→ Scalable labor pool: 200→800 workers in 6 weeks\n→ 1.78M sqft across 13 facilities for overflow and surge\n\nPlanning a facility ramp? Start the logistics conversation 18 months before commissioning — not 6.\n\n#Gigafactory #Manufacturing #SupplyChain #EVBattery #OperationsExcellence`,
    hashtags: ["#Gigafactory", "#Manufacturing", "#SupplyChain", "#EVBattery", "#OperationsExcellence"],
    cta: "Download our Gigafactory Logistics Readiness Checklist",
    mediaType: "image",
    mediaDescription: "Infographic: 'Anatomy of Gigafactory Logistics' showing daily material flows, dock operations, and labor scaling requirements",
    audienceScores: [
      { personaId: "plant-mgr", score: 9.3, feedback: "The 18-month lead time advice is gold. Most companies start too late." },
      { personaId: "cfo-ev", score: 8.0, feedback: "The $180K/hr line-down cost makes the ROI case immediately." },
      { personaId: "logistics-analyst", score: 8.5, feedback: "Scale metrics are compelling. The labor scaling stat (200→800) is impressive proof." },
    ],
    iteration: 2,
    status: "approved",
  },
  {
    id: "bess-5",
    week: "Q2 Queue",
    title: "The Inverted Tariff Strategy Your Competitors Are Using",
    category: "BESS/EV",
    targetAudience: "Trade Compliance, CFOs, VP Supply Chain",
    platform: "Salesforce",
    content: `Here's a strategy that saves our clients 6-15% on component costs.\n\nIt's called inverted tariff manufacturing in a Foreign Trade Zone.\n\nThe concept:\nWhen tariffs on COMPONENTS are higher than on FINISHED GOODS, manufacturing inside an FTZ lets you elect the finished product rate.\n\nFor EV batteries, this is massive:\n\n📊 Battery cell tariff (Section 301): 25%\n📊 Finished battery pack tariff (MFN): 3.4%\n📊 Savings on $1M in cells: $216,000\n📊 Compound annual savings for a mid-size manufacturer: $4-8M\n\nThis isn't new. The Foreign Trade Zones Act of 1934 created this provision. But fewer than 5% of eligible manufacturers use it.\n\nRK Logistics has activated FTZ status at 6 facilities with full inverted tariff processing capabilities.\n\nYour competitors may already be using this. Are you?\n\n#InvertedTariff #FTZ #EVBattery #TradeCompliance #CostReduction`,
    hashtags: ["#InvertedTariff", "#FTZ", "#EVBattery", "#TradeCompliance", "#CostReduction"],
    cta: "Schedule a free tariff optimization review",
    mediaType: "carousel",
    mediaDescription: "5 slides explaining inverted tariff concept with visual flow diagram, savings calculation, eligibility criteria, and RK FTZ map",
    audienceScores: [
      { personaId: "cfo-ev", score: 9.6, feedback: "The annual savings range ($4-8M) is board-level material. Sharing with our legal team." },
      { personaId: "vp-supply-chain", score: 9.2, feedback: "The '5% utilization' stat creates urgency. Excellent competitive positioning." },
      { personaId: "procurement-dir", score: 8.8, feedback: "Clear, specific, actionable. This is what thought leadership should look like." },
    ],
    iteration: 3,
    status: "approved",
  },
];

// ──────────────────────────────────────────────────────
// 4. MONTHLY DHTSCI PUBLICATION CONTENT
// ──────────────────────────────────────────────────────

export interface PublicationSection {
  title: string;
  type: "headline" | "metric" | "analysis" | "chart" | "callout" | "table";
  content: string;
  data?: any;
}

export interface MonthlyPublication {
  title: string;
  subtitle: string;
  edition: string;
  date: string;
  indexValue: number;
  indexChange: number;
  indexTrend: "up" | "down" | "flat";
  executiveSummary: string;
  sections: PublicationSection[];
  kpis: { label: string; value: string; change: string; trend: "up" | "down" | "flat" }[];
  audienceScores: { personaId: string; score: number; feedback: string }[];
  status: "draft" | "reviewed" | "approved" | "published";
}

export const dhtsciPublication: MonthlyPublication = {
  title: "State of the Durable High-Technology Supply Chain",
  subtitle: "Monthly Intelligence Report — RK Logistics",
  edition: "Vol. 3, No. 3",
  date: "March 2026",
  indexValue: 46.2,
  indexChange: -7.6,
  indexTrend: "down",
  executiveSummary: "The DHTSCI fell sharply to 46.2 in March 2026, marking the steepest single-month decline since Q3 2024. The contraction was driven by compounding disruptions: Red Sea route diversions adding 12-18 transit days, ASML delivery backlogs creating semiconductor equipment bottlenecks, and the Applied Materials $252M BIS penalty sending compliance shockwaves through the industry. Despite the headline pessimism, nearshoring activity surged 23% QoQ, and FTZ utilization hit record levels as companies restructured supply chains around tariff mitigation.",
  sections: [
    { title: "DHTSCI Methodology", type: "callout", content: "The Durable High-Technology Supply Chain Index (DHTSCI) is a proprietary composite indicator tracking manufacturing output, freight volumes, inventory levels, new orders, and supply chain disruption frequency across the semiconductor, EV/battery, solar, and precision electronics sectors. A reading above 50 indicates expansion; below 50 indicates contraction." },
    { title: "Component Breakdown", type: "table", content: "Manufacturing Output: 42.8 (-8.2) | Freight Volumes: 48.5 (-5.1) | Inventory Levels: 51.3 (+2.4) | New Orders: 44.1 (-10.8) | Disruption Frequency: 38.2 (-14.1)" },
    { title: "Red Sea Impact Analysis", type: "analysis", content: "Houthi disruptions have forced 72% of Asia-US shipping through the Cape of Good Hope, adding 12-18 days to transit times. For semiconductor equipment shippers, this translates to $45K-80K in additional per-container costs and has increased safety stock requirements by 25-35%. RK's FTZ network mitigates the financial impact through duty deferral on extended in-transit inventory." },
    { title: "ASML Backlog Ripple Effects", type: "analysis", content: "ASML's EUV lithography delivery delays have created a cascading bottleneck affecting 80%+ of advanced semiconductor manufacturing. Lead times for critical components have extended from 18 to 26 weeks, increasing demand for secure, climate-controlled warehousing of high-value semiconductor equipment. RK facilities have seen a 40% increase in semiconductor equipment storage requests this quarter." },
    { title: "Applied Materials BIS Penalty Impact", type: "analysis", content: "The $252M penalty against Applied Materials for export control violations has triggered industry-wide compliance reviews. Companies are reassessing their logistics partners' export compliance capabilities, creating both risk and opportunity. RK's ITAR-compliant facilities and customs brokerage integration position us as a compliance-first 3PL option." },
    { title: "Freight Rate Outlook", type: "analysis", content: "Northeast corridor freight costs reached $2.46/mile in March, up 11% YoY. Flatbed rejection rates at 42.7% indicate severe capacity constraints for oversized semiconductor equipment transport. OTT's OTTFI registered 112.1, confirming the tightening trend across the tristate region." },
    { title: "90-Day Outlook", type: "callout", content: "We project the DHTSCI to stabilize at 47-49 in Q2 2026 as Red Sea disruptions normalize and inventory restocking cycles complete. Key upside risks: CHIPS Act disbursements accelerating domestic manufacturing. Key downside risks: escalation of Section 301 tariffs to 50% on Chinese semiconductor components." },
  ],
  kpis: [
    { label: "DHTSCI", value: "46.2", change: "-7.6", trend: "down" },
    { label: "Mfg Output", value: "42.8", change: "-8.2", trend: "down" },
    { label: "Freight Vol", value: "48.5", change: "-5.1", trend: "down" },
    { label: "New Orders", value: "44.1", change: "-10.8", trend: "down" },
    { label: "Inventory", value: "51.3", change: "+2.4", trend: "up" },
    { label: "Disruptions", value: "38.2", change: "-14.1", trend: "down" },
  ],
  audienceScores: [
    { personaId: "logistics-analyst", score: 9.5, feedback: "Publication-quality content. The methodology transparency and component breakdown are exactly what builds credibility." },
    { personaId: "vp-supply-chain", score: 9.0, feedback: "The actionable 90-day outlook sets this apart from generic industry reports. Would subscribe immediately." },
    { personaId: "cfo-ev", score: 8.5, feedback: "Financial quantification of disruption costs ($45K-80K/container) is the language I understand." },
    { personaId: "procurement-dir", score: 8.8, feedback: "I'd reference this in our quarterly supply chain reviews. The ASML analysis is uniquely valuable." },
    { personaId: "ops-director", score: 8.0, feedback: "Strong operational context. The FTZ storage increase stat (40%) shows real market signal." },
    { personaId: "plant-mgr", score: 7.5, feedback: "Good market context but I'd want more facility-level operational implications." },
  ],
  status: "approved",
};

// ──────────────────────────────────────────────────────
// 5. VIDEO SCRIPTS
// ──────────────────────────────────────────────────────

export interface VideoScript {
  id: string;
  title: string;
  format: "Short" | "Long" | "Series" | "Testimonial";
  duration: string;
  platform: string;
  category: string;
  hook: string;
  outline: string[];
  cta: string;
  productionNotes: string;
  estimatedReach: string;
  audienceScores: { personaId: string; score: number; feedback: string }[];
  status: "concept" | "scripted" | "reviewed" | "production";
}

export const videoScripts: VideoScript[] = [
  {
    id: "vs-1",
    title: "Inside RK Logistics: Fremont Facility Tour",
    format: "Long",
    duration: "4-6 min",
    platform: "YouTube / LinkedIn",
    category: "Facility",
    hook: "What does 200,000 sqft of semiconductor-grade warehousing actually look like?",
    outline: [
      "Aerial drone shot of Fremont facility exterior",
      "Walk through receiving docks — show high-bay racking, climate control",
      "FTZ operations: customs staging, documentation flow",
      "Clean handling area for semiconductor equipment",
      "Technology: WMS screens, barcode scanning, real-time inventory",
      "Team introduction: warehouse manager, customs specialist",
      "Scale reveal: 2,000+ pallets processed daily across the network",
    ],
    cta: "Schedule your own facility tour at rklogistics.com",
    productionNotes: "Drone + gimbal. Natural lighting preferred. Include ambient warehouse sounds. Subtitles for all dialogue. B-roll of active operations (forklifts, packing, scanning).",
    estimatedReach: "5K-15K views (LinkedIn boost), 500-2K organic YouTube",
    audienceScores: [
      { personaId: "plant-mgr", score: 9.5, feedback: "FINALLY. This is what I've been asking for. Seeing the facility in action tells me more than any spreadsheet." },
      { personaId: "procurement-dir", score: 8.5, feedback: "Virtual tour saves me a site visit. Very useful in the vendor evaluation phase." },
      { personaId: "ops-director", score: 8.0, feedback: "The technology overlay (WMS screens) is a nice touch. Shows operational maturity." },
    ],
    status: "scripted",
  },
  {
    id: "vs-2",
    title: "FTZ Explained in 60 Seconds",
    format: "Short",
    duration: "60 sec",
    platform: "YouTube Shorts / LinkedIn / TikTok",
    category: "Education",
    hook: "You're paying duties on goods you haven't even sold yet. Here's how to stop.",
    outline: [
      "0-5s: Hook with dollar bills animation",
      "5-15s: 'What is an FTZ?' — simple visual explanation",
      "15-30s: Three benefits: duty deferral, inverted tariffs, weekly entry",
      "30-45s: Real savings example: '$218K saved per $1M in components'",
      "45-55s: 'RK operates 6 FTZ-activated facilities'",
      "55-60s: CTA — 'Link in bio for free assessment'",
    ],
    cta: "Free FTZ savings assessment — link in bio",
    productionNotes: "Fast-paced motion graphics. Bold text overlays. No talking head — voiceover only. Upbeat but professional music. Must work with sound off (text-driven).",
    estimatedReach: "10K-50K views (Shorts algorithm), 2K-8K LinkedIn",
    audienceScores: [
      { personaId: "cfo-ev", score: 9.0, feedback: "Perfect format for sharing with my team. The savings figure makes it click." },
      { personaId: "logistics-analyst", score: 8.5, feedback: "Concise education content. Would share this with colleagues who don't understand FTZs." },
      { personaId: "procurement-dir", score: 8.0, feedback: "Short enough to watch, compelling enough to act on. Good awareness piece." },
    ],
    status: "scripted",
  },
  {
    id: "vs-3",
    title: "Day in the Life: Warehouse Operations Manager",
    format: "Short",
    duration: "90 sec",
    platform: "YouTube Shorts / LinkedIn",
    category: "Culture",
    hook: "5:30 AM. The first truck hasn't arrived yet, but the day is already planned.",
    outline: [
      "0-10s: Alarm clock → drive to facility in the dark",
      "10-25s: Morning huddle with team, reviewing daily priorities",
      "25-40s: First receiving dock opens, scanning begins",
      "40-55s: Problem-solving moment: damaged shipment protocol",
      "55-70s: Lunch break interaction with team",
      "70-85s: End of day: metrics review, tomorrow prep",
      "85-90s: RK logo + 'We're hiring' CTA",
    ],
    cta: "See open roles at RK Logistics",
    productionNotes: "Cinematic day-in-life style. Real employee (with consent). Natural audio + subtle music. iPhone-quality is fine — authenticity matters more than production value.",
    estimatedReach: "15K-40K views (recruiting content performs well in Shorts)",
    audienceScores: [
      { personaId: "plant-mgr", score: 8.5, feedback: "Culture content builds trust. Seeing real employees tells me about the work environment." },
      { personaId: "ops-director", score: 9.0, feedback: "The morning huddle and metrics review show operational discipline. Very impressive." },
      { personaId: "logistics-analyst", score: 7.0, feedback: "Good brand content. Less relevant for my decision-making but humanizes the company." },
    ],
    status: "concept",
  },
  {
    id: "vs-4",
    title: "DHTSCI March 2026: 2-Minute Briefing",
    format: "Short",
    duration: "2 min",
    platform: "YouTube / LinkedIn",
    category: "Education",
    hook: "The Durable High-Tech Supply Chain Index just dropped 7.6 points. Here's what it means for your business.",
    outline: [
      "0-10s: DHTSCI number reveal with dramatic drop animation",
      "10-30s: Top 3 drivers (Red Sea, ASML, Applied Materials)",
      "30-50s: What this means: buffer inventory, FTZ importance, dual-sourcing",
      "50-80s: 90-day outlook with key risks and opportunities",
      "80-100s: 'Full report available' + subscribe CTA",
      "100-120s: RK Logistics branding + next month preview tease",
    ],
    cta: "Subscribe for monthly DHTSCI updates",
    productionNotes: "Animated data visualization + voiceover. Clean motion graphics matching RK's teal brand. Charts that build as narrator explains. Professional but not stuffy.",
    estimatedReach: "3K-10K views, high save/share rate for industry content",
    audienceScores: [
      { personaId: "logistics-analyst", score: 9.5, feedback: "Video format of the index is brilliant. Makes the data consumable for executives who won't read the full report." },
      { personaId: "vp-supply-chain", score: 9.0, feedback: "Would share this in our weekly leadership meeting. The 90-day outlook adds planning value." },
      { personaId: "cfo-ev", score: 8.0, feedback: "Good executive summary format. The visual data presentation is effective." },
    ],
    status: "scripted",
  },
  {
    id: "vs-5",
    title: "Battery Pack Handling: Safety Protocols at RK",
    format: "Long",
    duration: "3-4 min",
    platform: "YouTube / LinkedIn",
    category: "Facility",
    hook: "500 pounds. Enough energy to power a house. And it needs to arrive perfect.",
    outline: [
      "0-15s: Dramatic reveal of battery pack on pallet",
      "15-45s: Hazmat classification explained (UN3481)",
      "45-90s: Climate-controlled storage area walkthrough",
      "90-120s: Handling procedures: forklift modifications, team protocols",
      "120-150s: Thermal runaway containment demo (training exercise)",
      "150-180s: Documentation and chain-of-custody for compliance",
      "180-210s: Team certifications and ongoing training",
      "210-240s: CTA — safety walkthrough booking",
    ],
    cta: "Book a safety walkthrough at our facilities",
    productionNotes: "Safety-first tone. Show real PPE, real procedures. Include safety manager interview. Compliance overlay showing regulatory requirements met. Professional production essential for credibility.",
    estimatedReach: "2K-8K views, high credibility content for EV prospects",
    audienceScores: [
      { personaId: "plant-mgr", score: 9.8, feedback: "This video alone would move RK to our shortlist. Safety procedures are the #1 thing I evaluate." },
      { personaId: "vp-supply-chain", score: 8.5, feedback: "The compliance documentation overlay is brilliant. Shows both capability and awareness." },
      { personaId: "cfo-ev", score: 7.5, feedback: "Good de-risking content. Shows we won't have liability issues with this partner." },
    ],
    status: "concept",
  },
];

// ──────────────────────────────────────────────────────
// 6. REDDIT CONTENT
// ──────────────────────────────────────────────────────

export interface RedditContent {
  id: string;
  subreddit: string;
  type: "post" | "comment" | "ama";
  title: string;
  content: string;
  category: string;
  scheduledWeek: string;
  audienceScores: { personaId: string; score: number; feedback: string }[];
  status: "draft" | "reviewed" | "approved" | "posted";
}

export const redditContentPosts: RedditContent[] = [
  {
    id: "rd-1",
    subreddit: "r/supplychain",
    type: "post",
    title: "[Industry Data] Flatbed rejection rates hit 42.7% in March — what we're seeing in the tristate freight market",
    content: `Hey r/supplychain,\n\nWe publish a monthly freight index (OTTFI) tracking the NY/NJ/CT corridor and wanted to share some findings from our March report.\n\nKey data points:\n- Flatbed rejection rates: 42.7% (highest since Feb 2024)\n- Northeast LTL costs: $2.46/mile, up 11% YoY\n- Last-mile complexity up 18% driven by reverse logistics\n- Capacity shifting to intermodal, squeezing short-haul\n\nFor those of you shipping in/out of the Northeast:\n- Q2 rate locks should happen ASAP\n- Consolidated LTL can save 15-22% vs individual shipments\n- Last-mile co-loading partnerships are emerging as a real strategy\n\nHappy to answer questions or share more detail on methodology. We collect data from our carrier network (Saia, TForce, Roadrunner + 40 others) across ~15K shipments/month.\n\nFull report PDF: [link]\n\nDisclaimer: I work for On Time Trucking, a tristate LTL carrier. Posting this because the data is useful, not to sell anything.`,
    category: "Data Share",
    scheduledWeek: "Mar 16–20",
    audienceScores: [
      { personaId: "logistics-analyst", score: 9.5, feedback: "Perfect Reddit tone — data-first, transparent about affiliation, genuinely useful." },
      { personaId: "ops-director", score: 8.5, feedback: "The methodology mention (15K shipments) adds real credibility." },
    ],
    status: "approved",
  },
  {
    id: "rd-2",
    subreddit: "r/logistics",
    type: "comment",
    title: "Response to 'What should I look for in a 3PL for semiconductor components?'",
    content: `Great question. I manage semiconductor logistics at a 3PL (full disclosure) and here's what I'd prioritize:\n\n1. **FTZ capability** — If your components face Section 301 tariffs (most do now), FTZ storage can defer duties and enable inverted tariff strategies. Ask specifically about "activated" vs "general purpose" FTZ status.\n\n2. **Climate control** — Semiconductor equipment is sensitive. Ask about temperature AND humidity ranges. Get SLAs in writing.\n\n3. **Clean handling protocols** — Not full cleanroom, but "clean environment" handling. Ask about contamination control procedures.\n\n4. **WMS integration** — Can their system talk to your ERP? Real-time inventory visibility isn't optional at this price point.\n\n5. **Insurance coverage** — Standard warehouse insurance won't cover $2M ASML tools. Get a COI review before you sign.\n\nBonus: Ask how they handle oversized/heavy freight. Semiconductor equipment can be 10,000+ lbs per crate.\n\nHappy to answer follow-ups.`,
    category: "Expert Comment",
    scheduledWeek: "Mar 16–20",
    audienceScores: [
      { personaId: "procurement-dir", score: 9.0, feedback: "This is genuinely helpful advice, not a sales pitch. Would upvote and save." },
      { personaId: "vp-supply-chain", score: 8.5, feedback: "The FTZ and insurance points show real expertise. Authentic." },
    ],
    status: "approved",
  },
  {
    id: "rd-3",
    subreddit: "r/electricvehicles",
    type: "post",
    title: "[Discussion] The logistics gap nobody talks about in EV battery manufacturing",
    content: `I've spent 10+ years in logistics, the last 4 focused on EV/battery supply chains. There's a massive gap in the industry discussion that I think needs more attention.\n\nEveryone talks about:\n- Gigafactory construction timelines\n- Battery chemistry breakthroughs\n- Charging infrastructure\n\nNobody talks about:\n- How you safely move 2,200+ pallets/day to keep a 35GWh plant running\n- The UN3481 hazmat maze for lithium-ion logistics\n- FTZ strategies that save $4-8M/year on tariff-exposed battery components\n- The fact that line-down penalties run $180K/hour at scale\n\nThe logistics infrastructure for EV manufacturing is the unsung bottleneck. We're building gigafactories faster than we're building the logistics networks to supply them.\n\nCurious: if you work in EV manufacturing, what's your biggest logistics pain point?\n\nEdit: I work in 3PL (warehouse logistics). Not promoting, just interested in the discussion.`,
    category: "Thought Leadership",
    scheduledWeek: "Mar 23–27",
    audienceScores: [
      { personaId: "plant-mgr", score: 9.0, feedback: "This is the Reddit content that builds real reputation. Authentic, knowledgeable, not salesy." },
      { personaId: "ops-director", score: 8.5, feedback: "The framing of 'logistics as bottleneck' for gigafactories is a fresh angle." },
    ],
    status: "approved",
  },
  {
    id: "rd-4",
    subreddit: "r/semiconductor",
    type: "post",
    title: "[Data] DHTSCI dropped to 46.2 in March — steepest decline since Q3 2024. Here's the breakdown.",
    content: `Monthly update on the Durable High-Technology Supply Chain Index.\n\n**DHTSCI March 2026: 46.2** (down 7.6 points from February)\n\nComponent breakdown:\n| Component | Score | MoM Change |\n|---|---|---|\n| Manufacturing Output | 42.8 | -8.2 |\n| Freight Volumes | 48.5 | -5.1 |\n| Inventory Levels | 51.3 | +2.4 |\n| New Orders | 44.1 | -10.8 |\n| Disruption Frequency | 38.2 | -14.1 |\n\nKey drivers:\n- Red Sea diversions adding 12-18 days to Asia-US routes\n- ASML delivery backlogs rippling through equipment supply chains\n- Applied Materials $252M BIS penalty creating compliance uncertainty\n- Northeast freight at $2.46/mile (+11% YoY)\n\n90-day outlook: Stabilization at 47-49. Watch for CHIPS Act disbursements (upside) and potential tariff escalation (downside).\n\nMethodology: Composite of manufacturing output, freight volumes, inventory, new orders, and disruption frequency across semi, EV/battery, solar, and precision electronics. Data from our logistics network + public sources.\n\nFull report: [link]\n\n*Disclosure: Published by RK Logistics. We make this data freely available because a better-informed industry is better for everyone.*`,
    category: "Data Share",
    scheduledWeek: "Mar 23–27",
    audienceScores: [
      { personaId: "logistics-analyst", score: 9.8, feedback: "This is exactly how to build credibility on Reddit. Free, transparent, useful data with methodology." },
      { personaId: "vp-supply-chain", score: 9.0, feedback: "The table format is perfect for Reddit. Clear, scannable, actionable." },
    ],
    status: "approved",
  },
  {
    id: "rd-5",
    subreddit: "r/warehouseworkers",
    type: "post",
    title: "What would make you stay at a warehouse job? Honest question from management.",
    content: `I manage operations at a contract warehouse in California and I'm genuinely trying to understand what we can do better for retention.\n\nOur current situation:\n- Starting pay: $21-24/hr depending on role\n- Full benefits after 60 days\n- Some shift differential for nights\n- We've been promoting from within more lately\n\nWhat I'm hearing from exits:\n- Want more schedule flexibility\n- Feel like there's no career path\n- Physical demands are tough without enough breaks\n\nWhat we're considering:\n- Flexible shift scheduling (would you prefer 4x10 over 5x8?)\n- Formal career ladder with training programs\n- Ergonomic improvements + more break areas\n\nThis isn't a recruiting post — I'm asking because the labor market in Bay Area logistics is brutal and I'd rather fix our culture than keep cycling through hires.\n\nWhat would actually make a difference for you?`,
    category: "Community Engagement",
    scheduledWeek: "Mar 30–Apr 3",
    audienceScores: [
      { personaId: "ops-director", score: 9.5, feedback: "Brilliant employer branding. This shows a company that actually listens." },
      { personaId: "plant-mgr", score: 8.5, feedback: "Authentic engagement. The transparency about challenges builds massive trust." },
    ],
    status: "approved",
  },
];

// ──────────────────────────────────────────────────────
// 7. CONTENT ENGINE SUMMARY / KPIs
// ──────────────────────────────────────────────────────

export const contentEngineKPIs = {
  totalContent: 22,
  linkedInPosts: { total: 11, approved: 11, avgScore: 8.6, topPerformer: "Inverted Tariff Strategy (BESS-5)" },
  publicationSections: { total: 7, approved: 1, avgScore: 8.7, nextDeadline: "Apr 1, 2026" },
  videoScripts: { total: 5, scripted: 3, concept: 2, avgScore: 8.5, topPriority: "Fremont Facility Tour" },
  redditPosts: { total: 5, approved: 5, avgScore: 9.0, topSubreddit: "r/supplychain" },
  syntheticAudience: {
    personaCount: 6,
    avgContentScore: 8.6,
    highestScoringContent: "DHTSCI Reddit Post (9.8 — Logistics Analyst)",
    lowestScoringContent: "Current Marketing Review (6.1 — Plant Manager)",
    iterationsCompleted: 14,
    improvementFromIteration: "+1.8 avg score improvement from v1 to final",
  },
  weeklyCalendar: [
    { week: "Mar 16–20", linkedin: 3, reddit: 2, video: 0, publication: 0 },
    { week: "Mar 23–27", linkedin: 3, reddit: 2, video: 0, publication: 0 },
    { week: "Mar 30–Apr 3", linkedin: 0, reddit: 1, video: 0, publication: 1 },
    { week: "Apr 7–11", linkedin: 3, reddit: 2, video: 1, publication: 0 },
  ],
};
