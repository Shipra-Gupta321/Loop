"use client";

import { PageHeader } from "@/components/PageHeader";
import { Card, SentimentPill, ThemeTag } from "@/components/ui";
import { feedback, themes, weeklyVolume } from "@/lib/mock-data";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

function stat(label: string, value: string, delta?: { value: string; up: boolean }) {
  return (
    <Card className="p-5">
      <p className="text-xs font-mono-data uppercase tracking-wide text-muted">{label}</p>
      <div className="flex items-end justify-between mt-2">
        <p className="font-display text-3xl">{value}</p>
        {delta && (
          <span
            className={`flex items-center gap-0.5 text-xs font-mono-data font-medium ${
              delta.up ? "text-positive" : "text-negative"
            }`}
          >
            {delta.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {delta.value}
          </span>
        )}
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const total = feedback.length;
  const negative = feedback.filter((f) => f.sentiment === "NEGATIVE").length;
  const highPriority = feedback.filter((f) => f.priority === "High").length;
  const recent = [...feedback].slice(0, 5);
  const topThemes = [...themes].sort((a, b) => b.feedbackCount - a.feedbackCount).slice(0, 4);

  return (
    <div>
      <PageHeader
        eyebrow="This week"
        title="Dashboard"
        description="A live pulse on what customers are telling you, and what to act on first."
      />

      <div className="p-8 space-y-8">
        <div className="grid grid-cols-4 gap-4">
          {stat("Feedback this week", String(total), { value: "12%", up: true })}
          {stat("Negative sentiment", String(negative), { value: "4%", up: false })}
          {stat("High priority items", String(highPriority), { value: "18%", up: true })}
          {stat("Active themes", String(themes.length))}
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl">Sentiment over time</h2>
            <p className="text-xs font-mono-data text-muted">Last 6 weeks</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={weeklyVolume}>
              <defs>
                <linearGradient id="pos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1FAA59" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#1FAA59" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="neg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E2492D" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#E2492D" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E7E7E2" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#8A8D98" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#8A8D98" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#E7E7E2", fontSize: 13 }} />
              <Area type="monotone" dataKey="positive" stroke="#1FAA59" fill="url(#pos)" strokeWidth={2} />
              <Area type="monotone" dataKey="negative" stroke="#E2492D" fill="url(#neg)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="font-display text-xl mb-4">Recent feedback</h2>
            <div className="space-y-4">
              {recent.map((f) => (
                <div key={f.id} className="pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm font-medium">{f.customer} · {f.company}</p>
                    <SentimentPill sentiment={f.sentiment} />
                  </div>
                  <p className="text-sm text-ink-soft line-clamp-2">{f.text}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-xl mb-4">Trending themes</h2>
            <div className="space-y-4">
              {topThemes.map((t) => (
                <div key={t.id} className="flex items-center justify-between">
                  <div>
                    <ThemeTag name={t.name} color={t.color} />
                    <p className="text-xs text-muted mt-1.5">{t.feedbackCount} mentions</p>
                  </div>
                  <span
                    className={`text-xs font-mono-data font-medium flex items-center gap-0.5 ${
                      t.trend >= 0 ? "text-positive" : "text-negative"
                    }`}
                  >
                    {t.trend >= 0 ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                    {Math.abs(t.trend)}%
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
