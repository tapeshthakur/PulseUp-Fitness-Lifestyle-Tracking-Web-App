import { CalendarDays, Dumbbell, Flame, Footprints, HeartPulse, Waves, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const activityOptions = [
  { value: "walking", label: "Walking", icon: Footprints },
  { value: "running", label: "Running", icon: Flame },
  { value: "strength", label: "Strength", icon: Dumbbell },
  { value: "cycling", label: "Cycling", icon: Zap },
  { value: "yoga", label: "Yoga", icon: HeartPulse },
  { value: "swimming", label: "Swimming", icon: Waves },
];

const buildInitialState = () => ({
  title: "",
  activityType: "running",
  durationMinutes: 35,
  calories: 280,
  steps: 4200,
  distanceKm: 4.2,
  intensity: "moderate",
  notes: "",
  activityDate: new Date().toISOString().slice(0, 10),
});

function ActivityForm({ onSubmit, pending, onRequestClear, resetSignal }) {
  const [form, setForm] = useState(buildInitialState());

  useEffect(() => {
    setForm(buildInitialState());
  }, [resetSignal]);

  const activeOption = useMemo(
    () => activityOptions.find((option) => option.value === form.activityType) || activityOptions[0],
    [form.activityType],
  );

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit({
      ...form,
      durationMinutes: Number(form.durationMinutes),
      calories: Number(form.calories),
      steps: Number(form.steps),
      distanceKm: Number(form.distanceKm),
    });
    setForm(buildInitialState());
  };

  const Icon = activeOption.icon;

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-[32px] p-6 shadow-glass">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Add activity</p>
          <h3 className="mt-1 font-display text-2xl font-semibold">Log a new session</h3>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-gradient-to-br from-sky-500 to-violet-500 text-white shadow-glow">
          <Icon className="h-6 w-6" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium">Session title</span>
          <input className="input-shell w-full bg-transparent outline-none" value={form.title} onChange={(event) => handleChange("title", event.target.value)} placeholder="Morning power run" />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Activity type</span>
          <select className="input-shell w-full bg-transparent outline-none" value={form.activityType} onChange={(event) => handleChange("activityType", event.target.value)}>
            {activityOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Duration (minutes)</span>
          <input type="number" className="input-shell w-full bg-transparent outline-none" value={form.durationMinutes} onChange={(event) => handleChange("durationMinutes", event.target.value)} />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Calories</span>
          <input type="number" className="input-shell w-full bg-transparent outline-none" value={form.calories} onChange={(event) => handleChange("calories", event.target.value)} />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Steps</span>
          <input type="number" className="input-shell w-full bg-transparent outline-none" value={form.steps} onChange={(event) => handleChange("steps", event.target.value)} />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Distance (km)</span>
          <input type="number" step="0.1" className="input-shell w-full bg-transparent outline-none" value={form.distanceKm} onChange={(event) => handleChange("distanceKm", event.target.value)} />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Intensity</span>
          <select className="input-shell w-full bg-transparent outline-none" value={form.intensity} onChange={(event) => handleChange("intensity", event.target.value)}>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="intense">Intense</option>
          </select>
        </label>
        <label className="space-y-2">
          <span className="flex items-center gap-2 text-sm font-medium"><CalendarDays className="h-4 w-4" />Activity date</span>
          <input type="date" className="input-shell w-full bg-transparent outline-none" value={form.activityDate} onChange={(event) => handleChange("activityDate", event.target.value)} />
        </label>
      </div>

      <label className="mt-4 block space-y-2">
        <span className="text-sm font-medium">Notes</span>
        <textarea className="input-shell min-h-28 w-full bg-transparent outline-none" value={form.notes} onChange={(event) => handleChange("notes", event.target.value)} placeholder="How did the session feel?" />
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="submit" disabled={pending} className="rounded-[22px] bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70">
          {pending ? "Saving session..." : "Save activity"}
        </button>
        <button type="button" onClick={onRequestClear} className="rounded-[22px] border border-white/15 px-5 py-3 text-sm font-semibold transition hover:bg-white/5">
          Clear form
        </button>
      </div>
    </form>
  );
}

export default ActivityForm;
