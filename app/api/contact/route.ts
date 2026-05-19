import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";

/**
 * POST /api/contact
 * ──────────────────
 * REST API route for the contact form.
 * Inserts into PostgreSQL via Drizzle ORM.
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    const errors: Record<string, string> = {};
    if (!name) errors.name = "Name is required.";
    if (!email || !email.includes("@"))
      errors.email = "Valid email is required.";
    if (!message || message.length < 10)
      errors.message = "Message must be at least 10 characters.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    const [result] = await db
      .insert(contactMessages)
      .values({
        name,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
      })
      .returning({ id: contactMessages.id });

    return NextResponse.json(
      {
        success: true,
        message: "Message received. We'll respond within 24 hours.",
        messageId: result.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API contact error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
