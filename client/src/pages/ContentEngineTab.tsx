import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  weeklyLinkedInPosts, bessLinkedInPosts, dhtsciPublication, videoScripts,
  redditContentPosts, contentEngineKPIs, syntheticPersonas,
  type LinkedInPost, type VideoScript, type RedditContent,
} from "@/lib/contentEngineData";
import {
  Megaphone, ChevronDown, ChevronRight, Target, TrendingUp,
  Calendar, FileText, Video, MessageSquare, Hash, Zap,
  Linkedin, Play, Eye, Users, BarChart3, CheckCircle2,
  Clock, Star, AlertTriangle, BookOpen, Pencil, Send,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const statusBadge: Record<string, string> = {
  draft: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
  reviewed: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  approved: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  posted: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  published: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  concept: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  scripted: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  production: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
};

const platformBadge: Record<string, string> = {
  "RK Company": "bg-primary/10 text-primary border-primary/20",
  Salesforce: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  CEO: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  OTT: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

const catColors: Record<string, string> = {
  "Thought Leadership": "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  "Pain Point": "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  "Index Report": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "Industry Insight": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "Technical Deep Dive": "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  "BESS/EV": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  "Data Share": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "Expert Comment": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "Community Engagement": "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  Facility: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Education: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Culture: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
};

function getPersonaName(id: string) {
  return syntheticPersonas.find((p) => p.id === id)?.name.split(" ")[0] || id;
}
function getPersonaColor(id: string) {
  return syntheticPersonas.find((p) => p.id === id)?.color || "#888";
}

// ──────────────────────────────────────────────────────
// Sub-view: LinkedIn Posts
// ──────────────────────────────────────────────────────

function LinkedInPostsView() {
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "salesforce" | "bess">("all");

  const allPosts = filter === "bess" ? bessLinkedInPosts :
    filter === "salesforce" ? weeklyLinkedInPosts :
    [...weeklyLinkedInPosts, ...bessLinkedInPosts];

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex gap-2">
        {(["all", "salesforce", "bess"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-md text-xs font-medium ${
              filter === f ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
            data-testid={`li-filter-${f}`}
          >
            {f === "all" ? "All Posts" : f === "salesforce" ? "Weekly Salesforce" : "BESS/EV Queue"}
          </button>
        ))}
      </div>

      {allPosts.map((post) => {
        const isExpanded = expandedPost === post.id;
        const avgScore = post.audienceScores.length > 0
          ? (post.audienceScores.reduce((a, s) => a + s.score, 0) / post.audienceScores.length).toFixed(1)
          : "N/A";
        return (
          <Card key={post.id} className="border border-border">
            <CardContent className="p-4">
              <button
                className="flex items-center justify-between w-full text-left"
                onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                data-testid={`li-post-${post.id}`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-xs font-semibold">{post.title}</p>
                      <Badge variant="outline" className={`text-[9px] ${statusBadge[post.status]}`}>{post.status}</Badge>
                      <Badge variant="outline" className={`text-[9px] ${platformBadge[post.platform] || ""}`}>{post.platform}</Badge>
                      <Badge variant="outline" className={`text-[9px] ${catColors[post.category] || ""}`}>{post.category}</Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-0.5"><Calendar className="w-3 h-3" /> {post.week}</span>
                      <span className="flex items-center gap-0.5"><Users className="w-3 h-3" /> {post.targetAudience}</span>
                      <span className="flex items-center gap-0.5"><Star className="w-3 h-3" /> {avgScore}</span>
                      <span className="flex items-center gap-0.5 text-amber-600">v{post.iteration}</span>
                    </div>
                  </div>
                </div>
                {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
              </button>

              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-border space-y-3">
                  {/* Post content */}
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-[10px] font-semibold text-muted-foreground mb-1">POST CONTENT</p>
                    <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed">{post.content}</pre>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg border border-border">
                      <p className="text-[10px] font-semibold text-muted-foreground mb-1">MEDIA ({post.mediaType})</p>
                      <p className="text-xs text-muted-foreground">{post.mediaDescription}</p>
                    </div>
                    <div className="p-3 rounded-lg border border-border">
                      <p className="text-[10px] font-semibold text-muted-foreground mb-1">CALL TO ACTION</p>
                      <p className="text-xs font-medium text-primary">{post.cta}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {post.hashtags.map((h, i) => (
                          <Badge key={i} variant="secondary" className="text-[9px]">{h}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Audience scores */}
                  <div>
                    <p className="text-[10px] font-semibold text-muted-foreground mb-2">SYNTHETIC AUDIENCE SCORES</p>
                    <div className="space-y-2">
                      {post.audienceScores.map((score) => (
                        <div key={score.personaId} className="flex items-start gap-2 p-2 rounded bg-muted/30">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0" style={{ backgroundColor: getPersonaColor(score.personaId) }}>
                            {getPersonaName(score.personaId)[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-semibold">{getPersonaName(score.personaId)}</span>
                              <Badge variant="outline" className={`text-[9px] tabular-nums ${
                                score.score >= 9.0 ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                                score.score >= 8.0 ? "bg-blue-500/10 text-blue-600 border-blue-500/20" :
                                "bg-amber-500/10 text-amber-600 border-amber-500/20"
                              }`}>{score.score}/10</Badge>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{score.feedback}</p>
                          </div>
                        </div>
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
  );
}

// ──────────────────────────────────────────────────────
// Sub-view: DHTSCI Publication
// ──────────────────────────────────────────────────────

function PublicationView() {
  const pub = dhtsciPublication;
  return (
    <div className="space-y-4">
      {/* Publication Header */}
      <Card className="border border-primary/30 bg-gradient-to-r from-primary/5 to-transparent">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-bold">{pub.title}</p>
              <p className="text-xs text-muted-foreground">{pub.subtitle} — {pub.edition} · {pub.date}</p>
            </div>
            <Badge variant="outline" className={`text-sm font-bold tabular-nums ${statusBadge[pub.status]}`}>{pub.status}</Badge>
          </div>

          {/* Index KPIs */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
            {pub.kpis.map((kpi) => (
              <div key={kpi.label} className="p-2 rounded-lg bg-background border border-border text-center">
                <p className="text-[9px] text-muted-foreground">{kpi.label}</p>
                <p className="text-lg font-bold tabular-nums">{kpi.value}</p>
                <p className={`text-[10px] tabular-nums font-medium ${kpi.trend === "up" ? "text-emerald-600" : kpi.trend === "down" ? "text-red-500" : "text-muted-foreground"}`}>{kpi.change}</p>
              </div>
            ))}
          </div>

          {/* Executive Summary */}
          <div className="p-3 rounded-lg bg-background border border-border">
            <p className="text-[10px] font-semibold text-primary mb-1">EXECUTIVE SUMMARY</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{pub.executiveSummary}</p>
          </div>
        </CardContent>
      </Card>

      {/* Sections */}
      {pub.sections.map((section, i) => (
        <Card key={i} className={`border ${section.type === "callout" ? "border-primary/20 bg-primary/5" : "border-border"}`}>
          <CardContent className="p-4">
            <p className="text-xs font-bold mb-1">{section.title}</p>
            {section.type === "table" ? (
              <div className="space-y-1">
                {section.content.split(" | ").map((row, ri) => {
                  const [label, value] = row.split(": ");
                  return (
                    <div key={ri} className="flex justify-between items-center text-xs py-1 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-bold tabular-nums">{value}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground leading-relaxed">{section.content}</p>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Audience Scores */}
      <Card className="border border-purple-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2"><Users className="w-4 h-4 text-purple-500" /> Synthetic Audience Scores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {pub.audienceScores.map((score) => (
            <div key={score.personaId} className="flex items-start gap-2 p-2 rounded bg-muted/30">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0" style={{ backgroundColor: getPersonaColor(score.personaId) }}>
                {getPersonaName(score.personaId)[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold">{getPersonaName(score.personaId)}</span>
                  <Badge variant="outline" className={`text-[9px] tabular-nums ${
                    score.score >= 9.0 ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                    score.score >= 8.0 ? "bg-blue-500/10 text-blue-600 border-blue-500/20" :
                    "bg-amber-500/10 text-amber-600 border-amber-500/20"
                  }`}>{score.score}/10</Badge>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">{score.feedback}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Sub-view: Video Scripts
// ──────────────────────────────────────────────────────

function VideoScriptsView() {
  const [expandedScript, setExpandedScript] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Scripts</p>
            <p className="text-xl font-bold tabular-nums">{videoScripts.length}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Scripted</p>
            <p className="text-xl font-bold tabular-nums text-amber-600">{videoScripts.filter((v) => v.status === "scripted").length}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Concepts</p>
            <p className="text-xl font-bold tabular-nums text-purple-600">{videoScripts.filter((v) => v.status === "concept").length}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Avg Audience Score</p>
            <p className="text-xl font-bold tabular-nums text-primary">{contentEngineKPIs.videoScripts.avgScore}</p>
          </CardContent>
        </Card>
      </div>

      {videoScripts.map((script) => {
        const isExpanded = expandedScript === script.id;
        const avgScore = script.audienceScores.length > 0
          ? (script.audienceScores.reduce((a, s) => a + s.score, 0) / script.audienceScores.length).toFixed(1)
          : "N/A";
        return (
          <Card key={script.id} className="border border-border">
            <CardContent className="p-4">
              <button
                className="flex items-center justify-between w-full text-left"
                onClick={() => setExpandedScript(isExpanded ? null : script.id)}
                data-testid={`video-${script.id}`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    script.format === "Short" ? "bg-red-500/10" : "bg-red-500/10"
                  }`}>
                    {script.format === "Short" ? <Zap className="w-4 h-4 text-red-500" /> : <Video className="w-4 h-4 text-red-500" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-xs font-semibold">{script.title}</p>
                      <Badge variant="outline" className={`text-[9px] ${statusBadge[script.status]}`}>{script.status}</Badge>
                      <Badge variant="secondary" className="text-[9px]">{script.format} · {script.duration}</Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-[10px] text-muted-foreground">
                      <span>{script.platform}</span>
                      <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" /> {script.estimatedReach}</span>
                      <span className="flex items-center gap-0.5"><Star className="w-3 h-3" /> {avgScore}</span>
                    </div>
                  </div>
                </div>
                {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
              </button>

              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-border space-y-3">
                  <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                    <p className="text-[10px] font-semibold text-red-600 mb-1">HOOK</p>
                    <p className="text-xs font-medium italic">&ldquo;{script.hook}&rdquo;</p>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-[10px] font-semibold text-muted-foreground mb-1">OUTLINE</p>
                    <ol className="space-y-1">
                      {script.outline.map((item, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex gap-2">
                          <span className="text-primary font-bold shrink-0 tabular-nums">{i + 1}.</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg border border-border">
                      <p className="text-[10px] font-semibold text-muted-foreground mb-1">PRODUCTION NOTES</p>
                      <p className="text-xs text-muted-foreground">{script.productionNotes}</p>
                    </div>
                    <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
                      <p className="text-[10px] font-semibold text-primary mb-1">CTA</p>
                      <p className="text-xs font-medium">{script.cta}</p>
                    </div>
                  </div>

                  {/* Audience scores */}
                  <div>
                    <p className="text-[10px] font-semibold text-muted-foreground mb-2">AUDIENCE SCORES</p>
                    <div className="space-y-2">
                      {script.audienceScores.map((score) => (
                        <div key={score.personaId} className="flex items-start gap-2 p-2 rounded bg-muted/30">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0" style={{ backgroundColor: getPersonaColor(score.personaId) }}>
                            {getPersonaName(score.personaId)[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-semibold">{getPersonaName(score.personaId)}</span>
                              <Badge variant="outline" className={`text-[9px] tabular-nums ${
                                score.score >= 9.0 ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                                score.score >= 8.0 ? "bg-blue-500/10 text-blue-600 border-blue-500/20" :
                                "bg-amber-500/10 text-amber-600 border-amber-500/20"
                              }`}>{score.score}/10</Badge>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{score.feedback}</p>
                          </div>
                        </div>
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
  );
}

// ──────────────────────────────────────────────────────
// Sub-view: Reddit Content
// ──────────────────────────────────────────────────────

function RedditContentView() {
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Content</p>
            <p className="text-xl font-bold tabular-nums">{redditContentPosts.length}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Approved</p>
            <p className="text-xl font-bold tabular-nums text-emerald-600">{redditContentPosts.filter((r) => r.status === "approved").length}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Subreddits</p>
            <p className="text-xl font-bold tabular-nums">{[...new Set(redditContentPosts.map((r) => r.subreddit))].length}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Avg Score</p>
            <p className="text-xl font-bold tabular-nums text-orange-500">{contentEngineKPIs.redditPosts.avgScore}</p>
          </CardContent>
        </Card>
      </div>

      {redditContentPosts.map((post) => {
        const isExpanded = expandedPost === post.id;
        const avgScore = post.audienceScores.length > 0
          ? (post.audienceScores.reduce((a, s) => a + s.score, 0) / post.audienceScores.length).toFixed(1)
          : "N/A";
        return (
          <Card key={post.id} className="border border-border">
            <CardContent className="p-4">
              <button
                className="flex items-center justify-between w-full text-left"
                onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                data-testid={`reddit-content-${post.id}`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-orange-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400">{post.subreddit}</span>
                      <Badge variant="outline" className={`text-[9px] ${statusBadge[post.status]}`}>{post.status}</Badge>
                      <Badge variant="outline" className={`text-[9px] ${catColors[post.category] || "bg-gray-500/10 text-gray-600 border-gray-500/20"}`}>{post.category}</Badge>
                      <Badge variant="secondary" className="text-[9px]">{post.type}</Badge>
                    </div>
                    <p className="text-xs font-semibold mt-0.5 line-clamp-1">{post.title}</p>
                    <div className="flex items-center gap-3 mt-0.5 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-0.5"><Calendar className="w-3 h-3" /> {post.scheduledWeek}</span>
                      <span className="flex items-center gap-0.5"><Star className="w-3 h-3" /> {avgScore}</span>
                    </div>
                  </div>
                </div>
                {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
              </button>

              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-border space-y-3">
                  <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/20">
                    <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed">{post.content}</pre>
                  </div>

                  {/* Audience scores */}
                  <div>
                    <p className="text-[10px] font-semibold text-muted-foreground mb-2">AUDIENCE SCORES</p>
                    <div className="space-y-2">
                      {post.audienceScores.map((score) => (
                        <div key={score.personaId} className="flex items-start gap-2 p-2 rounded bg-muted/30">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0" style={{ backgroundColor: getPersonaColor(score.personaId) }}>
                            {getPersonaName(score.personaId)[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-semibold">{getPersonaName(score.personaId)}</span>
                              <Badge variant="outline" className={`text-[9px] tabular-nums ${
                                score.score >= 9.0 ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                                score.score >= 8.0 ? "bg-blue-500/10 text-blue-600 border-blue-500/20" :
                                "bg-amber-500/10 text-amber-600 border-amber-500/20"
                              }`}>{score.score}/10</Badge>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{score.feedback}</p>
                          </div>
                        </div>
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
  );
}

// ──────────────────────────────────────────────────────
// Main Content Engine Tab
// ──────────────────────────────────────────────────────

export default function ContentEngineTab() {
  const [activeSection, setActiveSection] = useState<"overview" | "linkedin" | "publication" | "video" | "reddit">("overview");

  const kpis = contentEngineKPIs;
  const calendarData = kpis.weeklyCalendar.map((w) => ({
    week: w.week.replace("Mar ", "3/").replace("Apr ", "4/").split("–")[0],
    LinkedIn: w.linkedin,
    Reddit: w.reddit,
    Video: w.video,
    Publication: w.publication,
  }));

  return (
    <div className="space-y-4">
      {/* Section Switcher */}
      <div className="flex gap-2 flex-wrap">
        {([
          { key: "overview", label: "Overview", icon: BarChart3 },
          { key: "linkedin", label: "LinkedIn Posts", icon: Linkedin },
          { key: "publication", label: "DHTSCI Publication", icon: BookOpen },
          { key: "video", label: "Video Scripts", icon: Video },
          { key: "reddit", label: "Reddit Content", icon: MessageSquare },
        ] as const).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeSection === key
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
            data-testid={`ce-section-${key}`}
          >
            <Icon className="w-3 h-3" />
            {label}
          </button>
        ))}
      </div>

      {activeSection === "overview" && (
        <div className="space-y-4">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Card className="border border-border">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Total Content</p>
                <p className="text-xl font-bold tabular-nums">{kpis.totalContent}</p>
                <p className="text-[10px] text-muted-foreground">Across all channels</p>
              </CardContent>
            </Card>
            <Card className="border border-blue-500/20 bg-blue-500/5">
              <CardContent className="p-4">
                <p className="text-xs text-blue-600 dark:text-blue-400">LinkedIn</p>
                <p className="text-xl font-bold tabular-nums">{kpis.linkedInPosts.total}</p>
                <p className="text-[10px] text-muted-foreground">Avg score: {kpis.linkedInPosts.avgScore}</p>
              </CardContent>
            </Card>
            <Card className="border border-red-500/20 bg-red-500/5">
              <CardContent className="p-4">
                <p className="text-xs text-red-500">Video Scripts</p>
                <p className="text-xl font-bold tabular-nums">{kpis.videoScripts.total}</p>
                <p className="text-[10px] text-muted-foreground">Avg score: {kpis.videoScripts.avgScore}</p>
              </CardContent>
            </Card>
            <Card className="border border-orange-500/20 bg-orange-500/5">
              <CardContent className="p-4">
                <p className="text-xs text-orange-500">Reddit</p>
                <p className="text-xl font-bold tabular-nums">{kpis.redditPosts.total}</p>
                <p className="text-[10px] text-muted-foreground">Avg score: {kpis.redditPosts.avgScore}</p>
              </CardContent>
            </Card>
            <Card className="border border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <p className="text-xs text-primary">Publication</p>
                <p className="text-xl font-bold tabular-nums">{kpis.publicationSections.total}</p>
                <p className="text-[10px] text-muted-foreground">Next: {kpis.publicationSections.nextDeadline}</p>
              </CardContent>
            </Card>
          </div>

          {/* Content Calendar */}
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> Content Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={calendarData} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 11 }} />
                    <Bar dataKey="LinkedIn" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Reddit" fill="#f97316" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Video" fill="#ef4444" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Publication" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Synthetic Audience Summary */}
          <Card className="border border-purple-500/20 bg-purple-500/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-purple-500" />
                <p className="text-sm font-semibold">Synthetic Audience Performance</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-2 rounded bg-background border border-border">
                  <p className="text-[10px] text-muted-foreground">Avg Content Score</p>
                  <p className="text-lg font-bold tabular-nums">{kpis.syntheticAudience.avgContentScore}</p>
                </div>
                <div className="p-2 rounded bg-background border border-border">
                  <p className="text-[10px] text-muted-foreground">Highest Scoring</p>
                  <p className="text-xs font-bold">{kpis.syntheticAudience.highestScoringContent}</p>
                </div>
                <div className="p-2 rounded bg-background border border-border">
                  <p className="text-[10px] text-muted-foreground">Iterations</p>
                  <p className="text-lg font-bold tabular-nums">{kpis.syntheticAudience.iterationsCompleted}</p>
                </div>
                <div className="p-2 rounded bg-background border border-border">
                  <p className="text-[10px] text-muted-foreground">Avg Improvement</p>
                  <p className="text-lg font-bold tabular-nums text-emerald-600">{kpis.syntheticAudience.improvementFromIteration}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Content Table */}
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Top Performing Content</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-[10px]">Content</TableHead>
                      <TableHead className="text-[10px]">Channel</TableHead>
                      <TableHead className="text-[10px] text-center">Score</TableHead>
                      <TableHead className="text-[10px]">Top Persona</TableHead>
                      <TableHead className="text-[10px]">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ...weeklyLinkedInPosts.map((p) => ({ name: p.title, channel: "LinkedIn", scores: p.audienceScores, status: p.status })),
                      ...bessLinkedInPosts.map((p) => ({ name: p.title, channel: "LinkedIn (BESS)", scores: p.audienceScores, status: p.status })),
                      ...videoScripts.map((v) => ({ name: v.title, channel: "Video", scores: v.audienceScores, status: v.status })),
                      ...redditContentPosts.map((r) => ({ name: r.title.substring(0, 50) + "...", channel: "Reddit", scores: r.audienceScores, status: r.status })),
                    ]
                      .map((item) => ({
                        ...item,
                        avgScore: item.scores.length > 0 ? item.scores.reduce((a, s) => a + s.score, 0) / item.scores.length : 0,
                        topPersona: item.scores.length > 0 ? item.scores.reduce((a, s) => s.score > a.score ? s : a, item.scores[0]) : null,
                      }))
                      .sort((a, b) => b.avgScore - a.avgScore)
                      .slice(0, 10)
                      .map((item, i) => (
                        <TableRow key={i}>
                          <TableCell className="text-xs font-medium max-w-[250px] truncate">{item.name}</TableCell>
                          <TableCell><Badge variant="secondary" className="text-[9px]">{item.channel}</Badge></TableCell>
                          <TableCell className="text-xs tabular-nums text-center font-bold">{item.avgScore.toFixed(1)}</TableCell>
                          <TableCell className="text-[10px] text-muted-foreground">{item.topPersona ? `${getPersonaName(item.topPersona.personaId)} (${item.topPersona.score})` : "—"}</TableCell>
                          <TableCell><Badge variant="outline" className={`text-[9px] ${statusBadge[item.status]}`}>{item.status}</Badge></TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeSection === "linkedin" && <LinkedInPostsView />}
      {activeSection === "publication" && <PublicationView />}
      {activeSection === "video" && <VideoScriptsView />}
      {activeSection === "reddit" && <RedditContentView />}
    </div>
  );
}
