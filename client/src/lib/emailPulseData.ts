// ──────────────────────────────────────────────────────
// Company Email Pulse — Communication Health Analytics
// Inspired by: Coinbase real-time feedback (Dot Collector),
// Microsoft Viva Insights, EmailAnalytics, Humanyze
// ──────────────────────────────────────────────────────

// ── Company Pulse Score (Coinbase-style tenets) ─────
export interface PulseTenet {
  name: string;
  score: number; // 0-100
  trend: "up" | "down" | "stable";
  description: string;
}

export const companyTenets: PulseTenet[] = [
  { name: "Clear Communication", score: 78, trend: "up", description: "Messages are concise, actionable, and reach the right people" },
  { name: "Efficient Execution", score: 72, trend: "stable", description: "Email threads resolved quickly without excessive back-and-forth" },
  { name: "Positive Energy", score: 85, trend: "up", description: "Tone and sentiment across internal emails is constructive" },
  { name: "Cross-Facility Collaboration", score: 64, trend: "down", description: "Communication flow between facilities and departments" },
  { name: "Response Discipline", score: 71, trend: "up", description: "Emails answered within SLA windows (internal <24h, client <4h)" },
  { name: "Transparency", score: 82, trend: "stable", description: "Key information cascaded to all relevant stakeholders" },
];

export const overallPulseScore = Math.round(companyTenets.reduce((s, t) => s + t.score, 0) / companyTenets.length);

// ── Email Volume & Response Time Metrics ────────────
export interface DailyEmailMetric {
  date: string;
  sent: number;
  received: number;
  avgResponseMin: number;
  unresponded: number;
}

export const dailyEmailMetrics: DailyEmailMetric[] = [
  { date: "Mar 3", sent: 842, received: 1105, avgResponseMin: 127, unresponded: 34 },
  { date: "Mar 4", sent: 915, received: 1198, avgResponseMin: 118, unresponded: 28 },
  { date: "Mar 5", sent: 878, received: 1067, avgResponseMin: 135, unresponded: 41 },
  { date: "Mar 6", sent: 963, received: 1243, avgResponseMin: 112, unresponded: 22 },
  { date: "Mar 7", sent: 801, received: 982, avgResponseMin: 145, unresponded: 38 },
  { date: "Mar 10", sent: 934, received: 1187, avgResponseMin: 121, unresponded: 29 },
  { date: "Mar 11", sent: 889, received: 1134, avgResponseMin: 129, unresponded: 33 },
  { date: "Mar 12", sent: 957, received: 1210, avgResponseMin: 115, unresponded: 25 },
  { date: "Mar 13", sent: 1012, received: 1298, avgResponseMin: 108, unresponded: 19 },
  { date: "Mar 14", sent: 847, received: 1045, avgResponseMin: 138, unresponded: 36 },
  { date: "Mar 17", sent: 978, received: 1256, avgResponseMin: 119, unresponded: 27 },
  { date: "Mar 18", sent: 521, received: 687, avgResponseMin: 105, unresponded: 14 },
];

// ── Facility Communication Breakdown ────────────────
export interface FacilityEmailStats {
  facility: string;
  location: string;
  dailyAvgSent: number;
  dailyAvgReceived: number;
  avgResponseMin: number;
  slaCompliancePct: number; // % of emails answered within SLA
  sentimentScore: number; // 0-100
  unrespondedCount: number;
  topSender: string;
  crossFacilityPct: number; // % of emails going to other facilities
  clientEmailPct: number; // % external/client emails
  internalAlertCount: number; // flagged/urgent messages this week
  trend: "improving" | "declining" | "stable";
}

export const facilityEmailStats: FacilityEmailStats[] = [
  { facility: "Mowry", location: "Fremont, CA", dailyAvgSent: 145, dailyAvgReceived: 198, avgResponseMin: 95, slaCompliancePct: 89, sentimentScore: 82, unrespondedCount: 3, topSender: "James Bryant", crossFacilityPct: 34, clientEmailPct: 28, internalAlertCount: 2, trend: "improving" },
  { facility: "Christy", location: "Fremont, CA", dailyAvgSent: 112, dailyAvgReceived: 156, avgResponseMin: 108, slaCompliancePct: 85, sentimentScore: 79, unrespondedCount: 5, topSender: "David Blandford", crossFacilityPct: 31, clientEmailPct: 32, internalAlertCount: 1, trend: "stable" },
  { facility: "Vista Ridge", location: "Lewisville, TX", dailyAvgSent: 98, dailyAvgReceived: 134, avgResponseMin: 125, slaCompliancePct: 78, sentimentScore: 75, unrespondedCount: 7, topSender: "Keith Hochberg", crossFacilityPct: 22, clientEmailPct: 35, internalAlertCount: 3, trend: "declining" },
  { facility: "Hardy", location: "Milpitas, CA", dailyAvgSent: 87, dailyAvgReceived: 118, avgResponseMin: 102, slaCompliancePct: 87, sentimentScore: 81, unrespondedCount: 4, topSender: "Peter O'Donnell", crossFacilityPct: 29, clientEmailPct: 25, internalAlertCount: 0, trend: "improving" },
  { facility: "Patterson", location: "Livermore, CA", dailyAvgSent: 65, dailyAvgReceived: 89, avgResponseMin: 138, slaCompliancePct: 74, sentimentScore: 73, unrespondedCount: 8, topSender: "Facility Operator", crossFacilityPct: 18, clientEmailPct: 22, internalAlertCount: 4, trend: "declining" },
  { facility: "Kato", location: "Fremont, CA", dailyAvgSent: 42, dailyAvgReceived: 58, avgResponseMin: 165, slaCompliancePct: 68, sentimentScore: 70, unrespondedCount: 6, topSender: "Facility Operator", crossFacilityPct: 15, clientEmailPct: 18, internalAlertCount: 2, trend: "declining" },
  { facility: "Hawthorne", location: "Fremont, CA", dailyAvgSent: 78, dailyAvgReceived: 105, avgResponseMin: 112, slaCompliancePct: 83, sentimentScore: 80, unrespondedCount: 3, topSender: "Site Manager", crossFacilityPct: 27, clientEmailPct: 30, internalAlertCount: 1, trend: "stable" },
  { facility: "Whitmore Lake", location: "Whitmore Lake, MI", dailyAvgSent: 54, dailyAvgReceived: 72, avgResponseMin: 148, slaCompliancePct: 72, sentimentScore: 71, unrespondedCount: 9, topSender: "Site Manager", crossFacilityPct: 12, clientEmailPct: 20, internalAlertCount: 3, trend: "declining" },
  { facility: "Hayman", location: "Fremont, CA", dailyAvgSent: 68, dailyAvgReceived: 92, avgResponseMin: 118, slaCompliancePct: 82, sentimentScore: 77, unrespondedCount: 4, topSender: "Site Manager", crossFacilityPct: 25, clientEmailPct: 26, internalAlertCount: 1, trend: "stable" },
  { facility: "Morton", location: "Fremont, CA", dailyAvgSent: 55, dailyAvgReceived: 74, avgResponseMin: 132, slaCompliancePct: 76, sentimentScore: 74, unrespondedCount: 5, topSender: "Site Manager", crossFacilityPct: 20, clientEmailPct: 24, internalAlertCount: 2, trend: "stable" },
  { facility: "Grand", location: "Fremont, CA", dailyAvgSent: 48, dailyAvgReceived: 65, avgResponseMin: 142, slaCompliancePct: 71, sentimentScore: 72, unrespondedCount: 7, topSender: "Site Manager", crossFacilityPct: 16, clientEmailPct: 19, internalAlertCount: 2, trend: "declining" },
  { facility: "Industrial", location: "Fremont, CA", dailyAvgSent: 52, dailyAvgReceived: 70, avgResponseMin: 128, slaCompliancePct: 79, sentimentScore: 76, unrespondedCount: 4, topSender: "Site Manager", crossFacilityPct: 21, clientEmailPct: 23, internalAlertCount: 1, trend: "stable" },
  { facility: "OTT (Farmingdale)", location: "Farmingdale, NY", dailyAvgSent: 134, dailyAvgReceived: 178, avgResponseMin: 88, slaCompliancePct: 91, sentimentScore: 84, unrespondedCount: 2, topSender: "Ruth / Danny", crossFacilityPct: 8, clientEmailPct: 42, internalAlertCount: 0, trend: "improving" },
];

// ── Department Communication Health ─────────────────
export interface DepartmentPulse {
  department: string;
  headCount: number;
  emailsPerPersonDay: number;
  avgResponseMin: number;
  sentimentScore: number;
  collaborationScore: number; // cross-dept communication
  meetingLoadHrsWeek: number;
  burnoutRisk: "low" | "moderate" | "high";
  eNPS: number; // -100 to 100
}

export const departmentPulses: DepartmentPulse[] = [
  { department: "Executive / C-Suite", headCount: 5, emailsPerPersonDay: 68, avgResponseMin: 45, sentimentScore: 88, collaborationScore: 92, meetingLoadHrsWeek: 22, burnoutRisk: "moderate", eNPS: 72 },
  { department: "Operations", headCount: 142, emailsPerPersonDay: 24, avgResponseMin: 135, sentimentScore: 76, collaborationScore: 65, meetingLoadHrsWeek: 8, burnoutRisk: "moderate", eNPS: 42 },
  { department: "Finance / Accounting", headCount: 12, emailsPerPersonDay: 42, avgResponseMin: 78, sentimentScore: 82, collaborationScore: 78, meetingLoadHrsWeek: 14, burnoutRisk: "low", eNPS: 58 },
  { department: "Business Development", headCount: 8, emailsPerPersonDay: 55, avgResponseMin: 62, sentimentScore: 85, collaborationScore: 84, meetingLoadHrsWeek: 18, burnoutRisk: "moderate", eNPS: 65 },
  { department: "Client Services", headCount: 18, emailsPerPersonDay: 48, avgResponseMin: 52, sentimentScore: 80, collaborationScore: 72, meetingLoadHrsWeek: 12, burnoutRisk: "moderate", eNPS: 55 },
  { department: "HR / Recruiting", headCount: 6, emailsPerPersonDay: 38, avgResponseMin: 95, sentimentScore: 84, collaborationScore: 82, meetingLoadHrsWeek: 16, burnoutRisk: "low", eNPS: 62 },
  { department: "IT / Technology", headCount: 8, emailsPerPersonDay: 35, avgResponseMin: 88, sentimentScore: 78, collaborationScore: 70, meetingLoadHrsWeek: 10, burnoutRisk: "low", eNPS: 48 },
  { department: "Warehouse / Floor", headCount: 185, emailsPerPersonDay: 5, avgResponseMin: 240, sentimentScore: 72, collaborationScore: 45, meetingLoadHrsWeek: 2, burnoutRisk: "high", eNPS: 28 },
  { department: "OTT Operations", headCount: 62, emailsPerPersonDay: 18, avgResponseMin: 98, sentimentScore: 81, collaborationScore: 58, meetingLoadHrsWeek: 6, burnoutRisk: "moderate", eNPS: 45 },
  { department: "Marketing", headCount: 4, emailsPerPersonDay: 52, avgResponseMin: 72, sentimentScore: 86, collaborationScore: 88, meetingLoadHrsWeek: 15, burnoutRisk: "low", eNPS: 70 },
];

// ── SLA Compliance Tiers ────────────────────────────
export interface SLATier {
  category: string;
  target: string;
  targetMin: number;
  currentAvgMin: number;
  compliancePct: number;
  volume: number;
}

export const slaTiers: SLATier[] = [
  { category: "Client — Urgent", target: "<1 hour", targetMin: 60, currentAvgMin: 42, compliancePct: 94, volume: 85 },
  { category: "Client — Standard", target: "<4 hours", targetMin: 240, currentAvgMin: 165, compliancePct: 88, volume: 342 },
  { category: "Internal — Exec", target: "<2 hours", targetMin: 120, currentAvgMin: 68, compliancePct: 92, volume: 128 },
  { category: "Internal — Standard", target: "<24 hours", targetMin: 1440, currentAvgMin: 285, compliancePct: 96, volume: 4250 },
  { category: "Vendor / Partner", target: "<8 hours", targetMin: 480, currentAvgMin: 312, compliancePct: 85, volume: 215 },
  { category: "RFQ / Pricing", target: "<4 hours", targetMin: 240, currentAvgMin: 195, compliancePct: 82, volume: 68 },
];

// ── Email Sentiment Trends (weekly) ─────────────────
export interface WeeklySentiment {
  week: string;
  positive: number;
  neutral: number;
  negative: number;
  overallScore: number;
}

export const weeklySentiment: WeeklySentiment[] = [
  { week: "Jan W1", positive: 62, neutral: 30, negative: 8, overallScore: 74 },
  { week: "Jan W2", positive: 60, neutral: 31, negative: 9, overallScore: 72 },
  { week: "Jan W3", positive: 64, neutral: 28, negative: 8, overallScore: 76 },
  { week: "Jan W4", positive: 58, neutral: 32, negative: 10, overallScore: 70 },
  { week: "Feb W1", positive: 63, neutral: 29, negative: 8, overallScore: 75 },
  { week: "Feb W2", positive: 61, neutral: 30, negative: 9, overallScore: 73 },
  { week: "Feb W3", positive: 66, neutral: 27, negative: 7, overallScore: 78 },
  { week: "Feb W4", positive: 59, neutral: 31, negative: 10, overallScore: 71 },
  { week: "Mar W1", positive: 65, neutral: 28, negative: 7, overallScore: 77 },
  { week: "Mar W2", positive: 67, neutral: 26, negative: 7, overallScore: 79 },
  { week: "Mar W3", positive: 68, neutral: 25, negative: 7, overallScore: 80 },
];

// ── Hourly Distribution (peak hours) ────────────────
export interface HourlyVolume {
  hour: string;
  sent: number;
  received: number;
}

export const hourlyDistribution: HourlyVolume[] = [
  { hour: "6am", sent: 12, received: 28 },
  { hour: "7am", sent: 45, received: 78 },
  { hour: "8am", sent: 112, received: 165 },
  { hour: "9am", sent: 148, received: 198 },
  { hour: "10am", sent: 135, received: 175 },
  { hour: "11am", sent: 118, received: 152 },
  { hour: "12pm", sent: 72, received: 95 },
  { hour: "1pm", sent: 105, received: 138 },
  { hour: "2pm", sent: 128, received: 162 },
  { hour: "3pm", sent: 115, received: 145 },
  { hour: "4pm", sent: 95, received: 122 },
  { hour: "5pm", sent: 52, received: 68 },
  { hour: "6pm", sent: 28, received: 42 },
  { hour: "7pm", sent: 15, received: 22 },
];

// ── Communication Flow (facility-to-facility) ───────
export interface CommFlow {
  from: string;
  to: string;
  volume: number; // daily avg emails
}

export const topCommFlows: CommFlow[] = [
  { from: "Mowry", to: "Christy", volume: 42 },
  { from: "Mowry", to: "Hardy", volume: 35 },
  { from: "Christy", to: "Vista Ridge", volume: 28 },
  { from: "Mowry", to: "OTT", volume: 24 },
  { from: "Hardy", to: "Hayman", volume: 22 },
  { from: "Christy", to: "Hawthorne", volume: 20 },
  { from: "Mowry", to: "Patterson", volume: 18 },
  { from: "Vista Ridge", to: "Mowry", volume: 16 },
  { from: "Mowry", to: "Whitmore Lake", volume: 14 },
  { from: "Morton", to: "Grand", volume: 12 },
];

// ── Key Communication Alerts ────────────────────────
export interface CommAlert {
  id: string;
  severity: "critical" | "warning" | "info";
  facility: string;
  message: string;
  metric: string;
  value: string;
  timestamp: string;
}

export const commAlerts: CommAlert[] = [
  { id: "a1", severity: "critical", facility: "Kato", message: "Response time 2.75 hours — above SLA for 3 consecutive days", metric: "Avg Response", value: "165 min", timestamp: "Today 8:12 AM" },
  { id: "a2", severity: "critical", facility: "Whitmore Lake", message: "9 unresponded client emails older than 24 hours", metric: "Unresponded", value: "9 emails", timestamp: "Today 7:45 AM" },
  { id: "a3", severity: "warning", facility: "Patterson", message: "SLA compliance dropped below 75% threshold", metric: "SLA %", value: "74%", timestamp: "Today 6:30 AM" },
  { id: "a4", severity: "warning", facility: "Grand", message: "Cross-facility communication down 22% vs last month", metric: "Cross-Fac %", value: "16%", timestamp: "Yesterday" },
  { id: "a5", severity: "warning", facility: "Warehouse/Floor", message: "Dept eNPS score 28 — lowest in company", metric: "eNPS", value: "28", timestamp: "Mar 15" },
  { id: "a6", severity: "info", facility: "OTT", message: "Best SLA compliance in company — 91% on-time responses", metric: "SLA %", value: "91%", timestamp: "Today" },
  { id: "a7", severity: "info", facility: "Mowry", message: "Sentiment score improved 4 points this week", metric: "Sentiment", value: "82", timestamp: "Today" },
];

// ── Engagement Cascade (message reach) ──────────────
export interface CascadeMetric {
  messageType: string;
  totalSent: number;
  opened: number;
  readFully: number;
  clickedAction: number;
  openRate: number;
  readRate: number;
  actionRate: number;
}

export const cascadeMetrics: CascadeMetric[] = [
  { messageType: "CEO Updates", totalSent: 446, opened: 378, readFully: 312, clickedAction: 145, openRate: 84.8, readRate: 70.0, actionRate: 32.5 },
  { messageType: "Safety Alerts", totalSent: 446, opened: 412, readFully: 389, clickedAction: 268, openRate: 92.4, readRate: 87.2, actionRate: 60.1 },
  { messageType: "HR Announcements", totalSent: 446, opened: 345, readFully: 278, clickedAction: 112, openRate: 77.4, readRate: 62.3, actionRate: 25.1 },
  { messageType: "Ops Daily Reports", totalSent: 185, opened: 168, readFully: 142, clickedAction: 85, openRate: 90.8, readRate: 76.8, actionRate: 45.9 },
  { messageType: "Financial Updates", totalSent: 28, opened: 27, readFully: 25, clickedAction: 18, openRate: 96.4, readRate: 89.3, actionRate: 64.3 },
  { messageType: "Training / Dev", totalSent: 446, opened: 289, readFully: 198, clickedAction: 78, openRate: 64.8, readRate: 44.4, actionRate: 17.5 },
  { messageType: "Client Updates", totalSent: 215, opened: 195, readFully: 172, clickedAction: 128, openRate: 90.7, readRate: 80.0, actionRate: 59.5 },
  { messageType: "IT / Systems", totalSent: 446, opened: 312, readFully: 245, clickedAction: 165, openRate: 70.0, readRate: 54.9, actionRate: 37.0 },
];

// ── Monthly Trend Summary ───────────────────────────
export interface MonthlyPulse {
  month: string;
  pulseScore: number;
  avgResponseMin: number;
  slaCompliance: number;
  sentimentScore: number;
  emailVolume: number;
  unrespondedAvg: number;
}

export const monthlyPulseHistory: MonthlyPulse[] = [
  { month: "Aug 2025", pulseScore: 68, avgResponseMin: 155, slaCompliance: 76, sentimentScore: 71, emailVolume: 18500, unrespondedAvg: 48 },
  { month: "Sep 2025", pulseScore: 70, avgResponseMin: 148, slaCompliance: 78, sentimentScore: 73, emailVolume: 19200, unrespondedAvg: 42 },
  { month: "Oct 2025", pulseScore: 71, avgResponseMin: 142, slaCompliance: 79, sentimentScore: 74, emailVolume: 20100, unrespondedAvg: 39 },
  { month: "Nov 2025", pulseScore: 69, avgResponseMin: 150, slaCompliance: 77, sentimentScore: 72, emailVolume: 18800, unrespondedAvg: 44 },
  { month: "Dec 2025", pulseScore: 67, avgResponseMin: 158, slaCompliance: 75, sentimentScore: 70, emailVolume: 16200, unrespondedAvg: 52 },
  { month: "Jan 2026", pulseScore: 72, avgResponseMin: 138, slaCompliance: 81, sentimentScore: 75, emailVolume: 21400, unrespondedAvg: 35 },
  { month: "Feb 2026", pulseScore: 74, avgResponseMin: 130, slaCompliance: 83, sentimentScore: 77, emailVolume: 22100, unrespondedAvg: 30 },
  { month: "Mar 2026", pulseScore: 75, avgResponseMin: 122, slaCompliance: 85, sentimentScore: 79, emailVolume: 22800, unrespondedAvg: 27 },
];
