import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trialysis",
  description: "Clinical trial data explorer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-50 text-gray-900">
        <aside className="w-56 shrink-0 border-r border-gray-200 bg-white px-4 py-6">
          <p className="mb-6 text-sm font-semibold tracking-widest text-gray-400 uppercase">
            Trialysis
          </p>
          <nav className="flex flex-col gap-1">
            <Link href="/explore" className="rounded-md px-3 py-2 text-sm hover:bg-gray-100">
              Explore
            </Link>
            <Link href="/upload" className="rounded-md px-3 py-2 text-sm hover:bg-gray-100">
              Upload
            </Link>
          </nav>
        </aside>
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </body>
    </html>
  );
}