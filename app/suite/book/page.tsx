"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { CompactDateSelector } from "@/components/suite/compact-date-selector";
import { ReservationSummaryCard } from "@/components/suite/reservation-summary-card";
import { TimeSlotCard } from "@/components/suite/time-slot-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getMockSuiteDays } from "@/mock-data/reservations";

function formatDateChip(ymd: string, idx: number) {
  const [y, m, d] = ymd.split("-").map(Number);
  const date = new Date(y ?? 0, (m ?? 1) - 1, d ?? 1);
  const weekday = date.toLocaleDateString(undefined, { weekday: "short" });
  const monthDay = date.toLocaleDateString(undefined, { month: "short", day: "numeric" });

  return {
    key: ymd,
    label: idx === 0 ? "Today" : idx === 1 ? "Tomorrow" : weekday,
    sublabel: monthDay,
  };
}

function formatFullDate(ymd: string) {
  const [y, m, d] = ymd.split("-").map(Number);
  const date = new Date(y ?? 0, (m ?? 1) - 1, d ?? 1);
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function SuiteBookingPage() {
  const sp = useSearchParams();
  const coach = sp.get("coach") === "1";
  const clientName = sp.get("clientName") ?? "";

  const days = useMemo(() => getMockSuiteDays(), []);
  const dateChips = useMemo(
    () => days.map((d, i) => formatDateChip(d.dateIso, i)),
    [days],
  );

  const [selectedDateIso, setSelectedDateIso] = useState(days[0]?.dateIso ?? "");
  const [selectedStartAtIso, setSelectedStartAtIso] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const day = days.find((d) => d.dateIso === selectedDateIso) ?? days[0];

  const canContinue = Boolean(selectedStartAtIso && selectedLabel);

  function handleSelectSlot(startAtIso: string, label: string) {
    setSelectedStartAtIso(startAtIso);
    setSelectedLabel(label);
  }

  function handleChangeDate(key: string) {
    setSelectedDateIso(key);
    setSelectedStartAtIso(null);
    setSelectedLabel(null);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col pb-28">
      <div className="mb-3 flex items-center justify-between gap-2">
        <Link
          href="/suite"
          className="text-sm font-medium text-emerald-400/90 hover:underline"
        >
          ← Reservations
        </Link>
        <span className="text-xs text-muted-foreground">Private suite · 25 min</span>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
          Reserve a session
        </h1>
        <p className="text-sm text-muted-foreground">
          {coach && clientName
            ? `Trainer reserve for ${clientName}.`
            : "Reserve your private recovery suite."}
        </p>
      </div>

      <div className="mt-5 space-y-5">
        <CompactDateSelector
          dates={dateChips}
          selectedKey={selectedDateIso}
          onChange={handleChangeDate}
        />

        {selectedLabel && selectedStartAtIso ? (
          <ReservationSummaryCard
            suiteName="Private Recovery Suite"
            dateLabel={formatFullDate(selectedDateIso)}
            timeLabel={selectedLabel}
            durationMinutes={25}
          />
        ) : (
          <Card className="border-white/10 bg-slate-900/45 backdrop-blur-sm">
            <CardContent className="p-5">
              <p className="text-sm font-medium text-slate-200">
                Pick a time that feels right
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                One suite is available — each slot can be reserved once.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Available times
          </p>
          <div
            className={cn("grid grid-cols-1 gap-3")}
            key={selectedDateIso}
          >
            {day?.slots.map((s) => (
              <TimeSlotCard
                key={s.startAtIso}
                label={s.startLabel}
                sublabel={s.available ? "Available" : "Reserved"}
                disabled={!s.available}
                selected={selectedStartAtIso === s.startAtIso}
                onSelect={() => handleSelectSlot(s.startAtIso, s.startLabel)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0">
        <div className="mx-auto w-full max-w-md px-4">
          <div className="sticky bottom-0 -mx-4 border-t border-white/10 bg-[hsl(222_47%_6%)]/92 px-4 pb-4 pt-3 backdrop-blur-md">
            <Button
              asChild
              size="lg"
              className="min-h-14 w-full rounded-2xl text-base shadow-lg shadow-emerald-900/30"
              disabled={!canContinue}
            >
              <Link
                href={
                  canContinue
                    ? `/suite/confirm?date=${encodeURIComponent(
                        selectedDateIso,
                      )}&time=${encodeURIComponent(selectedLabel ?? "")}${
                        coach && clientName
                          ? `&coach=1&clientName=${encodeURIComponent(clientName)}`
                          : ""
                      }`
                    : "#"
                }
                aria-disabled={!canContinue}
                tabIndex={canContinue ? 0 : -1}
                className={cn(!canContinue && "pointer-events-none")}
              >
                Continue
              </Link>
            </Button>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Sauna + cold plunge access · 25 minutes · your pace
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

