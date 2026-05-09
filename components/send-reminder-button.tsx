"use client";

import { Button } from "@/components/ui/button";

export function SendReminderButton() {
  return (
    <Button
      type="button"
      size="lg"
      variant="warning"
      className="min-h-14 w-full rounded-2xl text-base font-semibold text-slate-950 shadow-lg"
      onClick={() =>
        window.alert(
          "Reminder queued for club members who missed today’s check-in.",
        )
      }
    >
      Send Reminder
    </Button>
  );
}
