"use client";

import { useState } from "react";
import type { TrialRow } from "@/types/trial";

type Props = {
  rows: TrialRow[];
};

type Status = "idle" | "loading" | "done" | "error";

export default function SummaryCard({ rows }: Props) {
  const [summary, setSummary] = useState("");
  const [status, setStatus]   = useState<Status>("idle");

  async function handleSummarize() {
    setStatus("loading");
    setSummary("");

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trials: rows }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setSummary(data.summary);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-700">AI Summary</p>
        <button
          onClick={handleSummarize}
          disabled={status === "loading" || rows.length === 0}
          className="rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white
            hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {status === "loading" ? "Analyzing..." : "Summarize"}
        </button>
      </div>

      {status === "idle" && (
        <p className="text-xs text-gray-400">
          Click Summarize to generate an AI analysis of the current {rows.length} rows.
        </p>
      )}

      {status === "loading" && (
        <div className="space-y-2 animate-pulse">
          <div className="h-3 bg-gray-100 rounded w-full" />
          <div className="h-3 bg-gray-100 rounded w-4/5" />
          <div className="h-3 bg-gray-100 rounded w-3/5" />
        </div>
      )}

      {status === "done" && (
        <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
      )}

      {status === "error" && (
        <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}