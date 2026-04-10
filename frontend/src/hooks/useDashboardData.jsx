import { useEffect, useState } from "react";

import { api } from "../lib/api";

function useDashboardData() {
  const [stats, setStats] = useState(null);
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    Promise.all([api.get("/stats"), api.get("/leaderboard")])
      .then(([statsResponse, leadersResponse]) => {
        if (!cancelled) {
          setStats(statsResponse.data);
          setLeaders(leadersResponse.data.leaders);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    stats,
    leaders,
    loading,
  };
}

export default useDashboardData;
