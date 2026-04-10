import { useEffect, useState } from "react";

import ActivityForm from "../components/activity/ActivityForm";
import ActivityTimeline from "../components/activity/ActivityTimeline";
import AppShell from "../components/ui/AppShell";
import ConfirmationModal from "../components/ui/ConfirmationModal";
import EmptyState from "../components/ui/EmptyState";
import Skeleton from "../components/ui/Skeleton";
import { useApp } from "../context/AppContext";
import { api } from "../lib/api";

function ActivityPage() {
  const { showToast } = useApp();
  const [scope, setScope] = useState("weekly");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const [confirmClear, setConfirmClear] = useState(false);

  const loadActivities = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/activities?scope=${scope}`);
      setActivities(response.data.activities);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, [scope]);

  const handleSubmit = async (payload) => {
    setPending(true);
    try {
      await api.post("/activities", payload);
      showToast({ title: "Activity saved", message: "Points, streaks, and badge progress have been updated." });
      await loadActivities();
    } finally {
      setPending(false);
    }
  };

  const confirmClearForm = () => {
    setConfirmClear(false);
    setResetSignal((current) => current + 1);
  };

  return (
    <AppShell title="Activity log" subtitle="Capture the work behind the results">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {[
            ["weekly", "Weekly"],
            ["daily", "Daily"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setScope(value)}
              className={`rounded-[20px] px-4 py-2 text-sm font-semibold transition ${
                scope === value
                  ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-glow"
                  : "glass-panel"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[0.92fr,1.08fr]">
          <ActivityForm onSubmit={handleSubmit} pending={pending} onRequestClear={() => setConfirmClear(true)} resetSignal={resetSignal} />
          {loading ? (
            <Skeleton className="h-[560px]" />
          ) : activities.length ? (
            <ActivityTimeline activities={activities} />
          ) : (
            <EmptyState
              title="No activities yet"
              description="Log your first workout to start earning points, building a streak, and unlocking badges."
            />
          )}
        </div>
      </div>
      <ConfirmationModal
        open={confirmClear}
        title="Clear the current activity draft?"
        description="This resets the form fields so you can start a fresh log entry."
        confirmLabel="Clear draft"
        onCancel={() => setConfirmClear(false)}
        onConfirm={confirmClearForm}
      />
    </AppShell>
  );
}

export default ActivityPage;
