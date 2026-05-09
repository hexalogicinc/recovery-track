import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/status-badge";
import type { TrainerAthlete } from "@/mock-data/trainer";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AthleteRowCard({ athlete }: { athlete: TrainerAthlete }) {
  return (
    <Card className="border-white/10 bg-slate-900/70 backdrop-blur-sm">
      <CardContent className="space-y-4 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-800 text-sm font-semibold text-slate-200 ring-1 ring-white/10">
            {initials(athlete.name)}
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate font-medium text-slate-50">{athlete.name}</p>
              <StatusBadge status={athlete.status} />
            </div>
            <p className="text-xs text-muted-foreground">{athlete.lastCheckIn}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold tabular-nums text-emerald-300">
              {athlete.recoveryScore}
            </p>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
              score
            </p>
          </div>
        </div>
        <Separator className="bg-white/10" />
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <p className="text-muted-foreground">Sleep</p>
            <p className="font-medium text-slate-100">{athlete.sleep}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Soreness</p>
            <p className="font-medium text-slate-100">{athlete.soreness}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Mood</p>
            <p className="font-medium text-slate-100">{athlete.mood}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
