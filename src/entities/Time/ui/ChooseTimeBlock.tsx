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
import { useItemsPerSlide } from "../lib";

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
  weekDay:
    | "Воскресенье"
    | "Понедельник"
    | "Вторник"
    | "Среда"
    | "Четверг"
    | "Пятница"
    | "Суббота";
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
      date: current.toISOString().split("T")[0].replaceAll("-", "."),
    });
  }

  return result;
};

const baseTimeSlots = [
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
] as const;

export const ChooseTimeBlock = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectDate);
  const selectedTime = useSelector(selectTime);

  const itemsPerSlide = useItemsPerSlide({
    throttleInterval: 150,
  });

  const dates = useMemo(() => generateDates(28), []);
  const timeSlots = useMemo(
    () =>
      baseTimeSlots.map((time, i) => ({
        id: `t-${i}`,
        time,
      })),
    []
  );

  return (
    <div>
      <Carousel className="text-nowrap pb-2" itemsPerSlide={itemsPerSlide}>
        {dates.map(({ id, weekDay, date }) => (
          <TimeCard
            key={id}
            align="start"
            mainText={date}
            caption={weekDay}
            active={selectedDate === date}
            onClick={() => dispatch(setDate(date))}
          />
        ))}
      </Carousel>

      <Carousel
        className="text-nowrap"
        itemsPerSlide={itemsPerSlide > 2 ? itemsPerSlide + 2 : itemsPerSlide}
      >
        {timeSlots.map(({ id, time }) => (
          <TimeCard
            key={id}
            align="start"
            caption="Время"
            mainText={time}
            active={selectedTime === time}
            onClick={() => dispatch(setTime(time))}
          />
        ))}
      </Carousel>
    </div>
  );
};
