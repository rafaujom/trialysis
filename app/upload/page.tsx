// app/upload/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CsvUploader from "@/components/CsvUploader";
import type { TrialRow } from "@/types/trial";

export default function UploadPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");

  async function handleData(rows: TrialRow[]) {
    setStatus("saving");
    try {
      const res = await fetch("/api/trials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trials: rows }),
      });
      if (!res.ok) throw new Error("Upload failed");
      router.push("/explore");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <h1 className="mb-2 text-xl font-semibold">Upload Trial Data</h1>
      <p className="mb-6 text-sm text-gray-500">
        Upload a CSV file to replace the current dataset.
      </p>
      <CsvUploader onData={handleData} />
      {status === "saving" && (
        <p className="mt-3 text-sm text-gray-500 animate-pulse">Saving to database...</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-red-500">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}