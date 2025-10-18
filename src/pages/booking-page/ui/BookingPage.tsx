import { BookingSummary } from "@/entities/booking/ui";
import { ChooseObjectTypeBlock } from "@/entities/car/ui";
import { BookingCarWashInfo } from "@/entities/carwash/ui";
import { ServicesBlock } from "@/entities/service/ui";
import { ChooseTimeBlock } from "@/entities/time/ui";
import { ContactForm } from "@/entities/user/ui";
import { Container } from "@/shared/ui";
import { Article } from "@/widgets/section-block/ui";

export const BookingPage = () => {
  return (
    <Container>
      <main className="flex flex-col xl:flex-row items-start gap-6 justify-center">
        <section className="flex flex-col gap-6 flex-1 w-full xl:w-3/5">
          <Article title="Мы на картах" collapsible>
            <BookingCarWashInfo />
          </Article>

          <Article title="Дата и время записи">
            <ChooseTimeBlock />
          </Article>

          <Article title="Что планируете у нас мыть?">
            <ChooseObjectTypeBlock />
          </Article>

          <Article title="Доступные услуги" collapsible>
            <ServicesBlock />
          </Article>
        </section>

        <section className="flex flex-col gap-6 w-full xl:w-2/5 sticky top-4">
          <Article title="Информация о вас">
            <ContactForm />
          </Article>

          <Article title="Детали записи">
            <BookingSummary />
          </Article>
        </section>
      </main>
    </Container>
  );
};
