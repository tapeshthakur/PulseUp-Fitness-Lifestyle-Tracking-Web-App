import { Award, CalendarRange, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";

const accentStyles = {
  sky: "from-sky-500 to-cyan-400",
  rose: "from-rose-500 to-orange-400",
  violet: "from-violet-500 to-fuchsia-500",
  emerald: "from-emerald-500 to-lime-400",
};

const sectionMeta = {
  daily: {
    title: "Daily challenges",
    icon: Target,
    helper: "Short-term goals that create repeat visits and momentum.",
  },
  weekly: {
    title: "Weekly challenges",
    icon: CalendarRange,
    helper: "Bigger milestones that reward consistency across the week.",
  },
};

function LevelCard({ level }) {
  return (
    <div className="rounded-[28px] bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 p-5 text-white shadow-glow">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/60">Level</p>
          <h3 className="mt-2 font-display text-4xl font-semibold">{level.currentLevel}</h3>
          <p className="mt-2 text-sm text-white/70">
            {level.currentXp} / {level.xpForNextLevel} XP toward the next tier
          </p>
        </div>
        <div className="rounded-2xl bg-white/10 p-3">
          <Zap className="h-6 w-6 text-sky-300" />
        </div>
      </div>
      <div className="mt-5 h-2 rounded-full bg-white/10">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-sky-400 to-violet-400"
          style={{ width: `${level.progress}%` }}
        />
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-white/8 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.18em] text-white/55">Progress</p>
          <p className="mt-2 text-lg font-semibold">{level.progress}% complete</p>
          <p className="mt-1 text-sm text-white/65">Steady momentum toward the next level.</p>
        </div>
        <div className="rounded-2xl bg-white/8 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.18em] text-white/55">Next unlock</p>
          <p className="mt-2 text-lg font-semibold">{level.nextLevelAt} total XP</p>
          <p className="mt-1 text-sm text-white/65">
            {Math.max(level.xpForNextLevel - level.currentXp, 0)} XP left to level up.
          </p>
        </div>
      </div>
    </div>
  );
}

function ChallengeSection({ label, items }) {
  const Icon = sectionMeta[label].icon;

  return (
    <div className="rounded-[28px] bg-white/50 p-5 dark:bg-slate-950/30">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold">{sectionMeta[label].title}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {sectionMeta[label].helper}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-900/5 p-3 dark:bg-white/5">
          <Icon className="h-5 w-5 text-indigo-500" />
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {items.map((challenge) => (
          <motion.div
            key={challenge.key}
            whileHover={{ y: -3 }}
            className="rounded-[24px] border border-white/10 bg-white/60 p-4 dark:bg-slate-900/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{challenge.title}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {challenge.description}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  challenge.completed
                    ? "bg-emerald-500/15 text-emerald-500"
                    : "bg-slate-900/5 text-slate-500 dark:bg-white/5 dark:text-slate-400"
                }`}
              >
                {challenge.completed ? "Completed" : `+${challenge.reward} XP`}
              </span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-slate-200/80 dark:bg-slate-800">
              <div
                className={`h-2 rounded-full bg-gradient-to-r ${accentStyles[challenge.accent]}`}
                style={{ width: `${challenge.progress}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>
                {challenge.current} / {challenge.target}
              </span>
              <span>{challenge.remaining === 0 ? "Goal hit" : `${challenge.remaining} to go`}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ChallengePanel({ challenges, level }) {
  return (
    <div className="glass-panel rounded-[32px] p-6 shadow-glass">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Challenge system</p>
          <h3 className="mt-1 font-display text-2xl font-semibold">What to do next</h3>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-2 text-sm font-semibold text-amber-500">
          <Award className="h-4 w-4" />
          {challenges.completedCount}/{challenges.totalCount} complete
        </div>
      </div>

      <div className="mt-6 grid items-start gap-4 xl:grid-cols-[0.85fr,1.15fr]">
        <LevelCard level={level} />
        <div className="grid gap-4 md:grid-cols-2">
          <ChallengeSection label="daily" items={challenges.daily} />
          <ChallengeSection label="weekly" items={challenges.weekly} />
        </div>
      </div>
    </div>
  );
}

export default ChallengePanel;
