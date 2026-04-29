"use client";

import { useState } from "react";
import Link from "next/link";
import TrialTable from "@/components/TrialTable";
import SummaryCard from "@/components/SummaryCard";
import type { TrialRow } from "@/types/trial";

type Props = {
  initialRows: TrialRow[];
};

export default function ExploreClient({ initialRows }: Props) {
  const [rows] = useState<TrialRow[]>(initialRows);

  return (
    <div>
      {rows.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-200 p-8 text-center">
          <p className="text-sm text-gray-500 mb-3">No trial data yet.</p>
          <Link
            href="/upload"
            className="text-sm font-medium text-gray-900 underline underline-offset-2"
          >
            Upload a CSV to get started
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs text-gray-400">{rows.length} trials loaded</p>
            <Link
              href="/upload"
              className="text-xs text-gray-500 hover:text-gray-900 underline underline-offset-2"
            >
              Replace dataset
            </Link>
          </div>
          <SummaryCard rows={rows} />
          <TrialTable rows={rows} />
        </>
      )}
    </div>
  );
}