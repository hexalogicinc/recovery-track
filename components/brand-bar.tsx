import Link from "next/link";

import { BRAND } from "@/lib/branding";

export function BrandBar() {
  return (
    <header className="mb-5 border-b border-white/10 pb-4">
      <Link
        href="/"
        className="block rounded-lg px-1 -mx-1 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-emerald-500/50"
      >
        <div className="flex flex-wrap items-baseline gap-x-1 gap-y-0">
          <span className="text-xl font-bold tracking-tight text-slate-50">
            Sweat
          </span>
          <span className="text-xl font-bold text-slate-500">&</span>
          <span className="text-xl font-bold tracking-tight text-slate-50">
            Regret
          </span>
        </div>
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-400/85">
          {BRAND.clubLine}
        </p>
        <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
          No apologies. Just recovery.
        </p>
      </Link>
    </header>
  );
}
