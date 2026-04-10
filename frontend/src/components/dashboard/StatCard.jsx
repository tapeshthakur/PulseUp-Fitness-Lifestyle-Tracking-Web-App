import { motion } from "framer-motion";

function StatCard({ icon: Icon, label, value, helper, accent = "from-sky-500 to-violet-500" }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-panel rounded-[28px] p-5 shadow-glass"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-3 font-display text-3xl font-semibold">{value}</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{helper}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-glow`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}

export default StatCard;
