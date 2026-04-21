
import { mockTrials } from "@/lib/mock-trials";
import type { TrialRow } from "@/types/trial";

export default function ExplorePage() {
  const trials = mockTrials;

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Trial Explorer</h1>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b text-left text-gray-500">
            <th className="pb-2 pr-4">ID</th>
            <th className="pb-2 pr-4">Drug</th>
            <th className="pb-2 pr-4">Age</th>
            <th className="pb-2 pr-4">Sex</th>
            <th className="pb-2 pr-4">Dosage (mg)</th>
            <th className="pb-2">Outcome</th>
          </tr>
        </thead>
        <tbody>
          {trials.map((t: TrialRow) => (
            <tr key={t.trial_id} className="border-b hover:bg-gray-50">
              <td className="py-2 pr-4 font-mono text-xs text-gray-400">{t.trial_id}</td>
              <td className="py-2 pr-4">{t.drug_name}</td>
              <td className="py-2 pr-4">{t.patient_age}</td>
              <td className="py-2 pr-4">{t.patient_sex}</td>
              <td className="py-2 pr-4">{t.dosage_mg}</td>
              <td className="py-2">{t.outcome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}