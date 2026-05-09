"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const BODY_AREAS = ["Legs", "Back", "Shoulders", "Arms", "Knees"] as const;

const HYDRATION = ["Excellent", "Good", "Average", "Poor"] as const;

const SLEEP_HOURS = [
  "Under 5",
  "5–6",
  "6–7",
  "7–8",
  "8+",
] as const;

const MOODS = [
  "Motivated",
  "Neutral",
  "Stressed",
  "Exhausted",
  "Anxious",
] as const;

const STEP_TITLES = [
  "How sore do you feel?",
  "Hydration check",
  "Sleep quality",
  "Mood & energy",
] as const;

export function CheckInFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const [soreness, setSoreness] = useState([4]);
  const [areas, setAreas] = useState<string[]>([]);
  const [hydration, setHydration] = useState<(typeof HYDRATION)[number] | null>(
    null,
  );
  const [sleepHours, setSleepHours] = useState<
    (typeof SLEEP_HOURS)[number] | null
  >(null);
  const [sleepQuality, setSleepQuality] = useState([72]);
  const [mood, setMood] = useState<(typeof MOODS)[number] | null>(null);

  const sorenessLabel = useMemo(() => {
    const v = soreness[0] ?? 5;
    if (v <= 2) return "Fresh";
    if (v <= 5) return "Manageable";
    if (v <= 8) return "Elevated";
    return "Extremely sore";
  }, [soreness]);

  function toggleArea(area: string) {
    setAreas((prev) =>
      prev.includes(area)
        ? prev.filter((a) => a !== area)
        : [...prev, area],
    );
  }

  function canAdvance() {
    if (step === 1) return hydration !== null;
    if (step === 2) return sleepHours !== null;
    if (step === 3) return mood !== null;
    return true;
  }

  function handleNext() {
    if (step < STEP_TITLES.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    router.push("/");
  }

  function handleBack() {
    if (step === 0) return;
    setStep((s) => s - 1);
  }

  return (
    <div className="flex flex-1 flex-col gap-6 pb-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-1.5">
          {STEP_TITLES.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-2 w-8 rounded-full transition-colors",
                i === step
                  ? "bg-emerald-400/90"
                  : i < step
                    ? "bg-emerald-500/35"
                    : "bg-white/10",
              )}
            />
          ))}
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {step + 1} / {STEP_TITLES.length}
        </span>
      </div>

      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-slate-50">
          {STEP_TITLES[step]}
        </h2>
        <p className="text-sm text-muted-foreground">
          {step === 0 &&
            "Slide for overall soreness, then tap any trouble spots."}
          {step === 1 && "Quick tap — how hydrated do you feel today?"}
          {step === 2 && "Hours slept plus how restorative it felt."}
          {step === 3 && "Capture where your head is before training."}
        </p>
      </div>

      <Card className="flex-1 border-white/10 bg-slate-900/70 shadow-lg backdrop-blur-sm">
        <CardContent className="p-5">
          <div
            key={step}
            className="animate-fade-in space-y-6"
          >
            {step === 0 ? (
              <>
                <div className="space-y-4">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-4xl font-semibold tabular-nums text-slate-50">
                        {soreness[0]}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {sorenessLabel}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      1 = Fresh · 10 = Max
                    </span>
                  </div>
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={soreness}
                    onValueChange={setSoreness}
                    className="py-2"
                  />
                </div>
                <Separator className="bg-white/10" />
                <div className="space-y-3">
                  <p className="text-sm font-medium text-slate-200">
                    Body areas (optional)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {BODY_AREAS.map((area) => {
                      const active = areas.includes(area);
                      return (
                        <Button
                          key={area}
                          type="button"
                          variant={active ? "success" : "outline"}
                          size="sm"
                          className="min-h-11 rounded-full px-4"
                          onClick={() => toggleArea(area)}
                        >
                          {area}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : null}

            {step === 1 ? (
              <div className="grid grid-cols-2 gap-3">
                {HYDRATION.map((option) => {
                  const active = hydration === option;
                  return (
                    <Button
                      key={option}
                      type="button"
                      variant={active ? "success" : "outline"}
                      className="min-h-14 rounded-2xl text-base"
                      onClick={() => setHydration(option)}
                    >
                      {option}
                    </Button>
                  );
                })}
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-200">
                    Hours slept
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SLEEP_HOURS.map((h) => {
                      const active = sleepHours === h;
                      return (
                        <Button
                          key={h}
                          type="button"
                          variant={active ? "success" : "outline"}
                          size="sm"
                          className="min-h-11 rounded-full px-4"
                          onClick={() => setSleepHours(h)}
                        >
                          {h}
                        </Button>
                      );
                    })}
                  </div>
                </div>
                <Separator className="bg-white/10" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-slate-200">
                      Sleep quality
                    </p>
                    <span className="text-xs text-muted-foreground">
                      Terrible · Great
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={100}
                    step={5}
                    value={sleepQuality}
                    onValueChange={setSleepQuality}
                    className="py-2"
                  />
                  <p className="text-center text-sm text-muted-foreground">
                    Felt{" "}
                    <span className="font-medium text-slate-200">
                      {sleepQuality[0] < 35
                        ? "rough"
                        : sleepQuality[0] < 70
                          ? "okay"
                          : "restorative"}
                    </span>
                  </p>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {MOODS.map((m) => {
                  const active = mood === m;
                  return (
                    <Button
                      key={m}
                      type="button"
                      variant={active ? "success" : "outline"}
                      className="min-h-14 justify-start rounded-2xl px-4 text-left text-base"
                      onClick={() => setMood(m)}
                    >
                      {m}
                    </Button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <div className="mt-auto grid grid-cols-2 gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="min-h-14 rounded-2xl border-white/15 text-base"
          onClick={handleBack}
          disabled={step === 0}
        >
          Back
        </Button>
        <Button
          type="button"
          size="lg"
          className="min-h-14 rounded-2xl text-base shadow-lg shadow-emerald-900/30"
          onClick={handleNext}
          disabled={!canAdvance()}
        >
          {step === STEP_TITLES.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
}
