import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Brain, Zap, TrendingUp, TrendingDown, Minus, AlertTriangle, Shield, Target,
  Sparkles, ChevronDown, ChevronRight, Clock, DollarSign, Users, Cpu,
  BarChart3, Rocket, Factory, Building2, Eye, CircleDot, CheckCircle2,
  ArrowUp, ArrowDown, Activity, Calendar, User,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  simulationAgents, simulationRuns, revenueForecasts, strategyInsights,
  agentDebates, weeklyScorecard, scenarioTree, ceoActionItems, compositeHealth,
  type StrategyInsight, type ActionItem,
} from "@/lib/strategySimulationData";

// ── Colors ───────────────────────────────────────────
const TEAL = "hsl(174, 72%, 33%)";
const GREEN = "hsl(142, 60%, 40%)";
const AMBER = "hsl(43, 74%, 49%)";
const RED = "hsl(0, 72%, 50%)";

// ── Tab Definition ───────────────────────────────────
type TabId = "overview" | "forecast" | "insights" | "debates" | "actions";

const tabs: { id: TabId; label: string; icon: typeof Brain }[] = [
  { id: "overview", label: "Simulation Overview", icon: Eye },
  { id: "forecast", label: "Revenue Forecast", icon: DollarSign },
  { id: "insights", label: "Strategy Insights", icon: Brain },
  { id: "debates", label: "Agent Debates", icon: Users },
  { id: "actions", label: "CEO Action Board", icon: Target },
];

// ── Helpers ──────────────────────────────────────────
function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up" || trend === "improving") return <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />;
  if (trend === "down" || trend === "declining") return <TrendingDown className="w-3.5 h-3.5 text-red-500" />;
  return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
}

function scoreColor(s: number) {
  if (s >= 75) return GREEN;
  if (s >= 60) return AMBER;
  return RED;
}

function severityBadge(s: StrategyInsight["severity"]) {
  const m: Record<string, string> = {
    critical: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    high: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
    low: "bg-gray-100 text-gray-600 dark:bg-gray-800/40 dark:text-gray-300",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${m[s]}`}>{s}</span>;
}

function priorityBadge(p: ActionItem["priority"]) {
  const m: Record<number, string> = {
    1: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    2: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    3: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${m[p]}`}>P{p}</span>;
}

function statusBadge(s: ActionItem["status"]) {
  const m: Record<string, string> = {
    new: "bg-primary/10 text-primary", in_progress: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    overdue: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${m[s]}`}>{s.replace("_", " ")}</span>;
}

const categoryIcons: Record<string, typeof Brain> = {
  growth: Rocket, risk: Shield, operations: Factory, financial: DollarSign,
  competitive: Target, technology: Cpu,
};

function categoryBadge(cat: string) {
  const colors: Record<string, string> = {
    growth: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    risk: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    operations: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    financial: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    competitive: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    technology: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
  };
  const Icon = categoryIcons[cat] || Brain;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${colors[cat] || ""}`}>
      <Icon className="w-3 h-3" />{cat}
    </span>
  );
}

function horizonLabel(h: string) {
  const m: Record<string, string> = { immediate: "Immediate", "30_days": "30 Days", "90_days": "90 Days", "6_months": "6 Months" };
  return m[h] || h;
}

// ── Overview Tab ─────────────────────────────────────
function OverviewTab() {
  const health = compositeHealth;
  const gaugeR = 62;
  const gaugeCirc = 2 * Math.PI * gaugeR;
  const latestRun = simulationRuns[0];

  return (
    <div className="space-y-4">
      {/* Health Score + Summary */}
      <Card className="border-border/60 overflow-hidden">
        <div className="bg-gradient-to-r from-primary/5 via-transparent to-transparent dark:from-primary/10 p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Gauge */}
            <div className="flex flex-col items-center relative shrink-0">
              <svg width={150} height={150} className="-rotate-90">
                <circle cx={75} cy={75} r={gaugeR} fill="none" stroke="currentColor" strokeWidth={10} className="text-muted/20" />
                <circle cx={75} cy={75} r={gaugeR} fill="none" stroke={scoreColor(health.overall)} strokeWidth={10}
                  strokeDasharray={gaugeCirc} strokeDashoffset={gaugeCirc * (1 - health.overall / 100)}
                  strokeLinecap="round" className="transition-all duration-700" />
              </svg>
              <div className="absolute flex flex-col items-center justify-center" style={{ width: 150, height: 150 }}>
                <span className="text-3xl font-bold tabular-nums">{health.overall}</span>
                <span className="text-[10px] text-muted-foreground font-medium">/100</span>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <TrendIcon trend={health.trend} />
                <span className="text-xs font-semibold text-emerald-600 tabular-nums">+{health.overall - health.previousWeek} from last week</span>
              </div>
            </div>

            {/* Summary */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-bold">Composite Health Score</h3>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                  (health.riskLevel as string) === "low" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                  : (health.riskLevel as string) === "moderate" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                  : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                }`}>
                  {health.riskLevel} risk
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{health.summary}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Weekly Scorecard Grid */}
      <div className="text-xs font-bold">Weekly Scorecard — 10 Dimensions</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {weeklyScorecard.map(w => (
          <Card key={w.dimension} className="border-border/60">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider truncate">{w.dimension}</span>
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                  w.status === "improving" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                  : w.status === "declining" ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                  : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                }`}>{w.status}</span>
              </div>
              <div className="flex items-end gap-2 mb-1.5">
                <span className="text-lg font-bold tabular-nums">{w.score}</span>
                <div className="flex items-center gap-0.5 pb-0.5">
                  {w.change > 0 ? <ArrowUp className="w-3 h-3 text-emerald-500" /> : w.change < 0 ? <ArrowDown className="w-3 h-3 text-red-500" /> : <Minus className="w-3 h-3 text-muted-foreground" />}
                  <span className={`text-[10px] font-semibold tabular-nums ${w.change > 0 ? "text-emerald-600" : w.change < 0 ? "text-red-600" : "text-muted-foreground"}`}>
                    {w.change > 0 ? "+" : ""}{w.change}
                  </span>
                </div>
              </div>
              <Progress value={w.score} className="h-1.5 mb-1.5" />
              <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2">{w.keyDriver}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Simulation Run Info */}
      <Card className="border-border/60 bg-muted/30">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold">Latest Simulation Run</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px]">
            <span><span className="text-muted-foreground">ID:</span> <span className="font-mono font-semibold">{latestRun.id}</span></span>
            <span><span className="text-muted-foreground">Week:</span> {latestRun.weekOf}</span>
            <span><span className="text-muted-foreground">Agents:</span> <span className="font-semibold tabular-nums">{latestRun.agentsDeployed}</span></span>
            <span><span className="text-muted-foreground">Iterations:</span> <span className="font-semibold tabular-nums">{latestRun.iterationsRun.toLocaleString()}</span></span>
            <span><span className="text-muted-foreground">Convergence:</span> <span className="font-semibold tabular-nums">{latestRun.convergenceScore}%</span></span>
            <span><span className="text-muted-foreground">Time:</span> {latestRun.executionTime}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {latestRun.seedSources.map(s => (
              <Badge key={s} variant="outline" className="text-[9px] font-medium">{s}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Revenue Forecast Tab ─────────────────────────────
function ForecastTab() {
  const tree = scenarioTree;

  const scenarioBorder: Record<string, string> = {
    BULL: "border-l-emerald-500", BASE: "border-l-gray-400", BEAR: "border-l-red-500",
  };
  const scenarioBg: Record<string, string> = {
    BULL: "bg-emerald-50/50 dark:bg-emerald-900/5", BASE: "", BEAR: "bg-red-50/50 dark:bg-red-900/5",
  };

  return (
    <div className="space-y-4">
      {/* Forecast Table */}
      <Card className="border-border/60">
        <CardContent className="p-0">
          <div className="px-4 pt-3 pb-2 text-xs font-bold">Revenue & Margin Forecast</div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px]">Metric</TableHead>
                <TableHead className="text-[10px]">Current</TableHead>
                <TableHead className="text-[10px]">Q2</TableHead>
                <TableHead className="text-[10px]">Q3</TableHead>
                <TableHead className="text-[10px]">Q4</TableHead>
                <TableHead className="text-[10px] font-bold">FY2026</TableHead>
                <TableHead className="text-[10px]">Confidence</TableHead>
                <TableHead className="text-[10px] w-10">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenueForecasts.map(f => (
                <TableRow key={f.metric}>
                  <TableCell className="text-xs font-semibold">{f.metric}</TableCell>
                  <TableCell className="text-xs tabular-nums">{f.current}</TableCell>
                  <TableCell className="text-xs tabular-nums">{f.q2Forecast}</TableCell>
                  <TableCell className="text-xs tabular-nums">{f.q3Forecast}</TableCell>
                  <TableCell className="text-xs tabular-nums">{f.q4Forecast}</TableCell>
                  <TableCell className="text-xs font-bold tabular-nums">{f.fy2026}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={f.confidence * 100} className="h-1.5 w-16" />
                      <span className={`text-[10px] font-semibold tabular-nums ${
                        f.confidence >= 0.8 ? "text-emerald-600" : f.confidence >= 0.7 ? "text-amber-600" : "text-red-600"
                      }`}>{Math.round(f.confidence * 100)}%</span>
                    </div>
                  </TableCell>
                  <TableCell><TrendIcon trend={f.trend} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Scenario Tree */}
      <div className="text-xs font-bold">Scenario Tree — FY2026</div>

      {/* Root */}
      <Card className="border-border/60 bg-muted/30">
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[10px] font-bold">R</div>
            <div>
              <span className="text-xs font-bold">{tree.label}</span>
              <span className="text-[10px] text-muted-foreground ml-2">Rev: {tree.revenueImpact} · EBITDA: {tree.ebitdaImpact}</span>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1 ml-8">{tree.description}</p>
        </CardContent>
      </Card>

      {/* Branches */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 ml-4">
        {tree.children?.map(branch => (
          <div key={branch.id} className="space-y-2">
            <Card className={`border-border/60 border-l-4 ${scenarioBorder[branch.id] || ""} ${scenarioBg[branch.id] || ""}`}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">{branch.label}</span>
                  <Badge variant="outline" className="text-[10px] tabular-nums">{Math.round(branch.probability * 100)}%</Badge>
                </div>
                <div className="text-[10px] tabular-nums mb-1">
                  Rev: <span className="font-semibold">{branch.revenueImpact}</span> · EBITDA: <span className="font-semibold">{branch.ebitdaImpact}</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{branch.description}</p>
              </CardContent>
            </Card>

            {/* Sub-scenarios */}
            {branch.children?.map(child => (
              <Card key={child.id} className={`border-border/60 border-l-4 ${scenarioBorder[branch.id] || ""} ml-3`}>
                <CardContent className="p-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold">{child.label}</span>
                    <Badge variant="outline" className="text-[9px] tabular-nums">{Math.round(child.probability * 100)}%</Badge>
                  </div>
                  <div className="text-[10px] tabular-nums text-muted-foreground mt-0.5">
                    {child.revenueImpact} rev · {child.ebitdaImpact} EBITDA
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{child.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>

      {/* FY2026 Outlook */}
      <Card className="border-border/60 bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Zap className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-bold mb-1">FY2026 Outlook</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{compositeHealth.outlook}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Strategy Insights Tab ────────────────────────────
function InsightsTab() {
  const [catFilter, setCatFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = ["all", "growth", "risk", "operations", "financial", "competitive", "technology"];
    const counts: Record<string, number> = { all: strategyInsights.length };
    strategyInsights.forEach(i => { counts[i.category] = (counts[i.category] || 0) + 1; });
    return cats.map(c => ({ id: c, count: counts[c] || 0 }));
  }, []);

  const sorted = useMemo(() => {
    const order: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
    let items = [...strategyInsights].sort((a, b) => order[a.severity] - order[b.severity]);
    if (catFilter !== "all") items = items.filter(i => i.category === catFilter);
    return items;
  }, [catFilter]);

  return (
    <div className="space-y-4">
      {/* Category Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setCatFilter(c.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize ${
              catFilter === c.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
            data-testid={`insight-filter-${c.id}`}
          >
            {c.id} ({c.count})
          </button>
        ))}
      </div>

      {/* Insight Cards */}
      <div className="space-y-3">
        {sorted.map(ins => {
          const isExpanded = expanded === ins.id;
          return (
            <Card key={ins.id} className={`border-border/60 ${ins.severity === "critical" ? "border-l-4 border-l-red-500" : ins.severity === "high" ? "border-l-4 border-l-amber-500" : ""}`}>
              <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {severityBadge(ins.severity)}
                    {categoryBadge(ins.category)}
                    <span className="text-xs font-bold">{ins.title}</span>
                  </div>
                  <button
                    onClick={() => setExpanded(isExpanded ? null : ins.id)}
                    className="text-muted-foreground hover:text-foreground shrink-0"
                    data-testid={`insight-expand-${ins.id}`}
                  >
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>

                {/* Summary */}
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">{ins.summary}</p>

                {/* Expandable Details */}
                {isExpanded && (
                  <div className="mb-3 space-y-1.5 ml-2">
                    {ins.details.map((d, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                        <CircleDot className="w-3 h-3 mt-0.5 shrink-0 text-muted-foreground/50" />
                        {d}
                      </div>
                    ))}
                  </div>
                )}

                {/* Agent Source */}
                <div className="text-[10px] text-muted-foreground italic mb-2">
                  <Brain className="w-3 h-3 inline mr-1" />Agent Source: {ins.agentSource}
                </div>

                {/* Recommendation */}
                <div className="rounded-lg bg-primary/5 dark:bg-primary/10 p-3 mb-2">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">Recommendation</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">{ins.recommendation}</p>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{horizonLabel(ins.timeHorizon)}</span>
                  <span className="flex items-center gap-1"><Target className="w-3 h-3" />{ins.estimatedImpact}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ── Agent Debates Tab ────────────────────────────────
function DebatesTab() {
  const agentMap = useMemo(() => {
    const m: Record<string, typeof simulationAgents[0]> = {};
    simulationAgents.forEach(a => { m[a.persona] = a; });
    return m;
  }, []);

  return (
    <div className="space-y-4">
      {/* Agent Roster */}
      <Card className="border-border/60">
        <CardContent className="p-3">
          <div className="text-xs font-bold mb-3">Agent Roster — {simulationAgents.length} Active</div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {simulationAgents.map(a => (
              <div key={a.id} className="flex flex-col items-center shrink-0 w-20">
                <div className="text-2xl mb-1">{a.avatar}</div>
                <div className="text-[10px] font-bold text-center leading-tight">{a.persona}</div>
                <div className="text-[9px] text-muted-foreground text-center leading-tight mt-0.5">{a.perspective}</div>
                <div className="w-full mt-1.5">
                  <Progress value={a.confidence * 100} className="h-1" />
                  <div className="text-[9px] text-muted-foreground text-center tabular-nums mt-0.5">{Math.round(a.confidence * 100)}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Debate Cards */}
      {agentDebates.map((debate, di) => (
        <Card key={di} className="border-border/60 overflow-hidden">
          <div className="bg-gradient-to-r from-primary/5 via-transparent to-transparent dark:from-primary/10 px-4 py-3 border-b border-border/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold">{debate.topic}</span>
              </div>
              <Badge variant="outline" className="text-[10px]">Round {debate.round}</Badge>
            </div>
          </div>
          <CardContent className="p-0">
            {/* Exchanges */}
            {debate.exchanges.map((ex, ei) => {
              const agent = agentMap[ex.agent];
              return (
                <div key={ei} className={`px-4 py-3 ${ei % 2 === 0 ? "" : "bg-muted/20 dark:bg-muted/10"} ${ei < debate.exchanges.length - 1 ? "border-b border-border/40" : ""}`}>
                  <div className="flex items-start gap-3">
                    <div className="text-lg shrink-0 mt-0.5">{agent?.avatar || "🤖"}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold">{ex.agent}</span>
                        <Badge variant="outline" className="text-[9px]">{agent?.perspective}</Badge>
                        <span className="text-[10px] tabular-nums text-muted-foreground ml-auto">{Math.round(ex.confidence * 100)}% conf</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{ex.position}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Resolution */}
            <div className="px-4 py-3 bg-primary/5 dark:bg-primary/10 border-t border-border/40">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">Resolution</span>
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold ml-auto ${
                  debate.consensusLevel === "strong" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                  : debate.consensusLevel === "moderate" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                  : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                }`}>{debate.consensusLevel} consensus</span>
              </div>
              <p className="text-[11px] leading-relaxed">{debate.resolution}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ── CEO Action Board Tab ─────────────────────────────
function ActionsTab() {
  const p1 = ceoActionItems.filter(a => a.priority === 1);
  const p2 = ceoActionItems.filter(a => a.priority === 2);
  const p3 = ceoActionItems.filter(a => a.priority === 3);
  const overdue = ceoActionItems.filter(a => a.status === "overdue").length;

  function daysUntil(deadline: string) {
    const d = new Date(deadline);
    const now = new Date("2026-03-22");
    return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  }

  function ActionCard({ item }: { item: ActionItem }) {
    const days = daysUntil(item.deadline);
    return (
      <Card className="border-border/60">
        <CardContent className="p-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                {priorityBadge(item.priority)}
                {statusBadge(item.status)}
                <Badge variant="outline" className="text-[9px]">{item.category}</Badge>
              </div>
              <p className="text-xs leading-relaxed mb-2">{item.action}</p>
              <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><User className="w-3 h-3" />{item.owner}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />{item.deadline}
                </span>
                <span className={`flex items-center gap-1 font-semibold tabular-nums ${days < 7 ? "text-red-600" : days < 14 ? "text-amber-600" : "text-muted-foreground"}`}>
                  <Clock className="w-3 h-3" />
                  {days <= 0 ? "Overdue" : `${days}d left`}
                </span>
                <span className="flex items-center gap-1"><Activity className="w-3 h-3" />{item.linkedInsight}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {[
          { l: "Total Actions", v: ceoActionItems.length, icon: Target, accent: TEAL },
          { l: "P1 — Immediate", v: p1.length, icon: AlertTriangle, accent: RED },
          { l: "P2 — This Month", v: p2.length, icon: Clock, accent: AMBER },
          { l: "P3 — This Quarter", v: p3.length, icon: Calendar, accent: "#3b82f6" },
          { l: "Overdue", v: overdue, icon: AlertTriangle, accent: overdue > 0 ? RED : GREEN },
        ].map(s => (
          <Card key={s.l} className="border-border/60" style={{ borderLeft: `3px solid ${s.accent}` }}>
            <CardContent className="p-3">
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{s.l}</div>
              <div className="text-lg font-bold tabular-nums mt-0.5">{s.v}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* P1 */}
      <div className="text-xs font-bold flex items-center gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">P1</span>
        Immediate Action
      </div>
      <div className="space-y-2">
        {p1.map(a => <ActionCard key={a.id} item={a} />)}
      </div>

      {/* P2 */}
      <div className="text-xs font-bold flex items-center gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">P2</span>
        This Month
      </div>
      <div className="space-y-2">
        {p2.map(a => <ActionCard key={a.id} item={a} />)}
      </div>

      {/* P3 */}
      <div className="text-xs font-bold flex items-center gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">P3</span>
        This Quarter
      </div>
      <div className="space-y-2">
        {p3.map(a => <ActionCard key={a.id} item={a} />)}
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────
export default function StrategySimulation() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span>🐟</span>
            Strategy Simulation Engine
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            MiroFish-powered multi-agent intelligence — Weekly forecast &amp; strategy review for RK Logistics + OnTime Trucking
          </p>
        </div>
        <Badge variant="outline" className="text-[10px] font-medium border-primary/30 text-primary flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Live Simulation
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
      {activeTab === "forecast" && <ForecastTab />}
      {activeTab === "insights" && <InsightsTab />}
      {activeTab === "debates" && <DebatesTab />}
      {activeTab === "actions" && <ActionsTab />}
    </div>
  );
}
