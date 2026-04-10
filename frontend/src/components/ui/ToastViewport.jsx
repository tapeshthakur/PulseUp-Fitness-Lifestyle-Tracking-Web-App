import { AnimatePresence, motion } from "framer-motion";

import { useApp } from "../../context/AppContext";

function ToastViewport() {
  const { toasts } = useApp();

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[min(92vw,360px)] flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            className="pointer-events-auto glass-panel rounded-3xl border border-white/15 px-4 py-4 shadow-glass"
          >
            <p className="text-sm font-semibold">{toast.title}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{toast.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ToastViewport;
