import { Link, NavLink, useNavigate } from "react-router-dom";
import { Activity, Award, BarChart3, Home, LogOut, Menu, Target, Zap } from "lucide-react";
import { useState } from "react";

import { useApp } from "../../context/AppContext";
import ConfirmationModal from "./ConfirmationModal";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/challenges", label: "Challenges", icon: Target },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/badges", label: "Badges", icon: Award },
  { to: "/activity", label: "Activity", icon: Activity },
];

function AppShell({ title, subtitle, children, highlight }) {
  const navigate = useNavigate();
  const { user, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[280px,1fr]">
        <aside className="glass-panel sticky top-4 hidden h-[calc(100vh-2rem)] rounded-[32px] p-6 shadow-glass lg:flex lg:flex-col">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-500 text-white shadow-glow">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <p className="font-display text-xl font-semibold">PulseUp</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Fitness OS</p>
            </div>
          </Link>

          <nav className="mt-10 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-glow"
                        : "text-slate-500 hover:bg-white/5 dark:text-slate-300"
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-auto rounded-[28px] bg-gradient-to-br from-sky-500 to-violet-500 p-[1px]">
            <div className="rounded-[27px] bg-slate-950/85 p-5 text-white">
              <div className="inline-flex rounded-2xl bg-white/10 p-2">
                <Award className="h-5 w-5" />
              </div>
              <p className="mt-4 font-display text-xl font-semibold">Stay in your zone</p>
              <p className="mt-2 text-sm text-white/70">Small daily wins unlock streaks, badges, and leaderboard momentum.</p>
            </div>
          </div>
        </aside>

        <main className="space-y-4">
          <header className="glass-panel sticky top-4 z-30 rounded-[28px] px-4 py-4 shadow-glass sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileOpen((value) => !value)}
                  className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-2xl lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
                  <h1 className="font-display text-2xl font-semibold sm:text-3xl">{title}</h1>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {highlight}
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => setConfirmLogout(true)}
                  className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-2xl transition hover:text-rose-500"
                >
                  <LogOut className="h-5 w-5" />
                </button>
                <div className="hidden items-center gap-3 rounded-2xl bg-white/50 px-3 py-2 dark:bg-slate-950/40 sm:flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 text-sm font-bold text-white">
                    {user?.fullName?.slice(0, 1) || "P"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{user?.fullName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Member</p>
                  </div>
                </div>
              </div>
            </div>
            {mobileOpen ? (
              <div className="mt-4 grid gap-2 lg:hidden">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                          isActive
                            ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white"
                            : "bg-white/50 text-slate-600 dark:bg-slate-950/40 dark:text-slate-300"
                        }`
                      }
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </NavLink>
                  );
                })}
              </div>
            ) : null}
          </header>
          {children}
        </main>
      </div>
      <ConfirmationModal
        open={confirmLogout}
        title="Leave your dashboard?"
        description="We'll save your progress and sign you out securely."
        confirmLabel="Sign out"
        onCancel={() => setConfirmLogout(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}

export default AppShell;
