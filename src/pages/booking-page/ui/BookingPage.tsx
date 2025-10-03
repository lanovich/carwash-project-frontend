import { ChooseCarTypeBlock } from "@/entities/Car/ui";
import { ChooseTimeBlock } from "@/entities/Time/ui";
import { Container } from "@/shared/ui";
import { BookingSection } from "@/widgets/section-block/ui";

export const BookingPage = () => {
  return (
    <Container>
      <div className="flex flex-col xl:flex-row items-start gap-6 justify-center">
        {/* Левая колонка */}
        <div className="flex flex-col gap-6 flex-1 w-full xl:w-3/5">
          <BookingSection title="Мы на картах" className="h-[400px]">
            <div />
          </BookingSection>

          <BookingSection title="Дата и время записи">
            <ChooseTimeBlock />
          </BookingSection>

          <BookingSection title="Что планируете у нас мыть?">
            <ChooseCarTypeBlock />
          </BookingSection>

          <BookingSection title="Доступные услуги">
            <div className="flex flex-col gap-2"></div>
          </BookingSection>
        </div>

        {/* Правая колонка (sticky на больших экранах) */}
        <div className="flex flex-col gap-6 w-full xl:w-2/5 sticky top-16">
          <BookingSection title="Информация о вас">
            <div className="flex flex-col gap-2"></div>
          </BookingSection>

          <BookingSection title="Детали записи">
            <div className="flex flex-col gap-2"></div>
          </BookingSection>
        </div>
      </div>
    </Container>
  );
};
