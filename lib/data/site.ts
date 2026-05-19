/**
 * Site-wide configuration.
 * ──────────────────────────
 * When migrating to a CMS (Sanity, Contentful, etc.), replace these
 * static exports with `async` fetcher functions that call the CMS API.
 * Every page / component already imports from this single file,
 * so the swap is a one-file change.
 */

export const siteConfig = {
  name: "Clinical Spine & Wellness",
  tagline: "Precision Care for Your Optimal Spine Health",
  description:
    "Advanced chiropractic and wellness services designed to alleviate pain, restore mobility, and enhance your overall quality of life.",
  url: "https://clinicalspine.com",
  phone: "+1 (555) 123-4567",
  email: "reception@clinicalspine.com",
  address: {
    street: "1200 Clinical Avenue, Suite 400",
    city: "Medical District",
    state: "MD",
    zip: "10021",
    country: "United States",
  },
  hours: [
    { day: "Monday – Friday", time: "8:00 AM – 6:00 PM" },
    { day: "Saturday", time: "9:00 AM – 2:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  social: {
    linkedin: "https://linkedin.com/company/clinicalspine",
    instagram: "https://instagram.com/clinicalspine",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Booking", href: "/booking" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
