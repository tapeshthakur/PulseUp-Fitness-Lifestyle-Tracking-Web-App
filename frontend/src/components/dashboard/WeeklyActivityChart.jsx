import { ResponsiveContainer, Area, AreaChart, CartesianGrid, Tooltip, XAxis } from "recharts";

function WeeklyActivityChart({ data }) {
  return (
    <div className="glass-panel rounded-[32px] p-6 shadow-glass">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Weekly activity graph</p>
          <h3 className="mt-1 font-display text-2xl font-semibold">Energy over the last 7 days</h3>
        </div>
        <div className="rounded-2xl bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-500">Live sync</div>
      </div>
      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="stepsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.55} />
                <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgba(148,163,184,0.18)" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(15,23,42,0.92)",
                color: "#fff",
              }}
            />
            <Area type="monotone" dataKey="steps" stroke="#60A5FA" strokeWidth={3} fill="url(#stepsFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeeklyActivityChart;
