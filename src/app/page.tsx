"use client";

import Link from "next/link";
import { HexSurface } from "@/components/hex";

export default function Home() {
  return (
    <main className="flex h-full min-h-0 flex-1 flex-col bg-black text-white">
      <header className="flex items-baseline justify-between gap-4 px-6 py-5">
        <div>
          <h1 className="font-[family-name:var(--font-geist-sans)] text-2xl tracking-tight">
            beehive
          </h1>
          <p className="mt-1 text-sm text-white/55">Hexagonal UI</p>
        </div>
        <Link
          href="/storybook"
          className="text-sm text-white/70 underline-offset-4 hover:text-white hover:underline"
        >
          Storybook
        </Link>
      </header>
      <div className="min-h-0 flex-1">
        <HexSurface renderInner={() => <HexSurface hexSize={28} />} />
      </div>
    </main>
  );
}
