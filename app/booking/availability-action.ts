"use server";

import { db } from "@/lib/db";
import { bookings, timeSlots } from "@/lib/db/schema";
import { eq, inArray, and, asc } from "drizzle-orm";

export async function getAvailableTimeSlots() {
  try {
    const slots = await db
      .select({ val: timeSlots.time, label: timeSlots.label })
      .from(timeSlots)
      .where(eq(timeSlots.isActive, true))
      .orderBy(asc(timeSlots.time));
    return slots;
  } catch (error) {
    console.error("Error fetching time slots:", error);
    return [];
  }
}

export async function getUnavailableTimes(date: string): Promise<string[]> {
  if (!date) return [];
  
  try {
    const existingBookings = await db
      .select({ time: bookings.time })
      .from(bookings)
      .where(
        and(
          eq(bookings.date, date),
          inArray(bookings.status, ["pending", "confirmed"])
        )
      );

    // Postgres time field typically returns a string like "08:00:00"
    // We only need the first 5 characters "08:00" to match our frontend options
    return existingBookings.map((b) => {
      // Ensure it's a string and grab the first 5 characters
      return typeof b.time === "string" ? b.time.substring(0, 5) : String(b.time);
    });
  } catch (error) {
    console.error("Error fetching unavailable times:", error);
    return [];
  }
}
