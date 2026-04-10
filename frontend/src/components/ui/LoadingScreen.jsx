import { motion } from "framer-motion";

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[rgb(var(--bg))] px-6">
      <div className="glass-panel relative overflow-hidden rounded-[32px] px-10 py-8 shadow-glass">
        <motion.div
          className="mx-auto h-16 w-16 rounded-[24px] bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-500"
          animate={{ rotate: 360, scale: [1, 1.08, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <p className="mt-5 text-center font-display text-2xl font-semibold">PulseUp</p>
        <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          Preparing your wellness cockpit...
        </p>
      </div>
    </div>
  );
}

export default LoadingScreen;
