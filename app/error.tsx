"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[var(--color-background)] px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
          Something went wrong
        </h2>
        
        <p className="text-base text-neutral-500">
          We apologize for the inconvenience. An unexpected error has occurred in our system.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Try again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-white text-black border border-neutral-300 rounded-lg font-semibold hover:bg-neutral-50 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
