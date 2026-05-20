"use client";

import { useState, useTransition } from "react";
import { logoutAction, updateBookingStatus, addTimeSlot, toggleTimeSlotState, deleteTimeSlot } from "./actions";

interface DashboardProps {
  username: string;
  stats: {
    totalBookings: number;
    pendingBookings: number;
    totalMessages: number;
  };
  bookings: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    service: string;
    notes: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
  }>;
  messages: Array<{
    id: string;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    createdAt: string;
  }>;
  timeSlots: Array<{
    id: string;
    time: string;
    label: string;
    isActive: boolean;
    createdAt: string;
  }>;
}

type Tab = "overview" | "appointments" | "messages" | "timings";

export default function AdminDashboardClient({
  username,
  stats,
  bookings,
  messages,
  timeSlots,
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isPending, startTransition] = useTransition();

  const [newTime, setNewTime] = useState("");
  const [newLabel, setNewLabel] = useState("");

  const handleUpdateStatus = (id: string, newStatus: "confirmed" | "cancelled") => {
    startTransition(async () => {
      await updateBookingStatus(id, newStatus);
    });
  };

  const handleAddTimeSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTime || !newLabel) return;
    startTransition(async () => {
      await addTimeSlot(newTime, newLabel);
      setNewTime("");
      setNewLabel("");
    });
  };

  const handleToggleTimeSlot = (id: string, currentIsActive: boolean) => {
    startTransition(async () => {
      await toggleTimeSlotState(id, currentIsActive);
    });
  };

  const handleDeleteTimeSlot = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this time slot?")) return;
    startTransition(async () => {
      await deleteTimeSlot(id);
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-50 overflow-auto">
      {/* Top Bar */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span className="font-semibold text-neutral-900 text-sm">
              Admin Panel
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-500">
              Signed in as{" "}
              <span className="font-medium text-neutral-900">{username}</span>
            </span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-1 bg-neutral-100 rounded-lg p-1 w-fit mb-8">
          {(["overview", "bookings", "messages", "timings"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${activeTab === tab
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-500 hover:text-neutral-700"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-6">
              Dashboard
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <StatCard
                label="Total Bookings"
                value={stats.totalBookings}
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                }
              />
              <StatCard
                label="Pending"
                value={stats.pendingBookings}
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                }
                highlight
              />
              <StatCard
                label="Messages"
                value={stats.totalMessages}
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                }
              />
            </div>

            {/* Quick Look */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                  Recent Bookings
                </h2>
                <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                  {bookings.length === 0 ? (
                    <p className="p-6 text-sm text-neutral-500">
                      No bookings yet.
                    </p>
                  ) : (
                    <div className="divide-y divide-neutral-100">
                      {bookings.slice(0, 5).map((b) => (
                        <div
                          key={b.id}
                          className="px-5 py-4 flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm font-medium text-neutral-900">
                              {b.firstName} {b.lastName}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {b.service} • {b.date} at {b.time}
                            </p>
                          </div>
                          <StatusBadge status={b.status} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                  Recent Messages
                </h2>
                <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                  {messages.length === 0 ? (
                    <p className="p-6 text-sm text-neutral-500">
                      No messages yet.
                    </p>
                  ) : (
                    <div className="divide-y divide-neutral-100">
                      {messages.slice(0, 5).map((m) => (
                        <div key={m.id} className="px-5 py-4">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-neutral-900">
                              {m.name}
                            </p>
                            <p className="text-xs text-neutral-400">
                              {new Date(m.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="text-xs text-neutral-500 line-clamp-2">
                            {m.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Table */}
        {activeTab === "appointments" && (
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-6">
              Appointments
            </h1>
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              {bookings.length === 0 ? (
                <p className="p-8 text-center text-neutral-500">
                  No appointments found.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-200 bg-neutral-50">
                        <th className="text-left px-5 py-3 font-medium text-neutral-600">
                          Patient
                        </th>
                        <th className="text-left px-5 py-3 font-medium text-neutral-600">
                          Service
                        </th>
                        <th className="text-left px-5 py-3 font-medium text-neutral-600">
                          Date
                        </th>
                        <th className="text-left px-5 py-3 font-medium text-neutral-600">
                          Time
                        </th>
                        <th className="text-left px-5 py-3 font-medium text-neutral-600">
                          Phone
                        </th>
                        <th className="text-left px-5 py-3 font-medium text-neutral-600">
                          Status
                        </th>
                        <th className="text-left px-5 py-3 font-medium text-neutral-600">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {bookings.map((b) => (
                        <tr
                          key={b.id}
                          className="hover:bg-neutral-50 transition-colors"
                        >
                          <td className="px-5 py-4">
                            <p className="font-medium text-neutral-900">
                              {b.firstName} {b.lastName}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {b.email}
                            </p>
                          </td>
                          <td className="px-5 py-4 text-neutral-700">
                            {b.service}
                          </td>
                          <td className="px-5 py-4 text-neutral-700">
                            {b.date}
                          </td>
                          <td className="px-5 py-4 text-neutral-700">
                            {b.time}
                          </td>
                          <td className="px-5 py-4 text-neutral-700">
                            {b.phone}
                          </td>
                          <td className="px-5 py-4">
                            <StatusBadge status={b.status} />
                          </td>
                          <td className="px-5 py-4">
                            {b.status === "pending" && (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleUpdateStatus(b.id, "confirmed")}
                                  disabled={isPending}
                                  className="text-xs font-medium bg-black text-white px-3 py-1.5 rounded hover:bg-neutral-800 disabled:opacity-50 transition-colors"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleUpdateStatus(b.id, "cancelled")}
                                  disabled={isPending}
                                  className="text-xs font-medium border border-red-200 text-red-600 px-3 py-1.5 rounded hover:bg-red-50 disabled:opacity-50 transition-colors"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Messages Table */}
        {activeTab === "messages" && (
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-6">
              Contact Messages
            </h1>
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              {messages.length === 0 ? (
                <p className="p-8 text-center text-neutral-500">
                  No messages found.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-200 bg-neutral-50">
                        <th className="text-left px-5 py-3 font-medium text-neutral-600">
                          Name
                        </th>
                        <th className="text-left px-5 py-3 font-medium text-neutral-600">
                          Email
                        </th>
                        <th className="text-left px-5 py-3 font-medium text-neutral-600">
                          Subject
                        </th>
                        <th className="text-left px-5 py-3 font-medium text-neutral-600">
                          Message
                        </th>
                        <th className="text-left px-5 py-3 font-medium text-neutral-600">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {messages.map((m) => (
                        <tr
                          key={m.id}
                          className="hover:bg-neutral-50 transition-colors"
                        >
                          <td className="px-5 py-4 font-medium text-neutral-900">
                            {m.name}
                          </td>
                          <td className="px-5 py-4 text-neutral-700">
                            {m.email}
                          </td>
                          <td className="px-5 py-4 text-neutral-700">
                            {m.subject || "—"}
                          </td>
                          <td className="px-5 py-4 text-neutral-700 max-w-xs truncate">
                            {m.message}
                          </td>
                          <td className="px-5 py-4 text-neutral-500 text-xs whitespace-nowrap">
                            {new Date(m.createdAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Timings Table */}
        {activeTab === "timings" && (
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-6">
              Manage Time Slots
            </h1>

            <div className="bg-white rounded-xl border border-neutral-200 p-6 mb-8">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Add New Time Slot</h2>
              <form onSubmit={handleAddTimeSlot} className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="w-full sm:w-1/3">
                  <label className="block text-xs font-semibold tracking-[0.05em] uppercase text-[var(--color-foreground-muted)] mb-2">Time (24h or AM/PM)</label>
                  <input type="time" required value={newTime} onChange={e => setNewTime(e.target.value)} className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:border-black focus:outline-none" />
                </div>
                <div className="w-full sm:w-1/3">
                  <label className="block text-xs font-semibold tracking-[0.05em] uppercase text-[var(--color-foreground-muted)] mb-2">Label (e.g. 8:00 AM)</label>
                  <input type="text" required value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="e.g. 8:00 AM" className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:border-black focus:outline-none" />
                </div>
                <button type="submit" disabled={isPending} className="bg-black text-white text-sm font-semibold px-6 py-2 h-[38px] rounded hover:bg-neutral-800 disabled:opacity-50 transition-colors">
                  Add Slot
                </button>
              </form>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              {timeSlots.length === 0 ? (
                <p className="p-8 text-center text-neutral-500">
                  No time slots configured.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-200 bg-neutral-50">
                        <th className="text-left px-5 py-3 font-medium text-neutral-600">
                          Time Value
                        </th>
                        <th className="text-left px-5 py-3 font-medium text-neutral-600">
                          Label
                        </th>
                        <th className="text-left px-5 py-3 font-medium text-neutral-600">
                          Status
                        </th>
                        <th className="text-left px-5 py-3 font-medium text-neutral-600">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {timeSlots.map((t) => (
                        <tr
                          key={t.id}
                          className="hover:bg-neutral-50 transition-colors"
                        >
                          <td className="px-5 py-4 font-medium text-neutral-900">
                            {t.time}
                          </td>
                          <td className="px-5 py-4 text-neutral-700">
                            {t.label}
                          </td>
                          <td className="px-5 py-4">
                            <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${t.isActive ? "bg-green-100 text-green-800 border-green-200" : "bg-neutral-100 text-neutral-700 border-neutral-200"}`}>
                              {t.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleToggleTimeSlot(t.id, t.isActive)} disabled={isPending} className="text-xs font-medium border border-neutral-300 px-3 py-1.5 rounded hover:bg-neutral-100 disabled:opacity-50 transition-colors">
                                {t.isActive ? "Disable" : "Enable"}
                              </button>
                              <button onClick={() => handleDeleteTimeSlot(t.id)} disabled={isPending} className="text-xs font-medium border border-red-200 text-red-600 px-3 py-1.5 rounded hover:bg-red-50 disabled:opacity-50 transition-colors">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────

function StatCard({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-6 ${highlight
        ? "bg-amber-50 border-amber-200"
        : "bg-white border-neutral-200"
        }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-neutral-500">{label}</span>
        <div className="text-neutral-400">{icon}</div>
      </div>
      <p className="text-3xl font-bold text-neutral-900">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending:
      "bg-amber-100 text-amber-800 border-amber-200",
    confirmed:
      "bg-green-100 text-green-800 border-green-200",
    cancelled:
      "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <span
      className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${styles[status] || "bg-neutral-100 text-neutral-700 border-neutral-200"
        }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
