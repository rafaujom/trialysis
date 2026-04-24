"use client";

import Papa from "papaparse";
import type { TrialRow } from "@/types/trial";

type Props = {
  onData: (rows: TrialRow[]) => void;
};

export default function CsvUploader({ onData }: Props) {
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<TrialRow>(file, {
      header: true,         // use first row as keys
      dynamicTyping: true,  // auto-convert numbers
      skipEmptyLines: true,
      complete: (result) => {
        onData(result.data);
      },
    });
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload trial CSV
      </label>
      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
        className="block text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-medium
          file:bg-gray-100 file:text-gray-700
          hover:file:bg-gray-200"
      />
    </div>
  );
}