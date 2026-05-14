"use client";

import { Badge } from "@/components/ui/badge";
import type { ReservationStatus } from "@/mock-data/reservations";

const label: Record<ReservationStatus, string> = {
  upcoming: "Upcoming",
  completed: "Completed",
  cancelled: "Cancelled",
};

function variantFor(status: ReservationStatus) {
  if (status === "upcoming") return "success";
  if (status === "cancelled") return "warning";
  return "outline";
}

export function SessionStatusBadge({ status }: { status: ReservationStatus }) {
  return (
    <Badge
      variant={variantFor(status)}
      className="shrink-0 px-2 py-0.5 text-[11px]"
    >
      {label[status]}
    </Badge>
  );
}

