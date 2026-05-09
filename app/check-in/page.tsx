import Link from "next/link";

import { CheckInFlow } from "@/components/check-in/check-in-flow";

export default function CheckInPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="mb-2 flex items-center justify-between gap-2">
        <Link
          href="/"
          className="text-sm font-medium text-emerald-400/90 hover:underline"
        >
          ← Home
        </Link>
        <span className="text-xs text-muted-foreground">Club check-in · ~45s</span>
      </div>
      <CheckInFlow />
    </div>
  );
}
