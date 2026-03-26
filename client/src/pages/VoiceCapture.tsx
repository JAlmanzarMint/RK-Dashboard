import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mic,
  MicOff,
  Square,
  Send,
  Save,
  Trash2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Loader2,
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

type RecordingState = "idle" | "recording" | "processing";

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  draft: { bg: "bg-gray-500/10", text: "text-gray-600 dark:text-gray-400" },
  approved: { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400" },
  "in-progress": { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400" },
  completed: { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400" },
  rejected: { bg: "bg-red-500/10", text: "text-red-600 dark:text-red-400" },
};

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function WaveformBars() {
  return (
    <div className="flex items-center justify-center gap-0.5 h-8">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="w-1 bg-red-500 rounded-full"
          style={{
            animation: `waveform 0.8s ease-in-out ${i * 0.05}s infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes waveform {
          0% { height: 4px; }
          100% { height: 28px; }
        }
      `}</style>
    </div>
  );
}

export default function VoiceCapture() {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [rawTranscript, setRawTranscript] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedTitle, setOptimizedTitle] = useState("");
  const [optimizedDescription, setOptimizedDescription] = useState("");
  const [category, setCategory] = useState("");
  const [impactEstimate, setImpactEstimate] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [ceoNotes, setCeoNotes] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const hasOptimizedResult = optimizedTitle.length > 0;

  const fetchIdeas = useCallback(async () => {
    try {
      const res = await fetch("/api/ideas");
      if (res.ok) {
        const data = await res.json();
        setIdeas(data);
      }
    } catch {
      // silent
    }
  }, []);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  useEffect(() => {
    if (successMsg) {
      const t = setTimeout(() => setSuccessMsg(""), 4000);
      return () => clearTimeout(t);
    }
  }, [successMsg]);

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(""), 6000);
      return () => clearTimeout(t);
    }
  }, [error]);

  const clearForm = () => {
    setRawTranscript("");
    setOptimizedTitle("");
    setOptimizedDescription("");
    setCategory("");
    setImpactEstimate("");
    setAiSuggestions([]);
    setCeoNotes("");
    setError("");
    setIsOptimizing(false);
    setRecordingState("idle");
  };

  const startRecording = async () => {
    try {
      setError("");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
      setRecordingState("recording");
    } catch (err: any) {
      setError("Microphone access denied. Please allow microphone permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      setRecordingState("processing");
    }
  };

  const processAudio = async (blob: Blob) => {
    try {
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");

      const transcribeRes = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!transcribeRes.ok) {
        const errText = await transcribeRes.text();
        let msg = "Transcription failed";
        try { msg = JSON.parse(errText).message || msg; } catch { msg = errText || msg; }
        throw new Error(msg);
      }

      const { text } = await transcribeRes.json();
      setRawTranscript(text);
      setRecordingState("idle");

      setIsOptimizing(true);
      const optimizeRes = await fetch("/api/optimize-idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: text }),
      });

      if (!optimizeRes.ok) {
        const errText = await optimizeRes.text();
        let msg = "Optimization failed";
        try { msg = JSON.parse(errText).message || msg; } catch { msg = errText || msg; }
        throw new Error(msg);
      }

      const result = await optimizeRes.json();
      setOptimizedTitle(result.title || "");
      setOptimizedDescription(result.description || "");
      setCategory(result.category || "");
      setImpactEstimate(result.impactEstimate || "");
      setAiSuggestions(result.suggestions || []);
      setIsOptimizing(false);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setRecordingState("idle");
      setIsOptimizing(false);
    }
  };

  const saveIdea = async (approve: boolean) => {
    setIsSaving(true);
    setError("");
    try {
      const createRes = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawTranscript,
          optimizedTitle,
          optimizedDescription,
          category,
          impactEstimate,
          aiSuggestions,
          ceoNotes,
        }),
      });

      if (!createRes.ok) {
        const err = await createRes.json();
        throw new Error(err.message || "Failed to save idea");
      }

      const created: Idea = await createRes.json();

      if (approve) {
        const patchRes = await fetch(`/api/ideas/${created.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "approved" }),
        });
        if (!patchRes.ok) throw new Error("Failed to approve idea");
        setSuccessMsg("Idea sent to dev team!");
      } else {
        setSuccessMsg("Draft saved!");
      }

      clearForm();
      await fetchIdeas();
    } catch (err: any) {
      setError(err.message || "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  const patchIdeaStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/ideas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) await fetchIdeas();
    } catch {
      // silent
    }
  };

  const micButtonClasses =
    recordingState === "idle"
      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
      : recordingState === "recording"
        ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
        : "bg-amber-500 text-white";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Mic className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Voice to Idea</h1>
          <p className="text-xs text-muted-foreground">Record ideas, let AI optimize them, send to dev</p>
        </div>
      </div>

      {/* Toast messages */}
      {successMsg && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {successMsg}
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* LEFT: Recording & Optimization — 3 cols */}
        <div className="lg:col-span-3 space-y-4">
          {/* Recording Card */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Mic className="w-4 h-4 text-primary" />
                Voice Recording
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Mic Button */}
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={recordingState === "recording" ? stopRecording : recordingState === "idle" ? startRecording : undefined}
                  disabled={recordingState === "processing"}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${micButtonClasses} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {recordingState === "idle" && <Mic className="w-7 h-7" />}
                  {recordingState === "recording" && <Square className="w-6 h-6" />}
                  {recordingState === "processing" && <Loader2 className="w-7 h-7 animate-spin" />}
                </button>
                <p className="text-xs text-muted-foreground">
                  {recordingState === "idle" && "Click to start recording"}
                  {recordingState === "recording" && "Recording... click to stop"}
                  {recordingState === "processing" && "Processing audio..."}
                </p>
              </div>

              {/* Waveform */}
              {recordingState === "recording" && <WaveformBars />}

              {/* Raw Transcript */}
              {rawTranscript && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Raw Transcript</label>
                  <Textarea
                    value={rawTranscript}
                    readOnly
                    className="text-sm bg-muted/50 resize-none"
                    rows={4}
                  />
                </div>
              )}

              {/* Optimizing indicator */}
              {isOptimizing && (
                <div className="flex items-center justify-center gap-2 py-4 text-sm text-primary">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span>AI is optimizing your idea...</span>
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Optimized Result Card */}
          {hasOptimizedResult && !isOptimizing && (
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  AI-Optimized Idea
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Title</label>
                  <Input
                    value={optimizedTitle}
                    onChange={(e) => setOptimizedTitle(e.target.value)}
                    className="text-sm font-semibold"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Description</label>
                  <Textarea
                    value={optimizedDescription}
                    onChange={(e) => setOptimizedDescription(e.target.value)}
                    className="text-sm"
                    rows={5}
                  />
                </div>

                {/* Category & Impact */}
                <div className="flex flex-wrap gap-2">
                  {category && (
                    <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-0">
                      {category}
                    </Badge>
                  )}
                  {impactEstimate && (
                    <Badge variant="secondary" className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0">
                      {impactEstimate}
                    </Badge>
                  )}
                </div>

                {/* AI Suggestions */}
                {aiSuggestions.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">AI Suggestions</label>
                    <div className="space-y-1.5">
                      {aiSuggestions.map((s, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                            {i + 1}
                          </span>
                          <span className="leading-relaxed">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CEO Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">CEO Notes</label>
                  <Textarea
                    value={ceoNotes}
                    onChange={(e) => setCeoNotes(e.target.value)}
                    placeholder="Add your notes here..."
                    className="text-sm"
                    rows={3}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button
                    onClick={() => saveIdea(true)}
                    disabled={isSaving}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700"
                    size="sm"
                  >
                    {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    Approve & Send to Dev
                  </Button>
                  <Button
                    onClick={() => saveIdea(false)}
                    disabled={isSaving}
                    variant="secondary"
                    size="sm"
                  >
                    {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    Save as Draft
                  </Button>
                  <Button
                    onClick={clearForm}
                    disabled={isSaving}
                    variant="outline"
                    size="sm"
                    className="text-red-600 dark:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Discard
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* RIGHT: Recent Ideas — 2 cols */}
        <div className="lg:col-span-2">
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  My Ideas
                </span>
                <Badge variant="secondary" className="text-[10px] border-0">
                  {ideas.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {ideas.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-8">
                    No ideas yet. Record your first idea above!
                  </p>
                )}
                {ideas.map((idea) => {
                  const isExpanded = expandedId === idea.id;
                  const statusStyle = STATUS_STYLES[idea.status] || STATUS_STYLES.draft;

                  return (
                    <div
                      key={idea.id}
                      className="rounded-lg border border-border p-3 transition-colors hover:bg-muted/30"
                    >
                      {/* Collapsed header */}
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : idea.id)}
                        className="w-full text-left"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              {isExpanded ? (
                                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                              )}
                              <p className="text-sm font-semibold truncate">{idea.optimizedTitle}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5 mt-1.5 ml-5">
                              <Badge variant="secondary" className={`text-[10px] border-0 ${statusStyle.bg} ${statusStyle.text}`}>
                                {idea.status}
                              </Badge>
                              {idea.category && (
                                <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-0">
                                  {idea.category}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {timeAgo(idea.createdAt)}
                            </span>
                            {idea.devNotes && (
                              <span className="text-[10px] text-blue-600 dark:text-blue-400 flex items-center gap-1">
                                <MessageSquare className="w-3 h-3" />
                                Dev responded
                              </span>
                            )}
                          </div>
                        </div>
                        {!isExpanded && idea.impactEstimate && (
                          <p className="text-[10px] text-muted-foreground mt-1 ml-5 truncate">
                            Impact: {idea.impactEstimate}
                          </p>
                        )}
                      </button>

                      {/* Expanded details */}
                      {isExpanded && (
                        <div className="mt-3 ml-5 space-y-3 border-t border-border pt-3">
                          {idea.impactEstimate && (
                            <div>
                              <p className="text-[10px] font-medium text-muted-foreground mb-1">Impact</p>
                              <Badge variant="secondary" className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0">
                                {idea.impactEstimate}
                              </Badge>
                            </div>
                          )}
                          <div>
                            <p className="text-[10px] font-medium text-muted-foreground mb-1">Description</p>
                            <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                              {idea.optimizedDescription}
                            </p>
                          </div>
                          {idea.ceoNotes && (
                            <div>
                              <p className="text-[10px] font-medium text-muted-foreground mb-1">CEO Notes</p>
                              <p className="text-xs text-foreground leading-relaxed">{idea.ceoNotes}</p>
                            </div>
                          )}
                          {idea.devNotes && (
                            <div>
                              <p className="text-[10px] font-medium text-muted-foreground mb-1 flex items-center gap-1">
                                <MessageSquare className="w-3 h-3" />
                                Dev Notes
                              </p>
                              <p className="text-xs text-foreground leading-relaxed">{idea.devNotes}</p>
                            </div>
                          )}
                          {idea.aiSuggestions?.length > 0 && (
                            <div>
                              <p className="text-[10px] font-medium text-muted-foreground mb-1">AI Suggestions</p>
                              <div className="space-y-1">
                                {idea.aiSuggestions.map((s, i) => (
                                  <div key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                                    <span className="text-[10px] font-bold text-primary shrink-0">{i + 1}.</span>
                                    <span>{s}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Quick action buttons */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {idea.status === "draft" && (
                              <Button
                                size="sm"
                                className="h-7 text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700"
                                onClick={() => patchIdeaStatus(idea.id, "approved")}
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                Approve
                              </Button>
                            )}
                            {(idea.status === "draft" || idea.status === "approved") && (
                              <Button
                                size="sm"
                                variant="secondary"
                                className="h-7 text-[10px]"
                                onClick={() => patchIdeaStatus(idea.id, "in-progress")}
                              >
                                <Clock className="w-3 h-3" />
                                In Progress
                              </Button>
                            )}
                            {idea.status === "in-progress" && (
                              <Button
                                size="sm"
                                className="h-7 text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700"
                                onClick={() => patchIdeaStatus(idea.id, "completed")}
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
