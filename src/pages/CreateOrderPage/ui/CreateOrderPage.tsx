import { Container, SkeletonItem } from "@/shared/ui";
import { SectionBlock } from "@/widgets/section-block/ui";

export const CreateOrderPage = () => {
  return (
    <Container className="flex flex-col xl:flex-row items-start gap-6">
      {/* Левая колонка */}
      <div className="flex flex-col gap-6 flex-1 w-full">
        <SectionBlock title="Мы на картах" className="h-[400px]">
          <div className="h-full w-full bg-bg-light-200 rounded-md animate-pulse" />
        </SectionBlock>

        <SectionBlock title="Дата и время записи">
          <div className="flex flex-col gap-2">
            <SkeletonItem width="w-2/3" />
            <SkeletonItem width="w-1/2" />
            <SkeletonItem width="w-1/4" />
          </div>
        </SectionBlock>

        <SectionBlock title="Что планируете у нас мыть?">
          <div className="flex flex-col gap-2">
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
          </div>
        </SectionBlock>

        <SectionBlock title="Доступные услуги">
          <div className="flex flex-col gap-2">
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem width="w-3/4" />
          </div>
        </SectionBlock>
      </div>

      {/* Правая колонка (sticky на больших экранах) */}
      <div className="flex flex-col gap-6 w-full xl:w-2/5 sticky top-16">
        <SectionBlock title="Информация о вас">
          <div className="flex flex-col gap-2">
            <SkeletonItem width="w-3/4" />
            <SkeletonItem width="w-full" />
            <SkeletonItem width="w-2/3" />
          </div>
        </SectionBlock>

        <SectionBlock title="Детали записи">
          <div className="flex flex-col gap-2">
            <SkeletonItem />
            <SkeletonItem width="w-3/4" />
            <SkeletonItem width="w-1/2" />
          </div>
        </SectionBlock>
      </div>
    </Container>
  );
};
