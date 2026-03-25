import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Mail, Activity, Building2, Users2, Clock, ShieldCheck, SmilePlus,
  Radio, AlertTriangle, TrendingUp, TrendingDown, Minus, ArrowUpRight,
  ArrowDownRight, BarChart3, Send, Inbox, MessageSquare, Eye, MousePointerClick,
  Heart, Frown, Meh, Zap, BellRing, CheckCircle2, XCircle, Info,
  ArrowRight, ChevronRight, Timer, Gauge,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, AreaChart, Area, PieChart, Pie, Cell, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, RadialBarChart, RadialBar,
} from "recharts";
import {
  companyTenets, overallPulseScore, dailyEmailMetrics, facilityEmailStats,
  departmentPulses, slaTiers, weeklySentiment, hourlyDistribution,
  topCommFlows, commAlerts, cascadeMetrics, monthlyPulseHistory,
  type PulseTenet, type FacilityEmailStats, type DepartmentPulse,
  type CascadeMetric, type CommAlert,
} from "@/lib/emailPulseData";

// ── Colors ───────────────────────────────────────────
const TEAL = "hsl(174, 72%, 33%)";
const TEAL_LIGHT = "hsl(174, 72%, 45%)";
const TEAL_MUTED = "hsl(174, 50%, 60%)";
const PURPLE = "hsl(262, 60%, 50%)";
const AMBER = "hsl(43, 74%, 49%)";
const BLUE = "hsl(210, 80%, 50%)";
const RED = "hsl(0, 72%, 50%)";
const GREEN = "hsl(142, 60%, 40%)";
const PINK = "hsl(340, 65%, 55%)";
const SLATE = "hsl(215, 20%, 55%)";
const CHART_COLORS = [TEAL, PURPLE, AMBER, BLUE, GREEN, PINK, RED, SLATE];

// ── Tab Definition ───────────────────────────────────
type TabId = "overview" | "volume" | "facilities" | "departments" | "sla" | "sentiment" | "cascade" | "alerts";

const tabs: { id: TabId; label: string; icon: typeof Mail }[] = [
  { id: "overview", label: "Overview", icon: Gauge },
  { id: "volume", label: "Volume", icon: BarChart3 },
  { id: "facilities", label: "Facilities", icon: Building2 },
  { id: "departments", label: "Departments", icon: Users2 },
  { id: "sla", label: "SLA", icon: ShieldCheck },
  { id: "sentiment", label: "Sentiment", icon: SmilePlus },
  { id: "cascade", label: "Cascade", icon: Radio },
  { id: "alerts", label: "Alerts", icon: BellRing },
];

// ── Helpers ──────────────────────────────────────────
function TrendIcon({ trend }: { trend: "up" | "down" | "stable" | "improving" | "declining" }) {
  if (trend === "up" || trend === "improving") return <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />;
  if (trend === "down" || trend === "declining") return <TrendingDown className="w-3.5 h-3.5 text-red-500" />;
  return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
}

function SeverityBadge({ severity }: { severity: CommAlert["severity"] }) {
  const styles = {
    critical: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${styles[severity]}`}>
      {severity}
    </span>
  );
}

function ScoreGauge({ score, label, size = "lg" }: { score: number; label: string; size?: "sm" | "lg" }) {
  const color = score >= 80 ? GREEN : score >= 65 ? AMBER : RED;
  const dim = size === "lg" ? 120 : 80;
  const stroke = size === "lg" ? 10 : 7;
  const r = (dim - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const progress = (score / 100) * circ;

  return (
    <div className="flex flex-col items-center">
      <svg width={dim} height={dim} className="-rotate-90">
        <circle cx={dim / 2} cy={dim / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-muted/20" />
        <circle cx={dim / 2} cy={dim / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={circ - progress}
          strokeLinecap="round" className="transition-all duration-700"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: dim, height: dim }}>
        <span className={`font-bold tabular-nums ${size === "lg" ? "text-2xl" : "text-base"}`}>{score}</span>
        {size === "lg" && <span className="text-[10px] text-muted-foreground font-medium">/ 100</span>}
      </div>
      <span className={`mt-1 font-medium text-muted-foreground ${size === "lg" ? "text-xs" : "text-[10px]"}`}>{label}</span>
    </div>
  );
}

function KpiCard({ label, value, sub, icon: Icon, trend }: {
  label: string; value: string; sub?: string; icon: typeof Mail; trend?: "up" | "down" | "stable";
}) {
  return (
    <Card className="border-border/60">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{label}</div>
            <div className="text-xl font-bold tabular-nums mt-0.5">{value}</div>
            {sub && <div className="text-[11px] text-muted-foreground mt-0.5">{sub}</div>}
          </div>
          <div className="flex items-center gap-1.5">
            {trend && <TrendIcon trend={trend} />}
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Overview Tab ──────────────────────────────────────
function OverviewTab() {
  const avgResponse = Math.round(dailyEmailMetrics.reduce((s, d) => s + d.avgResponseMin, 0) / dailyEmailMetrics.length);
  const totalSent = dailyEmailMetrics.reduce((s, d) => s + d.sent, 0);
  const totalReceived = dailyEmailMetrics.reduce((s, d) => s + d.received, 0);
  const totalUnresponded = dailyEmailMetrics.reduce((s, d) => s + d.unresponded, 0);
  const avgSla = Math.round(slaTiers.reduce((s, t) => s + t.compliancePct * t.volume, 0) / slaTiers.reduce((s, t) => s + t.volume, 0));
  const latestSentiment = weeklySentiment[weeklySentiment.length - 1];
  const critAlerts = commAlerts.filter(a => a.severity === "critical").length;

  return (
    <div className="space-y-6">
      {/* Pulse Score Hero */}
      <Card className="border-border/60 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="relative">
              <ScoreGauge score={overallPulseScore} label="Overall Pulse" size="lg" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold mb-1">Company Communication Pulse</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Inspired by Coinbase's Dot Collector — real-time feedback on organizational communication health across 6 cultural tenets.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {companyTenets.map((t) => (
                  <div key={t.name} className="rounded-lg bg-muted/40 p-2.5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <TrendIcon trend={t.trend} />
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider truncate">{t.name}</span>
                    </div>
                    <div className="flex items-end gap-1.5">
                      <span className="text-lg font-bold tabular-nums">{t.score}</span>
                      <span className="text-[10px] text-muted-foreground pb-0.5">/100</span>
                    </div>
                    <Progress value={t.score} className="h-1 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard label="Avg Response" value={`${avgResponse} min`} sub="2.1h avg" icon={Timer} trend="up" />
        <KpiCard label="SLA Compliance" value={`${avgSla}%`} sub="Weighted avg" icon={ShieldCheck} trend="up" />
        <KpiCard label="Sentiment" value={`${latestSentiment.overallScore}`} sub={`${latestSentiment.positive}% positive`} icon={Heart} trend="up" />
        <KpiCard label="Open Alerts" value={`${critAlerts} critical`} sub={`${commAlerts.length} total`} icon={BellRing} trend={critAlerts > 0 ? "down" : "stable"} />
      </div>

      {/* Monthly Trend */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">Pulse Score Trend (8-Month)</div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyPulseHistory}>
                <defs>
                  <linearGradient id="pulseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={TEAL} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={TEAL} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215,20%,85%)" opacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(215,20%,65%)" />
                <YAxis domain={[60, 85]} tick={{ fontSize: 10 }} stroke="hsl(215,20%,65%)" />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(215,20%,85%)" }} />
                <Area type="monotone" dataKey="pulseScore" stroke={TEAL} fill="url(#pulseGrad)" strokeWidth={2} name="Pulse Score" />
                <Line type="monotone" dataKey="slaCompliance" stroke={PURPLE} strokeWidth={1.5} dot={false} name="SLA %" />
                <Line type="monotone" dataKey="sentimentScore" stroke={AMBER} strokeWidth={1.5} dot={false} name="Sentiment" />
                <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 10 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Alerts Preview */}
      {critAlerts > 0 && (
        <Card className="border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-xs font-bold text-red-700 dark:text-red-300">Critical Alerts Requiring Attention</span>
            </div>
            <div className="space-y-2">
              {commAlerts.filter(a => a.severity === "critical").map((a) => (
                <div key={a.id} className="flex items-start gap-3 bg-background/80 rounded-lg p-3 border border-border/50">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold">{a.facility}: {a.message}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{a.metric}: {a.value} • {a.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ── Volume Tab ───────────────────────────────────────
function VolumeTab() {
  const todayData = dailyEmailMetrics[dailyEmailMetrics.length - 1];
  const yesterdayData = dailyEmailMetrics[dailyEmailMetrics.length - 2];

  return (
    <div className="space-y-6">
      {/* Today KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard label="Sent Today" value={todayData.sent.toLocaleString()} sub={`vs ${yesterdayData.sent.toLocaleString()} yesterday`} icon={Send} trend="up" />
        <KpiCard label="Received Today" value={todayData.received.toLocaleString()} sub={`vs ${yesterdayData.received.toLocaleString()} yesterday`} icon={Inbox} trend="stable" />
        <KpiCard label="Avg Response" value={`${todayData.avgResponseMin} min`} sub={`${(todayData.avgResponseMin / 60).toFixed(1)}h`} icon={Timer} trend="up" />
        <KpiCard label="Unresponded" value={`${todayData.unresponded}`} sub="Past 24 hours" icon={MessageSquare} trend={todayData.unresponded < yesterdayData.unresponded ? "up" : "down"} />
      </div>

      {/* Daily Volume Chart */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">Daily Email Volume (2-Week)</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyEmailMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215,20%,85%)" opacity={0.3} />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(215,20%,65%)" />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(215,20%,65%)" />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(215,20%,85%)" }} />
                <Bar dataKey="sent" name="Sent" fill={TEAL} radius={[2, 2, 0, 0]} />
                <Bar dataKey="received" name="Received" fill={TEAL_MUTED} radius={[2, 2, 0, 0]} />
                <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 10 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Hourly Distribution */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">Peak Hours Distribution</div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyDistribution}>
                <defs>
                  <linearGradient id="sentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={TEAL} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={TEAL} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="recGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={PURPLE} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={PURPLE} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215,20%,85%)" opacity={0.3} />
                <XAxis dataKey="hour" tick={{ fontSize: 10 }} stroke="hsl(215,20%,65%)" />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(215,20%,65%)" />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(215,20%,85%)" }} />
                <Area type="monotone" dataKey="sent" name="Sent" stroke={TEAL} fill="url(#sentGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="received" name="Received" stroke={PURPLE} fill="url(#recGrad)" strokeWidth={2} />
                <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 10 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
            <Info className="w-3 h-3" /> Peak sending: 9am–10am | Peak receiving: 9am | Lowest activity: 6pm–7pm
          </div>
        </CardContent>
      </Card>

      {/* Response Time Trend */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">Response Time Trend (min)</div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyEmailMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215,20%,85%)" opacity={0.3} />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(215,20%,65%)" />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(215,20%,65%)" />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(215,20%,85%)" }} />
                <Line type="monotone" dataKey="avgResponseMin" stroke={AMBER} strokeWidth={2} dot={{ r: 3 }} name="Avg Response (min)" />
                <Line type="monotone" dataKey="unresponded" stroke={RED} strokeWidth={1.5} dot={{ r: 2 }} name="Unresponded" />
                <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 10 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Facilities Tab ───────────────────────────────────
function FacilitiesTab() {
  const [sortKey, setSortKey] = useState<keyof FacilityEmailStats>("slaCompliancePct");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sorted = useMemo(() => {
    return [...facilityEmailStats].sort((a, b) => {
      const aVal = a[sortKey] as number;
      const bVal = b[sortKey] as number;
      return sortDir === "desc" ? bVal - aVal : aVal - bVal;
    });
  }, [sortKey, sortDir]);

  const toggleSort = (key: keyof FacilityEmailStats) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const SortHeader = ({ k, label }: { k: keyof FacilityEmailStats; label: string }) => (
    <TableHead className="text-[10px] cursor-pointer hover:text-foreground select-none" onClick={() => toggleSort(k)}>
      <div className="flex items-center gap-1">
        {label}
        {sortKey === k && <ChevronRight className={`w-3 h-3 transition-transform ${sortDir === "desc" ? "rotate-90" : "-rotate-90"}`} />}
      </div>
    </TableHead>
  );

  return (
    <div className="space-y-6">
      {/* Facility Comparison Chart */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">Facility SLA vs Sentiment</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={facilityEmailStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215,20%,85%)" opacity={0.3} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} stroke="hsl(215,20%,65%)" />
                <YAxis type="category" dataKey="facility" width={85} tick={{ fontSize: 10 }} stroke="hsl(215,20%,65%)" />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(215,20%,85%)" }} />
                <Bar dataKey="slaCompliancePct" name="SLA %" fill={TEAL} radius={[0, 2, 2, 0]} barSize={10} />
                <Bar dataKey="sentimentScore" name="Sentiment" fill={PURPLE} radius={[0, 2, 2, 0]} barSize={10} />
                <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 10 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Communication Flows */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">Top Communication Flows (Daily Avg)</div>
          <div className="space-y-2">
            {topCommFlows.map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-xs">
                <span className="font-medium w-24 text-right truncate">{f.from}</span>
                <div className="flex-1 relative h-5">
                  <div className="absolute inset-y-0 left-0 bg-primary/15 rounded-full"
                    style={{ width: `${(f.volume / topCommFlows[0].volume) * 100}%` }}
                  />
                  <div className="absolute inset-y-0 flex items-center left-2">
                    <ArrowRight className="w-3 h-3 text-primary" />
                  </div>
                </div>
                <span className="font-medium w-24 truncate">{f.to}</span>
                <span className="tabular-nums text-muted-foreground w-12 text-right">{f.volume}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Table */}
      <Card className="border-border/60">
        <CardContent className="p-0">
          <div className="px-4 pt-4 pb-2 text-xs font-bold">Facility Detail</div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[10px]">Facility</TableHead>
                  <SortHeader k="dailyAvgSent" label="Sent/Day" />
                  <SortHeader k="avgResponseMin" label="Resp (min)" />
                  <SortHeader k="slaCompliancePct" label="SLA %" />
                  <SortHeader k="sentimentScore" label="Sentiment" />
                  <SortHeader k="unrespondedCount" label="Unresolved" />
                  <SortHeader k="crossFacilityPct" label="Cross-Fac %" />
                  <SortHeader k="clientEmailPct" label="Client %" />
                  <TableHead className="text-[10px]">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((f) => (
                  <TableRow key={f.facility}>
                    <TableCell className="text-xs font-medium">{f.facility}</TableCell>
                    <TableCell className="text-xs tabular-nums">{f.dailyAvgSent}</TableCell>
                    <TableCell className="text-xs tabular-nums">
                      <span className={f.avgResponseMin > 140 ? "text-red-500" : f.avgResponseMin > 120 ? "text-amber-500" : ""}>{f.avgResponseMin}</span>
                    </TableCell>
                    <TableCell className="text-xs tabular-nums">
                      <span className={f.slaCompliancePct < 75 ? "text-red-500 font-semibold" : f.slaCompliancePct < 80 ? "text-amber-500" : "text-emerald-600 dark:text-emerald-400"}>
                        {f.slaCompliancePct}%
                      </span>
                    </TableCell>
                    <TableCell className="text-xs tabular-nums">{f.sentimentScore}</TableCell>
                    <TableCell className="text-xs tabular-nums">
                      <span className={f.unrespondedCount > 6 ? "text-red-500 font-semibold" : ""}>{f.unrespondedCount}</span>
                    </TableCell>
                    <TableCell className="text-xs tabular-nums">{f.crossFacilityPct}%</TableCell>
                    <TableCell className="text-xs tabular-nums">{f.clientEmailPct}%</TableCell>
                    <TableCell><TrendIcon trend={f.trend} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Departments Tab ──────────────────────────────────
function DepartmentsTab() {
  const radarData = departmentPulses.map(d => ({
    dept: d.department.length > 12 ? d.department.slice(0, 12) + "…" : d.department,
    sentiment: d.sentimentScore,
    collaboration: d.collaborationScore,
    eNPS: Math.max(0, d.eNPS),
  }));

  return (
    <div className="space-y-6">
      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {departmentPulses.map((d) => {
          const burnoutColor = d.burnoutRisk === "high" ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
            : d.burnoutRisk === "moderate" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
            : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
          return (
            <Card key={d.department} className="border-border/60">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs font-bold">{d.department}</div>
                    <div className="text-[10px] text-muted-foreground">{d.headCount} people</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${burnoutColor}`}>
                    {d.burnoutRisk} risk
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <div className="text-muted-foreground">Email/Person/Day</div>
                    <div className="font-bold text-sm tabular-nums">{d.emailsPerPersonDay}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Avg Response</div>
                    <div className="font-bold text-sm tabular-nums">{d.avgResponseMin} min</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Sentiment</div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-sm tabular-nums">{d.sentimentScore}</span>
                      <Progress value={d.sentimentScore} className="h-1 flex-1" />
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Collaboration</div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-sm tabular-nums">{d.collaborationScore}</span>
                      <Progress value={d.collaborationScore} className="h-1 flex-1" />
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Mtg Load / Week</div>
                    <div className="font-bold text-sm tabular-nums">{d.meetingLoadHrsWeek}h</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">eNPS</div>
                    <div className={`font-bold text-sm tabular-nums ${d.eNPS < 30 ? "text-red-500" : d.eNPS < 50 ? "text-amber-500" : "text-emerald-600 dark:text-emerald-400"}`}>
                      {d.eNPS}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Radar Chart */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">Department Health Radar</div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="70%">
                <PolarGrid stroke="hsl(215,20%,80%)" />
                <PolarAngleAxis dataKey="dept" tick={{ fontSize: 9 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name="Sentiment" dataKey="sentiment" stroke={TEAL} fill={TEAL} fillOpacity={0.15} />
                <Radar name="Collaboration" dataKey="collaboration" stroke={PURPLE} fill={PURPLE} fillOpacity={0.1} />
                <Radar name="eNPS" dataKey="eNPS" stroke={AMBER} fill={AMBER} fillOpacity={0.1} />
                <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(215,20%,85%)" }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── SLA Tab ──────────────────────────────────────────
function SlaTab() {
  return (
    <div className="space-y-6">
      {/* SLA Tier Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {slaTiers.map((s) => {
          const met = s.currentAvgMin <= s.targetMin;
          const pct = s.compliancePct;
          const color = pct >= 90 ? "text-emerald-600 dark:text-emerald-400" : pct >= 80 ? "text-amber-500" : "text-red-500";
          return (
            <Card key={s.category} className="border-border/60">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-xs font-bold">{s.category}</div>
                  {met
                    ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    : <AlertTriangle className="w-4 h-4 text-amber-500" />
                  }
                </div>
                <div className="flex items-end gap-2 mb-2">
                  <span className={`text-2xl font-bold tabular-nums ${color}`}>{pct}%</span>
                  <span className="text-[10px] text-muted-foreground pb-1">compliance</span>
                </div>
                <Progress value={pct} className="h-1.5 mb-3" />
                <div className="grid grid-cols-3 gap-2 text-[10px]">
                  <div>
                    <div className="text-muted-foreground">Target</div>
                    <div className="font-semibold">{s.target}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Current Avg</div>
                    <div className="font-semibold">{s.currentAvgMin} min</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Volume</div>
                    <div className="font-semibold tabular-nums">{s.volume.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* SLA Overview Chart */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">SLA Compliance by Category</div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={slaTiers}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215,20%,85%)" opacity={0.3} />
                <XAxis dataKey="category" tick={{ fontSize: 9 }} stroke="hsl(215,20%,65%)" interval={0} angle={-12} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 10 }} stroke="hsl(215,20%,65%)" />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(215,20%,85%)" }} />
                <Bar dataKey="compliancePct" name="Compliance %" radius={[4, 4, 0, 0]}>
                  {slaTiers.map((s, i) => (
                    <Cell key={i} fill={s.compliancePct >= 90 ? GREEN : s.compliancePct >= 80 ? AMBER : RED} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Monthly SLA Trend */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">SLA Compliance Trend (Monthly)</div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyPulseHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215,20%,85%)" opacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(215,20%,65%)" />
                <YAxis domain={[70, 90]} tick={{ fontSize: 10 }} stroke="hsl(215,20%,65%)" />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(215,20%,85%)" }} />
                <Line type="monotone" dataKey="slaCompliance" stroke={TEAL} strokeWidth={2} dot={{ r: 3, fill: TEAL }} name="SLA Compliance %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Sentiment Tab ────────────────────────────────────
function SentimentTab() {
  const latest = weeklySentiment[weeklySentiment.length - 1];
  const sentimentDistrib = [
    { name: "Positive", value: latest.positive, color: GREEN },
    { name: "Neutral", value: latest.neutral, color: SLATE },
    { name: "Negative", value: latest.negative, color: RED },
  ];

  return (
    <div className="space-y-6">
      {/* Sentiment Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="border-border/60">
          <CardContent className="p-4 flex flex-col items-center">
            <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Current Week</div>
            <div className="h-40 w-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={sentimentDistrib} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={3}>
                    {sentimentDistrib.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(215,20%,85%)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-3 text-[10px] mt-2">
              {sentimentDistrib.map(s => (
                <div key={s.name} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span>{s.name}: {s.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 lg:col-span-2">
          <CardContent className="p-4">
            <div className="text-xs font-bold mb-3">Weekly Sentiment Breakdown</div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklySentiment}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(215,20%,85%)" opacity={0.3} />
                  <XAxis dataKey="week" tick={{ fontSize: 10 }} stroke="hsl(215,20%,65%)" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(215,20%,65%)" />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(215,20%,85%)" }} />
                  <Area type="monotone" dataKey="positive" stackId="1" stroke={GREEN} fill={GREEN} fillOpacity={0.5} name="Positive %" />
                  <Area type="monotone" dataKey="neutral" stackId="1" stroke={SLATE} fill={SLATE} fillOpacity={0.3} name="Neutral %" />
                  <Area type="monotone" dataKey="negative" stackId="1" stroke={RED} fill={RED} fillOpacity={0.4} name="Negative %" />
                  <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 10 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sentiment by Facility */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">Sentiment Score by Facility</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...facilityEmailStats].sort((a, b) => b.sentimentScore - a.sentimentScore)}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215,20%,85%)" opacity={0.3} />
                <XAxis dataKey="facility" tick={{ fontSize: 9 }} stroke="hsl(215,20%,65%)" interval={0} angle={-20} />
                <YAxis domain={[60, 90]} tick={{ fontSize: 10 }} stroke="hsl(215,20%,65%)" />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(215,20%,85%)" }} />
                <Bar dataKey="sentimentScore" name="Sentiment" radius={[4, 4, 0, 0]}>
                  {[...facilityEmailStats].sort((a, b) => b.sentimentScore - a.sentimentScore).map((f, i) => (
                    <Cell key={i} fill={f.sentimentScore >= 80 ? GREEN : f.sentimentScore >= 75 ? AMBER : RED} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Sentiment Score Trend */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">Overall Sentiment Trend (Monthly)</div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyPulseHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215,20%,85%)" opacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(215,20%,65%)" />
                <YAxis domain={[65, 85]} tick={{ fontSize: 10 }} stroke="hsl(215,20%,65%)" />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(215,20%,85%)" }} />
                <Line type="monotone" dataKey="sentimentScore" stroke={TEAL} strokeWidth={2} dot={{ r: 3, fill: TEAL }} name="Sentiment Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Cascade Tab ──────────────────────────────────────
function CascadeTab() {
  return (
    <div className="space-y-6">
      {/* Cascade Funnel */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-1">Message Engagement Cascade</div>
          <div className="text-[10px] text-muted-foreground mb-4">How far company communications travel: Sent → Opened → Read → Action Taken</div>
          <div className="space-y-3">
            {cascadeMetrics.map((c, i) => (
              <div key={c.messageType}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">{c.messageType}</span>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{c.openRate.toFixed(0)}%</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />{c.readRate.toFixed(0)}%</span>
                    <span className="flex items-center gap-1"><MousePointerClick className="w-3 h-3" />{c.actionRate.toFixed(0)}%</span>
                  </div>
                </div>
                <div className="flex gap-0.5 h-3">
                  <div className="bg-primary/20 rounded-l-sm" style={{ width: `${c.openRate}%` }} />
                  <div className="bg-primary/40" style={{ width: `${c.readRate - (100 - c.openRate) > 0 ? c.readRate * c.openRate / 100 : c.readRate}%` }} />
                  <div className="bg-primary rounded-r-sm" style={{ width: `${c.actionRate}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-[10px] text-muted-foreground">
            <div className="flex items-center gap-1"><div className="w-3 h-2 bg-primary/20 rounded-sm" /> Opened</div>
            <div className="flex items-center gap-1"><div className="w-3 h-2 bg-primary/40 rounded-sm" /> Read</div>
            <div className="flex items-center gap-1"><div className="w-3 h-2 bg-primary rounded-sm" /> Action</div>
          </div>
        </CardContent>
      </Card>

      {/* Cascade Detail Table */}
      <Card className="border-border/60">
        <CardContent className="p-0">
          <div className="px-4 pt-4 pb-2 text-xs font-bold">Cascade Detail</div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[10px]">Message Type</TableHead>
                  <TableHead className="text-[10px]">Sent</TableHead>
                  <TableHead className="text-[10px]">Opened</TableHead>
                  <TableHead className="text-[10px]">Read</TableHead>
                  <TableHead className="text-[10px]">Action</TableHead>
                  <TableHead className="text-[10px]">Open Rate</TableHead>
                  <TableHead className="text-[10px]">Read Rate</TableHead>
                  <TableHead className="text-[10px]">Action Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cascadeMetrics.map((c) => (
                  <TableRow key={c.messageType}>
                    <TableCell className="text-xs font-medium">{c.messageType}</TableCell>
                    <TableCell className="text-xs tabular-nums">{c.totalSent}</TableCell>
                    <TableCell className="text-xs tabular-nums">{c.opened}</TableCell>
                    <TableCell className="text-xs tabular-nums">{c.readFully}</TableCell>
                    <TableCell className="text-xs tabular-nums">{c.clickedAction}</TableCell>
                    <TableCell className="text-xs tabular-nums">
                      <span className={c.openRate >= 85 ? "text-emerald-600 dark:text-emerald-400" : c.openRate >= 70 ? "text-amber-500" : "text-red-500"}>
                        {c.openRate.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell className="text-xs tabular-nums">
                      <span className={c.readRate >= 70 ? "text-emerald-600 dark:text-emerald-400" : c.readRate >= 50 ? "text-amber-500" : "text-red-500"}>
                        {c.readRate.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell className="text-xs tabular-nums">
                      <span className={c.actionRate >= 40 ? "text-emerald-600 dark:text-emerald-400" : c.actionRate >= 25 ? "text-amber-500" : "text-red-500"}>
                        {c.actionRate.toFixed(1)}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Chart */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">Engagement Rates by Message Type</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cascadeMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215,20%,85%)" opacity={0.3} />
                <XAxis dataKey="messageType" tick={{ fontSize: 9 }} stroke="hsl(215,20%,65%)" interval={0} angle={-15} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} stroke="hsl(215,20%,65%)" />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(215,20%,85%)" }} />
                <Bar dataKey="openRate" name="Open %" fill={TEAL_MUTED} radius={[2, 2, 0, 0]} />
                <Bar dataKey="readRate" name="Read %" fill={TEAL} radius={[2, 2, 0, 0]} />
                <Bar dataKey="actionRate" name="Action %" fill={PURPLE} radius={[2, 2, 0, 0]} />
                <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 10 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Alerts Tab ───────────────────────────────────────
function AlertsTab() {
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all");
  const filtered = filter === "all" ? commAlerts : commAlerts.filter(a => a.severity === filter);
  const counts = {
    critical: commAlerts.filter(a => a.severity === "critical").length,
    warning: commAlerts.filter(a => a.severity === "warning").length,
    info: commAlerts.filter(a => a.severity === "info").length,
  };

  return (
    <div className="space-y-6">
      {/* Filter Chips */}
      <div className="flex items-center gap-2 flex-wrap">
        {(["all", "critical", "warning", "info"] as const).map((f) => {
          const active = filter === f;
          const count = f === "all" ? commAlerts.length : counts[f];
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
              data-testid={`alert-filter-${f}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)} ({count})
            </button>
          );
        })}
      </div>

      {/* Alert Cards */}
      <div className="space-y-3">
        {filtered.map((a) => (
          <Card key={a.id} className={`border-border/60 ${a.severity === "critical" ? "border-l-4 border-l-red-500" : a.severity === "warning" ? "border-l-4 border-l-amber-500" : "border-l-4 border-l-blue-400"}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  {a.severity === "critical" ? <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    : a.severity === "warning" ? <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    : <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  }
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold">{a.facility}</span>
                      <SeverityBadge severity={a.severity} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{a.message}</p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Activity className="w-3 h-3" />{a.metric}: {a.value}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Insight */}
      <Card className="border-border/60 bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Zap className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-bold mb-1">Communication Health Insight</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Kato and Whitmore Lake facilities show consistent SLA underperformance with high unresponded counts.
                Consider implementing automated escalation for emails exceeding 2-hour response times at these locations.
                Patterson's SLA decline correlates with a 15% increase in inbound client volume — additional staffing may be needed.
                OTT (Farmingdale) continues to lead with 91% SLA compliance, serving as a benchmark for best practices.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Main Component ───────────────────────────────────
export default function EmailPulse() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Company Email Pulse
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time communication health analytics — inspired by Coinbase, Microsoft Viva Insights, and EmailAnalytics
          </p>
        </div>
        <Badge variant="outline" className="text-[10px] font-medium border-primary/30 text-primary">
          Live
        </Badge>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
        {tabs.map((t) => {
          const active = activeTab === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              data-testid={`tab-${t.id}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "volume" && <VolumeTab />}
      {activeTab === "facilities" && <FacilitiesTab />}
      {activeTab === "departments" && <DepartmentsTab />}
      {activeTab === "sla" && <SlaTab />}
      {activeTab === "sentiment" && <SentimentTab />}
      {activeTab === "cascade" && <CascadeTab />}
      {activeTab === "alerts" && <AlertsTab />}
    </div>
  );
}
