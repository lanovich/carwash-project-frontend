import { useMemo } from "react";
import { TimeCard } from ".";
import "keen-slider/keen-slider.min.css";

const weekDays = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

const generateDates = (count: number) => {
  const result = [];
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
  "20:00",
];

export const ChooseTimeBlock = ({ className }: { className?: string }) => {
  const dates = useMemo(() => generateDates(4), []);
  const timeSlots = useMemo(
    () => baseTimeSlots.map((time, i) => ({ id: `t-${i}`, time })).slice(0,6),
    []
  );

  return (
    <div className={className}>
      <div className={"flex gap-2 text-nowrap overflow-x-auto"}>
        {dates.map(({ id, weekDay, date }) => (
          <TimeCard key={id} mainText={date} caption={weekDay} />
        ))}
      </div>

      <div className="flex gap-2 text-nowrap mt-2 overflow-x-auto">
        {timeSlots.map(({ id, time }) => (
          <TimeCard key={id} mainText={time} />
        ))}
      </div>
    </div>
  );
};
