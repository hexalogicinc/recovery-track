import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Users,
  XCircle,
} from "lucide-react";

import { AthleteRowCard } from "@/components/athlete-row-card";
import { PageHeader } from "@/components/page-header";
import { SendReminderButton } from "@/components/send-reminder-button";
import { TrainerStatCard } from "@/components/trainer-stat-card";
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

      <div className="sticky bottom-0 -mx-4 border-t border-white/10 bg-[hsl(222_47%_6%)]/90 px-4 pb-2 pt-4 backdrop-blur-md">
        <SendReminderButton />
      </div>
    </div>
  );
}
