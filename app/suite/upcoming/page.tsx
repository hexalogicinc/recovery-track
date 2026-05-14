"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { PageHeader } from "@/components/page-header";
import { UpcomingReservationCard } from "@/components/suite/upcoming-reservation-card";
import { Button } from "@/components/ui/button";
import { getMockSuiteReservations } from "@/mock-data/reservations";

function formatDateLabelFromIso(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTimeLabelFromIso(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export default function SuiteUpcomingPage() {
  const initial = useMemo(() => getMockSuiteReservations(), []);
  const [upcoming, setUpcoming] = useState(initial.upcoming);
  const completed = initial.completed;

  function cancelReservation(id: string) {
    setUpcoming((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="flex flex-1 flex-col gap-6 pb-16">
      <div className="flex items-start justify-between gap-3">
        <PageHeader title="Your reservations" subtitle="Private suite sessions" />
        <Link
          href="/suite"
          className="shrink-0 pt-1 text-sm font-medium text-emerald-400/90 hover:underline"
        >
          Back
        </Link>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Upcoming
          </p>
          <span className="text-xs text-muted-foreground">
            {upcoming.length} scheduled
          </span>
        </div>

        {upcoming.length ? (
          <div className="flex flex-col gap-3">
            {upcoming.map((r) => (
              <UpcomingReservationCard
                key={r.id}
                reservation={r}
                dateLabel={formatDateLabelFromIso(r.startAtIso)}
                timeLabel={formatTimeLabelFromIso(r.startAtIso)}
                showCancel
                onCancel={() => cancelReservation(r.id)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-5 text-center backdrop-blur-sm">
            <p className="text-sm font-medium text-slate-200">
              No upcoming sessions
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              When you’re ready, reserve a private suite.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-4 min-h-12 w-full rounded-2xl text-base shadow-lg shadow-emerald-900/30"
            >
              <Link href="/suite/book">Reserve Session</Link>
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Completed
          </p>
          <span className="text-xs text-muted-foreground">
            {completed.length} sessions
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {completed.map((r) => (
            <UpcomingReservationCard
              key={r.id}
              reservation={r}
              dateLabel={formatDateLabelFromIso(r.startAtIso)}
              timeLabel={formatTimeLabelFromIso(r.startAtIso)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

