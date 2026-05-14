"use client";

import Link from "next/link";
import { useMemo } from "react";

import { CheckCircle2, CalendarPlus } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { RecoveryInfoCard } from "@/components/suite/recovery-info-card";
import { ReservationSummaryCard } from "@/components/suite/reservation-summary-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function formatFullDate(ymd: string) {
  const [y, m, d] = ymd.split("-").map(Number);
  const date = new Date(y ?? 0, (m ?? 1) - 1, d ?? 1);
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function downloadFile(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function icsEscape(s: string) {
  return s
    .replaceAll("\\", "\\\\")
    .replaceAll("\n", "\\n")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;");
}

function toIcsUtc(dt: Date) {
  const y = dt.getUTCFullYear();
  const m = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const d = String(dt.getUTCDate()).padStart(2, "0");
  const hh = String(dt.getUTCHours()).padStart(2, "0");
  const mm = String(dt.getUTCMinutes()).padStart(2, "0");
  const ss = String(dt.getUTCSeconds()).padStart(2, "0");
  return `${y}${m}${d}T${hh}${mm}${ss}Z`;
}

function addMinutes(d: Date, minutes: number) {
  return new Date(d.getTime() + minutes * 60_000);
}

function generateIcsEvent(params: {
  title: string;
  description: string;
  location?: string;
  start: Date;
  end: Date;
  uid: string;
}) {
  const dtStamp = toIcsUtc(new Date());
  const dtStart = toIcsUtc(params.start);
  const dtEnd = toIcsUtc(params.end);

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//RecoveryTrack//SuiteReservation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${icsEscape(params.uid)}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${icsEscape(params.title)}`,
    `DESCRIPTION:${icsEscape(params.description)}`,
    params.location ? `LOCATION:${icsEscape(params.location)}` : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}

export default function SuiteConfirmPage() {
  const sp = useSearchParams();
  const dateIso = sp.get("date") ?? "";
  const timeLabel = sp.get("time") ?? "";
  const coach = sp.get("coach") === "1";
  const clientName = sp.get("clientName") ?? "";

  const dateLabel = useMemo(() => (dateIso ? formatFullDate(dateIso) : ""), [dateIso]);

  const eventStart = useMemo(() => {
    if (!dateIso || !timeLabel) return null;
    // Lightweight parsing for the POC: convert "9:30 AM" to hours/minutes.
    const match = timeLabel.match(/^(\d{1,2}):(\d{2})\s(AM|PM)$/i);
    const [y, m, d] = dateIso.split("-").map(Number);
    if (!match || !y || !m || !d) return null;
    let hh = Number(match[1]);
    const mm = Number(match[2]);
    const ap = match[3]?.toUpperCase();
    if (ap === "PM" && hh !== 12) hh += 12;
    if (ap === "AM" && hh === 12) hh = 0;
    const start = new Date(y, m - 1, d, hh, mm, 0, 0);
    return start;
  }, [dateIso, timeLabel]);

  function handleAddToCalendar() {
    if (!eventStart) return;
    const end = addMinutes(eventStart, 25);

    const ics = generateIcsEvent({
      title: coach && clientName
        ? `Private Recovery Suite — ${clientName}`
        : "Private Recovery Suite — Contrast Therapy",
      description:
        coach && clientName
          ? `Reserved for ${clientName}. 25-minute private contrast therapy session. Sauna + cold plunge access. Take recovery at your own pace.`
          : "25-minute private contrast therapy session. Sauna + cold plunge access. Take recovery at your own pace.",
      location: "Recovery Suite",
      start: eventStart,
      end,
      uid: `suite-${eventStart.toISOString()}`,
    });

    downloadFile("recovery-suite-session.ics", ics, "text/calendar;charset=utf-8");
  }

  return (
    <div className="flex flex-1 flex-col gap-6 pb-10">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 pt-1">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400/85">
            Confirmed
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
            You’re booked.
          </h1>
          <p className="text-sm text-muted-foreground">
            {coach && clientName
              ? `A private suite is reserved for ${clientName}.`
              : "A private suite is reserved just for you."}
          </p>
        </div>
        <Link
          href="/suite"
          className="shrink-0 pt-1 text-sm font-medium text-emerald-400/90 hover:underline"
        >
          Done
        </Link>
      </div>

      <Card className="border-white/10 bg-slate-900/80 shadow-xl backdrop-blur-sm">
        <CardContent className="space-y-5 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-emerald-500/20">
              <CheckCircle2 className="h-7 w-7" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-semibold tracking-tight text-slate-50">
                Private Recovery Suite
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                25-minute private contrast therapy session
              </p>
            </div>
          </div>

          {dateIso && timeLabel ? (
            <ReservationSummaryCard
              suiteName="Private Recovery Suite"
              dateLabel={dateLabel}
              timeLabel={timeLabel}
              durationMinutes={25}
            />
          ) : (
            <Card className="border-white/10 bg-slate-900/45">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-slate-200">
                  Missing session details
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Go back and pick a date and time to confirm.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-4 min-h-11 w-full rounded-2xl border-white/15"
                >
                  <Link href="/suite/book">Back to booking</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          <RecoveryInfoCard />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              type="button"
              size="lg"
              className="min-h-14 rounded-2xl text-base shadow-lg shadow-emerald-900/30"
              onClick={handleAddToCalendar}
              disabled={!eventStart}
            >
              <CalendarPlus className="h-4 w-4" aria-hidden />
              Add to Calendar
            </Button>
            <Button
              asChild
              type="button"
              variant="outline"
              size="lg"
              className="min-h-14 rounded-2xl border-white/15 text-base"
            >
              <Link href="/suite/upcoming">View Reservations</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

