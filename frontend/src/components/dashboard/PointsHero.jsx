import { Flame, Trophy } from "lucide-react";
import { motion } from "framer-motion";

function PointsHero({ points, streak }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-600 p-6 text-white shadow-glow"
    >
      <div className="floating-orb left-6 top-6 h-24 w-24 bg-white/30" />
      <div className="floating-orb bottom-5 right-5 h-20 w-20 bg-cyan-300/40" />
      <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
            <Trophy className="h-4 w-4" />
            Your gamified progress
          </div>
          <p className="mt-4 font-display text-4xl font-semibold md:text-5xl">{points.toLocaleString()} pts</p>
        </div>
        <div className="inline-flex items-center gap-3 self-start rounded-[24px] bg-slate-950/20 px-4 py-3 backdrop-blur-xl">
          <div className="rounded-2xl bg-orange-400/20 p-3">
            <Flame className="h-6 w-6 text-orange-200" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/70">Current streak</p>
            <p className="font-display text-2xl font-semibold">{streak} days</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PointsHero;
