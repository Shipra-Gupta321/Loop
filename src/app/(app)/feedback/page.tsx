"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, SentimentPill, PriorityPill, ThemeTag, Button } from "@/components/ui";
import { feedback, themes } from "@/lib/mock-data";
import { Sentiment } from "@/lib/types";
import Link from "next/link";
import { PlusCircle, Search } from "lucide-react";

const sentiments: (Sentiment | "ALL")[] = ["ALL", "POSITIVE", "NEUTRAL", "NEGATIVE"];

export default function FeedbackInboxPage() {
  const [query, setQuery] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState<Sentiment | "ALL">("ALL");
  const [themeFilter, setThemeFilter] = useState<string>("ALL");

  const filtered = useMemo(() => {
    return feedback.filter((f) => {
      if (sentimentFilter !== "ALL" && f.sentiment !== sentimentFilter) return false;
      if (themeFilter !== "ALL" && !f.themeIds.includes(themeFilter)) return false;
      if (query && !f.text.toLowerCase().includes(query.toLowerCase()) && !f.customer.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, sentimentFilter, themeFilter]);

  return (
    <div>
      <PageHeader
        eyebrow={`${filtered.length} of ${feedback.length} items`}
        title="Feedback Inbox"
        description="Every piece of customer feedback, auto-tagged with sentiment and theme."
        action={
          <Link href="/feedback/new">
            <Button>
              <PlusCircle size={16} /> Add feedback
            </Button>
          </Link>
        }
      />

      <div className="px-8 pt-6 flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search feedback or customer..."
            className="pl-9 pr-3 py-2.5 rounded-xl border border-border text-sm w-72 bg-surface focus:outline-none focus:ring-2 focus:ring-signal/30 focus:border-signal"
          />
        </div>
        <select
          value={sentimentFilter}
          onChange={(e) => setSentimentFilter(e.target.value as Sentiment | "ALL")}
          className="px-3 py-2.5 rounded-xl border border-border text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-signal/30"
        >
          {sentiments.map((s) => (
            <option key={s} value={s}>
              {s === "ALL" ? "All sentiment" : s.charAt(0) + s.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
        <select
          value={themeFilter}
          onChange={(e) => setThemeFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-signal/30"
        >
          <option value="ALL">All themes</option>
          {themes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="p-8 space-y-3">
        {filtered.map((f) => (
          <Card key={f.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm font-medium">{f.customer}</p>
                  <span className="text-muted text-sm">·</span>
                  <p className="text-sm text-muted">{f.company}</p>
                  <span className="text-muted text-sm">·</span>
                  <p className="text-xs text-muted font-mono-data">{f.source.replace("_", " ").toLowerCase()}</p>
                </div>
                <p className="text-sm text-ink-soft mb-3">{f.text}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {f.themeIds.map((tid) => {
                    const theme = themes.find((t) => t.id === tid);
                    return theme ? <ThemeTag key={tid} name={theme.name} color={theme.color} /> : null;
                  })}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <SentimentPill sentiment={f.sentiment} />
                <PriorityPill priority={f.priority} />
                <p className="text-xs text-muted font-mono-data">{f.createdAt}</p>
              </div>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted">
            <p>No feedback matches these filters yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
