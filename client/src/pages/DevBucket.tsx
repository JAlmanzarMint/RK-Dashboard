import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase, CheckCircle2, Clock, DollarSign,
  MessageSquare, Play, Check, ArrowLeft, Sparkles, ChevronDown,
  ChevronRight, Quote, Loader2, RefreshCw, Inbox,
} from "lucide-react";

interface Idea {
  id: string;
  rawTranscript: string;
  optimizedTitle: string;
  optimizedDescription: string;
  category: string;
  impactEstimate: string;
  aiSuggestions: string[];
  ceoNotes: string;
  status: "draft" | "approved" | "in-progress" | "completed" | "rejected";
  devNotes: string;
  createdAt: string;
  updatedAt: string;
}

type FilterTab = "all" | "approved" | "in-progress" | "completed" | "rejected";

const STATUS_BADGE: Record<Idea["status"], string> = {
  draft: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  approved: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 animate-pulse",
  "in-progress": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  rejected: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

const STATUS_LABEL: Record<Idea["status"], string> = {
  draft: "Draft",
  approved: "Approved",
  "in-progress": "In Progress",
  completed: "Completed",
  rejected: "Rejected",
};

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "approved", label: "Approved" },
  { key: "in-progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  { key: "rejected", label: "Rejected" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit",
  });
}

export default function DevBucket() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterTab>("all");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [devNotes, setDevNotes] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Set<string>>(new Set());

  const fetchIdeas = useCallback(async () => {
    try {
      const res = await fetch("/api/ideas");
      if (res.ok) {
        const data: Idea[] = await res.json();
        setIdeas(data);
        setDevNotes((prev) => {
          const next = { ...prev };
          data.forEach((idea) => {
            if (!(idea.id in next)) next[idea.id] = idea.devNotes || "";
          });
          return next;
        });
      }
    } catch {
      // silently retry on next poll
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIdeas();
    const interval = setInterval(fetchIdeas, 30_000);
    return () => clearInterval(interval);
  }, [fetchIdeas]);

  const patchIdea = async (id: string, body: Partial<Pick<Idea, "status" | "devNotes">>) => {
    setSaving((s) => new Set(s).add(id));
    try {
      const res = await fetch(`/api/ideas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const updated: Idea = await res.json();
        setIdeas((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
        setDevNotes((prev) => ({ ...prev, [updated.id]: updated.devNotes }));
      }
    } finally {
      setSaving((s) => {
        const next = new Set(s);
        next.delete(id);
        return next;
      });
    }
  };

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const filtered = filter === "all" ? ideas : ideas.filter((i) => i.status === filter);

  const counts = {
    total: ideas.length,
    approved: ideas.filter((i) => i.status === "approved").length,
    inProgress: ideas.filter((i) => i.status === "in-progress").length,
    completed: ideas.filter((i) => i.status === "completed").length,
  };

  const kpis = [
    { label: "Total Ideas", value: counts.total, icon: Briefcase, color: "text-teal-600 dark:text-teal-400", bg: "bg-teal-50 dark:bg-teal-900/20" },
    { label: "Approved", value: counts.approved, icon: CheckCircle2, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20" },
    { label: "In Progress", value: counts.inProgress, icon: Clock, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { label: "Completed", value: counts.completed, icon: Check, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dev Bucket</h1>
          <p className="text-sm text-muted-foreground">Ideas approved by leadership, ready for the dev team</p>
        </div>
        <button
          onClick={() => { setLoading(true); fetchIdeas(); }}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-teal-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-2.5 rounded-lg ${kpi.bg}`}>
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 p-1 bg-muted/50 rounded-lg w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              filter === tab.key
                ? "bg-teal-600 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Empty States */}
      {ideas.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-12 flex flex-col items-center text-center gap-3">
            <Inbox className="w-10 h-10 text-muted-foreground/50" />
            <p className="text-muted-foreground">No ideas from leadership yet. They'll appear here when approved.</p>
          </CardContent>
        </Card>
      )}

      {ideas.length > 0 && filtered.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-12 flex flex-col items-center text-center gap-3">
            <Inbox className="w-10 h-10 text-muted-foreground/50" />
            <p className="text-muted-foreground">No ideas in this category yet</p>
          </CardContent>
        </Card>
      )}

      {/* Idea Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((idea) => {
          const isExpanded = expanded.has(idea.id);
          const isSaving = saving.has(idea.id);
          const notes = devNotes[idea.id] ?? "";

          return (
            <Card key={idea.id} className="flex flex-col">
              {/* Header */}
              <CardHeader
                className="p-4 cursor-pointer select-none"
                onClick={() => toggle(idea.id)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {isExpanded
                      ? <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground" />
                      : <ChevronRight className="w-4 h-4 shrink-0 text-muted-foreground" />
                    }
                    <CardTitle className="text-sm font-bold truncate">{idea.optimizedTitle}</CardTitle>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Badge variant="secondary" className="text-[11px]">{idea.category}</Badge>
                    <Badge className={`text-[11px] border-0 ${STATUS_BADGE[idea.status]}`}>
                      {STATUS_LABEL[idea.status]}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              {/* Body */}
              <CardContent className="px-4 pb-2 space-y-3 flex-1">
                {/* Impact */}
                <div className="flex items-center gap-1.5 text-sm">
                  <DollarSign className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span className="font-medium">Impact:</span>
                  <span className="text-muted-foreground">{idea.impactEstimate}</span>
                </div>

                {/* Description */}
                <p className={`text-sm text-muted-foreground ${!isExpanded ? "line-clamp-3" : ""}`}>
                  {idea.optimizedDescription}
                </p>

                {isExpanded && (
                  <>
                    {/* AI Suggestions */}
                    {idea.aiSuggestions.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-sm font-medium">
                          <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                          AI Suggestions
                        </div>
                        <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-0.5 pl-1">
                          {idea.aiSuggestions.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* CEO Notes */}
                    {idea.ceoNotes && (
                      <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-3 space-y-1">
                        <div className="flex items-center gap-1.5 text-sm font-medium text-teal-700 dark:text-teal-300">
                          <Quote className="w-4 h-4" />
                          CEO Notes
                        </div>
                        <p className="text-sm italic text-teal-800 dark:text-teal-200">{idea.ceoNotes}</p>
                      </div>
                    )}

                    {/* Timestamps */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span>Created: {formatDate(idea.createdAt)}</span>
                      <span>Updated: {formatDate(idea.updatedAt)}</span>
                    </div>
                  </>
                )}
              </CardContent>

              {/* Footer — visible only when expanded */}
              {isExpanded && (
                <CardFooter className="p-4 pt-2 flex flex-col gap-3 border-t">
                  {/* Dev Notes textarea */}
                  <div className="w-full space-y-1.5">
                    <label className="flex items-center gap-1.5 text-sm font-medium">
                      <MessageSquare className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                      Dev Notes
                    </label>
                    <textarea
                      rows={3}
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/40 resize-y"
                      placeholder="Add development notes..."
                      value={notes}
                      onChange={(e) => setDevNotes((p) => ({ ...p, [idea.id]: e.target.value }))}
                    />
                    <button
                      disabled={isSaving}
                      onClick={() => patchIdea(idea.id, { devNotes: notes })}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50 transition-colors"
                    >
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                      Save Notes
                    </button>
                  </div>

                  {/* Status change actions */}
                  <div className="flex flex-wrap gap-2 w-full">
                    {idea.status === "approved" && (
                      <button
                        disabled={isSaving}
                        onClick={() => patchIdea(idea.id, { status: "in-progress", devNotes: notes })}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
                      >
                        <Play className="w-3.5 h-3.5" /> Start Work
                      </button>
                    )}

                    {idea.status === "in-progress" && (
                      <button
                        disabled={isSaving}
                        onClick={() => patchIdea(idea.id, { status: "completed", devNotes: notes })}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mark Complete
                      </button>
                    )}

                    <button
                      disabled={isSaving || !notes.trim()}
                      onClick={() => patchIdea(idea.id, { status: "rejected", devNotes: notes })}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Send Back
                    </button>
                  </div>
                </CardFooter>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
