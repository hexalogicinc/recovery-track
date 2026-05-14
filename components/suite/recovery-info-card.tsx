"use client";

import { Droplets, Shirt, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type RecoveryInfoCardProps = {
  title?: string;
};

export function RecoveryInfoCard({ title = "A calm reminder" }: RecoveryInfoCardProps) {
  return (
    <Card className="border-white/10 bg-slate-900/60 backdrop-blur-sm">
      <CardContent className="space-y-4 p-5">
        <div>
          <p className="text-sm font-medium text-slate-200">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Take recovery at your own pace.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-white/10">
              <Droplets className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-medium text-slate-100">Arrive hydrated</p>
              <p className="text-xs text-muted-foreground">
                A little water beforehand goes a long way.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-white/10">
              <Shirt className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-medium text-slate-100">
                Bring comfortable clothing
              </p>
              <p className="text-xs text-muted-foreground">
                Think easy layers and a towel.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-white/10">
              <Sparkles className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-medium text-slate-100">
                Take recovery at your own pace
              </p>
              <p className="text-xs text-muted-foreground">
                Alternate sauna and cold plunge however you’d like.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

