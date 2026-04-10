import { Link } from "react-router-dom";

import ChallengePanel from "../components/gamification/ChallengePanel";
import AppShell from "../components/ui/AppShell";
import Skeleton from "../components/ui/Skeleton";
import useDashboardData from "../hooks/useDashboardData";

function ChallengesPage() {
  const { stats, loading } = useDashboardData();

  return (
    <AppShell
      title="Challenge system"
      subtitle="Daily and weekly missions"
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
          <Skeleton className="h-40" />
          <Skeleton className="h-[520px]" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="glass-panel rounded-[32px] p-6 shadow-glass">
            <p className="text-sm text-slate-500 dark:text-slate-400">Overview</p>
            <h2 className="mt-2 font-display text-3xl font-semibold">
              Keep your habit loop moving
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-500 dark:text-slate-300">
              Focus on daily quick wins and weekly consistency goals. Completing challenges helps
              you level up faster and gives your workouts a clear next target.
            </p>
          </div>
          <ChallengePanel challenges={stats.challenges} level={stats.level} />
        </div>
      )}
    </AppShell>
  );
}

export default ChallengesPage;
