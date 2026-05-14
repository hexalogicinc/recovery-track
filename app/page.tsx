import Link from "next/link";
import {
  Activity,
  Droplets,
  Moon,
  Sparkles,
} from "lucide-react";

import { MetricSummaryCard } from "@/components/metric-summary-card";
import { PageHeader } from "@/components/page-header";
import { RecoveryScoreCard } from "@/components/recovery-score-card";
import { StreakCard } from "@/components/streak-card";
import { TrendPlaceholder } from "@/components/trend-placeholder";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { athleteHomeMock } from "@/mock-data/athlete";

const metricIcons = {
  sleep: Moon,
  hydration: Droplets,
  mood: Sparkles,
  soreness: Activity,
} as const;

export default function AthleteHomePage() {
  const data = athleteHomeMock;

  return (
    <div className="flex flex-1 flex-col gap-6">
      <PageHeader title={data.greetingLine} />

      <RecoveryScoreCard
        score={data.recoveryScore}
        message={data.statusMessage}
      />

      <Card className="overflow-hidden border-white/10 bg-gradient-to-br from-emerald-500/10 via-slate-900/80 to-slate-900/60 shadow-xl backdrop-blur-sm">
        <CardContent className="space-y-4 p-6">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400/85">
              Private Recovery Suite
            </p>
            <p className="text-xl font-semibold tracking-tight text-slate-50">
              25-minute contrast therapy
            </p>
            <p className="text-sm text-muted-foreground">
              Sauna + cold plunge access
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="min-h-14 w-full rounded-2xl text-base shadow-lg shadow-emerald-900/35"
          >
            <Link href="/suite">Reserve Session</Link>
          </Button>
        </CardContent>
      </Card>

      <Button
        asChild
        size="lg"
        className="min-h-14 w-full rounded-2xl text-base shadow-lg shadow-emerald-900/40"
      >
        <Link href="/check-in">Start Daily Check-In</Link>
      </Button>

      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Club summary
        </p>
        <div className="grid grid-cols-2 gap-3">
          {data.metrics.map((m) => (
            <MetricSummaryCard
              key={m.key}
              icon={metricIcons[m.key]}
              label={m.label}
              value={m.value}
              hint={m.hint}
            />
          ))}
        </div>
      </div>

      <StreakCard days={data.streakDays} label={data.streakLabel} />

      <TrendPlaceholder
        title={data.trendSectionTitle}
        caption={data.trendPlaceholderCaption}
      />

      <p className="text-center text-xs text-muted-foreground">
        Prototype ·{" "}
        <Link
          href="/trainer"
          className="font-medium text-emerald-400/90 underline-offset-4 hover:underline"
        >
          Coach view — club roster
        </Link>
      </p>
    </div>
  );
}
