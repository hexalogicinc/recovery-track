import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TrainerStatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  accent?: "default" | "success" | "warning" | "danger";
}

const accentStyles = {
  default: "text-slate-50",
  success: "text-emerald-300",
  warning: "text-amber-300",
  danger: "text-rose-300",
} as const;

export function TrainerStatCard({
  label,
  value,
  icon: Icon,
  accent = "default",
}: TrainerStatCardProps) {
  return (
    <Card className="border-white/10 bg-slate-900/70 backdrop-blur-sm">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </span>
          <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
        </div>
        <p className={cn("text-3xl font-semibold tabular-nums", accentStyles[accent])}>
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
