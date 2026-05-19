/**
 * Team data — CMS-ready.
 * Replace this static array with a CMS query function when migrating.
 */

export interface TeamMember {
  slug: string;
  name: string;
  title: string;
  credentials: string;
  bio: string;
  image: string;
}

export const team: TeamMember[] = [
  {
    slug: "dr-sarah-jenkins",
    name: "Dr. Sarah Jenkins",
    title: "Lead Chiropractor",
    credentials: "DC",
    bio: "With over 15 years specializing in complex spinal biomechanics, Dr. Jenkins leads our diagnostic and adjustment protocols. Her approach integrates structural correction with neurological function.",
    image: "/images/dr-jenkins.png",
  },
  {
    slug: "dr-marcus-chen",
    name: "Dr. Marcus Chen",
    title: "Director of Active Recovery",
    credentials: "PT, DPT",
    bio: "Dr. Chen directs our active recovery programs, bridging the gap between clinical treatment and functional independence through targeted kinematic retraining.",
    image: "/images/dr-chen.png",
  },
];
