import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TimeCard } from ".";
import {
  setDate,
  setTime,
  selectDate,
  selectTime,
} from "@/entities/booking/model";
import { Carousel } from "@/shared/ui/Carousel";
import { formatCountSlots, useItemsPerSlide } from "../lib";
import { useGetTimeSlotsQuery } from "@/entities/time/api";
import { Button, Loading } from "@/shared/ui";
import { formatDate } from "@/shared/lib/formatDate";

const weekDays = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
] as const;

type DateType = {
  id: string;
  weekDay: (typeof weekDays)[number];
  date: string;
};

const generateDates = (count: number) => {
  const result: DateType[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const current = new Date(today);
    current.setDate(today.getDate() + i);

    result.push({
      id: `${current.getTime()}-${i}`,
      weekDay: weekDays[current.getDay()],
      date: current.toISOString().split("T")[0],
    });
  }

  return result;
};

export const ChooseTimeBlock = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectDate);
  const selectedTime = useSelector(selectTime);

  const itemsPerSlide = useItemsPerSlide({ throttleInterval: 150 });
  const dates = useMemo(() => generateDates(28), []);

  const {
    data: timeSlotsData,
    isLoading,
    refetch,
    isError,
  } = useGetTimeSlotsQuery(selectedDate || "", { skip: !selectedDate });

  const timeSlots = useMemo(
    () =>
      timeSlotsData?.slots?.map((slot) => ({
        id: `t-${slot.time}`,
        time: slot.time,
        available: slot.available,
      })) || [],
    [timeSlotsData]
  );

  const isTimeSlotsExist = timeSlots.length > 0;

  return (
    <div>
      <Carousel className="text-nowrap pb-2" itemsPerSlide={itemsPerSlide}>
        {dates.map(({ id, weekDay, date }) => (
          <TimeCard
            key={id}
            align="start"
            mainText={formatDate(date).toDM()}
            caption={weekDay}
            active={selectedDate === date}
            onClick={() => dispatch(setDate(date))}
          />
        ))}
      </Carousel>

      {!selectedDate ? (
        <div className="flex items-center justify-center h-[74px] text-center text-text-subtle">
          <p>Выберите дату, чтобы показать свободное время</p>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center h-[74px] text-center text-text-subtle">
          <Loading size={28} />
        </div>
      ) : isError ? (
        <div className="flex items-center gap-10 justify-center h-[74px] text-center text-text-subtle">
          <p>Произошла ошибка при загрузке слотов. Попробуйте позже.</p>
          <Button onClick={() => refetch()}>Повторить</Button>
        </div>
      ) : !isTimeSlotsExist ? (
        <div className="flex items-center justify-center h-[74px] text-center text-text-subtle">
          <p>К сожалению, на эту дату больше нельзя оформить бронь :(</p>
        </div>
      ) : (
        <Carousel
          className="text-nowrap"
          itemsPerSlide={itemsPerSlide > 2 ? itemsPerSlide + 2 : itemsPerSlide}
        >
          {timeSlots.map(({ id, time, available }) => (
            <TimeCard
              key={id}
              align="start"
              caption={formatCountSlots(available)}
              mainText={time}
              active={selectedTime === time}
              disabled={available === 0}
              onClick={() => available > 0 && dispatch(setTime(time))}
            />
          ))}
        </Carousel>
      )}
    </div>
  );
};
