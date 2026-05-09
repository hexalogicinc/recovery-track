export type AthleteStatus = "healthy" | "watch" | "at-risk";

export interface TrainerAthlete {
  id: string;
  name: string;
  recoveryScore: number;
  lastCheckIn: string;
  sleep: string;
  soreness: string;
  mood: string;
  status: AthleteStatus;
}

export interface TrainerDashboardMock {
  teamName: string;
  stats: {
    totalAthletes: number;
    checkedIn: number;
    missedCheckIns: number;
    atRisk: number;
  };
  athletes: TrainerAthlete[];
}

export const trainerDashboardMock: TrainerDashboardMock = {
  teamName: "Sweat & Regret · East Bay chapter",
  stats: {
    totalAthletes: 28,
    checkedIn: 21,
    missedCheckIns: 7,
    atRisk: 4,
  },
  athletes: [
    {
      id: "1",
      name: "Alex Rivera",
      recoveryScore: 88,
      lastCheckIn: "Today · 7:42a",
      sleep: "7–8h",
      soreness: "Low",
      mood: "Motivated",
      status: "healthy",
    },
    {
      id: "2",
      name: "Jordan Lee",
      recoveryScore: 71,
      lastCheckIn: "Today · 6:15a",
      sleep: "6–7h",
      soreness: "Moderate",
      mood: "Neutral",
      status: "watch",
    },
    {
      id: "3",
      name: "Sam Okonkwo",
      recoveryScore: 54,
      lastCheckIn: "Yesterday",
      sleep: "Under 5",
      soreness: "High",
      mood: "Stressed",
      status: "at-risk",
    },
    {
      id: "4",
      name: "Taylor Chen",
      recoveryScore: 91,
      lastCheckIn: "Today · 8:03a",
      sleep: "8+",
      soreness: "Low",
      mood: "Motivated",
      status: "healthy",
    },
    {
      id: "5",
      name: "Riley Patel",
      recoveryScore: 63,
      lastCheckIn: "2 days ago",
      sleep: "5–6h",
      soreness: "Elevated",
      mood: "Exhausted",
      status: "at-risk",
    },
    {
      id: "6",
      name: "Casey Morgan",
      recoveryScore: 76,
      lastCheckIn: "Today · 7:10a",
      sleep: "7–8h",
      soreness: "Moderate",
      mood: "Neutral",
      status: "watch",
    },
  ],
};
