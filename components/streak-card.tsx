import { Flame } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface StreakCardProps {
  days: number;
  label: string;
}

export function StreakCard({ days, label }: StreakCardProps) {
  return (
    <Card className="border-white/10 bg-gradient-to-br from-amber-500/10 via-slate-900/80 to-slate-900/60 shadow-lg backdrop-blur-sm">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-amber-500/15 text-amber-300">
          <Flame className="h-7 w-7" aria-hidden />
        </div>
        <div className="min-w-0 flex-1 space-y-0.5">
          <p className="text-xs font-medium uppercase tracking-wide text-amber-200/90">
            {label}
          </p>
          <p className="text-2xl font-semibold text-slate-50">{days} days</p>
          <p className="text-xs text-muted-foreground">
            Showing up builds better trends.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
