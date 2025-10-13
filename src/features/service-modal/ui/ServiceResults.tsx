import { Sparkles } from "lucide-react";
import { InfoBlock } from "@/shared/ui";

interface Props {
  results?: string[];
}

export const ServiceResults = ({ results }: Props) => {
  if (!results?.length) return null;

  return (
    <InfoBlock heading="Результат">
      <ul className="list-none space-y-1">
        {results.map((res, idx) => (
          <li key={idx} className="flex items-center gap-2 text-text-secondary">
            <Sparkles size={14} className="text-primary" />
            <p className="text-small">{res}</p>
          </li>
        ))}
      </ul>
    </InfoBlock>
  );
};
