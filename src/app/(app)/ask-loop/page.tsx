"use client";

import { useState, useRef, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, Button } from "@/components/ui";
import { ChatMessage } from "@/lib/types";
import { Send, Loader2, MessageCircleQuestion } from "lucide-react";
import { LoopMark } from "@/components/LoopMark";

const SUGGESTIONS = [
  "What are the biggest churn risks this month?",
  "Summarize negative feedback about exports",
  "What do customers love about Ask LOOP?",
  "What integrations are customers requesting?",
];

export default function AskLoopPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(question: string) {
    if (!question.trim() || loading) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: question };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ask-loop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), role: "assistant", content: data.answer, sources: data.sources },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), role: "assistant", content: "Something went wrong reaching Ask LOOP. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <PageHeader
        eyebrow="RAG · retrieval-augmented"
        title="Ask LOOP"
        description="Ask questions in plain language, get answers grounded in real feedback, with sources."
      />

      <div className="flex-1 overflow-y-auto px-8 py-6">
        {messages.length === 0 && (
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="flex justify-center mb-4">
              <LoopMark size={56} />
            </div>
            <p className="text-ink-soft mb-6">Try asking one of these:</p>
            <div className="grid grid-cols-2 gap-3">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-left p-4 rounded-xl border border-border bg-surface hover:border-signal hover:bg-signal-soft transition-colors text-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="max-w-2xl mx-auto space-y-6">
          {messages.map((m) => (
            <div key={m.id} className={m.role === "user" ? "flex justify-end" : ""}>
              {m.role === "user" ? (
                <div className="bg-ink text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-md text-sm">
                  {m.content}
                </div>
              ) : (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-signal-soft flex items-center justify-center shrink-0 mt-0.5">
                    <MessageCircleQuestion size={14} className="text-signal" />
                  </div>
                  <Card className="p-4 flex-1">
                    <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border space-y-1.5">
                        <p className="text-xs font-mono-data uppercase text-muted">Sources</p>
                        {m.sources.map((s) => (
                          <p key={s.id} className="text-xs text-muted italic">
                            &ldquo;{s.snippet}...&rdquo;
                          </p>
                        ))}
                      </div>
                    )}
                  </Card>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 items-center text-muted text-sm">
              <Loader2 size={16} className="animate-spin" /> Searching feedback and synthesizing an answer...
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="border-t border-border px-8 py-4">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Ask about your feedback..."
            className="flex-1 px-4 py-3 rounded-xl border border-border text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-signal/30 focus:border-signal"
          />
          <Button onClick={() => send(input)} disabled={loading || !input.trim()}>
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
