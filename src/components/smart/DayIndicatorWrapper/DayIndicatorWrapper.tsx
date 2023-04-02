import React from "react";
import { DayIndicator } from "../../../components";
import { useDayStatistic } from "../../../hooks";

export function DayIndicatorWrapper() {
  const dayStatistic = useDayStatistic();

  const weekday = dayStatistic?.appStart.weekday || null;
  const workTime = dayStatistic?.workTime || null;
  const day = dayStatistic?.appStart.day || null;
  const month = dayStatistic?.appStart.month || null;

  return (
    <DayIndicator
      weekday={weekday}
      workTime={workTime}
      day={day}
      month={month}
    />
  );
}
