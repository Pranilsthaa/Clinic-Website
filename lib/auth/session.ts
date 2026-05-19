import "server-only";
import { cookies } from "next/headers";

const SECRET = process.env.SESSION_SECRET || "fallback-dev-secret-change-me";

/**
 * Simple HMAC-based session token.
 * Payload: base64(JSON) + "." + base64(HMAC-SHA256 signature)
 */

interface SessionPayload {
  userId: string;
  username: string;
  expiresAt: number;
}

async function sign(payload: SessionPayload): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const data = btoa(JSON.stringify(payload));
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(data)
  );

  const sigBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)));
  return `${data}.${sigBase64}`;
}

async function verify(token: string): Promise<SessionPayload | null> {
  try {
    const [data, sigBase64] = token.split(".");
    if (!data || !sigBase64) return null;

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const signature = Uint8Array.from(atob(sigBase64), (c) => c.charCodeAt(0));
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      signature,
      encoder.encode(data)
    );

    if (!valid) return null;

    const payload: SessionPayload = JSON.parse(atob(data));

    // Check expiration
    if (Date.now() > payload.expiresAt) return null;

    return payload;
  } catch {
    return null;
  }
}

// ─── Public API ─────────────────────────────────────────────

export async function createSession(userId: string, username: string) {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const token = await sign({ userId, username, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(expiresAt),
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return null;
  return verify(token);
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}
