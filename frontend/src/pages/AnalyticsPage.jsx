import { BarChart3, Flame, Footprints, Timer } from "lucide-react";
import { Link } from "react-router-dom";

import StatCard from "../components/dashboard/StatCard";
import WeeklyActivityChart from "../components/dashboard/WeeklyActivityChart";
import LeaderboardCard from "../components/gamification/LeaderboardCard";
import AppShell from "../components/ui/AppShell";
import Skeleton from "../components/ui/Skeleton";
import { useApp } from "../context/AppContext";
import useDashboardData from "../hooks/useDashboardData";

function AnalyticsPage() {
  const { user } = useApp();
  const { stats, leaders, loading } = useDashboardData();

  return (
    <AppShell
      title="Weekly activity graph"
      subtitle="Trends, movement, and momentum"
      highlight={
        <Link
          to="/activity"
          className="hidden rounded-[20px] bg-gradient-to-r from-sky-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-glow sm:inline-flex"
        >
          Add activity
        </Link>
      }
    >
      {loading || !stats ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
          </div>
          <Skeleton className="h-80" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="glass-panel rounded-[32px] p-6 shadow-glass">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Analytics hub</p>
                <h2 className="mt-2 font-display text-3xl font-semibold">
                  Read your weekly performance at a glance
                </h2>
              </div>
              <div className="rounded-2xl bg-indigo-500/10 p-3 text-indigo-500">
                <BarChart3 className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              icon={Footprints}
              label="Steps"
              value={stats.summary.steps.toLocaleString()}
              helper="Movement captured this cycle"
              accent="from-emerald-400 to-lime-500"
            />
            <StatCard
              icon={Flame}
              label="Calories"
              value={stats.summary.calories.toLocaleString()}
              helper="Energy burned so far"
              accent="from-rose-500 to-orange-500"
            />
            <StatCard
              icon={Timer}
              label="Workout time"
              value={`${stats.summary.workoutMinutes} min`}
              helper="Minutes invested in training"
              accent="from-sky-500 to-violet-500"
            />
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.2fr,0.8fr]">
            <WeeklyActivityChart data={stats.weekly} />
            <LeaderboardCard leaders={leaders} currentUserId={user?.id} />
          </div>
        </div>
      )}
    </AppShell>
  );
}

export default AnalyticsPage;
