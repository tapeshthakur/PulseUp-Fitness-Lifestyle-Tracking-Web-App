import { Award, Crown, Flame, Footprints, HeartPulse, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const iconMap = {
  Sparkles,
  HeartPulse,
  Flame,
  Footprints,
  Crown,
  Award,
};

function BadgeGrid({ badges }) {
  return (
    <div className="glass-panel rounded-[32px] p-6 shadow-glass">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Badge system</p>
          <h3 className="mt-1 font-display text-2xl font-semibold">Unlockable milestones</h3>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{badges.filter((badge) => badge.unlocked).length}/{badges.length} unlocked</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {badges.map((badge) => {
          const Icon = iconMap[badge.icon] || Award;
          return (
            <motion.div
              key={badge.key}
              whileHover={{ y: -4 }}
              className={`rounded-[28px] border p-5 transition ${
                badge.unlocked
                  ? "border-emerald-400/30 bg-emerald-500/10"
                  : "border-white/10 bg-slate-900/5 dark:bg-slate-950/30"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className={`rounded-2xl p-3 ${badge.unlocked ? "bg-emerald-500 text-white" : "bg-slate-300/40 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge.unlocked ? "bg-emerald-500/15 text-emerald-500" : "bg-slate-200/80 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}`}>
                  {badge.unlocked ? "Unlocked" : "Locked"}
                </span>
              </div>
              <h4 className="mt-4 font-semibold">{badge.name}</h4>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{badge.description}</p>
              <div className="mt-4 h-2 rounded-full bg-slate-200/80 dark:bg-slate-800">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-violet-500"
                  style={{ width: `${Math.min((badge.progress / badge.threshold) * 100, 100)}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {badge.progress} / {badge.threshold}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default BadgeGrid;
