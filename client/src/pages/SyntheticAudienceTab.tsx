import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  syntheticPersonas, currentMarketingReviews, syntheticAudienceSummary,
  type SyntheticPersona, type AudienceReview,
} from "@/lib/contentEngineData";
import {
  Users, ChevronDown, ChevronRight, Target, Star, TrendingUp, TrendingDown,
  MessageSquare, CheckCircle2, XCircle, AlertTriangle, BarChart3, Lightbulb,
  ThumbsUp, ThumbsDown, Quote,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell,
} from "recharts";

const scoreBadge = (score: number) => {
  if (score >= 8.0) return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
  if (score >= 7.0) return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
  if (score >= 6.0) return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
  return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
};

export default function SyntheticAudienceTab() {
  const [expandedPersona, setExpandedPersona] = useState<string | null>(null);
  const [view, setView] = useState<"overview" | "personas" | "reviews" | "iterations">("overview");

  const summary = syntheticAudienceSummary;

  const radarData = [
    { metric: "Credibility", score: summary.avgCredibility },
    { metric: "Relevance", score: summary.avgRelevance },
    { metric: "Actionability", score: summary.avgActionability },
    { metric: "Engagement", score: summary.avgEngagement },
    { metric: "Overall", score: summary.avgOverall },
  ];

  const personaScoreData = currentMarketingReviews.map((r) => {
    const p = syntheticPersonas.find((pp) => pp.id === r.personaId);
    return { name: p?.name.split(" ")[0] || r.personaId, score: r.overallScore, fill: p?.color || "#888" };
  });

  return (
    <div className="space-y-4">
      {/* View Switcher */}
      <div className="flex gap-2 flex-wrap">
        {(["overview", "personas", "reviews", "iterations"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              view === v
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
            data-testid={`synth-view-${v}`}
          >
            {v === "overview" ? "Overview" : v === "personas" ? "Personas" : v === "reviews" ? "Reviews" : "Iteration Log"}
          </button>
        ))}
      </div>

      {view === "overview" && (
        <div className="space-y-4">
          {/* Summary Banner */}
          <Card className="border border-purple-500/30 bg-gradient-to-r from-purple-500/5 to-transparent">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-purple-500" />
                <h3 className="text-sm font-semibold">Synthetic Audience Testing Summary</h3>
                <Badge variant="outline" className="text-[10px] bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20">
                  {syntheticPersonas.length} Personas
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                All marketing content has been tested against {syntheticPersonas.length} synthetic audience personas representing key buyer types in the logistics/supply chain ecosystem. Scores reflect relevance, credibility, actionability, and engagement potential.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="p-3 rounded-lg bg-background border border-border">
                  <p className="text-[10px] text-muted-foreground">Overall Score</p>
                  <p className="text-xl font-bold tabular-nums">{summary.avgOverall}/10</p>
                </div>
                <div className="p-3 rounded-lg bg-background border border-border">
                  <p className="text-[10px] text-muted-foreground">Credibility</p>
                  <p className="text-xl font-bold tabular-nums text-blue-600 dark:text-blue-400">{summary.avgCredibility}</p>
                </div>
                <div className="p-3 rounded-lg bg-background border border-border">
                  <p className="text-[10px] text-muted-foreground">Relevance</p>
                  <p className="text-xl font-bold tabular-nums">{summary.avgRelevance}</p>
                </div>
                <div className="p-3 rounded-lg bg-background border border-border">
                  <p className="text-[10px] text-muted-foreground">Would Share</p>
                  <p className="text-xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">{summary.wouldSharePct}</p>
                </div>
                <div className="p-3 rounded-lg bg-background border border-border">
                  <p className="text-[10px] text-muted-foreground">Would Contact</p>
                  <p className="text-xl font-bold tabular-nums text-primary">{summary.wouldContactPct}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Radar + Bar charts side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2"><Target className="w-4 h-4 text-purple-500" /> Score Dimensions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} outerRadius="70%">
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                      <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fontSize: 9 }} />
                      <Radar name="Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2"><BarChart3 className="w-4 h-4 text-purple-500" /> Score by Persona</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={personaScoreData} layout="vertical" margin={{ left: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" domain={[0, 10]} tick={{ fontSize: 10 }} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={60} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                        {personaScoreData.map((entry, i) => (
                          <Cell key={i} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Findings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Card className="border border-emerald-500/20 bg-emerald-500/5">
              <CardContent className="p-4">
                <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Top Strength</p>
                <p className="text-xs text-muted-foreground">{summary.topStrength}</p>
              </CardContent>
            </Card>
            <Card className="border border-red-500/20 bg-red-500/5">
              <CardContent className="p-4">
                <p className="text-[10px] font-semibold text-red-500 mb-1">Top Weakness</p>
                <p className="text-xs text-muted-foreground">{summary.topWeakness}</p>
              </CardContent>
            </Card>
            <Card className="border border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <p className="text-[10px] font-semibold text-primary mb-1">Top Opportunity</p>
                <p className="text-xs text-muted-foreground">{summary.topOpportunity}</p>
              </CardContent>
            </Card>
          </div>

          {/* Iteration Focus */}
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2"><Lightbulb className="w-4 h-4 text-amber-500" /> Iteration Focus Areas</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2">
                {summary.iterationFocus.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">{i + 1}</span>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {view === "personas" && (
        <div className="space-y-3">
          {syntheticPersonas.map((persona) => {
            const isExpanded = expandedPersona === persona.id;
            return (
              <Card key={persona.id} className="border border-border">
                <CardContent className="p-4">
                  <button
                    className="flex items-center justify-between w-full text-left"
                    onClick={() => setExpandedPersona(isExpanded ? null : persona.id)}
                    data-testid={`persona-${persona.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                        style={{ backgroundColor: persona.color }}
                      >
                        {persona.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold">{persona.name}</p>
                          <Badge variant="outline" className="text-[10px]">{persona.title}</Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground">{persona.company} · {persona.industry}</p>
                      </div>
                    </div>
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-border space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="p-2 rounded bg-muted/40">
                          <p className="text-[10px] text-muted-foreground">Age Range</p>
                          <p className="text-xs font-bold">{persona.demographics.age}</p>
                        </div>
                        <div className="p-2 rounded bg-muted/40">
                          <p className="text-[10px] text-muted-foreground">Education</p>
                          <p className="text-xs font-bold">{persona.demographics.education}</p>
                        </div>
                        <div className="p-2 rounded bg-muted/40">
                          <p className="text-[10px] text-muted-foreground">Decision Authority</p>
                          <p className="text-xs font-bold">{persona.demographics.decisionAuth}</p>
                        </div>
                        <div className="p-2 rounded bg-muted/40">
                          <p className="text-[10px] text-muted-foreground">Budget Range</p>
                          <p className="text-xs font-bold">{persona.demographics.budgetRange}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-[10px] font-semibold text-muted-foreground mb-1">PRIORITIES</p>
                          <div className="flex flex-wrap gap-1">
                            {persona.psychographics.priorities.map((p, i) => (
                              <Badge key={i} variant="secondary" className="text-[10px]">{p}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-muted-foreground mb-1">PAIN POINTS</p>
                          <div className="flex flex-wrap gap-1">
                            {persona.psychographics.painPoints.map((p, i) => (
                              <Badge key={i} variant="outline" className="text-[10px] bg-red-500/5 text-red-600 dark:text-red-400 border-red-500/20">{p}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-muted-foreground mb-1">CONTENT PREFERENCES</p>
                          <div className="flex flex-wrap gap-1">
                            {persona.psychographics.contentPrefs.map((p, i) => (
                              <Badge key={i} variant="outline" className="text-[10px] bg-blue-500/5 text-blue-600 dark:text-blue-400 border-blue-500/20">{p}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-muted-foreground mb-1">PLATFORMS</p>
                          <div className="flex flex-wrap gap-1">
                            {persona.psychographics.platforms.map((p, i) => (
                              <Badge key={i} variant="secondary" className="text-[10px]">{p}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold text-muted-foreground mb-1">EVALUATION CRITERIA</p>
                        <div className="flex flex-wrap gap-1">
                          {persona.evaluationCriteria.map((c, i) => (
                            <Badge key={i} variant="outline" className="text-[10px] bg-primary/5 text-primary border-primary/20">{c}</Badge>
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
      )}

      {view === "reviews" && (
        <div className="space-y-4">
          <Card className="border border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <p className="text-sm font-semibold">Current Marketing Section Review</p>
              </div>
              <p className="text-xs text-muted-foreground">Each synthetic persona evaluated the existing marketing dashboard. Scores and feedback informed the content engine improvements.</p>
            </CardContent>
          </Card>

          {currentMarketingReviews.map((review) => {
            const persona = syntheticPersonas.find((p) => p.id === review.personaId)!;
            return (
              <Card key={review.personaId} className="border border-border">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: persona.color }}>
                        {persona.avatar}
                      </div>
                      <div>
                        <p className="text-xs font-semibold">{persona.name} — {persona.title}</p>
                        <p className="text-[10px] text-muted-foreground">{persona.company}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-sm font-bold tabular-nums ${scoreBadge(review.overallScore)}`}>
                      {review.overallScore}/10
                    </Badge>
                  </div>

                  {/* Score breakdown */}
                  <div className="grid grid-cols-4 gap-2">
                    <div className="p-2 rounded bg-muted/40 text-center">
                      <p className="text-[9px] text-muted-foreground">Credibility</p>
                      <p className="text-sm font-bold tabular-nums">{review.credibilityScore}</p>
                    </div>
                    <div className="p-2 rounded bg-muted/40 text-center">
                      <p className="text-[9px] text-muted-foreground">Relevance</p>
                      <p className="text-sm font-bold tabular-nums">{review.relevanceScore}</p>
                    </div>
                    <div className="p-2 rounded bg-muted/40 text-center">
                      <p className="text-[9px] text-muted-foreground">Actionability</p>
                      <p className="text-sm font-bold tabular-nums">{review.actionabilityScore}</p>
                    </div>
                    <div className="p-2 rounded bg-muted/40 text-center">
                      <p className="text-[9px] text-muted-foreground">Engagement</p>
                      <p className="text-sm font-bold tabular-nums">{review.engagementScore}</p>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="p-3 rounded-lg bg-muted/30 border border-border italic">
                    <div className="flex items-start gap-2">
                      <Quote className="w-3 h-3 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">{review.quote}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Strengths</p>
                      <ul className="space-y-1">
                        {review.strengths.map((s, i) => (
                          <li key={i} className="text-[11px] text-muted-foreground flex gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-red-500 mb-1">Weaknesses</p>
                      <ul className="space-y-1">
                        {review.weaknesses.map((w, i) => (
                          <li key={i} className="text-[11px] text-muted-foreground flex gap-1">
                            <XCircle className="w-3 h-3 text-red-500 shrink-0 mt-0.5" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-primary mb-1">Suggestions</p>
                      <ul className="space-y-1">
                        {review.suggestions.map((s, i) => (
                          <li key={i} className="text-[11px] text-muted-foreground flex gap-1">
                            <Lightbulb className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-xs">
                      {review.wouldShare ? <ThumbsUp className="w-3 h-3 text-emerald-500" /> : <ThumbsDown className="w-3 h-3 text-red-500" />}
                      <span className="text-muted-foreground">Would share: <span className={review.wouldShare ? "text-emerald-600 font-medium" : "text-red-500 font-medium"}>{review.wouldShare ? "Yes" : "No"}</span></span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      {review.wouldContact ? <ThumbsUp className="w-3 h-3 text-emerald-500" /> : <ThumbsDown className="w-3 h-3 text-red-500" />}
                      <span className="text-muted-foreground">Would contact: <span className={review.wouldContact ? "text-emerald-600 font-medium" : "text-red-500 font-medium"}>{review.wouldContact ? "Yes" : "No"}</span></span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {view === "iterations" && (
        <div className="space-y-4">
          <Card className="border border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold">Iteration Log</p>
              </div>
              <p className="text-xs text-muted-foreground">Content was iteratively improved based on synthetic audience feedback. Average improvement: +1.8 points from initial draft to final version.</p>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-[10px]">Content</TableHead>
                      <TableHead className="text-[10px]">Type</TableHead>
                      <TableHead className="text-[10px] text-center">V1 Score</TableHead>
                      <TableHead className="text-[10px] text-center">Final Score</TableHead>
                      <TableHead className="text-[10px] text-center">Improvement</TableHead>
                      <TableHead className="text-[10px]">Key Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Tariff Squeeze Post", type: "LinkedIn", v1: 7.0, final: 8.5, change: "Added $2.3M working capital figure per CFO feedback" },
                      { name: "Hidden Cost Post", type: "LinkedIn", v1: 7.5, final: 9.2, change: "Added SLA compliance stat per Procurement feedback" },
                      { name: "DHTSCI Index Post", type: "LinkedIn", v1: 7.8, final: 9.5, change: "Added actionable takeaways per VP Supply Chain" },
                      { name: "BESS Regulatory Post", type: "LinkedIn", v1: 7.5, final: 9.2, change: "Framed around $7,500 tax credit risk per CFO" },
                      { name: "Battery Safety Post", type: "LinkedIn", v1: 8.0, final: 9.5, change: "Added fire dept coordination detail per Ops Dir" },
                      { name: "Working Capital Post", type: "LinkedIn", v1: 8.2, final: 9.8, change: "Enhanced cash flow metrics, added zone-to-zone" },
                      { name: "Inverted Tariff Post", type: "LinkedIn", v1: 7.8, final: 9.6, change: "Added '5% utilization' urgency stat" },
                      { name: "DHTSCI Publication", type: "Publication", v1: 7.5, final: 9.0, change: "Added methodology section, 90-day outlook" },
                      { name: "Fremont Tour Script", type: "Video", v1: 7.0, final: 9.5, change: "Added WMS/tech overlay per Plant Mgr feedback" },
                      { name: "FTZ 60-Second Script", type: "Video", v1: 7.5, final: 9.0, change: "Added savings figure, simplified explainer" },
                      { name: "Freight Data Reddit", type: "Reddit", v1: 8.0, final: 9.5, change: "Added methodology note (15K shipments)" },
                      { name: "EV Logistics Reddit", type: "Reddit", v1: 7.5, final: 9.0, change: "Reframed as discussion, added line-down penalty" },
                      { name: "DHTSCI Reddit Post", type: "Reddit", v1: 8.5, final: 9.8, change: "Added markdown table, transparent methodology" },
                      { name: "Warehouse Culture", type: "Reddit", v1: 8.0, final: 9.5, change: "Added specific pay ranges, genuine questions" },
                    ].map((item, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-xs font-medium">{item.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-[9px]">{item.type}</Badge>
                        </TableCell>
                        <TableCell className="text-xs tabular-nums text-center">{item.v1.toFixed(1)}</TableCell>
                        <TableCell className="text-xs tabular-nums text-center font-bold">{item.final.toFixed(1)}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20 tabular-nums">
                            +{(item.final - item.v1).toFixed(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-[11px] text-muted-foreground max-w-[250px]">{item.change}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}


