import { InfoBlock, Tag } from "@/shared/ui";

interface Props {
  tags?: string[];
  popular?: boolean;
}

export const ServiceTags = ({ tags, popular }: Props) => {
  if (!tags?.length && !popular) return null;

  return (
    <InfoBlock heading="">
      <div className="flex flex-wrap gap-2">
        {tags?.map((tag, idx) => (
          <Tag key={idx} size="regular">
            {tag}
          </Tag>
        ))}
        {popular && (
          <Tag variant="primary" size="regular">
            популярное
          </Tag>
        )}
      </div>
    </InfoBlock>
  );
};
