import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy, TrendingUp, Eye, Heart, MessageSquare, Share2, ChevronDown,
  ChevronRight, Target, Users, Zap, Star, ArrowUpRight, Lightbulb,
  Image, Video, FileText, Layers, Type, CheckCircle2, Sparkles, BarChart3,
} from "lucide-react";
import {
  competitorTopPosts, CompetitorPost, proposedRKPosts, ProposedRKPost,
} from "@/lib/pressReleasesData";
import { syntheticPersonas } from "@/lib/contentEngineData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";

const mediaIcons: Record<string, typeof Image> = {
  image: Image,
  video: Video,
  carousel: Layers,
  document: FileText,
  text: Type,
};

const competitorColors: Record<string, string> = {
  "DHL Supply Chain": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
  "GXO Logistics": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "Ryder": "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  "CEVA Logistics": "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  "XPO": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
};

const rkStatusColors: Record<string, string> = {
  draft: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
  approved: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  ready: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
};

// ──────────────────────────────────────────────────────
// Competitor Post Card
// ──────────────────────────────────────────────────────
function CompetitorPostCard({ post }: { post: CompetitorPost }) {
  const [expanded, setExpanded] = useState(false);
  const MediaIcon = mediaIcons[post.mediaType] || Image;

  const avgScore = post.audienceScores.length > 0
    ? (post.audienceScores.reduce((a, b) => a + b.score, 0) / post.audienceScores.length).toFixed(1)
    : "—";

  return (
    <Card className="border-border">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Badge variant="outline" className={competitorColors[post.competitor] || ""}>{post.competitor}</Badge>
              <Badge variant="outline" className="text-[10px]">
                <MediaIcon className="w-2.5 h-2.5 mr-1" />{post.mediaType}
              </Badge>
              <span className="text-[10px] text-muted-foreground">{post.platform} · {post.postDate}</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <Badge variant="outline" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-xs">
              {post.engagementRate} ER
            </Badge>
          </div>
        </div>

        {/* Post Content Preview */}
        <div className="p-3 rounded-md bg-muted/30 border border-border mb-3">
          <p className="text-xs leading-relaxed whitespace-pre-line line-clamp-6">{post.content}</p>
        </div>

        {/* Engagement Stats */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="flex items-center gap-1.5 p-1.5 rounded bg-muted/50 border border-border">
            <Heart className="w-3 h-3 text-red-500" />
            <div>
              <p className="text-xs font-bold">{post.engagement.likes.toLocaleString()}</p>
              <p className="text-[9px] text-muted-foreground">Likes</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 p-1.5 rounded bg-muted/50 border border-border">
            <MessageSquare className="w-3 h-3 text-blue-500" />
            <div>
              <p className="text-xs font-bold">{post.engagement.comments}</p>
              <p className="text-[9px] text-muted-foreground">Comments</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 p-1.5 rounded bg-muted/50 border border-border">
            <Share2 className="w-3 h-3 text-emerald-500" />
            <div>
              <p className="text-xs font-bold">{post.engagement.shares}</p>
              <p className="text-[9px] text-muted-foreground">Shares</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 p-1.5 rounded bg-muted/50 border border-border">
            <Eye className="w-3 h-3 text-purple-500" />
            <div>
              <p className="text-xs font-bold">{post.engagement.impressions}</p>
              <p className="text-[9px] text-muted-foreground">Impressions</p>
            </div>
          </div>
        </div>

        {/* Visual Description */}
        <div className="p-2 rounded bg-blue-500/5 border border-blue-500/10 mb-3">
          <p className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 mb-0.5">
            <Image className="w-3 h-3 inline mr-1" />Visual Description
          </p>
          <p className="text-[10px] text-muted-foreground">{post.imageUrl}</p>
        </div>

        {/* Why It Worked */}
        <div className="p-2 rounded bg-amber-500/5 border border-amber-500/10 mb-3">
          <p className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 mb-0.5">
            <Lightbulb className="w-3 h-3 inline mr-1" />Why It Worked
          </p>
          <p className="text-[10px] text-muted-foreground">{post.whyItWorked}</p>
        </div>

        {/* Expand for synthetic audience */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 hover:underline"
          data-testid={`expand-cp-${post.id}`}
        >
          {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          {expanded ? "Hide Analysis" : "Synthetic Audience Analysis"}
        </button>

        {expanded && (
          <div className="mt-3 space-y-2">
            {post.audienceScores.map((s) => {
              const persona = syntheticPersonas.find((p) => p.id === s.personaId);
              return (
                <div key={s.personaId} className="p-2 rounded bg-muted/30 border border-border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold">{persona?.name || s.personaId}</span>
                    <Badge variant="outline" className={s.score >= 9 ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-blue-500/10 text-blue-600 border-blue-500/20"}>
                      {s.score}/10
                    </Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground italic">"{s.feedback}"</p>
                </div>
              );
            })}
            <div className="p-2 rounded bg-teal-500/5 border border-teal-500/20">
              <p className="text-[10px] font-semibold text-teal-600 dark:text-teal-400">
                <Target className="w-3 h-3 inline mr-1" />Average Synthetic Score: {avgScore}/10
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ──────────────────────────────────────────────────────
// RK Proposed Post Card
// ──────────────────────────────────────────────────────
function RKProposedPostCard({ post }: { post: ProposedRKPost }) {
  const [expanded, setExpanded] = useState(false);
  const MediaIcon = mediaIcons[post.mediaType] || Image;
  const inspiredPost = competitorTopPosts.find((cp) => cp.id === post.inspiredBy);

  const avgScore = post.audienceScores.length > 0
    ? (post.audienceScores.reduce((a, b) => a + b.score, 0) / post.audienceScores.length).toFixed(1)
    : "—";

  return (
    <Card className="border-border border-l-2 border-l-teal-500">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Badge variant="outline" className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20">
                RK Logistics
              </Badge>
              <Badge variant="outline" className={rkStatusColors[post.status]}>{post.status}</Badge>
              <Badge variant="outline" className="text-[10px]">
                <MediaIcon className="w-2.5 h-2.5 mr-1" />{post.mediaType}
              </Badge>
              <Badge variant="outline" className="text-[10px]">V{post.iteration}</Badge>
            </div>
            <h3 className="text-sm font-semibold leading-tight">{post.title}</h3>
            {inspiredPost && (
              <p className="text-[9px] text-muted-foreground mt-0.5">
                <Sparkles className="w-2.5 h-2.5 inline mr-0.5" />
                Inspired by {inspiredPost.competitor}'s post ({inspiredPost.engagementRate} ER)
              </p>
            )}
          </div>
          <div className="text-right shrink-0">
            <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
              <span className="text-lg font-bold text-teal-600 dark:text-teal-400">{avgScore}</span>
            </div>
            <p className="text-[9px] text-muted-foreground mt-0.5">Audience Score</p>
          </div>
        </div>

        {/* Proposed Content */}
        <div className="p-3 rounded-md bg-teal-500/5 border border-teal-500/10 mb-3">
          <p className="text-xs leading-relaxed whitespace-pre-line">{post.content}</p>
        </div>

        {/* Media Description */}
        <div className="p-2 rounded bg-blue-500/5 border border-blue-500/10 mb-3">
          <p className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 mb-0.5">
            <Image className="w-3 h-3 inline mr-1" />Proposed Visual
          </p>
          <p className="text-[10px] text-muted-foreground">{post.mediaDescription}</p>
        </div>

        {/* Rationale */}
        <div className="p-2 rounded bg-purple-500/5 border border-purple-500/10 mb-3">
          <p className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 mb-0.5">
            <Lightbulb className="w-3 h-3 inline mr-1" />Strategic Rationale
          </p>
          <p className="text-[10px] text-muted-foreground">{post.rationale}</p>
        </div>

        {/* Expand */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 hover:underline"
          data-testid={`expand-rk-${post.id}`}
        >
          {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          {expanded ? "Hide Audience Scores" : "View Synthetic Audience Scores"}
        </button>

        {expanded && (
          <div className="mt-3 space-y-2">
            {post.audienceScores.map((s) => {
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
        )}
      </CardContent>
    </Card>
  );
}

// ──────────────────────────────────────────────────────
// Engagement Comparison Chart
// ──────────────────────────────────────────────────────
function EngagementComparison() {
  const chartData = competitorTopPosts.map((p) => ({
    name: p.competitor.split(" ")[0],
    likes: p.engagement.likes,
    comments: p.engagement.comments,
    shares: p.engagement.shares,
  }));

  return (
    <Card className="border-border">
      <CardContent className="p-4">
        <p className="text-xs font-semibold mb-3">
          <BarChart3 className="w-3.5 h-3.5 inline mr-1" />
          Competitor Engagement Comparison
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
            <Bar dataKey="likes" fill="#ef4444" name="Likes" radius={[2, 2, 0, 0]} />
            <Bar dataKey="comments" fill="#3b82f6" name="Comments" radius={[2, 2, 0, 0]} />
            <Bar dataKey="shares" fill="#10b981" name="Shares" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// ──────────────────────────────────────────────────────
// Proposed RK Content vs Competitor Average
// ──────────────────────────────────────────────────────
function RKvsCompetitorScores() {
  const compAvg = competitorTopPosts.reduce((acc, p) => {
    const avg = p.audienceScores.reduce((a, b) => a + b.score, 0) / p.audienceScores.length;
    return acc + avg;
  }, 0) / competitorTopPosts.length;

  const rkAvg = proposedRKPosts.reduce((acc, p) => {
    const avg = p.audienceScores.reduce((a, b) => a + b.score, 0) / p.audienceScores.length;
    return acc + avg;
  }, 0) / proposedRKPosts.length;

  const compData = [
    { name: "Competitor Avg", score: parseFloat(compAvg.toFixed(1)) },
    { name: "RK Proposed Avg", score: parseFloat(rkAvg.toFixed(1)) },
  ];

  return (
    <Card className="border-border">
      <CardContent className="p-4">
        <p className="text-xs font-semibold mb-3">
          <Target className="w-3.5 h-3.5 inline mr-1" />
          Synthetic Audience: RK vs Competitors
        </p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="p-3 rounded-md bg-muted/50 border border-border text-center">
            <p className="text-[10px] text-muted-foreground">Competitor Average</p>
            <p className="text-2xl font-bold">{compAvg.toFixed(1)}<span className="text-xs text-muted-foreground">/10</span></p>
          </div>
          <div className="p-3 rounded-md bg-teal-500/5 border border-teal-500/20 text-center">
            <p className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold">RK Proposed</p>
            <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{rkAvg.toFixed(1)}<span className="text-xs text-muted-foreground">/10</span></p>
          </div>
        </div>
        <div className="p-2 rounded bg-emerald-500/5 border border-emerald-500/20">
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3 h-3 inline mr-1" />
            RK proposed content scores {(rkAvg - compAvg).toFixed(1)} points higher than competitor average — validated by synthetic audience testing across {syntheticPersonas.length} personas
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// ──────────────────────────────────────────────────────
// Main: Competitor Posts Tab
// ──────────────────────────────────────────────────────
export default function CompetitorPostsTab() {
  const [view, setView] = useState<"analysis" | "proposed" | "comparison">("analysis");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold flex items-center gap-2">
            <Trophy className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            Competitor Top Posts Analysis
          </h2>
          <p className="text-[10px] text-muted-foreground">Analyze top posts, test against synthetic audiences, propose RK counter-content</p>
        </div>
        <div className="flex gap-1">
          {(["analysis", "proposed", "comparison"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-2.5 py-1 rounded text-[10px] font-medium transition-colors ${
                view === v ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20" : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid={`cposts-view-${v}`}
            >
              {v === "analysis" ? "Competitor Posts" : v === "proposed" ? "RK Content" : "Comparison"}
            </button>
          ))}
        </div>
      </div>

      {view === "analysis" && (
        <div className="space-y-3">
          <EngagementComparison />
          {competitorTopPosts.map((post) => (
            <CompetitorPostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {view === "proposed" && (
        <div className="space-y-3">
          <Card className="border-border border-teal-500/20 bg-teal-500/5">
            <CardContent className="p-3">
              <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mb-1">
                <Sparkles className="w-3.5 h-3.5 inline mr-1" />
                Proposed RK Content — Synthetic Audience Tested
              </p>
              <p className="text-[10px] text-muted-foreground">
                Each post is inspired by a top-performing competitor post, adapted to RK's unique strengths (FTZ, semiconductor specialization, 30-year history), and iterated through synthetic audience testing until scores exceeded competitor benchmarks.
              </p>
            </CardContent>
          </Card>
          {proposedRKPosts.map((post) => (
            <RKProposedPostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {view === "comparison" && (
        <div className="space-y-4">
          <RKvsCompetitorScores />
          <div className="grid md:grid-cols-2 gap-3">
            {proposedRKPosts.map((rk) => {
              const comp = competitorTopPosts.find((cp) => cp.id === rk.inspiredBy);
              if (!comp) return null;
              const compAvg = comp.audienceScores.reduce((a, b) => a + b.score, 0) / comp.audienceScores.length;
              const rkAvg = rk.audienceScores.reduce((a, b) => a + b.score, 0) / rk.audienceScores.length;
              return (
                <Card key={rk.id} className="border-border">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={competitorColors[comp.competitor] || ""}>{comp.competitor}</Badge>
                      <span className="text-muted-foreground text-xs">→</span>
                      <Badge variant="outline" className="bg-teal-500/10 text-teal-600 border-teal-500/20">RK</Badge>
                    </div>
                    <p className="text-xs font-semibold mb-2">{rk.title}</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded bg-muted/50 border border-border text-center">
                        <p className="text-[9px] text-muted-foreground">{comp.competitor}</p>
                        <p className="text-sm font-bold">{compAvg.toFixed(1)}</p>
                      </div>
                      <div className="p-2 rounded bg-teal-500/5 border border-teal-500/20 text-center">
                        <p className="text-[9px] text-teal-600 font-semibold">RK Proposed</p>
                        <p className="text-sm font-bold text-teal-600 dark:text-teal-400">{rkAvg.toFixed(1)}</p>
                      </div>
                    </div>
                    <p className="text-[9px] text-emerald-600 dark:text-emerald-400 mt-1.5">
                      +{(rkAvg - compAvg).toFixed(1)} improvement via synthetic iteration (V{rk.iteration})
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
