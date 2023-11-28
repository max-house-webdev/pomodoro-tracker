import { TDayStatistic } from "../../store";
import { getTimeFromMilliseconds, parseDate } from "../../service";

export function getFakeDayStatistic(daysBeforeNumber: number) {
  const MILLISECONDS_PER_DAY = 864e5;
  const MILLISECONDS_PER_HOUR = 36e5;

  const appStart = parseDate(
    new Date(Date.now() - MILLISECONDS_PER_DAY * daysBeforeNumber)
  );

  const { weekday, day, month } = appStart;
  const key = `${weekday}-${day}-${month}`;

  const work_milliseconds = Math.trunc(
    Math.random() * (MILLISECONDS_PER_HOUR * 5)
  );
  const rest_milliseconds = Math.trunc(
    Math.random() * (MILLISECONDS_PER_HOUR * 4)
  );

  const pause_milliseconds = Math.trunc(
    Math.random() * (MILLISECONDS_PER_HOUR * 3)
  );
  const total_milliseconds =
    work_milliseconds + rest_milliseconds + pause_milliseconds;

  const fakeDay: TDayStatistic = {
    key,
    appStart,
    restTime: {
      ...getTimeFromMilliseconds(rest_milliseconds),
    },
    workTime: {
      ...getTimeFromMilliseconds(work_milliseconds),
    },
    pauseTime: {
      ...getTimeFromMilliseconds(pause_milliseconds),
    },
    focusFraction_percent: work_milliseconds / total_milliseconds,
    intervalsNumber: Math.ceil(Math.random() * 10),
    stopNumber: Math.ceil(Math.random() * 5),
    completedTodosNumber: Math.ceil(Math.random() * 25),
    status: "fake",
  };

  return fakeDay;
}
