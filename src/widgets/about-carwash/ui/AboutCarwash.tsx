import { YandexMap } from "@/features/map/ui";
import { Container } from "@/shared/ui";
import { ContactSection } from "./ContactSection";
export const AboutCarwash = () => {
  return (
    <section className="flex flex-col gap-6 py-3 bg-bg-dark">
      <Container className="max-w-[1660px]">
        <div className="text-white mb-5">
          <h1 className="text-super leading-[110%] text-center sm:text-start mb-2">
            Информация о нас
          </h1>
          <p className="text-regular text-center sm:text-start">
            Выбирайте удобный способ для записи: звонок, онлайн-бронирование или
            личный визит. Мы всегда рядом, чтобы помочь!
          </p>
        </div>

        <div className="flex flex-col xl:flex-row w-full gap-4 h-full">
          <article className="xl:w-2/3 w-full">
            <YandexMap className="w-full h-full" />
          </article>

          <div className="xl:w-1/3 w-full">
            <ContactSection />
          </div>
        </div>
      </Container>
    </section>
  );
};
