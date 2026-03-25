import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { priorityOutreach, ottCarrierOutreach, pipeline } from "@/lib/data";
import { Star, AlertTriangle, ArrowUp, Sparkles, Search, Target, Zap, TrendingUp, Eye, Crosshair, Shield, MapPin, ChevronDown, ChevronRight } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { competitorProfiles, competitorIntelKPIs, accountOverlap, verticalThreatMatrix, geoCompetition } from "@/lib/competitorIntelData";

function getPriorityColor(priority: string) {
  switch (priority) {
    case "Critical": return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
    case "High": return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    case "Medium": return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    case "Low": return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    default: return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
  }
}

function getActionColor(action: string) {
  if (action.includes("MARGIN FIX URGENT")) return "bg-red-600 text-white";
  if (action.includes("MARGIN FIX")) return "bg-amber-500 text-white";
  if (action.includes("PROTECT")) return "bg-emerald-600 text-white";
  if (action.includes("NEW BUSINESS")) return "bg-blue-600 text-white";
  if (action.includes("EXPAND")) return "bg-purple-600 text-white";
  if (action.includes("DEVELOP")) return "bg-gray-600 text-white";
  return "bg-primary text-primary-foreground";
}

function getMarginColor(margin: string) {
  if (margin === "—") return "text-muted-foreground";
  const val = parseFloat(margin);
  if (val > 20) return "text-emerald-600 dark:text-emerald-400";
  if (val > 0) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}

const pipelineStatusColor: Record<string, string> = {
  "Won": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "CLOSED WON": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "In Progress": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "Early Stage": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  "Contracting": "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
  "SOW Development": "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
};

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

function getThreatBadgeClass(threat: string) {
  switch (threat) {
    case "high": return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
    case "medium": return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    case "low": return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    default: return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
  }
}

function getOverlapBarColor(score: number) {
  if (score > 70) return "bg-red-500";
  if (score > 50) return "bg-amber-500";
  return "bg-emerald-500";
}

function getOverlapTextColor(score: number) {
  if (score > 70) return "text-red-600 dark:text-red-400";
  if (score > 50) return "text-amber-600 dark:text-amber-400";
  return "text-emerald-600 dark:text-emerald-400";
}

function getStrengthBgClass(strength: string) {
  switch (strength) {
    case "dominant": return "bg-red-500/10 text-red-600 dark:text-red-400";
    case "strong": return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
    case "moderate": return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    case "emerging": return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
    default: return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
  }
}

const avgOverlapScore = Math.round(
  competitorProfiles.reduce((sum, c) => sum + c.overlapScore, 0) / competitorProfiles.length
);

const sortedCompetitors = [...competitorProfiles].sort((a, b) => b.overlapScore - a.overlapScore);

const strengthLevels = ["dominant", "strong", "moderate", "emerging"] as const;

const accountOverlapEntries = Object.entries(accountOverlap);

export default function BusinessDevelopment() {
  const [activeTab, setActiveTab] = useState("pipeline");
  const [expandedCompetitors, setExpandedCompetitors] = useState<Record<string, boolean>>({});

  const toggleCompetitor = (name: string) => {
    setExpandedCompetitors((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex items-center gap-2">
        <button
          data-testid="tab-pipeline"
          onClick={() => setActiveTab("pipeline")}
          className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeTab === "pipeline"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Pipeline &amp; Outreach
        </button>
        <button
          data-testid="tab-competitor-intel"
          onClick={() => setActiveTab("competitor-intel")}
          className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeTab === "competitor-intel"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Competitor Intel
        </button>
      </div>

      {/* Tab 1: Pipeline & Outreach */}
      {activeTab === "pipeline" && (
        <div className="space-y-6">
          {/* Pipeline KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border border-primary/20 bg-primary/5">
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground">Total Pipeline</p>
                <p className="text-2xl font-bold tabular-nums">{pipeline.total_value}</p>
                <p className="text-xs text-muted-foreground mt-1">Win rate: {pipeline.conversion_rate}</p>
              </CardContent>
            </Card>
            <Card className="border border-emerald-500/20 bg-emerald-500/5">
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground">Strategic Pipeline</p>
                <p className="text-2xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">{pipeline.strategic_total}</p>
                <p className="text-xs text-muted-foreground mt-1">Big 9 + Near-Term</p>
              </CardContent>
            </Card>
            <Card className="border border-border md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Pipeline by Stage</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-[140px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pipeline.stages} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={55} innerRadius={30} paddingAngle={4}>
                        {pipeline.stages.map((_, idx) => (
                          <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} formatter={(v: number) => `$${v}M`} />
                      <Legend wrapperStyle={{ fontSize: 10 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Big 9 Strategic Opportunities */}
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" /> Big 9 Strategic Opportunities
                </CardTitle>
                <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">{pipeline.big9_opportunities.length} Deals</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="rounded-lg border border-border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Account</TableHead>
                      <TableHead className="text-xs">Location</TableHead>
                      <TableHead className="text-xs">Description</TableHead>
                      <TableHead className="text-xs text-right">Est. Revenue</TableHead>
                      <TableHead className="text-xs">Next Steps</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pipeline.big9_opportunities.map((opp, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-xs font-semibold whitespace-nowrap">{opp.account}</TableCell>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{opp.location}</TableCell>
                        <TableCell className="text-xs text-muted-foreground max-w-[220px]">{opp.description}</TableCell>
                        <TableCell className="text-xs tabular-nums font-medium text-right whitespace-nowrap">{opp.est_rev}</TableCell>
                        <TableCell className="text-xs text-muted-foreground max-w-[200px]">{opp.next_steps}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`text-[10px] whitespace-nowrap ${pipelineStatusColor[opp.status] || ""}`}>{opp.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* High Probability Near-Term */}
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-500" /> High Probability Near-Term Deals
                </CardTitle>
                <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">{pipeline.high_prob_near_term.length} Deals</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="rounded-lg border border-border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Company</TableHead>
                      <TableHead className="text-xs">Site</TableHead>
                      <TableHead className="text-xs text-right">Sq Ft</TableHead>
                      <TableHead className="text-xs text-right">Annual Rev</TableHead>
                      <TableHead className="text-xs">Close</TableHead>
                      <TableHead className="text-xs">Start</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pipeline.high_prob_near_term.map((deal, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-xs font-semibold whitespace-nowrap">{deal.company}</TableCell>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{deal.site}</TableCell>
                        <TableCell className="text-xs tabular-nums text-right">{deal.sqft}</TableCell>
                        <TableCell className="text-xs tabular-nums font-medium text-right whitespace-nowrap">{deal.annual_rev}</TableCell>
                        <TableCell className="text-xs">{deal.close}</TableCell>
                        <TableCell className="text-xs">{deal.start}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`text-[10px] whitespace-nowrap ${pipelineStatusColor[deal.status] || ""}`}>{deal.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Priority Outreach Banner */}
          <Card className="border border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-bold">Priority Outreach — Action Required</h2>
              </div>
              <p className="text-xs text-muted-foreground">
                9 RK Logistics priority customers ranked by revenue impact and margin urgency. Focus: Fix Tesla/KLA/Delta margins, protect LAM, close pipeline.
              </p>
            </CardContent>
          </Card>

          {/* RK Priority Customers */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">RK Logistics Customers</h3>
            <div className="space-y-3">
              {priorityOutreach.map((c) => (
                <Card key={c.rank} className="border border-border hover:border-primary/30 transition-colors" data-testid={`customer-card-${c.rank}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Rank */}
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold tabular-nums shrink-0">
                        {c.rank}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Top row: name, badges, action */}
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <h4 className="text-sm font-semibold">{c.name}</h4>
                          <Badge variant="outline" className={`text-[10px] ${getPriorityColor(c.priority)}`}>
                            {c.priority}
                          </Badge>
                          {c.tier !== "New" && c.tier !== "Prospect" && c.tier !== "Expand" && (
                            <Badge variant="outline" className="text-[10px]">{c.tier}</Badge>
                          )}
                          <Badge className={`text-[10px] ${getActionColor(c.action)}`}>
                            {c.action}
                          </Badge>
                        </div>

                        {/* Metrics row */}
                        <div className="flex items-center gap-4 text-xs mb-2 flex-wrap">
                          <span className="text-muted-foreground">
                            Industry: <span className="text-foreground font-medium">{c.industry}</span>
                          </span>
                          <span className="text-muted-foreground">
                            Revenue: <span className="text-foreground font-medium tabular-nums">{c.revenue}</span>
                          </span>
                          {c.pct !== "—" && (
                            <span className="text-muted-foreground">
                              Share: <span className="text-foreground font-medium tabular-nums">{c.pct}</span>
                            </span>
                          )}
                          <span className="text-muted-foreground">
                            Margin: <span className={`font-semibold tabular-nums ${getMarginColor(c.margin)}`}>{c.margin}</span>
                          </span>
                        </div>

                        {/* Detail */}
                        <p className="text-xs text-muted-foreground leading-relaxed">{c.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* OTT Carriers Section */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">OnTime Trucking Carriers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {ottCarrierOutreach.map((c) => (
                <Card key={c.name} className="border border-border" data-testid={`ott-card-${c.name}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold">{c.name}</h4>
                      <Badge variant="secondary" className="text-[10px]">{c.type}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs mb-2">
                      <span><span className="text-muted-foreground">Revenue:</span> <span className="font-semibold tabular-nums">{c.revenue}</span></span>
                      <span><span className="text-muted-foreground">Share:</span> <span className="font-semibold tabular-nums">{c.pct}</span></span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{c.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Competitor Intel */}
      {activeTab === "competitor-intel" && (
        <div className="space-y-6">
          {/* KPI Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border border-border" data-testid="kpi-competitors-tracked">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Competitors Tracked</p>
                </div>
                <p className="text-2xl font-bold tabular-nums">{competitorIntelKPIs.totalCompetitorsTracked}</p>
              </CardContent>
            </Card>
            <Card className="border border-red-500/20 bg-red-500/5" data-testid="kpi-high-threat">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <p className="text-xs text-muted-foreground">High-Threat Relationships</p>
                </div>
                <p className="text-2xl font-bold tabular-nums text-red-600 dark:text-red-400">{competitorIntelKPIs.highThreatRelationships}</p>
              </CardContent>
            </Card>
            <Card className="border border-border" data-testid="kpi-overlap-score">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground">RK Overlap Score (Avg)</p>
                </div>
                <p className={`text-2xl font-bold tabular-nums ${getOverlapTextColor(avgOverlapScore)}`}>{avgOverlapScore}%</p>
              </CardContent>
            </Card>
            <Card className="border border-border" data-testid="kpi-overlapping-verticals">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <Crosshair className="h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Key Overlapping Verticals</p>
                </div>
                <p className="text-2xl font-bold tabular-nums">{competitorIntelKPIs.overlappingVerticals.length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Competitor Profiles — Expandable Cards */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Competitor Profiles</h3>
            <div className="space-y-3">
              {sortedCompetitors.map((comp) => {
                const isExpanded = expandedCompetitors[comp.name] ?? false;
                return (
                  <Card key={comp.name} className="border border-border" data-testid={`competitor-card-${comp.name}`}>
                    <CardContent className="p-4">
                      {/* Header row */}
                      <button
                        className="w-full text-left"
                        onClick={() => toggleCompetitor(comp.name)}
                        data-testid={`competitor-toggle-${comp.name}`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="shrink-0">
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <h4 className="text-sm font-semibold">{comp.name}</h4>
                          <Badge variant="outline" className="text-[10px]">{comp.revenue}</Badge>
                          <div className="flex items-center gap-2 ml-auto">
                            <span className={`text-xs font-semibold tabular-nums ${getOverlapTextColor(comp.overlapScore)}`}>
                              {comp.overlapScore}%
                            </span>
                            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${getOverlapBarColor(comp.overlapScore)}`}
                                style={{ width: `${comp.overlapScore}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* Subtitle: geoFocus */}
                      <p className="text-xs text-muted-foreground truncate mb-2 pl-7">{comp.geoFocus}</p>

                      {/* Key verticals as badges */}
                      <div className="flex flex-wrap gap-1 mb-2 pl-7">
                        {comp.keyVerticals.map((v) => (
                          <Badge key={v} variant="secondary" className="text-[10px]">{v}</Badge>
                        ))}
                      </div>

                      {/* Recent wins */}
                      <p className="text-xs text-muted-foreground leading-relaxed pl-7">{comp.recentWins}</p>

                      {/* Expanded: customers table */}
                      {isExpanded && (
                        <div className="mt-4 pl-7">
                          <div className="rounded-lg border border-border overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="text-xs">Customer</TableHead>
                                  <TableHead className="text-xs">Location</TableHead>
                                  <TableHead className="text-xs">Services</TableHead>
                                  <TableHead className="text-xs">Vertical</TableHead>
                                  <TableHead className="text-xs">Year</TableHead>
                                  <TableHead className="text-xs">Threat</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {comp.customers.map((cust, i) => (
                                  <TableRow key={i}>
                                    <TableCell className="text-xs font-semibold whitespace-nowrap">{cust.customer}</TableCell>
                                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{cust.location}</TableCell>
                                    <TableCell className="text-xs text-muted-foreground max-w-[220px]">{cust.services}</TableCell>
                                    <TableCell className="text-xs whitespace-nowrap">{cust.vertical}</TableCell>
                                    <TableCell className="text-xs tabular-nums">{cust.year}</TableCell>
                                    <TableCell>
                                      <Badge variant="outline" className={`text-[10px] whitespace-nowrap capitalize ${getThreatBadgeClass(cust.threatLevel)}`}>
                                        {cust.threatLevel}
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Account Overlap — Alert Cards */}
          <div>
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
              <Shield className="h-4 w-4 text-primary" /> Account Overlap Alerts
            </h3>
            <div className="space-y-3">
              {accountOverlapEntries.map(([account, data]) => {
                const borderColor = data.competitors.length >= 2
                  ? "border-red-500/40"
                  : "border-amber-500/40";
                return (
                  <Card key={account} className={`border ${borderColor}`} data-testid={`overlap-card-${account}`}>
                    <CardContent className="p-4">
                      <h4 className="text-sm font-semibold mb-2">{account}</h4>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {data.competitors.map((c) => (
                          <Badge key={c} variant="outline" className="text-[10px]">{c}</Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{data.riskNote}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Vertical Threat Matrix — Table */}
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Crosshair className="h-4 w-4 text-primary" /> Vertical Threat Matrix
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="rounded-lg border border-border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Vertical</TableHead>
                      {strengthLevels.map((level) => (
                        <TableHead key={level} className="text-xs capitalize">{level}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {verticalThreatMatrix.map((row) => (
                      <TableRow key={row.vertical}>
                        <TableCell className="text-xs font-semibold whitespace-nowrap">{row.vertical}</TableCell>
                        {strengthLevels.map((level) => {
                          const matches = row.competitors.filter((c) => c.strength === level);
                          return (
                            <TableCell key={level} className="text-xs">
                              <div className="flex flex-wrap gap-1">
                                {matches.map((m) => (
                                  <span
                                    key={m.name}
                                    className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${getStrengthBgClass(level)}`}
                                  >
                                    {m.name}
                                  </span>
                                ))}
                              </div>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Geographic Competition — Cards Grid */}
          <div>
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-primary" /> Geographic Competition
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {geoCompetition.map((geo) => (
                <Card key={geo.region} className="border border-border" data-testid={`geo-card-${geo.region}`}>
                  <CardContent className="p-4">
                    <h4 className="text-sm font-semibold mb-1">{geo.region}</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      <span className="font-medium text-foreground">RK Presence:</span> {geo.rkPresence}
                    </p>
                    <div className="space-y-1.5">
                      {geo.competitorsPresent.map((c) => (
                        <div key={c.name} className="flex items-start gap-2 text-xs">
                          <Badge variant="outline" className="text-[10px] shrink-0">{c.name}</Badge>
                          <span className="text-muted-foreground">{c.footprint}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
