import { mockTrials } from "@/lib/mock-trials";
import ExploreClient from "@/components/ExploreClient";

export default function ExplorePage() {
  // In a real app this would be: const trials = await db.getTrials()
  const trials = mockTrials;

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Trial Explorer</h1>
      <ExploreClient initialRows={trials} />
    </div>
  );
}