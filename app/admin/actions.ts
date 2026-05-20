"use server";

import { db } from "@/lib/db";
import { adminUsers, bookings, timeSlots } from "@/lib/db/schema";
import { createSession, deleteSession, getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/email";

interface LoginState {
  success: boolean;
  message: string;
  errors: Record<string, string[]>;
  data?: Record<string, string>;
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = (formData.get("username") as string)?.trim();
  const password = formData.get("password") as string;

  // Validation
  const errors: Record<string, string[]> = {};
  if (!username) errors.username = ["Username is required."];
  if (!password) errors.password = ["Password is required."];

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please fill in all fields.",
      errors,
      data: { username },
    };
  }

  // Find user
  const user = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.username, username))
    .limit(1);

  if (user.length === 0) {
    return {
      success: false,
      message: "Invalid username or password.",
      errors: {},
      data: { username },
    };
  }

  const admin = user[0];

  // Verify password
  const validPassword = await bcrypt.compare(password, admin.passwordHash);
  if (!validPassword) {
    return {
      success: false,
      message: "Invalid username or password.",
      errors: {},
      data: { username },
    };
  }

  // Check if active
  if (!admin.isActive) {
    return {
      success: false,
      message: "This account has been deactivated.",
      errors: {},
      data: { username },
    };
  }

  // Create session and redirect
  await createSession(admin.id, admin.username);
  redirect("/admin");
}

export async function logoutAction() {
  await deleteSession();
  redirect("/admin/login");
}

export async function updateBookingStatus(id: string, newStatus: "confirmed" | "cancelled") {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  // Find the booking
  const bookingRecords = await db
    .select()
    .from(bookings)
    .where(eq(bookings.id, id))
    .limit(1);

  if (bookingRecords.length === 0) {
    throw new Error("Booking not found");
  }

  const booking = bookingRecords[0];

  // Update status
  await db
    .update(bookings)
    .set({ status: newStatus, updatedAt: new Date() })
    .where(eq(bookings.id, id));

  // Send email to client
  if (newStatus === "confirmed") {
    await sendEmail({
      to: booking.email,
      subject: "Appointment Confirmed",
      text: `Hi ${booking.firstName},\n\nYour appointment for ${booking.service} on ${booking.date} at ${booking.time} has been confirmed. We look forward to seeing you.\n\nBest regards,\nClinic Team`,
    });
  } else if (newStatus === "cancelled") {
    await sendEmail({
      to: booking.email,
      subject: "Appointment Cancelled",
      text: `Hi ${booking.firstName},\n\nWe regret to inform you that your appointment request for ${booking.service} on ${booking.date} at ${booking.time} has been cancelled.\n\nBest regards,\nClinic Team`,
    });
  }

  revalidatePath("/admin");
}

export async function addTimeSlot(time: string, label: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await db.insert(timeSlots).values({ time, label, isActive: true });
  revalidatePath("/admin");
}

export async function toggleTimeSlotState(id: string, currentIsActive: boolean) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await db.update(timeSlots).set({ isActive: !currentIsActive }).where(eq(timeSlots.id, id));
  revalidatePath("/admin");
}

export async function deleteTimeSlot(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await db.delete(timeSlots).where(eq(timeSlots.id, id));
  revalidatePath("/admin");
}
