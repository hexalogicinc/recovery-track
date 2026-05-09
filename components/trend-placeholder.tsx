import { Activity } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TrendPlaceholderProps {
  title: string;
  caption: string;
}

export function TrendPlaceholder({ title, caption }: TrendPlaceholderProps) {
  return (
    <Card className="border-dashed border-white/15 bg-slate-900/40">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" aria-hidden />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="relative h-28 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/90 ring-1 ring-inset ring-white/5">
          <div className="absolute inset-x-4 bottom-4 top-6 rounded-xl border border-white/5 bg-white/[0.03]">
            <div className="absolute inset-x-3 bottom-3 top-6 rounded-lg border border-dashed border-white/10 bg-gradient-to-t from-emerald-500/5 to-transparent" />
            <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between gap-1">
              {[40, 55, 48, 62, 58, 70, 66].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-emerald-500/25"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{caption}</p>
      </CardContent>
    </Card>
  );
}
