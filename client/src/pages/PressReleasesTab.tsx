import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Newspaper, TrendingUp, Eye, Send, BarChart3, Star, CheckCircle2,
  Clock, FileText, ChevronDown, ChevronRight, ArrowUpRight, Target,
  Zap, Users, RefreshCw, AlertTriangle, Globe, Calendar,
} from "lucide-react";
import {
  pressReleaseKPIs, pressReleases, PressRelease,
} from "@/lib/pressReleasesData";
import { syntheticPersonas } from "@/lib/contentEngineData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";

const statusColors: Record<string, string> = {
  published: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  review: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  draft: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  concept: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
};

const statusLabels: Record<string, string> = {
  published: "Published",
  review: "In Review",
  draft: "Draft",
  concept: "Concept",
};

const categoryColors: Record<string, string> = {
  Partnership: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
  "Thought Leadership": "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  Expansion: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Research: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

// ──────────────────────────────────────────────────────
// Sub-view: KPI Overview
// ──────────────────────────────────────────────────────
function KPIOverview() {
  const k = pressReleaseKPIs;
  const pipelineData = [
    { name: "Published", count: k.published, fill: "#10b981" },
    { name: "In Review", count: k.inReview, fill: "#f59e0b" },
    { name: "Drafts", count: k.drafts, fill: "#3b82f6" },
  ];

  return (
    <div className="space-y-4">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-border"><CardContent className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-md bg-teal-500/10 flex items-center justify-center">
              <Newspaper className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Releases</p>
          </div>
          <p className="text-xl font-bold">{k.totalReleases}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{k.yearlyProgress}/{k.yearlyTarget} yearly target</p>
        </CardContent></Card>

        <Card className="border-border"><CardContent className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-md bg-emerald-500/10 flex items-center justify-center">
              <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg Media Pickups</p>
          </div>
          <p className="text-xl font-bold">{k.avgMediaPickups}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">per published release</p>
        </CardContent></Card>

        <Card className="border-border"><CardContent className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-md bg-purple-500/10 flex items-center justify-center">
              <Star className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg Synthetic Score</p>
          </div>
          <p className="text-xl font-bold">{k.avgSyntheticScore}<span className="text-xs text-muted-foreground">/10</span></p>
          <p className="text-[10px] text-muted-foreground mt-0.5">across all personas</p>
        </CardContent></Card>

        <Card className="border-border"><CardContent className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-md bg-blue-500/10 flex items-center justify-center">
              <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Next Scheduled</p>
          </div>
          <p className="text-lg font-bold">{k.nextScheduled}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">DHTSCI Launch</p>
        </CardContent></Card>
      </div>

      {/* Pipeline + Top Performing + Channels */}
      <div className="grid md:grid-cols-3 gap-3">
        <Card className="border-border"><CardContent className="p-3">
          <p className="text-xs font-semibold mb-3">Release Pipeline</p>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={pipelineData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={70} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {pipelineData.map((e, i) => (
                  <Cell key={i} fill={e.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent></Card>

        <Card className="border-border"><CardContent className="p-3">
          <p className="text-xs font-semibold mb-2">Top Performing</p>
          <div className="p-2 rounded-md bg-emerald-500/5 border border-emerald-500/20 mb-2">
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{k.topPerforming}</p>
            <p className="text-[10px] text-muted-foreground mt-1">18 media pickups · 245K impressions · 9.2 synthetic score</p>
          </div>
          <p className="text-xs font-semibold mb-2 mt-3">Yearly Progress</p>
          <div className="w-full bg-muted/50 rounded-full h-2">
            <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${(k.yearlyProgress / k.yearlyTarget) * 100}%` }} />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">{k.yearlyProgress} of {k.yearlyTarget} releases ({Math.round((k.yearlyProgress / k.yearlyTarget) * 100)}%)</p>
        </CardContent></Card>

        <Card className="border-border"><CardContent className="p-3">
          <p className="text-xs font-semibold mb-2">Distribution Channels</p>
          <div className="space-y-1.5">
            {k.distributionChannels.map((ch) => (
              <div key={ch} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                <span className="text-xs">{ch}</span>
              </div>
            ))}
          </div>
        </CardContent></Card>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Sub-view: Press Release Detail Card
// ──────────────────────────────────────────────────────
function PressReleaseCard({ pr }: { pr: PressRelease }) {
  const [expanded, setExpanded] = useState(false);
  const [showBody, setShowBody] = useState(false);

  const avgScore = pr.audienceScores.length > 0
    ? (pr.audienceScores.reduce((a, b) => a + b.score, 0) / pr.audienceScores.length).toFixed(1)
    : "—";

  const radarData = pr.audienceScores.map((s) => {
    const persona = syntheticPersonas.find((p) => p.id === s.personaId);
    return { persona: persona?.name || s.personaId, score: s.score, fullMark: 10 };
  });

  const iterationData = pr.iterationHistory.map((h) => ({
    version: `V${h.version}`,
    score: h.score,
  }));

  return (
    <Card className="border-border">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Badge variant="outline" className={categoryColors[pr.category] || ""}>{pr.category}</Badge>
              <Badge variant="outline" className={statusColors[pr.status]}>{statusLabels[pr.status]}</Badge>
              <span className="text-[10px] text-muted-foreground">{pr.date}</span>
            </div>
            <h3 className="text-sm font-semibold leading-tight">{pr.title}</h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{pr.headline}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 italic">{pr.subhead}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
              <span className="text-lg font-bold text-teal-600 dark:text-teal-400">{avgScore}</span>
            </div>
            <p className="text-[9px] text-muted-foreground mt-0.5">Audience Score</p>
          </div>
        </div>

        {/* KPIs for published */}
        {pr.status === "published" && (
          <div className="grid grid-cols-5 gap-2 mb-3">
            {[
              { label: "Media Pickups", value: pr.kpis.mediaPickups, icon: Newspaper },
              { label: "Impressions", value: pr.kpis.impressions, icon: Eye },
              { label: "Web Referrals", value: pr.kpis.websiteReferrals, icon: Globe },
              { label: "LinkedIn Shares", value: pr.kpis.linkedinShares, icon: ArrowUpRight },
              { label: "Email Open Rate", value: pr.kpis.openRate, icon: Send },
            ].map((m) => (
              <div key={m.label} className="p-2 rounded bg-muted/50 border border-border text-center">
                <m.icon className="w-3 h-3 mx-auto text-muted-foreground mb-0.5" />
                <p className="text-xs font-bold">{m.value}</p>
                <p className="text-[9px] text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Status detail */}
        <div className="p-2 rounded bg-muted/30 border border-border mb-3">
          <p className="text-[10px] text-muted-foreground">
            <Clock className="w-3 h-3 inline mr-1" />{pr.status_detail}
          </p>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 hover:underline"
          data-testid={`expand-pr-${pr.id}`}
        >
          {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          {expanded ? "Collapse Details" : "View Details & Synthetic Testing"}
        </button>

        {expanded && (
          <div className="mt-3 space-y-4">
            {/* Distribution */}
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Distribution</p>
              <div className="flex flex-wrap gap-1">
                {pr.distribution.map((d) => (
                  <Badge key={d} variant="outline" className="text-[10px]">{d}</Badge>
                ))}
              </div>
            </div>

            {/* Body toggle */}
            <div>
              <button
                onClick={() => setShowBody(!showBody)}
                className="flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 hover:underline"
                data-testid={`toggle-body-${pr.id}`}
              >
                <FileText className="w-3 h-3" />{showBody ? "Hide Full Release" : "Read Full Press Release"}
              </button>
              {showBody && (
                <div className="mt-2 p-3 rounded-md bg-muted/30 border border-border text-xs leading-relaxed whitespace-pre-line">
                  {pr.body}
                  <div className="mt-3 pt-2 border-t border-border text-[10px] text-muted-foreground italic">
                    {pr.boilerplate}
                  </div>
                  <p className="mt-2 text-[10px] text-muted-foreground">{pr.contact}</p>
                </div>
              )}
            </div>

            {/* Synthetic Audience Scoring */}
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  <Users className="w-3 h-3 inline mr-1" />Synthetic Audience Scores
                </p>
                <div className="space-y-2">
                  {pr.audienceScores.map((s) => {
                    const persona = syntheticPersonas.find((p) => p.id === s.personaId);
                    return (
                      <div key={s.personaId} className="p-2 rounded bg-muted/30 border border-border">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold">{persona?.name || s.personaId}</span>
                          <Badge variant="outline" className={s.score >= 9 ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : s.score >= 8 ? "bg-blue-500/10 text-blue-600 border-blue-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"}>
                            {s.score}/10
                          </Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground italic">"{s.feedback}"</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Radar Chart */}
              {radarData.length >= 3 && (
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    <Target className="w-3 h-3 inline mr-1" />Persona Score Distribution
                  </p>
                  <ResponsiveContainer width="100%" height={180}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="persona" tick={{ fontSize: 9 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fontSize: 8 }} />
                      <Radar dataKey="score" stroke="#0d9488" fill="#0d9488" fillOpacity={0.2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Iteration History */}
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                <RefreshCw className="w-3 h-3 inline mr-1" />Iteration History
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  {pr.iterationHistory.map((h) => (
                    <div key={h.version} className="flex items-start gap-2 p-2 rounded bg-muted/30 border border-border">
                      <Badge variant="outline" className="text-[10px] shrink-0">V{h.version}</Badge>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold">{h.score}/10</span>
                          {h.version > 1 && (
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                              (+{(h.score - pr.iterationHistory[h.version - 2]?.score).toFixed(1)})
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-muted-foreground">{h.change}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={iterationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="version" tick={{ fontSize: 10 }} />
                    <YAxis domain={[6, 10]} tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
                    <Line type="monotone" dataKey="score" stroke="#0d9488" strokeWidth={2} dot={{ fill: "#0d9488" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ──────────────────────────────────────────────────────
// Main: Press Releases Tab
// ──────────────────────────────────────────────────────
export default function PressReleasesTab() {
  const [view, setView] = useState<"overview" | "releases">("overview");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            Press Releases
          </h2>
          <p className="text-[10px] text-muted-foreground">Auto-draft, synthetic audience test, iterate, and distribute</p>
        </div>
        <div className="flex gap-1">
          {(["overview", "releases"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-2.5 py-1 rounded text-[10px] font-medium transition-colors ${
                view === v ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20" : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid={`pr-view-${v}`}
            >
              {v === "overview" ? "KPI Overview" : "All Releases"}
            </button>
          ))}
        </div>
      </div>

      {view === "overview" ? <KPIOverview /> : (
        <div className="space-y-3">
          {pressReleases.map((pr) => (
            <PressReleaseCard key={pr.id} pr={pr} />
          ))}
        </div>
      )}
    </div>
  );
}
