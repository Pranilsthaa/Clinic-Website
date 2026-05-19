"use server";

/**
 * Contact form server action.
 * ─────────────────────────────
 * When PostgreSQL is connected, replace with a database INSERT
 * and optionally trigger an email notification.
 */

interface ContactState {
  success: boolean;
  message: string;
  errors: Record<string, string[]>;
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

  // Basic server-side validation
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
    };
  }

  // TODO: Insert into PostgreSQL
  // await db.insert(contactMessages).values(rawData);
  // TODO: Send email notification

  console.log("✉️ New contact message:", rawData);

  return {
    success: true,
    message:
      "Thank you for reaching out! We've received your message and will respond within 24 business hours.",
    errors: {},
  };
}
