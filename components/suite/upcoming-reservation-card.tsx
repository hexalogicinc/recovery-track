"use client";

import { Calendar, Clock, X } from "lucide-react";

import { SessionStatusBadge } from "@/components/suite/session-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { SuiteReservation } from "@/mock-data/reservations";

type UpcomingReservationCardProps = {
  reservation: SuiteReservation;
  dateLabel: string;
  timeLabel: string;
  onCancel?: () => void;
  showCancel?: boolean;
};

export function UpcomingReservationCard({
  reservation,
  dateLabel,
  timeLabel,
  onCancel,
  showCancel,
}: UpcomingReservationCardProps) {
  return (
    <Card className="border-white/10 bg-slate-900/70 shadow-md backdrop-blur-sm">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-100">
              {reservation.suiteName}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              25-minute private contrast therapy session
            </p>
          </div>
          <SessionStatusBadge status={reservation.status} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 ring-1 ring-inset ring-white/10">
            <Calendar className="h-4 w-4 text-slate-200" aria-hidden />
            <p className="text-sm font-medium text-slate-100">{dateLabel}</p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 ring-1 ring-inset ring-white/10">
            <Clock className="h-4 w-4 text-slate-200" aria-hidden />
            <p className="text-sm font-medium text-slate-100">{timeLabel}</p>
          </div>
        </div>

        {showCancel ? (
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/8 px-4 py-3">
            <p className="text-xs text-amber-100/90">
              Need to change plans? You can cancel any time.
            </p>
            <Button
              type="button"
              variant="outline"
              className="h-10 rounded-xl border-amber-500/30 bg-transparent px-3 text-amber-200 hover:bg-amber-500/10"
              onClick={onCancel}
            >
              <X className="h-4 w-4" aria-hidden />
              Cancel
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

