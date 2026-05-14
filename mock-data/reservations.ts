export type ReservationStatus = "upcoming" | "completed" | "cancelled";

export type SuiteReservation = {
  id: string;
  suiteName: string;
  startAtIso: string; // ISO string
  durationMinutes: 25;
  status: ReservationStatus;
};

export type SuiteDay = {
  dateIso: string; // YYYY-MM-DD in local time conceptually (POC)
  slots: Array<{
    startLabel: string; // e.g. "9:00 AM"
    startAtIso: string;
    available: boolean;
  }>;
};

const SUITE_NAME = "Private Recovery Suite";
const DURATION_MINUTES = 25 as const;

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function dateToYmd(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function atLocalTimeIso(date: Date, hours24: number, minutes: number) {
  const d = new Date(date);
  d.setHours(hours24, minutes, 0, 0);
  return d.toISOString();
}

const TIME_LABELS = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
] as const;

const TIME_LABEL_TO_HM: Record<(typeof TIME_LABELS)[number], [number, number]> = {
  "9:00 AM": [9, 0],
  "9:30 AM": [9, 30],
  "10:00 AM": [10, 0],
  "10:30 AM": [10, 30],
  "11:00 AM": [11, 0],
  "11:30 AM": [11, 30],
};

export function getMockSuiteDays(now = new Date()): SuiteDay[] {
  const base = new Date(now);
  base.setHours(0, 0, 0, 0);

  const days: Date[] = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(base);
    d.setDate(d.getDate() + i);
    return d;
  });

  // A couple intentionally unavailable times to show subtle disabled styling.
  const disabledByDayOffset: Record<number, Set<(typeof TIME_LABELS)[number]>> = {
    0: new Set(["10:30 AM"]),
    1: new Set(["9:30 AM", "11:00 AM"]),
    2: new Set(["9:00 AM"]),
  };

  return days.map((d, dayOffset) => {
    const disabled = disabledByDayOffset[dayOffset] ?? new Set();
    const dateIso = dateToYmd(d);

    const slots = TIME_LABELS.map((label) => {
      const [hh, mm] = TIME_LABEL_TO_HM[label];
      const startAtIso = atLocalTimeIso(d, hh, mm);
      return { startLabel: label, startAtIso, available: !disabled.has(label) };
    });

    return { dateIso, slots };
  });
}

export function getMockSuiteReservations(now = new Date()): {
  upcoming: SuiteReservation[];
  completed: SuiteReservation[];
} {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const upcoming: SuiteReservation[] = [
    {
      id: "res_upcoming_001",
      suiteName: SUITE_NAME,
      startAtIso: atLocalTimeIso(today, 10, 0),
      durationMinutes: DURATION_MINUTES,
      status: "upcoming",
    },
  ];

  const completed: SuiteReservation[] = [
    {
      id: "res_completed_001",
      suiteName: SUITE_NAME,
      startAtIso: atLocalTimeIso(yesterday, 9, 30),
      durationMinutes: DURATION_MINUTES,
      status: "completed",
    },
  ];

  return { upcoming, completed };
}

export function findNextAvailableSlot(
  days: SuiteDay[],
): { dateIso: string; startLabel: string; startAtIso: string } | null {
  for (const d of days) {
    const slot = d.slots.find((s) => s.available);
    if (slot) return { dateIso: d.dateIso, ...slot };
  }
  return null;
}

