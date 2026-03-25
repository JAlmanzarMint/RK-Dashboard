import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Route, Truck, Package, Clock, TrendingUp, TrendingDown, Minus, CheckCircle2,
  AlertTriangle, Zap, MapPin, Fuel, Timer, BarChart3, Sparkles, Brain,
  ChevronDown, ChevronRight, ArrowRight, ArrowUp, ArrowDown, CircleDot,
  Filter, Activity, DollarSign, Target, Gauge, Star, Info,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, AreaChart, Area, Cell,
} from "recharts";
import {
  fleet, deliveryZones, todaysShipments, optimizedRoutes, simulationScenarios,
  weeklyPerformance, zoneHeatmap, routingKPIs, recommendations,
  type Vehicle, type SimulationScenario, type Recommendation,
} from "@/lib/routingOptimizationData";

// ── Colors ───────────────────────────────────────────
const TEAL = "hsl(174, 72%, 33%)";
const TEAL_LIGHT = "hsl(174, 72%, 45%)";
const PURPLE = "hsl(262, 60%, 50%)";
const AMBER = "hsl(43, 74%, 49%)";
const BLUE = "hsl(210, 80%, 50%)";
const RED = "hsl(0, 72%, 50%)";
const GREEN = "hsl(142, 60%, 40%)";

// ── Tab Definition ───────────────────────────────────
type TabId = "command" | "fleet" | "simulation" | "zones" | "performance";

const tabs: { id: TabId; label: string; icon: typeof Route }[] = [
  { id: "command", label: "Route Command Center", icon: Route },
  { id: "fleet", label: "Fleet Status", icon: Truck },
  { id: "simulation", label: "Simulation Engine", icon: Brain },
  { id: "zones", label: "Zone Analytics", icon: MapPin },
  { id: "performance", label: "Performance & Trends", icon: BarChart3 },
];

// ── Helpers ──────────────────────────────────────────
function pct(n: number) { return `${Math.round(n * 100)}%`; }
function fmtDollar(n: number) { return n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n.toFixed(0)}`; }

function KpiCard({ label, value, sub, icon: Icon, accent }: {
  label: string; value: string; sub?: string; icon: typeof Route; accent?: string;
}) {
  return (
    <Card className="border-border/60" style={accent ? { borderLeft: `3px solid ${accent}` } : undefined}>
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{label}</div>
            <div className="text-lg font-bold tabular-nums mt-0.5">{value}</div>
            {sub && <div className="text-[10px] text-muted-foreground mt-0.5">{sub}</div>}
          </div>
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="w-3.5 h-3.5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function statusDot(status: string) {
  const c: Record<string, string> = {
    en_route: "bg-blue-500", available: "bg-emerald-500", maintenance: "bg-amber-500",
    off_duty: "bg-gray-400", delivered: "bg-emerald-500", in_transit: "bg-blue-500",
    pending: "bg-amber-500", assigned: "bg-purple-500", exception: "bg-red-500",
    completed: "bg-emerald-500", in_progress: "bg-blue-500", skipped: "bg-gray-400",
  };
  return <span className={`inline-block w-2 h-2 rounded-full ${c[status] || "bg-gray-400"}`} />;
}

function scoreColor(s: number) {
  if (s > 80) return "text-emerald-600 dark:text-emerald-400";
  if (s > 60) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}

function priorityBadge(p: Recommendation["priority"]) {
  const m: Record<string, string> = {
    critical: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    high: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    medium: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    low: "bg-gray-100 text-gray-600 dark:bg-gray-800/40 dark:text-gray-300",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${m[p]}`}>
      {p}
    </span>
  );
}

function vehicleTypeBadge(t: Vehicle["type"]) {
  const labels: Record<string, string> = {
    "26ft_box": "26ft Box", "16ft_box": "16ft Box", sprinter: "Sprinter", flatbed: "Flatbed", liftgate: "Liftgate",
  };
  return <Badge variant="outline" className="text-[10px] font-medium">{labels[t]}</Badge>;
}

// ── Route Command Center ─────────────────────────────
function CommandTab() {
  const [expandedRoute, setExpandedRoute] = useState<string | null>(null);
  const kpi = routingKPIs.today;
  const unassigned = todaysShipments.filter(s => !s.assignedRoute);

  return (
    <div className="space-y-4">
      {/* Unassigned Alert */}
      {unassigned.length > 0 && (
        <Card className="border-border/60 border-l-4 border-l-amber-500 bg-amber-50/30 dark:bg-amber-900/5">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold">{unassigned.length} Unassigned Shipments</span>
                <span className="text-[10px] text-muted-foreground">
                  — {unassigned.map(s => s.id).join(", ")}
                </span>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1.5" data-testid="run-optimizer">
                <Sparkles className="w-3 h-3" /> Run Optimizer
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        <KpiCard label="Total Shipments" value={kpi.totalShipments.toString()} icon={Package} accent={TEAL} />
        <KpiCard label="Delivered" value={kpi.delivered.toString()} icon={CheckCircle2} accent={GREEN} />
        <KpiCard label="In Transit" value={kpi.inTransit.toString()} icon={Truck} accent={BLUE} />
        <KpiCard label="Pending" value={kpi.pending.toString()} icon={Clock} accent={AMBER} />
        <KpiCard label="On-Time Rate" value={pct(kpi.onTimeRate)} icon={Target} accent={kpi.onTimeRate >= 0.9 ? GREEN : AMBER} />
        <KpiCard label="Fleet Util" value={pct(kpi.fleetUtilization)} icon={Gauge} accent={TEAL} />
        <KpiCard label="Opt. Score" value={kpi.optimizationScore.toString()} icon={Zap} accent={kpi.optimizationScore >= 80 ? GREEN : AMBER} />
      </div>

      {/* Active Routes Table */}
      <Card className="border-border/60">
        <CardContent className="p-0">
          <div className="px-4 pt-3 pb-2 text-xs font-bold">Active Routes — {optimizedRoutes.length} Routes</div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px] w-8" />
                <TableHead className="text-[10px]">Route</TableHead>
                <TableHead className="text-[10px]">Driver</TableHead>
                <TableHead className="text-[10px]">Vehicle</TableHead>
                <TableHead className="text-[10px]">Zone</TableHead>
                <TableHead className="text-[10px] text-right">Stops</TableHead>
                <TableHead className="text-[10px] text-right">Miles</TableHead>
                <TableHead className="text-[10px]">ETA Return</TableHead>
                <TableHead className="text-[10px] text-right">Cap%</TableHead>
                <TableHead className="text-[10px] text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {optimizedRoutes.map(r => {
                const completed = r.stops.filter(s => s.status === "completed").length;
                const expanded = expandedRoute === r.id;
                return (
                  <>
                    <TableRow key={r.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setExpandedRoute(expanded ? null : r.id)} data-testid={`route-row-${r.id}`}>
                      <TableCell className="px-2">
                        {expanded ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
                      </TableCell>
                      <TableCell className="text-xs font-bold tabular-nums">{r.id}</TableCell>
                      <TableCell className="text-xs">{r.driver}</TableCell>
                      <TableCell className="text-xs font-mono">{r.vehicleId}</TableCell>
                      <TableCell className="text-xs">{r.zone}</TableCell>
                      <TableCell className="text-xs tabular-nums text-right">{completed}/{r.stops.length}</TableCell>
                      <TableCell className="text-xs tabular-nums text-right">{r.totalMiles}</TableCell>
                      <TableCell className="text-xs">{r.returnTime}</TableCell>
                      <TableCell className="text-xs tabular-nums text-right">{r.capacityUtil}%</TableCell>
                      <TableCell className={`text-xs font-bold tabular-nums text-right ${scoreColor(r.optimizationScore)}`}>{r.optimizationScore}</TableCell>
                    </TableRow>
                    {expanded && r.stops.map(stop => {
                      const shipment = todaysShipments.find(s => s.id === stop.shipmentId);
                      return (
                        <TableRow key={`${r.id}-${stop.shipmentId}`} className="bg-muted/20 dark:bg-muted/10">
                          <TableCell />
                          <TableCell className="text-[10px] text-muted-foreground">#{stop.sequence}</TableCell>
                          <TableCell colSpan={2} className="text-[10px]">
                            <div className="flex items-center gap-1.5">
                              {statusDot(stop.status)}
                              <span className="font-medium">{shipment?.customer || stop.shipmentId}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-[10px] text-muted-foreground">{shipment?.destination.city}, {shipment?.destination.state}</TableCell>
                          <TableCell className="text-[10px] tabular-nums text-right">{shipment?.pallets}p / {shipment?.weight}lb</TableCell>
                          <TableCell className="text-[10px] tabular-nums text-right">{shipment?.estimatedMiles}mi</TableCell>
                          <TableCell className="text-[10px] tabular-nums">ETA {stop.eta}</TableCell>
                          <TableCell className="text-[10px]">
                            {shipment?.priority === "expedited" && <Badge variant="outline" className="text-[9px] border-amber-300 text-amber-600">Exp</Badge>}
                            {shipment?.priority === "white_glove" && <Badge variant="outline" className="text-[9px] border-purple-300 text-purple-600">WG</Badge>}
                          </TableCell>
                          <TableCell className="text-[10px] capitalize">{stop.status.replace("_", " ")}</TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Fleet Status Tab ─────────────────────────────────
function FleetTab() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const filtered = statusFilter === "all" ? fleet : fleet.filter(v => v.status === statusFilter);

  const statusCounts = useMemo(() => ({
    all: fleet.length,
    en_route: fleet.filter(v => v.status === "en_route").length,
    available: fleet.filter(v => v.status === "available").length,
    maintenance: fleet.filter(v => v.status === "maintenance").length,
    off_duty: fleet.filter(v => v.status === "off_duty").length,
  }), []);

  const typeData = useMemo(() => {
    const counts: Record<string, number> = {};
    fleet.forEach(v => { counts[v.type] = (counts[v.type] || 0) + 1; });
    return Object.entries(counts).map(([type, count]) => ({
      name: type.replace("_", " ").replace("26ft", "26ft").replace("16ft", "16ft"),
      count,
    }));
  }, []);

  const avgUtil = Math.round((fleet.filter(v => v.status === "en_route").length / fleet.length) * 100);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {(Object.entries(statusCounts) as [string, number][]).map(([key, count]) => (
          <button
            key={key}
            onClick={() => setStatusFilter(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
              statusFilter === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
            data-testid={`fleet-filter-${key}`}
          >
            {key === "all" ? "All" : key.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())} ({count})
          </button>
        ))}
      </div>

      {/* Vehicle Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map(v => (
          <Card key={v.id} className="border-border/60">
            <CardContent className="p-3">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{v.id}</span>
                    {vehicleTypeBadge(v.type)}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{v.driver}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  {statusDot(v.status)}
                  <span className="text-[10px] font-medium capitalize">{v.status.replace("_", " ")}</span>
                </div>
              </div>

              {/* Fuel Gauge */}
              <div className="mb-2">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                  <span className="flex items-center gap-1"><Fuel className="w-3 h-3" />Fuel</span>
                  <span className="tabular-nums">{v.fuelLevel}%</span>
                </div>
                <Progress value={v.fuelLevel} className="h-1.5" />
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded bg-muted/40 p-1.5">
                  <div className="text-[9px] text-muted-foreground">Miles Today</div>
                  <div className="text-xs font-bold tabular-nums">{v.milestoday}</div>
                </div>
                <div className="rounded bg-muted/40 p-1.5">
                  <div className="text-[9px] text-muted-foreground">Hrs Left</div>
                  <div className="text-xs font-bold tabular-nums">{v.hoursRemaining}</div>
                </div>
                <div className="rounded bg-muted/40 p-1.5">
                  <div className="text-[9px] text-muted-foreground">$/mi</div>
                  <div className="text-xs font-bold tabular-nums">${v.costPerMile}</div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {v.currentLocation.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border/60">
          <CardContent className="p-4">
            <div className="text-xs font-bold mb-3">Fleet by Vehicle Type</div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={typeData} margin={{ left: 0, right: 8, top: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Bar dataKey="count" fill={TEAL} radius={[4, 4, 0, 0]} maxBarSize={40} name="Vehicles" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardContent className="p-4">
            <div className="text-xs font-bold mb-3">Fleet Utilization</div>
            <div className="flex items-center justify-center h-48">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <svg width={140} height={140} className="-rotate-90">
                    <circle cx={70} cy={70} r={60} fill="none" stroke="currentColor" strokeWidth={12} className="text-muted/20" />
                    <circle cx={70} cy={70} r={60} fill="none" stroke={avgUtil >= 70 ? GREEN : avgUtil >= 50 ? AMBER : RED} strokeWidth={12}
                      strokeDasharray={2 * Math.PI * 60} strokeDashoffset={2 * Math.PI * 60 * (1 - avgUtil / 100)}
                      strokeLinecap="round" className="transition-all duration-700" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold tabular-nums">{avgUtil}%</span>
                    <span className="text-[10px] text-muted-foreground">active</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">{statusDot("en_route")} En Route ({statusCounts.en_route})</span>
                  <span className="flex items-center gap-1">{statusDot("available")} Available ({statusCounts.available})</span>
                  <span className="flex items-center gap-1">{statusDot("off_duty")} Off ({statusCounts.off_duty + statusCounts.maintenance})</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ── Simulation Engine Tab ────────────────────────────
function SimulationTab() {
  const [selectedSim, setSelectedSim] = useState(simulationScenarios[0].id);
  const sim = simulationScenarios.find(s => s.id === selectedSim)!;

  const simIcons: Record<string, typeof Brain> = {
    reoptimize: Zap, demand_surge: TrendingUp, weather: AlertTriangle, capacity: Truck, what_if: Brain,
  };

  const confDeg = sim.confidence * 100;
  const confR = 52;
  const confCirc = 2 * Math.PI * confR;

  return (
    <div className="space-y-4">
      {/* Scenario Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {simulationScenarios.map(s => {
          const active = selectedSim === s.id;
          const Icon = simIcons[s.type] || Brain;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedSim(s.id)}
              className={`rounded-lg p-3 text-left transition-all border ${
                active
                  ? "border-primary bg-primary/5 dark:bg-primary/10 ring-1 ring-primary/30"
                  : "border-border/60 bg-card hover:border-primary/40"
              }`}
              data-testid={`sim-card-${s.id}`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center ${active ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <Sparkles className={`w-3 h-3 ${active ? "text-primary" : "text-muted-foreground/40"}`} />
              </div>
              <div className="text-xs font-bold">{s.name}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">{s.description}</div>
            </button>
          );
        })}
      </div>

      {/* Scenario Detail */}
      <Card className="border-border/60 overflow-hidden">
        <div className="bg-gradient-to-r from-primary/5 via-primary/3 to-transparent dark:from-primary/10 dark:via-primary/5 px-4 py-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold">{sim.name}</span>
            <Badge variant="outline" className="text-[10px] border-primary/30 text-primary ml-auto">
              AI Simulation
            </Badge>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">{sim.description}</p>
        </div>
        <CardContent className="p-4 space-y-4">
          {/* Metrics Comparison */}
          <div className="text-xs font-bold mb-2">Current vs Optimized</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {([
              { label: "Total Miles", curr: sim.currentMetrics.totalMiles, opt: sim.optimizedMetrics.totalMiles, fmt: (n: number) => n.toString(), lower: true },
              { label: "Total Cost", curr: sim.currentMetrics.totalCost, opt: sim.optimizedMetrics.totalCost, fmt: (n: number) => `$${n.toFixed(0)}`, lower: true },
              { label: "On-Time", curr: sim.currentMetrics.avgOnTime, opt: sim.optimizedMetrics.avgOnTime, fmt: pct, lower: false },
              { label: "Utilization", curr: sim.currentMetrics.avgUtilization, opt: sim.optimizedMetrics.avgUtilization, fmt: pct, lower: false },
              { label: "Routes", curr: sim.currentMetrics.totalRoutes, opt: sim.optimizedMetrics.totalRoutes, fmt: (n: number) => n.toString(), lower: true },
              { label: "Unassigned", curr: sim.currentMetrics.unassigned, opt: sim.optimizedMetrics.unassigned, fmt: (n: number) => n.toString(), lower: true },
            ] as const).map(m => {
              const improved = m.lower ? m.opt <= m.curr : m.opt >= m.curr;
              return (
                <div key={m.label} className="rounded-lg bg-muted/40 p-2.5">
                  <div className="text-[10px] text-muted-foreground font-medium">{m.label}</div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xs tabular-nums text-muted-foreground">{m.fmt(m.curr)}</span>
                    <ArrowRight className="w-3 h-3 text-muted-foreground/50" />
                    <span className={`text-sm font-bold tabular-nums ${improved ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                      {m.fmt(m.opt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    {improved ? <ArrowDown className="w-3 h-3 text-emerald-500" /> : <ArrowUp className="w-3 h-3 text-red-500" />}
                    <span className={`text-[10px] font-semibold ${improved ? "text-emerald-600" : "text-red-600"}`}>
                      {m.lower
                        ? (m.curr - m.opt > 0 ? `-${m.fmt(m.curr - m.opt)}` : `+${m.fmt(m.opt - m.curr)}`)
                        : (m.opt - m.curr > 0 ? `+${m.fmt(m.opt - m.curr)}` : `-${m.fmt(m.curr - m.opt)}`)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Confidence + Savings + Agent Notes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Confidence */}
            <div className="flex flex-col items-center justify-center rounded-lg bg-muted/30 p-4">
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Confidence</div>
              <div className="relative">
                <svg width={120} height={120} className="-rotate-90">
                  <circle cx={60} cy={60} r={confR} fill="none" stroke="currentColor" strokeWidth={8} className="text-muted/20" />
                  <circle cx={60} cy={60} r={confR} fill="none"
                    stroke={confDeg >= 80 ? GREEN : confDeg >= 65 ? AMBER : RED}
                    strokeWidth={8} strokeDasharray={confCirc} strokeDashoffset={confCirc * (1 - sim.confidence)}
                    strokeLinecap="round" className="transition-all duration-700" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold tabular-nums">{Math.round(confDeg)}%</span>
                </div>
              </div>
            </div>

            {/* Savings */}
            <div className="rounded-lg bg-muted/30 p-4">
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Savings Summary</div>
              <div className="space-y-3">
                {[
                  { l: "Miles Saved", v: sim.savings.miles, u: "mi", positive: sim.savings.miles > 0 },
                  { l: "Cost Saved", v: sim.savings.cost, u: "", positive: sim.savings.cost > 0, dollar: true },
                  { l: "Time Saved", v: sim.savings.time, u: "min", positive: sim.savings.time > 0 },
                ].map(s => (
                  <div key={s.l} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{s.l}</span>
                    <span className={`text-sm font-bold tabular-nums ${s.positive ? "text-emerald-600" : "text-red-600"}`}>
                      {s.positive ? "+" : ""}{s.dollar ? `$${s.v.toFixed(0)}` : s.v}{s.u}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent Notes */}
            <div className="rounded-lg bg-muted/30 p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <Brain className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">AI Agent Notes</span>
              </div>
              <div className="space-y-2">
                {sim.agentNotes.map((note, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-muted-foreground leading-relaxed">
                    <CircleDot className={`w-3 h-3 mt-0.5 shrink-0 ${i === 0 ? "text-primary" : "text-muted-foreground/50"}`} />
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Zone Analytics Tab ───────────────────────────────
function ZonesTab() {
  const zones = deliveryZones;
  const heatmapZones = useMemo(() => Array.from(new Set(zoneHeatmap.map(h => h.zone))), []);
  const hours = Array.from({ length: 12 }, (_, i) => i + 5);

  const barData = zones.map(z => ({
    name: z.name.length > 10 ? z.name.slice(0, 10) + "…" : z.name,
    onTime: Math.round(z.historicalOnTime * 100),
  }));

  return (
    <div className="space-y-4">
      {/* Zone Performance Table */}
      <Card className="border-border/60">
        <CardContent className="p-0">
          <div className="px-4 pt-3 pb-2 text-xs font-bold">Zone Performance — {zones.length} Zones</div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px]">Zone</TableHead>
                <TableHead className="text-[10px]">Region</TableHead>
                <TableHead className="text-[10px] text-right">Avg Stops</TableHead>
                <TableHead className="text-[10px] text-right">Avg Miles</TableHead>
                <TableHead className="text-[10px] text-right">Min/Stop</TableHead>
                <TableHead className="text-[10px] text-right">Traffic×</TableHead>
                <TableHead className="text-[10px]">Peak Window</TableHead>
                <TableHead className="text-[10px] text-right">On-Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {zones.map(z => {
                const ot = z.historicalOnTime * 100;
                const otColor = ot >= 90 ? "text-emerald-600 dark:text-emerald-400" : ot >= 80 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400";
                return (
                  <TableRow key={z.id}>
                    <TableCell className="text-xs font-medium">{z.name}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px]">{z.region}</Badge></TableCell>
                    <TableCell className="text-xs tabular-nums text-right">{z.avgStopsPerRoute}</TableCell>
                    <TableCell className="text-xs tabular-nums text-right">{z.avgMilesPerRoute}</TableCell>
                    <TableCell className="text-xs tabular-nums text-right">{z.avgTimePerStop}</TableCell>
                    <TableCell className="text-xs tabular-nums text-right">
                      <span className={z.trafficMultiplier >= 1.4 ? "text-red-600 font-semibold" : ""}>{z.trafficMultiplier.toFixed(2)}×</span>
                    </TableCell>
                    <TableCell className="text-[10px] text-muted-foreground">{z.deliveryWindowPeak}</TableCell>
                    <TableCell className={`text-xs font-bold tabular-nums text-right ${otColor}`}>{ot.toFixed(0)}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delivery Density Heatmap */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">Delivery Density Heatmap — Zones × Hours</div>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Header row */}
              <div className="flex items-center">
                <div className="w-28 shrink-0" />
                {hours.map(h => (
                  <div key={h} className="flex-1 text-center text-[10px] text-muted-foreground tabular-nums">
                    {h <= 12 ? `${h}am` : `${h - 12}pm`}
                  </div>
                ))}
              </div>
              {/* Zone rows */}
              {heatmapZones.map(zone => (
                <div key={zone} className="flex items-center mt-1">
                  <div className="w-28 shrink-0 text-[11px] font-medium truncate pr-2">{zone}</div>
                  {hours.map(h => {
                    const entry = zoneHeatmap.find(e => e.zone === zone && e.hour === h);
                    const intensity = entry?.intensity || 0;
                    return (
                      <div key={h} className="flex-1 px-0.5">
                        <div
                          className="h-7 rounded-sm transition-colors"
                          style={{
                            background: intensity === 0 ? "hsl(174, 20%, 95%)"
                              : `hsla(174, 72%, ${45 - intensity * 25}%, ${0.3 + intensity * 0.7})`,
                          }}
                          title={`${zone} @ ${h}:00 — ${Math.round(intensity * 100)}%`}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
              {/* Legend */}
              <div className="flex items-center gap-3 mt-3 text-[10px] text-muted-foreground">
                <span>Low</span>
                <div className="flex gap-0.5">
                  {[0, 0.2, 0.4, 0.6, 0.8, 1].map(v => (
                    <div key={v} className="w-5 h-3 rounded-sm" style={{
                      background: `hsla(174, 72%, ${45 - v * 25}%, ${0.3 + v * 0.7})`,
                    }} />
                  ))}
                </div>
                <span>High</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* On-Time Rate Bar Chart */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">On-Time Rate by Zone</div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ left: 0, right: 8, top: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 10 }} tickFormatter={v => `${v}%`} />
                <Tooltip contentStyle={{ fontSize: 12 }} formatter={(v: number) => `${v}%`} />
                <Bar dataKey="onTime" radius={[4, 4, 0, 0]} maxBarSize={36} name="On-Time %">
                  {barData.map((d, i) => (
                    <Cell key={i} fill={d.onTime >= 90 ? GREEN : d.onTime >= 85 ? AMBER : RED} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Performance & Trends Tab ─────────────────────────
function PerformanceTab() {
  const weekly = weeklyPerformance;
  const trends = routingKPIs.trends;
  const sortedRecs = useMemo(() => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return [...recommendations].sort((a, b) => order[a.priority] - order[b.priority]);
  }, []);

  const categoryBadge: Record<string, string> = {
    route: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    fleet: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    zone: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    cost: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    service: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  };

  return (
    <div className="space-y-4">
      {/* Weekly Delivery Performance */}
      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="text-xs font-bold mb-3">Weekly Delivery Performance</div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weekly} margin={{ left: 0, right: 8, top: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="totalShipments" stroke={TEAL} strokeWidth={2} dot={{ r: 3 }} name="Total" />
                <Line type="monotone" dataKey="onTime" stroke={GREEN} strokeWidth={2} dot={{ r: 3 }} name="On-Time" />
                <Line type="monotone" dataKey="late" stroke={RED} strokeWidth={2} dot={{ r: 3 }} name="Late" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Cost per Delivery */}
        <Card className="border-border/60">
          <CardContent className="p-4">
            <div className="text-xs font-bold mb-3">Cost per Delivery — Actual vs Optimized</div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trends.costPerDelivery} margin={{ left: 0, right: 8, top: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                  <YAxis domain={[55, 70]} tick={{ fontSize: 10 }} tickFormatter={v => `$${v}`} />
                  <Tooltip contentStyle={{ fontSize: 12 }} formatter={(v: number) => `$${v.toFixed(2)}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="actual" stroke={AMBER} strokeWidth={2} dot={{ r: 3 }} name="Actual" />
                  <Line type="monotone" dataKey="optimized" stroke={TEAL} strokeWidth={2} dot={{ r: 3 }} strokeDasharray="6 3" name="Optimized" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Fleet Utilization Trend */}
        <Card className="border-border/60">
          <CardContent className="p-4">
            <div className="text-xs font-bold mb-3">Fleet Utilization Trend</div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trends.utilizationTrend} margin={{ left: 0, right: 8, top: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0.4, 0.8]} tick={{ fontSize: 10 }} tickFormatter={v => pct(v)} />
                  <Tooltip contentStyle={{ fontSize: 12 }} formatter={(v: number) => pct(v)} />
                  <Area type="monotone" dataKey="utilization" stroke={TEAL} fill={TEAL} fillOpacity={0.2} strokeWidth={2} name="Utilization" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Optimization Recommendations */}
      <div className="text-xs font-bold">Optimization Recommendations</div>
      <div className="space-y-3">
        {sortedRecs.map(r => (
          <Card key={r.id} className="border-border/60">
            <CardContent className="p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    {priorityBadge(r.priority)}
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold ${categoryBadge[r.category] || ""}`}>
                      {r.category}
                    </span>
                    <span className="text-xs font-bold">{r.title}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{r.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Target className="w-3 h-3" />{r.impact}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                    {fmtDollar(r.estimatedSaving)}
                  </div>
                  <div className="text-[10px] text-muted-foreground">/month</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────
export default function RoutingOptimization() {
  const [activeTab, setActiveTab] = useState<TabId>("command");

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Route className="w-5 h-5 text-primary" />
            OTT Routing Optimization
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            AI-powered route optimization for On Time Trucking — Tri-State LTL final-mile operations
          </p>
        </div>
        <Badge variant="outline" className="text-[10px] font-medium border-primary/30 text-primary">
          Live TMS
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
      {activeTab === "command" && <CommandTab />}
      {activeTab === "fleet" && <FleetTab />}
      {activeTab === "simulation" && <SimulationTab />}
      {activeTab === "zones" && <ZonesTab />}
      {activeTab === "performance" && <PerformanceTab />}
    </div>
  );
}
