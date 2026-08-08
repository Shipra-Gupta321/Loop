"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoopMark } from "@/components/LoopMark";
import { Button } from "@/components/ui";
import { setSession } from "@/lib/auth-store";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orgName, setOrgName] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSession({ name: name || "New User", email, role: "ADMIN" });
      router.push("/dashboard");
    }, 500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-bg">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <LoopMark size={28} />
          <span className="font-display text-xl">LOOP</span>
        </div>
        <h1 className="font-display text-2xl mb-1.5 text-center">Create your workspace</h1>
        <p className="text-ink-soft text-sm mb-8 text-center">Start turning feedback into direction.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono-data uppercase text-muted">Your name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-border text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-signal/30 focus:border-signal"
            />
          </div>
          <div>
            <label className="text-xs font-mono-data uppercase text-muted">Work email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-border text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-signal/30 focus:border-signal"
            />
          </div>
          <div>
            <label className="text-xs font-mono-data uppercase text-muted">Workspace name</label>
            <input
              required
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Acme Inc."
              className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-border text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-signal/30 focus:border-signal"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create workspace"}
          </Button>
        </form>

        <p className="text-sm text-muted mt-6 text-center">
          Already have a workspace? <Link href="/login" className="text-signal font-medium">Log in</Link>
        </p>
      </div>
    </div>
  );
}
