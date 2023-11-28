import { TDayStatistic } from "../../store";
import { parseDate } from "../../service";

export function getNullDayStatistic(daysNumber: number) {
  const MILLISECONDS_PER_DAY = 864e5;

  const appStart = parseDate(
    new Date(Date.now() - MILLISECONDS_PER_DAY * daysNumber)
  );

  const { weekday, day, month } = appStart;
  const key = `${weekday}-${day}-${month}`;

  const fakeDay: TDayStatistic = {
    key,
    appStart,
    workTime: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    restTime: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    pauseTime: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    focusFraction_percent: 0,
    intervalsNumber: 0,
    stopNumber: 0,
    completedTodosNumber: 0,
    status: "fake",
  };

  return fakeDay;
}
