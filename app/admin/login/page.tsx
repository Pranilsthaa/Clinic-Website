"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

const initialState = {
  success: false,
  message: "",
  errors: {} as Record<string, string[]>,
  data: {} as Record<string, string>,
};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mx-auto mb-5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Admin Portal
          </h1>
          <p className="text-sm text-neutral-500 mt-2">
            Sign in to manage your clinic dashboard
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-8">
          {state.message && !state.success && (
            <div
              className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg text-sm text-red-700"
              aria-live="polite"
            >
              {state.message}
            </div>
          )}

          <form action={formAction} className="space-y-5">
            <div>
              <label
                htmlFor="login-username"
                className="block text-sm font-medium text-neutral-700 mb-1.5"
              >
                Username
              </label>
              <input
                type="text"
                id="login-username"
                name="username"
                required
                autoComplete="username"
                autoFocus
                defaultValue={state.data?.username || ""}
                className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm bg-white transition-all focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
                placeholder="Enter your username"
              />
              {state.errors?.username && (
                <p className="text-xs text-red-600 mt-1">
                  {state.errors.username[0]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-neutral-700 mb-1.5"
              >
                Password
              </label>
              <input
                type="password"
                id="login-password"
                name="password"
                required
                autoComplete="current-password"
                className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm bg-white transition-all focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
                placeholder="Enter your password"
              />
              {state.errors?.password && (
                <p className="text-xs text-red-600 mt-1">
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-black text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {pending ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in…
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-neutral-400 mt-6">
          Protected area. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}
