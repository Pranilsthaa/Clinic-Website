interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main";
  id?: string;
}

export default function Container({
  children,
  className = "",
  as: Tag = "div",
  id,
}: ContainerProps) {
  return (
    <Tag
      id={id}
      className={`w-full max-w-[1280px] mx-auto px-6 md:px-8 lg:px-20 ${className}`}
    >
      {children}
    </Tag>
  );
}
