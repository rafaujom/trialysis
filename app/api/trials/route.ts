import { NextRequest, NextResponse } from "next/server";
import getClientPromise from "@/lib/mongodb";
import type { TrialRow } from "@/types/trial";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { trials }: { trials: TrialRow[] } = await req.json();

  if (!trials || trials.length === 0) {
    return NextResponse.json({ error: "No data provided." }, { status: 400 });
  }

  const client = await getClientPromise();
  const db = client.db(process.env.MONGODB_DB);

  // Replace all existing trials with the new upload
  await db.collection("trials").deleteMany({});
  await db.collection("trials").insertMany(trials);

  return NextResponse.json({ inserted: trials.length });
}

export async function GET() {
  const client = await getClientPromise();
  const db = client.db(process.env.MONGODB_DB);

  const trials = await db
    .collection("trials")
    .find({})
    .toArray();

  return NextResponse.json({ trials });
}
