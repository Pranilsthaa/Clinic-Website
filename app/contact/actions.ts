"use server";

/**
 * Contact form server action.
 * ──────────────────────────────
 * Validates form data and inserts into PostgreSQL via Drizzle ORM,
 * then sends an email notification.
 */

import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { sendEmail, sendNotificationEmail } from "@/lib/email";

interface ContactState {
  success: boolean;
  message: string;
  errors: Record<string, string[]>;
  data?: Record<string, string>;
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  };

  // Server-side validation
  const errors: Record<string, string[]> = {};

  if (!rawData.name) errors.name = ["Name is required."];
  if (!rawData.email || !rawData.email.includes("@"))
    errors.email = ["Please enter a valid email address."];
  if (!rawData.message || rawData.message.length < 10)
    errors.message = ["Message must be at least 10 characters."];

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please correct the errors below.",
      errors,
      data: rawData,
    };
  }

  try {
    await db.insert(contactMessages).values({
      name: rawData.name,
      email: rawData.email,
      phone: rawData.phone || null,
      subject: rawData.subject || null,
      message: rawData.message,
    });

    // Send email to admin
    await sendNotificationEmail(
      `New Contact Message: ${rawData.subject || "No Subject"}`,
      `You have received a new contact message.\n\nName: ${rawData.name}\nEmail: ${rawData.email}\nPhone: ${rawData.phone || "N/A"}\nSubject: ${rawData.subject || "N/A"}\n\nMessage:\n${rawData.message}`
    );

    // Send confirmation to user
    await sendEmail({
      to: rawData.email,
      subject: "We received your message",
      text: `Hi ${rawData.name},\n\nThank you for reaching out! We've received your message and will respond within 24 business hours.\n\nBest regards,\nClinic Team`,
    });

    return {
      success: true,
      message:
        "Thank you for reaching out! We've received your message and will respond within 24 business hours.",
      errors: {},
    };
  } catch (error) {
    console.error("Contact submission error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
      errors: {},
    };
  }
}
