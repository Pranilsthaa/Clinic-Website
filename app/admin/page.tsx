import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { bookings, contactMessages } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import AdminDashboardClient from "./dashboard-client";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  // Fetch recent data
  const recentBookings = await db
    .select()
    .from(bookings)
    .orderBy(desc(bookings.createdAt))
    .limit(20);

  const recentMessages = await db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt))
    .limit(20);

  // Stats
  const totalBookings = recentBookings.length;
  const pendingBookings = recentBookings.filter(
    (b) => b.status === "pending"
  ).length;
  const totalMessages = recentMessages.length;

  return (
    <AdminDashboardClient
      username={session.username}
      stats={{ totalBookings, pendingBookings, totalMessages }}
      bookings={recentBookings.map((b) => ({
        ...b,
        createdAt: b.createdAt.toISOString(),
        updatedAt: b.updatedAt.toISOString(),
      }))}
      messages={recentMessages.map((m) => ({
        ...m,
        createdAt: m.createdAt.toISOString(),
      }))}
    />
  );
}
