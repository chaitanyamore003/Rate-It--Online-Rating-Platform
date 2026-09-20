import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { Users, Store, Star, Loader2 } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-neutral-400" size={28} />
      </div>
    );
  }

  // Stat card definitions — extracted so the JSX below stays a clean map rather
  const cards = [
    {
      label: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: Users,
      to: "/admin/users",
    },
    {
      label: "Total Stores",
      value: stats?.totalStores ?? 0,
      icon: Store,
      to: "/admin/stores",
    },
    {
      label: "Total Ratings",
      value: stats?.totalRatings ?? 0,
      icon: Star,
      // No `to` — this one is display-only.
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Overview
        </h2>
        <p className="mt-1.5 text-sm text-neutral-500">
          A snapshot of platform activity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, to }) => {
          const baseClass =
            "flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-5";

          const interactiveClass = to
            ? "transition hover:border-neutral-300"
            : "";

          const content = (
            <>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-neutral-900 text-white">
                <Icon size={20} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                  {label}
                </p>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900 tabular-nums">
                  {value}
                </p>
              </div>
            </>
          );

          if (to) {
            return (
              <Link
                key={label}
                to={to}
                className={`${baseClass} ${interactiveClass} text-inherit no-underline`}
              >
                {content}
              </Link>
            );
          }

          return (
            <div key={label} className={baseClass}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
