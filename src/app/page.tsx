import Link from "next/link";
import { LoopMark } from "@/components/LoopMark";
import { Card } from "@/components/ui";
import {
  Layers,
  MessageCircleQuestion,
  FileBarChart,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Structured classification",
    body: "Every piece of feedback is auto-tagged with sentiment, priority, and theme — Zod-validated output with a rule-based fallback so classification never breaks.",
  },
  {
    icon: Layers,
    title: "Theme clustering & trends",
    body: "Related feedback clusters into themes automatically, with week-over-week movement so you see what's rising before it's a fire.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Ask LOOP — RAG chat",
    body: "Ask questions in plain language and get answers grounded in real feedback excerpts, cited by source, not a static dashboard.",
  },
  {
    icon: FileBarChart,
    title: "Auto-generated reports",
    body: "Facts are always computed directly from your data. The AI only writes the narrative prose around numbers it's given, never invents them.",
  },
];

const stack = [
  "Next.js 14",
  "TypeScript",
  "Tailwind CSS",
  "Prisma ORM",
  "PostgreSQL",
  "pgvector",
  "Claude API",
  "Vercel",
];

const steps = [
  { label: "Collect", desc: "Email, surveys, app reviews, support tickets, sales calls — one inbox." },
  { label: "Classify", desc: "AI tags sentiment, priority, and theme in real time." },
  { label: "Act", desc: "Ask LOOP surfaces answers and reports point straight at the fix." },
  { label: "Repeat", desc: "Trends track whether last week's fix actually moved the needle." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <LoopMark size={30} animate={false} />
          <span className="font-display text-xl">LOOP</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-ink-soft hover:text-ink px-3 py-2">
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium bg-ink text-white px-4 py-2.5 rounded-xl hover:bg-signal-dark transition-colors"
          >
            Get started
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-8 pt-16 pb-24 grid grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-mono-data uppercase tracking-wider text-signal mb-4">
            Multi-tenant AI feedback analytics
          </p>
          <h1 className="font-display text-5xl leading-[1.1] mb-6">
            Feedback comes in messy.
            <br />
            <span className="italic">LOOP</span> sends signal out.
          </h1>
          <p className="text-ink-soft text-lg mb-8 max-w-md">
            Collect customer feedback from every channel, let AI classify and cluster it, then ask
            questions in plain language and get answers grounded in real evidence.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-ink text-white px-5 py-3 rounded-xl font-medium hover:bg-signal-dark transition-colors"
            >
              Create a workspace <ArrowRight size={16} />
            </Link>
            <Link href="/login" className="text-ink-soft font-medium hover:text-ink">
              View demo dashboard
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative">
            <LoopMark size={280} />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={s.label} className="relative">
              <p className="text-xs font-mono-data text-signal mb-2">0{i + 1}</p>
              <p className="font-display text-xl mb-1.5">{s.label}</p>
              <p className="text-sm text-ink-soft">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-24">
        <div className="max-w-xl mb-12">
          <p className="text-xs font-mono-data uppercase tracking-wider text-signal mb-3">Four AI features</p>
          <h2 className="font-display text-3xl">Built for teams drowning in feedback</h2>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {features.map((f) => (
            <Card key={f.title} className="p-6">
              <f.icon size={22} className="text-signal mb-4" />
              <h3 className="font-display text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{f.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 pb-24">
        <Card className="p-10 bg-ink text-white border-0">
          <div className="flex items-start justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={18} className="text-signal" />
                <p className="text-xs font-mono-data uppercase tracking-wider text-white/60">
                  Enterprise-ready architecture
                </p>
              </div>
              <h2 className="font-display text-2xl mb-3">
                Multi-tenant by design, RBAC enforced server-side
              </h2>
              <p className="text-white/60 text-sm max-w-md leading-relaxed">
                Shared database with organization-level isolation and Admin / Analyst / Viewer roles
                enforced at the server, not just hidden in the UI.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 max-w-xs justify-end">
              {stack.map((s) => (
                <span
                  key={s}
                  className="text-xs font-mono-data px-3 py-1.5 rounded-full border border-white/15 text-white/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <footer className="max-w-6xl mx-auto px-8 py-8 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted">
          <LoopMark size={18} animate={false} />
          LOOP — a feedback analytics platform
        </div>
        <p className="text-xs text-muted font-mono-data">Built as a major project · demo mode</p>
      </footer>
    </div>
  );
}
