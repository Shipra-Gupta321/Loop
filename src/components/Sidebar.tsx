"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  Inbox,
  PlusCircle,
  TrendingUp,
  MessageCircleQuestion,
  FileBarChart,
  Settings,
  LogOut,
} from "lucide-react";
import { LoopMark } from "./LoopMark";
import { getSession, clearSession, Session } from "@/lib/auth-store";
import { useEffect, useState } from "react";
import { workspace } from "@/lib/mock-data";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/feedback", label: "Feedback Inbox", icon: Inbox },
  { href: "/feedback/new", label: "Add Feedback", icon: PlusCircle },
  { href: "/trends", label: "Trends", icon: TrendingUp },
  { href: "/ask-loop", label: "Ask LOOP", icon: MessageCircleQuestion },
  { href: "/reports", label: "Reports", icon: FileBarChart },
  { href: "/settings", label: "Settings & Team", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSessionState] = useState<Session | null>(null);

  useEffect(() => {
    setSessionState(getSession());
  }, []);

  function handleLogout() {
    clearSession();
    router.push("/login");
  }

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 border-r border-border bg-surface flex flex-col">
      <div className="px-5 py-6 flex items-center gap-2.5">
        <LoopMark size={30} animate={false} />
        <div>
          <p className="font-display text-lg leading-none">LOOP</p>
          <p className="text-[11px] text-muted font-mono-data mt-0.5">{workspace.name}</p>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                active ? "bg-signal-soft text-signal-dark" : "text-ink-soft hover:bg-bg"
              )}
            >
              <Icon size={17} strokeWidth={2} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        {session && (
          <div className="flex items-center gap-2.5 px-2 py-2 mb-1">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0"
              style={{ background: "#3B5BFF" }}
            >
              {session.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{session.name}</p>
              <p className="text-xs text-muted truncate font-mono-data">{session.role}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-soft hover:bg-bg w-full transition-colors"
        >
          <LogOut size={17} />
          Log out
        </button>
      </div>
    </aside>
  );
}
