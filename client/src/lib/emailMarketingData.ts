// Email Marketing Dashboard Data
// Mailchimp integration data for RK Logistics Group

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  status: "sent" | "scheduled" | "draft" | "sending";
  type: "regular" | "automated" | "absplit" | "rss";
  segment: string;
  sentDate: string;
  recipients: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  unsubscribeRate: number;
  revenue?: number;
}

export interface AutomationSequence {
  id: string;
  name: string;
  status: "active" | "paused" | "draft";
  trigger: string;
  emailCount: number;
  activeContacts: number;
  completedContacts: number;
  avgOpenRate: number;
  avgClickRate: number;
  conversionRate: number;
}

export interface AudienceSegment {
  name: string;
  count: number;
  growth: number; // % change last 30 days
  avgEngagement: number; // 0-100
  topSegment: boolean;
}

export interface DeliverabilityMetric {
  date: string;
  inboxPlacement: number;
  spamRate: number;
  bounceRate: number;
  senderScore: number;
}

export interface ABTest {
  id: string;
  campaign: string;
  variable: string;
  variantA: string;
  variantB: string;
  winnerMetric: string;
  winner: "A" | "B" | "pending";
  variantAResult: number;
  variantBResult: number;
  confidence: number;
  status: "running" | "complete" | "scheduled";
}

export interface EmailTemplate {
  id: string;
  name: string;
  type: "prospecting" | "newsletter" | "event" | "case-study" | "ceo-letter";
  lastUsed: string;
  openRate: number;
  clickRate: number;
  usageCount: number;
}

// ────────────────────────────────────────
// KPI Summary
// ────────────────────────────────────────
export const emailMarketingKPIs = {
  totalSubscribers: 4847,
  subscriberGrowth: 8.3,
  avgOpenRate: 34.2,
  openRateTrend: 2.1,
  avgClickRate: 4.8,
  clickRateTrend: 0.6,
  bounceRate: 0.9,
  bounceTrend: -0.3,
  deliverabilityScore: 91,
  deliverabilityTrend: 1.5,
  campaignsSentThisMonth: 6,
  automationActive: 4,
  listHealthScore: 87,
  emailROI: 38.5, // $ per $1 spent
};

// ────────────────────────────────────────
// Recent Campaigns
// ────────────────────────────────────────
export const recentCampaigns: EmailCampaign[] = [
  {
    id: "c001",
    name: "Q1 Semiconductor Supply Chain Outlook",
    subject: "3 Supply Chain Shifts Every Semiconductor Leader Should Watch in 2026",
    status: "sent",
    type: "regular",
    segment: "Semiconductor Equipment",
    sentDate: "2026-03-18",
    recipients: 1243,
    openRate: 38.7,
    clickRate: 6.2,
    bounceRate: 0.8,
    unsubscribeRate: 0.1,
    revenue: 45000,
  },
  {
    id: "c002",
    name: "EV Battery Storage Solutions",
    subject: "How EV Manufacturers Are Rethinking Battery Logistics",
    status: "sent",
    type: "regular",
    segment: "EV / Battery",
    sentDate: "2026-03-12",
    recipients: 876,
    openRate: 31.4,
    clickRate: 4.1,
    bounceRate: 1.2,
    unsubscribeRate: 0.2,
  },
  {
    id: "c003",
    name: "March Customer Newsletter",
    subject: "Inside RK Logistics: New Capabilities, Customer Wins & Industry Intel",
    status: "sent",
    type: "regular",
    segment: "All Active",
    sentDate: "2026-03-05",
    recipients: 3421,
    openRate: 29.8,
    clickRate: 3.5,
    bounceRate: 0.7,
    unsubscribeRate: 0.15,
  },
  {
    id: "c004",
    name: "SEMICON West 2026 Save the Date",
    subject: "Meet RK Logistics at SEMICON West — Booth 2847",
    status: "scheduled",
    type: "regular",
    segment: "Semiconductor Equipment",
    sentDate: "2026-04-02",
    recipients: 1540,
    openRate: 0,
    clickRate: 0,
    bounceRate: 0,
    unsubscribeRate: 0,
  },
  {
    id: "c005",
    name: "Subject Line A/B: Facility Tour Invite",
    subject: "A: See Inside Our Fremont Facility | B: Your Supply Chain's New Home",
    status: "sent",
    type: "absplit",
    segment: "California Prospects",
    sentDate: "2026-03-20",
    recipients: 684,
    openRate: 42.1,
    clickRate: 7.8,
    bounceRate: 0.4,
    unsubscribeRate: 0.1,
  },
  {
    id: "c006",
    name: "Corning Case Study",
    subject: "How Corning Achieved 99.7% Inventory Accuracy with RK Logistics",
    status: "sent",
    type: "regular",
    segment: "Glass / Tech",
    sentDate: "2026-02-28",
    recipients: 312,
    openRate: 36.5,
    clickRate: 5.4,
    bounceRate: 0.6,
    unsubscribeRate: 0.0,
  },
  {
    id: "c007",
    name: "Q2 Industry Trends Report",
    subject: "The State of 3PL: What's Changed and What's Next",
    status: "draft",
    type: "regular",
    segment: "All Prospects",
    sentDate: "",
    recipients: 2890,
    openRate: 0,
    clickRate: 0,
    bounceRate: 0,
    unsubscribeRate: 0,
  },
];

// ────────────────────────────────────────
// Automation Sequences
// ────────────────────────────────────────
export const automationSequences: AutomationSequence[] = [
  {
    id: "a001",
    name: "Welcome Series",
    status: "active",
    trigger: "New subscriber added",
    emailCount: 5,
    activeContacts: 127,
    completedContacts: 843,
    avgOpenRate: 52.3,
    avgClickRate: 8.7,
    conversionRate: 12.4,
  },
  {
    id: "a002",
    name: "Prospect Nurture — Semiconductor",
    status: "active",
    trigger: "Tagged 'semiconductor' + downloaded content",
    emailCount: 8,
    activeContacts: 89,
    completedContacts: 312,
    avgOpenRate: 41.6,
    avgClickRate: 6.3,
    conversionRate: 8.1,
  },
  {
    id: "a003",
    name: "Prospect Nurture — EV/Battery",
    status: "active",
    trigger: "Tagged 'ev-battery' + downloaded content",
    emailCount: 8,
    activeContacts: 54,
    completedContacts: 178,
    avgOpenRate: 37.2,
    avgClickRate: 5.1,
    conversionRate: 6.8,
  },
  {
    id: "a004",
    name: "Customer Onboarding",
    status: "active",
    trigger: "Tagged 'customer-active'",
    emailCount: 4,
    activeContacts: 12,
    completedContacts: 67,
    avgOpenRate: 68.4,
    avgClickRate: 14.2,
    conversionRate: 89.5,
  },
  {
    id: "a005",
    name: "Re-Engagement",
    status: "paused",
    trigger: "No opens in 90+ days",
    emailCount: 3,
    activeContacts: 0,
    completedContacts: 234,
    avgOpenRate: 18.7,
    avgClickRate: 2.1,
    conversionRate: 11.3,
  },
  {
    id: "a006",
    name: "Job Change Trigger",
    status: "active",
    trigger: "Job change detected (dashboard alert)",
    emailCount: 2,
    activeContacts: 8,
    completedContacts: 43,
    avgOpenRate: 61.2,
    avgClickRate: 22.4,
    conversionRate: 34.9,
  },
];

// ────────────────────────────────────────
// Audience Segments
// ────────────────────────────────────────
export const audienceSegments: AudienceSegment[] = [
  { name: "Semiconductor Equipment", count: 1243, growth: 5.2, avgEngagement: 72, topSegment: true },
  { name: "EV / Battery", count: 876, growth: 12.8, avgEngagement: 64, topSegment: true },
  { name: "Electronics / AI", count: 534, growth: 18.3, avgEngagement: 58, topSegment: false },
  { name: "Glass / Tech", count: 312, growth: 3.1, avgEngagement: 67, topSegment: false },
  { name: "Existing Customers", count: 487, growth: 2.4, avgEngagement: 81, topSegment: true },
  { name: "C-Suite Contacts", count: 298, growth: 7.6, avgEngagement: 45, topSegment: false },
  { name: "Supply Chain Leaders", count: 1034, growth: 9.4, avgEngagement: 69, topSegment: true },
  { name: "OTT Carrier Partners", count: 163, growth: 4.8, avgEngagement: 73, topSegment: false },
  { name: "California Prospects", count: 1876, growth: 6.1, avgEngagement: 62, topSegment: false },
  { name: "Trade Show Contacts", count: 724, growth: -2.3, avgEngagement: 38, topSegment: false },
];

// ────────────────────────────────────────
// Deliverability Trend
// ────────────────────────────────────────
export const deliverabilityTrend: DeliverabilityMetric[] = [
  { date: "Oct 2025", inboxPlacement: 82, spamRate: 3.1, bounceRate: 2.4, senderScore: 72 },
  { date: "Nov 2025", inboxPlacement: 84, spamRate: 2.7, bounceRate: 2.1, senderScore: 75 },
  { date: "Dec 2025", inboxPlacement: 86, spamRate: 2.2, bounceRate: 1.8, senderScore: 78 },
  { date: "Jan 2026", inboxPlacement: 88, spamRate: 1.8, bounceRate: 1.4, senderScore: 82 },
  { date: "Feb 2026", inboxPlacement: 90, spamRate: 1.2, bounceRate: 1.0, senderScore: 86 },
  { date: "Mar 2026", inboxPlacement: 91, spamRate: 0.9, bounceRate: 0.9, senderScore: 88 },
];

// ────────────────────────────────────────
// A/B Tests
// ────────────────────────────────────────
export const abTests: ABTest[] = [
  {
    id: "t001",
    campaign: "Facility Tour Invite",
    variable: "Subject Line",
    variantA: "See Inside Our Fremont Facility",
    variantB: "Your Supply Chain's New Home",
    winnerMetric: "Open Rate",
    winner: "B",
    variantAResult: 35.2,
    variantBResult: 42.1,
    confidence: 97.3,
    status: "complete",
  },
  {
    id: "t002",
    campaign: "Semiconductor Outreach",
    variable: "Sender Name",
    variantA: "RK Logistics",
    variantB: "Joe Arezone, RK Logistics",
    winnerMetric: "Open Rate",
    winner: "B",
    variantAResult: 28.4,
    variantBResult: 38.7,
    confidence: 99.1,
    status: "complete",
  },
  {
    id: "t003",
    campaign: "Case Study Email",
    variable: "CTA Button",
    variantA: "Learn More",
    variantB: "See the Full Results",
    winnerMetric: "Click Rate",
    winner: "B",
    variantAResult: 3.8,
    variantBResult: 5.4,
    confidence: 94.6,
    status: "complete",
  },
  {
    id: "t004",
    campaign: "Q2 Industry Trends",
    variable: "Send Time",
    variantA: "Tuesday 9:00 AM",
    variantB: "Thursday 10:30 AM",
    winnerMetric: "Open Rate",
    winner: "pending",
    variantAResult: 0,
    variantBResult: 0,
    confidence: 0,
    status: "scheduled",
  },
];

// ────────────────────────────────────────
// Email Templates
// ────────────────────────────────────────
export const emailTemplates: EmailTemplate[] = [
  { id: "tmpl-001", name: "Prospecting — Industry Intro", type: "prospecting", lastUsed: "2026-03-18", openRate: 37.4, clickRate: 5.8, usageCount: 14 },
  { id: "tmpl-002", name: "Monthly Newsletter", type: "newsletter", lastUsed: "2026-03-05", openRate: 29.8, clickRate: 3.5, usageCount: 8 },
  { id: "tmpl-003", name: "Trade Show Invite", type: "event", lastUsed: "2026-02-15", openRate: 41.2, clickRate: 8.9, usageCount: 5 },
  { id: "tmpl-004", name: "Case Study Spotlight", type: "case-study", lastUsed: "2026-02-28", openRate: 36.5, clickRate: 5.4, usageCount: 6 },
  { id: "tmpl-005", name: "CEO Executive Letter", type: "ceo-letter", lastUsed: "2026-01-15", openRate: 44.8, clickRate: 3.2, usageCount: 3 },
];

// ────────────────────────────────────────
// Campaign Performance Over Time (last 6 months)
// ────────────────────────────────────────
export const campaignPerformanceTrend = [
  { month: "Oct 2025", campaigns: 4, avgOpen: 24.3, avgClick: 2.8, subscribers: 3420 },
  { month: "Nov 2025", campaigns: 5, avgOpen: 27.1, avgClick: 3.2, subscribers: 3680 },
  { month: "Dec 2025", campaigns: 3, avgOpen: 25.8, avgClick: 3.0, subscribers: 3890 },
  { month: "Jan 2026", campaigns: 5, avgOpen: 30.4, avgClick: 3.9, subscribers: 4120 },
  { month: "Feb 2026", campaigns: 6, avgOpen: 32.6, avgClick: 4.4, subscribers: 4475 },
  { month: "Mar 2026", campaigns: 6, avgOpen: 34.2, avgClick: 4.8, subscribers: 4847 },
];

// ────────────────────────────────────────
// Segment Performance Comparison
// ────────────────────────────────────────
export const segmentPerformance = [
  { segment: "Semiconductor", openRate: 38.7, clickRate: 6.2, conversion: 8.1, size: 1243 },
  { segment: "EV / Battery", openRate: 31.4, clickRate: 4.1, conversion: 6.8, size: 876 },
  { segment: "Electronics", openRate: 28.9, clickRate: 3.8, conversion: 5.2, size: 534 },
  { segment: "Glass / Tech", openRate: 36.5, clickRate: 5.4, conversion: 7.3, size: 312 },
  { segment: "Customers", openRate: 44.2, clickRate: 8.6, conversion: 12.4, size: 487 },
  { segment: "OTT Partners", openRate: 39.1, clickRate: 7.2, conversion: 9.8, size: 163 },
];

// ────────────────────────────────────────
// Content Performance by Type
// ────────────────────────────────────────
export const contentPerformance = [
  { type: "Thought Leadership", sent: 12, avgOpen: 32.4, avgClick: 4.1, bestSubject: "3 Supply Chain Shifts Every Semiconductor Leader Should Watch" },
  { type: "Case Studies", sent: 6, avgOpen: 36.5, avgClick: 5.4, bestSubject: "How Corning Achieved 99.7% Inventory Accuracy" },
  { type: "Event Invites", sent: 5, avgOpen: 41.2, avgClick: 8.9, bestSubject: "Meet RK Logistics at SEMICON West — Booth 2847" },
  { type: "Newsletter", sent: 6, avgOpen: 29.8, avgClick: 3.5, bestSubject: "Inside RK Logistics: New Capabilities & Industry Intel" },
  { type: "CEO Letters", sent: 3, avgOpen: 44.8, avgClick: 3.2, bestSubject: "A Note from Joe: Where 3PL Is Headed in 2026" },
  { type: "Product Updates", sent: 4, avgOpen: 27.6, avgClick: 4.8, bestSubject: "New: Real-Time Inventory Visibility for Your Facility" },
];
