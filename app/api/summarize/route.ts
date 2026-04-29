import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import type { TrialRow } from "@/types/trial";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { trials }: { trials: TrialRow[] } = await req.json();

  if (!trials || trials.length === 0) {
    return NextResponse.json({ error: "No trial data provided." }, { status: 400 });
  }

  // Build a concise text representation of the data
  const dataText = trials
    .map(
      (t) =>
        `Trial ${t.trial_id}: ${t.drug_name}, ${t.patient_age}yo ${t.patient_sex}, ` +
        `${t.dosage_mg}mg, outcome: ${t.outcome}`
    )
    .join("\n");

  const message = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 300,
    messages: [
      {
        role: "user",
        content:
          `You are a clinical data analyst. Summarize the following trial data in 3-4 sentences. ` +
          `Focus on outcome patterns, any notable drug performance, and patient demographics.\n\n` +
          `${dataText}`,
      },
    ],
  });

  const summary = message.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("");

  return NextResponse.json({ summary });
}