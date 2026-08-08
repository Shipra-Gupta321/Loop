"use client";

import { PageHeader } from "@/components/PageHeader";
import { Card, ThemeTag } from "@/components/ui";
import { themes, weeklyVolume, feedback } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function TrendsPage() {
  const pieData = themes.map((t) => ({ name: t.name, value: t.feedbackCount, color: t.color }));

  return (
    <div>
      <PageHeader
        eyebrow="Theme clustering"
        title="Trends"
        description="AI-clustered themes across all feedback, with week-over-week movement."
      />

      <div className="p-8 space-y-8">
        <div className="grid grid-cols-3 gap-6">
          <Card className="p-6 col-span-2">
            <h2 className="font-display text-xl mb-4">Volume by sentiment</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={weeklyVolume}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E7E7E2" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#8A8D98" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#8A8D98" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#E7E7E2", fontSize: 13 }} />
                <Bar dataKey="positive" stackId="a" fill="#1FAA59" radius={[0, 0, 0, 0]} />
                <Bar dataKey="neutral" stackId="a" fill="#C98A1F" />
                <Bar dataKey="negative" stackId="a" fill="#E2492D" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-xl mb-4">Theme share</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#E7E7E2", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div>
          <h2 className="font-display text-xl mb-4">All themes</h2>
          <div className="grid grid-cols-2 gap-4">
            {themes.map((t) => {
              const items = feedback.filter((f) => f.themeIds.includes(t.id));
              return (
                <Card key={t.id} className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <ThemeTag name={t.name} color={t.color} />
                    <span
                      className={`text-xs font-mono-data font-medium flex items-center gap-0.5 ${
                        t.trend >= 0 ? "text-positive" : "text-negative"
                      }`}
                    >
                      {t.trend >= 0 ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                      {Math.abs(t.trend)}%
                    </span>
                  </div>
                  <p className="text-sm text-ink-soft mb-3">{t.description}</p>
                  <p className="text-xs text-muted font-mono-data">{items.length} feedback items linked</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
