export type MetricKey = "sleep" | "hydration" | "mood" | "soreness";

export interface HomeMetric {
  key: MetricKey;
  label: string;
  value: string;
  hint: string;
}

export interface AthleteHomeMock {
  athleteFirstName: string;
  greetingLine: string;
  recoveryScore: number;
  statusMessage: string;
  metrics: HomeMetric[];
  streakDays: number;
  streakLabel: string;
  trendSectionTitle: string;
  trendPlaceholderCaption: string;
}

export const athleteHomeMock: AthleteHomeMock = {
  athleteFirstName: "Chris",
  greetingLine: "Good morning, Chris 👋",
  recoveryScore: 82,
  statusMessage: "You're recovering well today — keep the momentum.",
  metrics: [
    {
      key: "sleep",
      label: "Sleep",
      value: "7.5 hrs",
      hint: "Consistent wind-down",
    },
    {
      key: "hydration",
      label: "Hydration",
      value: "On track",
      hint: "3L yesterday",
    },
    {
      key: "mood",
      label: "Mood",
      value: "Steady",
      hint: "Low stress",
    },
    {
      key: "soreness",
      label: "Soreness",
      value: "Light",
      hint: "Lower body",
    },
  ],
  streakDays: 7,
  streakLabel: "Club check-in streak",
  trendSectionTitle: "Club pulse",
  trendPlaceholderCaption: "Trends will appear after a few more check-ins.",
};
