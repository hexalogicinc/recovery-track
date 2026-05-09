import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricSummaryCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  hint: string;
  className?: string;
}

export function MetricSummaryCard({
  icon: Icon,
  label,
  value,
  hint,
  className,
}: MetricSummaryCardProps) {
  return (
    <Card
      className={cn(
        "border-white/10 bg-slate-900/60 shadow-md backdrop-blur-sm",
        className,
      )}
    >
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
            <Icon className="h-4 w-4" aria-hidden />
          </span>
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-50">{value}</p>
          <p className="text-xs text-muted-foreground">{hint}</p>
        </div>
      </CardContent>
    </Card>
  );
}
