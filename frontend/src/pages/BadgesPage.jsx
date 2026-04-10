import { Award } from "lucide-react";
import { Link } from "react-router-dom";

import BadgeGrid from "../components/gamification/BadgeGrid";
import AppShell from "../components/ui/AppShell";
import Skeleton from "../components/ui/Skeleton";
import useDashboardData from "../hooks/useDashboardData";

function BadgesPage() {
  const { stats, loading } = useDashboardData();

  return (
    <AppShell
      title="Badge system"
      subtitle="Milestones and unlocks"
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
          <Skeleton className="h-[420px]" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="glass-panel rounded-[32px] p-6 shadow-glass">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Milestone tracking</p>
                <h2 className="mt-2 font-display text-3xl font-semibold">
                  Unlock badges as your routine gets stronger
                </h2>
                <p className="mt-3 max-w-2xl text-sm text-slate-500 dark:text-slate-300">
                  Each badge marks a meaningful milestone in consistency, calories, steps,
                  or workout volume.
                </p>
              </div>
              <div className="rounded-2xl bg-amber-500/10 p-3 text-amber-500">
                <Award className="h-6 w-6" />
              </div>
            </div>
          </div>
          <BadgeGrid badges={stats.badges} />
        </div>
      )}
    </AppShell>
  );
}

export default BadgesPage;
