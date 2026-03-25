// ═══════════════════════════════════════════════════════
// Press Releases + Competitor Engaging Posts Data
// ═══════════════════════════════════════════════════════

import { syntheticPersonas } from "./contentEngineData";

// ──────────────────────────────────────────────────────
// 1. PRESS RELEASE KPIs
// ──────────────────────────────────────────────────────

export const pressReleaseKPIs = {
  totalReleases: 4,
  published: 1,
  inReview: 1,
  drafts: 2,
  avgMediaPickups: 12,
  avgSyntheticScore: 8.7,
  topPerforming: "Panasonic Partnership Announcement",
  nextScheduled: "Mar 24, 2026",
  distributionChannels: ["PR Newswire", "Business Wire", "LinkedIn", "Industry Journals", "Company Website"],
  yearlyTarget: 12,
  yearlyProgress: 3,
};

// ──────────────────────────────────────────────────────
// 2. PRESS RELEASES
// ──────────────────────────────────────────────────────

export interface PressRelease {
  id: string;
  title: string;
  headline: string;
  subhead: string;
  category: string;
  status: "published" | "review" | "draft" | "concept";
  date: string;
  body: string;
  boilerplate: string;
  contact: string;
  distribution: string[];
  kpis: {
    mediaPickups: number;
    impressions: string;
    websiteReferrals: number;
    linkedinShares: number;
    openRate: string;
  };
  audienceScores: { personaId: string; score: number; feedback: string }[];
  iterationHistory: { version: number; score: number; change: string }[];
  status_detail: string;
}

export const pressReleases: PressRelease[] = [
  {
    id: "pr-1",
    title: "Panasonic Partnership Announcement",
    headline: "RK Logistics Secures Multi-Year Contract with Panasonic Energy for EV Battery Warehousing and FTZ Services",
    subhead: "Partnership leverages RK's Foreign Trade Zone network across 6 facilities to support Panasonic's North American EV battery manufacturing expansion",
    category: "Partnership",
    status: "published",
    date: "Mar 10, 2026",
    body: `FREMONT, CA — March 10, 2026 — RK Logistics Group, a leading provider of contract warehousing, Foreign Trade Zone (FTZ) management, and supply chain solutions for high-technology manufacturers, today announced a multi-year partnership with Panasonic Energy of North America to provide warehousing, FTZ services, and logistics support for Panasonic's expanding EV battery operations.

Under the agreement, RK Logistics will provide:
• Dedicated FTZ-activated warehousing at its Patterson Pass facility in California
• Duty deferral and inverted tariff processing for battery components subject to Section 301 tariffs
• Hazmat-certified handling and climate-controlled storage for lithium-ion battery cells and modules
• Scalable labor solutions supporting production ramps of up to 2,000+ pallets per day

"Panasonic's commitment to North American EV battery manufacturing requires logistics partners who understand both the regulatory complexity and operational scale of this industry," said Joe Fernandez, CEO of RK Logistics Group. "Our activated FTZ network and semiconductor-grade handling capabilities are uniquely positioned to support Panasonic's growth."

The partnership is expected to generate significant duty savings through RK's inverted tariff strategy, where the duty rate on finished battery packs (3.4%) is substantially lower than the rate on imported components (up to 25% under Section 301).

RK Logistics currently operates 13 facilities across 5 states, totaling 1.78 million square feet, with activated FTZ status at 6 locations. The company serves leading technology, EV, semiconductor, and clean energy manufacturers including LAM Research, KLA Corporation, Tesla, and Corning.`,
    boilerplate: "About RK Logistics Group: RK Logistics Group is a Fremont, California-based contract warehousing and supply chain solutions provider serving the high-technology, semiconductor, EV/battery, and clean energy sectors. Founded in 1996, the company operates 13 facilities across 5 states, totaling 1.78 million square feet, with activated Foreign Trade Zone (FTZ) status at 6 locations. RK's sister company, On Time Trucking (OTT), provides LTL and freight brokerage services in the tristate New York region. Combined FY2025 revenue: $105.4M.",
    contact: "Media Contact: RK Logistics Marketing, press@rklogistics.com, (510) 555-0100",
    distribution: ["PR Newswire", "Business Wire", "LinkedIn", "Supply Chain Dive", "Company Website"],
    kpis: { mediaPickups: 18, impressions: "245K", websiteReferrals: 342, linkedinShares: 89, openRate: "42.3%" },
    audienceScores: [
      { personaId: "vp-supply-chain", score: 9.2, feedback: "Perfect partnership announcement. The FTZ and tariff details add substance beyond a generic PR." },
      { personaId: "cfo-ev", score: 9.0, feedback: "The inverted tariff savings angle gives this real financial credibility." },
      { personaId: "procurement-dir", score: 8.5, feedback: "The Panasonic name carries weight. Would share with our logistics evaluation team." },
    ],
    iterationHistory: [
      { version: 1, score: 7.2, change: "Initial draft — too generic, lacked specific financial impact" },
      { version: 2, score: 8.1, change: "Added duty rate specifics (3.4% vs 25%) per CFO persona feedback" },
      { version: 3, score: 9.2, change: "Added scalability numbers (2,000+ pallets) and client list per VP persona" },
    ],
    status_detail: "Published Mar 10 via PR Newswire. 18 media pickups in first 72 hours.",
  },
  {
    id: "pr-2",
    title: "DHTSCI Index Launch Announcement",
    headline: "RK Logistics Launches Durable High-Technology Supply Chain Index (DHTSCI), First Industry-Specific Benchmark for Tech Manufacturing Logistics",
    subhead: "Free monthly publication tracks manufacturing output, freight volumes, and supply chain disruption across semiconductor, EV, solar, and precision electronics sectors",
    category: "Thought Leadership",
    status: "review",
    date: "Mar 24, 2026",
    body: `FREMONT, CA — March 24, 2026 — RK Logistics Group today announced the launch of the Durable High-Technology Supply Chain Index (DHTSCI), the first publicly available composite indicator specifically tracking supply chain health across the semiconductor, EV/battery, solar, and precision electronics manufacturing sectors.

The DHTSCI, published monthly at no cost, aggregates five key components:
• Manufacturing Output — production volumes and capacity utilization
• Freight Volumes — inbound and outbound shipping activity
• Inventory Levels — raw material and finished goods positioning
• New Orders — forward-looking demand indicators
• Disruption Frequency — supply chain interruption events and severity

The inaugural March 2026 DHTSCI reading of 46.2 indicates contraction in the durable high-technology supply chain, driven by Red Sea shipping diversions, ASML delivery backlogs, and heightened regulatory compliance uncertainty following the Applied Materials BIS penalty.

"There's a significant gap in publicly available, sector-specific supply chain intelligence," said Joe Fernandez, CEO of RK Logistics Group. "The DHTSCI fills that gap by providing the data-driven insights that supply chain leaders, procurement teams, and financial analysts need to make informed decisions."

The index methodology is fully transparent and available on the RK Logistics website. Data is sourced from RK's logistics network spanning 13 facilities across 5 states, supplemented by public data sources including freight rate indices, manufacturing PMI data, and customs statistics.

The companion On Time Trucking Freight Index (OTTFI), tracking tristate freight market conditions, is also published monthly by RK's sister company On Time Trucking.`,
    boilerplate: "About RK Logistics Group: RK Logistics Group is a Fremont, California-based contract warehousing and supply chain solutions provider serving the high-technology, semiconductor, EV/battery, and clean energy sectors. Founded in 1996, the company operates 13 facilities across 5 states, totaling 1.78 million square feet, with activated Foreign Trade Zone (FTZ) status at 6 locations. Combined FY2025 revenue: $105.4M.",
    contact: "Media Contact: RK Logistics Marketing, press@rklogistics.com, (510) 555-0100",
    distribution: ["PR Newswire", "Supply Chain Dive", "Semiconductor Engineering", "LinkedIn", "Company Website"],
    kpis: { mediaPickups: 0, impressions: "—", websiteReferrals: 0, linkedinShares: 0, openRate: "—" },
    audienceScores: [
      { personaId: "logistics-analyst", score: 9.8, feedback: "This is exactly what the industry needs. The methodology transparency is exceptional." },
      { personaId: "vp-supply-chain", score: 9.0, feedback: "Free, transparent, sector-specific data. This positions RK as the industry authority." },
      { personaId: "ops-director", score: 8.5, feedback: "Smart PR move. Establishing an index gives RK permanent thought leadership positioning." },
    ],
    iterationHistory: [
      { version: 1, score: 7.5, change: "Initial draft focused too much on RK capabilities, not enough on the index itself" },
      { version: 2, score: 8.8, change: "Reframed around industry need and methodology transparency per Analyst persona" },
      { version: 3, score: 9.1, change: "Added companion OTTFI mention and free access emphasis per VP persona" },
    ],
    status_detail: "Final review by CEO. Scheduled for Mar 24 distribution.",
  },
  {
    id: "pr-3",
    title: "LAM Research AZ Facility Expansion",
    headline: "RK Logistics Expands Semiconductor Logistics Operations with New Arizona Facility to Support LAM Research",
    subhead: "New 185,000 sqft FTZ-activated facility in Chandler, AZ positions RK to serve the growing CHIPS Act-driven semiconductor manufacturing corridor",
    category: "Expansion",
    status: "draft",
    date: "Apr 2026 (TBD)",
    body: `FREMONT, CA — [Date TBD] — RK Logistics Group announced the opening of a new 185,000 square foot Foreign Trade Zone-activated facility in Chandler, Arizona, expanding the company's semiconductor logistics capabilities to serve the rapidly growing Arizona semiconductor manufacturing corridor.

The new facility will serve as a regional logistics hub for semiconductor equipment and component handling, with features including:
• Activated FTZ status for duty deferral on semiconductor equipment and components
• Climate-controlled and clean-environment handling areas for sensitive equipment
• Heavy freight capabilities for equipment up to 10,000+ lbs per crate
• WMS integration with major ERP systems (SAP, Oracle, NetSuite)
• Proximity to TSMC, Intel, and other CHIPS Act-funded fabrication facilities

The expansion directly supports RK's continued partnership with LAM Research, one of the world's leading suppliers of wafer fabrication equipment.

"Arizona is becoming the epicenter of American semiconductor manufacturing," said Joe Fernandez, CEO of RK Logistics Group. "Our new Chandler facility gives LAM Research and other semiconductor manufacturers a local logistics partner with the FTZ expertise and handling standards their equipment requires."

The facility is RK's 14th location and expands the company's activated FTZ network to 7 facilities across 6 states.`,
    boilerplate: "About RK Logistics Group: [Standard boilerplate]",
    contact: "Media Contact: RK Logistics Marketing, press@rklogistics.com, (510) 555-0100",
    distribution: ["PR Newswire", "Semiconductor Engineering", "AZ Central", "LinkedIn", "CHIPS Act Newsletter"],
    kpis: { mediaPickups: 0, impressions: "—", websiteReferrals: 0, linkedinShares: 0, openRate: "—" },
    audienceScores: [
      { personaId: "vp-supply-chain", score: 9.5, feedback: "CHIPS Act angle is incredibly timely. This will get picked up by semiconductor trade press." },
      { personaId: "plant-mgr", score: 9.0, feedback: "Local logistics capability near TSMC and Intel fab sites is exactly what we need." },
      { personaId: "procurement-dir", score: 8.8, feedback: "Expansion signals financial health and commitment. Would add RK to our vendor review." },
    ],
    iterationHistory: [
      { version: 1, score: 7.8, change: "Initial draft lacked CHIPS Act context and proximity value proposition" },
      { version: 2, score: 8.9, change: "Added TSMC/Intel proximity and CHIPS Act framing per VP persona" },
      { version: 3, score: 9.1, change: "Added heavy freight specs and WMS integration details per Plant Mgr" },
    ],
    status_detail: "Draft complete. Awaiting LAM Research approval on joint announcement.",
  },
  {
    id: "pr-4",
    title: "Hidden Costs Whitepaper Release",
    headline: "New Research: Segmented Semiconductor Supply Chains Cost Manufacturers 35-65% More Than Integrated Logistics Models",
    subhead: "RK Logistics publishes comprehensive analysis of hidden costs in semiconductor supply chain fragmentation, quantifying $1T+ in industry-wide investment exposure",
    category: "Research",
    status: "draft",
    date: "Apr 2026 (TBD)",
    body: `FREMONT, CA — [Date TBD] — RK Logistics Group today released "The Hidden Costs of Segmented Supply Chains," a comprehensive research report analyzing the financial impact of supply chain fragmentation in the global semiconductor industry.

Key findings from the 23-page report include:
• Segmented supply chains create 35-65% price increases on components due to coordination overhead, redundant handling, and compliance complexity
• The semiconductor industry faces $1 trillion+ in required investment to restructure supply chains around emerging tariff and geopolitical realities
• Companies using consolidated, FTZ-integrated logistics models achieve 18-30% lower total cost of ownership compared to fragmented multi-vendor approaches
• Duty deferral through Foreign Trade Zone strategies can free $2-4M in working capital per $10M in annual component flow

The report draws on data from RK Logistics' 30-year history serving semiconductor manufacturers including LAM Research, KLA Corporation, and other leading equipment and component suppliers.

"The true cost of supply chain fragmentation is dramatically underestimated," said Joe Fernandez, CEO of RK Logistics Group. "Our research quantifies what many supply chain leaders intuitively know — that every additional vendor, every additional handoff, every additional customs entry adds costs that don't show up on a typical freight invoice."

The full report is available for free download at rklogistics.com/research.`,
    boilerplate: "About RK Logistics Group: [Standard boilerplate]",
    contact: "Media Contact: RK Logistics Marketing, press@rklogistics.com, (510) 555-0100",
    distribution: ["PR Newswire", "Supply Chain Dive", "Semiconductor Engineering", "LinkedIn", "Industry Journals"],
    kpis: { mediaPickups: 0, impressions: "—", websiteReferrals: 0, linkedinShares: 0, openRate: "—" },
    audienceScores: [
      { personaId: "cfo-ev", score: 9.5, feedback: "The 35-65% figure is headline-grabbing. Financial media will pick this up." },
      { personaId: "logistics-analyst", score: 9.2, feedback: "Original research with quantified findings. This is how you establish thought leadership." },
      { personaId: "vp-supply-chain", score: 9.0, feedback: "The working capital figure ($2-4M per $10M) is immediately actionable. Sharing with our CFO." },
    ],
    iterationHistory: [
      { version: 1, score: 7.0, change: "Too promotional, read like a sales brochure not a research announcement" },
      { version: 2, score: 8.5, change: "Reframed as research findings with specific data points per Analyst" },
      { version: 3, score: 9.2, change: "Added working capital quantification and free download emphasis per CFO" },
    ],
    status_detail: "Draft complete. Pending final whitepaper formatting before distribution.",
  },
];

// ──────────────────────────────────────────────────────
// 3. COMPETITOR TOP ENGAGING POSTS ANALYSIS
// ──────────────────────────────────────────────────────

export interface CompetitorPost {
  id: string;
  competitor: string;
  platform: string;
  postDate: string;
  content: string;
  engagement: { likes: number; comments: number; shares: number; impressions: string };
  engagementRate: string;
  mediaType: "image" | "video" | "carousel" | "text" | "document";
  imageUrl: string; // description of the visual
  whyItWorked: string;
  audienceScores: { personaId: string; score: number; feedback: string }[];
}

export const competitorTopPosts: CompetitorPost[] = [
  {
    id: "cp-1",
    competitor: "DHL Supply Chain",
    platform: "LinkedIn",
    postDate: "Feb 28, 2026",
    content: "Our warehouses don't just store products — they power the future. 🔋\n\nInside our new EV battery logistics center in Louisville, KY: 500,000 sqft of climate-controlled, hazmat-certified storage designed specifically for lithium-ion battery packs.\n\n→ 24/7 thermal monitoring\n→ Automated fire suppression\n→ UN3481 certified handling\n→ Real-time SoC tracking\n\nThe EV revolution needs logistics that keep up. We're ready.\n\n#EVBattery #Logistics #SupplyChain #DHL",
    engagement: { likes: 2847, comments: 156, shares: 312, impressions: "485K" },
    engagementRate: "6.8%",
    mediaType: "carousel",
    imageUrl: "4-image carousel: aerial shot of facility, interior with battery racks, monitoring dashboard screenshot, team photo with safety gear",
    whyItWorked: "Facility visual proof + specific capabilities + future-forward narrative. The carousel format let them show scale progressively. Strong emotional hook ('power the future') combined with technical specifics.",
    audienceScores: [
      { personaId: "plant-mgr", score: 9.0, feedback: "The facility photos are what sells me. Seeing the actual thermal monitoring is compelling." },
      { personaId: "vp-supply-chain", score: 8.0, feedback: "Good capabilities showcase but feels corporate. RK can beat this with more authentic tone." },
    ],
  },
  {
    id: "cp-2",
    competitor: "GXO Logistics",
    platform: "LinkedIn",
    postDate: "Mar 5, 2026",
    content: "Data point: Our automated warehouse in Memphis processes 1.2M units/day with 99.97% accuracy.\n\nThat's not a typo. 99.97%.\n\nHere's what automation looks like at scale:\n→ 400 autonomous mobile robots\n→ AI-driven slotting optimization\n→ Real-time digital twin of entire facility\n→ Zero manual touches for 80% of picks\n\nWhen clients ask 'why GXO?' — we show them this.\n\n#Automation #Logistics #Warehousing #Technology",
    engagement: { likes: 3421, comments: 289, shares: 478, impressions: "612K" },
    engagementRate: "6.8%",
    mediaType: "video",
    imageUrl: "45-second time-lapse video: robots moving through warehouse aisles, split-screen with live metrics dashboard, dramatic before/after accuracy comparison",
    whyItWorked: "Led with a jaw-dropping data point (1.2M units, 99.97%). The 'that's not a typo' line adds personality. Video format shows the automation in action — far more persuasive than claims alone.",
    audienceScores: [
      { personaId: "ops-director", score: 9.5, feedback: "The accuracy stat is instantly shareable. Video proof makes it credible." },
      { personaId: "logistics-analyst", score: 8.5, feedback: "The digital twin mention is advanced. Shows technology differentiation." },
    ],
  },
  {
    id: "cp-3",
    competitor: "Ryder",
    platform: "LinkedIn",
    postDate: "Mar 1, 2026",
    content: "Meet Maria. She started at Ryder as a warehouse associate 12 years ago.\n\nToday, she manages a 300,000 sqft distribution center in Dallas serving 3 of the Fortune 100.\n\n'Every day I walk these floors, I remember what it felt like to scan my first pallet. I want every new associate to know: this can be your career, not just a job.'\n\nAt Ryder, 40% of our management team was promoted from within.\n\nThat's not a slogan. That's a culture.\n\n#Careers #Logistics #WomenInLogistics #Leadership",
    engagement: { likes: 5102, comments: 412, shares: 687, impressions: "890K" },
    engagementRate: "7.0%",
    mediaType: "image",
    imageUrl: "Portrait photo of Maria in hi-vis vest standing in warehouse aisle, warm natural lighting, genuine smile, facility visible behind her",
    whyItWorked: "Human-interest story format crushed algorithm engagement. The 40% internal promotion stat adds substance. Authentic employee photo (not stock) with real name and quote builds massive trust. #WomenInLogistics tapped into an active community.",
    audienceScores: [
      { personaId: "plant-mgr", score: 9.5, feedback: "Employee stories like this build incredible trust. The 40% stat is powerful proof of culture." },
      { personaId: "ops-director", score: 9.0, feedback: "This is employer branding done right. The authenticity is what makes it shareable." },
    ],
  },
  {
    id: "cp-4",
    competitor: "CEVA Logistics",
    platform: "LinkedIn",
    postDate: "Feb 15, 2026",
    content: "Red Sea disruptions just added 14 days to our Asia-Europe routes.\n\nBut our clients' delivery windows didn't change.\n\nHow we adapted in 72 hours:\n1️⃣ Rerouted 340 containers via Cape of Good Hope\n2️⃣ Pre-positioned safety stock at 3 European hubs\n3️⃣ Activated charter options for time-critical air freight\n4️⃣ Daily disruption briefings for affected clients\n\nDisruptions test logistics partners. This is what we train for.\n\n#SupplyChain #RedSea #Logistics #Resilience",
    engagement: { likes: 1987, comments: 198, shares: 345, impressions: "378K" },
    engagementRate: "6.7%",
    mediaType: "image",
    imageUrl: "World map infographic showing original vs rerouted shipping lanes, with overlaid stats (14 days added, 340 containers, 72-hour response)",
    whyItWorked: "Timely response to real disruption event. Specific numbers (340 containers, 72 hours, 3 hubs) add credibility. The 'disruptions test partners' framing positions CEVA as crisis-ready without sounding boastful.",
    audienceScores: [
      { personaId: "vp-supply-chain", score: 9.0, feedback: "Real-time crisis response content is gold. Shows operational agility." },
      { personaId: "procurement-dir", score: 8.5, feedback: "This is exactly what I want to see from a logistics partner. Proactive, specific, responsive." },
    ],
  },
  {
    id: "cp-5",
    competitor: "XPO",
    platform: "LinkedIn",
    postDate: "Mar 8, 2026",
    content: "We just processed our 10 billionth package. 📦\n\nA decade ago, we were handling 100M/year.\nToday: 2.1B/year across 750+ locations.\n\nTo our clients: you trusted us with your supply chains. We don't take that lightly.\n\nTo our 38,000 teammates: this milestone is yours.\n\nHere's to the next 10 billion.\n\n#XPO #Logistics #Milestone #ThankYou",
    engagement: { likes: 4256, comments: 356, shares: 523, impressions: "745K" },
    engagementRate: "6.9%",
    mediaType: "video",
    imageUrl: "60-second montage: milestone counter, client testimonial clips, employee celebrations at different facilities, CEO thank you message",
    whyItWorked: "Milestone celebrations humanize massive scale. The gratitude to both clients and employees resonated emotionally. Video montage format showed the human side of a huge operation.",
    audienceScores: [
      { personaId: "ops-director", score: 8.0, feedback: "Scale milestones position them as reliable. The gratitude tone is effective." },
      { personaId: "logistics-analyst", score: 7.5, feedback: "Good brand content. The growth trajectory data (100M→2.1B) tells a compelling story." },
    ],
  },
];

// ──────────────────────────────────────────────────────
// 4. PROPOSED RK CONTENT (inspired by competitor analysis)
// ──────────────────────────────────────────────────────

export interface ProposedRKPost {
  id: string;
  inspiredBy: string; // competitor post ID
  title: string;
  content: string;
  mediaType: "image" | "video" | "carousel" | "document";
  mediaDescription: string;
  rationale: string;
  audienceScores: { personaId: string; score: number; feedback: string }[];
  iteration: number;
  status: "draft" | "approved" | "ready";
}

export const proposedRKPosts: ProposedRKPost[] = [
  {
    id: "rk-prop-1",
    inspiredBy: "cp-1",
    title: "Inside Our FTZ-Activated Fremont Facility",
    content: `Our Fremont facility doesn't just store products. It saves our clients millions in duties.\n\n269,000 sqft of FTZ-activated, climate-controlled warehousing built for semiconductor and EV battery logistics:\n\n→ Activated Foreign Trade Zone status (duty deferral on day 1)\n→ Inverted tariff processing: 25% component rate → 3.4% finished rate\n→ Climate-controlled zones for battery cells (UN3481 certified)\n→ 2,000+ pallets processed daily for clients like LAM Research\n\nDHL built a big EV warehouse. We built a smarter one — where every square foot is optimized to reduce your total cost of ownership.\n\nBook a virtual tour: rklogistics.com/tour\n\n#FTZ #Warehousing #Semiconductor #EVBattery #Logistics`,
    mediaType: "carousel",
    mediaDescription: "5-slide carousel: 1) Aerial facility shot 2) FTZ signage at entrance 3) Climate-controlled battery storage area 4) Forklift team processing semiconductor equipment 5) WMS dashboard showing real-time inventory",
    rationale: "Inspired by DHL's EV facility post (cp-1). RK's advantage: DHL shows scale, we show financial sophistication. The FTZ/inverted tariff angle is something no competitor is talking about. The 'smarter, not bigger' positioning differentiates without directly attacking.",
    audienceScores: [
      { personaId: "cfo-ev", score: 9.5, feedback: "The duty savings framing elevates this above a typical facility showcase. CFO-level content." },
      { personaId: "vp-supply-chain", score: 9.2, feedback: "The comparison positioning is subtle but effective. FTZ is the clear differentiator." },
      { personaId: "plant-mgr", score: 8.8, feedback: "Want to see the video tour. The daily pallet count proves operational capability." },
    ],
    iteration: 3,
    status: "approved",
  },
  {
    id: "rk-prop-2",
    inspiredBy: "cp-2",
    title: "Our WMS Accuracy: The Numbers",
    content: `GXO processes 1.2M units/day with robots.\n\nRK processes 2,000+ pallets/day of semiconductor equipment worth $50M+ per shipment — with zero tolerance for error.\n\nWhen you're handling ASML lithography tools that cost more than most houses, accuracy isn't measured in percentages. It's measured in zeros.\n\n→ 0 damage claims on semiconductor equipment in Q4 2025\n→ 0 customs compliance violations in 2025\n→ 0 temperature excursions in our climate-controlled zones\n→ 99.8% on-time dock-to-stock within 4 hours\n\nVolume is impressive. Precision with high-value goods is exceptional.\n\n#Semiconductor #Logistics #Accuracy #SupplyChain #Warehousing`,
    mediaType: "carousel",
    mediaDescription: "4 slides: 1) ASML equipment being carefully moved 2) Zero-damage scoreboard graphic 3) WMS accuracy dashboard screenshot 4) Climate monitoring display showing all-green status",
    rationale: "Inspired by GXO's automation post (cp-2). RK can't match GXO on volume/robots, but can win on high-value precision handling. The 'zeros' framing turns a potential weakness into a strength. Positions RK as the specialist vs. the generalist.",
    audienceScores: [
      { personaId: "vp-supply-chain", score: 9.5, feedback: "Brilliant repositioning. 'Volume is impressive, precision is exceptional' is a perfect tagline." },
      { personaId: "logistics-analyst", score: 9.0, feedback: "The zero-based metrics are more compelling than percentages for high-value goods." },
      { personaId: "procurement-dir", score: 8.5, feedback: "This helps me justify choosing a smaller 3PL. The value-per-shipment framing is strong." },
    ],
    iteration: 3,
    status: "approved",
  },
  {
    id: "rk-prop-3",
    inspiredBy: "cp-3",
    title: "Meet the People Behind the Pallets",
    content: `Meet Carlos. He started at RK Logistics 8 years ago driving a forklift at our Mowry facility.\n\nToday, he runs LAM Research operations across 3 buildings — managing a team of 45 and processing $2B in semiconductor equipment annually.\n\n"When I started, I didn't know what a Foreign Trade Zone was. Now I explain inverted tariff strategies to Fortune 500 supply chain VPs. RK invested in me before anyone else would."\n\nAt RK, we don't just move products. We build careers.\n\n→ 35% of our management team promoted from within\n→ Average tenure: 6.2 years (3x industry average)\n→ Bilingual operations (English/Spanish) at every facility\n→ Hazmat, forklift, WMS certifications provided at no cost\n\nKnow someone looking for more than a warehouse job? We're hiring.\n\n#Careers #Logistics #Warehousing #FreemontCA #HiringNow`,
    mediaType: "image",
    mediaDescription: "Authentic photo of Carlos (or representative employee) standing in warehouse with LAM Research equipment visible in background, wearing RK-branded hi-vis vest, natural lighting",
    rationale: "Inspired by Ryder's Maria story (cp-3). Employee stories are the highest-engagement format in logistics. RK's advantage: the FTZ expertise angle ('didn't know what an FTZ was') adds uniqueness. The $2B figure anchors the impact. Bilingual operations is a differentiator DHL and Ryder don't emphasize.",
    audienceScores: [
      { personaId: "plant-mgr", score: 9.8, feedback: "This is the content that builds real trust. The career progression story with specific numbers is perfect." },
      { personaId: "ops-director", score: 9.5, feedback: "The tenure stat (6.2 years, 3x industry) is incredibly powerful for retention-conscious operations leaders." },
      { personaId: "vp-supply-chain", score: 8.5, feedback: "Human stories + operational data = the perfect combination. Would share with my team." },
    ],
    iteration: 3,
    status: "approved",
  },
  {
    id: "rk-prop-4",
    inspiredBy: "cp-4",
    title: "How We Navigated Red Sea Disruptions for Semiconductor Clients",
    content: `When Red Sea disruptions hit, our semiconductor clients' production schedules didn't change.\n\nBecause we'd already adapted.\n\nTimeline:\n📅 Day 1: Risk alert issued to all semiconductor clients\n📅 Day 3: Safety stock levels increased 25% at FTZ facilities\n📅 Day 5: Duty deferral activated on extended-transit inventory (saving clients $180K+ in premature duty payments)\n📅 Day 7: Weekly disruption briefings launched for C-suite stakeholders\n\nWhat CEVA did for containers, we did for $50M semiconductor equipment — with the added layer of FTZ financial optimization.\n\nDisruptions don't just test logistics. They test whether your 3PL understands your business.\n\n#RedSea #Semiconductor #SupplyChain #FTZ #RiskManagement`,
    mediaType: "carousel",
    mediaDescription: "4 slides: 1) Timeline infographic 2) Safety stock increase visualization 3) Duty savings calculation 4) Client communication dashboard screenshot",
    rationale: "Inspired by CEVA's Red Sea post (cp-4). RK adds the FTZ/financial angle that CEVA completely missed. The 'what CEVA did for containers, we did for $50M equipment' line positions RK as the premium, specialized alternative. The $180K savings figure gives the financial proof CFOs want.",
    audienceScores: [
      { personaId: "cfo-ev", score: 9.5, feedback: "The $180K duty savings during disruption is a completely unique angle. No competitor talks about this." },
      { personaId: "vp-supply-chain", score: 9.2, feedback: "Proactive risk management + financial optimization. This is tier-1 3PL behavior." },
      { personaId: "procurement-dir", score: 8.8, feedback: "The timeline format shows real crisis management capability. Very persuasive." },
    ],
    iteration: 3,
    status: "approved",
  },
  {
    id: "rk-prop-5",
    inspiredBy: "cp-5",
    title: "30 Years of Semiconductor Logistics Excellence",
    content: `1996: RK Logistics opens its first 50,000 sqft warehouse in Fremont, CA.\n\n2026: 13 facilities. 5 states. 1.78M sqft. $105M in combined revenue.\n\n30 years of firsts:\n🏭 First 3PL in California to activate FTZ for semiconductor components\n🔋 First regional 3PL to offer EV battery hazmat logistics\n📊 First logistics company to publish a sector-specific supply chain index (DHTSCI)\n🤝 Supporting 3 of the world's top 10 semiconductor equipment manufacturers\n\nTo our clients who trusted a small Fremont warehouse three decades ago: thank you.\nTo our 800+ team members who make this possible: this is your milestone.\n\nHere's to 30 more years of moving technology forward.\n\n#RKLogistics #30Years #Semiconductor #Logistics #FreemontCA`,
    mediaType: "video",
    mediaDescription: "90-second montage: archival photos from 1996, facility expansion timeline, client logo carousel, employee celebration footage, drone shots of current facilities, CEO closing message",
    rationale: "Inspired by XPO's 10B package milestone (cp-5). RK's 30-year anniversary is the perfect hook. The 'firsts' format showcases unique achievements without bragging about volume. The gratitude messaging worked for XPO (4.2K likes) and will work even better for a smaller, more personal company.",
    audienceScores: [
      { personaId: "ops-director", score: 9.0, feedback: "30 years of longevity in 3PL is remarkable. The 'firsts' format is compelling." },
      { personaId: "vp-supply-chain", score: 8.8, feedback: "The milestone plus gratitude combination is emotionally resonant without being cheesy." },
      { personaId: "plant-mgr", score: 8.5, feedback: "The 1996-to-now story builds trust. Shows stability in a volatile industry." },
    ],
    iteration: 2,
    status: "approved",
  },
];
