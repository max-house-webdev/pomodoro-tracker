import { TDayStatistic } from "../../store";
import { getFakeDayStatistic } from "../getFakeDayStatistic";
import { getNullDayStatistic } from "../getNullDayStatistic";
import { parseDate } from "../../service";

export function setStatisticData(fake: boolean) {
  const today = new Date().getDay();

  let prevDaysStatistic: Array<TDayStatistic> = [];

  const THREE_WEEKS = 27;

  for (let i = 1; i <= THREE_WEEKS + today; i++) {
    if (fake) {
      const fakeDay = getFakeDayStatistic(i);
      if (fakeDay) {
        prevDaysStatistic.push(fakeDay);
      }
    } else {
      const nullDay = getNullDayStatistic(i);
      if (nullDay) {
        prevDaysStatistic.push(nullDay);
      }
    }
  }
  prevDaysStatistic.reverse();

  const appStart = parseDate(new Date());
  const { weekday, day, month } = appStart;
  const key = `${weekday}-${day}-${month}`;

  const todayStatistic: TDayStatistic = {
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
    status: "real",
  };

  let nextDaysStatistic: Array<TDayStatistic> = [];
  const WEEK = 7;

  for (let i = today - WEEK; i < 0; i++) {
    const nullDay = getNullDayStatistic(i);
    if (nullDay) {
      nextDaysStatistic.push(nullDay);
    }
  }

  nextDaysStatistic.reverse();

  const fullStatistic = [
    ...prevDaysStatistic,
    todayStatistic,
    ...nextDaysStatistic,
  ];

  return fullStatistic;
}
