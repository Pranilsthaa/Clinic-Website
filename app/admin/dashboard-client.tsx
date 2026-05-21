"use client";

import { useState, useTransition, useEffect } from "react";
import { Toaster, toast } from 'sonner';
import { useRouter } from "next/navigation";
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
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
  initialTab?: string;
}

type Tab = "overview" | "bookings" | "messages" | "timings";

export default function AdminDashboardClient({
  username,
  stats,
  bookings,
  messages,
  timeSlots,
  pagination,
  initialTab,
}: DashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>((initialTab as Tab) || "overview");
  const [isPending, startTransition] = useTransition();

  const [newTime, setNewTime] = useState("");
  const [newLabel, setNewLabel] = useState("");
  
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    id: string | null;
    newStatus: "confirmed" | "cancelled" | null;
  }>({ isOpen: false, id: null, newStatus: null });

  // Lock body scroll and reset scroll container on activeTab change
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  useEffect(() => {
    const container = document.getElementById("admin-dashboard-container");
    if (container) {
      container.scrollTop = 0;
    }
  }, [activeTab]);

  const handleUpdateStatus = (id: string, newStatus: "confirmed" | "cancelled") => {
    startTransition(async () => {
      try {
        const res = await updateBookingStatus(id, newStatus);
        if (res.success) {
          toast.success(res.message);
          setConfirmModal({ isOpen: false, id: null, newStatus: null });
        } else {
          toast.error(res.message);
        }
      } catch (err) {
        toast.error("An unexpected error occurred.");
      }
    });
  };

  const handleAddTimeSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTime || !newLabel) return;
    startTransition(async () => {
      try {
        const res = await addTimeSlot(newTime, newLabel);
        if (res.success) {
          toast.success(res.message);
          setNewTime("");
          setNewLabel("");
        } else {
          toast.error(res.message);
        }
      } catch (err) {
        toast.error("An unexpected error occurred.");
      }
    });
  };

  const handleToggleTimeSlot = (id: string, currentIsActive: boolean) => {
    startTransition(async () => {
      try {
        const res = await toggleTimeSlotState(id, currentIsActive);
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } catch (err) {
        toast.error("An unexpected error occurred.");
      }
    });
  };

  const handleDeleteTimeSlot = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this time slot?")) return;
    startTransition(async () => {
      try {
        const res = await deleteTimeSlot(id);
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } catch (err) {
        toast.error("An unexpected error occurred.");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-50 flex flex-col overflow-hidden h-[100dvh] w-screen">
      {/* Top Bar */}
      <header className="bg-white border-b border-neutral-200 shrink-0">
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

      <div id="admin-dashboard-container" className="h-[calc(100dvh-64px)] overflow-y-auto overscroll-contain w-full py-8 px-6" style={{ WebkitOverflowScrolling: "touch" }}>
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex overflow-x-auto gap-1 bg-neutral-100 rounded-lg p-1 w-full sm:w-fit mb-8 hide-scrollbar scroll-smooth">
            {(["overview", "bookings", "messages", "timings"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === "bookings") {
                    router.push(`?tab=bookings&page=1`);
                  } else {
                    router.push(`?tab=${tab}`);
                  }
                }}
                className={`whitespace-nowrap px-4 py-2 sm:px-5 sm:py-2 rounded-md text-sm font-medium transition-all cursor-pointer text-center flex-shrink-0 ${activeTab === tab
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
        {activeTab === "bookings" && (
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-6">
              Bookings
            </h1>
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              {bookings.length === 0 ? (
                <p className="p-8 text-center text-neutral-500">
                  No bookings found.
                </p>
              ) : (
                <>
                  {/* Desktop view (table) */}
                  <div className="hidden md:block overflow-x-auto">
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
                                    onClick={() => setConfirmModal({ isOpen: true, id: b.id, newStatus: "confirmed" })}
                                    disabled={isPending}
                                    className="text-xs font-medium bg-black text-white px-3 py-1.5 rounded hover:bg-neutral-800 disabled:opacity-50 transition-colors cursor-pointer"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => setConfirmModal({ isOpen: true, id: b.id, newStatus: "cancelled" })}
                                    disabled={isPending}
                                    className="text-xs font-medium border border-red-200 text-red-600 px-3 py-1.5 rounded hover:bg-red-50 disabled:opacity-50 transition-colors cursor-pointer"
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

                  {/* Mobile view (cards) */}
                  <div className="block md:hidden divide-y divide-neutral-100">
                    {bookings.map((b) => (
                      <div key={b.id} className="p-5 flex flex-col gap-4">
                        {/* Header: Name, Status & Date */}
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-neutral-900 text-base">
                              {b.firstName} {b.lastName}
                            </p>
                            <p className="text-xs text-neutral-500 mt-0.5">
                              {b.email}
                            </p>
                          </div>
                          <StatusBadge status={b.status} />
                        </div>

                        {/* Booking Details Grid */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3 bg-neutral-50 p-3 rounded-lg border border-neutral-100 text-xs">
                          <div>
                            <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Service</span>
                            <span className="font-medium text-neutral-700 mt-0.5 block">{b.service}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Phone</span>
                            <a href={`tel:${b.phone}`} className="font-medium text-black hover:underline mt-0.5 block flex items-center gap-1.5">
                              <svg className="w-3.5 h-3.5 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                              </svg>
                              {b.phone}
                            </a>
                          </div>
                          <div>
                            <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Date</span>
                            <span className="font-medium text-neutral-700 mt-0.5 block">{b.date}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Time</span>
                            <span className="font-medium text-neutral-700 mt-0.5 block">{b.time}</span>
                          </div>
                        </div>

                        {/* Longer notes rendering */}
                        {b.notes && (
                          <div className="bg-neutral-50/50 p-3 rounded-lg border border-neutral-100 text-xs">
                            <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Notes</span>
                            <p className="text-neutral-600 font-normal leading-relaxed whitespace-pre-wrap">{b.notes}</p>
                          </div>
                        )}

                        {/* Actions */}
                        {b.status === "pending" && (
                          <div className="flex items-center gap-3 mt-1">
                            <button
                              onClick={() => setConfirmModal({ isOpen: true, id: b.id, newStatus: "confirmed" })}
                              disabled={isPending}
                              className="flex-1 text-xs font-semibold bg-black text-white py-2.5 rounded hover:bg-neutral-800 disabled:opacity-50 transition-colors text-center cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => setConfirmModal({ isOpen: true, id: b.id, newStatus: "cancelled" })}
                              disabled={isPending}
                              className="flex-1 text-xs font-semibold border border-red-200 text-red-600 py-2.5 rounded hover:bg-red-50 disabled:opacity-50 transition-colors text-center cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              {/* Pagination UI */}
              {pagination.totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-neutral-200 bg-neutral-50 text-sm text-neutral-600">
                  <div>
                    Showing <span className="font-semibold text-neutral-900">{((pagination.currentPage - 1) * pagination.limit) + 1}</span> to{" "}
                    <span className="font-semibold text-neutral-900">
                      {Math.min(pagination.currentPage * pagination.limit, pagination.totalItems)}
                    </span>{" "}
                    of <span className="font-semibold text-neutral-900">{pagination.totalItems}</span> bookings
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => router.push(`?tab=bookings&page=${pagination.currentPage - 1}`)}
                      disabled={pagination.currentPage <= 1 || isPending}
                      className="px-3 py-1.5 rounded border border-neutral-300 bg-white font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:hover:bg-white transition-colors cursor-pointer text-xs"
                    >
                      Previous
                    </button>
                    
                    {/* Page Numbers */}
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => {
                      const isNearCurrent = Math.abs(p - pagination.currentPage) <= 1;
                      const isFirstOrLast = p === 1 || p === pagination.totalPages;
                      
                      if (!isNearCurrent && !isFirstOrLast) {
                        if (p === 2 || p === pagination.totalPages - 1) {
                          return (
                            <span key={`ellipsis-${p}`} className="px-2 text-neutral-400">
                              ...
                            </span>
                          );
                        }
                        return null;
                      }

                      return (
                        <button
                          key={p}
                          onClick={() => router.push(`?tab=bookings&page=${p}`)}
                          disabled={p === pagination.currentPage || isPending}
                          className={`px-3 py-1.5 rounded border text-xs font-semibold transition-colors cursor-pointer ${
                            p === pagination.currentPage
                              ? "bg-black border-black text-white"
                              : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => router.push(`?tab=bookings&page=${pagination.currentPage + 1}`)}
                      disabled={pagination.currentPage >= pagination.totalPages || isPending}
                      className="px-3 py-1.5 rounded border border-neutral-300 bg-white font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:hover:bg-white transition-colors cursor-pointer text-xs"
                    >
                      Next
                    </button>
                  </div>
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

      {/* Toaster */}
      <Toaster position="top-right" richColors />

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl">
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Confirm {confirmModal.newStatus === "confirmed" ? "Approval" : "Rejection"}
            </h2>
            <p className="text-neutral-600 mb-6 text-sm">
              Are you sure you want to {confirmModal.newStatus === "confirmed" ? "approve" : "reject"} this booking? 
              An email notification will be sent to the patient automatically.
            </p>
            <div className="flex justify-end gap-3">
              <button
                disabled={isPending}
                onClick={() => setConfirmModal({ isOpen: false, id: null, newStatus: null })}
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={isPending}
                onClick={() => {
                  if (confirmModal.id && confirmModal.newStatus) {
                    handleUpdateStatus(confirmModal.id, confirmModal.newStatus);
                  }
                }}
                className={`px-4 py-2 text-sm font-medium text-white rounded transition-colors disabled:opacity-50 cursor-pointer ${
                  confirmModal.newStatus === "confirmed" ? "bg-black hover:bg-neutral-800" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isPending ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
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
