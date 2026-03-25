import { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  kpis, lbo, lboSourcesAndUses, lboFiveYearProjections, lboDebtSchedule,
  lboSensitivityIRR, lboSensitivityMOIC, lboComps, forecastBaseline,
} from "@/lib/data";
import {
  DollarSign, TrendingUp, Award, Building2, Calculator, BarChart3,
  PlusCircle, MinusCircle, ArrowUpRight, ArrowDownRight, Trash2, Target,
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, AreaChart, Area, Cell,
} from "recharts";

// ──────────────────────────────────────────────────────
// Shared helpers
// ──────────────────────────────────────────────────────

function fmt(n: number, decimals = 1): string {
  if (Math.abs(n) >= 1000) return `$${(n / 1000).toFixed(1)}B`;
  return `$${n.toFixed(decimals)}M`;
}

function pct(n: number): string {
  return `${n.toFixed(1)}%`;
}

function MetricCell({ label, value, sub, highlight, small }: { label: string; value: string; sub?: string; highlight?: boolean; small?: boolean }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`${small ? "text-sm" : "text-lg"} font-bold tabular-nums ${highlight ? "text-emerald-600 dark:text-emerald-400" : ""}`}>{value}</p>
      {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Tab 1: Financial Overview (original)
// ──────────────────────────────────────────────────────

function DivisionCard({ title, data, color }: { title: string; data: typeof kpis.combined; color: string }) {
  return (
    <Card className="border border-border">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-2 h-2 rounded-full ${color}`} />
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>
        <div className="space-y-4">
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">FY2025 Annual</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <MetricCell label="Revenue" value={data.revenue_fy2025} />
              <MetricCell label="EBITDA" value={data.ebitda_fy2025} />
              <MetricCell label="EBITDA Margin" value={data.ebitda_margin} />
              <MetricCell label="Gross Margin" value={data.gross_margin} />
              <MetricCell label="Net Income" value={data.net_income} />
              <MetricCell label="YoY Growth" value={`+${data.yoy_rev_growth}`} highlight />
            </div>
          </div>
          <div className="pt-3 border-t border-border">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">January 2026 Monthly</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <MetricCell label="Revenue" value={data.jan26_revenue} />
              <MetricCell label="EBITDA" value={data.jan26_ebitda} />
              <MetricCell label="EBITDA Margin" value={data.jan26_ebitda_margin} />
              <MetricCell label="Gross Margin" value={data.jan26_gross_margin} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FinancialOverview() {
  const [divTab, setDivTab] = useState("combined");
  return (
    <div className="space-y-6">
      <Tabs value={divTab} onValueChange={setDivTab}>
        <TabsList data-testid="overview-division-tabs">
          <TabsTrigger value="combined">Combined</TabsTrigger>
          <TabsTrigger value="rk">RK Logistics</TabsTrigger>
          <TabsTrigger value="ott">OTT</TabsTrigger>
        </TabsList>
        <TabsContent value="combined" className="mt-4">
          <DivisionCard title="Combined (RK Logistics + OTT)" data={kpis.combined} color="bg-primary" />
        </TabsContent>
        <TabsContent value="rk" className="mt-4">
          <DivisionCard title="RK Logistics" data={kpis.rk_logistics} color="bg-primary" />
        </TabsContent>
        <TabsContent value="ott" className="mt-4">
          <DivisionCard title="OnTime Trucking (OTT)" data={kpis.ott} color="bg-chart-2" />
        </TabsContent>
      </Tabs>

      {/* LBO Quick Summary */}
      <Card className="border border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm font-semibold">LBO Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <MetricCell label="Entry EV" value={lbo.entry_ev} sub={lbo.entry_multiple} />
            <MetricCell label="Base IRR" value={lbo.base_irr} highlight />
            <MetricCell label="MOIC" value={lbo.base_moic} highlight />
            <MetricCell label="Exit EV" value={lbo.exit_ev} sub={lbo.exit_multiple} />
            <MetricCell label="Exit Equity" value={lbo.exit_equity} />
            <MetricCell label="Hold Period" value={lbo.hold_period} />
          </div>
          <div className="mt-4 pt-3 border-t border-primary/10 grid grid-cols-2 md:grid-cols-4 gap-3">
            <MetricCell label="Total Debt" value={lbo.total_debt} small />
            <MetricCell label="Equity Check" value={lbo.equity_check} small />
            <MetricCell label="Net Debt/EBITDA" value={lbo.net_debt_ebitda} small />
            <MetricCell label="Exit Multiple" value={lbo.exit_multiple} small />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Tab 2: LBO Model (detailed)
// ──────────────────────────────────────────────────────

function SensitivityTable({ title, data, entryMultiples, exitMultiples, format, baseEntry, baseExit }: {
  title: string; data: number[][]; entryMultiples: number[]; exitMultiples: number[];
  format: (v: number) => string; baseEntry: number; baseExit: number;
}) {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        <p className="text-[10px] text-muted-foreground">Rows: Entry Multiple | Columns: Exit Multiple</p>
      </CardHeader>
      <CardContent className="p-3 overflow-x-auto">
        <table className="w-full text-xs tabular-nums">
          <thead>
            <tr>
              <th className="text-left p-1.5 text-muted-foreground font-medium">Entry \ Exit</th>
              {exitMultiples.map((em) => (
                <th key={em} className={`text-center p-1.5 font-medium ${em === baseExit ? "text-primary font-bold" : "text-muted-foreground"}`}>
                  {em.toFixed(1)}x
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entryMultiples.map((entry, ri) => (
              <tr key={entry} className={entry === baseEntry ? "bg-primary/5" : ri % 2 === 0 ? "bg-muted/30" : ""}>
                <td className={`p-1.5 font-medium ${entry === baseEntry ? "text-primary font-bold" : ""}`}>{entry.toFixed(1)}x</td>
                {exitMultiples.map((exit, ci) => {
                  const val = data[ri][ci];
                  const isBase = entry === baseEntry && exit === baseExit;
                  return (
                    <td
                      key={exit}
                      className={`text-center p-1.5 ${
                        isBase
                          ? "bg-primary text-primary-foreground font-bold rounded"
                          : val >= 30
                          ? "text-emerald-600 dark:text-emerald-400"
                          : val >= 20
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-red-500"
                      }`}
                    >
                      {format(val)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

function LBOModel() {
  const projectionChartData = lboFiveYearProjections.filter(p => p.year !== "Year 0").map(p => ({
    name: p.label,
    Revenue: p.revenue,
    EBITDA: p.ebitda,
    FCF: p.fcf,
  }));

  const debtChartData = lboDebtSchedule.map(d => ({
    name: d.year,
    Senior: d.seniorBalance,
    Mezzanine: d.mezzBalance,
  }));

  const compsMedian = {
    evEbitda: [...lboComps.map(c => c.evEbitda)].sort((a, b) => a - b)[Math.floor(lboComps.length / 2)],
    evRevenue: [...lboComps.map(c => c.evRevenue)].sort((a, b) => a - b)[Math.floor(lboComps.length / 2)],
    debtEbitda: [...lboComps.map(c => c.debtEbitda)].sort((a, b) => a - b)[Math.floor(lboComps.length / 2)],
  };

  return (
    <div className="space-y-6">
      {/* Sources & Uses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-emerald-500" /> Sources
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-1.5 text-muted-foreground font-medium">Source</th>
                  <th className="text-right p-1.5 text-muted-foreground font-medium">Amount</th>
                  <th className="text-right p-1.5 text-muted-foreground font-medium">% Total</th>
                  <th className="text-right p-1.5 text-muted-foreground font-medium">Rate</th>
                </tr>
              </thead>
              <tbody>
                {lboSourcesAndUses.sources.map(s => (
                  <tr key={s.item} className="border-b border-border/50">
                    <td className="p-1.5 font-medium">{s.item}</td>
                    <td className="p-1.5 text-right tabular-nums">{fmt(s.amount)}</td>
                    <td className="p-1.5 text-right tabular-nums text-muted-foreground">{pct(s.pct)}</td>
                    <td className="p-1.5 text-right tabular-nums">{s.rate}</td>
                  </tr>
                ))}
                <tr className="font-bold">
                  <td className="p-1.5">Total Sources</td>
                  <td className="p-1.5 text-right tabular-nums">{fmt(lboSourcesAndUses.total)}</td>
                  <td className="p-1.5 text-right tabular-nums">100%</td>
                  <td className="p-1.5"></td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <ArrowDownRight className="w-4 h-4 text-amber-500" /> Uses
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-1.5 text-muted-foreground font-medium">Use</th>
                  <th className="text-right p-1.5 text-muted-foreground font-medium">Amount</th>
                  <th className="text-right p-1.5 text-muted-foreground font-medium">% Total</th>
                </tr>
              </thead>
              <tbody>
                {lboSourcesAndUses.uses.map(u => (
                  <tr key={u.item} className="border-b border-border/50">
                    <td className="p-1.5 font-medium">{u.item}</td>
                    <td className="p-1.5 text-right tabular-nums">{fmt(u.amount)}</td>
                    <td className="p-1.5 text-right tabular-nums text-muted-foreground">{pct(u.pct)}</td>
                  </tr>
                ))}
                <tr className="font-bold">
                  <td className="p-1.5">Total Uses</td>
                  <td className="p-1.5 text-right tabular-nums">{fmt(lboSourcesAndUses.total)}</td>
                  <td className="p-1.5 text-right tabular-nums">100%</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* 5-Year Projections Chart */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" /> 5-Year Projections
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectionChartData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                <YAxis tick={{ fontSize: 11 }} className="fill-muted-foreground" tickFormatter={(v) => `$${v}M`} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}
                  formatter={(value: number) => [`$${value.toFixed(1)}M`]}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="Revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="EBITDA" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="FCF" fill="hsl(160, 60%, 45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Projection Table */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-xs tabular-nums">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-1.5 text-muted-foreground font-medium">Metric</th>
                  {lboFiveYearProjections.map(p => (
                    <th key={p.year} className="text-right p-1.5 text-muted-foreground font-medium">{p.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="p-1.5 font-medium">Revenue</td>
                  {lboFiveYearProjections.map(p => <td key={p.year} className="p-1.5 text-right">{fmt(p.revenue)}</td>)}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-1.5 font-medium">Growth %</td>
                  {lboFiveYearProjections.map(p => <td key={p.year} className="p-1.5 text-right">{p.revenueGrowth > 0 ? `${pct(p.revenueGrowth)}` : "—"}</td>)}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-1.5 font-medium">EBITDA</td>
                  {lboFiveYearProjections.map(p => <td key={p.year} className="p-1.5 text-right">{fmt(p.ebitda)}</td>)}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-1.5 font-medium">EBITDA Margin</td>
                  {lboFiveYearProjections.map(p => <td key={p.year} className="p-1.5 text-right">{pct(p.ebitdaMargin)}</td>)}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-1.5 font-medium">CapEx</td>
                  {lboFiveYearProjections.map(p => <td key={p.year} className="p-1.5 text-right">{fmt(p.capex)}</td>)}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-1.5 font-medium">Free Cash Flow</td>
                  {lboFiveYearProjections.map(p => <td key={p.year} className={`p-1.5 text-right ${p.fcf > 0 ? "text-emerald-600 dark:text-emerald-400" : ""}`}>{p.fcf > 0 ? fmt(p.fcf) : "—"}</td>)}
                </tr>
                <tr className="border-b border-border/50 font-semibold">
                  <td className="p-1.5">Total Debt</td>
                  {lboFiveYearProjections.map(p => <td key={p.year} className="p-1.5 text-right">{fmt(p.totalDebt)}</td>)}
                </tr>
                <tr className="font-semibold">
                  <td className="p-1.5">Net Debt / EBITDA</td>
                  {lboFiveYearProjections.map(p => (
                    <td key={p.year} className={`p-1.5 text-right ${p.netDebtEbitda <= 3.0 ? "text-emerald-600 dark:text-emerald-400" : p.netDebtEbitda <= 4.5 ? "text-yellow-600 dark:text-yellow-400" : "text-red-500"}`}>
                      {p.netDebtEbitda.toFixed(1)}x
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Debt Waterfall */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Debt Waterfall</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={debtChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                <YAxis tick={{ fontSize: 11 }} className="fill-muted-foreground" tickFormatter={(v) => `$${v}M`} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}
                  formatter={(value: number) => [`$${value.toFixed(1)}M`]}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="Senior" stackId="1" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" fillOpacity={0.6} />
                <Area type="monotone" dataKey="Mezzanine" stackId="1" fill="hsl(var(--chart-2))" stroke="hsl(var(--chart-2))" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Sensitivity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SensitivityTable
          title="IRR Sensitivity (%)"
          data={lboSensitivityIRR.data}
          entryMultiples={lboSensitivityIRR.entryMultiples}
          exitMultiples={lboSensitivityIRR.exitMultiples}
          format={(v) => `${v.toFixed(1)}%`}
          baseEntry={8.0}
          baseExit={9.0}
        />
        <SensitivityTable
          title="MOIC Sensitivity (x)"
          data={lboSensitivityMOIC.data}
          entryMultiples={lboSensitivityMOIC.entryMultiples}
          exitMultiples={lboSensitivityMOIC.exitMultiples}
          format={(v) => `${v.toFixed(2)}x`}
          baseEntry={8.0}
          baseExit={9.0}
        />
      </div>

      {/* Comparable Companies */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Comparable Company Analysis</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 overflow-x-auto">
          <table className="w-full text-xs tabular-nums">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-1.5 text-muted-foreground font-medium">Company</th>
                <th className="text-right p-1.5 text-muted-foreground font-medium">EV/EBITDA</th>
                <th className="text-right p-1.5 text-muted-foreground font-medium">EV/Revenue</th>
                <th className="text-right p-1.5 text-muted-foreground font-medium">Debt/EBITDA</th>
              </tr>
            </thead>
            <tbody>
              {lboComps.map((c, i) => (
                <tr key={c.name} className={`border-b border-border/50 ${i % 2 === 0 ? "bg-muted/30" : ""}`}>
                  <td className="p-1.5 font-medium">{c.name}</td>
                  <td className="p-1.5 text-right">{c.evEbitda.toFixed(1)}x</td>
                  <td className="p-1.5 text-right">{c.evRevenue.toFixed(2)}x</td>
                  <td className="p-1.5 text-right">{c.debtEbitda.toFixed(1)}x</td>
                </tr>
              ))}
              <tr className="font-bold border-t-2 border-primary/30">
                <td className="p-1.5">Median</td>
                <td className="p-1.5 text-right">{compsMedian.evEbitda.toFixed(1)}x</td>
                <td className="p-1.5 text-right">{compsMedian.evRevenue.toFixed(2)}x</td>
                <td className="p-1.5 text-right">{compsMedian.debtEbitda.toFixed(1)}x</td>
              </tr>
              <tr className="font-bold text-primary">
                <td className="p-1.5">RK Logistics (Entry)</td>
                <td className="p-1.5 text-right">8.0x</td>
                <td className="p-1.5 text-right">1.20x</td>
                <td className="p-1.5 text-right">5.5x</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Tab 3: Pro Forma Acquisition Tool
// ──────────────────────────────────────────────────────

interface AcqParams {
  targetName: string;
  targetRevenue: number;
  targetEbitda: number;
  purchaseMultiple: number;
  debtPct: number;
  debtRate: number;
  synergies: number;
  revenueGrowth: number;
}

const defaultAcq: AcqParams = {
  targetName: "Target Co.",
  targetRevenue: 25.0,
  targetEbitda: 4.5,
  purchaseMultiple: 7.0,
  debtPct: 60,
  debtRate: 9.0,
  synergies: 0.5,
  revenueGrowth: 5.0,
};

function ProFormaAcquisition() {
  const [params, setParams] = useState<AcqParams>(defaultAcq);

  const update = useCallback((field: keyof AcqParams, value: string) => {
    setParams(prev => ({
      ...prev,
      [field]: field === "targetName" ? value : parseFloat(value) || 0,
    }));
  }, []);

  const analysis = useMemo(() => {
    const ev = params.targetEbitda * params.purchaseMultiple;
    const newDebt = ev * (params.debtPct / 100);
    const newEquity = ev - newDebt;
    const annualInterest = newDebt * (params.debtRate / 100);

    // Current RK stats
    const rkRevenue = 105.4;
    const rkEbitda = 15.8;
    const rkDebt = 86.9;
    const rkEquity = 42.0;

    // Combined
    const combinedRevenue = rkRevenue + params.targetRevenue;
    const combinedEbitda = rkEbitda + params.targetEbitda + params.synergies;
    const combinedDebt = rkDebt + newDebt;
    const combinedEquity = rkEquity + newEquity;
    const combinedInterest = 8.1 + annualInterest; // RK Y1 interest + new

    // Ratios
    const combinedLeverage = combinedDebt / combinedEbitda;
    const interestCoverage = combinedEbitda / combinedInterest;
    const debtToEquity = combinedDebt / combinedEquity;

    // Pro forma growth
    const yr1Revenue = combinedRevenue * (1 + params.revenueGrowth / 100);
    const yr1Ebitda = yr1Revenue * (combinedEbitda / combinedRevenue);
    const yr2Revenue = yr1Revenue * (1 + params.revenueGrowth / 100);
    const yr2Ebitda = yr2Revenue * (combinedEbitda / combinedRevenue);

    return {
      ev, newDebt, newEquity, annualInterest,
      combinedRevenue, combinedEbitda, combinedDebt, combinedEquity,
      combinedLeverage, interestCoverage, debtToEquity,
      projections: [
        { year: "Current RK", revenue: rkRevenue, ebitda: rkEbitda, leverage: rkDebt / rkEbitda },
        { year: "Pro Forma (Day 1)", revenue: combinedRevenue, ebitda: combinedEbitda, leverage: combinedLeverage },
        { year: "Year 1", revenue: yr1Revenue, ebitda: yr1Ebitda, leverage: (combinedDebt - yr1Ebitda * 0.3) / yr1Ebitda },
        { year: "Year 2", revenue: yr2Revenue, ebitda: yr2Ebitda, leverage: (combinedDebt - yr1Ebitda * 0.3 - yr2Ebitda * 0.35) / yr2Ebitda },
      ],
    };
  }, [params]);

  const chartData = analysis.projections.map(p => ({
    name: p.year,
    Revenue: parseFloat(p.revenue.toFixed(1)),
    EBITDA: parseFloat(p.ebitda.toFixed(1)),
    Leverage: parseFloat(p.leverage.toFixed(2)),
  }));

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card className="border border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm font-semibold">Acquisition Parameters</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-1">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Target Name</Label>
              <Input data-testid="input-target-name" className="h-8 text-xs" value={params.targetName} onChange={e => update("targetName", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Target Revenue ($M)</Label>
              <Input data-testid="input-target-revenue" className="h-8 text-xs" type="number" step="0.1" value={params.targetRevenue} onChange={e => update("targetRevenue", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Target EBITDA ($M)</Label>
              <Input data-testid="input-target-ebitda" className="h-8 text-xs" type="number" step="0.1" value={params.targetEbitda} onChange={e => update("targetEbitda", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Purchase Multiple (x)</Label>
              <Input data-testid="input-purchase-multiple" className="h-8 text-xs" type="number" step="0.5" value={params.purchaseMultiple} onChange={e => update("purchaseMultiple", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Debt Financing (%)</Label>
              <Input data-testid="input-debt-pct" className="h-8 text-xs" type="number" step="5" value={params.debtPct} onChange={e => update("debtPct", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Debt Rate (%)</Label>
              <Input data-testid="input-debt-rate" className="h-8 text-xs" type="number" step="0.25" value={params.debtRate} onChange={e => update("debtRate", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Synergies ($M)</Label>
              <Input data-testid="input-synergies" className="h-8 text-xs" type="number" step="0.1" value={params.synergies} onChange={e => update("synergies", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Revenue Growth (%)</Label>
              <Input data-testid="input-acq-growth" className="h-8 text-xs" type="number" step="0.5" value={params.revenueGrowth} onChange={e => update("revenueGrowth", e.target.value)} />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" className="text-xs" onClick={() => setParams(defaultAcq)} data-testid="btn-reset-acq">
              Reset Defaults
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Deal Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Enterprise Value</p>
            <p className="text-lg font-bold tabular-nums">{fmt(analysis.ev)}</p>
            <p className="text-[10px] text-muted-foreground">{params.purchaseMultiple.toFixed(1)}x EBITDA</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">New Debt</p>
            <p className="text-lg font-bold tabular-nums text-red-500">{fmt(analysis.newDebt)}</p>
            <p className="text-[10px] text-muted-foreground">{params.debtPct}% financed @ {pct(params.debtRate)}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">New Equity</p>
            <p className="text-lg font-bold tabular-nums">{fmt(analysis.newEquity)}</p>
            <p className="text-[10px] text-muted-foreground">{(100 - params.debtPct)}% equity contribution</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Annual Interest</p>
            <p className="text-lg font-bold tabular-nums text-amber-600 dark:text-amber-400">{fmt(analysis.annualInterest)}</p>
            <p className="text-[10px] text-muted-foreground">Incremental debt service</p>
          </CardContent>
        </Card>
      </div>

      {/* Combined Impact */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Combined Entity Impact</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
            <MetricCell label="Combined Revenue" value={fmt(analysis.combinedRevenue)} />
            <MetricCell label="Combined EBITDA" value={fmt(analysis.combinedEbitda)} sub={`incl. ${fmt(params.synergies)} synergies`} />
            <MetricCell label="Total Debt" value={fmt(analysis.combinedDebt)} />
            <MetricCell
              label="Net Leverage"
              value={`${analysis.combinedLeverage.toFixed(1)}x`}
              highlight={analysis.combinedLeverage < 5.0}
            />
            <MetricCell
              label="Interest Coverage"
              value={`${analysis.interestCoverage.toFixed(1)}x`}
              highlight={analysis.interestCoverage > 2.0}
            />
            <MetricCell label="Debt/Equity" value={`${analysis.debtToEquity.toFixed(2)}x`} />
          </div>

          {/* Pro Forma Chart */}
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} className="fill-muted-foreground" />
                <YAxis tick={{ fontSize: 10 }} className="fill-muted-foreground" tickFormatter={(v) => `$${v}M`} />
                <Tooltip
                  contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}
                  formatter={(value: number, name: string) => [name === "Leverage" ? `${value}x` : `$${value}M`, name]}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="Revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="EBITDA" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Projection Table */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-xs tabular-nums">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-1.5 text-muted-foreground font-medium">Period</th>
                  <th className="text-right p-1.5 text-muted-foreground font-medium">Revenue</th>
                  <th className="text-right p-1.5 text-muted-foreground font-medium">EBITDA</th>
                  <th className="text-right p-1.5 text-muted-foreground font-medium">Leverage</th>
                </tr>
              </thead>
              <tbody>
                {analysis.projections.map((p, i) => (
                  <tr key={p.year} className={`border-b border-border/50 ${i === 1 ? "bg-primary/5 font-semibold" : ""}`}>
                    <td className="p-1.5 font-medium">{p.year}</td>
                    <td className="p-1.5 text-right">{fmt(p.revenue)}</td>
                    <td className="p-1.5 text-right">{fmt(p.ebitda)}</td>
                    <td className={`p-1.5 text-right ${p.leverage < 4.0 ? "text-emerald-600 dark:text-emerald-400" : p.leverage < 6.0 ? "text-yellow-600 dark:text-yellow-400" : "text-red-500"}`}>
                      {p.leverage.toFixed(1)}x
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Health Indicators */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant={analysis.combinedLeverage < 6.0 ? "default" : "destructive"} className="text-[10px]">
              {analysis.combinedLeverage < 4.5 ? "Healthy" : analysis.combinedLeverage < 6.0 ? "Moderate" : "High"} Leverage ({analysis.combinedLeverage.toFixed(1)}x)
            </Badge>
            <Badge variant={analysis.interestCoverage > 2.0 ? "default" : "destructive"} className="text-[10px]">
              Coverage {analysis.interestCoverage > 2.5 ? "Strong" : analysis.interestCoverage > 1.5 ? "Adequate" : "Tight"} ({analysis.interestCoverage.toFixed(1)}x)
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              Revenue +{((params.targetRevenue / 105.4) * 100).toFixed(0)}% ({fmt(params.targetRevenue)} added)
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Tab 4: Forecast Model Updater
// ──────────────────────────────────────────────────────

interface BizChange {
  id: number;
  type: "win" | "loss";
  customer: string;
  annualRevenue: number; // $M
  ebitdaMarginPct: number;
  startYear: string;
  sqft: number;
  division: "RK" | "OTT";
}

function ForecastUpdater() {
  const [changes, setChanges] = useState<BizChange[]>([]);
  const [nextId, setNextId] = useState(1);

  const addChange = useCallback((type: "win" | "loss") => {
    setChanges(prev => [
      ...prev,
      {
        id: nextId,
        type,
        customer: "",
        annualRevenue: type === "win" ? 5.0 : 3.0,
        ebitdaMarginPct: 15.0,
        startYear: "FY2026",
        sqft: 0,
        division: "RK",
      },
    ]);
    setNextId(prev => prev + 1);
  }, [nextId]);

  const removeChange = useCallback((id: number) => {
    setChanges(prev => prev.filter(c => c.id !== id));
  }, []);

  const updateChange = useCallback((id: number, field: keyof BizChange, value: string | number) => {
    setChanges(prev =>
      prev.map(c => c.id === id ? { ...c, [field]: value } : c)
    );
  }, []);

  const updatedProjections = useMemo(() => {
    const baseline = forecastBaseline.projections.map(p => ({ ...p }));
    const years = ["FY2026", "FY2027", "FY2028", "FY2029", "FY2030"];

    return baseline.map((proj, yearIdx) => {
      let revenueAdj = 0;
      let ebitdaAdj = 0;

      changes.forEach(ch => {
        const changeYearIdx = years.indexOf(ch.startYear);
        if (changeYearIdx <= yearIdx) {
          // Applies from the start year onward, with compounding growth each subsequent year
          const yearsActive = yearIdx - changeYearIdx;
          const growthFactor = Math.pow(1.05, yearsActive); // 5% organic growth on new biz
          const revImpact = ch.annualRevenue * growthFactor;
          const ebitdaImpact = revImpact * (ch.ebitdaMarginPct / 100);

          if (ch.type === "win") {
            revenueAdj += revImpact;
            ebitdaAdj += ebitdaImpact;
          } else {
            revenueAdj -= revImpact;
            ebitdaAdj -= ebitdaImpact;
          }
        }
      });

      const newTotal = proj.totalRevenue + revenueAdj;
      const newEbitda = proj.ebitda + ebitdaAdj;
      return {
        ...proj,
        totalRevenue: newTotal,
        ebitda: newEbitda,
        ebitdaMargin: newTotal > 0 ? (newEbitda / newTotal) * 100 : 0,
        revenueAdj,
        ebitdaAdj,
      };
    });
  }, [changes]);

  const totalWinsRevenue = changes.filter(c => c.type === "win").reduce((s, c) => s + c.annualRevenue, 0);
  const totalLossesRevenue = changes.filter(c => c.type === "loss").reduce((s, c) => s + c.annualRevenue, 0);
  const netImpact = totalWinsRevenue - totalLossesRevenue;

  const chartData = forecastBaseline.projections.map((base, i) => ({
    year: base.year,
    Baseline: base.totalRevenue,
    Updated: parseFloat(updatedProjections[i].totalRevenue.toFixed(1)),
  }));

  const ebitdaChartData = forecastBaseline.projections.map((base, i) => ({
    year: base.year,
    Baseline: base.ebitda,
    Updated: parseFloat(updatedProjections[i].ebitda.toFixed(1)),
  }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border border-emerald-500/30 bg-emerald-500/5">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">New Wins</p>
            <p className="text-lg font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
              +{fmt(totalWinsRevenue)}
            </p>
            <p className="text-[10px] text-muted-foreground">{changes.filter(c => c.type === "win").length} new accounts</p>
          </CardContent>
        </Card>
        <Card className="border border-red-500/30 bg-red-500/5">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Terminations</p>
            <p className="text-lg font-bold tabular-nums text-red-500">
              -{fmt(totalLossesRevenue)}
            </p>
            <p className="text-[10px] text-muted-foreground">{changes.filter(c => c.type === "loss").length} lost accounts</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Net Impact</p>
            <p className={`text-lg font-bold tabular-nums ${netImpact >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>
              {netImpact >= 0 ? "+" : ""}{fmt(netImpact)}
            </p>
            <p className="text-[10px] text-muted-foreground">Annual revenue change</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">FY2030 Forecast</p>
            <p className="text-lg font-bold tabular-nums">{fmt(updatedProjections[4].totalRevenue)}</p>
            <p className="text-[10px] text-muted-foreground">
              vs {fmt(forecastBaseline.projections[4].totalRevenue)} baseline
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add Buttons */}
      <div className="flex gap-2">
        <Button variant="default" size="sm" className="text-xs" onClick={() => addChange("win")} data-testid="btn-add-win">
          <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> Add New Win
        </Button>
        <Button variant="outline" size="sm" className="text-xs" onClick={() => addChange("loss")} data-testid="btn-add-loss">
          <MinusCircle className="w-3.5 h-3.5 mr-1.5" /> Add Termination
        </Button>
      </div>

      {/* Change Items */}
      {changes.length > 0 && (
        <div className="space-y-3">
          {changes.map(ch => (
            <Card key={ch.id} className={`border ${ch.type === "win" ? "border-emerald-500/30" : "border-red-500/30"}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={ch.type === "win" ? "default" : "destructive"} className="text-[10px]">
                    {ch.type === "win" ? "New Win" : "Termination"}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => removeChange(ch.id)} data-testid={`btn-remove-${ch.id}`}>
                    <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                  <div className="space-y-1 md:col-span-2">
                    <Label className="text-[10px]">Customer</Label>
                    <Input
                      className="h-7 text-xs"
                      placeholder="Customer name"
                      value={ch.customer}
                      onChange={e => updateChange(ch.id, "customer", e.target.value)}
                      data-testid={`input-customer-${ch.id}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px]">Annual Revenue ($M)</Label>
                    <Input
                      className="h-7 text-xs"
                      type="number"
                      step="0.5"
                      value={ch.annualRevenue}
                      onChange={e => updateChange(ch.id, "annualRevenue", parseFloat(e.target.value) || 0)}
                      data-testid={`input-revenue-${ch.id}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px]">EBITDA Margin %</Label>
                    <Input
                      className="h-7 text-xs"
                      type="number"
                      step="1"
                      value={ch.ebitdaMarginPct}
                      onChange={e => updateChange(ch.id, "ebitdaMarginPct", parseFloat(e.target.value) || 0)}
                      data-testid={`input-margin-${ch.id}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px]">Start Year</Label>
                    <Select value={ch.startYear} onValueChange={v => updateChange(ch.id, "startYear", v)}>
                      <SelectTrigger className="h-7 text-xs" data-testid={`select-year-${ch.id}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FY2026">FY2026</SelectItem>
                        <SelectItem value="FY2027">FY2027</SelectItem>
                        <SelectItem value="FY2028">FY2028</SelectItem>
                        <SelectItem value="FY2029">FY2029</SelectItem>
                        <SelectItem value="FY2030">FY2030</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px]">Division</Label>
                    <Select value={ch.division} onValueChange={v => updateChange(ch.id, "division", v)}>
                      <SelectTrigger className="h-7 text-xs" data-testid={`select-div-${ch.id}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RK">RK Logistics</SelectItem>
                        <SelectItem value="OTT">OTT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {changes.length === 0 && (
        <Card className="border border-dashed border-border">
          <CardContent className="p-8 text-center">
            <Target className="w-8 h-8 mx-auto text-muted-foreground/40 mb-2" />
            <p className="text-sm text-muted-foreground">No business changes added yet</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Add new wins or terminations to see their impact on the forecast</p>
          </CardContent>
        </Card>
      )}

      {/* Revenue Chart */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Revenue Forecast: Baseline vs. Updated</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                <YAxis tick={{ fontSize: 11 }} className="fill-muted-foreground" tickFormatter={(v) => `$${v}M`} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}
                  formatter={(value: number) => [`$${value.toFixed(1)}M`]}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="Baseline" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Updated" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* EBITDA Chart */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">EBITDA Forecast: Baseline vs. Updated</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ebitdaChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                <YAxis tick={{ fontSize: 11 }} className="fill-muted-foreground" tickFormatter={(v) => `$${v}M`} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}
                  formatter={(value: number) => [`$${value.toFixed(1)}M`]}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="Baseline" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Updated" stroke="hsl(160, 60%, 45%)" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Updated Projections Table */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Updated 5-Year Projections</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 overflow-x-auto">
          <table className="w-full text-xs tabular-nums">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-1.5 text-muted-foreground font-medium">Metric</th>
                {updatedProjections.map(p => (
                  <th key={p.year} className="text-right p-1.5 text-muted-foreground font-medium">{p.year}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="p-1.5 font-medium">Baseline Revenue</td>
                {forecastBaseline.projections.map(p => <td key={p.year} className="p-1.5 text-right text-muted-foreground">{fmt(p.totalRevenue)}</td>)}
              </tr>
              <tr className="border-b border-border/50">
                <td className="p-1.5 font-medium">Revenue Adjustment</td>
                {updatedProjections.map(p => (
                  <td key={p.year} className={`p-1.5 text-right font-medium ${p.revenueAdj > 0 ? "text-emerald-600 dark:text-emerald-400" : p.revenueAdj < 0 ? "text-red-500" : "text-muted-foreground"}`}>
                    {p.revenueAdj !== 0 ? `${p.revenueAdj > 0 ? "+" : ""}${fmt(p.revenueAdj)}` : "—"}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-border/50 font-semibold">
                <td className="p-1.5">Updated Revenue</td>
                {updatedProjections.map(p => <td key={p.year} className="p-1.5 text-right">{fmt(p.totalRevenue)}</td>)}
              </tr>
              <tr className="border-b border-border/50">
                <td className="p-1.5 font-medium">Baseline EBITDA</td>
                {forecastBaseline.projections.map(p => <td key={p.year} className="p-1.5 text-right text-muted-foreground">{fmt(p.ebitda)}</td>)}
              </tr>
              <tr className="border-b border-border/50">
                <td className="p-1.5 font-medium">EBITDA Adjustment</td>
                {updatedProjections.map(p => (
                  <td key={p.year} className={`p-1.5 text-right font-medium ${p.ebitdaAdj > 0 ? "text-emerald-600 dark:text-emerald-400" : p.ebitdaAdj < 0 ? "text-red-500" : "text-muted-foreground"}`}>
                    {p.ebitdaAdj !== 0 ? `${p.ebitdaAdj > 0 ? "+" : ""}${fmt(p.ebitdaAdj)}` : "—"}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-border/50 font-semibold">
                <td className="p-1.5">Updated EBITDA</td>
                {updatedProjections.map(p => <td key={p.year} className="p-1.5 text-right">{fmt(p.ebitda)}</td>)}
              </tr>
              <tr className="font-semibold">
                <td className="p-1.5">EBITDA Margin</td>
                {updatedProjections.map(p => <td key={p.year} className="p-1.5 text-right">{pct(p.ebitdaMargin)}</td>)}
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Main Financials Page
// ──────────────────────────────────────────────────────

export default function Financials() {
  const [mainTab, setMainTab] = useState("overview");

  return (
    <div className="space-y-6">
      <Tabs value={mainTab} onValueChange={setMainTab}>
        <TabsList data-testid="financials-main-tabs" className="flex flex-wrap h-auto gap-1">
          <TabsTrigger value="overview" data-testid="tab-overview" className="text-xs">
            <DollarSign className="w-3.5 h-3.5 mr-1" /> Overview
          </TabsTrigger>
          <TabsTrigger value="lbo" data-testid="tab-lbo" className="text-xs">
            <Award className="w-3.5 h-3.5 mr-1" /> LBO Model
          </TabsTrigger>
          <TabsTrigger value="proforma" data-testid="tab-proforma" className="text-xs">
            <Building2 className="w-3.5 h-3.5 mr-1" /> Pro Forma Acq.
          </TabsTrigger>
          <TabsTrigger value="forecast" data-testid="tab-forecast" className="text-xs">
            <TrendingUp className="w-3.5 h-3.5 mr-1" /> Forecast Updater
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <FinancialOverview />
        </TabsContent>
        <TabsContent value="lbo" className="mt-4">
          <LBOModel />
        </TabsContent>
        <TabsContent value="proforma" className="mt-4">
          <ProFormaAcquisition />
        </TabsContent>
        <TabsContent value="forecast" className="mt-4">
          <ForecastUpdater />
        </TabsContent>
      </Tabs>
    </div>
  );
}
