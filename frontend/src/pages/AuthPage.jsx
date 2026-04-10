import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, UserRound, Zap } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useApp } from "../context/AppContext";

function AuthPage({ mode = "login" }) {
  const { login, signup, showToast } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: mode === "login" ? "demo@pulseup.app" : "",
    password: mode === "login" ? "demo123" : "",
  });

  const isLogin = mode === "login";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      if (isLogin) {
        await login({ email: form.email, password: form.password });
      } else {
        await signup(form);
      }
      showToast({
        title: isLogin ? "Welcome back" : "Account ready",
        message: isLogin ? "Your dashboard is synced and ready." : "Your new PulseUp profile is live.",
      });
      navigate(location.state?.from || "/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="floating-orb left-10 top-16 h-40 w-40 bg-sky-400/20" />
      <div className="floating-orb bottom-16 right-10 h-48 w-48 bg-violet-400/20" />
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="grid w-full max-w-6xl overflow-hidden rounded-[40px] shadow-glow lg:grid-cols-[1fr,0.92fr]">
        <div className="hidden bg-[image:var(--tw-gradient-stops)] from-sky-500 via-indigo-500 to-violet-600 p-10 text-white lg:block lg:bg-gradient-to-br">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-2xl font-semibold">PulseUp</p>
              <p className="text-sm text-white/70">Fitness & lifestyle tracker</p>
            </div>
          </div>
          <h1 className="mt-12 font-display text-5xl font-semibold leading-tight">{isLogin ? "Rejoin your streak." : "Create a lifestyle that compounds."}</h1>
          <p className="mt-5 max-w-lg text-sm leading-6 text-white/75">
            Smooth motion, focused hierarchy, and low-friction forms make the sign-in flow feel premium instead of transactional.
          </p>
        </div>
        <div className="glass-panel p-6 sm:p-10">
          <div className="mx-auto max-w-md">
            <p className="text-sm text-slate-500 dark:text-slate-400">{isLogin ? "Welcome back" : "Create account"}</p>
            <h2 className="mt-2 font-display text-4xl font-semibold">{isLogin ? "Login to PulseUp" : "Sign up for PulseUp"}</h2>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">Use the seeded demo login or create your own account.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {!isLogin ? (
                <label className="block space-y-2">
                  <span className="text-sm font-medium">Full name</span>
                  <div className="input-shell">
                    <UserRound className="h-5 w-5 text-slate-400" />
                    <input className="w-full bg-transparent outline-none" value={form.fullName} onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))} placeholder="Ariana Brooks" />
                  </div>
                </label>
              ) : null}

              <label className="block space-y-2">
                <span className="text-sm font-medium">Email</span>
                <div className="input-shell">
                  <Mail className="h-5 w-5 text-slate-400" />
                  <input type="email" className="w-full bg-transparent outline-none" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} placeholder="you@example.com" />
                </div>
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium">Password</span>
                <div className="input-shell">
                  <Lock className="h-5 w-5 text-slate-400" />
                  <input type={showPassword ? "text" : "password"} className="w-full bg-transparent outline-none" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} className="text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </label>

              <AnimatePresence>
                {error ? (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-500">
                    {error}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <button type="submit" disabled={pending} className="w-full rounded-[24px] bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-4 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70">
                {pending ? "Please wait..." : isLogin ? "Login" : "Create account"}
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-500 dark:text-slate-300">
              {isLogin ? "Need an account?" : "Already have an account?"}{" "}
              <Link to={isLogin ? "/signup" : "/login"} className="font-semibold text-indigo-500">
                {isLogin ? "Sign up" : "Login"}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AuthPage;
