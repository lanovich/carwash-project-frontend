import { BookingSummary } from "@/entities/booking/ui";
import { ChooseCarTypeBlock } from "@/entities/car/ui";
import { BookingCarWashInfo } from "@/entities/carwash/ui";
import { ServicesBlock } from "@/entities/service/ui";
import { ChooseTimeBlock } from "@/entities/time/ui";
import { ContactForm } from "@/entities/user/ui";
import { Container } from "@/shared/ui";
import { BookingSection } from "@/widgets/section-block/ui";

export const BookingPage = () => {
  return (
    <Container>
      <div className="flex flex-col xl:flex-row items-start gap-6 justify-center">
        <div className="flex flex-col gap-6 flex-1 w-full xl:w-3/5">
          <BookingSection title="Мы на картах" className="h-[400px]">
            <BookingCarWashInfo />
          </BookingSection>

          <BookingSection title="Дата и время записи">
            <ChooseTimeBlock />
          </BookingSection>

          <BookingSection title="Что планируете у нас мыть?">
            <ChooseCarTypeBlock />
          </BookingSection>

          <BookingSection title="Доступные услуги">
            <ServicesBlock />
          </BookingSection>
        </div>

        <div className="flex flex-col gap-6 w-full xl:w-2/5 sticky top-4">
          <BookingSection title="Информация о вас">
            <ContactForm />
          </BookingSection>

          <BookingSection title="Детали записи">
            <BookingSummary />
          </BookingSection>
        </div>
      </div>
    </Container>
  );
};
