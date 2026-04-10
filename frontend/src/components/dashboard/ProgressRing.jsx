function ProgressRing({ value, label, sublabel, color = "#6366f1" }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (Math.min(value, 100) / 100) * circumference;

  return (
    <div className="glass-panel rounded-[28px] p-5 text-center shadow-glass">
      <div className="relative mx-auto h-28 w-28">
        <svg viewBox="0 0 120 120" className="h-28 w-28 -rotate-90">
          <circle cx="60" cy="60" r={radius} stroke="rgba(148,163,184,.18)" strokeWidth="10" fill="none" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-display text-2xl font-semibold">{value}%</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Goal</p>
        </div>
      </div>
      <p className="mt-4 font-semibold">{label}</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{sublabel}</p>
    </div>
  );
}

export default ProgressRing;
