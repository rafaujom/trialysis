"use client";

import { useState } from "react";
import CsvUploader from "@/components/CsvUploader";
import TrialTable from "@/components/TrialTable";
import { mockTrials } from "@/lib/mock-trials";
import type { TrialRow } from "@/types/trial";

export default function ExplorePage() {
  const [rows, setRows] = useState<TrialRow[]>(mockTrials);

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Trial Explorer</h1>
      <CsvUploader onData={setRows} />
      <TrialTable rows={rows} />
    </div>
  );
}