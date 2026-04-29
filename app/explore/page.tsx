import clientPromise from "@/lib/mongodb";
import ExploreClient from "@/components/ExploreClient";
import type { TrialRow } from "@/types/trial";

export default async function ExplorePage() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const trials = await db
    .collection<TrialRow>("trials")
    .find({})
    .toArray();

  // MongoDB adds _id to every document — strip it before passing to the client
  const rows = trials.map(({ _id, ...rest }) => rest) as TrialRow[];

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Trial Explorer</h1>
      <ExploreClient initialRows={rows} />
    </div>
  );
}