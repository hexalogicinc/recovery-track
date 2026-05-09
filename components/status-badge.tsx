import { Badge } from "@/components/ui/badge";
import type { AthleteStatus } from "@/mock-data/trainer";

const labels: Record<AthleteStatus, string> = {
  healthy: "Healthy",
  watch: "Watch",
  "at-risk": "At Risk",
};

export function StatusBadge({ status }: { status: AthleteStatus }) {
  const variant =
    status === "healthy"
      ? "success"
      : status === "watch"
        ? "warning"
        : "danger";

  return (
    <Badge variant={variant} className="shrink-0 px-2 py-0.5 text-[11px]">
      {labels[status]}
    </Badge>
  );
}
