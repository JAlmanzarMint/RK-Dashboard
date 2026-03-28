import { useState, useEffect, useRef, useCallback } from "react";
import {
  Mic, MicOff, Square, Loader2, Sparkles, Copy, Check, Send,
  AlertTriangle, ChevronRight, Lightbulb, Code2, MessageSquare,
  ArrowRight, Clock, CheckCircle2, XCircle, RotateCcw,
  LayoutList, Inbox, User, Shield
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ── Types ───────────────────────────────────────────────
type IdeaStatus = "review" | "approved" | "dev" | "needs_feedback" | "completed" | "rejected";
type WorkflowStage = "idle" | "recording" | "transcribing" | "refining" | "done";
type ViewTab = "pipeline" | "devbucket";
type Role = "stakeholder" | "developer";

interface RefinedIdea {
  title: string;
  summary: string;
  problem: string;
  solution: string;
  impact: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  department: string;
  requirements: string[];
}

interface IdeaEntry {
  id: string;
  rawTranscript: string;
  refined: RefinedIdea | null;
  cursorPrompt: string | null;
  status: IdeaStatus;
  submittedBy: string;
  submittedByEmail: string;
  feedbackNote: string | null;
  ceoNotes: string;
  devNotes: string;
  createdAt: string;
  updatedAt: string;
}

// ── Constants ───────────────────────────────────────────
const DEV_EMAIL = "developer@rklogistics.com";
const USER_NAME = "Joe Maclean";
const USER_EMAIL = "joe@rklogistics.com";

const DEPARTMENTS = [
  "Sales", "Marketing", "Operations", "Compliance", "Engineering",
  "Strategy", "Warehouse", "QC", "Accounting", "Procurement", "Customer Service"
];

const STATUS_CONFIG: Record<IdeaStatus, { label: string; color: string; icon: typeof Clock }> = {
  review:          { label: "In Review",       color: "bg-blue-500/10 text-blue-600 border-blue-500/20",       icon: Clock },
  approved:        { label: "Approved",        color: "bg-green-500/10 text-green-600 border-green-500/20",    icon: CheckCircle2 },
  dev:             { label: "Dev Bucket",      color: "bg-purple-500/10 text-purple-600 border-purple-500/20", icon: Code2 },
  needs_feedback:  { label: "Needs Feedback",  color: "bg-amber-500/10 text-amber-600 border-amber-500/20",    icon: AlertTriangle },
  completed:       { label: "Completed",       color: "bg-teal-500/10 text-teal-600 border-teal-500/20",       icon: CheckCircle2 },
  rejected:        { label: "Rejected",        color: "bg-red-500/10 text-red-600 border-red-500/20",          icon: XCircle },
};

const PRIORITY_COLORS: Record<string, string> = {
  HIGH:   "bg-red-500/10 text-red-600 border-red-500/20",
  MEDIUM: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  LOW:    "bg-green-500/10 text-green-600 border-green-500/20",
};

// ── Workflow Steps ──────────────────────────────────────
const WORKFLOW_STEPS = [
  { key: "record",     label: "Record" },
  { key: "transcribe", label: "Transcribe" },
  { key: "refine",     label: "AI Refine" },
  { key: "approve",    label: "Approve" },
  { key: "dev",        label: "Dev Bucket" },
  { key: "prompt",     label: "Cursor Prompt" },
] as const;

function getActiveStep(stage: WorkflowStage): number {
  switch (stage) {
    case "idle": return -1;
    case "recording": return 0;
    case "transcribing": return 1;
    case "refining": return 2;
    case "done": return 3;
  }
}

// ── Component ───────────────────────────────────────────
export default function IdeasDashboard() {
  const [role, setRole] = useState<Role>("stakeholder");
  const [ideas, setIdeas] = useState<IdeaEntry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewTab, setViewTab] = useState<ViewTab>("pipeline");
  const [stage, setStage] = useState<WorkflowStage>("idle");
  const [generatingPrompt, setGeneratingPrompt] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const isDev = role === "developer";
  const userEmail = isDev ? DEV_EMAIL : USER_EMAIL;
  const userName = isDev ? "Developer" : USER_NAME;

  const selected = ideas.find((i) => i.id === selectedId) || null;

  // ── Fetch ideas on mount + polling ────────────────
  const fetchIdeas = useCallback(async () => {
    try {
      const res = await fetch("/api/ideas");
      if (res.ok) {
        const data = await res.json();
        setIdeas(data);
      }
    } catch { /* silent */ }
  }, []);

  useEffect(() => {
    fetchIdeas();
    const interval = setInterval(fetchIdeas, 10000);
    return () => clearInterval(interval);
  }, [fetchIdeas]);

  // ── Filter ideas by view ─────────────────────────
  const pipelineIdeas = ideas.filter((i) => ["review", "needs_feedback", "approved"].includes(i.status));
  const devBucketIdeas = ideas.filter((i) => ["dev", "completed"].includes(i.status));
  const visibleIdeas = viewTab === "pipeline" ? pipelineIdeas : devBucketIdeas;

  // ── Voice recording ──────────────────────────────
  const startRecording = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        await processAudio(blob);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setStage("recording");
    } catch (err: any) {
      setError("Microphone access denied. Please allow microphone permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setStage("transcribing");
    }
  };

  const processAudio = async (blob: Blob) => {
    try {
      // Step 1: Transcribe
      setStage("transcribing");
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");

      const transcribeRes = await fetch("/api/transcribe", { method: "POST", body: formData });
      if (!transcribeRes.ok) {
        const errText = await transcribeRes.text();
        let msg = "Transcription failed";
        try { msg = JSON.parse(errText).message || msg; } catch { msg = errText || msg; }
        throw new Error(msg);
      }
      const { transcript } = await transcribeRes.json();

      // Step 2: AI Refine
      setStage("refining");
      const generateRes = await fetch("/api/ideas/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });
      if (!generateRes.ok) {
        const errText = await generateRes.text();
        let msg = "AI refinement failed";
        try { msg = JSON.parse(errText).message || msg; } catch { msg = errText || msg; }
        throw new Error(msg);
      }
      const { refined } = await generateRes.json();

      // Step 3: Create idea
      const createRes = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawTranscript: transcript,
          refined,
          submittedBy: userName,
          submittedByEmail: userEmail,
          status: "review",
        }),
      });
      if (!createRes.ok) throw new Error("Failed to save idea");

      const newIdea = await createRes.json();
      setIdeas((prev) => [newIdea, ...prev]);
      setSelectedId(newIdea.id);
      setViewTab("pipeline");
      setStage("done");
      setTimeout(() => setStage("idle"), 3000);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setStage("idle");
    }
  };

  // ── Idea actions ──────────────────────────────────
  const updateIdea = async (id: string, updates: Partial<IdeaEntry>) => {
    try {
      const res = await fetch(`/api/ideas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setIdeas((prev) => prev.map((i) => (i.id === id ? updated : i)));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const approveToDevBucket = (id: string) => updateIdea(id, { status: "dev" });

  const sendBack = async (id: string) => {
    if (!feedbackText.trim()) return;
    await updateIdea(id, { status: "needs_feedback", feedbackNote: feedbackText, cursorPrompt: null });
    setFeedbackOpen(false);
    setFeedbackText("");
    setViewTab("pipeline");
  };

  const resubmit = (id: string) => updateIdea(id, { status: "review", feedbackNote: null });

  const generateCursorPrompt = async (idea: IdeaEntry) => {
    if (!idea.refined) return;
    setGeneratingPrompt(true);
    try {
      const res = await fetch("/api/ideas/cursor-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: idea.refined }),
      });
      if (!res.ok) throw new Error("Prompt generation failed");
      const { cursorPrompt } = await res.json();
      await updateIdea(idea.id, { cursorPrompt });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setGeneratingPrompt(false);
    }
  };

  const copyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Render ────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Header with role toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Idea Pipeline</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Speak your ideas, let AI refine them, approve to the dev bucket, generate implementation prompts.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
          <button
            onClick={() => setRole("stakeholder")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              role === "stakeholder" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Stakeholder
          </button>
          <button
            onClick={() => setRole("developer")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              role === "developer" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Developer
          </button>
        </div>
      </div>

      {/* ── Voice Recorder Card ───────────────────── */}
      <Card>
        <CardContent className="py-6">
          <div className="flex flex-col items-center gap-5">
            {/* Mic button */}
            <div className="relative">
              {stage === "recording" && (
                <>
                  <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" style={{ animationDuration: "1.5s" }} />
                  <div className="absolute -inset-2 rounded-full border-2 border-red-500/30 animate-pulse" />
                </>
              )}
              {stage === "idle" || stage === "done" ? (
                <button
                  onClick={startRecording}
                  className="relative w-20 h-20 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  <Mic className="w-8 h-8 text-primary-foreground" />
                </button>
              ) : stage === "recording" ? (
                <button
                  onClick={stopRecording}
                  className="relative w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all shadow-lg z-10"
                >
                  <Square className="w-6 h-6 text-white" />
                </button>
              ) : (
                <div className="relative w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              )}
            </div>

            {/* Stage label */}
            <div className="text-center">
              {stage === "idle" && (
                <p className="text-sm text-muted-foreground">
                  Tap to record your idea. Mention the <strong>department</strong>, <strong>feature</strong>, and <strong>data source</strong>.
                </p>
              )}
              {stage === "recording" && (
                <p className="text-sm text-red-500 font-medium animate-pulse">
                  Recording... tap the square to stop
                </p>
              )}
              {stage === "transcribing" && (
                <p className="text-sm text-primary font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Transcribing with Whisper...
                </p>
              )}
              {stage === "refining" && (
                <p className="text-sm text-primary font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Refining idea with AI...
                </p>
              )}
              {stage === "done" && (
                <p className="text-sm text-green-600 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Idea created and ready for review!
                </p>
              )}
            </div>

            {/* Workflow steps */}
            <div className="flex items-center gap-1">
              {WORKFLOW_STEPS.map((step, i) => {
                const active = getActiveStep(stage);
                const isComplete = active >= i;
                const isCurrent = active === i;
                return (
                  <div key={step.key} className="flex items-center gap-1">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium transition-colors ${
                      isCurrent
                        ? "bg-primary text-primary-foreground"
                        : isComplete
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {step.label}
                    </div>
                    {i < WORKFLOW_STEPS.length - 1 && (
                      <ArrowRight className={`w-3 h-3 ${isComplete ? "text-primary" : "text-muted-foreground/40"}`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Department hints */}
            <div className="flex flex-wrap justify-center gap-1.5 max-w-xl">
              {DEPARTMENTS.map((d) => (
                <span key={d} className="px-2 py-0.5 rounded-full text-[10px] bg-muted text-muted-foreground font-medium">
                  {d}
                </span>
              ))}
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-500/10 px-4 py-2 rounded-lg">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {error}
                <button onClick={() => setError(null)} className="ml-2 underline text-xs">dismiss</button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── Main content: list + detail ───────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Left: Ideas List ─────────────────────── */}
        <div className="lg:col-span-1 space-y-3">
          {/* Tab toggle */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewTab("pipeline")}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                viewTab === "pipeline" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              Pipeline
              {pipelineIdeas.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-blue-500/10 text-blue-600 font-bold">
                  {pipelineIdeas.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setViewTab("devbucket")}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                viewTab === "devbucket" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              Dev Bucket
              {devBucketIdeas.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-purple-500/10 text-purple-600 font-bold">
                  {devBucketIdeas.length}
                </span>
              )}
            </button>
          </div>

          {/* Idea cards */}
          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
            {visibleIdeas.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Lightbulb className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No ideas in {viewTab === "pipeline" ? "pipeline" : "dev bucket"} yet.</p>
                <p className="text-xs mt-1">Record your first idea using the mic above.</p>
              </div>
            )}
            {visibleIdeas.map((idea) => {
              const sc = STATUS_CONFIG[idea.status];
              const isSelected = selectedId === idea.id;
              const needsAction = idea.status === "needs_feedback" && idea.submittedByEmail === userEmail;
              return (
                <button
                  key={idea.id}
                  onClick={() => setSelectedId(idea.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/30 bg-card"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{idea.refined?.title || "Untitled Idea"}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {idea.refined?.summary || idea.rawTranscript.slice(0, 100)}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 mt-0.5 transition-transform ${isSelected ? "rotate-90 text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className={`text-[10px] ${sc.color}`}>{sc.label}</Badge>
                    {idea.refined?.priority && (
                      <Badge variant="outline" className={`text-[10px] ${PRIORITY_COLORS[idea.refined.priority] || ""}`}>
                        {idea.refined.priority}
                      </Badge>
                    )}
                    {idea.refined?.department && (
                      <span className="text-[10px] text-muted-foreground">{idea.refined.department}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-muted-foreground">{idea.submittedBy}</span>
                    {needsAction && (
                      <span className="text-[10px] font-medium text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded">
                        Action needed
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Right: Detail Panel ──────────────────── */}
        <div className="lg:col-span-2">
          {!selected ? (
            <Card>
              <CardContent className="py-16 text-center text-muted-foreground">
                <Lightbulb className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">Select an idea to view details</p>
                <p className="text-xs mt-1">Or record a new idea using the microphone above</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-lg">{selected.refined?.title || "Untitled Idea"}</CardTitle>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge variant="outline" className={`${STATUS_CONFIG[selected.status].color}`}>
                        {STATUS_CONFIG[selected.status].label}
                      </Badge>
                      {selected.refined?.priority && (
                        <Badge variant="outline" className={PRIORITY_COLORS[selected.refined.priority] || ""}>
                          {selected.refined.priority} Priority
                        </Badge>
                      )}
                      {selected.refined?.department && (
                        <Badge variant="outline">{selected.refined.department}</Badge>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    by {selected.submittedBy} · {new Date(selected.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-5">
                {/* Feedback banner */}
                {selected.status === "needs_feedback" && selected.feedbackNote && (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Feedback from Developer — action required</p>
                      <p className="text-sm mt-1 text-amber-600 dark:text-amber-300">{selected.feedbackNote}</p>
                    </div>
                  </div>
                )}

                {/* Voice transcript */}
                {selected.rawTranscript && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Voice Transcript</h4>
                    <p className="text-sm italic text-muted-foreground bg-muted/50 p-3 rounded-lg">
                      "{selected.rawTranscript}"
                    </p>
                  </div>
                )}

                {/* Refined idea details */}
                {selected.refined && (
                  <>
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Summary</h4>
                      <p className="text-sm">{selected.refined.summary}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Problem</h4>
                        <p className="text-sm">{selected.refined.problem}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Impact</h4>
                        <p className="text-sm">{selected.refined.impact}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Proposed Solution</h4>
                      <p className="text-sm whitespace-pre-wrap">{selected.refined.solution}</p>
                    </div>

                    {selected.refined.requirements?.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Requirements</h4>
                        <ul className="space-y-1">
                          {selected.refined.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}

                {/* Cursor prompt (dev-only) */}
                {isDev && selected.cursorPrompt && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cursor Prompt</h4>
                      <button
                        onClick={() => copyPrompt(selected.cursorPrompt!)}
                        className="flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copied!" : "Copy to clipboard"}
                      </button>
                    </div>
                    <pre className="text-xs bg-zinc-900 text-zinc-100 p-4 rounded-lg overflow-x-auto max-h-80 overflow-y-auto whitespace-pre-wrap font-mono">
                      {selected.cursorPrompt}
                    </pre>
                  </div>
                )}

                {/* Dev feedback textarea */}
                {isDev && feedbackOpen && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Feedback to {selected.submittedBy}</h4>
                    <textarea
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Explain what needs clarification or additional detail..."
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => sendBack(selected.id)}
                        disabled={!feedbackText.trim()}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Send Feedback
                      </button>
                      <button
                        onClick={() => { setFeedbackOpen(false); setFeedbackText(""); }}
                        className="px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-border">
                  {/* STAKEHOLDER actions */}
                  {!isDev && (
                    <>
                      {selected.status === "review" && (
                        <button
                          onClick={() => approveToDevBucket(selected.id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Approve & Send to Dev Bucket
                        </button>
                      )}
                      {selected.status === "needs_feedback" && selected.submittedByEmail === userEmail && (
                        <button
                          onClick={() => resubmit(selected.id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Resubmit for Review
                        </button>
                      )}
                      {selected.status === "dev" && (
                        <p className="text-sm text-muted-foreground italic">
                          In Dev Bucket — waiting for developer review
                        </p>
                      )}
                    </>
                  )}

                  {/* DEVELOPER actions */}
                  {isDev && (
                    <>
                      {selected.status === "review" && (
                        <button
                          onClick={() => approveToDevBucket(selected.id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Approve to Dev Bucket
                        </button>
                      )}
                      {selected.status === "dev" && !selected.cursorPrompt && !generatingPrompt && (
                        <button
                          onClick={() => generateCursorPrompt(selected)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                          <Code2 className="w-4 h-4" />
                          Generate Cursor Prompt
                        </button>
                      )}
                      {generatingPrompt && (
                        <div className="flex items-center gap-2 text-sm text-primary">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Generating Cursor prompt...
                        </div>
                      )}
                      {selected.status === "dev" && selected.cursorPrompt && (
                        <p className="text-sm text-muted-foreground italic flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          Cursor prompt ready — copy it above
                        </p>
                      )}
                      {["review", "dev"].includes(selected.status) && !feedbackOpen && (
                        <button
                          onClick={() => setFeedbackOpen(true)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Send Back to {selected.submittedBy}
                        </button>
                      )}
                      {selected.status === "dev" && (
                        <button
                          onClick={() => updateIdea(selected.id, { status: "completed" })}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium border border-border hover:bg-muted transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Mark Complete
                        </button>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
