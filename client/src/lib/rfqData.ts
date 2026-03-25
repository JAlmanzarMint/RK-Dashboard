// ═══════════════════════════════════════════════════════
// RFQ Intelligence Center — Data
// ═══════════════════════════════════════════════════════

export type RfqStatus = "Won" | "Lost" | "Pending" | "Draft" | "Submitted" | "Declined";
export type ServiceType = "Contract Warehousing" | "Distribution" | "FTZ Operations" | "Transportation" | "Value-Added Services" | "Dedicated Fleet" | "MFG Support" | "E-Commerce Fulfillment";
export type Industry = "Semi / AI" | "Automotive / EV" | "Battery / Energy" | "Electronics" | "Aerospace / Defense" | "Consumer / Retail" | "Medical Devices" | "Solar / Renewables";

export interface HistoricalRfq {
  id: string;
  customer: string;
  industry: Industry;
  serviceType: ServiceType;
  location: string;
  sqft: number;
  estAnnualRev: number;
  submittedDate: string;
  decisionDate: string;
  status: RfqStatus;
  owner: string;
  winFactors: string[];
  lossFactors: string[];
  competitorsBeat: string[];
  competitorsLostTo: string[];
  proposedMargin: number;
  actualMargin: number | null;
  proposedPrice: number; // per sqft/mo
  responseTimeDays: number;
  clientFeedback: string;
  keyDifferentiators: string[];
}

export interface SyntheticAudience {
  id: string;
  name: string;
  industry: Industry;
  companySize: "Enterprise" | "Mid-Market" | "Growth";
  decisionMakers: { role: string; priority: string; weight: number }[];
  painPoints: string[];
  evaluationCriteria: { criterion: string; weight: number; rkScore: number }[];
  preferredTerms: string[];
  dealBreakers: string[];
  budgetSensitivity: "Low" | "Medium" | "High";
  timelinePressure: "Low" | "Medium" | "High";
  overallWinProbability: number;
}

export interface AudienceTestResult {
  audienceId: string;
  audienceName: string;
  overallScore: number;
  criteriaScores: { criterion: string; score: number; maxScore: number; feedback: string }[];
  strengthsHighlighted: string[];
  weaknessesIdentified: string[];
  recommendedAdjustments: string[];
  winProbability: number;
}

export interface RfqDraft {
  rfqId: string;
  customer: string;
  generatedDate: string;
  executiveSummary: string;
  proposedSolution: string[];
  pricingModel: { item: string; unit: string; rate: number; monthly: number }[];
  totalMonthlyRate: number;
  totalAnnualRate: number;
  targetMargin: number;
  differentiators: string[];
  riskMitigations: string[];
  references: { customer: string; service: string; duration: string }[];
  audienceTestResults: AudienceTestResult[];
  confidenceScore: number;
  matchedHistoricalRfqs: string[];
}

export interface PricingBenchmark {
  serviceType: ServiceType;
  location: string;
  rkCostPsf: number;
  rkPricePsf: number;
  marketLowPsf: number;
  marketHighPsf: number;
  rkMargin: number;
  targetMargin: number;
  competitivePosition: "Below Market" | "At Market" | "Above Market" | "Premium";
}

// ─── Historical RFQ Database ───

export const historicalRfqs: HistoricalRfq[] = [
  {
    id: "RFQ-001", customer: "LAM Research", industry: "Semi / AI", serviceType: "Contract Warehousing",
    location: "Goodyear, AZ", sqft: 270000, estAnnualRev: 8000000,
    submittedDate: "2025-12-15", decisionDate: "2026-02-20", status: "Won", owner: "Peter O'Donnell",
    winFactors: ["Existing LAM relationship (31% of revenue)", "Demonstrated 99.2% order accuracy", "Cleanroom-adjacent capabilities", "FTZ expertise"],
    lossFactors: [],
    competitorsBeat: ["XPO Logistics", "DHL Supply Chain"],
    competitorsLostTo: [],
    proposedMargin: 28, actualMargin: 32,
    proposedPrice: 2.47, responseTimeDays: 14,
    clientFeedback: "RK's deep understanding of semiconductor handling and existing proven track record with LAM were decisive.",
    keyDifferentiators: ["99.2% order accuracy track record", "Semiconductor-certified handling", "Existing LAM relationship", "FTZ operations expertise"],
  },
  {
    id: "RFQ-002", customer: "KLA Corporation", industry: "Semi / AI", serviceType: "Dedicated Fleet",
    location: "Fremont, CA", sqft: 0, estAnnualRev: 2000000,
    submittedDate: "2025-11-01", decisionDate: "2026-01-15", status: "Won", owner: "Michael Powell",
    winFactors: ["Proximity to KLA campus", "FTZ bonded transport expertise", "Existing relationship", "Competitive pricing"],
    lossFactors: [],
    competitorsBeat: ["Werner Enterprises"],
    competitorsLostTo: [],
    proposedMargin: 22, actualMargin: 25,
    proposedPrice: 0, responseTimeDays: 21,
    clientFeedback: "RK's bonded transport capabilities and campus proximity made this a natural fit.",
    keyDifferentiators: ["Bonded transport certification", "Campus proximity", "FTZ compliance expertise"],
  },
  {
    id: "RFQ-003", customer: "Panasonic", industry: "Battery / Energy", serviceType: "Distribution",
    location: "Patterson Pass, CA", sqft: 60000, estAnnualRev: 2000000,
    submittedDate: "2026-01-10", decisionDate: "2026-03-01", status: "Won", owner: "Brian Saucier",
    winFactors: ["Available capacity at Patterson", "Battery handling certifications", "Competitive pricing", "Fast ramp timeline"],
    lossFactors: [],
    competitorsBeat: ["Ryder", "NFI Industries"],
    competitorsLostTo: [],
    proposedMargin: 25, actualMargin: 22,
    proposedPrice: 2.78, responseTimeDays: 10,
    clientFeedback: "Quick response time and ability to start within 30 days was critical for Panasonic's timeline.",
    keyDifferentiators: ["Rapid startup capability", "Battery/hazmat handling", "Existing EV ecosystem experience"],
  },
  {
    id: "RFQ-004", customer: "Panasonic", industry: "Battery / Energy", serviceType: "Distribution",
    location: "So Cal / Savannah, GA", sqft: 217000, estAnnualRev: 7400000,
    submittedDate: "2026-03-06", decisionDate: "", status: "Submitted", owner: "Brian Saucier",
    winFactors: ["Proven Panasonic relationship (Patterson)", "Battery handling expertise", "Multi-site capability"],
    lossFactors: [],
    competitorsBeat: [],
    competitorsLostTo: [],
    proposedMargin: 26, actualMargin: null,
    proposedPrice: 2.84, responseTimeDays: 12,
    clientFeedback: "",
    keyDifferentiators: ["Existing Panasonic reference", "EV/Battery ecosystem", "Multi-geography capability"],
  },
  {
    id: "RFQ-005", customer: "Tesla", industry: "Automotive / EV", serviceType: "Distribution",
    location: "San Bernardino, CA", sqft: 320000, estAnnualRev: 8000000,
    submittedDate: "2025-09-15", decisionDate: "", status: "Pending", owner: "Michael Powell",
    winFactors: ["Existing Tesla relationship across 4 facilities", "High-volume parts distribution experience"],
    lossFactors: [],
    competitorsBeat: [],
    competitorsLostTo: [],
    proposedMargin: 20, actualMargin: null,
    proposedPrice: 2.08, responseTimeDays: 18,
    clientFeedback: "Decision pushed to Q2 2026. Tesla focusing on AZ operations first.",
    keyDifferentiators: ["Multi-site Tesla experience", "EV parts expertise", "Scale capability (320K sqft)"],
  },
  {
    id: "RFQ-006", customer: "Lucid Motors", industry: "Automotive / EV", serviceType: "MFG Support",
    location: "Tempe, AZ", sqft: 500000, estAnnualRev: 9000000,
    submittedDate: "2026-02-01", decisionDate: "", status: "Pending", owner: "Brian Saucier",
    winFactors: ["Existing Lucid relationship (Whitmore Lake)", "IB sequencing expertise", "AZ market presence via Hardy"],
    lossFactors: [],
    competitorsBeat: [],
    competitorsLostTo: [],
    proposedMargin: 24, actualMargin: null,
    proposedPrice: 1.50, responseTimeDays: 21,
    clientFeedback: "Facility selection and solution design phase. Shortlisted.",
    keyDifferentiators: ["Manufacturing support experience", "Sequencing to MFG line", "AZ operations (Hardy)"],
  },
  {
    id: "RFQ-007", customer: "Corning", industry: "Electronics", serviceType: "Transportation",
    location: "Tempe, AZ", sqft: 75000, estAnnualRev: 4000000,
    submittedDate: "2025-11-20", decisionDate: "", status: "Pending", owner: "Peter O'Donnell",
    winFactors: ["Existing Corning shuttle operations at Hardy", "AZ presence", "Warehouse + transport bundle"],
    lossFactors: [],
    competitorsBeat: [],
    competitorsLostTo: [],
    proposedMargin: 30, actualMargin: null,
    proposedPrice: 4.44, responseTimeDays: 15,
    clientFeedback: "Pending customer feedback on shuttle + warehouse expansion proposal.",
    keyDifferentiators: ["Integrated warehouse + shuttle solution", "Existing Corning relationship", "AZ operations"],
  },
  {
    id: "RFQ-008", customer: "Marvell Technology", industry: "Semi / AI", serviceType: "FTZ Operations",
    location: "Fremont, CA", sqft: 40000, estAnnualRev: 2000000,
    submittedDate: "2026-01-20", decisionDate: "", status: "Pending", owner: "Brian Saucier",
    winFactors: ["FTZ expertise", "Fremont location", "Semiconductor handling"],
    lossFactors: [],
    competitorsBeat: [],
    competitorsLostTo: [],
    proposedMargin: 32, actualMargin: null,
    proposedPrice: 4.17, responseTimeDays: 8,
    clientFeedback: "Consulting phase. Target close May 2026.",
    keyDifferentiators: ["FTZ campus support model", "Semiconductor expertise", "Fremont campus proximity"],
  },
  // Lost RFQs — critical for learning
  {
    id: "RFQ-L01", customer: "Samsung SDI", industry: "Battery / Energy", serviceType: "Contract Warehousing",
    location: "Houston, TX", sqft: 150000, estAnnualRev: 4500000,
    submittedDate: "2025-06-10", decisionDate: "2025-09-01", status: "Lost", owner: "Justin Graham",
    winFactors: [],
    lossFactors: ["No TX presence at time of bid", "Higher pricing vs. local providers", "Slower response time (28 days)", "Lacked battery-specific certifications for lithium-ion"],
    competitorsBeat: [],
    competitorsLostTo: ["Penske Logistics"],
    proposedMargin: 30, actualMargin: null,
    proposedPrice: 2.50, responseTimeDays: 28,
    clientFeedback: "RK lacked local presence and specific lithium-ion handling certifications. Pricing was 15% above winner.",
    keyDifferentiators: [],
  },
  {
    id: "RFQ-L02", customer: "Applied Materials", industry: "Semi / AI", serviceType: "Contract Warehousing",
    location: "Austin, TX", sqft: 200000, estAnnualRev: 6000000,
    submittedDate: "2025-04-15", decisionDate: "2025-07-20", status: "Lost", owner: "Michael Powell",
    winFactors: [],
    lossFactors: ["No Austin facility", "Incumbent (Geodis) offered 5-year rate lock", "RK couldn't match headcount commitment timeline", "Lacked cleanroom certification in TX"],
    competitorsBeat: [],
    competitorsLostTo: ["Geodis"],
    proposedMargin: 26, actualMargin: null,
    proposedPrice: 2.50, responseTimeDays: 22,
    clientFeedback: "Strong proposal but geographic gap was disqualifying. Incumbent advantage with rate lock sealed it.",
    keyDifferentiators: [],
  },
  {
    id: "RFQ-L03", customer: "Rivian", industry: "Automotive / EV", serviceType: "Distribution",
    location: "Normal, IL", sqft: 180000, estAnnualRev: 5000000,
    submittedDate: "2025-08-01", decisionDate: "2025-11-15", status: "Lost", owner: "Justin Graham",
    winFactors: [],
    lossFactors: ["No Midwest facility (IL)", "Rivian preferred provider with existing footprint", "BD team turnover during RFQ process (Graham left)"],
    competitorsBeat: [],
    competitorsLostTo: ["Kenco Logistics"],
    proposedMargin: 24, actualMargin: null,
    proposedPrice: 1.85, responseTimeDays: 25,
    clientFeedback: "Proposal quality was good but geographic and continuity concerns. Contact changed mid-process.",
    keyDifferentiators: [],
  },
  {
    id: "RFQ-L04", customer: "Bloom Energy", industry: "Solar / Renewables", serviceType: "Contract Warehousing",
    location: "Fremont, CA", sqft: 80000, estAnnualRev: 2400000,
    submittedDate: "2025-10-01", decisionDate: "2026-01-10", status: "Lost", owner: "Brian Saucier",
    winFactors: [],
    lossFactors: ["Pricing 8% above winner", "Competitor offered dedicated account manager", "RK vacancy was at wrong facility (Kato vs. closer location)"],
    competitorsBeat: [],
    competitorsLostTo: ["Port Logistics Group"],
    proposedMargin: 35, actualMargin: null,
    proposedPrice: 2.50, responseTimeDays: 14,
    clientFeedback: "Proposal was strong technically. Lost on price and the competitor's dedicated account management model.",
    keyDifferentiators: [],
  },
  // More wins for pattern analysis
  {
    id: "RFQ-W05", customer: "Franklin Electric", industry: "Electronics", serviceType: "Contract Warehousing",
    location: "Patterson Pass, CA", sqft: 15000, estAnnualRev: 500000,
    submittedDate: "2026-02-15", decisionDate: "2026-03-10", status: "Won", owner: "Brian Saucier",
    winFactors: ["Available capacity", "Competitive pricing", "Quick startup (30 days)", "Flexible contract terms"],
    lossFactors: [],
    competitorsBeat: ["Local provider"],
    competitorsLostTo: [],
    proposedMargin: 28, actualMargin: 30,
    proposedPrice: 2.78, responseTimeDays: 7,
    clientFeedback: "Fast response, flexible terms, and professional proposal. Easy decision.",
    keyDifferentiators: ["Speed to respond", "Flexible month-to-month option", "Existing infrastructure"],
  },
  {
    id: "RFQ-W06", customer: "FoxConn / Ingrasys", industry: "Electronics", serviceType: "Contract Warehousing",
    location: "Hayman, CA", sqft: 25000, estAnnualRev: 1500000,
    submittedDate: "2026-01-05", decisionDate: "", status: "Pending", owner: "Brian Saucier",
    winFactors: ["Fremont Bay Area location", "EV component handling experience"],
    lossFactors: [],
    competitorsBeat: [],
    competitorsLostTo: [],
    proposedMargin: 26, actualMargin: null,
    proposedPrice: 5.00, responseTimeDays: 12,
    clientFeedback: "In negotiation. Target close April 2026.",
    keyDifferentiators: ["Bay Area proximity to Foxconn operations", "Component handling expertise"],
  },
  // Active pipeline items as draft/pending RFQs
  {
    id: "RFQ-P01", customer: "Tesla", industry: "Automotive / EV", serviceType: "Contract Warehousing",
    location: "TBD", sqft: 0, estAnnualRev: 0,
    submittedDate: "", decisionDate: "", status: "Draft", owner: "Michael Powell",
    winFactors: [],
    lossFactors: [],
    competitorsBeat: [],
    competitorsLostTo: [],
    proposedMargin: 0, actualMargin: null,
    proposedPrice: 0, responseTimeDays: 0,
    clientFeedback: "Samsung Chip Storage RFI completed. RK is a finalist.",
    keyDifferentiators: [],
  },
  {
    id: "RFQ-P02", customer: "KLA Corporation", industry: "Semi / AI", serviceType: "MFG Support",
    location: "Fremont, CA", sqft: 0, estAnnualRev: 0,
    submittedDate: "", decisionDate: "", status: "Draft", owner: "Michael Powell",
    winFactors: [],
    lossFactors: [],
    competitorsBeat: [],
    competitorsLostTo: [],
    proposedMargin: 0, actualMargin: null,
    proposedPrice: 0, responseTimeDays: 0,
    clientFeedback: "Campus MFG Support. Current Head Count is 60 people & FTZ. Process mapping has begun.",
    keyDifferentiators: [],
  },
];

// ─── Win/Loss Analytics (derived) ───

export const winLossAnalytics = {
  totalRfqs: 16,
  won: 5,
  lost: 4,
  pending: 5,
  draft: 2,
  winRate: 56, // of decided: 5/(5+4)
  avgResponseTimeDays: { won: 12.4, lost: 22.3, all: 16.8 },
  avgProposedMargin: { won: 25.8, lost: 28.8 },
  topWinFactors: [
    { factor: "Existing customer relationship", count: 5, winPct: 100 },
    { factor: "Fast response time (<14 days)", count: 4, winPct: 80 },
    { factor: "Semiconductor/FTZ expertise", count: 3, winPct: 100 },
    { factor: "Competitive pricing", count: 3, winPct: 75 },
    { factor: "Available capacity", count: 3, winPct: 67 },
    { factor: "Battery/EV handling", count: 2, winPct: 100 },
  ],
  topLossFactors: [
    { factor: "No local facility/geographic gap", count: 3, lossPct: 75 },
    { factor: "Pricing above market (>8%)", count: 3, lossPct: 75 },
    { factor: "Slow response time (>21 days)", count: 3, lossPct: 75 },
    { factor: "BD team turnover during process", count: 1, lossPct: 25 },
    { factor: "Incumbent advantage", count: 2, lossPct: 50 },
    { factor: "Missing certifications", count: 2, lossPct: 50 },
  ],
  revenueWon: 12500000,
  revenueLost: 17900000,
  revenuePending: 33900000,
  avgDealSize: { won: 2500000, lost: 4475000, pending: 6780000 },
  conversionByIndustry: [
    { industry: "Semi / AI", won: 2, lost: 1, pending: 2, winRate: 67 },
    { industry: "Automotive / EV", won: 0, lost: 1, pending: 2, winRate: 0 },
    { industry: "Battery / Energy", won: 1, lost: 1, pending: 1, winRate: 50 },
    { industry: "Electronics", won: 2, lost: 0, pending: 1, winRate: 100 },
    { industry: "Solar / Renewables", won: 0, lost: 1, pending: 0, winRate: 0 },
  ],
};

// ─── Synthetic Audience Profiles ───

export const syntheticAudiences: SyntheticAudience[] = [
  {
    id: "SA-SEMI", name: "Semiconductor / AI Chipmaker",
    industry: "Semi / AI", companySize: "Enterprise",
    decisionMakers: [
      { role: "VP Supply Chain", priority: "Cost efficiency & compliance", weight: 35 },
      { role: "Director of Operations", priority: "Reliability & accuracy", weight: 30 },
      { role: "Procurement Manager", priority: "Pricing & contract terms", weight: 20 },
      { role: "Quality Director", priority: "Cleanroom standards & handling", weight: 15 },
    ],
    painPoints: [
      "Semiconductor tools require cleanroom-adjacent handling — damage = $100K+ per unit",
      "FTZ compliance is mandatory — any lapse triggers customs penalties",
      "Cycle time pressure — tools needed on manufacturing floor within strict SLAs",
      "Inventory accuracy must be >99.5% — serial number tracking is non-negotiable",
    ],
    evaluationCriteria: [
      { criterion: "Handling Expertise (semi-certified)", weight: 25, rkScore: 95 },
      { criterion: "FTZ / Customs Compliance", weight: 20, rkScore: 92 },
      { criterion: "Order Accuracy Track Record", weight: 20, rkScore: 96 },
      { criterion: "Pricing Competitiveness", weight: 15, rkScore: 78 },
      { criterion: "Geographic Proximity", weight: 10, rkScore: 85 },
      { criterion: "Scalability / Ramp Speed", weight: 10, rkScore: 82 },
    ],
    preferredTerms: ["3-5 year contracts", "Gain-share on efficiency improvements", "Quarterly business reviews"],
    dealBreakers: ["No cleanroom-adjacent capability", "No FTZ license", "Order accuracy below 99%", "No semiconductor handling experience"],
    budgetSensitivity: "Medium", timelinePressure: "High",
    overallWinProbability: 78,
  },
  {
    id: "SA-EV", name: "EV / Automotive OEM",
    industry: "Automotive / EV", companySize: "Enterprise",
    decisionMakers: [
      { role: "VP Logistics", priority: "Scale and flexibility", weight: 30 },
      { role: "Plant Manager", priority: "JIT delivery reliability", weight: 25 },
      { role: "Procurement Director", priority: "Total cost of ownership", weight: 25 },
      { role: "Sustainability Officer", priority: "Green logistics certifications", weight: 20 },
    ],
    painPoints: [
      "Volume volatility — production ramps up/down quickly with EV demand cycles",
      "JIT sequencing failures shut down the production line ($500K+/hour downtime)",
      "Battery components require hazmat handling and climate-controlled storage",
      "Multiple SKUs with high velocity — need sophisticated WMS integration",
    ],
    evaluationCriteria: [
      { criterion: "Volume Scalability", weight: 25, rkScore: 75 },
      { criterion: "JIT / Sequencing Capability", weight: 20, rkScore: 80 },
      { criterion: "Hazmat / Battery Handling", weight: 20, rkScore: 85 },
      { criterion: "Pricing / TCO", weight: 20, rkScore: 70 },
      { criterion: "Multi-Site Capability", weight: 10, rkScore: 72 },
      { criterion: "Technology / WMS Integration", weight: 5, rkScore: 68 },
    ],
    preferredTerms: ["Variable pricing tied to volume", "90-day ramp clauses", "Shared savings models"],
    dealBreakers: ["No battery handling certification", "Single-site only", "No JIT experience", "No 24/7 operations"],
    budgetSensitivity: "High", timelinePressure: "High",
    overallWinProbability: 58,
  },
  {
    id: "SA-BATT", name: "Battery / Energy Storage Company",
    industry: "Battery / Energy", companySize: "Mid-Market",
    decisionMakers: [
      { role: "Operations Director", priority: "Safety compliance & handling", weight: 35 },
      { role: "Supply Chain Manager", priority: "Speed to operational", weight: 30 },
      { role: "Finance Controller", priority: "Cost predictability", weight: 20 },
      { role: "EHS Manager", priority: "Hazmat certifications", weight: 15 },
    ],
    painPoints: [
      "Lithium-ion storage requires strict fire suppression and temperature controls",
      "Rapid company growth — need partners who can scale quickly",
      "Regulatory landscape is evolving — need compliance experts",
      "Many 3PLs decline battery storage due to insurance/risk concerns",
    ],
    evaluationCriteria: [
      { criterion: "Hazmat / Battery Certifications", weight: 30, rkScore: 82 },
      { criterion: "Rapid Startup Capability", weight: 25, rkScore: 90 },
      { criterion: "Safety Infrastructure", weight: 20, rkScore: 78 },
      { criterion: "Pricing Flexibility", weight: 15, rkScore: 80 },
      { criterion: "Multi-Site Potential", weight: 10, rkScore: 70 },
    ],
    preferredTerms: ["1-3 year with renewal options", "Monthly volume adjustments", "Shared risk on compliance"],
    dealBreakers: ["No hazmat handling", "No fire suppression systems", "No lithium-ion experience"],
    budgetSensitivity: "Medium", timelinePressure: "High",
    overallWinProbability: 68,
  },
  {
    id: "SA-ELEC", name: "Electronics / Components Manufacturer",
    industry: "Electronics", companySize: "Mid-Market",
    decisionMakers: [
      { role: "Logistics Manager", priority: "Reliability and accuracy", weight: 35 },
      { role: "Procurement Manager", priority: "Cost and flexibility", weight: 30 },
      { role: "Operations VP", priority: "Scalability", weight: 20 },
      { role: "IT Director", priority: "WMS/ERP integration", weight: 15 },
    ],
    painPoints: [
      "Small component handling requires precision picking",
      "Often need value-added services (kitting, labeling, packaging)",
      "Seasonal demand fluctuations require flexible space",
      "ESD-sensitive components need proper handling protocols",
    ],
    evaluationCriteria: [
      { criterion: "Value-Added Services", weight: 25, rkScore: 88 },
      { criterion: "Picking Accuracy", weight: 25, rkScore: 90 },
      { criterion: "Flexible Space Options", weight: 20, rkScore: 85 },
      { criterion: "Pricing", weight: 20, rkScore: 82 },
      { criterion: "Technology Integration", weight: 10, rkScore: 72 },
    ],
    preferredTerms: ["Flexible month-to-month with term discount", "Per-unit VAS pricing", "Quarterly volume reviews"],
    dealBreakers: ["No VAS capability", "Minimum commitment too high", "No Bay Area presence"],
    budgetSensitivity: "High", timelinePressure: "Medium",
    overallWinProbability: 82,
  },
  {
    id: "SA-AERO", name: "Aerospace / Defense Contractor",
    industry: "Aerospace / Defense", companySize: "Enterprise",
    decisionMakers: [
      { role: "Program Manager", priority: "Security & compliance", weight: 30 },
      { role: "Supply Chain Director", priority: "Traceability & documentation", weight: 25 },
      { role: "Contracts Officer", priority: "ITAR/EAR compliance", weight: 25 },
      { role: "Quality Assurance", priority: "AS9100 standards", weight: 20 },
    ],
    painPoints: [
      "ITAR/EAR compliance is mandatory — non-compliance = federal penalties",
      "Full lot traceability and chain of custody documentation required",
      "Long qualification cycles (6-12 months) make switching costly",
      "Need secure, access-controlled facilities",
    ],
    evaluationCriteria: [
      { criterion: "Security & Access Controls", weight: 30, rkScore: 65 },
      { criterion: "ITAR/EAR Compliance", weight: 25, rkScore: 55 },
      { criterion: "Traceability Systems", weight: 20, rkScore: 70 },
      { criterion: "Documentation Quality", weight: 15, rkScore: 75 },
      { criterion: "Pricing", weight: 10, rkScore: 78 },
    ],
    preferredTerms: ["5+ year contracts", "Security clearance requirements", "Quarterly compliance audits"],
    dealBreakers: ["No ITAR registration", "No secured facility", "No lot traceability"],
    budgetSensitivity: "Low", timelinePressure: "Low",
    overallWinProbability: 35,
  },
];

// ─── Auto-Draft Templates (for the generator) ───

export const draftTemplates = {
  executiveSummaryTemplate: `RK Logistics Group, a leading contract warehousing and logistics provider headquartered in Fremont, CA, is pleased to submit this proposal for {customer}'s {serviceType} requirements in {location}. With {sqft} sq ft of dedicated capacity, our solution leverages {yearExperience}+ years of {industryExpertise} expertise, a proven track record of 99.2% order accuracy, and deep operational capability across {facilityCount} facilities totaling 1.66M sq ft.`,
  
  solutionSections: [
    "Dedicated warehouse space with climate control and fire suppression",
    "WMS integration with customer ERP (SAP, Oracle, NetSuite supported)",
    "Trained workforce with industry-specific certifications",
    "24/7 operations capability with dedicated shift management",
    "Quarterly business reviews and continuous improvement programs",
    "Comprehensive safety and compliance program",
  ],
};

// ─── Pricing Intelligence ───

export const pricingBenchmarks: PricingBenchmark[] = [
  { serviceType: "Contract Warehousing", location: "Bay Area, CA", rkCostPsf: 1.82, rkPricePsf: 2.78, marketLowPsf: 2.20, marketHighPsf: 4.50, rkMargin: 34.5, targetMargin: 28, competitivePosition: "At Market" },
  { serviceType: "Contract Warehousing", location: "Phoenix, AZ", rkCostPsf: 0.61, rkPricePsf: 1.50, marketLowPsf: 1.10, marketHighPsf: 2.80, rkMargin: 59.3, targetMargin: 30, competitivePosition: "At Market" },
  { serviceType: "Contract Warehousing", location: "Kyle, TX", rkCostPsf: 1.21, rkPricePsf: 2.08, marketLowPsf: 1.50, marketHighPsf: 3.20, rkMargin: 41.8, targetMargin: 28, competitivePosition: "At Market" },
  { serviceType: "Contract Warehousing", location: "Whitmore Lake, MI", rkCostPsf: 1.59, rkPricePsf: 2.65, marketLowPsf: 1.80, marketHighPsf: 3.50, rkMargin: 40.0, targetMargin: 28, competitivePosition: "At Market" },
  { serviceType: "FTZ Operations", location: "Bay Area, CA", rkCostPsf: 2.10, rkPricePsf: 4.17, marketLowPsf: 3.50, marketHighPsf: 6.00, rkMargin: 49.6, targetMargin: 35, competitivePosition: "Below Market" },
  { serviceType: "Value-Added Services", location: "Bay Area, CA", rkCostPsf: 2.50, rkPricePsf: 4.77, marketLowPsf: 3.80, marketHighPsf: 7.00, rkMargin: 47.6, targetMargin: 35, competitivePosition: "At Market" },
  { serviceType: "Distribution", location: "Bay Area, CA", rkCostPsf: 1.60, rkPricePsf: 2.50, marketLowPsf: 2.00, marketHighPsf: 4.00, rkMargin: 36.0, targetMargin: 25, competitivePosition: "Below Market" },
  { serviceType: "Distribution", location: "So Cal", rkCostPsf: 1.40, rkPricePsf: 2.30, marketLowPsf: 1.80, marketHighPsf: 3.50, rkMargin: 39.1, targetMargin: 25, competitivePosition: "At Market" },
  { serviceType: "MFG Support", location: "AZ / TX", rkCostPsf: 0.80, rkPricePsf: 1.50, marketLowPsf: 1.20, marketHighPsf: 2.50, rkMargin: 46.7, targetMargin: 30, competitivePosition: "At Market" },
  { serviceType: "Transportation", location: "National", rkCostPsf: 0, rkPricePsf: 0, marketLowPsf: 0, marketHighPsf: 0, rkMargin: 24.3, targetMargin: 20, competitivePosition: "At Market" },
];

// ─── Sample Generated Draft ───

export const sampleDraft: RfqDraft = {
  rfqId: "RFQ-004",
  customer: "Panasonic",
  generatedDate: "2026-03-06",
  executiveSummary: "RK Logistics Group, a leading contract warehousing and logistics provider headquartered in Fremont, CA, is pleased to submit this proposal for Panasonic's Distribution Center operations in Southern California and Savannah, GA. With 217,000 sq ft of dedicated capacity across two sites, our solution leverages 20+ years of battery/energy sector expertise, a proven track record demonstrated by our existing Panasonic Patterson Pass operation, and deep operational capability across 12 facilities totaling 1.66M sq ft.",
  proposedSolution: [
    "Dual-site distribution center operations (So Cal 150K sqft + Savannah 67K sqft)",
    "Battery-certified handling with UN3481/UN3480 compliance",
    "Climate-controlled storage with advanced fire suppression (FM-200 system)",
    "WMS integration with Panasonic SAP environment (proven at Patterson)",
    "Dedicated site management with existing Panasonic-trained personnel",
    "24/7 operations with dedicated shift leads at both locations",
    "Quarterly business reviews with KPI dashboards and continuous improvement",
    "Hazmat-certified workforce with annual recertification program",
  ],
  pricingModel: [
    { item: "Base Warehousing", unit: "per sqft/mo", rate: 1.85, monthly: 401450 },
    { item: "Labor (dedicated crew)", unit: "per sqft/mo", rate: 0.55, monthly: 119350 },
    { item: "Inbound Processing", unit: "per pallet", rate: 8.50, monthly: 42500 },
    { item: "Outbound Processing", unit: "per order", rate: 12.00, monthly: 48000 },
    { item: "Value-Added Services", unit: "per unit", rate: 3.25, monthly: 6500 },
  ],
  totalMonthlyRate: 617800,
  totalAnnualRate: 7413600,
  targetMargin: 26,
  differentiators: [
    "Proven Panasonic relationship — Patterson Pass operation running at 22% margin with rapid 30-day startup",
    "Battery/hazmat handling expertise across EV ecosystem (Tesla, Lucid, CATL, Delta)",
    "Multi-geography capability — CA, AZ, TX, MI operations demonstrate scalable model",
    "99.2% order accuracy benchmark from LAM Research operations (transferable methodology)",
    "Fastest response in category — 10-day RFQ turnaround vs. industry average 21 days",
  ],
  riskMitigations: [
    "Savannah GA requires new facility — mitigated by partnering with local real estate broker, 3 sites identified",
    "No existing GA workforce — plan to hire site manager 60 days pre-launch, leverage RK training programs",
    "Battery regulations vary by state — EHS team completing GA compliance audit by March 20",
    "Insurance costs higher for lithium-ion storage — already secured quote from current carrier at 12% premium",
  ],
  references: [
    { customer: "Panasonic (Patterson Pass)", service: "Distribution — 60K sqft battery components", duration: "Active since March 2026" },
    { customer: "LAM Research (Mowry)", service: "Contract Warehousing — 268K sqft semiconductor tools", duration: "8+ years, $27M YTD revenue" },
    { customer: "Tesla (Vista Ridge)", service: "Parts Distribution — 208K sqft high-velocity", duration: "3+ years active" },
  ],
  audienceTestResults: [
    {
      audienceId: "SA-BATT",
      audienceName: "Battery / Energy Storage Company",
      overallScore: 84,
      criteriaScores: [
        { criterion: "Hazmat / Battery Certifications", score: 88, maxScore: 100, feedback: "Strong UN3481 compliance. Could strengthen with NFPA 855 certification." },
        { criterion: "Rapid Startup Capability", score: 92, maxScore: 100, feedback: "Proven 30-day startup at Patterson. Savannah may take 90 days — flag in proposal." },
        { criterion: "Safety Infrastructure", score: 80, maxScore: 100, feedback: "FM-200 systems in place at current facilities. Savannah site TBD — include specs." },
        { criterion: "Pricing Flexibility", score: 78, maxScore: 100, feedback: "Pricing is competitive but Panasonic will push on volume discounts. Build in tier pricing." },
        { criterion: "Multi-Site Potential", score: 82, maxScore: 100, feedback: "Dual-site is a strength. Include expansion options for future Panasonic growth." },
      ],
      strengthsHighlighted: [
        "Existing Panasonic relationship proves operational capability",
        "30-day startup track record is fastest in market",
        "Battery handling expertise across multiple customers validates safety competence",
      ],
      weaknessesIdentified: [
        "No existing Savannah presence — must demonstrate site readiness plan",
        "Insurance premium for lithium-ion could impact pricing competitiveness",
        "Workforce availability in Savannah market not yet confirmed",
      ],
      recommendedAdjustments: [
        "Add tiered volume pricing (10% discount at 80%+ utilization) to win procurement",
        "Include 60-day Savannah pre-launch timeline in proposal to show readiness",
        "Reference Patterson 30-day startup specifically — this is your strongest proof point",
        "Offer Panasonic first look at any future RK facility in Southeast US",
      ],
      winProbability: 72,
    },
  ],
  confidenceScore: 76,
  matchedHistoricalRfqs: ["RFQ-003", "RFQ-L01"],
};
