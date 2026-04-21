"use client";

import { useState, useMemo } from "react";
import type { TrialRow, Outcome } from "@/types/trial";

type Props = {
  rows: TrialRow[];
};

const OUTCOMES: Outcome[] = ["improved", "no_change", "worsened"];

export default function TrialTable({ rows }: Props) {
  const [drug, setDrug]       = useState("");
  const [outcome, setOutcome] = useState<Outcome | "">("");
  const [from, setFrom]       = useState("");
  const [to, setTo]           = useState("");

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (drug    && !r.drug_name.toLowerCase().includes(drug.toLowerCase())) return false;
      if (outcome && r.outcome !== outcome)                                   return false;
      if (from    && r.start_date < from)                                     return false;
      if (to      && r.end_date   > to)                                       return false;
      return true;
    });
  }, [rows, drug, outcome, from, to]);

  return (
    <div>
      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Drug name..."
          value={drug}
          onChange={(e) => setDrug(e.target.value)}
          className="rounded-md border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <select
          value={outcome}
          onChange={(e) => setOutcome(e.target.value as Outcome | "")}
          className="rounded-md border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        >
          <option value="">All outcomes</option>
          {OUTCOMES.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="rounded-md border border-gray-200 px-3 py-1.5 text-sm"
        />
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="rounded-md border border-gray-200 px-3 py-1.5 text-sm"
        />
      </div>

      {/* Row count */}
      <p className="mb-3 text-xs text-gray-400">
        Showing {filtered.length} of {rows.length} rows
      </p>

      {/* Table */}
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500">No results match your filters.</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="pb-2 pr-4">ID</th>
              <th className="pb-2 pr-4">Drug</th>
              <th className="pb-2 pr-4">Age</th>
              <th className="pb-2 pr-4">Sex</th>
              <th className="pb-2 pr-4">Dosage (mg)</th>
              <th className="pb-2 pr-4">Outcome</th>
              <th className="pb-2 pr-4">Start</th>
              <th className="pb-2">End</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.trial_id} className="border-b hover:bg-gray-50">
                <td className="py-2 pr-4 font-mono text-xs text-gray-400">{t.trial_id}</td>
                <td className="py-2 pr-4">{t.drug_name}</td>
                <td className="py-2 pr-4">{t.patient_age}</td>
                <td className="py-2 pr-4">{t.patient_sex}</td>
                <td className="py-2 pr-4">{t.dosage_mg}</td>
                <td className="py-2 pr-4">{t.outcome}</td>
                <td className="py-2 pr-4">{t.start_date}</td>
                <td className="py-2">{t.end_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}