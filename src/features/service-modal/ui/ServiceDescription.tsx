import { InfoBlock } from "@/shared/ui";

interface Props {
  description?: string;
}

export const ServiceDescription = ({ description }: Props) => {
  if (!description) return null;
  return (
    <InfoBlock heading="Подробнее">
      <p className="text-text-secondary text-small">{description}</p>
    </InfoBlock>
  );
};
