interface ArticleProps {
  heading: string;
  children: React.ReactNode;
}

export const InfoBlock = ({ heading, children }: ArticleProps) => {
  return (
    <section className="p-2 bg-white rounded-md shadow-sm">
      <h3 className="text-small font-semibold mb-[2px]">{heading}</h3>
      {children}
    </section>
  );
};
