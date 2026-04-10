import { motion } from "framer-motion";
import { ArrowRight, Award, HeartPulse, MoonStar, ShieldCheck, Sparkles, Trophy, Zap } from "lucide-react";
import { Link } from "react-router-dom";

import ThemeToggle from "../components/ui/ThemeToggle";
import heroCard from "../assets/hero-card.svg";

const features = [
  {
    icon: HeartPulse,
    title: "Daily wellness cockpit",
    description: "Track steps, calories, workouts, and motivation from one polished home base.",
  },
  {
    icon: Trophy,
    title: "Gamified momentum",
    description: "Points, badges, streaks, and ranks turn healthy routines into repeatable wins.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    description: "JWT-protected sessions and local persistence keep progress secure and reliable.",
  },
];

function LandingPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative overflow-hidden">
      <div className="floating-orb left-[-40px] top-16 h-40 w-40 bg-sky-400/25" />
      <div className="floating-orb right-0 top-24 h-56 w-56 bg-violet-400/20" />
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 text-white shadow-glow">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-xl font-semibold">PulseUp</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Fitness & lifestyle tracker</p>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/login" className="hidden rounded-2xl px-4 py-2 text-sm font-semibold sm:inline-flex">Login</Link>
          <Link to="/signup" className="rounded-2xl bg-gradient-to-r from-sky-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-glow">Signup</Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[1.05fr,0.95fr] lg:px-8 lg:pt-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/60 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm dark:bg-slate-950/30 dark:text-slate-300">
            <Sparkles className="h-4 w-4 text-violet-500" />
            Premium daily fitness experience
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-tight sm:text-6xl">
            Turn wellness into a <span className="hero-text">beautiful, motivating ritual.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            PulseUp blends activity tracking, premium analytics, and thoughtful gamification into a dashboard that feels closer to a real product than a class project.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/signup" className="inline-flex items-center justify-center gap-2 rounded-[24px] bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-4 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.01]">
              Start free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center rounded-[24px] border border-white/15 bg-white/60 px-6 py-4 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 dark:bg-slate-950/30">
              Explore demo login
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["24/7", "Focus on momentum"],
              ["7-day", "Insight graph"],
              ["5+", "Unlockable badges"],
            ].map(([value, label]) => (
              <div key={label} className="glass-panel rounded-[24px] p-4 shadow-glass">
                <p className="font-display text-2xl font-semibold">{value}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="glass-panel grid-pattern rounded-[40px] p-5 shadow-glass">
            <img src={heroCard} alt="PulseUp interface preview" className="w-full rounded-[28px]" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Features</p>
            <h2 className="mt-2 font-display text-4xl font-semibold">Designed like a modern wellness SaaS</h2>
          </div>
          <div className="hidden rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-500 md:block">Responsive, animated, premium</div>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} whileHover={{ y: -6 }} className="glass-panel rounded-[32px] p-6 shadow-glass">
                <div className="inline-flex rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 p-3 text-white shadow-glow">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-300">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[36px] bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 p-[1px] shadow-glow">
          <div className="rounded-[35px] bg-slate-950 px-8 py-10 text-white">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold">
                  <Award className="h-4 w-4 text-amber-300" />
                  Ready to build your streak?
                </div>
                <h2 className="mt-4 font-display text-4xl font-semibold">Start with the demo account or create your own profile.</h2>
              </div>
              <Link to="/signup" className="inline-flex items-center justify-center rounded-[24px] bg-white px-6 py-4 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default LandingPage;
