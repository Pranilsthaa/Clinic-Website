/**
 * Services data — CMS-ready.
 * Replace this static array with a CMS query function when migrating.
 */

export interface Service {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  icon: string; // SVG path data for inline icons
}

export const services: Service[] = [
  {
    slug: "spinal-adjustment",
    title: "Spinal Adjustment",
    excerpt:
      "Precise realignments to restore joint function and alleviate nerve pressure.",
    description:
      "Precise, targeted manipulation to correct alignment issues, alleviate nerve pressure, and restore optimal joint mechanics. Our foundational approach to treating chronic back and neck pain uses evidence-based techniques developed over decades of clinical research.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  },
  {
    slug: "therapeutic-massage",
    title: "Therapeutic Massage",
    excerpt:
      "Targeted soft tissue therapy to reduce tension and improve muscle mobility.",
    description:
      "Deep tissue protocols designed to release myofascial tension and complement structural adjustments. Our therapists use a combination of techniques tailored to your specific areas of discomfort, promoting faster recovery and long-term relief.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  },
  {
    slug: "active-rehabilitation",
    title: "Active Rehabilitation",
    excerpt:
      "Customized exercise protocols to strengthen core stability and prevent future injuries.",
    description:
      "Customized movement strategies to rebuild strength, improve flexibility, and prevent future injury recurrence following acute care. Our rehabilitation programs bridge the gap between clinical treatment and full functional independence.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  },
  {
    slug: "advanced-diagnostics",
    title: "Advanced Diagnostics",
    excerpt:
      "State-of-the-art imaging and biomechanical assessments for accurate treatment targeting.",
    description:
      "Utilizing state-of-the-art imaging and biomechanical assessments to ensure accurate treatment targeting. Our diagnostic suite includes digital X-ray, postural analysis software, and functional movement screening to develop your personalized care roadmap.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  },
];
