import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Use your verified domain in Resend here
const SENDER_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

interface SendEmailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: SendEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("Resend API Key is not configured. Skipping email sending.");
    return { success: false, error: "Not configured" };
  }

  try {
    const data = await resend.emails.send({
      from: `Clinic Admin <${SENDER_EMAIL}>`,
      to: [to],
      subject,
      text,
      html,
    });

    if (data.error) {
      console.error("Resend API error:", data.error);
      return { success: false, error: data.error };
    }

    console.log("Message sent: %s", data.data?.id);
    return { success: true, messageId: data.data?.id };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}

export async function sendNotificationEmail(subject: string, text: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return { success: false, error: "No admin email configured" };

  return sendEmail({
    to: adminEmail,
    subject,
    text,
  });
}
