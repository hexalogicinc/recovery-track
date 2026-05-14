import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  CalendarPlus,
  Users,
  XCircle,
} from "lucide-react";

import { AthleteRowCard } from "@/components/athlete-row-card";
import { PageHeader } from "@/components/page-header";
import { SendReminderButton } from "@/components/send-reminder-button";
import { TrainerStatCard } from "@/components/trainer-stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trainerDashboardMock } from "@/mock-data/trainer";

export default function TrainerDashboardPage() {
  const { teamName, stats, athletes } = trainerDashboardMock;

  return (
    <div className="flex flex-1 flex-col gap-6 pb-24">
      <div className="flex items-start justify-between gap-3">
        <PageHeader title="Club roster" subtitle={teamName} />
        <Link
          href="/"
          className="shrink-0 pt-1 text-sm font-medium text-emerald-400/90 hover:underline"
        >
          Member home
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <TrainerStatCard
          label="Total athletes"
          value={stats.totalAthletes}
          icon={Users}
        />
        <TrainerStatCard
          label="Checked in"
          value={stats.checkedIn}
          icon={CheckCircle2}
          accent="success"
        />
        <TrainerStatCard
          label="Missed check-ins"
          value={stats.missedCheckIns}
          icon={XCircle}
          accent="warning"
        />
        <TrainerStatCard
          label="At-risk athletes"
          value={stats.atRisk}
          icon={AlertTriangle}
          accent="danger"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Roster
          </p>
          <span className="text-xs text-muted-foreground">
            Compliance-first snapshot
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {athletes.map((a) => (
            <AthleteRowCard key={a.id} athlete={a} />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Quick reserve
          </p>
          <span className="text-xs text-muted-foreground">Trainer shortcut</span>
        </div>

        <Card className="border-white/10 bg-slate-900/65 backdrop-blur-sm">
          <CardContent className="space-y-4 p-5">
            <div className="space-y-1">
              <p className="text-sm font-semibold tracking-tight text-slate-50">
                Reserve the private suite for a client
              </p>
              <p className="text-xs text-muted-foreground">
                Uses the same premium booking flow—just pre-fills who it’s for.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {athletes.slice(0, 3).map((a) => (
                <Button
                  key={a.id}
                  asChild
                  variant="outline"
                  className="min-h-12 justify-between rounded-2xl border-white/15 bg-transparent px-4"
                >
                  <Link
                    href={`/suite/book?coach=1&clientId=${encodeURIComponent(
                      a.id,
                    )}&clientName=${encodeURIComponent(a.name)}`}
                  >
                    <span className="truncate text-left">{a.name}</span>
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-300/90">
                      <CalendarPlus className="h-4 w-4" aria-hidden />
                      Reserve
                    </span>
                  </Link>
                </Button>
              ))}
            </div>

            <p className="text-[11px] text-muted-foreground">
              Tip: pick a time on the next screen, then confirm the suite.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="sticky bottom-0 -mx-4 border-t border-white/10 bg-[hsl(222_47%_6%)]/90 px-4 pb-2 pt-4 backdrop-blur-md">
        <SendReminderButton />
      </div>
    </div>
  );
}
