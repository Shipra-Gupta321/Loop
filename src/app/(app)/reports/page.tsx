"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, Button } from "@/components/ui";
import { RefreshCw, Loader2, FileText } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ReportData {
  stats: {
    totalFeedback: number;
    sentimentSplit: { positive: number; neutral: number; negative: number };
    topThemes: { name: string; count: number }[];
  };
  narrative: { heading: string; body: string }[];
}

export default function ReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadReport() {
    setLoading(true);
    try {
      const res = await fetch("/api/report");
      const json = await res.json();
      setData(json);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReport();
  }, []);

  const pieData = data
    ? [
        { name: "Positive", value: data.stats.sentimentSplit.positive, color: "#1FAA59" },
        { name: "Neutral", value: data.stats.sentimentSplit.neutral, color: "#C98A1F" },
        { name: "Negative", value: data.stats.sentimentSplit.negative, color: "#E2492D" },
      ]
    : [];

  return (
    <div>
      <PageHeader
        eyebrow="Auto-generated"
        title="Reports"
        description="Facts are computed directly from your data; only the narrative prose is AI-written."
        action={
          <Button variant="secondary" onClick={loadReport} disabled={loading}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
            Regenerate
          </Button>
        }
      />

      <div className="p-8">
        {loading && !data && (
          <div className="flex items-center gap-2 text-muted text-sm">
            <Loader2 size={16} className="animate-spin" /> Computing stats and generating narrative...
          </div>
        )}

        {data && (
          <div className="grid grid-cols-3 gap-6">
            <Card className="p-6 col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <FileText size={16} className="text-signal" />
                <h2 className="font-display text-lg">Weekly Digest</h2>
              </div>
              <p className="text-4xl font-display mb-1">{data.stats.totalFeedback}</p>
              <p className="text-xs text-muted font-mono-data mb-6">total feedback items</p>

              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={3}>
                    {pieData.map((e, i) => (
                      <Cell key={i} fill={e.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>

              <div className="mt-4 space-y-2">
                <p className="text-xs font-mono-data uppercase text-muted">Top themes</p>
                {data.stats.topThemes.map((t) => (
                  <div key={t.name} className="flex justify-between text-sm">
                    <span className="text-ink-soft">{t.name}</span>
                    <span className="font-mono-data text-muted">{t.count}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 col-span-2">
              <h2 className="font-display text-2xl mb-6">Narrative summary</h2>
              <div className="space-y-6">
                {data.narrative.map((section) => (
                  <div key={section.heading}>
                    <h3 className="font-medium text-signal-dark mb-1.5">{section.heading}</h3>
                    <p className="text-sm text-ink-soft leading-relaxed whitespace-pre-wrap">{section.body}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
