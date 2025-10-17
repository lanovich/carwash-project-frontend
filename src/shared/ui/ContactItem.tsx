import { cn } from "@/shared/lib";

interface ContactItemProps {
  icon: React.ReactNode;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export const ContactItem = ({
  icon,
  href,
  children,
  className,
}: ContactItemProps) => {
  const baseClasses = "flex items-center gap-2 text-black transition-colors";
  const linkClasses = cn(baseClasses, "hover:text-primary", className);
  const staticClasses = cn(baseClasses, className);

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        {icon}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <div className={staticClasses}>
      {icon}
      <span>{children}</span>
    </div>
  );
};
