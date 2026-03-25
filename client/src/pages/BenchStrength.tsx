import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  facilityOperators, benchStrengthSummary, personnelChanges,
  dailyReports, productivityMetrics, aiInsights, categoryColors,
  type FacilityOperator, type DailyReport, type ProductivityMetrics as ProdMetrics, type AIInsight,
} from "@/lib/data";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, ZAxis,
  PieChart, Pie,
} from "recharts";
import {
  Shield, AlertTriangle, TrendingUp, TrendingDown, Users, ChevronDown, ChevronRight,
  CheckCircle2, XCircle, UserPlus, UserMinus, ArrowUpRight, FileText, Clock, Zap,
  Target, AlertCircle, Award, RefreshCw, Mail, BarChart3, Brain, Lightbulb,
  ArrowRight, CircleDot,
} from "lucide-react";

function getGradeColor(grade: string) {
  switch (grade) {
    case "A": return { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", fill: "#10b981", ring: "ring-emerald-500/30" };
    case "B": return { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", fill: "#3b82f6", ring: "ring-blue-500/30" };
    case "C": return { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", fill: "#f59e0b", ring: "ring-amber-500/30" };
    case "D": return { bg: "bg-orange-500/10", text: "text-orange-600 dark:text-orange-400", fill: "#f97316", ring: "ring-orange-500/30" };
    case "F": return { bg: "bg-red-500/10", text: "text-red-600 dark:text-red-400", fill: "#ef4444", ring: "ring-red-500/30" };
    default: return { bg: "bg-muted", text: "text-muted-foreground", fill: "#888", ring: "" };
  }
}

function formatCurrency(n: number) {
  if (n < 0) return `-$${Math.abs(n).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function formatSqft(n: number) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  return `${(n / 1e3).toFixed(0)}K`;
}

function ScoreRing({ score, grade, size = 56 }: { score: number; grade: string; size?: number }) {
  const colors = getGradeColor(grade);
  const r = (size - 6) / 2;
  const circumference = 2 * Math.PI * r;
  const progress = (score / 100) * circumference;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth={3} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={colors.fill} strokeWidth={3}
          strokeDasharray={circumference} strokeDashoffset={circumference - progress} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-xs font-bold ${colors.text}`}>{grade}</span>
      </div>
    </div>
  );
}

function OperatorCard({ op, expanded, onToggle }: { op: FacilityOperator; expanded: boolean; onToggle: () => void }) {
  const colors = getGradeColor(op.grade);
  return (
    <Card className={`border border-border ${op.grade === "F" ? "border-red-500/30" : ""}`} data-testid={`operator-${op.facility.toLowerCase()}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <ScoreRing score={op.score} grade={op.grade} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold">{op.facility}</h4>
              <Badge variant="outline" className={`text-[10px] ${colors.bg} ${colors.text}`}>{op.score}/100</Badge>
            </div>
            <p className="text-xs text-muted-foreground">{op.location} &middot; {formatSqft(op.sqft)}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{op.clientMix}</p>
          </div>
          <button onClick={onToggle} className="p-1 rounded hover:bg-accent shrink-0" data-testid={`toggle-${op.facility.toLowerCase()}`}>
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-3 text-xs">
          <div>
            <span className="text-muted-foreground">Revenue</span>
            <p className="font-semibold tabular-nums">{formatCurrency(op.jan26Revenue)}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Net Rev</span>
            <p className={`font-semibold tabular-nums ${op.jan26NetRevenue < 0 ? "text-red-600 dark:text-red-400" : ""}`}>
              {formatCurrency(op.jan26NetRevenue)}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Margin</span>
            <p className={`font-semibold tabular-nums ${op.margin < 0 ? "text-red-600 dark:text-red-400" : op.margin > 35 ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
              {op.margin}%
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Vacancy</span>
            <p className={`font-semibold tabular-nums ${op.vacancyPct > 25 ? "text-red-600 dark:text-red-400" : op.vacancyPct > 0 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"}`}>
              {op.vacancyPct === 0 ? "Full" : `${op.vacancyPct}%`}
            </p>
          </div>
        </div>
        {expanded && (
          <div className="mt-4 space-y-3 border-t border-border pt-3">
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div><span className="text-muted-foreground">Labor/sqft</span><p className="font-semibold tabular-nums">${op.laborPsf.toFixed(2)}</p></div>
              <div><span className="text-muted-foreground">Rent/sqft</span><p className="font-semibold tabular-nums">${op.rentPsf.toFixed(2)}</p></div>
              <div><span className="text-muted-foreground">Avg Price</span><p className="font-semibold tabular-nums">${op.avgPrice.toFixed(2)}</p></div>
              <div><span className="text-muted-foreground">Contract %</span><p className={`font-semibold tabular-nums ${op.contractPct < 30 ? "text-red-600 dark:text-red-400" : ""}`}>{op.contractPct}%</p></div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div><span className="text-muted-foreground">Clients</span><p className="font-semibold tabular-nums">{op.totalCustomers}</p></div>
              <div><span className="text-muted-foreground">Lease Left</span><p className={`font-semibold tabular-nums ${op.monthsRemaining <= 12 ? "text-red-600 dark:text-red-400" : ""}`}>{op.monthsRemaining} mo</p></div>
              <div><span className="text-muted-foreground">Direct OH</span><p className="font-semibold tabular-nums">${op.directOhPsf.toFixed(2)}/sf</p></div>
            </div>
            <div>
              <h5 className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">Strengths</h5>
              <ul className="space-y-0.5">{op.strengths.map((s, i) => (<li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground"><CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" /><span>{s}</span></li>))}</ul>
            </div>
            <div>
              <h5 className="text-[10px] font-semibold uppercase tracking-wider text-red-600 dark:text-red-400 mb-1">Risks</h5>
              <ul className="space-y-0.5">{op.risks.map((r, i) => (<li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground"><XCircle className="w-3 h-3 text-red-500 mt-0.5 shrink-0" /><span>{r}</span></li>))}</ul>
            </div>
            <div>
              <h5 className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-1">Action Items</h5>
              <ul className="space-y-0.5">{op.actions.map((a, i) => (<li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground"><ArrowUpRight className="w-3 h-3 text-primary mt-0.5 shrink-0" /><span>{a}</span></li>))}</ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ═══════ DAILY REPORTS COMPONENTS ═══════

function ActivityFeed({ reports, facility }: { reports: DailyReport[]; facility: string }) {
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const filtered = facility === "All" ? reports : reports.filter(r => r.facility === facility);
  const sorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-3">
      {sorted.length === 0 && (
        <Card className="border border-border"><CardContent className="p-6 text-center text-sm text-muted-foreground">No reports for this facility yet.</CardContent></Card>
      )}
      {sorted.map(report => {
        const isExpanded = expandedReport === report.id;
        const hasBlockers = report.blockers !== "None" && report.blockers.length > 0;
        return (
          <Card key={report.id} className={`border ${hasBlockers ? "border-amber-500/30" : "border-border"}`} data-testid={`report-${report.id}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-semibold">{report.operatorName}</h4>
                    <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary">{report.facility}</Badge>
                    <span className="text-[11px] text-muted-foreground tabular-nums">{report.date}</span>
                    {hasBlockers && <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400">Blockers</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{report.highlights}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-bold tabular-nums">{report.totalHours}h</p>
                    <p className="text-[10px] text-muted-foreground">{report.activities.length} tasks</p>
                  </div>
                  <button onClick={() => setExpandedReport(isExpanded ? null : report.id)} className="p-1 rounded hover:bg-accent">
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-4 space-y-3 border-t border-border pt-3">
                  {/* Activities table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-1.5 font-semibold text-muted-foreground w-[130px]">Category</th>
                          <th className="text-left py-1.5 font-semibold text-muted-foreground">Activity</th>
                          <th className="text-center py-1.5 font-semibold text-muted-foreground w-[50px]">Hours</th>
                          <th className="text-center py-1.5 font-semibold text-muted-foreground w-[55px]">Impact</th>
                          <th className="text-center py-1.5 font-semibold text-muted-foreground w-[75px]">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {report.activities.map((act, i) => (
                          <tr key={i} className="border-b border-border/50">
                            <td className="py-1.5">
                              <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: categoryColors[act.category] || "#888" }} />
                                <span className="text-[11px] truncate">{act.category}</span>
                              </div>
                            </td>
                            <td className="py-1.5 text-muted-foreground pr-2">{act.description}</td>
                            <td className="py-1.5 text-center font-semibold tabular-nums">{act.hoursSpent}</td>
                            <td className="py-1.5 text-center">
                              <Badge variant="outline" className={`text-[9px] ${
                                act.impact === "High" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                                act.impact === "Medium" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" :
                                "bg-muted text-muted-foreground"
                              }`}>{act.impact}</Badge>
                            </td>
                            <td className="py-1.5 text-center">
                              <Badge variant="outline" className={`text-[9px] ${
                                act.status === "Completed" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                                act.status === "Blocked" ? "bg-red-500/10 text-red-600 dark:text-red-400" :
                                "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                              }`}>{act.status}</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Blockers & Tomorrow */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {hasBlockers && (
                      <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <AlertCircle className="w-3 h-3 text-amber-500" />
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">Blockers</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{report.blockers}</p>
                      </div>
                    )}
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <ArrowRight className="w-3 h-3 text-primary" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Tomorrow</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{report.tomorrowPriorities}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function ProductivityDashboard({ metrics }: { metrics: ProdMetrics[] }) {
  const sorted = [...metrics].sort((a, b) => b.consistencyScore - a.consistencyScore);

  // Portfolio averages
  const avgHours = (metrics.reduce((s, m) => s + m.avgHoursLogged, 0) / metrics.length).toFixed(1);
  const avgReports = (metrics.reduce((s, m) => s + m.reportsSubmitted, 0) / metrics.length).toFixed(1);
  const avgCompletion = (metrics.reduce((s, m) => s + m.completionRate, 0) / metrics.length).toFixed(0);
  const avgHighImpact = (metrics.reduce((s, m) => s + m.highImpactPct, 0) / metrics.length).toFixed(0);
  const declining = metrics.filter(m => m.trend === "Declining").length;

  // Category aggregation for portfolio pie chart
  const catAgg: Record<string, number> = {};
  metrics.forEach(m => {
    Object.entries(m.categoryBreakdown).forEach(([cat, pct]) => {
      catAgg[cat] = (catAgg[cat] || 0) + pct;
    });
  });
  const totalCatPct = Object.values(catAgg).reduce((s, v) => s + v, 0);
  const pieData = Object.entries(catAgg)
    .map(([name, value]) => ({ name, value: Math.round((value / totalCatPct) * 100), color: categoryColors[name] || "#888" }))
    .sort((a, b) => b.value - a.value);

  // Hours chart
  const hoursChartData = sorted.map(m => ({
    name: m.facility.length > 10 ? m.facility.slice(0, 9) + "…" : m.facility,
    hours: m.avgHoursLogged,
    consistency: m.consistencyScore,
    trend: m.trend,
  }));

  return (
    <div className="space-y-4">
      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Card className="border border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-1"><Clock className="w-3 h-3 text-muted-foreground" /><p className="text-xs text-muted-foreground">Avg Hours/Day</p></div>
            <p className="text-xl font-bold tabular-nums">{avgHours}<span className="text-sm text-muted-foreground">h</span></p>
            <p className="text-xs text-muted-foreground mt-1">Target: 8.0h</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-1"><FileText className="w-3 h-3 text-muted-foreground" /><p className="text-xs text-muted-foreground">Avg Reports/Week</p></div>
            <p className="text-xl font-bold tabular-nums">{avgReports}<span className="text-sm text-muted-foreground">/7</span></p>
            <p className="text-xs text-muted-foreground mt-1">Target: 5/7 (M-F)</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-1"><Target className="w-3 h-3 text-muted-foreground" /><p className="text-xs text-muted-foreground">Completion Rate</p></div>
            <p className="text-xl font-bold tabular-nums">{avgCompletion}<span className="text-sm text-muted-foreground">%</span></p>
            <p className="text-xs text-muted-foreground mt-1">Target: 90%</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-1"><Zap className="w-3 h-3 text-muted-foreground" /><p className="text-xs text-muted-foreground">High-Impact %</p></div>
            <p className="text-xl font-bold tabular-nums">{avgHighImpact}<span className="text-sm text-muted-foreground">%</span></p>
            <p className="text-xs text-muted-foreground mt-1">Target: &gt;50%</p>
          </CardContent>
        </Card>
        <Card className={`border ${declining > 2 ? "border-red-500/30" : "border-border"}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-1"><TrendingDown className="w-3 h-3 text-red-500" /><p className="text-xs text-muted-foreground">Declining Trend</p></div>
            <p className={`text-xl font-bold tabular-nums ${declining > 2 ? "text-red-600 dark:text-red-400" : ""}`}>{declining}<span className="text-sm text-muted-foreground">/12</span></p>
            <p className="text-xs text-muted-foreground mt-1">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Consistency Score Bar Chart */}
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Avg Hours & Consistency Score by Facility</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hoursChartData} layout="vertical" barCategoryGap="12%">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" width={80} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }}
                    formatter={(value: number, name: string) => [name === "consistency" ? `${value}/100` : `${value}h`, name === "consistency" ? "Consistency" : "Avg Hours"]}
                  />
                  <Bar dataKey="consistency" radius={[0, 4, 4, 0]} name="Consistency">
                    {hoursChartData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.trend === "Declining" ? "#ef4444" : entry.trend === "Improving" ? "#10b981" : "#3b82f6"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-xs"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Improving</div>
              <div className="flex items-center gap-1.5 text-xs"><div className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Stable</div>
              <div className="flex items-center gap-1.5 text-xs"><div className="w-2.5 h-2.5 rounded-full bg-red-500" /> Declining</div>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution Pie */}
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Portfolio Time Allocation</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={2} dataKey="value" nameKey="name">
                    {pieData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }}
                    formatter={(value: number, name: string) => [`${value}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-1 mt-2">
              {pieData.map(d => (
                <div key={d.name} className="flex items-center gap-1.5 text-[11px]">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-muted-foreground truncate">{d.name}</span>
                  <span className="font-semibold tabular-nums ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operator Comparison Table */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Operator Performance Comparison (7-day rolling)</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs" data-testid="productivity-table">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 font-semibold text-muted-foreground">Facility</th>
                  <th className="text-left py-2 font-semibold text-muted-foreground">Operator</th>
                  <th className="text-center py-2 font-semibold text-muted-foreground">Reports</th>
                  <th className="text-center py-2 font-semibold text-muted-foreground">Avg Hours</th>
                  <th className="text-center py-2 font-semibold text-muted-foreground">High Impact</th>
                  <th className="text-center py-2 font-semibold text-muted-foreground">Completion</th>
                  <th className="text-center py-2 font-semibold text-muted-foreground">Consistency</th>
                  <th className="text-center py-2 font-semibold text-muted-foreground">Trend</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((m, i) => (
                  <tr key={i} className={`border-b border-border/50 ${m.trend === "Declining" ? "bg-red-500/5" : ""}`}>
                    <td className="py-2 font-medium">{m.facility}</td>
                    <td className="py-2 text-muted-foreground">{m.operator}</td>
                    <td className="py-2 text-center tabular-nums">
                      <span className={m.reportsSubmitted < 5 ? "text-red-600 dark:text-red-400 font-semibold" : ""}>{m.reportsSubmitted}/7</span>
                    </td>
                    <td className="py-2 text-center tabular-nums">
                      <span className={m.avgHoursLogged < 6.5 ? "text-red-600 dark:text-red-400 font-semibold" : ""}>{m.avgHoursLogged}h</span>
                    </td>
                    <td className="py-2 text-center tabular-nums">
                      <span className={m.highImpactPct < 30 ? "text-red-600 dark:text-red-400 font-semibold" : m.highImpactPct > 50 ? "text-emerald-600 dark:text-emerald-400 font-semibold" : ""}>{m.highImpactPct}%</span>
                    </td>
                    <td className="py-2 text-center tabular-nums">
                      <span className={m.completionRate < 80 ? "text-red-600 dark:text-red-400 font-semibold" : ""}>{m.completionRate}%</span>
                    </td>
                    <td className="py-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${m.consistencyScore}%`, backgroundColor: m.consistencyScore > 85 ? "#10b981" : m.consistencyScore > 70 ? "#3b82f6" : "#ef4444" }} />
                        </div>
                        <span className="tabular-nums font-semibold">{m.consistencyScore}</span>
                      </div>
                    </td>
                    <td className="py-2 text-center">
                      <Badge variant="outline" className={`text-[9px] ${
                        m.trend === "Improving" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                        m.trend === "Declining" ? "bg-red-500/10 text-red-600 dark:text-red-400" :
                        "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      }`}>
                        {m.trend === "Improving" ? <TrendingUp className="w-3 h-3 mr-0.5 inline" /> :
                         m.trend === "Declining" ? <TrendingDown className="w-3 h-3 mr-0.5 inline" /> : null}
                        {m.trend}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InsightsPanel({ insights }: { insights: AIInsight[] }) {
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null);
  const critical = insights.filter(i => i.priority === "Critical");
  const high = insights.filter(i => i.priority === "High");
  const medium = insights.filter(i => i.priority === "Medium");
  const low = insights.filter(i => i.priority === "Low");

  function getTypeIcon(type: string) {
    switch (type) {
      case "alert": return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "improvement": return <Lightbulb className="w-4 h-4 text-amber-500" />;
      case "rebalance": return <RefreshCw className="w-4 h-4 text-blue-500" />;
      case "recognition": return <Award className="w-4 h-4 text-emerald-500" />;
      default: return <CircleDot className="w-4 h-4" />;
    }
  }

  function getTypeBg(type: string) {
    switch (type) {
      case "alert": return "bg-red-500/5 border-red-500/20";
      case "improvement": return "bg-amber-500/5 border-amber-500/20";
      case "rebalance": return "bg-blue-500/5 border-blue-500/20";
      case "recognition": return "bg-emerald-500/5 border-emerald-500/20";
      default: return "bg-muted border-border";
    }
  }

  const renderSection = (title: string, items: AIInsight[], borderColor: string) => {
    if (items.length === 0) return null;
    return (
      <div key={title}>
        <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 ${borderColor}`}>{title} ({items.length})</h3>
        <div className="space-y-2">
          {items.map((insight, i) => {
            const globalIdx = insights.indexOf(insight);
            const isExpanded = expandedInsight === globalIdx;
            return (
              <Card key={globalIdx} className={`border ${getTypeBg(insight.type)}`}>
                <CardContent className="p-3">
                  <div className="flex items-start gap-2 cursor-pointer" onClick={() => setExpandedInsight(isExpanded ? null : globalIdx)}>
                    {getTypeIcon(insight.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-xs font-semibold">{insight.title}</h4>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="outline" className="text-[9px]">{insight.category}</Badge>
                        <span className="text-[10px] text-muted-foreground">{insight.facility}</span>
                      </div>
                    </div>
                    <button className="p-0.5 shrink-0">
                      {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="mt-2 pl-6 border-t border-border/50 pt-2">
                      <p className="text-xs text-muted-foreground leading-relaxed">{insight.detail}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border border-red-500/30 bg-red-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-red-500" /><p className="text-xs text-muted-foreground">Critical Alerts</p></div>
            <p className="text-xl font-bold tabular-nums text-red-600 dark:text-red-400">{critical.length}</p>
          </CardContent>
        </Card>
        <Card className="border border-amber-500/30 bg-amber-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-1"><Lightbulb className="w-3 h-3 text-amber-500" /><p className="text-xs text-muted-foreground">Improvements</p></div>
            <p className="text-xl font-bold tabular-nums text-amber-600 dark:text-amber-400">{high.length + medium.filter(i => i.type === "improvement").length}</p>
          </CardContent>
        </Card>
        <Card className="border border-blue-500/30 bg-blue-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-1"><RefreshCw className="w-3 h-3 text-blue-500" /><p className="text-xs text-muted-foreground">Rebalance</p></div>
            <p className="text-xl font-bold tabular-nums text-blue-600 dark:text-blue-400">{insights.filter(i => i.type === "rebalance").length}</p>
          </CardContent>
        </Card>
        <Card className="border border-emerald-500/30 bg-emerald-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-1"><Award className="w-3 h-3 text-emerald-500" /><p className="text-xs text-muted-foreground">Recognitions</p></div>
            <p className="text-xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">{low.filter(i => i.type === "recognition").length}</p>
          </CardContent>
        </Card>
      </div>

      {renderSection("Critical Actions", critical, "text-red-600 dark:text-red-400")}
      {renderSection("High Priority", high, "text-amber-600 dark:text-amber-400")}
      {renderSection("Medium Priority", medium, "text-blue-600 dark:text-blue-400")}
      {renderSection("Recognition & Best Practices", low, "text-emerald-600 dark:text-emerald-400")}
    </div>
  );
}

function EmailSetupPanel() {
  return (
    <div className="space-y-4">
      <Card className="border border-primary/30 bg-primary/5">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Daily Email Reporting — Active</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Operators email their daily activity reports. The system automatically reads incoming emails,
                categorizes activities, calculates productivity metrics, and generates AI-driven improvement recommendations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Mail className="w-4 h-4" /> How It Works
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <ol className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                <span>Each operator sends a daily email with their activities, hours, highlights, and blockers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                <span>Emails are automatically scanned and parsed into structured activity reports</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                <span>Activities are categorized (Operations, Client Mgmt, BD, Safety, etc.) and scored for impact</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">4</span>
                <span>Productivity analytics aggregate data across all facilities into trends and benchmarks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">5</span>
                <span>AI insights identify time reallocation opportunities, understaffing, and best practices to replicate</span>
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4" /> Email Template for Operators
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="bg-muted/50 rounded-lg p-3 text-xs font-mono text-muted-foreground space-y-1.5">
              <p className="text-foreground font-semibold">Subject: Daily Report — [Facility] — [Date]</p>
              <p>&nbsp;</p>
              <p className="text-foreground font-semibold">Activities:</p>
              <p>1. [Category] — [Description] — [Hours] — [Status]</p>
              <p>2. [Category] — [Description] — [Hours] — [Status]</p>
              <p>3. ...</p>
              <p>&nbsp;</p>
              <p className="text-foreground font-semibold">Highlights:</p>
              <p>[Key wins and accomplishments today]</p>
              <p>&nbsp;</p>
              <p className="text-foreground font-semibold">Blockers:</p>
              <p>[Issues needing help or escalation]</p>
              <p>&nbsp;</p>
              <p className="text-foreground font-semibold">Tomorrow's Priorities:</p>
              <p>[Top 2-3 priorities for tomorrow]</p>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">
              Categories: Operations, Client Management, Safety & Compliance, Labor Management, Business Development, Maintenance & Facilities, Admin & Reporting, Training & Development
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <BarChart3 className="w-4 h-4" /> Key Productivity Benchmarks
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-muted-foreground">Report Frequency</p>
              <p className="text-sm font-bold mt-1">5/7 days</p>
              <p className="text-[10px] text-muted-foreground">Mon-Fri minimum</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-muted-foreground">Hours Target</p>
              <p className="text-sm font-bold mt-1">8.0h/day</p>
              <p className="text-[10px] text-muted-foreground">Min 7h, flag &lt;6.5h</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-muted-foreground">High-Impact Target</p>
              <p className="text-sm font-bold mt-1">&gt;50%</p>
              <p className="text-[10px] text-muted-foreground">Ops + Client + BD time</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-muted-foreground">Admin Cap</p>
              <p className="text-sm font-bold mt-1">&lt;8%</p>
              <p className="text-[10px] text-muted-foreground">Currently 13% avg</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ═══════ MAIN COMPONENT ═══════

export default function BenchStrength() {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const toggleCard = (name: string) => setExpandedCards(prev => ({ ...prev, [name]: !prev[name] }));
  const [facilityFilter, setFacilityFilter] = useState("All");

  const sorted = [...facilityOperators].sort((a, b) => b.score - a.score);
  const summary = benchStrengthSummary;

  const scoreChartData = sorted.map(op => ({ name: op.facility, score: op.score, grade: op.grade }));
  const marginVsVacancyData = facilityOperators.map(op => ({ name: op.facility, x: op.vacancyPct, y: op.margin, z: op.sqft / 5000, grade: op.grade }));
  const radarData = [
    { metric: "Margin", A: 36.2, B: 34.2, C: 43.7, D: 29.3, F: 16.4 },
    { metric: "Occupancy", A: 100, B: 100, C: 92.8, D: 69.2, F: 44.9 },
    { metric: "Contract %", A: 100, B: 63, C: 17, D: 20, F: 16 },
    { metric: "Lease Security", A: 100, B: 60, C: 47, D: 46, F: 100 },
    { metric: "Pricing Power", A: 85, B: 55, C: 40, D: 42, F: 20 },
  ];

  const facilityNames = ["All", ...facilityOperators.map(f => f.facility).sort()];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="daily-reports">
        <TabsList className="mb-4">
          <TabsTrigger value="daily-reports" data-testid="tab-daily-reports">
            <FileText className="w-3 h-3 mr-1.5" /> Daily Reports
          </TabsTrigger>
          <TabsTrigger value="scorecard" data-testid="tab-scorecard">Scorecard</TabsTrigger>
          <TabsTrigger value="facilities" data-testid="tab-facilities">Facility Detail</TabsTrigger>
          <TabsTrigger value="personnel" data-testid="tab-personnel">Personnel</TabsTrigger>
        </TabsList>

        {/* ═══════ TAB 1: DAILY REPORTS ═══════ */}
        <TabsContent value="daily-reports">
          <Tabs defaultValue="feed">
            <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
              <TabsList>
                <TabsTrigger value="feed" data-testid="subtab-feed"><Mail className="w-3 h-3 mr-1" /> Activity Feed</TabsTrigger>
                <TabsTrigger value="analytics" data-testid="subtab-analytics"><BarChart3 className="w-3 h-3 mr-1" /> Productivity</TabsTrigger>
                <TabsTrigger value="insights" data-testid="subtab-insights"><Brain className="w-3 h-3 mr-1" /> AI Insights</TabsTrigger>
                <TabsTrigger value="setup" data-testid="subtab-setup"><Mail className="w-3 h-3 mr-1" /> Setup</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <select
                  value={facilityFilter}
                  onChange={(e) => setFacilityFilter(e.target.value)}
                  className="text-xs bg-background border border-border rounded-md px-2 py-1.5 text-foreground"
                  data-testid="facility-filter"
                >
                  {facilityNames.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>

            <TabsContent value="feed">
              <ActivityFeed reports={dailyReports} facility={facilityFilter} />
            </TabsContent>
            <TabsContent value="analytics">
              <ProductivityDashboard metrics={productivityMetrics} />
            </TabsContent>
            <TabsContent value="insights">
              <InsightsPanel insights={aiInsights} />
            </TabsContent>
            <TabsContent value="setup">
              <EmailSetupPanel />
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* ═══════ TAB 2: SCORECARD ═══════ */}
        <TabsContent value="scorecard">
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3" data-testid="bench-kpis">
              <Card className="border border-border"><CardContent className="p-4"><p className="text-xs text-muted-foreground">Portfolio Score</p><p className="text-xl font-bold tabular-nums">{summary.avgScore}<span className="text-sm text-muted-foreground">/100</span></p><p className="text-xs text-muted-foreground mt-1">Avg across 12 facilities</p></CardContent></Card>
              <Card className="border border-border"><CardContent className="p-4"><p className="text-xs text-muted-foreground">Monthly Net Revenue</p><p className="text-xl font-bold tabular-nums">{formatCurrency(summary.totalMonthlyNetRevenue)}</p><p className="text-xs text-muted-foreground mt-1">{summary.portfolioMargin}% margin</p></CardContent></Card>
              <Card className="border border-border"><CardContent className="p-4"><p className="text-xs text-muted-foreground">Grade Distribution</p><div className="flex gap-1 mt-1">{(["A","B","C","D","F"] as const).map(g => { const c = getGradeColor(g); return (<div key={g} className={`flex-1 text-center py-1 rounded ${c.bg}`}><span className={`text-xs font-bold ${c.text}`}>{g}:{summary.gradeDistribution[g]}</span></div>);})}</div></CardContent></Card>
              <Card className="border border-border"><CardContent className="p-4"><div className="flex items-center gap-1"><TrendingUp className="w-3 h-3 text-emerald-500" /><p className="text-xs text-muted-foreground">Top Performer</p></div><p className="text-sm font-bold mt-1">{summary.topPerformer}</p></CardContent></Card>
              <Card className="border border-border"><CardContent className="p-4"><div className="flex items-center gap-1"><TrendingDown className="w-3 h-3 text-red-500" /><p className="text-xs text-muted-foreground">Bottom Performer</p></div><p className="text-sm font-bold mt-1 text-red-600 dark:text-red-400">{summary.bottomPerformer}</p></CardContent></Card>
            </div>
            <Card className="border border-red-500/30 bg-red-500/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2"><AlertTriangle className="w-4 h-4 text-red-500" /><h3 className="text-sm font-bold text-red-600 dark:text-red-400">Critical Actions Required</h3></div>
                <ul className="space-y-1">{summary.criticalActions.map((a, i) => (<li key={i} className="flex items-start gap-2 text-xs text-muted-foreground"><div className="w-1 h-1 rounded-full bg-red-500 mt-1.5 shrink-0" /><span>{a}</span></li>))}</ul>
              </CardContent>
            </Card>
            <Card className="border border-border">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Facility Scores (100-point scale)</CardTitle></CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scoreChartData} layout="vertical" barCategoryGap="12%">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" width={80} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} formatter={(value: number, _name: string, props: any) => [`${value}/100 (${props.payload.grade})`, "Score"]} />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]}>{scoreChartData.map((entry, idx) => (<Cell key={idx} fill={getGradeColor(entry.grade).fill} />))}</Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-border">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Margin vs. Vacancy (bubble = sqft)</CardTitle></CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" dataKey="x" name="Vacancy" unit="%" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" label={{ value: "Vacancy %", position: "bottom", fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis type="number" dataKey="y" name="Margin" unit="%" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" label={{ value: "Margin %", angle: -90, position: "insideLeft", fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <ZAxis type="number" dataKey="z" range={[40, 400]} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} content={({ active, payload }) => { if (active && payload && payload.length) { const d = payload[0].payload; return (<div className="bg-card border border-border rounded-lg p-2 text-xs shadow-lg"><p className="font-semibold">{d.name}</p><p>Vacancy: {d.x}%</p><p>Margin: {d.y}%</p></div>);} return null;}} />
                      <Scatter data={marginVsVacancyData} fill="#0d9488">{marginVsVacancyData.map((entry, idx) => (<Cell key={idx} fill={getGradeColor(entry.grade).fill} />))}</Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-border">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Grade Profile Comparison (Avg by Grade Group)</CardTitle></CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <PolarRadiusAxis tick={{ fontSize: 9 }} stroke="hsl(var(--border))" />
                      <Radar name="A-Grade" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.15} />
                      <Radar name="B-Grade" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                      <Radar name="F-Grade" dataKey="F" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-xs"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> A-Grade</div>
                  <div className="flex items-center gap-1.5 text-xs"><div className="w-2.5 h-2.5 rounded-full bg-blue-500" /> B-Grade</div>
                  <div className="flex items-center gap-1.5 text-xs"><div className="w-2.5 h-2.5 rounded-full bg-red-500" /> F-Grade</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ═══════ TAB 3: FACILITY DETAIL ═══════ */}
        <TabsContent value="facilities">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2"><Shield className="w-4 h-4" /><span>Ranked by composite score. Click to expand detailed analysis.</span></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">{sorted.map(op => (<OperatorCard key={op.facility} op={op} expanded={!!expandedCards[op.facility]} onToggle={() => toggleCard(op.facility)} />))}</div>
          </div>
        </TabsContent>

        {/* ═══════ TAB 4: PERSONNEL ═══════ */}
        <TabsContent value="personnel">
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card className="border border-border"><CardContent className="p-4"><p className="text-xs text-muted-foreground">Key Hires (12 mo)</p><p className="text-xl font-bold tabular-nums">8</p><p className="text-xs text-muted-foreground mt-1">5 backfill, 3 net new</p></CardContent></Card>
              <Card className="border border-border"><CardContent className="p-4"><p className="text-xs text-muted-foreground">Departures (12 mo)</p><p className="text-xl font-bold tabular-nums text-red-600 dark:text-red-400">7</p><p className="text-xs text-muted-foreground mt-1">6 involuntary, 1 voluntary</p></CardContent></Card>
              <Card className="border border-border"><CardContent className="p-4"><p className="text-xs text-muted-foreground">Turnover Signal</p><p className="text-xl font-bold text-amber-600 dark:text-amber-400">Elevated</p><p className="text-xs text-muted-foreground mt-1">High BD team churn</p></CardContent></Card>
              <Card className="border border-border"><CardContent className="p-4"><p className="text-xs text-muted-foreground">Open Gaps</p><p className="text-xl font-bold tabular-nums">2</p><p className="text-xs text-muted-foreground mt-1">Billing Mgr, Ops Excellence</p></CardContent></Card>
            </div>
            <Card className="border border-amber-500/30 bg-amber-500/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2"><Users className="w-4 h-4 text-amber-500" /><h3 className="text-sm font-bold text-amber-700 dark:text-amber-400">Bench Strength Assessment</h3></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Strong Areas</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" /> Operations: James Bryant stable, Robert Miller and Kip Boetel filling site manager gaps</li>
                      <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" /> Finance: Jennica Hansen and Matthew Robles in place; stable team</li>
                      <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" /> Transportation: Keith Hochberg and Kendall Newman recently backfilled</li>
                      <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" /> Technology: AI Specialist added (Alex Niswander, Dec 2025)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Risk Areas</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-1.5"><XCircle className="w-3 h-3 text-red-500 mt-0.5 shrink-0" /> BD team: 4 departures in 12 months (Graham, Michaux, Killian, Tomasula)</li>
                      <li className="flex items-start gap-1.5"><XCircle className="w-3 h-3 text-red-500 mt-0.5 shrink-0" /> Billing Manager gap (Jenkins terminated Nov 2025, unfilled)</li>
                      <li className="flex items-start gap-1.5"><XCircle className="w-3 h-3 text-red-500 mt-0.5 shrink-0" /> Ops Excellence gap (Henning terminated Jan 2026, unfilled)</li>
                      <li className="flex items-start gap-1.5"><XCircle className="w-3 h-3 text-red-500 mt-0.5 shrink-0" /> No succession plan visible for key director-level roles</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-border">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Personnel Changes (Recent 15)</CardTitle></CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs" data-testid="personnel-table">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 font-semibold text-muted-foreground">Name</th>
                        <th className="text-left py-2 font-semibold text-muted-foreground">Role</th>
                        <th className="text-left py-2 font-semibold text-muted-foreground">Date</th>
                        <th className="text-left py-2 font-semibold text-muted-foreground">Event</th>
                        <th className="text-left py-2 font-semibold text-muted-foreground">Type</th>
                        <th className="text-left py-2 font-semibold text-muted-foreground">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {personnelChanges.map((p, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 font-medium">{p.name}</td>
                          <td className="py-2 text-muted-foreground max-w-[180px] truncate">{p.role}</td>
                          <td className="py-2 text-muted-foreground tabular-nums">{p.date}</td>
                          <td className="py-2">
                            <Badge variant="outline" className={`text-[10px] ${p.event === "Hired" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : p.event === "Terminated" ? "bg-red-500/10 text-red-600 dark:text-red-400" : "bg-blue-500/10 text-blue-600 dark:text-blue-400"}`}>
                              {p.event === "Hired" ? <UserPlus className="w-3 h-3 mr-1 inline" /> : p.event === "Terminated" ? <UserMinus className="w-3 h-3 mr-1 inline" /> : null}
                              {p.event}
                            </Badge>
                          </td>
                          <td className="py-2"><Badge variant="outline" className="text-[10px]">{p.type}</Badge></td>
                          <td className="py-2 text-muted-foreground max-w-[200px] truncate">{p.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
