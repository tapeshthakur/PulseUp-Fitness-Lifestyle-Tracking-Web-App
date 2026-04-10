import { AnimatePresence, motion } from "framer-motion";

function ConfirmationModal({ open, title, description, onConfirm, onCancel, confirmLabel = "Confirm" }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            className="glass-panel w-full max-w-md rounded-[32px] p-6 shadow-glass"
          >
            <h3 className="font-display text-2xl font-semibold">{title}</h3>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">{description}</p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 rounded-2xl border border-white/15 px-4 py-3 text-sm font-semibold transition hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="flex-1 rounded-2xl bg-gradient-to-r from-sky-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.01]"
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default ConfirmationModal;
