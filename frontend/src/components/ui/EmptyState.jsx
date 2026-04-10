import { AlertCircle } from "lucide-react";

import emptyStateArt from "../../assets/empty-state.svg";

function EmptyState({ title, description, action, illustration = emptyStateArt }) {
  return (
    <div className="glass-panel flex flex-col items-center justify-center rounded-[28px] border border-dashed border-white/15 px-6 py-10 text-center shadow-glass">
      <img src={illustration} alt="Empty state" className="h-36 w-auto" />
      <div className="mt-6 inline-flex rounded-full bg-slate-900/5 p-3 dark:bg-white/5">
        <AlertCircle className="h-5 w-5 text-indigo-500" />
      </div>
      <h3 className="mt-4 font-display text-2xl font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-300">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export default EmptyState;
