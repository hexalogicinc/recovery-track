import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { UpcomingReservationCard } from "@/components/suite/upcoming-reservation-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  findNextAvailableSlot,
  getMockSuiteDays,
  getMockSuiteReservations,
} from "@/mock-data/reservations";

function formatDateLabel(ymd: string) {
  const [y, m, d] = ymd.split("-").map(Number);
  const date = new Date(y ?? 0, (m ?? 1) - 1, d ?? 1);
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTimeLabelFromIso(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export default function SuiteHomePage() {
  const days = getMockSuiteDays();
  const next = findNextAvailableSlot(days);
  const { upcoming } = getMockSuiteReservations();

  return (
    <div className="flex flex-1 flex-col gap-6 pb-10">
      <div className="flex items-start justify-between gap-3">
        <PageHeader
          title="Reservations"
          subtitle="Private contrast therapy, on your terms"
        />
        <Link
          href="/"
          className="shrink-0 pt-1 text-sm font-medium text-emerald-400/90 hover:underline"
        >
          Home
        </Link>
      </div>

      <Card className="overflow-hidden border-white/10 bg-slate-900/80 shadow-xl backdrop-blur-sm">
        <CardContent className="space-y-5 p-6">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400/85">
              Private Recovery Suite
            </p>
            <p className="text-2xl font-semibold tracking-tight text-slate-50">
              25-minute private contrast therapy session
            </p>
            <p className="text-sm text-muted-foreground">
              Sauna + cold plunge access
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Next available
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-50">
              {next
                ? `${formatDateLabel(next.dateIso)} · ${next.startLabel}`
                : "No slots available"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              One suite · one guest at a time
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="min-h-14 w-full rounded-2xl text-base shadow-lg shadow-emerald-900/35"
          >
            <Link href="/suite/book">Reserve Session</Link>
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Effortless booking · Calm experience
          </p>
        </CardContent>
      </Card>

      {upcoming[0] ? (
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Your upcoming session
          </p>
          <UpcomingReservationCard
            reservation={upcoming[0]}
            dateLabel={formatDateLabel(
              new Date(upcoming[0].startAtIso).toISOString().slice(0, 10),
            )}
            timeLabel={formatTimeLabelFromIso(upcoming[0].startAtIso)}
          />
          <Button
            asChild
            variant="outline"
            className="min-h-12 w-full rounded-2xl border-white/15"
          >
            <Link href="/suite/upcoming">View all reservations</Link>
          </Button>
        </div>
      ) : null}
    </div>
  );
}

