import { NextResponse } from "next/server";
import { generateReportNarrative } from "@/lib/ai";
import { feedback, themes } from "@/lib/mock-data";

export async function GET() {
  try {
    // Facts computed in code — the AI never invents numbers, only prose.
    const totalFeedback = feedback.length;
    const sentimentSplit = {
      positive: feedback.filter((f) => f.sentiment === "POSITIVE").length,
      neutral: feedback.filter((f) => f.sentiment === "NEUTRAL").length,
      negative: feedback.filter((f) => f.sentiment === "NEGATIVE").length,
    };
    const topThemes = [...themes]
      .sort((a, b) => b.feedbackCount - a.feedbackCount)
      .slice(0, 3)
      .map((t) => ({ name: t.name, count: t.feedbackCount }));

    const stats = { totalFeedback, sentimentSplit, topThemes };
    const narrative = await generateReportNarrative(stats);

    return NextResponse.json({ stats, narrative });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Report generation failed." }, { status: 500 });
  }
}
