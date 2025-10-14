import { Button } from "@/shared/ui";

export const PromoSection = () => {
  return (
    <section className="flex flex-col min-h-[calc(100dvh-65px)] px-8 pt-8 gap-8">
      <div className="flex flex-wrap justify-between">
        <div>
          <h1 className="text-super mb-4 leading-[110%] text-center sm:text-start">
            Растем, чтобы радовать <br /> результатом
          </h1>
        </div>

        <div className="flex flex-col gap-5 md:gap-7 text-super-caption text-text-secondary font-light mt-4 text-center sm:text-start w-full sm:w-auto">
          <p className="leading-[105%]">
            Мы предлагаем качественную мойку, <br /> химчистку и уход за
            автомобилем.
          </p>
          <p className="leading-[105%]">
            Онлайн-запись экономит ваше время, <br /> приезжайте, когда удобно.
          </p>
          <p className="leading-[105%]">
            Каждый год обслуживаем сотни машин <br /> и постоянно улучшаем
            сервис.
          </p>
        </div>
      </div>

      <div className="flex flex-1">
        <Button size="lg" className="m-auto">
          Перейти к бронированию
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 flex-1">
        <img
          src="logo.svg"
          alt="Пример 1"
          className="flex-grow flex-shrink basis-[31%] min-w-[200px] object-cover rounded-xl shadow-2xl lg:aspect-[16/7] aspect-[4/3]"
        />
        <img
          src="logo.svg"
          alt="Пример 2"
          className="flex-grow flex-shrink basis-[31%] min-w-[200px] object-cover rounded-xl shadow-2xl lg:aspect-[16/7] aspect-[4/3]"
        />
      </div>
    </section>
  );
};
