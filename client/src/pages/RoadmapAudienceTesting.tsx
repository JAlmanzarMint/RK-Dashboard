import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users, ChevronDown, ChevronRight, Target, Star, TrendingUp, TrendingDown,
  MessageSquare, CheckCircle2, XCircle, AlertTriangle, BarChart3, Lightbulb,
  ThumbsUp, ArrowUp, ArrowDown, Calendar, DollarSign, Shield, Quote,
  Briefcase, Building2, Calculator, Cpu, UserCheck, Warehouse, Headphones
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell,
} from "recharts";
import {
  stakeholderPersonas, initiativeReviews, feedbackSummary,
} from "@/lib/syntheticAudienceRoadmap";

type ViewTab = "overview" | "stakeholders" | "scores" | "changes" | "roadmap";

const viewLabels: Record<ViewTab, string> = {
  overview: "Overview",
  stakeholders: "Stakeholders",
  scores: "Initiative Scores",
  changes: "Priority Changes",
  roadmap: "Revised Roadmap",
};

const scoreBadge = (score: number) => {
  if (score >= 8.0) return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
  if (score >= 7.0) return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
  if (score >= 6.0) return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
  return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
};

const scoreBarColor = (score: number) => {
  if (score >= 8) return "#10b981";
  if (score >= 7) return "#3b82f6";
  if (score >= 6) return "#f59e0b";
  return "#ef4444";
};

const tierBadge = (tier: 1 | 2 | 3) => {
  if (tier === 1) return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
  if (tier === 2) return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
  return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
};

const influenceBadge = (influence: string) => {
  switch (influence) {
    case "Final Approver": return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
    case "Key Influencer": return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    case "Daily User": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
    default: return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
  }
};

const techBadge = (comfort: string) => {
  switch (comfort) {
    case "High": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
    case "Medium": return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    default: return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
  }
};

const phaseColors = ["#0d9488", "#6366f1", "#dc2626", "#d97706", "#7c3aed"];

export default function RoadmapAudienceTesting() {
  const [view, setView] = useState<ViewTab>("overview");
  const [expandedPersona, setExpandedPersona] = useState<string | null>(null);
  const [expandedInitiative, setExpandedInitiative] = useState<string | null>(null);

  const summary = feedbackSummary;

  const chartData = [...initiativeReviews]
    .sort((a, b) => a.aggregateScores.overallScore - b.aggregateScores.overallScore)
    .map((r) => ({
      name: r.initiativeName.replace(/^\d+\.\s*/, ""),
      score: r.aggregateScores.overallScore,
    }));

  return (
    <div className="space-y-4">
      {/* View Switcher */}
      <div className="flex gap-2 flex-wrap">
        {(Object.keys(viewLabels) as ViewTab[]).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              view === v
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
            data-testid={`roadmap-view-${v}`}
          >
            {viewLabels[v]}
          </button>
        ))}
      </div>

      {/* ──────── OVERVIEW TAB ──────── */}
      {view === "overview" && (
        <div className="space-y-4">
          {/* Summary Banner */}
          <Card className="border border-primary/30 bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold">Platform Roadmap — Synthetic Audience Testing</h3>
                <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
                  {summary.totalReviews} Reviews
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                {summary.totalInitiatives} roadmap initiatives tested against {summary.totalPersonas} internal stakeholder personas derived from the March 25 leadership call. Scores reflect impact, urgency, feasibility, and adoption likelihood.
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-background border border-border">
                  <p className="text-[10px] text-muted-foreground">Personas</p>
                  <p className="text-xl font-bold tabular-nums">{summary.totalPersonas}</p>
                </div>
                <div className="p-3 rounded-lg bg-background border border-border">
                  <p className="text-[10px] text-muted-foreground">Initiatives</p>
                  <p className="text-xl font-bold tabular-nums text-primary">{summary.totalInitiatives}</p>
                </div>
                <div className="p-3 rounded-lg bg-background border border-border">
                  <p className="text-[10px] text-muted-foreground">Total Reviews</p>
                  <p className="text-xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">{summary.totalReviews}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Horizontal Bar Chart */}
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" /> Initiative Scores (Sorted)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" domain={[0, 10]} tick={{ fontSize: 10 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 9 }} width={160} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                      {chartData.map((entry, i) => (
                        <Cell key={i} fill={scoreBarColor(entry.score)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top 3 Scoring */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
              <Star className="w-3 h-3 text-emerald-500" /> Top Scoring Initiatives
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {summary.topScoringInitiatives.map((item, i) => (
                <Card key={i} className="border border-emerald-500/20 bg-emerald-500/5">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold">{item.name}</p>
                      <Badge variant="outline" className="text-sm font-bold tabular-nums bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                        {item.score}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{item.reason}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Lowest 2 Scoring */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-red-500" /> Lowest Scoring Initiatives
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {summary.lowestScoringInitiatives.map((item, i) => (
                <Card key={i} className="border border-red-500/20 bg-red-500/5">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold">{item.name}</p>
                      <Badge variant="outline" className="text-sm font-bold tabular-nums bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20">
                        {item.score}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{item.reason}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Cross-Cutting Themes */}
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" /> Cross-Cutting Themes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {summary.crossCuttingThemes.map((t, i) => (
                  <Card key={i} className="border border-primary/20 bg-primary/5">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold">{t.theme}</p>
                        <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20 tabular-nums">
                          {t.count} initiatives
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground">{t.detail}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ──────── STAKEHOLDERS TAB ──────── */}
      {view === "stakeholders" && (
        <div className="space-y-3">
          {stakeholderPersonas.map((persona) => {
            const isExpanded = expandedPersona === persona.id;
            return (
              <Card key={persona.id} className="border border-border">
                <CardContent className="p-4">
                  <button
                    className="flex items-center justify-between w-full text-left"
                    onClick={() => setExpandedPersona(isExpanded ? null : persona.id)}
                    data-testid={`stakeholder-${persona.id}`}
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
                        <p className="text-[10px] text-muted-foreground">{persona.department}</p>
                      </div>
                    </div>
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-border space-y-4">
                      <div className="p-3 rounded-lg bg-muted/30 border border-border">
                        <p className="text-[10px] font-semibold text-muted-foreground mb-1">CONTEXT</p>
                        <p className="text-xs text-muted-foreground">{persona.context}</p>
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold text-muted-foreground mb-1">DAILY TOOLS</p>
                        <div className="flex flex-wrap gap-1">
                          {persona.dailyTools.map((tool, i) => (
                            <Badge key={i} variant="secondary" className="text-[10px]">{tool}</Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-[10px] font-semibold text-red-500 mb-1">BIGGEST FRUSTRATIONS</p>
                          <ul className="space-y-1">
                            {persona.biggestFrustrations.map((f, i) => (
                              <li key={i} className="text-[11px] text-muted-foreground flex gap-1">
                                <XCircle className="w-3 h-3 text-red-500 shrink-0 mt-0.5" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mb-1">WHAT WOULD MAKE LIFE EASIER</p>
                          <ul className="space-y-1">
                            {persona.whatWouldMakeLifeEasier.map((w, i) => (
                              <li key={i} className="text-[11px] text-muted-foreground flex gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{w}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Badge variant="outline" className={`text-[10px] ${influenceBadge(persona.decisionInfluence)}`}>
                          {persona.decisionInfluence}
                        </Badge>
                        <Badge variant="outline" className={`text-[10px] ${techBadge(persona.techComfort)}`}>
                          Tech: {persona.techComfort}
                        </Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* ──────── INITIATIVE SCORES TAB ──────── */}
      {view === "scores" && (
        <div className="space-y-3">
          {initiativeReviews.map((initiative) => {
            const isExpanded = expandedInitiative === initiative.initiativeId;
            const agg = initiative.aggregateScores;
            return (
              <Card key={initiative.initiativeId} className="border border-border">
                <CardContent className="p-4">
                  <button
                    className="flex items-center justify-between w-full text-left"
                    onClick={() => setExpandedInitiative(isExpanded ? null : initiative.initiativeId)}
                    data-testid={`initiative-${initiative.initiativeId}`}
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold">{initiative.initiativeName}</p>
                          <Badge variant="outline" className={`text-[10px] ${tierBadge(initiative.tier)}`}>
                            Tier {initiative.tier}
                          </Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{initiative.reviews.length} reviews</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-sm font-bold tabular-nums ${scoreBadge(agg.overallScore)}`}>
                        {agg.overallScore}/10
                      </Badge>
                      {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-border space-y-4">
                      {/* Aggregate scores */}
                      <div className="grid grid-cols-4 gap-2">
                        <div className="p-2 rounded bg-muted/40 text-center">
                          <p className="text-[9px] text-muted-foreground">Avg Impact</p>
                          <p className="text-sm font-bold tabular-nums">{agg.avgImpact}</p>
                        </div>
                        <div className="p-2 rounded bg-muted/40 text-center">
                          <p className="text-[9px] text-muted-foreground">Avg Urgency</p>
                          <p className="text-sm font-bold tabular-nums">{agg.avgUrgency}</p>
                        </div>
                        <div className="p-2 rounded bg-muted/40 text-center">
                          <p className="text-[9px] text-muted-foreground">Avg Feasibility</p>
                          <p className="text-sm font-bold tabular-nums">{agg.avgFeasibility}</p>
                        </div>
                        <div className="p-2 rounded bg-muted/40 text-center">
                          <p className="text-[9px] text-muted-foreground">Avg Adoption</p>
                          <p className="text-sm font-bold tabular-nums">{agg.avgAdoption}</p>
                        </div>
                      </div>

                      {/* Individual reviews */}
                      <div className="space-y-3">
                        {initiative.reviews.map((review) => {
                          const persona = stakeholderPersonas.find((p) => p.id === review.personaId);
                          if (!persona) return null;
                          return (
                            <div key={review.personaId} className="p-3 rounded-lg border border-border bg-muted/10 space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                                    style={{ backgroundColor: persona.color }}
                                  >
                                    {persona.avatar}
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold">{persona.name}</p>
                                    <p className="text-[10px] text-muted-foreground">{persona.title}</p>
                                  </div>
                                </div>
                                <div className="flex gap-1">
                                  {[
                                    { label: "Imp", val: review.impactScore },
                                    { label: "Urg", val: review.urgencyScore },
                                    { label: "Feas", val: review.feasibilityScore },
                                    { label: "Adpt", val: review.adoptionLikelihood },
                                  ].map((s) => (
                                    <div key={s.label} className="text-center px-1.5">
                                      <p className="text-[8px] text-muted-foreground">{s.label}</p>
                                      <p className="text-[11px] font-bold tabular-nums">{s.val}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="p-2 rounded bg-muted/30 border border-border italic">
                                <div className="flex items-start gap-2">
                                  <Quote className="w-3 h-3 text-muted-foreground shrink-0 mt-0.5" />
                                  <p className="text-[11px] text-muted-foreground">{review.quote}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                  <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Strengths</p>
                                  <ul className="space-y-1">
                                    {review.strengthsIdentified.map((s, i) => (
                                      <li key={i} className="text-[11px] text-muted-foreground flex gap-1">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                                        <span>{s}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <p className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 mb-1">Concerns</p>
                                  <ul className="space-y-1">
                                    {review.concernsRaised.map((c, i) => (
                                      <li key={i} className="text-[11px] text-muted-foreground flex gap-1">
                                        <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                                        <span>{c}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <p className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 mb-1">Feature Requests</p>
                                  <ul className="space-y-1">
                                    {review.featureRequests.map((f, i) => (
                                      <li key={i} className="text-[11px] text-muted-foreground flex gap-1">
                                        <Lightbulb className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
                                        <span>{f}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Feedback-driven changes */}
                      <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
                        <p className="text-[10px] font-semibold text-primary mb-2">FEEDBACK-DRIVEN CHANGES</p>
                        <ul className="space-y-1">
                          {initiative.feedbackDrivenChanges.map((change, i) => (
                            <li key={i} className="text-[11px] text-muted-foreground flex gap-1">
                              <TrendingUp className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                              <span>{change}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* ──────── PRIORITY CHANGES TAB ──────── */}
      {view === "changes" && (
        <div className="space-y-4">
          <Card className="border border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold">Priority Changes After Feedback</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Stakeholder feedback caused {summary.priorityChanges.length} tier changes. Initiatives were re-prioritized based on urgency, impact, and adoption scores.
              </p>
            </CardContent>
          </Card>

          {/* Before vs After cards */}
          <div className="space-y-3">
            {summary.priorityChanges.map((change, i) => {
              const isUpgrade = change.to === "Tier 1" || (change.to === "Tier 2" && change.from !== "Tier 1");
              const isDowngrade = change.to === "Deprioritized" || (change.to === "Tier 3" && change.from !== "Tier 3");
              return (
                <Card key={i} className={`border ${isDowngrade ? "border-red-500/20 bg-red-500/5" : "border-emerald-500/20 bg-emerald-500/5"}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold">{change.initiative}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] bg-muted/40 text-muted-foreground border-border">
                          {change.from}
                        </Badge>
                        {isUpgrade ? (
                          <ArrowUp className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-red-500" />
                        )}
                        <Badge variant="outline" className={`text-[10px] font-bold ${
                          isDowngrade
                            ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        }`}>
                          {change.to}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{change.reason}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Revised Build Order Timeline */}
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Revised Build Order
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-4">
                {summary.revisedBuildOrder.map((phase, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ backgroundColor: phaseColors[i] }}
                      >
                        {i + 1}
                      </div>
                      {i < summary.revisedBuildOrder.length - 1 && (
                        <div className="w-0.5 flex-1 mt-1 bg-border" />
                      )}
                    </div>
                    <div className="pb-4 flex-1">
                      <p className="text-xs font-semibold">{phase.phase}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {phase.items.map((item, j) => (
                          <Badge key={j} variant="outline" className="text-[10px] bg-muted/40">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ──────── REVISED ROADMAP TAB ──────── */}
      {view === "roadmap" && (
        <div className="space-y-4">
          {/* Timeline header */}
          <Card className="border border-primary/30 bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold">Revised Roadmap After Stakeholder Feedback</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                The original roadmap was revised based on {summary.totalReviews} reviews from {summary.totalPersonas} stakeholders. Key changes: Contract Intelligence moved to Phase 1, Customer Portal advanced to Phase 3, Communication Hub deprioritized to notification-only.
              </p>
            </CardContent>
          </Card>

          {/* Visual Timeline */}
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" /> Build Timeline — 5 Phases
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-0">
                {summary.revisedBuildOrder.map((phase, i) => (
                  <div key={i} className="relative">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 z-10"
                          style={{ backgroundColor: phaseColors[i] }}
                        >
                          P{i + 1}
                        </div>
                        {i < summary.revisedBuildOrder.length - 1 && (
                          <div className="w-0.5 h-full bg-border" />
                        )}
                      </div>
                      <div className="pb-6 flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-sm font-semibold">{phase.phase}</p>
                          <Badge variant="outline" className="text-[10px] tabular-nums" style={{ borderColor: phaseColors[i], color: phaseColors[i] }}>
                            {phase.items.length} items
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {phase.items.map((item, j) => (
                            <div key={j} className="p-2 rounded-lg border border-border bg-muted/20 flex items-start gap-2">
                              <CheckCircle2 className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                              <p className="text-[11px] text-muted-foreground">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Financial Impact */}
          <Card className="border border-emerald-500/20 bg-emerald-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-500" /> Revised Financial Impact — Year 1
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-lg bg-background border border-border">
                  <p className="text-[10px] text-muted-foreground">Conservative Estimate</p>
                  <p className="text-xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                    {summary.financialImpactRevised.year1Conservative}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-background border border-border">
                  <p className="text-[10px] text-muted-foreground">Optimistic Estimate</p>
                  <p className="text-xl font-bold tabular-nums text-primary">
                    {summary.financialImpactRevised.year1Optimistic}
                  </p>
                </div>
              </div>

              <p className="text-[10px] font-semibold text-muted-foreground mb-2">KEY DRIVERS</p>
              <div className="space-y-2">
                {summary.financialImpactRevised.keyDrivers.map((driver, i) => (
                  <Card key={i} className="border border-border bg-background">
                    <CardContent className="p-3 flex items-start gap-2">
                      <DollarSign className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-muted-foreground">{driver}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Summary comparison */}
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" /> Original vs Revised Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border border-border bg-muted/20">
                  <p className="text-[10px] font-semibold text-muted-foreground mb-2">ORIGINAL ROADMAP</p>
                  <ul className="space-y-1">
                    <li className="text-[11px] text-muted-foreground flex gap-1">
                      <span className="shrink-0 w-4 h-4 rounded-full bg-muted flex items-center justify-center text-[9px] font-bold">T1</span>
                      <span>4 initiatives: BD Dashboards, Approval Engine, Pricing/Lead Gen, SaaS Elimination</span>
                    </li>
                    <li className="text-[11px] text-muted-foreground flex gap-1">
                      <span className="shrink-0 w-4 h-4 rounded-full bg-muted flex items-center justify-center text-[9px] font-bold">T2</span>
                      <span>4 initiatives: Contracts, Email Intel, TMS, Camera AI</span>
                    </li>
                    <li className="text-[11px] text-muted-foreground flex gap-1">
                      <span className="shrink-0 w-4 h-4 rounded-full bg-muted flex items-center justify-center text-[9px] font-bold">T3</span>
                      <span>6 initiatives: Acquisition, AI Engine, Predictive, Comms, Portal, Portfolio</span>
                    </li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
                  <p className="text-[10px] font-semibold text-primary mb-2">REVISED AFTER FEEDBACK</p>
                  <ul className="space-y-1">
                    <li className="text-[11px] text-muted-foreground flex gap-1">
                      <ArrowUp className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Contract Intelligence → Tier 1 (unanimous 10/10 urgency)</span>
                    </li>
                    <li className="text-[11px] text-muted-foreground flex gap-1">
                      <ArrowUp className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Acquisition Playbook → Tier 2 (Go Freight Hub imminent)</span>
                    </li>
                    <li className="text-[11px] text-muted-foreground flex gap-1">
                      <ArrowUp className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Customer Portal → Tier 2 (30-40% call reduction)</span>
                    </li>
                    <li className="text-[11px] text-muted-foreground flex gap-1">
                      <ArrowDown className="w-3 h-3 text-red-500 shrink-0 mt-0.5" />
                      <span>Communication Hub → Deprioritized (notification center only)</span>
                    </li>
                    <li className="text-[11px] text-muted-foreground flex gap-1">
                      <Shield className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
                      <span>Email Monitoring → Renamed "Activity Intelligence" (privacy redesign)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
