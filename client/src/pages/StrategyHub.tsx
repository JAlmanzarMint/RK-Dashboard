import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  competitorProfiles, swotAnalysis, emergingTechnologies,
  marketExpansionOpportunities, expansionRoadmap,
} from "@/lib/data";
import {
  Crosshair, Cpu, Map, Shield, AlertTriangle, TrendingUp, Target, Zap,
  ChevronDown, ChevronRight, Building2, DollarSign, Clock, ArrowRight,
  CheckCircle2, Rocket, BarChart3,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Cell, Legend,
} from "recharts";

// ──────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────

const threatColors: Record<string, string> = {
  High: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

const maturityColors: Record<string, string> = {
  Mainstream: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Early Mainstream": "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  Growth: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Early Growth": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  Pilot: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

const impactColors: Record<string, string> = {
  High: "text-emerald-600 dark:text-emerald-400",
  "Medium-High": "text-teal-600 dark:text-teal-400",
  Medium: "text-yellow-600 dark:text-yellow-400",
  Transformative: "text-purple-600 dark:text-purple-400",
};

const priorityLabels: Record<number, { label: string; color: string }> = {
  1: { label: "Top Priority", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  2: { label: "High Priority", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  3: { label: "Monitor", color: "bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-400" },
};

// ──────────────────────────────────────────────────────
// Tab 1: Competitive Landscape
// ──────────────────────────────────────────────────────

function CompetitiveLandscape() {
  const [expandedComp, setExpandedComp] = useState<string | null>(null);

  const swotSections = [
    { key: "strengths" as const, label: "Strengths", icon: Shield, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    { key: "weaknesses" as const, label: "Weaknesses", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10 border-red-500/20" },
    { key: "opportunities" as const, label: "Opportunities", icon: TrendingUp, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
    { key: "threats" as const, label: "Threats", icon: Zap, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  ];

  // Chart data for competitor comparison
  const compChartData = competitorProfiles.filter(c => c.evEbitda !== "\u2014").map(c => ({
    name: c.name.split(" ")[0],
    "EV/EBITDA": parseFloat(c.evEbitda),
  }));
  compChartData.push({ name: "RK", "EV/EBITDA": 8.0 });

  return (
    <div className="space-y-6">
      {/* Market Context */}
      <Card className="border border-primary/20 bg-primary/5">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold">US 3PL Market Overview</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Market Size (2025)</p>
              <p className="text-lg font-bold tabular-nums">$219.6B</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Projected 2031</p>
              <p className="text-lg font-bold tabular-nums">$272.7B</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">CAGR</p>
              <p className="text-lg font-bold tabular-nums text-emerald-600 dark:text-emerald-400">3.68%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Fastest Segment</p>
              <p className="text-sm font-bold">Value-Added Warehousing</p>
              <p className="text-[10px] text-muted-foreground">5.34% CAGR</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* EV/EBITDA Comparison */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">EV/EBITDA Valuation Comparison</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={compChartData} layout="vertical" barSize={16}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} className="fill-muted-foreground" domain={[0, 14]} tickFormatter={v => `${v}x`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} className="fill-muted-foreground" width={70} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} formatter={(v: number) => [`${v.toFixed(1)}x`]} />
                <Bar dataKey="EV/EBITDA" radius={[0, 4, 4, 0]}>
                  {compChartData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.name === "RK" ? "hsl(var(--primary))" : "hsl(var(--muted-foreground)/0.3)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Competitor Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Key Competitors</h3>
        {competitorProfiles.map(comp => {
          const isExpanded = expandedComp === comp.name;
          return (
            <Card key={comp.name} className="border border-border">
              <CardContent className="p-4">
                <button
                  className="flex items-center justify-between w-full text-left"
                  onClick={() => setExpandedComp(isExpanded ? null : comp.name)}
                  data-testid={`comp-${comp.name.replace(/\s/g, "-").toLowerCase()}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-xs font-bold shrink-0">
                      {comp.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold truncate">{comp.name}</p>
                        <Badge variant="outline" className="text-[9px] shrink-0">{comp.ticker}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{comp.focus}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden md:block text-right">
                      <p className="text-xs text-muted-foreground">Revenue</p>
                      <p className="text-sm font-semibold tabular-nums">{comp.revenue}</p>
                    </div>
                    <Badge className={`text-[9px] ${threatColors[comp.threatToRK]}`}>
                      {comp.threatToRK} Threat
                    </Badge>
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-border space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <div><p className="text-[10px] text-muted-foreground">Revenue</p><p className="text-xs font-semibold">{comp.revenue}</p></div>
                      <div><p className="text-[10px] text-muted-foreground">Employees</p><p className="text-xs font-semibold">{comp.employees}</p></div>
                      <div><p className="text-[10px] text-muted-foreground">Facilities</p><p className="text-xs font-semibold">{comp.facilities}</p></div>
                      <div><p className="text-[10px] text-muted-foreground">Sq Ft</p><p className="text-xs font-semibold">{comp.sqft}</p></div>
                      <div><p className="text-[10px] text-muted-foreground">Region</p><p className="text-xs font-semibold">{comp.region}</p></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-md p-3">
                        <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Strengths</p>
                        <p className="text-xs">{comp.strengths}</p>
                      </div>
                      <div className="bg-red-500/5 border border-red-500/10 rounded-md p-3">
                        <p className="text-[10px] font-semibold text-red-500 uppercase tracking-wider mb-1">Weaknesses</p>
                        <p className="text-xs">{comp.weaknesses}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* SWOT Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {swotSections.map(section => {
          const Icon = section.icon;
          const items = swotAnalysis[section.key];
          return (
            <Card key={section.key} className={`border ${section.bg}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${section.color}`} />
                  <CardTitle className={`text-sm font-semibold ${section.color}`}>{section.label}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ul className="space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className={`w-1 h-1 rounded-full mt-1.5 shrink-0 ${section.color === "text-emerald-600 dark:text-emerald-400" ? "bg-emerald-500" : section.color === "text-red-500" ? "bg-red-500" : section.color === "text-blue-600 dark:text-blue-400" ? "bg-blue-500" : "bg-amber-500"}`} />
                      <div>
                        <p className="text-xs">{item.item}</p>
                        <Badge variant="outline" className="text-[8px] mt-0.5">{item.category}</Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Tab 2: Emerging Technologies
// ──────────────────────────────────────────────────────

function EmergingTech() {
  const [expandedTech, setExpandedTech] = useState<string | null>(null);

  const adoptionData = emergingTechnologies.map(t => ({
    name: t.name.split(" ").slice(0, 2).join(" "),
    Adoption: parseInt(t.stats.adoptionRate),
  }));

  return (
    <div className="space-y-6">
      {/* Key Insight */}
      <Card className="border border-primary/20 bg-primary/5">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold">This Week's Technology Focus</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            85% of logistics companies plan to invest in AI tools for routing and cost prediction in the next 24 months.
            2026 is the year of practical AI in operations: triaging exceptions, reacting to weather, verifying invoices, and tuning routing in real time.
            RK should prioritize Cloud WMS completion and AI route optimization for OTT to stay competitive.
          </p>
        </CardContent>
      </Card>

      {/* Industry Adoption Chart */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Industry Adoption Rate by Technology</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adoptionData} layout="vertical" barSize={14}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} className="fill-muted-foreground" domain={[0, 100]} tickFormatter={v => `${v}%`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 9 }} className="fill-muted-foreground" width={100} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} formatter={(v: number) => [`${v}%`]} />
                <Bar dataKey="Adoption" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]}>
                  {adoptionData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.Adoption >= 60 ? "hsl(160, 60%, 45%)" : entry.Adoption >= 25 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground)/0.3)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Technology Cards */}
      <div className="space-y-3">
        {emergingTechnologies.map(tech => {
          const isExpanded = expandedTech === tech.name;
          return (
            <Card key={tech.name} className="border border-border">
              <CardContent className="p-4">
                <button
                  className="flex items-center justify-between w-full text-left"
                  onClick={() => setExpandedTech(isExpanded ? null : tech.name)}
                  data-testid={`tech-${tech.name.replace(/\s/g, "-").toLowerCase()}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">{tech.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge className={`text-[9px] ${maturityColors[tech.maturity] || ""}`}>{tech.maturity}</Badge>
                        <span className={`text-[10px] font-medium ${impactColors[tech.impact] || ""}`}>{tech.impact} Impact</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {tech.adoptionTimeline}
                    </div>
                    <div className="hidden md:block text-right">
                      <p className="text-xs font-semibold tabular-nums">{tech.investmentRange}</p>
                    </div>
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-border space-y-3">
                    <p className="text-xs">{tech.description}</p>
                    <div className="bg-primary/5 border border-primary/10 rounded-md p-3">
                      <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-1">RK Logistics Relevance</p>
                      <p className="text-xs">{tech.rkRelevance}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-muted/50 rounded-md p-2.5 text-center">
                        <p className="text-[10px] text-muted-foreground">Cost Reduction</p>
                        <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{tech.stats.costReduction}</p>
                      </div>
                      <div className="bg-muted/50 rounded-md p-2.5 text-center">
                        <p className="text-[10px] text-muted-foreground">Efficiency Gain</p>
                        <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{tech.stats.efficiencyGain}</p>
                      </div>
                      <div className="bg-muted/50 rounded-md p-2.5 text-center">
                        <p className="text-[10px] text-muted-foreground">Industry Adoption</p>
                        <p className="text-sm font-bold">{tech.stats.adoptionRate}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground font-medium mb-1">Key Vendors</p>
                      <div className="flex flex-wrap gap-1">
                        {tech.keyVendors.map(v => (
                          <Badge key={v} variant="outline" className="text-[9px]">{v}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Tab 3: Market Expansion Roadmap
// ──────────────────────────────────────────────────────

function MarketExpansion() {
  const [expandedOpp, setExpandedOpp] = useState<string | null>(null);

  const oppChartData = marketExpansionOpportunities.map(o => ({
    name: o.name.length > 16 ? o.name.split(" ").slice(0, 2).join(" ") : o.name,
    CAGR: parseFloat(o.cagr),
  }));

  return (
    <div className="space-y-6">
      {/* Roadmap Overview */}
      <Card className="border border-primary/20 bg-primary/5">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Rocket className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold">3-5 Year Expansion Strategy</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            RK Logistics should pursue a phased expansion leveraging its semiconductor expertise, existing customer relationships, and California logistics density. 
            Priority: AZ semiconductor hub (already underway) and Kato facility conversion to e-commerce fulfillment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {expansionRoadmap.map((phase, i) => (
              <div key={phase.phase} className="relative bg-background rounded-lg border border-border p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold">{phase.phase.replace(/Phase \d: /, "")}</p>
                    <p className="text-[9px] text-muted-foreground">{phase.timeline}</p>
                  </div>
                </div>
                <ul className="space-y-1">
                  {phase.initiatives.map((init, j) => (
                    <li key={j} className="flex items-start gap-1.5">
                      <CheckCircle2 className={`w-3 h-3 mt-0.5 shrink-0 ${i === 0 ? "text-primary" : "text-muted-foreground/50"}`} />
                      <span className="text-[10px]">{init}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 pt-2 border-t border-border">
                  <p className="text-[9px] text-muted-foreground">Investment: <span className="font-semibold text-foreground">{phase.investment}</span></p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CAGR Comparison */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Market Growth Rate Comparison (CAGR)</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={oppChartData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} className="fill-muted-foreground" />
                <YAxis tick={{ fontSize: 10 }} className="fill-muted-foreground" tickFormatter={v => `${v}%`} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} formatter={(v: number) => [`${v}%`]} />
                <Bar dataKey="CAGR" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                  {oppChartData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.CAGR >= 15 ? "hsl(160, 60%, 45%)" : entry.CAGR >= 10 ? "hsl(var(--primary))" : "hsl(var(--chart-2))"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Opportunity Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Expansion Opportunities</h3>
        {marketExpansionOpportunities.sort((a, b) => a.priority - b.priority).map(opp => {
          const isExpanded = expandedOpp === opp.name;
          const prio = priorityLabels[opp.priority];
          return (
            <Card key={opp.name} className="border border-border">
              <CardContent className="p-4">
                <button
                  className="flex items-center justify-between w-full text-left"
                  onClick={() => setExpandedOpp(isExpanded ? null : opp.name)}
                  data-testid={`opp-${opp.name.replace(/\s/g, "-").toLowerCase()}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold truncate">{opp.name}</p>
                        <Badge className={`text-[9px] ${prio.color}`}>{prio.label}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{opp.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden md:block text-right">
                      <p className="text-xs text-muted-foreground">Market Size</p>
                      <p className="text-sm font-semibold tabular-nums">{opp.marketSize}</p>
                    </div>
                    <div className="hidden md:block text-right">
                      <p className="text-xs text-muted-foreground">CAGR</p>
                      <p className="text-sm font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">{opp.cagr}</p>
                    </div>
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-border space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <p className="text-[10px] text-muted-foreground">Feasibility</p>
                        <p className="text-xs font-semibold">{opp.feasibility}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">Investment</p>
                        <p className="text-xs font-semibold">{opp.investmentRequired}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">Time to Revenue</p>
                        <p className="text-xs font-semibold">{opp.timeToRevenue}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">Target</p>
                        <p className="text-xs font-semibold">{opp.targetYear}</p>
                      </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/10 rounded-md p-3">
                      <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-1">RK Logistics Advantage</p>
                      <p className="text-xs">{opp.rkAdvantage}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Key Drivers</p>
                        <ul className="space-y-1">
                          {opp.keyDrivers.map((d, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <ArrowRight className="w-3 h-3 mt-0.5 text-emerald-500 shrink-0" />
                              <span className="text-[11px]">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-red-500 uppercase tracking-wider mb-1">Risks</p>
                        <ul className="space-y-1">
                          {opp.risks.map((r, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <AlertTriangle className="w-3 h-3 mt-0.5 text-red-400 shrink-0" />
                              <span className="text-[11px]">{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Main Strategy Hub
// ──────────────────────────────────────────────────────

export default function StrategyHub() {
  const [mainTab, setMainTab] = useState("competitive");

  return (
    <div className="space-y-6">
      <Tabs value={mainTab} onValueChange={setMainTab}>
        <TabsList data-testid="strategy-main-tabs" className="flex flex-wrap h-auto gap-1">
          <TabsTrigger value="competitive" data-testid="tab-competitive" className="text-xs">
            <Crosshair className="w-3.5 h-3.5 mr-1" /> Competitive Landscape
          </TabsTrigger>
          <TabsTrigger value="technology" data-testid="tab-tech-trends" className="text-xs">
            <Cpu className="w-3.5 h-3.5 mr-1" /> Emerging Technologies
          </TabsTrigger>
          <TabsTrigger value="expansion" data-testid="tab-expansion" className="text-xs">
            <Map className="w-3.5 h-3.5 mr-1" /> Market Expansion
          </TabsTrigger>
        </TabsList>

        <TabsContent value="competitive" className="mt-4">
          <CompetitiveLandscape />
        </TabsContent>
        <TabsContent value="technology" className="mt-4">
          <EmergingTech />
        </TabsContent>
        <TabsContent value="expansion" className="mt-4">
          <MarketExpansion />
        </TabsContent>
      </Tabs>
    </div>
  );
}
