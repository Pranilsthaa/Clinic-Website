import Image from "next/image";
import type { TeamMember } from "@/lib/data/team";

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-lg mb-6 aspect-[3/4]">
        <Image
          src={member.image}
          alt={`Portrait of ${member.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
        />
      </div>
      <div>
        <h3 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-1">
          {member.name}, {member.credentials}
        </h3>
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-secondary)] mb-3">
          {member.title}
        </p>
        <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed">
          {member.bio}
        </p>
      </div>
    </article>
  );
}
