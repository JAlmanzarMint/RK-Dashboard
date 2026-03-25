import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  emailMarketingKPIs,
  recentCampaigns,
  automationSequences,
  audienceSegments,
  deliverabilityTrend,
  abTests,
  emailTemplates,
  campaignPerformanceTrend,
  segmentPerformance,
  contentPerformance,
} from "@/lib/emailMarketingData";
import {
  Users, Mail, MousePointerClick, ShieldCheck,
  ArrowUpRight, ArrowDownRight,
  Zap, Send, Clock, FileText, BarChart3,
  CheckCircle2, AlertCircle, Target,
  Inbox, Bug, Activity, Award,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, Area,
  ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend,
} from "recharts";

// ─── Color constants ────────────────────────────────────────
const TEAL = "#0f766e";
const AMBER = "#f59e0b";
const SLATE = "#64748b";
const EMERALD = "#10b981";

// ─── Sections ───────────────────────────────────────────────
const sections = [
  { key: "overview", label: "Overview" },
  { key: "campaigns", label: "Campaigns" },
  { key: "automations", label: "Automations" },
  { key: "audiences", label: "Audiences" },
  { key: "deliverability", label: "Deliverability" },
  { key: "abtests", label: "A/B Tests" },
  { key: "templates", label: "Templates" },
] as const;

type SectionKey = (typeof sections)[number]["key"];

// ─── Badge helpers ──────────────────────────────────────────
const campaignStatusClasses: Record<string, string> = {
  sent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  scheduled: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  draft: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
  sending: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

const automationStatusClasses: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  paused: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  draft: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
};

const abTestStatusClasses: Record<string, string> = {
  complete: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  running: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  scheduled: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

const templateTypeClasses: Record<string, string> = {
  prospecting: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
  newsletter: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  event: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  "case-study": "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  "ceo-letter": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
};

// ─── Trend indicator ────────────────────────────────────────
function TrendBadge({ value, suffix = "%" }: { value: number; suffix?: string }) {
  const positive = value >= 0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-medium ${
        positive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
      }`}
    >
      {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
      {positive ? "+" : ""}
      {Math.round(value * 10) / 10}
      {suffix}
    </span>
  );
}

// ─── KPI Card ───────────────────────────────────────────────
function KpiCard({
  icon: Icon,
  label,
  value,
  trend,
  trendSuffix = "%",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  trend: number;
  trendSuffix?: string;
}) {
  return (
    <Card className="border border-border">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 rounded-lg bg-teal-500/10">
            <Icon className="h-4 w-4 text-teal-600 dark:text-teal-400" />
          </div>
          <TrendBadge value={trend} suffix={trendSuffix} />
        </div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
      </CardContent>
    </Card>
  );
}

// ─── Custom tooltip for charts ──────────────────────────────
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-lg shadow-lg p-3 text-xs">
      <p className="font-medium text-foreground mb-1">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.dataKey} style={{ color: entry.color }}>
          {entry.name}: {entry.value}
          {entry.dataKey !== "subscribers" && entry.dataKey !== "senderScore" ? "%" : ""}
        </p>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Section: Overview
// ═══════════════════════════════════════════════════════════
function OverviewSection() {
  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          icon={Users}
          label="Total Subscribers"
          value={emailMarketingKPIs.totalSubscribers.toLocaleString()}
          trend={emailMarketingKPIs.subscriberGrowth}
        />
        <KpiCard
          icon={Mail}
          label="Avg Open Rate"
          value={`${emailMarketingKPIs.avgOpenRate}%`}
          trend={emailMarketingKPIs.openRateTrend}
          trendSuffix=" pts"
        />
        <KpiCard
          icon={MousePointerClick}
          label="Avg Click Rate"
          value={`${emailMarketingKPIs.avgClickRate}%`}
          trend={emailMarketingKPIs.clickRateTrend}
          trendSuffix=" pts"
        />
        <KpiCard
          icon={ShieldCheck}
          label="Deliverability Score"
          value={`${emailMarketingKPIs.deliverabilityScore}%`}
          trend={emailMarketingKPIs.deliverabilityTrend}
          trendSuffix=" pts"
        />
      </div>

      {/* Campaign Performance Trend Chart */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            Campaign Performance Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72" data-testid="chart-campaign-performance">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={campaignPerformanceTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 11 }}
                  className="text-muted-foreground"
                  domain={[0, 50]}
                  label={{ value: "Rate %", angle: -90, position: "insideLeft", style: { fontSize: 11 } }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 11 }}
                  className="text-muted-foreground"
                  domain={[3000, 5500]}
                  label={{ value: "Subscribers", angle: 90, position: "insideRight", style: { fontSize: 11 } }}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="avgOpen"
                  stroke={TEAL}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="Open Rate %"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="avgClick"
                  stroke={AMBER}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="Click Rate %"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="subscribers"
                  stroke={SLATE}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3 }}
                  name="Subscribers"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Segment Performance Bar Chart */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Target className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            Segment Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64" data-testid="chart-segment-performance">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={segmentPerformance} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis type="number" tick={{ fontSize: 11 }} className="text-muted-foreground" domain={[0, 50]} />
                <YAxis
                  type="category"
                  dataKey="segment"
                  tick={{ fontSize: 11 }}
                  className="text-muted-foreground"
                  width={90}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="openRate" fill={TEAL} name="Open Rate %" radius={[0, 4, 4, 0]} barSize={14} />
                <Bar dataKey="clickRate" fill={AMBER} name="Click Rate %" radius={[0, 4, 4, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Content Performance Table */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <FileText className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            Content Performance by Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content Type</TableHead>
                <TableHead className="text-right"># Sent</TableHead>
                <TableHead className="text-right">Avg Open</TableHead>
                <TableHead className="text-right">Avg Click</TableHead>
                <TableHead>Best Subject Line</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contentPerformance.map((cp) => (
                <TableRow key={cp.type} data-testid={`content-perf-row-${cp.type}`}>
                  <TableCell className="font-medium">{cp.type}</TableCell>
                  <TableCell className="text-right">{cp.sent}</TableCell>
                  <TableCell className="text-right">{cp.avgOpen}%</TableCell>
                  <TableCell className="text-right">{cp.avgClick}%</TableCell>
                  <TableCell className="text-muted-foreground text-xs max-w-xs truncate">{cp.bestSubject}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Section: Campaigns
// ═══════════════════════════════════════════════════════════
function CampaignsSection() {
  return (
    <div className="space-y-4">
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Send className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            Recent Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Segment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Recipients</TableHead>
                <TableHead className="text-right">Open Rate</TableHead>
                <TableHead className="text-right">Click Rate</TableHead>
                <TableHead className="text-right">Bounce</TableHead>
                <TableHead>Sent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentCampaigns.map((c) => (
                <TableRow
                  key={c.id}
                  className="hover:bg-muted/50 transition-colors"
                  data-testid={`campaign-row-${c.id}`}
                >
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{c.name}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-xs">{c.subject}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {c.segment}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs capitalize ${campaignStatusClasses[c.status] || ""}`}
                    >
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{c.recipients.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    {c.status === "draft" || c.status === "scheduled" ? "—" : `${c.openRate}%`}
                  </TableCell>
                  <TableCell className="text-right">
                    {c.status === "draft" || c.status === "scheduled" ? "—" : `${c.clickRate}%`}
                  </TableCell>
                  <TableCell className="text-right">
                    {c.status === "draft" || c.status === "scheduled" ? "—" : `${c.bounceRate}%`}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {c.sentDate
                      ? c.status === "scheduled"
                        ? `Scheduled ${c.sentDate}`
                        : c.sentDate
                      : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Section: Automations
// ═══════════════════════════════════════════════════════════
function AutomationsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {automationSequences.map((a) => (
        <Card key={a.id} className="border border-border" data-testid={`automation-card-${a.id}`}>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-foreground">{a.name}</h3>
              <Badge
                variant="outline"
                className={`text-xs capitalize ${automationStatusClasses[a.status] || ""}`}
              >
                {a.status}
              </Badge>
            </div>

            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Trigger: {a.trigger}
            </p>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-muted/50 rounded-lg p-2">
                <p className="text-lg font-bold text-foreground">{a.emailCount}</p>
                <p className="text-[10px] text-muted-foreground">Emails</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2">
                <p className="text-lg font-bold text-foreground">{a.activeContacts}</p>
                <p className="text-[10px] text-muted-foreground">Active</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2">
                <p className="text-lg font-bold text-foreground">{a.completedContacts}</p>
                <p className="text-[10px] text-muted-foreground">Completed</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Open Rate</span>
                <span className="font-medium">{a.avgOpenRate}%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Click Rate</span>
                <span className="font-medium">{a.avgClickRate}%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Conversion Rate</span>
                <span className="font-medium">{a.conversionRate}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                <div
                  className="h-1.5 rounded-full bg-teal-500"
                  style={{ width: `${Math.min(a.conversionRate, 100)}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Section: Audiences
// ═══════════════════════════════════════════════════════════
function AudiencesSection() {
  const totalSubs = audienceSegments.reduce((s, seg) => s + seg.count, 0);

  return (
    <div className="space-y-4">
      {/* Total subscribers */}
      <Card className="border border-border">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-teal-500/10">
            <Users className="h-5 w-5 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{totalSubs.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Subscribers Across All Segments</p>
          </div>
        </CardContent>
      </Card>

      {/* Segment table */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Target className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            Audience Segments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Segment</TableHead>
                <TableHead className="text-right">Subscribers</TableHead>
                <TableHead className="text-right">Growth (30d)</TableHead>
                <TableHead>Engagement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {audienceSegments.map((seg) => (
                <TableRow
                  key={seg.name}
                  className={seg.topSegment ? "bg-teal-500/5" : ""}
                  data-testid={`audience-row-${seg.name}`}
                >
                  <TableCell className="font-medium">
                    <span className="flex items-center gap-1.5">
                      {seg.name}
                      {seg.topSegment && (
                        <Badge
                          variant="outline"
                          className="text-[10px] bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20"
                        >
                          Top
                        </Badge>
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{seg.count.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        seg.growth >= 0
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                      }`}
                    >
                      {seg.growth >= 0 ? "+" : ""}
                      {seg.growth}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            seg.avgEngagement >= 70
                              ? "bg-emerald-500"
                              : seg.avgEngagement >= 50
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${seg.avgEngagement}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8 text-right">
                        {seg.avgEngagement}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Section: Deliverability
// ═══════════════════════════════════════════════════════════
const deliverabilityChecks = [
  { label: "SPF Record", ok: true },
  { label: "DKIM Signing", ok: true },
  { label: "DMARC Policy", ok: true },
  { label: "List Hygiene", ok: true },
  { label: "Domain Verified", ok: true },
];

function DeliverabilitySection() {
  const latest = deliverabilityTrend[deliverabilityTrend.length - 1];

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          icon={Inbox}
          label="Inbox Placement"
          value={`${latest.inboxPlacement}%`}
          trend={latest.inboxPlacement - deliverabilityTrend[deliverabilityTrend.length - 2].inboxPlacement}
          trendSuffix=" pts"
        />
        <KpiCard
          icon={AlertCircle}
          label="Bounce Rate"
          value={`${latest.bounceRate}%`}
          trend={deliverabilityTrend[deliverabilityTrend.length - 2].bounceRate - latest.bounceRate}
          trendSuffix=" pts"
        />
        <KpiCard
          icon={Bug}
          label="Spam Rate"
          value={`${latest.spamRate}%`}
          trend={deliverabilityTrend[deliverabilityTrend.length - 2].spamRate - latest.spamRate}
          trendSuffix=" pts"
        />
        <KpiCard
          icon={Activity}
          label="Sender Score"
          value={`${latest.senderScore}`}
          trend={latest.senderScore - deliverabilityTrend[deliverabilityTrend.length - 2].senderScore}
          trendSuffix=" pts"
        />
      </div>

      {/* Deliverability Trend Chart */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            Deliverability Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72" data-testid="chart-deliverability-trend">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={deliverabilityTrend}>
                <defs>
                  <linearGradient id="gradTeal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={TEAL} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={TEAL} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradSlate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={SLATE} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={SLATE} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 11 }}
                  className="text-muted-foreground"
                  domain={[60, 100]}
                  label={{ value: "Inbox / Score", angle: -90, position: "insideLeft", style: { fontSize: 11 } }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 11 }}
                  className="text-muted-foreground"
                  domain={[0, 5]}
                  label={{ value: "Spam / Bounce %", angle: 90, position: "insideRight", style: { fontSize: 11 } }}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="inboxPlacement"
                  stroke={TEAL}
                  fill="url(#gradTeal)"
                  strokeWidth={2}
                  name="Inbox Placement %"
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="senderScore"
                  stroke={SLATE}
                  fill="url(#gradSlate)"
                  strokeWidth={2}
                  name="Sender Score"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="spamRate"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="Spam Rate %"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="bounceRate"
                  stroke={AMBER}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="Bounce Rate %"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Health Checklist */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            Domain Health Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {deliverabilityChecks.map((check) => (
              <div
                key={check.label}
                className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20"
                data-testid={`health-check-${check.label}`}
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span className="text-xs font-medium text-foreground">{check.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Section: A/B Tests
// ═══════════════════════════════════════════════════════════
function ABTestsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {abTests.map((test) => (
        <Card key={test.id} className="border border-border" data-testid={`abtest-card-${test.id}`}>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm text-foreground">{test.campaign}</h3>
                <p className="text-xs text-muted-foreground">
                  Variable: <span className="font-medium">{test.variable}</span>
                </p>
              </div>
              <Badge
                variant="outline"
                className={`text-xs capitalize ${abTestStatusClasses[test.status] || ""}`}
              >
                {test.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Variant A */}
              <div
                className={`p-3 rounded-lg border text-xs ${
                  test.winner === "A"
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : "bg-muted/50 border-border"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">Variant A</span>
                  {test.winner === "A" && (
                    <Award className="h-3.5 w-3.5 text-emerald-500" />
                  )}
                </div>
                <p className="text-muted-foreground line-clamp-2">{test.variantA}</p>
                {test.status !== "scheduled" && (
                  <p className="mt-1 font-bold text-foreground">
                    {test.variantAResult}%
                  </p>
                )}
              </div>

              {/* Variant B */}
              <div
                className={`p-3 rounded-lg border text-xs ${
                  test.winner === "B"
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : "bg-muted/50 border-border"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">Variant B</span>
                  {test.winner === "B" && (
                    <Award className="h-3.5 w-3.5 text-emerald-500" />
                  )}
                </div>
                <p className="text-muted-foreground line-clamp-2">{test.variantB}</p>
                {test.status !== "scheduled" && (
                  <p className="mt-1 font-bold text-foreground">
                    {test.variantBResult}%
                  </p>
                )}
              </div>
            </div>

            {/* Confidence */}
            {test.status !== "scheduled" && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="font-medium">{test.confidence}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      test.confidence >= 95 ? "bg-emerald-500" : test.confidence >= 80 ? "bg-amber-500" : "bg-red-500"
                    }`}
                    style={{ width: `${test.confidence}%` }}
                  />
                </div>
              </div>
            )}

            {test.status === "scheduled" && (
              <p className="text-xs text-muted-foreground italic flex items-center gap-1">
                <Clock className="h-3 w-3" /> Test not yet started
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Section: Templates
// ═══════════════════════════════════════════════════════════
function TemplatesSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {emailTemplates.map((tmpl) => (
        <Card key={tmpl.id} className="border border-border" data-testid={`template-card-${tmpl.id}`}>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-foreground">{tmpl.name}</h3>
              <Badge
                variant="outline"
                className={`text-xs capitalize ${templateTypeClasses[tmpl.type] || ""}`}
              >
                {tmpl.type.replace("-", " ")}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Last: {tmpl.lastUsed}
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                Used {tmpl.usageCount}x
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <p className="text-lg font-bold text-foreground">{tmpl.openRate}%</p>
                <p className="text-[10px] text-muted-foreground">Open Rate</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <p className="text-lg font-bold text-foreground">{tmpl.clickRate}%</p>
                <p className="text-[10px] text-muted-foreground">Click Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════
export default function EmailMarketingTab() {
  const [activeSection, setActiveSection] = useState<SectionKey>("overview");

  return (
    <div className="space-y-6">
      {/* Section tabs */}
      <div className="flex flex-wrap gap-1 border-b border-border pb-2">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            data-testid={`email-mkt-tab-${s.key}`}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeSection === s.key
                ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20"
                : "text-muted-foreground hover:bg-muted/50 border border-transparent"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Section content */}
      {activeSection === "overview" && <OverviewSection />}
      {activeSection === "campaigns" && <CampaignsSection />}
      {activeSection === "automations" && <AutomationsSection />}
      {activeSection === "audiences" && <AudiencesSection />}
      {activeSection === "deliverability" && <DeliverabilitySection />}
      {activeSection === "abtests" && <ABTestsSection />}
      {activeSection === "templates" && <TemplatesSection />}
    </div>
  );
}
