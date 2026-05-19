"use server";

import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { createSession, deleteSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

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
