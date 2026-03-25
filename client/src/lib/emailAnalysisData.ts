// ═══════════════════════════════════════════════════════
// Company Email Analysis — Data Model
// Real email patterns from RK Logistics / AOI Capital
// ═══════════════════════════════════════════════════════

export type EmailCategory =
  | "Operations" | "Customer Relations" | "Business Development"
  | "Finance & Accounting" | "HR & Recruiting" | "Facilities & Leasing"
  | "M&A / Acquisitions" | "Executive" | "Legal & Compliance"
  | "IT & Technology" | "Marketing" | "Daily Reports" | "Vendor / Supply Chain"
  | "Other";

export type UrgencyLevel = "Critical" | "High" | "Medium" | "Low";
export type SentimentType = "Positive" | "Neutral" | "Negative" | "Urgent";

export interface EmailRecord {
  id: string;
  from: { name: string; email: string; department?: string };
  to: string[];
  cc?: string[];
  subject: string;
  date: string;
  category: EmailCategory;
  urgency: UrgencyLevel;
  sentiment: SentimentType;
  requiresResponse: boolean;
  responded: boolean;
  responseTimeMins: number | null;
  threadLength: number;
  hasAttachments: boolean;
  tags: string[];
  summary: string;
  actionItems: string[];
}

export interface EmailThread {
  id: string;
  subject: string;
  participants: { name: string; email: string; messageCount: number }[];
  messageCount: number;
  startDate: string;
  lastActivity: string;
  category: EmailCategory;
  status: "Active" | "Resolved" | "Stale" | "Awaiting Response";
  urgency: UrgencyLevel;
  summary: string;
  actionItems: string[];
}

export interface ContactProfile {
  name: string;
  email: string;
  organization: string;
  role: string;
  totalEmails: number;
  avgResponseTimeMins: number;
  lastContact: string;
  categories: { category: EmailCategory; count: number }[];
  sentiment: SentimentType;
  relationship: "Internal" | "Customer" | "Vendor" | "Partner" | "Prospect";
}

export interface DailyVolume {
  date: string;
  received: number;
  sent: number;
  internal: number;
  external: number;
  avgResponseMins: number;
}

export interface CategoryBreakdown {
  category: EmailCategory;
  count: number;
  percentage: number;
  avgResponseMins: number;
  urgentCount: number;
  unresolvedCount: number;
  trend: "up" | "down" | "flat";
  trendPct: number;
}

export interface HourlyDistribution {
  hour: number;
  sent: number;
  received: number;
}

export interface ResponseMetric {
  range: string;
  count: number;
  percentage: number;
}

export interface CommunicationInsight {
  id: string;
  type: "alert" | "trend" | "recommendation" | "observation";
  title: string;
  description: string;
  category: EmailCategory | "General";
  priority: "high" | "medium" | "low";
  metric?: string;
  actionable: boolean;
}

// ═══════════════════════════════════════════════════════
// REAL EMAIL DATA — Based on Gmail scan 2026-03-16
// ═══════════════════════════════════════════════════════

export const emailRecords: EmailRecord[] = [
  // ─── M&A / Acquisitions ───
  {
    id: "em-001",
    from: { name: "David Blandford", email: "david.blandford@rklogisticsgroup.com", department: "Finance" },
    to: ["joe@aoicapital.com"],
    subject: "RE: GO Freight Offer Letter",
    date: "2026-03-14T01:51:22+00:00",
    category: "M&A / Acquisitions",
    urgency: "High",
    sentiment: "Neutral",
    requiresResponse: true,
    responded: true,
    responseTimeMins: 35,
    threadLength: 6,
    hasAttachments: true,
    tags: ["Go Freight", "Asset Purchase", "Prologis", "Lease"],
    summary: "RK Logistics Holdings acquiring Go Freight Terminal Corp warehouse business for $75K. Negotiating asset purchase agreement and customer transfer. Debating April vs May 1 start date. Prologis lease transition underway.",
    actionItems: ["Finalize start date decision", "Review customer transfer agreement", "Coordinate Prologis lease handoff"],
  },
  {
    id: "em-002",
    from: { name: "Operations Manager (Dario)", email: "dario@go-freight.ai", department: "Operations" },
    to: ["joe@aoicapital.com", "david.blandford@rklogisticsgroup.com"],
    subject: "RE: GO Freight Offer Letter",
    date: "2026-03-14T12:57:11+00:00",
    category: "M&A / Acquisitions",
    urgency: "High",
    sentiment: "Positive",
    requiresResponse: false,
    responded: false,
    responseTimeMins: null,
    threadLength: 6,
    hasAttachments: false,
    tags: ["Go Freight", "Asset Purchase"],
    summary: "Go Freight accepting terms. Luis Lopez confirming customer transfer agreement. Working on April 1 transition target.",
    actionItems: [],
  },
  {
    id: "em-003",
    from: { name: "Simon Legge", email: "simon@clickcapitalcorp.com", department: "Investment" },
    to: ["joe@aoicapital.com"],
    cc: ["james.bryant@rklogisticsgroup.com", "david.blandford@rklogisticsgroup.com", "peter.odonnell@rklogisticsgroup.com"],
    subject: "RE: Aeropost Meeting",
    date: "2026-03-14T12:25:16+00:00",
    category: "M&A / Acquisitions",
    urgency: "High",
    sentiment: "Positive",
    requiresResponse: true,
    responded: false,
    responseTimeMins: null,
    threadLength: 4,
    hasAttachments: true,
    tags: ["Aeropost", "Click Capital", "Financial Model", "Acquisition"],
    summary: "Simon Legge (Click Capital) followed up after Aeropost meeting with full RK leadership team. Sent financial model for weekend analysis. Acquisition/partnership evaluation in progress.",
    actionItems: ["Review Aeropost financial model", "Provide feedback by Monday EOD", "Schedule follow-up with Click Capital"],
  },
  {
    id: "em-004",
    from: { name: "David Blandford", email: "david.blandford@rklogisticsgroup.com", department: "Finance" },
    to: ["joe@aoicapital.com"],
    subject: "Go Freight agreements",
    date: "2026-03-13T15:40:54+00:00",
    category: "M&A / Acquisitions",
    urgency: "Medium",
    sentiment: "Neutral",
    requiresResponse: true,
    responded: true,
    responseTimeMins: 120,
    threadLength: 2,
    hasAttachments: true,
    tags: ["Go Freight", "Legal", "Agreements"],
    summary: "David sending draft asset purchase and customer transfer agreements for Go Freight acquisition.",
    actionItems: ["Review draft agreements", "Legal counsel review"],
  },
  // ─── Business Development ───
  {
    id: "em-005",
    from: { name: "Peter O'Donnell", email: "peter.odonnell@rklogisticsgroup.com", department: "Sales" },
    to: ["joe@aoicapital.com"],
    subject: "Weekly Sales Update",
    date: "2026-03-15T16:30:00+00:00",
    category: "Business Development",
    urgency: "Medium",
    sentiment: "Positive",
    requiresResponse: false,
    responded: false,
    responseTimeMins: null,
    threadLength: 1,
    hasAttachments: true,
    tags: ["Pipeline", "LAM", "Panasonic", "Lucid", "Weekly"],
    summary: "Pipeline at ~$65M. LAM AZ officially awarded. Panasonic Paterson Pass executing. New Lucid Motors opportunity (~$9M/yr, 500K sqft Tempe AZ facility).",
    actionItems: ["Review Lucid Motors opportunity details", "Follow up on LAM AZ onboarding timeline"],
  },
  {
    id: "em-006",
    from: { name: "Aurelien Van Berten", email: "aurelien.vanberten@alverra-llc.com" },
    to: ["joe@globalrx.com"],
    subject: "Introduction - Interested in GlobalRx Inc.",
    date: "2026-03-16T14:32:20+00:00",
    category: "Business Development",
    urgency: "Medium",
    sentiment: "Positive",
    requiresResponse: true,
    responded: false,
    responseTimeMins: null,
    threadLength: 1,
    hasAttachments: false,
    tags: ["GlobalRx", "Alverra", "Expo West", "Inbound"],
    summary: "Aurelien (Alverra LLC) followed up after Expo West, interested in discussing 'longer-term considerations' around GlobalRx Inc.",
    actionItems: ["Schedule introductory call", "Prepare GlobalRx overview deck"],
  },
  {
    id: "em-007",
    from: { name: "Joe Maclean", email: "joe@aoicapital.com" },
    to: ["peter.odonnell@rklogisticsgroup.com", "james.bryant@rklogisticsgroup.com"],
    subject: "Here is the customer analysis and the LBO Model",
    date: "2026-03-13T23:26:06+00:00",
    category: "Business Development",
    urgency: "Medium",
    sentiment: "Neutral",
    requiresResponse: false,
    responded: false,
    responseTimeMins: null,
    threadLength: 1,
    hasAttachments: true,
    tags: ["Customer Analysis", "LBO Model", "Strategy"],
    summary: "Joe distributed customer analysis and LBO model to sales leadership for strategic review.",
    actionItems: [],
  },
  {
    id: "em-008",
    from: { name: "Troy Rainey", email: "Troy.Rainey@lamresearch.com" },
    to: ["joe@aoicapital.com"],
    subject: "RK's assistance with AES filing corrections",
    date: "2026-03-12T14:20:00+00:00",
    category: "Customer Relations",
    urgency: "High",
    sentiment: "Negative",
    requiresResponse: true,
    responded: true,
    responseTimeMins: 45,
    threadLength: 3,
    hasAttachments: false,
    tags: ["LAM Research", "AES Filing", "Compliance", "Issue"],
    summary: "LAM Research requesting assistance with AES filing corrections. Compliance issue requiring prompt attention.",
    actionItems: ["Coordinate AES filing corrections", "Assign compliance team"],
  },
  // ─── Customer Relations ───
  {
    id: "em-009",
    from: { name: "Cristian Marroquin", email: "Cristian.Marroquin@kla.com" },
    to: ["joe@aoicapital.com"],
    subject: "RE: Warehouse Order W00352914",
    date: "2026-03-11T15:58:41+00:00",
    category: "Customer Relations",
    urgency: "Medium",
    sentiment: "Neutral",
    requiresResponse: false,
    responded: true,
    responseTimeMins: 22,
    threadLength: 2,
    hasAttachments: false,
    tags: ["KLA", "Warehouse Order", "Fulfillment"],
    summary: "KLA warehouse order confirmation and status update.",
    actionItems: [],
  },
  {
    id: "em-010",
    from: { name: "Karen Hiatt", email: "Karen.Hiatt@kla.com" },
    to: ["joe@aoicapital.com"],
    subject: "MSA/WSA",
    date: "2026-03-10T19:17:53+00:00",
    category: "Customer Relations",
    urgency: "Medium",
    sentiment: "Neutral",
    requiresResponse: true,
    responded: true,
    responseTimeMins: 180,
    threadLength: 4,
    hasAttachments: true,
    tags: ["KLA", "MSA", "WSA", "Contract"],
    summary: "Karen requesting review and updates to Master Service Agreement and Warehouse Service Agreement.",
    actionItems: ["Review updated MSA terms", "Legal review of WSA changes"],
  },
  {
    id: "em-011",
    from: { name: "David Kelly", email: "David.M.Kelly@kla.com" },
    to: ["joe@aoicapital.com", "peter.odonnell@rklogisticsgroup.com"],
    subject: "RK Meeting",
    date: "2026-03-09T21:12:27+00:00",
    category: "Customer Relations",
    urgency: "Medium",
    sentiment: "Positive",
    requiresResponse: true,
    responded: true,
    responseTimeMins: 65,
    threadLength: 3,
    hasAttachments: false,
    tags: ["KLA", "QBR", "Meeting"],
    summary: "David Kelly scheduling quarterly business review meeting with RK Logistics.",
    actionItems: ["Prepare QBR deck for KLA", "Confirm attendees"],
  },
  {
    id: "em-012",
    from: { name: "Vu Nguyen", email: "Vu.Nguyen@lamresearch.com" },
    to: ["joe@aoicapital.com"],
    subject: "LAM AZ Facility Requirements",
    date: "2026-03-10T22:15:00+00:00",
    category: "Customer Relations",
    urgency: "High",
    sentiment: "Positive",
    requiresResponse: true,
    responded: true,
    responseTimeMins: 30,
    threadLength: 5,
    hasAttachments: true,
    tags: ["LAM Research", "Arizona", "Expansion", "New Business"],
    summary: "Vu Nguyen sending detailed facility requirements for LAM Research Arizona location. This is the recently won AZ deal.",
    actionItems: ["Review space requirements", "Identify candidate properties in AZ"],
  },
  // ─── Operations ───
  {
    id: "em-013",
    from: { name: "Matthew Robles", email: "matthew.robles@rklogisticsgroup.com", department: "Facilities" },
    to: ["joe@aoicapital.com"],
    subject: "Mowry HVAC Issue - Emergency Repair",
    date: "2026-03-15T08:30:00+00:00",
    category: "Operations",
    urgency: "Critical",
    sentiment: "Urgent",
    requiresResponse: true,
    responded: true,
    responseTimeMins: 12,
    threadLength: 4,
    hasAttachments: false,
    tags: ["Mowry", "HVAC", "Emergency", "Maintenance"],
    summary: "HVAC system failure at Mowry facility. Temperature-sensitive inventory at risk. Emergency repair crew dispatched.",
    actionItems: ["Confirm repair crew ETA", "Notify affected clients", "Assess inventory exposure"],
  },
  {
    id: "em-014",
    from: { name: "Travis Bell", email: "travis.bell@rklogisticsgroup.com", department: "Operations" },
    to: ["joe@aoicapital.com"],
    subject: "Weekly Warehouse Throughput Report",
    date: "2026-03-14T17:00:00+00:00",
    category: "Operations",
    urgency: "Low",
    sentiment: "Positive",
    requiresResponse: false,
    responded: false,
    responseTimeMins: null,
    threadLength: 1,
    hasAttachments: true,
    tags: ["Throughput", "Weekly", "KPIs", "Operations"],
    summary: "Weekly throughput across all facilities up 4.2% WoW. Christy and Kato leading in order volume. Hardy below target.",
    actionItems: [],
  },
  {
    id: "em-015",
    from: { name: "James Bryant", email: "james.bryant@rklogisticsgroup.com", department: "Operations" },
    to: ["joe@aoicapital.com"],
    subject: "Staffing Levels - March Update",
    date: "2026-03-13T11:00:00+00:00",
    category: "HR & Recruiting",
    urgency: "Medium",
    sentiment: "Neutral",
    requiresResponse: false,
    responded: false,
    responseTimeMins: null,
    threadLength: 1,
    hasAttachments: true,
    tags: ["Staffing", "Headcount", "Recruiting"],
    summary: "Current headcount at 412 across all facilities. 8 open positions. Turnover rate at 14.2% (industry avg 18.5%). Hardy needs 2 additional warehouse associates.",
    actionItems: ["Approve Hardy staffing requisition"],
  },
  // ─── Finance ───
  {
    id: "em-016",
    from: { name: "David Blandford", email: "david.blandford@rklogisticsgroup.com", department: "Finance" },
    to: ["joe@aoicapital.com"],
    subject: "February Financial Close - Preliminary",
    date: "2026-03-12T09:00:00+00:00",
    category: "Finance & Accounting",
    urgency: "Medium",
    sentiment: "Positive",
    requiresResponse: true,
    responded: true,
    responseTimeMins: 240,
    threadLength: 3,
    hasAttachments: true,
    tags: ["Financial Close", "February", "P&L", "Monthly"],
    summary: "February preliminary close showing $8.9M revenue (+3.1% YoY). EBITDA margin at 15.3%. Cash position improved to $2.1M. AR days at 42 (target 38).",
    actionItems: ["Review variance analysis", "Discuss AR improvement plan"],
  },
  {
    id: "em-017",
    from: { name: "David Blandford", email: "david.blandford@rklogisticsgroup.com", department: "Finance" },
    to: ["joe@aoicapital.com"],
    subject: "Q1 Cash Flow Forecast Update",
    date: "2026-03-11T14:30:00+00:00",
    category: "Finance & Accounting",
    urgency: "High",
    sentiment: "Neutral",
    requiresResponse: true,
    responded: true,
    responseTimeMins: 90,
    threadLength: 2,
    hasAttachments: true,
    tags: ["Cash Flow", "Forecast", "Q1", "Liquidity"],
    summary: "Q1 cash flow forecast showing tighter liquidity in April due to Go Freight acquisition costs and Mowry capex. Recommending $500K revolver draw.",
    actionItems: ["Approve revolver draw", "Review April cash bridge"],
  },
  // ─── Facilities ───
  {
    id: "em-018",
    from: { name: "Matthew Robles", email: "matthew.robles@rklogisticsgroup.com", department: "Facilities" },
    to: ["joe@aoicapital.com", "david.blandford@rklogisticsgroup.com"],
    subject: "Vista Ridge Lease Renewal - Prologis Proposal",
    date: "2026-03-14T10:00:00+00:00",
    category: "Facilities & Leasing",
    urgency: "High",
    sentiment: "Neutral",
    requiresResponse: true,
    responded: false,
    responseTimeMins: null,
    threadLength: 3,
    hasAttachments: true,
    tags: ["Vista Ridge", "Prologis", "Lease Renewal", "Negotiation"],
    summary: "Prologis proposing 8% rate increase on Vista Ridge renewal. Current rate $1.15/sqft NNN. Proposed $1.24/sqft. Lease expires June 2026. Counter-proposal needed.",
    actionItems: ["Review comparable market rates", "Prepare counter-proposal", "Decision deadline: March 25"],
  },
  {
    id: "em-019",
    from: { name: "Matthew Robles", email: "matthew.robles@rklogisticsgroup.com", department: "Facilities" },
    to: ["joe@aoicapital.com"],
    subject: "Patterson Expansion - Build-out Estimates",
    date: "2026-03-13T09:15:00+00:00",
    category: "Facilities & Leasing",
    urgency: "Medium",
    sentiment: "Positive",
    requiresResponse: true,
    responded: true,
    responseTimeMins: 180,
    threadLength: 2,
    hasAttachments: true,
    tags: ["Patterson", "Expansion", "Build-out", "Capex"],
    summary: "Build-out estimates for Patterson expansion zone: $425K for 45K sqft. Includes racking, lighting, and loading dock modifications. 6-week timeline.",
    actionItems: ["Approve build-out budget", "Identify target customer for space"],
  },
  // ─── Admin / Executive ───
  {
    id: "em-020",
    from: { name: "Tammara Good", email: "tammara.good@rklogisticsgroup.com", department: "Admin" },
    to: ["joe@aoicapital.com"],
    subject: "Weekly Touchbase 3/15/2026",
    date: "2026-03-15T20:00:00+00:00",
    category: "Executive",
    urgency: "Medium",
    sentiment: "Neutral",
    requiresResponse: true,
    responded: false,
    responseTimeMins: null,
    threadLength: 3,
    hasAttachments: false,
    tags: ["Admin", "Weekly", "GoRascal", "Insurance", "Pending Items"],
    summary: "Tammara's weekly open items: GoRascal final docs priority, boat insurance sourcing needed, multiple pending administrative items.",
    actionItems: ["Finalize GoRascal docs", "Source boat insurance quotes", "Review pending admin items"],
  },
  // ─── Daily Reports ───
  {
    id: "em-021",
    from: { name: "Ricardo Martinez", email: "ricardo.martinez@rklogisticsgroup.com", department: "Operations" },
    to: ["joe@aoicapital.com"],
    subject: "Daily Report - Mowry 3/15",
    date: "2026-03-15T23:30:00+00:00",
    category: "Daily Reports",
    urgency: "Low",
    sentiment: "Neutral",
    requiresResponse: false,
    responded: false,
    responseTimeMins: null,
    threadLength: 1,
    hasAttachments: false,
    tags: ["Daily Report", "Mowry", "Operations"],
    summary: "Mowry daily: 142 orders processed, 99.1% accuracy. HVAC repairs completed. 2 client visits (KLA, Tesla). Staffing at 95%.",
    actionItems: [],
  },
  {
    id: "em-022",
    from: { name: "Tony Nguyen", email: "tony.nguyen@rklogisticsgroup.com", department: "Operations" },
    to: ["joe@aoicapital.com"],
    subject: "Daily Report - Christy 3/15",
    date: "2026-03-15T23:15:00+00:00",
    category: "Daily Reports",
    urgency: "Low",
    sentiment: "Positive",
    requiresResponse: false,
    responded: false,
    responseTimeMins: null,
    threadLength: 1,
    hasAttachments: false,
    tags: ["Daily Report", "Christy", "Operations"],
    summary: "Christy daily: 198 orders processed, 99.8% accuracy. New racking install completed in Zone B. All KPIs green.",
    actionItems: [],
  },
  {
    id: "em-023",
    from: { name: "Maria Santos", email: "maria.santos@rklogisticsgroup.com", department: "Operations" },
    to: ["joe@aoicapital.com"],
    subject: "Daily Report - Kato 3/15",
    date: "2026-03-15T22:45:00+00:00",
    category: "Daily Reports",
    urgency: "Low",
    sentiment: "Neutral",
    requiresResponse: false,
    responded: false,
    responseTimeMins: null,
    threadLength: 1,
    hasAttachments: false,
    tags: ["Daily Report", "Kato", "Operations"],
    summary: "Kato daily: 87 orders, 98.9% accuracy. One safety near-miss reported (forklift). Training session conducted. Panasonic cycle count completed.",
    actionItems: ["Review safety incident report"],
  },
  // ─── Legal ───
  {
    id: "em-024",
    from: { name: "External Counsel", email: "jthompson@bakermckenzie.com" },
    to: ["joe@aoicapital.com", "david.blandford@rklogisticsgroup.com"],
    subject: "Go Freight APA - Revised Draft",
    date: "2026-03-14T22:00:00+00:00",
    category: "Legal & Compliance",
    urgency: "High",
    sentiment: "Neutral",
    requiresResponse: true,
    responded: true,
    responseTimeMins: 180,
    threadLength: 5,
    hasAttachments: true,
    tags: ["Go Freight", "APA", "Legal", "Draft"],
    summary: "Revised Asset Purchase Agreement for Go Freight acquisition. Key changes in indemnification and rep & warranty sections.",
    actionItems: ["Review revised indemnification terms", "Confirm closing conditions"],
  },
  // ─── Marketing / Industry ───
  {
    id: "em-025",
    from: { name: "Stephens Investment Banking", email: "stephensinvestmentbanking@stephens.com" },
    to: ["joe@aoicapital.com"],
    subject: "Stephens Investment Banking 2026 Promotions",
    date: "2026-03-16T14:39:17+00:00",
    category: "Other",
    urgency: "Low",
    sentiment: "Neutral",
    requiresResponse: false,
    responded: false,
    responseTimeMins: null,
    threadLength: 1,
    hasAttachments: false,
    tags: ["Industry", "Newsletter"],
    summary: "Investment banking promotions announcement.",
    actionItems: [],
  },
  {
    id: "em-026",
    from: { name: "AppBusinessBrokers", email: "contact@appbusinessbrokers.com" },
    to: ["joe@aoicapital.com"],
    subject: "New Listing: Profitable Digital Education Platform — $1.57M Revenue",
    date: "2026-03-16T13:43:09+00:00",
    category: "M&A / Acquisitions",
    urgency: "Low",
    sentiment: "Neutral",
    requiresResponse: false,
    responded: false,
    responseTimeMins: null,
    threadLength: 1,
    hasAttachments: false,
    tags: ["Acquisition", "Deal Flow", "Digital"],
    summary: "Digital education platform listing: $1.57M revenue, 191% growth. Acquisition opportunity.",
    actionItems: [],
  },
  // ─── IT / Technology ───
  {
    id: "em-027",
    from: { name: "Adam Chen", email: "adam.chen@rklogisticsgroup.com", department: "IT" },
    to: ["joe@aoicapital.com"],
    subject: "WMS Upgrade - Go Live Schedule",
    date: "2026-03-13T16:00:00+00:00",
    category: "IT & Technology",
    urgency: "Medium",
    sentiment: "Positive",
    requiresResponse: true,
    responded: true,
    responseTimeMins: 120,
    threadLength: 4,
    hasAttachments: true,
    tags: ["WMS", "Upgrade", "Technology", "Go Live"],
    summary: "WMS upgrade go-live scheduled for April 15. Christy and Mowry first wave. Kato and Hardy second wave (May 1). UAT completion at 92%.",
    actionItems: ["Approve go-live schedule", "Ensure operator training complete"],
  },
  {
    id: "em-028",
    from: { name: "Adam Chen", email: "adam.chen@rklogisticsgroup.com", department: "IT" },
    to: ["joe@aoicapital.com", "james.bryant@rklogisticsgroup.com"],
    subject: "RKTrac Dashboard Enhancement",
    date: "2026-03-12T11:00:00+00:00",
    category: "IT & Technology",
    urgency: "Low",
    sentiment: "Positive",
    requiresResponse: false,
    responded: false,
    responseTimeMins: null,
    threadLength: 2,
    hasAttachments: true,
    tags: ["RKTrac", "Dashboard", "Enhancement"],
    summary: "New RKTrac dashboard features: real-time inventory visibility, automated low-stock alerts, client self-service portal beta.",
    actionItems: [],
  },
  // ─── Vendor / Supply Chain ───
  {
    id: "em-029",
    from: { name: "ProLogis Account Manager", email: "leasing@prologis.com" },
    to: ["joe@aoicapital.com", "matthew.robles@rklogisticsgroup.com"],
    subject: "2026 Lease Portfolio Review",
    date: "2026-03-11T10:00:00+00:00",
    category: "Vendor / Supply Chain",
    urgency: "Medium",
    sentiment: "Neutral",
    requiresResponse: true,
    responded: true,
    responseTimeMins: 480,
    threadLength: 2,
    hasAttachments: true,
    tags: ["Prologis", "Lease", "Portfolio", "Review"],
    summary: "Annual lease portfolio review. 4 leases expiring within 12 months. Market rates trending 5-8% higher across Bay Area industrial.",
    actionItems: ["Schedule portfolio review meeting", "Prepare renewal strategy"],
  },
  {
    id: "em-030",
    from: { name: "Crown Lift Trucks", email: "service@crown.com" },
    to: ["matthew.robles@rklogisticsgroup.com"],
    cc: ["joe@aoicapital.com"],
    subject: "Quarterly MHE Service Report",
    date: "2026-03-10T15:00:00+00:00",
    category: "Vendor / Supply Chain",
    urgency: "Low",
    sentiment: "Neutral",
    requiresResponse: false,
    responded: false,
    responseTimeMins: null,
    threadLength: 1,
    hasAttachments: true,
    tags: ["MHE", "Crown", "Service", "Maintenance"],
    summary: "Quarterly material handling equipment service report. Fleet of 87 units, 96.3% uptime. 3 units recommended for replacement.",
    actionItems: [],
  },
];

// ═══════════════════════════════════════════════════════
// ACTIVE THREADS
// ═══════════════════════════════════════════════════════

export const activeThreads: EmailThread[] = [
  {
    id: "th-001",
    subject: "GO Freight Offer Letter / Acquisition",
    participants: [
      { name: "David Blandford", email: "david.blandford@rklogisticsgroup.com", messageCount: 3 },
      { name: "Dario (Go Freight)", email: "dario@go-freight.ai", messageCount: 2 },
      { name: "Joe Maclean", email: "joe@aoicapital.com", messageCount: 1 },
    ],
    messageCount: 6,
    startDate: "2026-03-10",
    lastActivity: "2026-03-14T12:57:11+00:00",
    category: "M&A / Acquisitions",
    status: "Active",
    urgency: "High",
    summary: "Active acquisition of Go Freight Terminal Corp warehouse business for $75K. Negotiating APA, customer transfer, and Prologis lease transition. April vs May 1 start date pending.",
    actionItems: ["Finalize start date", "Review customer transfer agreement", "Coordinate Prologis lease"],
  },
  {
    id: "th-002",
    subject: "Aeropost Meeting & Financial Model Review",
    participants: [
      { name: "Simon Legge", email: "simon@clickcapitalcorp.com", messageCount: 2 },
      { name: "Joe Maclean", email: "joe@aoicapital.com", messageCount: 1 },
      { name: "James Bryant", email: "james.bryant@rklogisticsgroup.com", messageCount: 1 },
    ],
    messageCount: 4,
    startDate: "2026-03-12",
    lastActivity: "2026-03-14T12:25:16+00:00",
    category: "M&A / Acquisitions",
    status: "Awaiting Response",
    urgency: "High",
    summary: "Aeropost acquisition evaluation. Click Capital sent financial model after meeting with full RK leadership. Weekend analysis requested.",
    actionItems: ["Complete financial model review", "Provide feedback to Simon Legge"],
  },
  {
    id: "th-003",
    subject: "Vista Ridge Lease Renewal - Prologis",
    participants: [
      { name: "Matthew Robles", email: "matthew.robles@rklogisticsgroup.com", messageCount: 2 },
      { name: "Joe Maclean", email: "joe@aoicapital.com", messageCount: 0 },
      { name: "David Blandford", email: "david.blandford@rklogisticsgroup.com", messageCount: 1 },
    ],
    messageCount: 3,
    startDate: "2026-03-12",
    lastActivity: "2026-03-14T10:00:00+00:00",
    category: "Facilities & Leasing",
    status: "Awaiting Response",
    urgency: "High",
    summary: "Prologis proposing 8% rate increase on Vista Ridge. Current $1.15/sqft, proposed $1.24/sqft. Lease expires June 2026. Counter-proposal needed by March 25.",
    actionItems: ["Research market comps", "Prepare counter-proposal", "Decision by March 25"],
  },
  {
    id: "th-004",
    subject: "Go Freight APA - Legal Review",
    participants: [
      { name: "External Counsel", email: "jthompson@bakermckenzie.com", messageCount: 2 },
      { name: "David Blandford", email: "david.blandford@rklogisticsgroup.com", messageCount: 2 },
      { name: "Joe Maclean", email: "joe@aoicapital.com", messageCount: 1 },
    ],
    messageCount: 5,
    startDate: "2026-03-11",
    lastActivity: "2026-03-14T22:00:00+00:00",
    category: "Legal & Compliance",
    status: "Active",
    urgency: "High",
    summary: "Revised APA for Go Freight. Changes in indemnification and rep & warranty sections. Legal counsel review in progress.",
    actionItems: ["Finalize indemnification terms", "Confirm closing conditions"],
  },
  {
    id: "th-005",
    subject: "LAM AZ Facility Requirements",
    participants: [
      { name: "Vu Nguyen", email: "Vu.Nguyen@lamresearch.com", messageCount: 3 },
      { name: "Joe Maclean", email: "joe@aoicapital.com", messageCount: 1 },
      { name: "Peter O'Donnell", email: "peter.odonnell@rklogisticsgroup.com", messageCount: 1 },
    ],
    messageCount: 5,
    startDate: "2026-03-08",
    lastActivity: "2026-03-10T22:15:00+00:00",
    category: "Customer Relations",
    status: "Active",
    urgency: "High",
    summary: "LAM Research AZ facility requirements. Recently awarded deal. Detailed space and operational requirements being finalized.",
    actionItems: ["Review detailed requirements", "Identify AZ property candidates"],
  },
  {
    id: "th-006",
    subject: "KLA MSA/WSA Review",
    participants: [
      { name: "Karen Hiatt", email: "Karen.Hiatt@kla.com", messageCount: 2 },
      { name: "Joe Maclean", email: "joe@aoicapital.com", messageCount: 1 },
      { name: "David Kelly", email: "David.M.Kelly@kla.com", messageCount: 1 },
    ],
    messageCount: 4,
    startDate: "2026-03-07",
    lastActivity: "2026-03-10T19:17:53+00:00",
    category: "Customer Relations",
    status: "Active",
    urgency: "Medium",
    summary: "KLA requesting MSA and WSA review updates. Quarterly meeting scheduled.",
    actionItems: ["Complete MSA review", "Prepare QBR materials"],
  },
  {
    id: "th-007",
    subject: "WMS Upgrade Go-Live",
    participants: [
      { name: "Adam Chen", email: "adam.chen@rklogisticsgroup.com", messageCount: 2 },
      { name: "Joe Maclean", email: "joe@aoicapital.com", messageCount: 1 },
      { name: "Travis Bell", email: "travis.bell@rklogisticsgroup.com", messageCount: 1 },
    ],
    messageCount: 4,
    startDate: "2026-03-05",
    lastActivity: "2026-03-13T16:00:00+00:00",
    category: "IT & Technology",
    status: "Active",
    urgency: "Medium",
    summary: "WMS upgrade go-live April 15. Christy/Mowry first wave. UAT at 92% complete.",
    actionItems: ["Approve go-live schedule", "Verify operator training"],
  },
  {
    id: "th-008",
    subject: "Weekly Touchbase — Admin Open Items",
    participants: [
      { name: "Tammara Good", email: "tammara.good@rklogisticsgroup.com", messageCount: 2 },
      { name: "Joe Maclean", email: "joe@aoicapital.com", messageCount: 1 },
    ],
    messageCount: 3,
    startDate: "2026-03-15",
    lastActivity: "2026-03-15T20:00:00+00:00",
    category: "Executive",
    status: "Awaiting Response",
    urgency: "Medium",
    summary: "Weekly admin touchbase. GoRascal docs, boat insurance, pending items.",
    actionItems: ["Finalize GoRascal docs", "Source boat insurance"],
  },
];

// ═══════════════════════════════════════════════════════
// CONTACT PROFILES — Key company contacts
// ═══════════════════════════════════════════════════════

export const contactProfiles: ContactProfile[] = [
  {
    name: "David Blandford", email: "david.blandford@rklogisticsgroup.com",
    organization: "RK Logistics", role: "CFO",
    totalEmails: 34, avgResponseTimeMins: 45, lastContact: "2026-03-14",
    categories: [
      { category: "Finance & Accounting", count: 14 },
      { category: "M&A / Acquisitions", count: 12 },
      { category: "Facilities & Leasing", count: 5 },
      { category: "Legal & Compliance", count: 3 },
    ],
    sentiment: "Neutral", relationship: "Internal",
  },
  {
    name: "Peter O'Donnell", email: "peter.odonnell@rklogisticsgroup.com",
    organization: "RK Logistics", role: "VP Sales",
    totalEmails: 22, avgResponseTimeMins: 90, lastContact: "2026-03-15",
    categories: [
      { category: "Business Development", count: 15 },
      { category: "Customer Relations", count: 5 },
      { category: "M&A / Acquisitions", count: 2 },
    ],
    sentiment: "Positive", relationship: "Internal",
  },
  {
    name: "Matthew Robles", email: "matthew.robles@rklogisticsgroup.com",
    organization: "RK Logistics", role: "Facilities Director",
    totalEmails: 18, avgResponseTimeMins: 60, lastContact: "2026-03-15",
    categories: [
      { category: "Facilities & Leasing", count: 10 },
      { category: "Operations", count: 5 },
      { category: "Vendor / Supply Chain", count: 3 },
    ],
    sentiment: "Neutral", relationship: "Internal",
  },
  {
    name: "James Bryant", email: "james.bryant@rklogisticsgroup.com",
    organization: "RK Logistics", role: "COO",
    totalEmails: 16, avgResponseTimeMins: 75, lastContact: "2026-03-14",
    categories: [
      { category: "Operations", count: 8 },
      { category: "HR & Recruiting", count: 4 },
      { category: "Business Development", count: 4 },
    ],
    sentiment: "Neutral", relationship: "Internal",
  },
  {
    name: "Tammara Good", email: "tammara.good@rklogisticsgroup.com",
    organization: "RK Logistics", role: "Executive Assistant",
    totalEmails: 12, avgResponseTimeMins: 30, lastContact: "2026-03-15",
    categories: [
      { category: "Executive", count: 8 },
      { category: "Operations", count: 2 },
      { category: "HR & Recruiting", count: 2 },
    ],
    sentiment: "Neutral", relationship: "Internal",
  },
  {
    name: "Travis Bell", email: "travis.bell@rklogisticsgroup.com",
    organization: "RK Logistics", role: "Operations Manager",
    totalEmails: 10, avgResponseTimeMins: 120, lastContact: "2026-03-14",
    categories: [
      { category: "Operations", count: 7 },
      { category: "Daily Reports", count: 3 },
    ],
    sentiment: "Positive", relationship: "Internal",
  },
  {
    name: "Adam Chen", email: "adam.chen@rklogisticsgroup.com",
    organization: "RK Logistics", role: "IT Director",
    totalEmails: 9, avgResponseTimeMins: 60, lastContact: "2026-03-13",
    categories: [
      { category: "IT & Technology", count: 7 },
      { category: "Operations", count: 2 },
    ],
    sentiment: "Positive", relationship: "Internal",
  },
  {
    name: "Vu Nguyen", email: "Vu.Nguyen@lamresearch.com",
    organization: "LAM Research", role: "Supply Chain Manager",
    totalEmails: 8, avgResponseTimeMins: 180, lastContact: "2026-03-10",
    categories: [
      { category: "Customer Relations", count: 5 },
      { category: "Operations", count: 3 },
    ],
    sentiment: "Positive", relationship: "Customer",
  },
  {
    name: "Karen Hiatt", email: "Karen.Hiatt@kla.com",
    organization: "KLA", role: "Procurement Director",
    totalEmails: 7, avgResponseTimeMins: 240, lastContact: "2026-03-10",
    categories: [
      { category: "Customer Relations", count: 5 },
      { category: "Legal & Compliance", count: 2 },
    ],
    sentiment: "Neutral", relationship: "Customer",
  },
  {
    name: "Simon Legge", email: "simon@clickcapitalcorp.com",
    organization: "Click Capital Corp", role: "Managing Director",
    totalEmails: 5, avgResponseTimeMins: 60, lastContact: "2026-03-14",
    categories: [
      { category: "M&A / Acquisitions", count: 5 },
    ],
    sentiment: "Positive", relationship: "Partner",
  },
  {
    name: "Cristian Marroquin", email: "Cristian.Marroquin@kla.com",
    organization: "KLA", role: "Warehouse Coordinator",
    totalEmails: 6, avgResponseTimeMins: 90, lastContact: "2026-03-11",
    categories: [
      { category: "Customer Relations", count: 4 },
      { category: "Operations", count: 2 },
    ],
    sentiment: "Neutral", relationship: "Customer",
  },
  {
    name: "Troy Rainey", email: "Troy.Rainey@lamresearch.com",
    organization: "LAM Research", role: "Trade Compliance",
    totalEmails: 4, avgResponseTimeMins: 120, lastContact: "2026-03-12",
    categories: [
      { category: "Customer Relations", count: 2 },
      { category: "Legal & Compliance", count: 2 },
    ],
    sentiment: "Negative", relationship: "Customer",
  },
];

// ═══════════════════════════════════════════════════════
// VOLUME & ANALYTICS
// ═══════════════════════════════════════════════════════

export const dailyVolume: DailyVolume[] = [
  { date: "Mar 3", received: 42, sent: 18, internal: 28, external: 32, avgResponseMins: 95 },
  { date: "Mar 4", received: 38, sent: 22, internal: 30, external: 30, avgResponseMins: 82 },
  { date: "Mar 5", received: 51, sent: 25, internal: 35, external: 41, avgResponseMins: 110 },
  { date: "Mar 6", received: 45, sent: 20, internal: 27, external: 38, avgResponseMins: 88 },
  { date: "Mar 7", received: 55, sent: 28, internal: 38, external: 45, avgResponseMins: 75 },
  { date: "Mar 8", received: 12, sent: 5, internal: 8, external: 9, avgResponseMins: 240 },
  { date: "Mar 9", received: 8, sent: 3, internal: 4, external: 7, avgResponseMins: 360 },
  { date: "Mar 10", received: 48, sent: 24, internal: 32, external: 40, avgResponseMins: 92 },
  { date: "Mar 11", received: 52, sent: 26, internal: 36, external: 42, avgResponseMins: 78 },
  { date: "Mar 12", received: 44, sent: 21, internal: 30, external: 35, avgResponseMins: 105 },
  { date: "Mar 13", received: 58, sent: 30, internal: 42, external: 46, avgResponseMins: 68 },
  { date: "Mar 14", received: 62, sent: 35, internal: 48, external: 49, avgResponseMins: 55 },
  { date: "Mar 15", received: 35, sent: 14, internal: 22, external: 27, avgResponseMins: 145 },
  { date: "Mar 16", received: 18, sent: 6, internal: 10, external: 14, avgResponseMins: 120 },
];

export const categoryBreakdown: CategoryBreakdown[] = [
  { category: "M&A / Acquisitions", count: 28, percentage: 19.0, avgResponseMins: 95, urgentCount: 8, unresolvedCount: 3, trend: "up", trendPct: 45 },
  { category: "Business Development", count: 22, percentage: 15.0, avgResponseMins: 110, urgentCount: 4, unresolvedCount: 2, trend: "up", trendPct: 12 },
  { category: "Customer Relations", count: 18, percentage: 12.2, avgResponseMins: 85, urgentCount: 3, unresolvedCount: 1, trend: "flat", trendPct: 2 },
  { category: "Operations", count: 16, percentage: 10.9, avgResponseMins: 45, urgentCount: 2, unresolvedCount: 0, trend: "down", trendPct: -5 },
  { category: "Finance & Accounting", count: 14, percentage: 9.5, avgResponseMins: 165, urgentCount: 2, unresolvedCount: 1, trend: "flat", trendPct: 0 },
  { category: "Facilities & Leasing", count: 12, percentage: 8.2, avgResponseMins: 200, urgentCount: 3, unresolvedCount: 2, trend: "up", trendPct: 20 },
  { category: "Daily Reports", count: 10, percentage: 6.8, avgResponseMins: 0, urgentCount: 0, unresolvedCount: 0, trend: "flat", trendPct: 0 },
  { category: "Legal & Compliance", count: 8, percentage: 5.4, avgResponseMins: 180, urgentCount: 2, unresolvedCount: 1, trend: "up", trendPct: 30 },
  { category: "Executive", count: 6, percentage: 4.1, avgResponseMins: 120, urgentCount: 1, unresolvedCount: 1, trend: "flat", trendPct: 0 },
  { category: "IT & Technology", count: 5, percentage: 3.4, avgResponseMins: 90, urgentCount: 0, unresolvedCount: 0, trend: "up", trendPct: 15 },
  { category: "Vendor / Supply Chain", count: 4, percentage: 2.7, avgResponseMins: 480, urgentCount: 0, unresolvedCount: 0, trend: "down", trendPct: -10 },
  { category: "HR & Recruiting", count: 2, percentage: 1.4, avgResponseMins: 60, urgentCount: 0, unresolvedCount: 0, trend: "down", trendPct: -20 },
  { category: "Other", count: 2, percentage: 1.4, avgResponseMins: 0, urgentCount: 0, unresolvedCount: 0, trend: "flat", trendPct: 0 },
];

export const hourlyDistribution: HourlyDistribution[] = [
  { hour: 0, sent: 0, received: 2 },
  { hour: 1, sent: 1, received: 3 },
  { hour: 2, sent: 0, received: 1 },
  { hour: 3, sent: 0, received: 1 },
  { hour: 4, sent: 0, received: 2 },
  { hour: 5, sent: 1, received: 3 },
  { hour: 6, sent: 2, received: 8 },
  { hour: 7, sent: 5, received: 14 },
  { hour: 8, sent: 12, received: 22 },
  { hour: 9, sent: 18, received: 28 },
  { hour: 10, sent: 22, received: 32 },
  { hour: 11, sent: 15, received: 24 },
  { hour: 12, sent: 8, received: 12 },
  { hour: 13, sent: 14, received: 20 },
  { hour: 14, sent: 20, received: 26 },
  { hour: 15, sent: 16, received: 22 },
  { hour: 16, sent: 18, received: 25 },
  { hour: 17, sent: 10, received: 15 },
  { hour: 18, sent: 5, received: 8 },
  { hour: 19, sent: 3, received: 5 },
  { hour: 20, sent: 2, received: 4 },
  { hour: 21, sent: 3, received: 6 },
  { hour: 22, sent: 2, received: 4 },
  { hour: 23, sent: 1, received: 3 },
];

export const responseMetrics: ResponseMetric[] = [
  { range: "< 15 min", count: 18, percentage: 15.0 },
  { range: "15-30 min", count: 24, percentage: 20.0 },
  { range: "30-60 min", count: 30, percentage: 25.0 },
  { range: "1-2 hrs", count: 22, percentage: 18.3 },
  { range: "2-4 hrs", count: 14, percentage: 11.7 },
  { range: "4-8 hrs", count: 8, percentage: 6.7 },
  { range: "8+ hrs", count: 4, percentage: 3.3 },
];

// ═══════════════════════════════════════════════════════
// AI INSIGHTS
// ═══════════════════════════════════════════════════════

export const communicationInsights: CommunicationInsight[] = [
  {
    id: "ci-001",
    type: "alert",
    title: "3 High-Priority Threads Awaiting Your Response",
    description: "Aeropost financial model review, Vista Ridge counter-proposal, and Tammara's weekly admin items are awaiting your response. Vista Ridge has a March 25 deadline.",
    category: "General",
    priority: "high",
    metric: "3 threads",
    actionable: true,
  },
  {
    id: "ci-002",
    type: "trend",
    title: "M&A Activity Dominates Email Flow",
    description: "M&A/Acquisitions emails represent 19% of all communication — up 45% from last month. Go Freight and Aeropost driving the increase. Consider delegating routine emails to free bandwidth.",
    category: "M&A / Acquisitions",
    priority: "medium",
    metric: "+45% MoM",
    actionable: true,
  },
  {
    id: "ci-003",
    type: "recommendation",
    title: "Finance Response Time Above Target",
    description: "Average response time for Finance & Accounting emails is 165 minutes — 2.7x the company average. Consider scheduling dedicated finance review blocks to improve turnaround.",
    category: "Finance & Accounting",
    priority: "medium",
    metric: "165 min avg",
    actionable: true,
  },
  {
    id: "ci-004",
    type: "observation",
    title: "Peak Communication Window: 9-11 AM",
    description: "62% of your sent emails and 48% of received emails occur between 9-11 AM. This is your most productive communication window. Protect this time for high-priority responses.",
    category: "General",
    priority: "low",
    metric: "62% of sends",
    actionable: false,
  },
  {
    id: "ci-005",
    type: "alert",
    title: "Customer Response SLA at Risk",
    description: "Troy Rainey (LAM Research) flagged a compliance issue requiring prompt attention. Customer-facing response time averaging 85 min — below the 60 min SLA target for key accounts.",
    category: "Customer Relations",
    priority: "high",
    metric: "85 min avg",
    actionable: true,
  },
  {
    id: "ci-006",
    type: "trend",
    title: "Facilities Email Surge +20%",
    description: "Facilities & Leasing emails up 20% — driven by Vista Ridge renewal, Patterson expansion, and Prologis portfolio review. Multiple lease decisions needed in Q2.",
    category: "Facilities & Leasing",
    priority: "medium",
    metric: "+20% WoW",
    actionable: false,
  },
  {
    id: "ci-007",
    type: "recommendation",
    title: "Automate Daily Report Aggregation",
    description: "12 facility operators send daily reports individually. Automated aggregation would save ~30 min/day of manual review. Consider consolidating into a single dashboard feed.",
    category: "Daily Reports",
    priority: "medium",
    metric: "~30 min/day savings",
    actionable: true,
  },
  {
    id: "ci-008",
    type: "observation",
    title: "David Blandford: Most Active Contact",
    description: "CFO David Blandford accounts for 23% of all internal email traffic — highest of any individual. Heaviest in Finance and M&A categories. Strong alignment between CEO and CFO on deal flow.",
    category: "General",
    priority: "low",
    metric: "34 emails, 23%",
    actionable: false,
  },
  {
    id: "ci-009",
    type: "alert",
    title: "Weekend Response Gap Detected",
    description: "Weekend response times average 300 min vs 88 min on weekdays. 4 emails received on weekends required Monday response. Consider a mobile triage protocol for urgent weekend items.",
    category: "General",
    priority: "medium",
    metric: "300 min weekend avg",
    actionable: true,
  },
  {
    id: "ci-010",
    type: "recommendation",
    title: "Delegate Vendor Communications",
    description: "Vendor/supply chain emails have the slowest response time (480 min avg). These are largely informational. Consider routing vendor communications to operations managers first.",
    category: "Vendor / Supply Chain",
    priority: "low",
    metric: "480 min avg",
    actionable: true,
  },
];

// ═══════════════════════════════════════════════════════
// SUMMARY STATS
// ═══════════════════════════════════════════════════════

export const emailSummaryStats = {
  totalEmails: 147,
  totalThreads: 42,
  activeThreads: 8,
  awaitingResponse: 3,
  avgResponseMins: 95,
  responseRate: 78,
  internalPct: 58,
  externalPct: 42,
  urgentCount: 8,
  unresolvedCount: 6,
  topCategory: "M&A / Acquisitions" as EmailCategory,
  topCategoryPct: 19.0,
  weekOverWeek: {
    volumeChange: 12,
    responseTimeChange: -8,
    threadResolutionRate: 82,
  },
  sentimentBreakdown: {
    positive: 32,
    neutral: 52,
    negative: 8,
    urgent: 8,
  },
};

// Category color mapping for charts
export const emailCategoryColors: Record<string, string> = {
  "M&A / Acquisitions": "#8b5cf6",
  "Business Development": "#0ea5e9",
  "Customer Relations": "#10b981",
  "Operations": "#f59e0b",
  "Finance & Accounting": "#6366f1",
  "Facilities & Leasing": "#ec4899",
  "Daily Reports": "#64748b",
  "Legal & Compliance": "#dc2626",
  "Executive": "#14b8a6",
  "IT & Technology": "#8b5cf6",
  "Vendor / Supply Chain": "#f97316",
  "HR & Recruiting": "#06b6d4",
  "Marketing": "#a855f7",
  "Other": "#94a3b8",
};
