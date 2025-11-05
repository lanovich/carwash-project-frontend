import { cn } from "../lib";

interface ArticleProps {
  heading: string;
  children: React.ReactNode;
  className?: string;
}

export const InfoBlock = ({ heading, children, className }: ArticleProps) => {
  return (
    <section className={cn("p-2 bg-white rounded-md shadow-sm", className)}>
      <h3 className="text-small font-semibold mb-[2px]">{heading}</h3>
      {children}
    </section>
  );
};
