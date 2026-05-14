"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type DateChip = {
  key: string;
  label: string;
  sublabel?: string;
};

type CompactDateSelectorProps = {
  dates: DateChip[];
  selectedKey: string;
  onChange: (key: string) => void;
};

export function CompactDateSelector({
  dates,
  selectedKey,
  onChange,
}: CompactDateSelectorProps) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-1">
      <div className="flex gap-2">
        {dates.map((d) => {
          const active = d.key === selectedKey;
          return (
            <motion.div
              key={d.key}
              layout
              transition={{ type: "spring", stiffness: 460, damping: 34 }}
            >
              <Button
                type="button"
                variant={active ? "success" : "outline"}
                onClick={() => onChange(d.key)}
                className={cn(
                  "h-auto min-h-12 flex-col items-start gap-0 rounded-2xl px-4 py-2.5 text-left",
                  active
                    ? "shadow-sm shadow-emerald-900/35"
                    : "border-white/12 bg-slate-900/40",
                )}
              >
                <span className="text-sm font-semibold">{d.label}</span>
                {d.sublabel ? (
                  <span
                    className={cn(
                      "text-[11px] font-medium",
                      active ? "text-emerald-50/85" : "text-muted-foreground",
                    )}
                  >
                    {d.sublabel}
                  </span>
                ) : null}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

