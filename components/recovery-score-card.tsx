import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface RecoveryScoreCardProps {
  score: number;
  message: string;
}

function scoreTone(score: number) {
  if (score >= 75) return { ring: "stroke-emerald-400", glow: "shadow-emerald-500/20" };
  if (score >= 60)
    return { ring: "stroke-amber-400", glow: "shadow-amber-500/15" };
  return { ring: "stroke-rose-400", glow: "shadow-rose-500/20" };
}

export function RecoveryScoreCard({ score, message }: RecoveryScoreCardProps) {
  const tone = scoreTone(score);
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;

  return (
    <Card
      className={cn(
        "overflow-hidden border-white/10 bg-slate-900/80 shadow-xl backdrop-blur-sm",
        tone.glow,
      )}
    >
      <CardContent className="flex flex-col items-center gap-5 p-6 pt-7">
        <div className="relative flex h-40 w-40 items-center justify-center">
          <svg
            className="h-full w-full -rotate-90"
            viewBox="0 0 120 120"
            aria-hidden
          >
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              className="stroke-white/10"
              strokeWidth="10"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              className={cn(tone.ring, "transition-all")}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-5xl font-semibold tracking-tight text-slate-50">
              {score}
            </span>
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              / 100
            </span>
          </div>
        </div>
        <div className="w-full space-y-2 text-center">
          <p className="text-sm leading-relaxed text-slate-200">{message}</p>
          <Progress value={score} className="h-2 bg-white/5" />
        </div>
      </CardContent>
    </Card>
  );
}
