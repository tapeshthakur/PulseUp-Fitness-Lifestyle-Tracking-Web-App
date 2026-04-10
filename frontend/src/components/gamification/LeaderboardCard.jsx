import { Crown, Medal, Trophy } from "lucide-react";

const medalTone = {
  1: "from-amber-300 to-orange-500",
  2: "from-slate-300 to-slate-500",
  3: "from-orange-300 to-amber-700",
};

function LeaderboardCard({ leaders, currentUserId }) {
  return (
    <div className="glass-panel rounded-[32px] p-6 shadow-glass">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Leaderboard</p>
          <h3 className="mt-1 font-display text-2xl font-semibold">Weekly momentum ranks</h3>
        </div>
        <Trophy className="h-5 w-5 text-amber-500" />
      </div>
      <div className="mt-6 space-y-3">
        {leaders.map((leader) => (
          <div
            key={leader.userId}
            className={`flex items-center gap-4 rounded-[24px] border px-4 py-3 ${
              leader.userId === currentUserId ? "border-sky-400/40 bg-sky-500/10" : "border-white/10 bg-white/50 dark:bg-slate-950/30"
            }`}
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${medalTone[leader.rank] || "from-sky-500 to-violet-500"} text-white shadow-glow`}>
              {leader.rank === 1 ? <Crown className="h-5 w-5" /> : <Medal className="h-5 w-5" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate font-semibold">{leader.name}</p>
                <span className="rounded-full bg-slate-900/5 px-2 py-0.5 text-xs text-slate-500 dark:bg-white/5 dark:text-slate-400">#{leader.rank}</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{leader.steps.toLocaleString()} steps • {leader.minutes} min</p>
            </div>
            <p className="font-display text-xl font-semibold">{leader.points}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaderboardCard;
