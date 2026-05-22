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
      className={`w-full max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16 ${className}`}
    >
      {children}
    </Tag>
  );
}
