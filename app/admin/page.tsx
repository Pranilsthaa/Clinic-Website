import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { bookings, contactMessages, timeSlots } from "@/lib/db/schema";
import { desc, asc, count, eq } from "drizzle-orm";
import AdminDashboardClient from "./dashboard-client";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; tab?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1", 10);
  const limit = 10;
  const offset = (page - 1) * limit;

  // 1. Fetch exact total counts for global stats
  const [bookingsCountResult] = await db
    .select({ value: count() })
    .from(bookings);
  const totalBookings = bookingsCountResult?.value || 0;

  const [pendingBookingsResult] = await db
    .select({ value: count() })
    .from(bookings)
    .where(eq(bookings.status, "pending"));
  const pendingBookings = pendingBookingsResult?.value || 0;

  const [messagesCountResult] = await db
    .select({ value: count() })
    .from(contactMessages);
  const totalMessages = messagesCountResult?.value || 0;

  // 2. Fetch paginated bookings for the Bookings Tab
  const paginatedBookings = await db
    .select()
    .from(bookings)
    .orderBy(desc(bookings.createdAt))
    .limit(limit)
    .offset(offset);

  // 3. Fetch recent messages (recent 20 for preview / messages display)
  const recentMessages = await db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt))
    .limit(20);

  // 4. Fetch all configured timings/slots
  const allTimeSlots = await db
    .select()
    .from(timeSlots)
    .orderBy(asc(timeSlots.time));

  const totalPages = Math.ceil(totalBookings / limit);

  return (
    <AdminDashboardClient
      username={session.username}
      stats={{ totalBookings, pendingBookings, totalMessages }}
      bookings={paginatedBookings.map((b) => ({
        ...b,
        createdAt: b.createdAt.toISOString(),
        updatedAt: b.updatedAt.toISOString(),
      }))}
      messages={recentMessages.map((m) => ({
        ...m,
        createdAt: m.createdAt.toISOString(),
      }))}
      timeSlots={allTimeSlots.map(t => ({
        ...t,
        createdAt: t.createdAt.toISOString(),
      }))}
      pagination={{
        currentPage: page,
        totalPages: totalPages === 0 ? 1 : totalPages,
        totalItems: totalBookings,
        limit,
      }}
      initialTab={resolvedSearchParams.tab || "overview"}
    />
  );
}
