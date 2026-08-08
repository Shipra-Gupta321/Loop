import { NextRequest, NextResponse } from "next/server";
import { askLoop } from "@/lib/ai";
import { feedback } from "@/lib/mock-data";

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Question is required." }, { status: 400 });
    }
    const result = await askLoop(question, feedback);
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Ask LOOP failed." }, { status: 500 });
  }
}
