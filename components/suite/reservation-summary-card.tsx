"use client";

import { Calendar, Clock, Droplets, Flame } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type ReservationSummaryCardProps = {
  suiteName: string;
  dateLabel: string;
  timeLabel: string;
  durationMinutes: number;
};

export function ReservationSummaryCard({
  suiteName,
  dateLabel,
  timeLabel,
  durationMinutes,
}: ReservationSummaryCardProps) {
  return (
    <Card className="border-white/10 bg-slate-900/75 shadow-lg backdrop-blur-sm">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-200">
              {suiteName}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Sauna + cold plunge access
            </p>
          </div>
          <Badge variant="outline" className="border-white/15 text-slate-100">
            {durationMinutes} min
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 ring-1 ring-inset ring-white/10">
            <Calendar className="h-4 w-4 text-emerald-300/90" aria-hidden />
            <p className="text-sm font-medium text-slate-100">{dateLabel}</p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 ring-1 ring-inset ring-white/10">
            <Clock className="h-4 w-4 text-emerald-300/90" aria-hidden />
            <p className="text-sm font-medium text-slate-100">{timeLabel}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-500/8 px-3 py-2 ring-1 ring-inset ring-emerald-500/15">
            <Flame className="h-4 w-4 text-emerald-200/90" aria-hidden />
            <p className="text-xs font-medium text-slate-200">Sauna ready</p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-500/8 px-3 py-2 ring-1 ring-inset ring-emerald-500/15">
            <Droplets className="h-4 w-4 text-emerald-200/90" aria-hidden />
            <p className="text-xs font-medium text-slate-200">Cold plunge</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

