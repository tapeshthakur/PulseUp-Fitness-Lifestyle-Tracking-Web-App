import { ActivitySquare, Flame, Footprints, Timer } from "lucide-react";
import { Link } from "react-router-dom";

import OnboardingModal from "../components/dashboard/OnboardingModal";
import PointsHero from "../components/dashboard/PointsHero";
import ProgressRing from "../components/dashboard/ProgressRing";
import StatCard from "../components/dashboard/StatCard";
import WeeklyActivityChart from "../components/dashboard/WeeklyActivityChart";
import LeaderboardCard from "../components/gamification/LeaderboardCard";
import AppShell from "../components/ui/AppShell";
import Skeleton from "../components/ui/Skeleton";
import { useApp } from "../context/AppContext";
import useDashboardData from "../hooks/useDashboardData";

function DashboardPage() {
  const { user, syncPreferences, showToast } = useApp();
  const { stats, leaders, loading } = useDashboardData();

  const finishOnboarding = async () => {
    await syncPreferences({ onboardingCompleted: true });
    showToast({
      title: "You are in",
      message: "Your onboarding is complete. Time to keep the streak going.",
    });
  };

  return (
    <AppShell
      title={`Welcome back, ${user?.fullName?.split(" ")[0] || "Athlete"}`}
      subtitle="Your fitness control center"
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
          <Skeleton className="h-52" />
          <div className="grid gap-4 md:grid-cols-3">
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
          </div>
          <Skeleton className="h-80" />
        </div>
      ) : (
        <div className="space-y-4">
          <PointsHero points={stats.summary.points} streak={stats.summary.streak} />

          <div className="grid gap-4 xl:grid-cols-[1.25fr,0.75fr]">
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
            <div className="glass-panel rounded-[32px] p-6 shadow-glass">
              <p className="text-sm text-slate-500 dark:text-slate-400">Motivation</p>
              <h3 className="mt-2 font-display text-2xl font-semibold">{stats.message}</h3>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-300">
                Your streak, recent sessions, and trend data are all moving in the right direction.
              </p>
              <div className="mt-6 inline-flex items-center gap-3 rounded-[24px] bg-white/55 px-4 py-3 dark:bg-slate-950/35">
                <ActivitySquare className="h-5 w-5 text-indigo-500" />
                <span className="text-sm font-semibold">
                  {stats.summary.activitiesLogged} sessions logged
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <ProgressRing
              value={stats.completion.steps}
              label="Step target"
              sublabel={`${stats.goals.steps.current.toLocaleString()} / ${stats.goals.steps.target.toLocaleString()}`}
              color="#22c55e"
            />
            <ProgressRing
              value={stats.completion.calories}
              label="Calorie target"
              sublabel={`${stats.goals.calories.current.toLocaleString()} / ${stats.goals.calories.target.toLocaleString()}`}
              color="#ef4444"
            />
            <ProgressRing
              value={stats.completion.minutes}
              label="Workout target"
              sublabel={`${stats.goals.minutes.current} / ${stats.goals.minutes.target} min`}
              color="#6366f1"
            />
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.2fr,0.8fr]">
            <WeeklyActivityChart data={stats.weekly} />
            <LeaderboardCard leaders={leaders} currentUserId={user?.id} />
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <Link
              to="/challenges"
              className="glass-panel rounded-[32px] p-6 shadow-glass transition hover:-translate-y-1"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">Challenge system</p>
              <h3 className="mt-2 font-display text-2xl font-semibold">Daily and weekly goals</h3>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
                See your missions, level progress, and reward-driven next steps.
              </p>
            </Link>
            <Link
              to="/analytics"
              className="glass-panel rounded-[32px] p-6 shadow-glass transition hover:-translate-y-1"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">Weekly activity graph</p>
              <h3 className="mt-2 font-display text-2xl font-semibold">Trends and momentum</h3>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
                Dive deeper into your performance graph and leaderboard standing.
              </p>
            </Link>
            <Link
              to="/badges"
              className="glass-panel rounded-[32px] p-6 shadow-glass transition hover:-translate-y-1"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">Badge system</p>
              <h3 className="mt-2 font-display text-2xl font-semibold">Milestones and unlocks</h3>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
                Track which achievements are unlocked and which ones are close.
              </p>
            </Link>
          </div>
        </div>
      )}
      <OnboardingModal open={!user?.onboardingCompleted} onComplete={finishOnboarding} />
    </AppShell>
  );
}

export default DashboardPage;
