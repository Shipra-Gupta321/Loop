"use client";

import { PageHeader } from "@/components/PageHeader";
import { Card, Button } from "@/components/ui";
import { team, workspace } from "@/lib/mock-data";
import { UserPlus } from "lucide-react";

const roleDescriptions: Record<string, string> = {
  ADMIN: "Full access — manage team, billing, and all workspace data.",
  ANALYST: "Can classify, tag, and analyze feedback, no billing access.",
  VIEWER: "Read-only access to dashboards and reports.",
};

export default function SettingsPage() {
  return (
    <div>
      <PageHeader eyebrow="Workspace" title="Settings & Team" description="Manage your workspace, billing plan, and team access." />

      <div className="p-8 space-y-8 max-w-3xl">
        <Card className="p-6">
          <h2 className="font-display text-xl mb-4">Workspace</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs font-mono-data uppercase text-muted">Name</p>
              <p className="text-sm font-medium mt-1">{workspace.name}</p>
            </div>
            <div>
              <p className="text-xs font-mono-data uppercase text-muted">Plan</p>
              <p className="text-sm font-medium mt-1">{workspace.plan}</p>
            </div>
            <div>
              <p className="text-xs font-mono-data uppercase text-muted">Created</p>
              <p className="text-sm font-medium mt-1">{workspace.createdAt}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl">Team</h2>
            <Button variant="secondary">
              <UserPlus size={16} /> Invite member
            </Button>
          </div>
          <div className="space-y-3">
            {team.map((m) => (
              <div key={m.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-medium"
                    style={{ background: m.avatarColor }}
                  >
                    {m.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted">{m.email}</p>
                  </div>
                </div>
                <select
                  defaultValue={m.role}
                  className="text-xs font-mono-data px-2.5 py-1.5 rounded-lg border border-border bg-bg"
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="ANALYST">ANALYST</option>
                  <option value="VIEWER">VIEWER</option>
                </select>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border space-y-1.5">
            {Object.entries(roleDescriptions).map(([role, desc]) => (
              <p key={role} className="text-xs text-muted">
                <span className="font-mono-data font-medium text-ink-soft">{role}</span> — {desc}
              </p>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
