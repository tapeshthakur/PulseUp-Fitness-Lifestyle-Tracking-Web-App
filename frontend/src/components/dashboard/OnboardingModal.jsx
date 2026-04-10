import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Sparkles, Target } from "lucide-react";

function OnboardingModal({ open, onComplete }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-[36px] bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 p-8 text-white shadow-glow"
          >
            <div className="floating-orb right-6 top-6 h-28 w-28 bg-sky-400/35" />
            <div className="floating-orb bottom-10 left-10 h-24 w-24 bg-violet-400/30" />
            <div className="relative grid gap-8 md:grid-cols-[1.1fr,0.9fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm">
                  <Sparkles className="h-4 w-4" />
                  First-time onboarding
                </div>
                <h2 className="mt-5 font-display text-4xl font-semibold">Build a rhythm, not just a record.</h2>
                <div className="mt-6 grid gap-3">
                  {[
                    "Log workouts in seconds with a guided activity form.",
                    "Stay consistent through streaks, badges, and leaderboard goals.",
                    "Use weekly insights to spot momentum and recovery patterns.",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/8 px-4 py-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                      <p className="text-sm text-white/85">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 self-end">
                <div className="rounded-[28px] bg-white/10 p-5 backdrop-blur-xl">
                  <Target className="h-6 w-6 text-sky-300" />
                  <p className="mt-4 font-display text-2xl font-semibold">Today’s mission</p>
                  <p className="mt-2 text-sm text-white/75">Log one workout, move your rings, and let the streak engine do the rest.</p>
                </div>
                <button
                  type="button"
                  onClick={onComplete}
                  className="rounded-[24px] bg-white px-5 py-4 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
                >
                  Enter PulseUp
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default OnboardingModal;
