"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoopMark } from "@/components/LoopMark";
import { Button } from "@/components/ui";
import { setSession } from "@/lib/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("shipra@nimbus.io");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSession({ name: email.split("@")[0].replace(/\./g, " "), email, role: "ADMIN" });
      router.push("/dashboard");
    }, 500);
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 hidden lg:flex flex-col justify-between bg-ink text-white p-12">
        <div className="flex items-center gap-2.5">
          <LoopMark size={28} />
          <span className="font-display text-xl">LOOP</span>
        </div>
        <div>
          <p className="font-display text-4xl leading-tight mb-4">
            Feedback comes in messy.
            <br />
            LOOP sends signal out.
          </p>
          <p className="text-white/60 max-w-md">
            Collect from every channel, classify with AI, and ask questions in plain language —
            all inside one multi-tenant workspace.
          </p>
        </div>
        <p className="text-white/40 text-sm font-mono-data">Nimbus Analytics · Growth plan</p>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <LoopMark size={28} />
            <span className="font-display text-xl">LOOP</span>
          </div>
          <h1 className="font-display text-2xl mb-1.5">Welcome back</h1>
          <p className="text-ink-soft text-sm mb-8">Log in to your workspace.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono-data uppercase text-muted">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-border text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-signal/30 focus:border-signal"
              />
            </div>
            <div>
              <label className="text-xs font-mono-data uppercase text-muted">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="anything works in demo mode"
                className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-border text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-signal/30 focus:border-signal"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </form>

          <p className="text-sm text-muted mt-6 text-center">
            No account? <Link href="/signup" className="text-signal font-medium">Sign up</Link>
          </p>
          <p className="text-xs text-muted mt-4 text-center">
            Demo mode: any email/password logs you in as an Admin on the Nimbus Analytics workspace.
          </p>
        </div>
      </div>
    </div>
  );
}
