"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type TimeSlotCardProps = {
  label: string;
  sublabel?: string;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
};

export function TimeSlotCard({
  label,
  sublabel,
  selected,
  disabled,
  onSelect,
}: TimeSlotCardProps) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      animate={
        selected
          ? { scale: 1, y: 0, opacity: 1 }
          : disabled
            ? { scale: 1, y: 0, opacity: 0.5 }
            : { scale: 1, y: 0, opacity: 1 }
      }
      transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.6 }}
      className={cn(
        "group relative flex w-full items-center justify-between gap-4 rounded-3xl border px-5 py-4 text-left outline-none ring-offset-background transition-colors",
        "border-white/10 bg-slate-900/60 shadow-sm backdrop-blur-sm",
        "focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2",
        !disabled && "hover:bg-slate-900/75",
        selected && "border-emerald-500/35 bg-emerald-500/10",
        disabled && "cursor-not-allowed",
      )}
    >
      <div className="min-w-0">
        <p
          className={cn(
            "text-base font-semibold tracking-tight",
            selected ? "text-emerald-200" : "text-slate-50",
          )}
        >
          {label}
        </p>
        {sublabel ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{sublabel}</p>
        ) : null}
      </div>

      <div
        className={cn(
          "h-3 w-3 shrink-0 rounded-full ring-1 ring-inset transition-colors",
          selected
            ? "bg-emerald-400 ring-emerald-300/50"
            : "bg-white/5 ring-white/15 group-hover:bg-white/10",
        )}
        aria-hidden
      />
    </motion.button>
  );
}

