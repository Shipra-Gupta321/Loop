import { NextRequest, NextResponse } from "next/server";
import { classifyFeedback } from "@/lib/ai";
import { themes } from "@/lib/mock-data";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text || typeof text !== "string" || text.trim().length < 3) {
      return NextResponse.json({ error: "Feedback text is required." }, { status: 400 });
    }
    const result = await classifyFeedback(text, themes);
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Classification failed." }, { status: 500 });
  }
}
