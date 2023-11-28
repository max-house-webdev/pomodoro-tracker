import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getTodayKey, setStatisticData } from "../../service";

import { parseDate, TWeekday, TMonth } from "../../service";

export const STATISTIC_STORAGE = "pomodoro-Statistic-storage";

const persistOptions = {
  name: STATISTIC_STORAGE,
};

export type TTotalTime = {
  hours: number;
  minutes: number;
  seconds: number;
};

type TAppStart = {
  weekday: TWeekday;
  month: TMonth;
  day: number;
  hours: number;
  minutes: number;
  timeStamp_milliseconds: number;
};

export type TDayStatistic = {
  key: string;
  appStart: TAppStart;
  workTime: TTotalTime;
  restTime: TTotalTime;
  pauseTime: TTotalTime;
  focusFraction_percent: number;
  intervalsNumber: number;
  stopNumber: number;
  completedTodosNumber: number;
  status: "fake" | "real";
};

export type TWeekSelector = "this-week" | "last-week" | "two-weeks-ago";

interface IState {
  days: Array<TDayStatistic>;
  weekSelector: TWeekSelector;
  daySelector: TWeekday;
  startPause: number;
  startWork: number;

  increaseCompletedTodosNumber: () => void;
  increaseStopNumber: () => void;
  increaseIntervalsNumber: () => void;

  setAppStart: () => void;

  updateRestTime: () => void;

  updateWorkTime: () => void;

  updatePauseTime: () => void;

  updateFocusFraction_percent: () => void;

  setWeekSelector: (weekSelector: TWeekSelector) => void;
  setDaySelector: (daySelector: TWeekday) => void;

  getTodayStatistic: () => TDayStatistic | undefined;
  getWeekStatistic: () => Array<TDayStatistic>;
  getDayStatistic: (dayKey: string) => TDayStatistic | undefined;
}

export const useStatisticStore = create<IState>()(
  devtools(
    //****
    persist((set, get) => {
      return {
        /**
         * ! if true it fill with fake data
         * ! otherwise with null data
         */
        days: setStatisticData(true),

        weekSelector: "this-week" as TWeekSelector,
        daySelector: "Monday" as TWeekday,
        startPause: 0,
        startWork: 0,

        increaseCompletedTodosNumber() {
          set(
            (state) => {
              const todayKey = getTodayKey();
              const { days } = state;
              days.forEach((day) => {
                if (day.key === todayKey) {
                  day.completedTodosNumber++;
                }
              });

              return {
                ...state,
              };
            },
            false,
            "statistic/increaseCompletedTodosNumber"
          );
        },

        increaseStopNumber() {
          set(
            (state) => {
              const todayKey = getTodayKey();
              const { days } = state;
              days.forEach((day) => {
                if (day.key === todayKey) {
                  day.stopNumber++;
                }
              });

              return {
                ...state,
              };
            },
            false,
            "statistic/increaseStopNumber"
          );
        },

        increaseIntervalsNumber() {
          set(
            (state) => {
              const todayKey = getTodayKey();
              const { days } = state;
              days.forEach((day) => {
                if (day.key === todayKey) {
                  day.intervalsNumber++;
                }
              });

              return {
                ...state,
              };
            },
            false,
            "statistic/increaseIntervalsNumber"
          );
        },

        setAppStart() {
          set(
            (state) => {
              const appStart = parseDate(new Date());
              const { weekday, day, month } = appStart;
              const key = `${weekday}-${day}-${month}`;

              const today: TDayStatistic = {
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

              const { days } = state;
              const updatedDays = days.map((day) => {
                if (day.key === today.key) {
                  return day.status === "fake" ? today : day;
                }
                return day;
              });

              return {
                ...state,
                days: updatedDays,
              };
            },
            false,
            "statistic/setAppStart"
          );
        },

        updateRestTime() {
          set(
            (state) => {
              const todayKey = getTodayKey();
              const { days } = state;
              const todayStatistic = days.find((day) => day.key === todayKey);

              if (!todayStatistic) {
                return {
                  ...state,
                };
              }

              const { restTime } = todayStatistic;

              if (restTime.seconds < 59) {
                restTime.seconds += 1;
                return {
                  ...state,
                };
              }

              if (restTime.minutes < 59) {
                restTime.seconds = 0;
                restTime.minutes += 1;
                return {
                  ...state,
                };
              }

              restTime.hours += 1;
              restTime.minutes = 0;
              restTime.seconds = 0;

              return {
                ...state,
              };
            },
            false,
            "statistic/updateRestTime"
          );
        },

        updateWorkTime() {
          set(
            (state) => {
              const todayKey = getTodayKey();
              const { days } = state;
              const todayStatistic = days.find((day) => day.key === todayKey);

              if (!todayStatistic) {
                return {
                  ...state,
                };
              }

              const { workTime } = todayStatistic;

              if (workTime.seconds < 59) {
                workTime.seconds += 1;
                return {
                  ...state,
                };
              }

              if (workTime.minutes < 59) {
                workTime.seconds = 0;
                workTime.minutes += 1;
                return {
                  ...state,
                };
              }

              workTime.hours += 1;
              workTime.minutes = 0;
              workTime.seconds = 0;

              return {
                ...state,
              };
            },
            false,
            "statistic/updateWorkTime"
          );
        },

        updatePauseTime() {
          set(
            (state) => {
              const todayKey = getTodayKey();
              const { days } = state;
              const todayStatistic = days.find((day) => day.key === todayKey);

              if (!todayStatistic) {
                return {
                  ...state,
                };
              }

              const { pauseTime } = todayStatistic;

              if (pauseTime.seconds < 59) {
                pauseTime.seconds += 1;
                return {
                  ...state,
                };
              }

              if (pauseTime.minutes < 59) {
                pauseTime.seconds = 0;
                pauseTime.minutes += 1;
                return {
                  ...state,
                };
              }

              pauseTime.hours += 1;
              pauseTime.minutes = 0;
              pauseTime.seconds = 0;

              return {
                ...state,
              };
            },
            false,
            "statistic/updatePauseTime"
          );
        },

        updateFocusFraction_percent() {
          set(
            (state) => {
              const todayKey = getTodayKey();
              const { days } = state;
              const todayStatistic = days.find((day) => day.key === todayKey);

              if (!todayStatistic) {
                return {
                  ...state,
                };
              }

              const { workTime, restTime, pauseTime } = todayStatistic;
              const MINUTES_PER_HOUR = 60;

              const workTime_minutes =
                workTime.minutes + workTime.hours / MINUTES_PER_HOUR;

              const totalTime_minutes =
                workTime_minutes +
                restTime.minutes +
                restTime.hours / MINUTES_PER_HOUR +
                pauseTime.minutes +
                pauseTime.hours / MINUTES_PER_HOUR;

              todayStatistic.focusFraction_percent =
                workTime_minutes / totalTime_minutes;

              return { ...state };
            },
            false,
            "statistic/updateFocusFraction_percent"
          );
        },

        setWeekSelector(weekSelector) {
          set(
            (state) => {
              return {
                ...state,
                weekSelector,
              };
            },
            false,
            "statistic/setWeekSelector"
          );
        },

        setDaySelector(daySelector) {
          set(
            (state) => {
              return {
                ...state,
                daySelector,
              };
            },
            false,
            "statistic/setDaySelector"
          );
        },

        getTodayStatistic() {
          const todayKey = getTodayKey();
          return get().days.find((day) => day.key === todayKey);
        },

        getWeekStatistic() {
          const weekSelector = get().weekSelector;
          const days = get().days;
          const todayDay = new Date().getDay();

          const mondays = days.filter(
            (day) => day.appStart.weekday === "Monday"
          );

          let decrement = 0;

          switch (weekSelector) {
            case "two-weeks-ago": {
              decrement = todayDay === 0 ? 4 : 3;
              break;
            }
            case "last-week": {
              decrement = todayDay === 0 ? 3 : 2;
              break;
            }
            case "this-week": {
              decrement = todayDay === 0 ? 2 : 1;
            }
          }
          const startMonday = mondays[mondays.length - decrement];
          const startIndex = days.lastIndexOf(startMonday);
          const thisWeek = days.slice(startIndex, startIndex + 7);

          return thisWeek;
        },

        getDayStatistic(dayKey) {
          return get().days.find((day) => day.key === dayKey);
        },
      };
    }, persistOptions)
    //****
  )
);
