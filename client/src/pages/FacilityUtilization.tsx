import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Eye, Activity, Building2, Warehouse, Cpu, DollarSign, Flame, BellRing,
  TrendingUp, TrendingDown, Minus, AlertTriangle, XCircle, Info, Zap,
  Clock, Camera, Users, Forklift, Package, Truck, BarChart3, Grid3x3,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, AreaChart, Area, PieChart, Pie, Cell,
} from "recharts";
import {
  facilityAISummaries, zoneUtilizations, cameraFeeds, aiAlerts,
  utilizationTimeline, hourlyHeatmap, vacancyCosts, networkSummary,
  totalVacancyCostMonthly, totalVacancyCostAnnual, totalExposure,
  type FacilityAISummary, type AIAlert,
} from "@/lib/facilityUtilizationData";

// ── Colors ───────────────────────────────────────────
const TEAL = "hsl(174, 72%, 33%)";
const TEAL_LIGHT = "hsl(174, 72%, 45%)";
const PURPLE = "hsl(262, 60%, 50%)";
const AMBER = "hsl(43, 74%, 49%)";
const BLUE = "hsl(210, 80%, 50%)";
const RED = "hsl(0, 72%, 50%)";
const GREEN = "hsl(142, 60%, 40%)";
const PINK = "hsl(340, 65%, 55%)";

// ── Tab Definition ───────────────────────────────────
type TabId = "overview" | "grid" | "zones" | "detections" | "financial" | "heatmaps" | "alerts";

const tabs: { id: TabId; label: string; icon: typeof Eye }[] = [
  { id: "overview", label: "Overview", icon: Eye },
  { id: "grid", label: "Facility Grid", icon: Grid3x3 },
  { id: "zones", label: "Zone Analysis", icon: Warehouse },
  { id: "detections", label: "AI Detections", icon: Cpu },
  { id: "financial", label: "Financial Impact", icon: DollarSign },
  { id: "heatmaps", label: "Heatmaps", icon: Flame },
  { id: "alerts", label: "Alerts", icon: BellRing },
];

// ── Helpers ──────────────────────────────────────────
function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up" || trend === "improving") return <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />;
  if (trend === "down" || trend === "declining") return <TrendingDown className="w-3.5 h-3.5 text-red-500" />;
  return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
}

function SeverityBadge({ severity }: { severity: AIAlert["severity"] }) {
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

function utilColor(pct: number) {
  if (pct >= 85) return GREEN;
  if (pct >= 50) return AMBER;
  return RED;
}

function utilBg(pct: number) {
  if (pct >= 85) return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
  if (pct >= 50) return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
  return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";
}

function fmtK(n: number) { return n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n / 1_000).toFixed(0)}K` : n.toString(); }
function fmtDollar(n: number) { return n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : n >= 1_000 ? `$${(n / 1_000).toFixed(0)}K` : `$${n}`; }

function ScoreGauge({ score, label, size = "sm" }: { score: number; label: string; size?: "sm" | "lg" }) {
  const color = utilColor(score);
  const dim = size === "lg" ? 100 : 64;
  const stroke = size === "lg" ? 8 : 6;
  const r = (dim - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const progress = (score / 100) * circ;
  return (
    <div className="flex flex-col items-center relative">
      <svg width={dim} height={dim} className="-rotate-90">
        <circle cx={dim / 2} cy={dim / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-muted/20" />
        <circle cx={dim / 2} cy={dim / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={circ - progress}
          strokeLinecap="round" className="transition-all duration-700"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: dim, height: dim }}>
        <span className={`font-bold tabular-nums ${size === "lg" ? "text-xl" : "text-sm"}`}>{score}%</span>
      </div>
      <span className="mt-1 font-medium text-muted-foreground text-[10px]">{label}</span>
    </div>
  );
}

function KpiCard({ label, value, sub, icon: Icon, trend }: {
  label: string; value: string; sub?: string; icon: typeof Eye; trend?: string;
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

// ── Overview Tab ─────────────────────────────────────
function OverviewTab() {
  const sorted = useMemo(() => [...facilityAISummaries].sort((a, b) => b.utilPct - a.utilPct), []);
  const barData = sorted.map(f => ({ name: f.facility, util: f.utilPct }));
  const criticalAlerts = aiAlerts.filter(a => a.severity === "critical");

  return (
    <div className="space-y-4">
      {/* Network KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard label="Overall Utilization" value={`${networkSummary.overallUtilPct}%`} sub={`${networkSummary.facilitiesAtFullCapacity} of 12 at 100%`} icon={BarChart3} trend="up" />
        <KpiCard label="Total Vacant Sqft" value={fmtK(networkSummary.vacantSqft)} sub={`${networkSummary.overallVacancyPct}% vacancy`} icon={Warehouse} trend="down" />
        <KpiCard label="Cameras Online" value={`${networkSummary.camerasOnline}/${networkSummary.totalCameras}`} sub={`${networkSummary.camerasOffline} offline, ${networkSummary.camerasMaintenence} maint`} icon={Camera} />
        <KpiCard label="Avg AI Score" value={`${networkSummary.avgAIScore}`} sub="Network health score" icon={Cpu} trend="up" />
      </div>

      {/* Utilization Bar Chart */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">Facility Utilization — All 12 Facilities</div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ left: 80, right: 20, top: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} tickFormatter={v => `${v}%`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={75} />
                <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="util" radius={[0, 4, 4, 0]} maxBarSize={22}>
                  {barData.map((d, i) => <Cell key={i} fill={utilColor(d.util)} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 30-Day Trend */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">30-Day Utilization Trend</div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={utilizationTimeline} margin={{ left: 0, right: 8, top: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="timestamp" tick={{ fontSize: 10 }} interval={4} />
                <YAxis domain={[78, 86]} tick={{ fontSize: 10 }} tickFormatter={v => `${v}%`} />
                <Tooltip contentStyle={{ fontSize: 12 }} formatter={(v: number) => `${v}%`} />
                <Line type="monotone" dataKey="facilityAvgUtil" stroke={TEAL} strokeWidth={2} dot={false} name="Avg Utilization" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <Card className="border-border/60 border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="text-xs font-bold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              Critical Alerts ({criticalAlerts.length})
            </div>
            <div className="space-y-2">
              {criticalAlerts.map(a => (
                <div key={a.id} className="flex items-start gap-2 text-xs">
                  <XCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold">{a.facility} — {a.zone}:</span>
                    <span className="text-muted-foreground ml-1">{a.message}</span>
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

// ── Facility Grid Tab ────────────────────────────────
function FacilityGridTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {facilityAISummaries.map(f => (
        <Card key={f.facility} className={`border-border/60 ${f.utilPct < 50 ? "border-l-4 border-l-red-500" : ""}`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="min-w-0">
                <div className="text-sm font-bold truncate">{f.facility}</div>
                <div className="text-[10px] text-muted-foreground">{f.location} · {f.customers.join(", ")}</div>
              </div>
              <div className="relative shrink-0">
                <ScoreGauge score={f.utilPct} label="Util" size="sm" />
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { l: "Sqft", v: fmtK(f.totalSqft) },
                { l: "Rack Util", v: `${f.rackUtilPct}%` },
                { l: "Cameras", v: `${f.camerasOnline}/${f.camerasTotal}` },
                { l: "Traffic/day", v: f.dailyTraffic.toString() },
                { l: "AI Score", v: f.aiScore.toString() },
                { l: "Dwell", v: `${f.avgDwellHrs}h` },
              ].map(s => (
                <div key={s.l} className="rounded bg-muted/40 p-1.5 text-center">
                  <div className="text-[10px] text-muted-foreground">{s.l}</div>
                  <div className="text-xs font-bold tabular-nums">{s.v}</div>
                </div>
              ))}
            </div>

            {/* Trend Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <TrendIcon trend={f.trend30d} />
                <span className={`text-[10px] font-semibold capitalize ${
                  f.trend30d === "improving" ? "text-emerald-600" : f.trend30d === "declining" ? "text-red-600" : "text-muted-foreground"
                }`}>{f.trend30d}</span>
              </div>
              {f.alerts > 0 && (
                <Badge variant="outline" className="text-[10px] border-red-300 text-red-600">{f.alerts} alert{f.alerts > 1 ? "s" : ""}</Badge>
              )}
            </div>

            {/* 24h Heatmap Sparkline */}
            <div className="flex items-end gap-px mt-3 h-6">
              {f.heatmapIntensity.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm transition-all"
                  style={{
                    height: `${Math.max(v, 2)}%`,
                    background: v >= 75 ? RED : v >= 50 ? AMBER : v >= 25 ? TEAL_LIGHT : "hsl(174, 20%, 80%)",
                    opacity: 0.7 + (v / 300),
                  }}
                  title={`${i}:00 — ${v}% intensity`}
                />
              ))}
            </div>
            <div className="flex justify-between text-[9px] text-muted-foreground mt-0.5">
              <span>12am</span><span>12pm</span><span>11pm</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ── Zone Analysis Tab ────────────────────────────────
function ZoneAnalysisTab() {
  const [facilityFilter, setFacilityFilter] = useState("All");
  const facilities = useMemo(() => ["All", ...Array.from(new Set(zoneUtilizations.map(z => z.facility)))], []);
  const zones = useMemo(() =>
    facilityFilter === "All" ? zoneUtilizations : zoneUtilizations.filter(z => z.facility === facilityFilter),
    [facilityFilter]
  );

  const zoneTypeBadge: Record<string, string> = {
    storage: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    staging: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    dock: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    office: "bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300",
    "value-add": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    "cold-chain": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
    hazmat: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    aisle: "bg-gray-100 text-gray-600 dark:bg-gray-900/40 dark:text-gray-300",
  };

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        {facilities.map(f => (
          <button
            key={f}
            onClick={() => setFacilityFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              facilityFilter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
            data-testid={`zone-filter-${f.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Zone Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {zones.map(z => (
          <Card key={z.zoneId} className={`border-border/60 ${z.utilizationPct < 30 ? "border-l-4 border-l-red-500" : ""}`}>
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold truncate">{z.zoneName}</div>
                <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold ${zoneTypeBadge[z.zoneType] || zoneTypeBadge.storage}`}>
                  {z.zoneType}
                </span>
              </div>
              <div className="text-[10px] text-muted-foreground mb-2">{z.facility} · {fmtK(z.totalSqft)} sqft</div>
              <div className="flex items-center gap-2 mb-2">
                <Progress value={z.utilizationPct} className="h-2 flex-1" />
                <span className={`text-xs font-bold tabular-nums ${z.utilizationPct < 30 ? "text-red-600" : ""}`}>{z.utilizationPct}%</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                {[
                  { l: "Rack", v: `${z.rackUtilPct}%` },
                  { l: "Pallets", v: `${z.palletsInUse}/${z.palletCapacity}` },
                  { l: "Traffic", v: z.trafficCount24h.toString() },
                ].map(s => (
                  <div key={s.l} className="rounded bg-muted/40 p-1">
                    <div className="text-[9px] text-muted-foreground">{s.l}</div>
                    <div className="text-[11px] font-semibold tabular-nums">{s.v}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Zone Table */}
      <Card className="border-border/60">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px]">Zone</TableHead>
                <TableHead className="text-[10px]">Facility</TableHead>
                <TableHead className="text-[10px]">Type</TableHead>
                <TableHead className="text-[10px] text-right">Sqft</TableHead>
                <TableHead className="text-[10px] text-right">Util%</TableHead>
                <TableHead className="text-[10px] text-right">Rack%</TableHead>
                <TableHead className="text-[10px] text-right">Pallets</TableHead>
                <TableHead className="text-[10px] text-right">Traffic</TableHead>
                <TableHead className="text-[10px] text-right">Dwell</TableHead>
                <TableHead className="text-[10px] text-right">AI Conf</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {zones.map(z => (
                <TableRow key={z.zoneId} className={z.utilizationPct < 30 ? "bg-red-50/50 dark:bg-red-900/10" : ""}>
                  <TableCell className="text-xs font-medium">{z.zoneName}</TableCell>
                  <TableCell className="text-xs">{z.facility}</TableCell>
                  <TableCell>
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold ${zoneTypeBadge[z.zoneType] || ""}`}>
                      {z.zoneType}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs tabular-nums text-right">{fmtK(z.totalSqft)}</TableCell>
                  <TableCell className="text-right">
                    <span className={`text-xs font-bold tabular-nums ${z.utilizationPct < 30 ? "text-red-600" : ""}`}>
                      {z.utilizationPct}%
                    </span>
                  </TableCell>
                  <TableCell className="text-xs tabular-nums text-right">{z.rackUtilPct}%</TableCell>
                  <TableCell className="text-xs tabular-nums text-right">{z.palletsInUse}</TableCell>
                  <TableCell className="text-xs tabular-nums text-right">{z.trafficCount24h}</TableCell>
                  <TableCell className="text-xs tabular-nums text-right">{z.avgDwellHrs}h</TableCell>
                  <TableCell className="text-xs tabular-nums text-right">{z.aiConfidence}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ── AI Detections Tab ────────────────────────────────
function DetectionsTab() {
  const totals = {
    pallets: facilityAISummaries.reduce((s, f) => s + f.palletsDetected, 0),
    personnel: facilityAISummaries.reduce((s, f) => s + f.personnelDetected, 0),
    forklifts: facilityAISummaries.reduce((s, f) => s + f.forkliftsDetected, 0),
    vehicles: facilityAISummaries.reduce((s, f) => s + f.vehiclesAtDock, 0),
  };

  const detectionBar = facilityAISummaries.map(f => ({
    name: f.facility,
    pallets: f.palletsDetected,
    personnel: f.personnelDetected,
    forklifts: f.forkliftsDetected,
  })).sort((a, b) => b.pallets - a.pallets);

  const camStatusBadge: Record<string, string> = {
    online: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    offline: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    maintenance: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  };

  return (
    <div className="space-y-4">
      {/* Detection KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard label="Total Pallets" value={totals.pallets.toLocaleString()} sub="Detected via AI vision" icon={Package} />
        <KpiCard label="Personnel" value={totals.personnel.toString()} sub="Active across network" icon={Users} />
        <KpiCard label="Forklifts" value={totals.forklifts.toString()} sub="Operating now" icon={Forklift} />
        <KpiCard label="Dock Vehicles" value={totals.vehicles.toString()} sub="At loading docks" icon={Truck} />
      </div>

      {/* Hourly Traffic Distribution */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">Hourly Traffic Distribution — Personnel vs Forklifts</div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyHeatmap} margin={{ left: 0, right: 8, top: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={2} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="personnel" stackId="1" stroke={TEAL} fill={TEAL} fillOpacity={0.4} name="Personnel" />
                <Area type="monotone" dataKey="forklifts" stackId="1" stroke={AMBER} fill={AMBER} fillOpacity={0.4} name="Forklifts" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detection by Facility */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">Detections by Facility</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={detectionBar} margin={{ left: 0, right: 8, top: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} angle={-35} textAnchor="end" height={50} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="pallets" fill={TEAL} radius={[3, 3, 0, 0]} name="Pallets" />
                <Bar dataKey="personnel" fill={PURPLE} radius={[3, 3, 0, 0]} name="Personnel" />
                <Bar dataKey="forklifts" fill={AMBER} radius={[3, 3, 0, 0]} name="Forklifts" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Camera Feed Status */}
      <Card className="border-border/60">
        <CardContent className="p-0">
          <div className="px-4 pt-4 pb-2 text-xs font-bold">Camera Feed Status — {cameraFeeds.length} Cameras</div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px]">Camera ID</TableHead>
                <TableHead className="text-[10px]">Facility</TableHead>
                <TableHead className="text-[10px]">Zone</TableHead>
                <TableHead className="text-[10px]">Status</TableHead>
                <TableHead className="text-[10px]">Resolution</TableHead>
                <TableHead className="text-[10px]">Last Frame</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cameraFeeds.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="text-xs font-mono tabular-nums">{c.id}</TableCell>
                  <TableCell className="text-xs">{c.facility}</TableCell>
                  <TableCell className="text-xs">{c.zone}</TableCell>
                  <TableCell>
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold ${camStatusBadge[c.status]}`}>
                      {c.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs">{c.resolution}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{c.lastFrame}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Financial Impact Tab ─────────────────────────────
function FinancialTab() {
  const barData = vacancyCosts.map(v => ({ name: v.facility, cost: v.monthlyCost }));

  return (
    <div className="space-y-4">
      {/* Vacancy Cost KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <KpiCard label="Monthly Vacancy Cost" value={fmtDollar(totalVacancyCostMonthly)} sub="All vacant sqft" icon={DollarSign} trend="down" />
        <KpiCard label="Annual Vacancy Cost" value={fmtDollar(totalVacancyCostAnnual)} sub="Projected yearly" icon={DollarSign} trend="down" />
        <KpiCard label="Total Lease Exposure" value={fmtDollar(totalExposure)} sub="Remaining lease value" icon={AlertTriangle} />
      </div>

      {/* Breakdown Bar Chart */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">Monthly Vacancy Cost by Facility</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ left: 80, right: 20, top: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={v => fmtDollar(v)} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={75} />
                <Tooltip contentStyle={{ fontSize: 12 }} formatter={(v: number) => fmtDollar(v)} />
                <Bar dataKey="cost" radius={[0, 4, 4, 0]} maxBarSize={24}>
                  {barData.map((d, i) => <Cell key={i} fill={d.name === "Kato" ? RED : AMBER} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detail Table */}
      <Card className="border-border/60">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px]">Facility</TableHead>
                <TableHead className="text-[10px] text-right">Vacant Sqft</TableHead>
                <TableHead className="text-[10px] text-right">$/sqft/mo</TableHead>
                <TableHead className="text-[10px] text-right">Monthly Cost</TableHead>
                <TableHead className="text-[10px] text-right">Annual Cost</TableHead>
                <TableHead className="text-[10px] text-right">Months Left</TableHead>
                <TableHead className="text-[10px] text-right">Total Exposure</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vacancyCosts.map(v => (
                <TableRow key={v.facility} className={v.facility === "Kato" ? "bg-red-50/50 dark:bg-red-900/10" : ""}>
                  <TableCell className="text-xs font-semibold">{v.facility}</TableCell>
                  <TableCell className="text-xs tabular-nums text-right">{v.vacantSqft.toLocaleString()}</TableCell>
                  <TableCell className="text-xs tabular-nums text-right">${v.monthlyLeasePerSqft.toFixed(2)}</TableCell>
                  <TableCell className="text-xs tabular-nums text-right font-semibold">{fmtDollar(v.monthlyCost)}</TableCell>
                  <TableCell className="text-xs tabular-nums text-right">{fmtDollar(v.annualCost)}</TableCell>
                  <TableCell className="text-xs tabular-nums text-right">{v.remainingLeaseMonths}</TableCell>
                  <TableCell className="text-xs tabular-nums text-right font-bold">{fmtDollar(v.totalExposure)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 font-bold">
                <TableCell className="text-xs">Total</TableCell>
                <TableCell className="text-xs tabular-nums text-right">{vacancyCosts.reduce((s, v) => s + v.vacantSqft, 0).toLocaleString()}</TableCell>
                <TableCell />
                <TableCell className="text-xs tabular-nums text-right">{fmtDollar(totalVacancyCostMonthly)}</TableCell>
                <TableCell className="text-xs tabular-nums text-right">{fmtDollar(totalVacancyCostAnnual)}</TableCell>
                <TableCell />
                <TableCell className="text-xs tabular-nums text-right">{fmtDollar(totalExposure)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Kato Highlight */}
      <Card className="border-border/60 border-l-4 border-l-red-500 bg-red-50/30 dark:bg-red-900/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-bold mb-1">Kato — Critical Vacancy Risk</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Kato represents <span className="font-bold text-red-600 tabular-nums">83%</span> of total lease exposure
                (${(9072694 / 1_000_000).toFixed(1)}M of ${(totalExposure / 1_000_000).toFixed(1)}M).
                128,366 sqft vacant with 62 months remaining on lease at $1.14/sqft/mo.
                Monthly vacancy cost: $146K. Priority: secure tenant or sublease immediately.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Heatmaps Tab ─────────────────────────────────────
function HeatmapsTab() {
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  // 24-hour activity heatmap grid
  const gridData = hourlyHeatmap.map(h => ({
    hour: h.hour,
    traffic: h.trafficCount,
    pct: Math.round((h.trafficCount / 398) * 100), // max ~398
  }));

  // Top 4 busiest facilities
  const top4 = useMemo(() =>
    [...facilityAISummaries]
      .sort((a, b) => b.dailyTraffic - a.dailyTraffic)
      .slice(0, 4),
    []
  );

  const groupedBar = hours.map((hr, i) => {
    const entry: Record<string, string | number> = { hour: i < 12 ? `${i}am` : i === 12 ? "12pm" : `${i - 12}pm` };
    top4.forEach(f => { entry[f.facility] = f.heatmapIntensity[i]; });
    return entry;
  });

  const colors = [TEAL, PURPLE, AMBER, BLUE];

  return (
    <div className="space-y-4">
      {/* 24-Hour Activity Grid */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">24-Hour Network Activity Heatmap</div>
          <div className="flex items-end gap-1 h-40">
            {gridData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full rounded-t-sm transition-all"
                  style={{
                    height: `${Math.max(d.pct, 2)}%`,
                    background: d.pct >= 80 ? RED : d.pct >= 60 ? AMBER : d.pct >= 30 ? TEAL : "hsl(174, 20%, 85%)",
                  }}
                  title={`${d.hour}: ${d.traffic} movements`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
            <span>12am</span><span>6am</span><span>12pm</span><span>6pm</span><span>11pm</span>
          </div>
          <div className="flex items-center gap-4 mt-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm" style={{ background: "hsl(174, 20%, 85%)" }} />Low</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm" style={{ background: TEAL }} />Moderate</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm" style={{ background: AMBER }} />High</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm" style={{ background: RED }} />Peak</span>
          </div>
        </CardContent>
      </Card>

      {/* Facility Peak Hours Grid */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">Facility Peak Hours</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {facilityAISummaries.map(f => {
              const maxH = f.heatmapIntensity.indexOf(Math.max(...f.heatmapIntensity));
              return (
                <div key={f.facility} className="rounded-lg bg-muted/40 p-3">
                  <div className="text-xs font-bold">{f.facility}</div>
                  <div className="text-[10px] text-muted-foreground mb-2">{f.location}</div>
                  <div className="flex items-end gap-px h-8">
                    {f.heatmapIntensity.map((v, i) => (
                      <div key={i} className="flex-1 rounded-t-sm" style={{
                        height: `${Math.max(v, 2)}%`,
                        background: i === maxH ? RED : v >= 50 ? TEAL_LIGHT : "hsl(174, 20%, 85%)",
                        opacity: 0.7 + (v / 300),
                      }} />
                    ))}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1">Peak: <span className="font-semibold text-foreground">{f.peakHour}</span> · {f.dailyTraffic}/day</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top 4 Grouped Bar */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">Hourly Intensity — Top 4 Busiest Facilities</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={groupedBar} margin={{ left: 0, right: 8, top: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="hour" tick={{ fontSize: 9 }} interval={3} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 11 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                {top4.map((f, i) => (
                  <Bar key={f.facility} dataKey={f.facility} fill={colors[i]} radius={[2, 2, 0, 0]} maxBarSize={8} />
                ))}
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
  const filtered = filter === "all" ? aiAlerts : aiAlerts.filter(a => a.severity === filter);
  const counts = {
    critical: aiAlerts.filter(a => a.severity === "critical").length,
    warning: aiAlerts.filter(a => a.severity === "warning").length,
    info: aiAlerts.filter(a => a.severity === "info").length,
  };

  return (
    <div className="space-y-4">
      {/* Filter Chips */}
      <div className="flex items-center gap-2 flex-wrap">
        {(["all", "critical", "warning", "info"] as const).map(f => {
          const active = filter === f;
          const count = f === "all" ? aiAlerts.length : counts[f];
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
        {filtered.map(a => (
          <Card key={a.id} className={`border-border/60 ${
            a.severity === "critical" ? "border-l-4 border-l-red-500"
            : a.severity === "warning" ? "border-l-4 border-l-amber-500"
            : "border-l-4 border-l-blue-400"
          }`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3 min-w-0">
                {a.severity === "critical" ? <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  : a.severity === "warning" ? <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  : <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                }
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold">{a.facility} — {a.zone}</span>
                    <SeverityBadge severity={a.severity} />
                    {a.acknowledged && <span className="text-[10px] text-muted-foreground">Acknowledged</span>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{a.message}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Activity className="w-3 h-3" />{a.detectionType}</span>
                    <span className="flex items-center gap-1"><Cpu className="w-3 h-3" />{a.confidence}% conf</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.timestamp}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insight */}
      <Card className="border-border/60 bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Zap className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-bold mb-1">AI Vision Insight</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Kato facility generates 38% of all alerts with 72% vacancy — recommend accelerating sublease efforts or
                consolidating active storage into East Wing to reduce monitoring costs. Patterson's Vacant Bay C (20% util)
                is adjacent to the growing Panasonic section — ramp-up could absorb this space within 2 months.
                Two cameras offline (Whitmore Lake dock, Grand staging) should be serviced to maintain full network coverage.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Main Component ───────────────────────────────────
export default function FacilityUtilization() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            Facility Utilization — AI Vision Analytics
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            AI-powered monitoring of {networkSummary.totalFacilities} facilities · {fmtK(networkSummary.totalSqft)} sqft · {networkSummary.totalCameras} cameras · Last scan: {networkSummary.lastNetworkScan}
          </p>
        </div>
        <Badge variant="outline" className="text-[10px] font-medium border-primary/30 text-primary">
          Live Feed
        </Badge>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
        {tabs.map(t => {
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
      {activeTab === "grid" && <FacilityGridTab />}
      {activeTab === "zones" && <ZoneAnalysisTab />}
      {activeTab === "detections" && <DetectionsTab />}
      {activeTab === "financial" && <FinancialTab />}
      {activeTab === "heatmaps" && <HeatmapsTab />}
      {activeTab === "alerts" && <AlertsTab />}
    </div>
  );
}
