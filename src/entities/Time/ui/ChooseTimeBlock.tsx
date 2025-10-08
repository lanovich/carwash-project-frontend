import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TimeCard } from ".";
import {
  setDate,
  setTime,
  selectDate,
  selectTime,
} from "@/entities/booking/model";

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

export const ChooseTimeBlock = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectDate);
  const selectedTime = useSelector(selectTime);

  const dates = useMemo(() => generateDates(4), []);
  const timeSlots = useMemo(
    () => baseTimeSlots.map((time, i) => ({ id: `t-${i}`, time })).slice(0, 6),
    []
  );

  return (
    <div>
      <div className="flex gap-2 text-nowrap overflow-x-auto pb-1">
        {dates.map(({ id, weekDay, date }) => (
          <TimeCard
            key={id}
            mainText={date}
            caption={weekDay}
            active={selectedDate === date}
            onClick={() => dispatch(setDate(date))}
          />
        ))}
      </div>

      <div className="flex gap-2 text-nowrap mt-2 overflow-x-auto pb-1">
        {timeSlots.map(({ id, time }) => (
          <TimeCard
            key={id}
            mainText={time}
            active={selectedTime === time}
            onClick={() => dispatch(setTime(time))}
          />
        ))}
      </div>
    </div>
  );
};
