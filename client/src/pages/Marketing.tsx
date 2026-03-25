import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  marketingData, marketingSocialMedia, marketingCompetitors,
  marketingBdActivities, marketingKeyAccounts,
  marketingRecommendations, marketingIdeas, marketingEmailCampaigns,
  marketingCustomerNewsRK, marketingCustomerNewsOTT, marketingFacilityLocations,
  marketingRedditData, marketingYouTubeData,
} from "@/lib/data";
import {
  Megaphone, TrendingUp, Globe, Users, BarChart3, Target, Zap,
  ChevronDown, ChevronRight, Building2, MapPin, Mail, Lightbulb,
  Newspaper, ArrowUpRight, ArrowDownRight, Shield, AlertTriangle,
  Calendar, Send, Eye, MousePointerClick, Star, ExternalLink,
  Briefcase, Trophy, Clock, CheckCircle2, MessageSquare, Play,
  Video, Hash, DollarSign, TrendingDown, Radio,
} from "lucide-react";
import ContentEngineTab from "./ContentEngineTab";
import SyntheticAudienceTab from "./SyntheticAudienceTab";
import PressReleasesTab from "./PressReleasesTab";
import CompetitorPostsTab from "./CompetitorPostsTab";
import EmailMarketingTab from "./EmailMarketingTab";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";


// ──────────────────────────────────────────────────────
// Helper color maps
// ──────────────────────────────────────────────────────

const priorityBadge: Record<string, string> = {
  Critical: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  critical: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  High: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  high: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Medium: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  medium: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Low: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
  low: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
};

const statusBadge: Record<string, string> = {
  Growing: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Stable: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "High Potential": "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  Target: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

const threatBadge: Record<string, string> = {
  High: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Low: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
};

const bdTypeBadge: Record<string, { color: string; label: string }> = {
  win: { color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20", label: "Won" },
  opportunity: { color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20", label: "Opportunity" },
  rfp: { color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20", label: "RFP" },
  acquisition: { color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20", label: "M&A" },
  progress: { color: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20", label: "In Progress" },
};

const emailStatusBadge: Record<string, string> = {
  ready: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  urgent: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  draft: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
  template: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
};

// ──────────────────────────────────────────────────────
// Tab 1: Overview & KPIs
// ──────────────────────────────────────────────────────

function OverviewTab() {
  const chartData = marketingData.digitalPerformance.map((d) => ({
    channel: d.channel,
    sessions: parseInt(d.sessions.replace(",", "")),
    leads: d.leads,
  }));

  return (
    <div className="space-y-4">
      {/* Brand Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3" data-testid="marketing-kpis">
        {marketingData.brandMetrics.map((m) => (
          <Card key={m.metric} className="border border-border">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{m.metric}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-xl font-bold tabular-nums">{m.value}</p>
                <Badge variant="secondary" className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0">{m.change}</Badge>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">{m.period}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Digital Performance Chart */}
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Digital Channel Performance</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="channel" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
                  <Bar dataKey="sessions" name="Sessions" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="leads" name="Leads" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Channel Table */}
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Channel Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Channel</TableHead>
                    <TableHead className="text-xs text-right">Sessions</TableHead>
                    <TableHead className="text-xs text-right">Conv %</TableHead>
                    <TableHead className="text-xs text-right">Leads</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketingData.digitalPerformance.map((d, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-xs font-medium">{d.channel}</TableCell>
                      <TableCell className="text-xs text-right tabular-nums">{d.sessions}</TableCell>
                      <TableCell className="text-xs text-right tabular-nums">{d.conversion}</TableCell>
                      <TableCell className="text-xs text-right tabular-nums font-medium">{d.leads}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conference Presence */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Conference Presence</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Event</TableHead>
                  <TableHead className="text-xs">Date</TableHead>
                  <TableHead className="text-xs">Location</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs text-right">Budget</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marketingData.conferencePresence.map((c, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-xs font-medium">{c.event}</TableCell>
                    <TableCell className="text-xs tabular-nums">{c.date}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{c.location}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] ${
                        c.status === "Registered" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" :
                        c.status === "Attending" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" :
                        c.status === "Evaluating" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" :
                        "bg-gray-500/10 text-gray-600 dark:text-gray-400"
                      }`}>{c.status}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-right tabular-nums">{c.budget}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Tab 2: Social Media
// ──────────────────────────────────────────────────────

function SocialMediaTab() {
  const sm = marketingSocialMedia;

  return (
    <div className="space-y-4">
      {/* RK Current Stats */}
      <Card className="border border-primary/20 bg-primary/5">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold">RK Logistics Current Presence</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">LinkedIn Followers</p>
              <p className="text-lg font-bold tabular-nums">{sm.rk.linkedin.followers.toLocaleString()}</p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400">{sm.rk.linkedin.growth} growth</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">LinkedIn Engagement</p>
              <p className="text-lg font-bold tabular-nums">{sm.rk.linkedin.engagement}</p>
              <p className="text-[10px] text-muted-foreground">{sm.rk.linkedin.posts30d} posts / 30d</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Website Traffic</p>
              <p className="text-lg font-bold tabular-nums">{sm.rk.website.monthly}/mo</p>
              <p className="text-[10px] text-muted-foreground">{sm.rk.website.blogPages} blog pages</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">X / Twitter</p>
              <p className="text-lg font-bold tabular-nums">{sm.rk.twitter.followers}</p>
              <p className="text-[10px] text-red-500">{sm.rk.twitter.status}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Gap Analysis */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Platform Gap Analysis vs Competitors</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Platform</TableHead>
                  <TableHead className="text-xs">RK</TableHead>
                  <TableHead className="text-xs">Competitor Avg</TableHead>
                  <TableHead className="text-xs">Gap</TableHead>
                  <TableHead className="text-xs">Priority</TableHead>
                  <TableHead className="text-xs">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sm.platforms.map((p, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-xs font-medium">{p.platform}</TableCell>
                    <TableCell className="text-xs tabular-nums">{p.rkValue}</TableCell>
                    <TableCell className="text-xs tabular-nums">{p.competitorAvg}</TableCell>
                    <TableCell className="text-xs text-red-500 font-medium">{p.gap}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] ${priorityBadge[p.priority] || ""}`}>{p.priority}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-[200px]">{p.action}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Content Calendar */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Recommended Weekly Content Calendar</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {sm.contentCalendar.map((day) => (
              <div key={day.day} className="p-3 rounded-lg border border-border bg-muted/30">
                <p className="text-xs font-bold text-primary">{day.day}</p>
                <p className="text-xs font-semibold mt-1">{day.type}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{day.topic}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Tab 3: Competitor Intel
// ──────────────────────────────────────────────────────

function CompetitorIntelTab() {
  const [expandedComp, setExpandedComp] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Competitor Cards */}
      {marketingCompetitors.map((comp) => {
        const isExpanded = expandedComp === comp.name;
        return (
          <Card key={comp.name} className="border border-border">
            <CardContent className="p-4">
              <button
                className="flex items-center justify-between w-full text-left"
                onClick={() => setExpandedComp(isExpanded ? null : comp.name)}
                data-testid={`mkt-comp-${comp.name.replace(/\s/g, "-").toLowerCase()}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: comp.color }}>
                    {comp.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold truncate">{comp.name}</p>
                      <Badge variant="outline" className={`text-[10px] ${threatBadge[comp.threatLevel]}`}>
                        {comp.threatLevel} Threat
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">{comp.tier}</Badge>
                    </div>
                    <p className="text-[10px] text-muted-foreground truncate">{comp.tagline} · Rev: {comp.revenue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <div className="hidden md:flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span>LI: {comp.linkedin}</span>
                    <span>X: {comp.twitter}</span>
                    <span>Web: {comp.web}</span>
                  </div>
                  {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </div>
              </button>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-border space-y-3">
                  {/* Social Comparison */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-2 rounded bg-muted/40">
                      <p className="text-[10px] text-muted-foreground">LinkedIn</p>
                      <p className="text-xs font-bold">{comp.linkedin}</p>
                    </div>
                    <div className="p-2 rounded bg-muted/40">
                      <p className="text-[10px] text-muted-foreground">X / Twitter</p>
                      <p className="text-xs font-bold">{comp.twitter}</p>
                    </div>
                    <div className="p-2 rounded bg-muted/40">
                      <p className="text-[10px] text-muted-foreground">YouTube</p>
                      <p className="text-xs font-bold">{comp.youtube}</p>
                    </div>
                    <div className="p-2 rounded bg-muted/40">
                      <p className="text-[10px] text-muted-foreground">Website Traffic</p>
                      <p className="text-xs font-bold">{comp.web}/mo</p>
                    </div>
                  </div>

                  {/* Recent Moves */}
                  <div>
                    <p className="text-xs font-semibold mb-2">Recent Marketing & Brand Moves</p>
                    <ul className="space-y-1">
                      {comp.recentMoves.map((move, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex gap-2">
                          <span className="text-primary shrink-0">•</span>
                          <span>{move}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Strategy & Opportunity */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg border border-border">
                      <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Strengths</p>
                      <p className="text-xs text-muted-foreground">{comp.strengths}</p>
                    </div>
                    <div className="p-3 rounded-lg border border-border">
                      <p className="text-[10px] font-semibold text-red-500 mb-1">Weaknesses</p>
                      <p className="text-xs text-muted-foreground">{comp.weaknesses}</p>
                    </div>
                    <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
                      <p className="text-[10px] font-semibold text-primary mb-1">RK Opportunity</p>
                      <p className="text-xs text-muted-foreground">{comp.rkOpportunity}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-[10px] font-semibold mb-1">Content Strategy</p>
                    <p className="text-xs text-muted-foreground">{comp.contentStrategy}</p>
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
// Tab 4: BD Activity
// ──────────────────────────────────────────────────────

function BDActivityTab() {
  return (
    <div className="space-y-4">
      {/* Key Accounts */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Key Accounts — Marketing Focus</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Account</TableHead>
                  <TableHead className="text-xs">Annual Rev</TableHead>
                  <TableHead className="text-xs">Segment</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marketingKeyAccounts.map((a, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-xs font-semibold">{a.name}</TableCell>
                    <TableCell className="text-xs tabular-nums font-medium">{a.annual}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{a.segment}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] ${statusBadge[a.status] || ""}`}>{a.status}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-[200px]">{a.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Recent BD Activity */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Recent BD Activity Feed</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            {marketingBdActivities.map((item, i) => {
              const t = bdTypeBadge[item.type] || { color: "", label: item.type };
              return (
                <div key={i} className="flex gap-3 p-3 rounded-lg border border-border">
                  <div className="shrink-0 w-12 text-center">
                    <p className="text-[10px] text-muted-foreground">{item.date}</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-xs font-semibold">{item.title}</p>
                      <Badge variant="outline" className={`text-[10px] ${t.color}`}>{t.label}</Badge>
                      {item.impact === "high" && <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">High Impact</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
                    <div className="flex gap-1 mt-1.5">
                      {item.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-[9px] px-1.5 py-0">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Tab 5: Vacancies (Marketing Recommendations tied to vacancies)
// ──────────────────────────────────────────────────────

function VacanciesTab() {
  const recTypeIcon: Record<string, any> = {
    campaign: Megaphone,
    content: Newspaper,
    vacancy: Building2,
    social: Globe,
    event: Calendar,
  };

  return (
    <div className="space-y-4">
      <Card className="border border-primary/20 bg-primary/5">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold">Marketing Action Items</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Recommended marketing activities linked to current BD pipeline, facility vacancies, and competitive gaps.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {marketingRecommendations.map((rec, i) => {
          const Icon = recTypeIcon[rec.type] || Lightbulb;
          return (
            <Card key={i} className="border border-border">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold">{rec.title}</p>
                      <Badge variant="outline" className={`text-[10px] ${priorityBadge[rec.priority] || ""}`}>{rec.priority}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {rec.timeline}</span>
                      <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> {rec.effort} effort</span>
                    </div>
                    {rec.linkedBD.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {rec.linkedBD.map(bd => (
                          <Badge key={bd} variant="secondary" className="text-[9px] px-1.5 py-0">{bd}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Leaflet Map (dynamically loaded to avoid SSR/mount issues)
// ──────────────────────────────────────────────────────

function LeafletMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Dynamic import to avoid top-level load issues
    Promise.all([
      import("leaflet"),
      import("leaflet/dist/leaflet.css"),
    ]).then(([L]) => {
      if (!containerRef.current) return;

      // Fix default icon
      delete (L.default.Icon.Default.prototype as any)._getIconUrl;
      L.default.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const map = L.default.map(containerRef.current).setView([37.5, -105], 4);
      mapRef.current = map;

      L.default.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      marketingFacilityLocations.forEach((f) => {
        const marker = L.default.marker([f.lat, f.lng]).addTo(map);
        marker.bindPopup(
          `<div style="font-size:12px">
            <b>${f.name}</b><br/>
            ${f.address}<br/>
            ${f.sqft} sqft<br/>
            ${f.gbpScore > 0 ? `GBP: ${f.gbpScore} ★ (${f.reviews} reviews)` : ""}
            ${f.gbpStatus === "Unclaimed" ? '<br/><span style="color:red;font-weight:bold">GBP Unclaimed</span>' : ""}
          </div>`
        );
      });

      // Fit bounds to show all markers
      const bounds = L.default.latLngBounds(marketingFacilityLocations.map(f => [f.lat, f.lng]));
      map.fitBounds(bounds, { padding: [30, 30] });
    }).catch(err => console.error("Failed to load leaflet:", err));

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="h-[400px] rounded-lg overflow-hidden border border-border" />
  );
}

// ──────────────────────────────────────────────────────
// Tab 6: Facility Map & GBP
// ──────────────────────────────────────────────────────

function FacilityMapTab() {
  const claimed = marketingFacilityLocations.filter(f => f.gbpStatus === "Claimed").length;
  const unclaimed = marketingFacilityLocations.filter(f => f.gbpStatus === "Unclaimed").length;

  return (
    <div className="space-y-4">
      {/* GBP Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Facilities</p>
            <p className="text-xl font-bold tabular-nums">{marketingFacilityLocations.length}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">GBP Claimed</p>
            <p className="text-xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">{claimed}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">GBP Unclaimed</p>
            <p className="text-xl font-bold tabular-nums text-red-500">{unclaimed}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Avg Rating</p>
            <p className="text-xl font-bold tabular-nums">
              {(marketingFacilityLocations.filter(f => f.gbpScore > 0).reduce((a, f) => a + f.gbpScore, 0) / claimed).toFixed(1)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Map */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Facility Locations</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <LeafletMap />
        </CardContent>
      </Card>

      {/* Facility Table */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Google Business Profile Status</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Facility</TableHead>
                  <TableHead className="text-xs">Sqft</TableHead>
                  <TableHead className="text-xs">GBP Status</TableHead>
                  <TableHead className="text-xs text-center">Rating</TableHead>
                  <TableHead className="text-xs text-center">Reviews</TableHead>
                  <TableHead className="text-xs text-center">Local Rank</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marketingFacilityLocations.map((f, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-xs font-medium">{f.name}</TableCell>
                    <TableCell className="text-xs tabular-nums">{f.sqft}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] ${
                        f.gbpStatus === "Claimed" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" :
                        "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                      }`}>{f.gbpStatus}</Badge>
                    </TableCell>
                    <TableCell className="text-xs tabular-nums text-center">{f.gbpScore > 0 ? `${f.gbpScore} ★` : "—"}</TableCell>
                    <TableCell className="text-xs tabular-nums text-center">{f.reviews || "—"}</TableCell>
                    <TableCell className="text-xs tabular-nums text-center">{f.localRank ? `#${f.localRank}` : "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Tab 7: Customer News
// ──────────────────────────────────────────────────────

function CustomerNewsTab() {
  const [expandedStock, setExpandedStock] = useState<string | null>(null);

  const renderCompanyNews = (companies: typeof marketingCustomerNewsRK, label: string) => (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</h3>
      {companies.map((c) => {
        const isExpanded = expandedStock === c.company;
        return (
          <Card key={c.company} className="border border-border">
            <CardContent className="p-4">
              <button
                className="flex items-center justify-between w-full text-left"
                onClick={() => setExpandedStock(isExpanded ? null : c.company)}
                data-testid={`news-${c.company.replace(/\s/g, "-").toLowerCase()}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{c.company}</p>
                      <span className="text-[10px] text-muted-foreground tabular-nums">{c.ticker}</span>
                      <Badge variant="secondary" className="text-[9px] px-1.5 py-0">{c.sector}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-bold tabular-nums">{c.price}</span>
                      <span className={`text-xs tabular-nums flex items-center gap-0.5 ${c.positive ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>
                        {c.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {c.change}
                      </span>
                    </div>
                  </div>
                </div>
                {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
              </button>
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-border space-y-2">
                  {c.news.map((n, ni) => (
                    <div key={ni} className="flex gap-3 text-xs">
                      <span className="text-muted-foreground tabular-nums shrink-0 w-12">{n.date}</span>
                      <div>
                        <p className="font-medium">{n.headline}</p>
                        <p className="text-muted-foreground">{n.detail}</p>
                      </div>
                    </div>
                  ))}
                  <div className="p-2 rounded bg-primary/5 border border-primary/20 mt-2">
                    <p className="text-[10px] font-semibold text-primary">Logistics Impact</p>
                    <p className="text-xs text-muted-foreground">{c.logisticsImpact}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      {renderCompanyNews(marketingCustomerNewsRK, "RK Logistics Key Customers")}
      {renderCompanyNews(marketingCustomerNewsOTT, "On Time Trucking Partners")}
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Tab 8: Marketing Ideas
// ──────────────────────────────────────────────────────

function MarketingIdeasTab() {
  const [expandedCat, setExpandedCat] = useState<string | null>(marketingIdeas[0]?.category || null);

  return (
    <div className="space-y-4">
      {marketingIdeas.map((cat) => {
        const isExpanded = expandedCat === cat.category;
        return (
          <Card key={cat.category} className="border border-border">
            <CardContent className="p-4">
              <button
                className="flex items-center justify-between w-full text-left"
                onClick={() => setExpandedCat(isExpanded ? null : cat.category)}
                data-testid={`idea-cat-${cat.category.replace(/\s/g, "-").toLowerCase()}`}
              >
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{cat.category}</p>
                  <Badge variant="outline" className={`text-[10px] ${priorityBadge[cat.priority] || ""}`}>{cat.priority}</Badge>
                  <span className="text-[10px] text-muted-foreground">{cat.ideas.length} ideas</span>
                </div>
                {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </button>

              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-border space-y-3">
                  {cat.ideas.map((idea, i) => (
                    <div key={i} className="p-3 rounded-lg border border-border">
                      <p className="text-xs font-semibold">{idea.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{idea.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {idea.timeline}</span>
                        <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> {idea.effort}</span>
                        <span className="flex items-center gap-1"><Target className="w-3 h-3" /> Ref: {idea.competitor}</span>
                      </div>
                    </div>
                  ))}
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
// Tab 9: Sales Email Campaigns
// ──────────────────────────────────────────────────────

function SalesEmailsTab() {
  const [expandedEmail, setExpandedEmail] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Campaigns Ready</p>
            <p className="text-xl font-bold tabular-nums">{marketingEmailCampaigns.filter(e => e.status === "ready").length}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Recipients</p>
            <p className="text-xl font-bold tabular-nums">{marketingEmailCampaigns.reduce((a, e) => a + e.sendTo, 0).toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Urgent</p>
            <p className="text-xl font-bold tabular-nums text-red-500">{marketingEmailCampaigns.filter(e => e.status === "urgent").length}</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Drafts</p>
            <p className="text-xl font-bold tabular-nums">{marketingEmailCampaigns.filter(e => e.status === "draft" || e.status === "template").length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Email Campaign Cards */}
      <div className="space-y-3">
        {marketingEmailCampaigns.map((email, i) => {
          const isExpanded = expandedEmail === email.name;
          return (
            <Card key={i} className="border border-border">
              <CardContent className="p-4">
                <button
                  className="flex items-center justify-between w-full text-left"
                  onClick={() => setExpandedEmail(isExpanded ? null : email.name)}
                  data-testid={`email-${i}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs font-semibold">{email.name}</p>
                        <Badge variant="outline" className={`text-[10px] ${emailStatusBadge[email.status] || ""}`}>{email.status}</Badge>
                        <Badge variant="secondary" className="text-[9px] px-1.5 py-0">{email.type}</Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{email.audience} · {email.sendTo} recipients</p>
                    </div>
                  </div>
                  {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
                </button>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-border space-y-2">
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground">Subject Line</p>
                      <p className="text-xs font-medium">{email.subject}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground">Preview</p>
                      <p className="text-xs text-muted-foreground">{email.preview}</p>
                    </div>
                    <div className="flex items-center gap-4 text-[10px]">
                      <span className="flex items-center gap-1 text-primary font-medium"><Send className="w-3 h-3" /> CTA: {email.cta}</span>
                      <span className="text-muted-foreground">Audience: {email.sendTo}</span>
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
// Tab 10: Reddit Strategy
// ──────────────────────────────────────────────────────

const activityBadge: Record<string, string> = {
  "Very High": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  High: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Low: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
};

const relevanceBadge: Record<string, string> = {
  Critical: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  High: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Medium: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Low: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
};

function RedditTab() {
  const [expandedSub, setExpandedSub] = useState<string | null>(null);
  const rd = marketingRedditData;

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <Card className="border border-orange-500/30 bg-gradient-to-r from-orange-500/5 to-transparent">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-orange-500" />
            <p className="text-sm font-bold">Reddit Strategy Overview</p>
            <Badge variant="outline" className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 text-[9px]">No Presence</Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-3">{rd.overview.summary}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-2 rounded bg-background border border-border">
              <p className="text-[10px] text-muted-foreground">RK Presence</p>
              <p className="text-sm font-bold text-red-500">{rd.overview.rkPresence}</p>
            </div>
            <div className="p-2 rounded bg-background border border-border">
              <p className="text-[10px] text-muted-foreground">Monthly Reach</p>
              <p className="text-sm font-bold">{rd.overview.monthlyReach}</p>
            </div>
            <div className="p-2 rounded bg-background border border-border">
              <p className="text-[10px] text-muted-foreground">Reddit Ad CPM</p>
              <p className="text-sm font-bold text-emerald-600">{rd.overview.adPlatformCPM}</p>
            </div>
            <div className="p-2 rounded bg-background border border-border">
              <p className="text-[10px] text-muted-foreground">Opportunity</p>
              <p className="text-sm font-bold text-primary">{rd.overview.opportunity}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Target Subreddits */}
      <div>
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Hash className="w-4 h-4 text-orange-500" /> Target Subreddits</h3>
        <div className="space-y-2">
          {rd.subreddits.map((sub) => {
            const isExpanded = expandedSub === sub.name;
            return (
              <Card key={sub.name} className="border border-border">
                <CardContent className="p-3">
                  <button
                    className="flex items-center justify-between w-full text-left"
                    onClick={() => setExpandedSub(isExpanded ? null : sub.name)}
                    data-testid={`reddit-${sub.name.replace(/[\/\s]/g, "-").toLowerCase()}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">{sub.name}</p>
                          <span className="text-[10px] text-muted-foreground tabular-nums">{sub.members} members</span>
                          <span className="text-[10px] text-emerald-600 tabular-nums">{sub.growth}</span>
                          <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${activityBadge[sub.activity] || ""}`}>{sub.activity}</Badge>
                          <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${relevanceBadge[sub.rkRelevance] || ""}`}>RK: {sub.rkRelevance}</Badge>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{sub.description}</p>
                      </div>
                    </div>
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
                  </button>
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-border space-y-3">
                      <div>
                        <p className="text-[10px] font-semibold text-muted-foreground mb-1">HOT TOPICS</p>
                        <div className="flex flex-wrap gap-1">
                          {sub.topTopics.map((t, i) => (
                            <Badge key={i} variant="secondary" className="text-[10px]">{t}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="p-2 rounded bg-primary/5 border border-primary/20">
                        <p className="text-[10px] font-semibold text-primary">RK Strategy</p>
                        <p className="text-xs text-muted-foreground">{sub.strategy}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Content Strategy */}
      <div>
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Calendar className="w-4 h-4 text-orange-500" /> Content Strategy</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px]">Type</TableHead>
                <TableHead className="text-[10px]">Frequency</TableHead>
                <TableHead className="text-[10px] hidden md:table-cell">Description</TableHead>
                <TableHead className="text-[10px]">Subreddits</TableHead>
                <TableHead className="text-[10px]">Effort</TableHead>
                <TableHead className="text-[10px]">Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rd.contentStrategy.map((cs, i) => (
                <TableRow key={i}>
                  <TableCell className="text-xs font-medium">{cs.type}</TableCell>
                  <TableCell className="text-xs tabular-nums">{cs.frequency}</TableCell>
                  <TableCell className="text-[11px] text-muted-foreground hidden md:table-cell max-w-[300px]">{cs.description}</TableCell>
                  <TableCell className="text-[10px]">
                    <div className="flex flex-wrap gap-1">
                      {cs.subreddits.map((s, si) => (
                        <Badge key={si} variant="secondary" className="text-[9px] px-1 py-0">{s}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${priorityBadge[cs.effort] || "bg-blue-500/10 text-blue-600 border-blue-500/20"}`}>{cs.effort}</Badge></TableCell>
                  <TableCell><Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${priorityBadge[cs.impact] || "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"}`}>{cs.impact}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Reddit Ads Opportunity */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2"><DollarSign className="w-4 h-4 text-orange-500" /> Reddit Ads Opportunity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-2 rounded bg-muted/50 border border-border">
              <p className="text-[10px] text-muted-foreground">Monthly Budget</p>
              <p className="text-sm font-bold">{rd.adOpportunity.budget}</p>
            </div>
            <div className="p-2 rounded bg-muted/50 border border-border">
              <p className="text-[10px] text-muted-foreground">Est. Reach</p>
              <p className="text-sm font-bold">{rd.adOpportunity.estimatedReach}</p>
            </div>
            <div className="p-2 rounded bg-muted/50 border border-border">
              <p className="text-[10px] text-muted-foreground">Expected CTR</p>
              <p className="text-sm font-bold">{rd.adOpportunity.expectedCTR}</p>
            </div>
            <div className="p-2 rounded bg-muted/50 border border-border">
              <p className="text-[10px] text-muted-foreground">vs LinkedIn</p>
              <p className="text-sm font-bold text-emerald-600">{rd.adOpportunity.vsLinkedIn}</p>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground mb-1">AD FORMATS</p>
            <div className="flex flex-wrap gap-1">
              {rd.adOpportunity.adFormats.map((f, i) => (
                <Badge key={i} variant="secondary" className="text-[10px]">{f}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitor Reddit Presence */}
      <div>
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Shield className="w-4 h-4 text-orange-500" /> Competitor Reddit Presence</h3>
        <Card className="border border-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[10px]">Competitor</TableHead>
                    <TableHead className="text-[10px]">Organic Presence</TableHead>
                    <TableHead className="text-[10px]">Ad Activity</TableHead>
                    <TableHead className="text-[10px] hidden md:table-cell">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rd.competitorPresence.map((cp, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-xs font-medium">{cp.competitor}</TableCell>
                      <TableCell><Badge variant="outline" className="text-[9px] bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20">{cp.presence}</Badge></TableCell>
                      <TableCell><Badge variant="outline" className="text-[9px] bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20">{cp.adActivity}</Badge></TableCell>
                      <TableCell className="text-[11px] text-muted-foreground hidden md:table-cell">{cp.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <div className="mt-2 p-2 rounded bg-emerald-500/5 border border-emerald-500/20">
          <p className="text-[10px] font-semibold text-emerald-600">First-Mover Advantage</p>
          <p className="text-xs text-muted-foreground">Zero competitors are active on Reddit. RK can own these communities before anyone else in the 3PL/warehouse space invests.</p>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Tab 11: YouTube Strategy
// ──────────────────────────────────────────────────────

const qualityBadge: Record<string, string> = {
  High: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Medium: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Low: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
};

const categoryColor: Record<string, string> = {
  Facility: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Education: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Culture: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  Brand: "bg-primary/10 text-primary border-primary/20",
};

function YouTubeTab() {
  const [expandedChannel, setExpandedChannel] = useState<string | null>(null);
  const yt = marketingYouTubeData;

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <Card className="border border-red-500/30 bg-gradient-to-r from-red-500/5 to-transparent">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Play className="w-4 h-4 text-red-500" />
            <p className="text-sm font-bold">YouTube Strategy Overview</p>
            <Badge variant="outline" className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 text-[9px]">No Channel</Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-3">{yt.overview.summary}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-2 rounded bg-background border border-border">
              <p className="text-[10px] text-muted-foreground">RK Presence</p>
              <p className="text-sm font-bold text-red-500">{yt.overview.rkPresence}</p>
            </div>
            <div className="p-2 rounded bg-background border border-border">
              <p className="text-[10px] text-muted-foreground">Platform Users</p>
              <p className="text-sm font-bold">{yt.overview.platformUsers}</p>
            </div>
            <div className="p-2 rounded bg-background border border-border">
              <p className="text-[10px] text-muted-foreground">B2B Video Impact</p>
              <p className="text-sm font-bold text-primary">{yt.overview.b2bOpportunity}</p>
            </div>
            <div className="p-2 rounded bg-background border border-border">
              <p className="text-[10px] text-muted-foreground">Opportunity</p>
              <p className="text-sm font-bold text-primary">{yt.overview.opportunity}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitor Channels */}
      <div>
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Video className="w-4 h-4 text-red-500" /> Competitor YouTube Channels</h3>
        <div className="space-y-2">
          {yt.competitorChannels.map((ch) => {
            const isExpanded = expandedChannel === ch.name;
            return (
              <Card key={ch.name} className="border border-border">
                <CardContent className="p-3">
                  <button
                    className="flex items-center justify-between w-full text-left"
                    onClick={() => setExpandedChannel(isExpanded ? null : ch.name)}
                    data-testid={`yt-${ch.name.replace(/\s/g, "-").toLowerCase()}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold">{ch.name}</p>
                          <span className="text-[10px] text-muted-foreground tabular-nums">{ch.subscribers} subs</span>
                          <span className="text-[10px] text-muted-foreground tabular-nums">{ch.videos} videos</span>
                          <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${qualityBadge[ch.quality] || ""}`}>{ch.quality} quality</Badge>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{ch.frequency} · {ch.viewAvg} avg views</p>
                      </div>
                    </div>
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
                  </button>
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-border space-y-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <p className="text-[10px] font-semibold text-muted-foreground">TOP CONTENT</p>
                          <p className="text-xs">{ch.topContent}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-muted-foreground">STRATEGY</p>
                          <p className="text-xs">{ch.strategy}</p>
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

      {/* Subscriber Comparison Chart */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2"><BarChart3 className="w-4 h-4 text-red-500" /> Competitor Subscriber Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={yt.competitorChannels.map(c => ({ name: c.name, subscribers: parseFloat(c.subscribers.replace(/K/, "000").replace(/M/, "000000")) || parseInt(c.subscribers) }))} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)} />
              <Tooltip formatter={(v: number) => [v.toLocaleString(), "Subscribers"]} contentStyle={{ fontSize: 11, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Bar dataKey="subscribers" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2 p-2 rounded bg-red-500/5 border border-red-500/20">
            <p className="text-[10px] font-semibold text-red-600">RK Gap</p>
            <p className="text-xs text-muted-foreground">RK Logistics has 0 subscribers. Even Radiant (similar size) has 54. Minimum viable channel would surpass Radiant within 3 months of consistent posting.</p>
          </div>
        </CardContent>
      </Card>

      {/* RK Channel Plan */}
      <div>
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Radio className="w-4 h-4 text-red-500" /> Proposed RK Channel: Content Pillars</h3>
        <div className="mb-2 flex items-center gap-3">
          <p className="text-xs text-muted-foreground">Channel: <span className="font-semibold text-foreground">{yt.rkChannelPlan.channelName}</span></p>
          <p className="text-xs text-muted-foreground">Target: <span className="font-semibold text-foreground">{yt.rkChannelPlan.target}</span></p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {yt.rkChannelPlan.contentPillars.map((cp, i) => (
            <Card key={i} className="border border-border">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold">{cp.pillar}</p>
                  <div className="flex gap-1">
                    <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${priorityBadge[cp.effort] || "bg-blue-500/10 text-blue-600 border-blue-500/20"}`}>Effort: {cp.effort}</Badge>
                    <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${priorityBadge[cp.impact] || "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"}`}>Impact: {cp.impact}</Badge>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground mb-1">{cp.description}</p>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span>Format: {cp.format}</span>
                  <span>Freq: {cp.frequency}</span>
                </div>
                <p className="text-[10px] text-primary mt-1">Competitive edge: {cp.competitors}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* KPIs Table */}
      <div>
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Target className="w-4 h-4 text-red-500" /> YouTube KPI Targets</h3>
        <Card className="border border-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[10px]">Metric</TableHead>
                    <TableHead className="text-[10px]">Current</TableHead>
                    <TableHead className="text-[10px]">6-Month Target</TableHead>
                    <TableHead className="text-[10px]">12-Month Target</TableHead>
                    <TableHead className="text-[10px] hidden md:table-cell">Benchmark</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {yt.kpis.map((kpi, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-xs font-medium">{kpi.metric}</TableCell>
                      <TableCell className="text-xs tabular-nums text-red-500 font-semibold">{kpi.current}</TableCell>
                      <TableCell className="text-xs tabular-nums">{kpi.target6mo}</TableCell>
                      <TableCell className="text-xs tabular-nums font-semibold">{kpi.target12mo}</TableCell>
                      <TableCell className="text-[11px] text-muted-foreground hidden md:table-cell">{kpi.benchmark}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* YouTube Shorts Ideas */}
      <div>
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Zap className="w-4 h-4 text-red-500" /> YouTube Shorts Ideas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {yt.shorts.map((s, i) => (
            <Card key={i} className="border border-border">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${categoryColor[s.category] || "bg-gray-500/10 text-gray-600 border-gray-500/20"}`}>{s.category}</Badge>
                  <span className="text-[10px] text-muted-foreground tabular-nums">{s.views}</span>
                </div>
                <p className="text-xs font-bold mb-0.5">{s.title}</p>
                <p className="text-[11px] text-muted-foreground">{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Budget */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2"><DollarSign className="w-4 h-4 text-red-500" /> Budget Estimate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-2 rounded bg-muted/50 border border-border">
              <p className="text-[10px] text-muted-foreground">Setup (One-time)</p>
              <p className="text-sm font-bold">{yt.budget.setup}</p>
            </div>
            <div className="p-2 rounded bg-muted/50 border border-border">
              <p className="text-[10px] text-muted-foreground">Monthly Production</p>
              <p className="text-sm font-bold">{yt.budget.monthly}</p>
            </div>
            <div className="p-2 rounded bg-muted/50 border border-border">
              <p className="text-[10px] text-muted-foreground">Equipment</p>
              <p className="text-sm font-bold">{yt.budget.equipment}</p>
            </div>
            <div className="p-2 rounded bg-muted/50 border border-border">
              <p className="text-[10px] text-muted-foreground">YouTube Ads</p>
              <p className="text-sm font-bold">{yt.budget.ads}</p>
            </div>
            <div className="p-2 rounded bg-emerald-500/5 border border-emerald-500/20 md:col-span-2">
              <p className="text-[10px] text-emerald-600 font-semibold">ROI Outlook</p>
              <p className="text-xs text-muted-foreground">{yt.budget.roi}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Main Marketing Component
// ──────────────────────────────────────────────────────

export default function Marketing() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1 rounded-lg">
        <TabsTrigger value="overview" className="text-xs" data-testid="tab-overview">Overview</TabsTrigger>
        <TabsTrigger value="social" className="text-xs" data-testid="tab-social">Social Media</TabsTrigger>
        <TabsTrigger value="competitors" className="text-xs" data-testid="tab-competitors">Competitors</TabsTrigger>
        <TabsTrigger value="bd" className="text-xs" data-testid="tab-bd">BD Activity</TabsTrigger>
        <TabsTrigger value="actions" className="text-xs" data-testid="tab-actions">Action Items</TabsTrigger>
        <TabsTrigger value="map" className="text-xs" data-testid="tab-map">Facilities</TabsTrigger>
        <TabsTrigger value="news" className="text-xs" data-testid="tab-news">Customer News</TabsTrigger>
        <TabsTrigger value="ideas" className="text-xs" data-testid="tab-ideas">Ideas</TabsTrigger>
        <TabsTrigger value="emails" className="text-xs" data-testid="tab-emails">Sales Emails</TabsTrigger>
        <TabsTrigger value="reddit" className="text-xs" data-testid="tab-reddit">Reddit</TabsTrigger>
        <TabsTrigger value="youtube" className="text-xs" data-testid="tab-youtube">YouTube</TabsTrigger>
        <TabsTrigger value="content-engine" className="text-xs" data-testid="tab-content-engine">Content Engine</TabsTrigger>
        <TabsTrigger value="synthetic-audience" className="text-xs" data-testid="tab-synthetic-audience">Audience Testing</TabsTrigger>
        <TabsTrigger value="press-releases" className="text-xs" data-testid="tab-press-releases">Press Releases</TabsTrigger>
        <TabsTrigger value="competitor-posts" className="text-xs" data-testid="tab-competitor-posts">Top Posts</TabsTrigger>
        <TabsTrigger value="email-marketing" className="text-xs" data-testid="tab-email-marketing">Email Marketing</TabsTrigger>
      </TabsList>

      <TabsContent value="overview"><OverviewTab /></TabsContent>
      <TabsContent value="social"><SocialMediaTab /></TabsContent>
      <TabsContent value="competitors"><CompetitorIntelTab /></TabsContent>
      <TabsContent value="bd"><BDActivityTab /></TabsContent>
      <TabsContent value="actions"><VacanciesTab /></TabsContent>
      <TabsContent value="map"><FacilityMapTab /></TabsContent>
      <TabsContent value="news"><CustomerNewsTab /></TabsContent>
      <TabsContent value="ideas"><MarketingIdeasTab /></TabsContent>
      <TabsContent value="emails"><SalesEmailsTab /></TabsContent>
      <TabsContent value="reddit"><RedditTab /></TabsContent>
      <TabsContent value="youtube"><YouTubeTab /></TabsContent>
      <TabsContent value="content-engine"><ContentEngineTab /></TabsContent>
      <TabsContent value="synthetic-audience"><SyntheticAudienceTab /></TabsContent>
      <TabsContent value="press-releases"><PressReleasesTab /></TabsContent>
      <TabsContent value="competitor-posts"><CompetitorPostsTab /></TabsContent>
      <TabsContent value="email-marketing"><EmailMarketingTab /></TabsContent>
    </Tabs>
  );
}
