import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { FeedbackItem, Theme } from "./types";

const MODEL = "claude-sonnet-4-6";

function getClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  return new Anthropic({ apiKey });
}

/* -------------------------------------------------------------------- */
/* Feature 1: Structured classification (sentiment + theme + priority)  */
/* -------------------------------------------------------------------- */

const ClassificationSchema = z.object({
  sentiment: z.enum(["POSITIVE", "NEUTRAL", "NEGATIVE"]),
  priority: z.enum(["Low", "Medium", "High"]),
  themeName: z.string(),
  themeIsNew: z.boolean(),
  reasoning: z.string(),
});
export type Classification = z.infer<typeof ClassificationSchema>;

function fallbackClassify(text: string, themes: Theme[]): Classification {
  const lower = text.toLowerCase();
  const negWords = ["slow", "timeout", "confus", "broken", "bug", "frustrat", "can't", "unusable", "fail"];
  const posWords = ["love", "great", "saved", "nailed", "finally", "helpful", "awesome"];
  const negHit = negWords.some((w) => lower.includes(w));
  const posHit = posWords.some((w) => lower.includes(w));
  const sentiment = posHit && !negHit ? "POSITIVE" : negHit && !posHit ? "NEGATIVE" : "NEUTRAL";
  const matched = themes.find((t) => lower.includes(t.name.toLowerCase().split(" ")[0]));
  return {
    sentiment,
    priority: sentiment === "NEGATIVE" ? "High" : sentiment === "NEUTRAL" ? "Medium" : "Low",
    themeName: matched?.name ?? "Uncategorized",
    themeIsNew: !matched,
    reasoning: "Rule-based fallback classifier (no ANTHROPIC_API_KEY configured).",
  };
}

export async function classifyFeedback(text: string, themes: Theme[]): Promise<Classification> {
  const client = getClient();
  if (!client) return fallbackClassify(text, themes);

  try {
    const themeList = themes.map((t) => `- ${t.name}: ${t.description}`).join("\n");
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 400,
      system:
        "You are a feedback classification engine for a B2B SaaS analytics product. Respond with ONLY valid JSON matching this exact shape, no prose, no markdown fences: " +
        '{"sentiment":"POSITIVE|NEUTRAL|NEGATIVE","priority":"Low|Medium|High","themeName":"string","themeIsNew":boolean,"reasoning":"one sentence"}',
      messages: [
        {
          role: "user",
          content: `Existing themes:\n${themeList}\n\nClassify this feedback. Reuse an existing theme name if it fits well, otherwise propose a new concise theme name and set themeIsNew true.\n\nFeedback: "${text}"`,
        },
      ],
    });
    const raw = msg.content.find((b) => b.type === "text")?.text ?? "{}";
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = ClassificationSchema.parse(JSON.parse(cleaned));
    return parsed;
  } catch (err) {
    console.error("classifyFeedback error, falling back:", err);
    return fallbackClassify(text, themes);
  }
}

/* -------------------------------------------------------------------- */
/* Feature 2: Ask LOOP — retrieval-augmented chat over feedback         */
/* -------------------------------------------------------------------- */

function scoreOverlap(query: string, text: string): number {
  const q = new Set(query.toLowerCase().split(/\W+/).filter((w) => w.length > 3));
  const t = text.toLowerCase();
  let score = 0;
  q.forEach((w) => {
    if (t.includes(w)) score += 1;
  });
  return score;
}

export function retrieveRelevantFeedback(question: string, feedback: FeedbackItem[], topK = 6) {
  return [...feedback]
    .map((f) => ({ item: f, score: scoreOverlap(question, f.text) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((r) => r.item);
}

export async function askLoop(question: string, feedback: FeedbackItem[]) {
  const relevant = retrieveRelevantFeedback(question, feedback);
  const client = getClient();

  if (!client) {
    return {
      answer:
        "Demo mode (no ANTHROPIC_API_KEY set): here are the most relevant feedback items I found for your question. Connect an API key in your Vercel environment variables to get a synthesized answer here instead.",
      sources: relevant.slice(0, 4).map((f) => ({ id: f.id, snippet: f.text.slice(0, 140) })),
    };
  }

  try {
    const context = relevant
      .map((f, i) => `[${i + 1}] (${f.sentiment}, ${f.company}): ${f.text}`)
      .join("\n");
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 600,
      system:
        "You are Ask LOOP, an analytics assistant answering questions about customer feedback using ONLY the numbered feedback excerpts provided. Cite excerpt numbers like [1] inline. If the excerpts don't contain the answer, say so plainly. Keep answers concise and concrete.",
      messages: [
        {
          role: "user",
          content: `Feedback excerpts:\n${context}\n\nQuestion: ${question}`,
        },
      ],
    });
    const answer = msg.content.find((b) => b.type === "text")?.text ?? "";
    return {
      answer,
      sources: relevant.slice(0, 4).map((f) => ({ id: f.id, snippet: f.text.slice(0, 140) })),
    };
  } catch (err) {
    console.error("askLoop error:", err);
    return {
      answer: "Something went wrong reaching the AI model. Showing the closest matching feedback instead.",
      sources: relevant.slice(0, 4).map((f) => ({ id: f.id, snippet: f.text.slice(0, 140) })),
    };
  }
}

/* -------------------------------------------------------------------- */
/* Feature 3: Report narrative — facts computed in code, AI writes prose*/
/* -------------------------------------------------------------------- */

export async function generateReportNarrative(stats: {
  totalFeedback: number;
  sentimentSplit: { positive: number; neutral: number; negative: number };
  topThemes: { name: string; count: number }[];
}) {
  const client = getClient();
  const factsBlock = `Total feedback: ${stats.totalFeedback}\nSentiment — positive: ${stats.sentimentSplit.positive}, neutral: ${stats.sentimentSplit.neutral}, negative: ${stats.sentimentSplit.negative}\nTop themes: ${stats.topThemes.map((t) => `${t.name} (${t.count})`).join(", ")}`;

  if (!client) {
    return [
      { heading: "Overview", body: `Demo mode narrative based on computed facts.\n${factsBlock}` },
    ];
  }

  try {
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 700,
      system:
        "You write a short 3-section executive report narrative (Overview, What's working, What needs attention) for a B2B SaaS feedback analytics tool, using ONLY the facts given. Never invent numbers. Return ONLY valid JSON: an array of objects with 'heading' and 'body' string fields, no markdown fences.",
      messages: [{ role: "user", content: `Facts:\n${factsBlock}` }],
    });
    const raw = msg.content.find((b) => b.type === "text")?.text ?? "[]";
    const cleaned = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned) as { heading: string; body: string }[];
  } catch (err) {
    console.error("generateReportNarrative error:", err);
    return [{ heading: "Overview", body: factsBlock }];
  }
}
