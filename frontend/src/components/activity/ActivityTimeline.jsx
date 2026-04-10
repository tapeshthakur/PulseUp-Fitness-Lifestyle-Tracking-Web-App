import { CalendarDays, Dumbbell, Footprints, Flame, Timer } from "lucide-react";

const activityMeta = {
  walking: { icon: Footprints, tone: "from-emerald-400 to-lime-500" },
  running: { icon: Flame, tone: "from-rose-500 to-orange-500" },
  strength: { icon: Dumbbell, tone: "from-indigo-500 to-violet-500" },
  yoga: { icon: Timer, tone: "from-sky-500 to-cyan-500" },
  cycling: { icon: CalendarDays, tone: "from-fuchsia-500 to-violet-500" },
  hiit: { icon: Flame, tone: "from-amber-400 to-rose-500" },
  swimming: { icon: Timer, tone: "from-cyan-500 to-blue-500" },
  meditation: { icon: CalendarDays, tone: "from-teal-400 to-emerald-500" },
};

function ActivityTimeline({ activities }) {
  return (
    <div className="glass-panel rounded-[32px] p-6 shadow-glass">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">Activity history</p>
        <h3 className="mt-1 font-display text-2xl font-semibold">Timeline view</h3>
      </div>
      <div className="mt-6 space-y-4">
        {activities.map((activity) => {
          const meta = activityMeta[activity.activityType] || activityMeta.walking;
          const Icon = meta.icon;
          return (
            <div key={activity.id} className="relative flex gap-4 rounded-[28px] bg-white/55 p-4 dark:bg-slate-950/35">
              <div className="flex flex-col items-center">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.tone} text-white shadow-glow`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-2 h-full w-px bg-slate-300/60 dark:bg-slate-800" />
              </div>
              <div className="flex-1 pb-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{activity.title}</p>
                    <p className="text-sm capitalize text-slate-500 dark:text-slate-400">{activity.activityType} • {activity.intensity}</p>
                  </div>
                  <span className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-white/5 dark:text-slate-400">{activity.activityDate}</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Duration</p>
                    <p className="mt-1 font-semibold">{activity.durationMinutes} min</p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Calories</p>
                    <p className="mt-1 font-semibold">{activity.calories}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Steps</p>
                    <p className="mt-1 font-semibold">{activity.steps.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Distance</p>
                    <p className="mt-1 font-semibold">{activity.distanceKm} km</p>
                  </div>
                </div>
                {activity.notes ? <p className="mt-4 text-sm text-slate-500 dark:text-slate-300">{activity.notes}</p> : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ActivityTimeline;
