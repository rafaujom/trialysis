"use client";

import { useState } from "react";
import CsvUploader from "@/components/CsvUploader";
import TrialTable from "@/components/TrialTable";
import type { TrialRow } from "@/types/trial";
import SummaryCard from "@/components/SummaryCard";

type Props = {
  initialRows: TrialRow[];
};

export default function ExploreClient({ initialRows }: Props) {
  const [rows, setRows] = useState<TrialRow[]>(initialRows);

  return (
    <div>
      <CsvUploader onData={setRows} />
      <SummaryCard rows={rows} />
      <TrialTable rows={rows} />
    </div>
  );
}