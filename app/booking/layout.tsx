import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Schedule a chiropractic consultation with Clinical Spine & Wellness. Select your preferred date, time, and service.",
  alternates: { canonical: "/booking" },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
