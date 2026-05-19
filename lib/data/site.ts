/**
 * Site-wide configuration.
 * ──────────────────────────
 * When migrating to a CMS (Sanity, Contentful, etc.), replace these
 * static exports with `async` fetcher functions that call the CMS API.
 * Every page / component already imports from this single file,
 * so the swap is a one-file change.
 */

export const siteConfig = {
  name: "DFW Spine & Injury Chiropractic",
  shortName: "DFW Spine & Injury",
  tagline: "Precision Care for Your Optimal Spine Health",
  description:
    "Advanced chiropractic and injury care services designed to alleviate pain, restore mobility, and enhance your overall quality of life.",
  url: "https://dfwspineinjury.com",
  phone: "+1 (555) 123-4567",
  email: "reception@dfwspineinjury.com",
  logo: {
    light: "/images/logo-light.png",
    dark: "/images/logo-dark.png",
  },
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
    linkedin: "https://linkedin.com/company/dfwspineinjury",
    instagram: "https://instagram.com/dfwspineinjury",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Booking", href: "/booking" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
