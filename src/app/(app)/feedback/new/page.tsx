"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, Button, SentimentPill, PriorityPill } from "@/components/ui";
import { Sparkles, Loader2 } from "lucide-react";
import { Classification } from "@/lib/ai";

export default function AddFeedbackPage() {
  const [text, setText] = useState("");
  const [customer, setCustomer] = useState("");
  const [company, setCompany] = useState("");
  const [source, setSource] = useState("MANUAL");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Classification | null>(null);
  const [error, setError] = useState("");

  async function handleClassify() {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Classification failed");
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="AI classification"
        title="Add Feedback"
        description="Paste in raw feedback — LOOP classifies sentiment, priority, and theme automatically."
      />

      <div className="p-8 grid grid-cols-2 gap-6 max-w-5xl">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono-data uppercase text-muted">Feedback text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
                placeholder="e.g. The export feature keeps timing out on large reports..."
                className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-border text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-signal/30 focus:border-signal resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-mono-data uppercase text-muted">Customer</label>
                <input
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="Jane Doe"
                  className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-border text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-signal/30"
                />
              </div>
              <div>
                <label className="text-xs font-mono-data uppercase text-muted">Company</label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Inc."
                  className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-border text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-signal/30"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-mono-data uppercase text-muted">Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-border text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-signal/30"
              >
                {["MANUAL", "EMAIL", "SURVEY", "APP_REVIEW", "SUPPORT_TICKET", "SALES_CALL"].map((s) => (
                  <option key={s} value={s}>
                    {s.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
            <Button onClick={handleClassify} disabled={loading || !text.trim()} className="w-full">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              {loading ? "Classifying..." : "Classify with AI"}
            </Button>
            {error && <p className="text-sm text-negative">{error}</p>}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-display text-lg mb-4">AI classification result</h2>
          {!result && !loading && (
            <p className="text-sm text-muted">
              Submit feedback on the left to see LOOP classify sentiment, priority, and theme in real
              time — this calls a live Claude API route with a Zod-validated response and a rule-based
              fallback if no API key is configured.
            </p>
          )}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted">
              <Loader2 size={16} className="animate-spin" /> Analyzing feedback...
            </div>
          )}
          {result && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <SentimentPill sentiment={result.sentiment} />
                <PriorityPill priority={result.priority} />
              </div>
              <div>
                <p className="text-xs font-mono-data uppercase text-muted mb-1">Theme</p>
                <p className="text-sm font-medium">
                  {result.themeName}
                  {result.themeIsNew && (
                    <span className="ml-2 text-xs text-signal font-mono-data">new theme suggested</span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs font-mono-data uppercase text-muted mb-1">Reasoning</p>
                <p className="text-sm text-ink-soft">{result.reasoning}</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
