import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const TIMER_STORAGE = "pomodoro-Timer-storage";

const persistOptions = {
  name: TIMER_STORAGE,
};

export type TTime = {
  minutes: number;
  seconds: number;
};

export type TCurrentTodo = {
  todoId: string | null | undefined;
  todoTitle: string;
  workIntervalNumber: number;
  workIntervalDuration: number;
};

export type TTimerStatus =
  | "ready"
  | "stop"
  | "work"
  | "work-pause"
  | "shortRest"
  | "longRest"
  | "shortRest-pause"
  | "longRest-pause"
  | "completed";

export type TTimeManager = {
  DELAY: 1e3;
  minWorkIntervalNumber: 1;
  maxWorkIntervalNumber: number;
  workIntervalDuration: number;
  shortRestIntervalDuration: number;
  longRestIntervalDuration: number;
  setLongRestIntervalEvery: number;
  changeIntervalTimeStep: number;
};

const TIME_MANAGER: TTimeManager = {
  DELAY: 1000,
  minWorkIntervalNumber: 1,
  maxWorkIntervalNumber: 10,
  workIntervalDuration: 25,
  shortRestIntervalDuration: 1,
  longRestIntervalDuration: 2,
  setLongRestIntervalEvery: 2,
  changeIntervalTimeStep: 1,
};

interface IState {
  todoId: string | null;
  todoTitle: string;
  time: TTime;

  timeManager: TTimeManager;

  timerWorkIntervalDuration: number;
  timerWorkIntervalNumber: number;
  timerWorkIntervalCounter: number;

  timerId: NodeJS.Timeout | number | null;

  isTimerRunning: boolean;

  timerStatus: TTimerStatus;

  timerRestIntervalCounter: number;

  timerError: string | null;

  updateCurrentTodo: (args: TCurrentTodo | null) => void;

  resetTimer: () => void;

  updateTime: (args: TTime) => void;

  increaseTimerWorkIntervalCounter: () => void;
  decreaseTimerWorkIntervalCounter: () => void;

  increaseTimerWorkIntervalDuration: () => void;
  decreaseTimerWorkIntervalDuration: () => void;

  increaseTimerRestIntervalCounter: () => void;

  setTimerId: (timerId: NodeJS.Timeout | number | null) => void;

  toggleTimerIsRunning: (isTimerRunning: boolean) => void;
  setTimerStatus: (timerStatus: TTimerStatus) => void;

  throwTimerError: (errorMessage: string) => void;
  getTimerError: () => string | null;

  clearTimerInterval: () => void;

  getTime: () => TTime;

  getTimerStatus: () => TTimerStatus;
  //* time management
  setWorkIntervalDuration: (workIntervalDuration: number) => void;
  setShortRestIntervalDuration: (shortRestIntervalDuration: number) => void;
  setLongRestIntervalDuration: (longRestIntervalDuration: number) => void;
  setLongRestIntervalFrequency: (setLongRestIntervalEvery: number) => void;
}

export const useTimerStore = create<IState>()(
  devtools(
    //****
    persist((set, get) => {
      return {
        todoId: null,
        todoTitle: "Здесь будет название текущей задачи",
        time: {
          minutes: TIME_MANAGER.workIntervalDuration,
          seconds: 0,
        },

        timeManager: {
          ...TIME_MANAGER,
        },

        timerWorkIntervalDuration: TIME_MANAGER.workIntervalDuration,
        timerWorkIntervalNumber: 0,
        timerWorkIntervalCounter: 0,
        timerRestIntervalCounter: 0,
        timerId: null,
        isTimerRunning: false,
        timerStatus: "ready",

        timerError: null,

        updateCurrentTodo(args) {
          if (!args) {
            return;
          }

          set(
            (state) => {
              const {
                todoId,
                todoTitle,
                workIntervalNumber,
                workIntervalDuration,
              } = args;

              if (!todoId) {
                return { ...state };
              }

              return {
                ...state,

                todoId: todoId as string,
                todoTitle,
                timerWorkIntervalNumber: workIntervalNumber,
                timerWorkIntervalDuration: workIntervalDuration,
              };
            },
            false,
            "timer/updateCurrentTodo"
          );
        },

        updateTime(args) {
          set(
            (state) => {
              const { minutes, seconds } = args;

              return {
                ...state,
                time: { minutes, seconds },
              };
            },
            false,
            "timer/updateTime"
          );
        },

        resetTimer() {
          set(
            (state) => {
              return {
                ...state,

                todoId: null,
                todoTitle: "Здесь будет название текущей задачи",
                time: {
                  minutes: state.timeManager.workIntervalDuration,
                  seconds: 0,
                },
                timerWorkIntervalDuration:
                  state.timeManager.workIntervalDuration,
                timerWorkIntervalNumber: 0,
                timerWorkIntervalCounter: 0,
                timerRestIntervalCounter: 0,
                timerId: null,
                isTimerRunning: false,
                timerStatus: "ready",

                timerError: null,
              };
            },
            false,
            "timer/resetTimer"
          );
        },

        setTimerId(timerId) {
          if (!timerId) return;

          set(
            (state) => {
              return { ...state, timerId };
            },
            false,
            "timer/setTimerId"
          );
        },

        toggleTimerIsRunning(isTimerRunning) {
          set(
            (state) => {
              return { ...state, isTimerRunning };
            },
            false,
            "timer/toggleTimerIsRunning"
          );
        },

        setTimerStatus(timerStatus) {
          set(
            (state) => {
              return { ...state, timerStatus };
            },
            false,
            "timer/setTimerStatus"
          );
        },

        increaseTimerWorkIntervalCounter() {
          set(
            (state) => {
              const { timerWorkIntervalCounter, timerWorkIntervalNumber } =
                state;

              const increment = timerWorkIntervalCounter + 1;

              const newTimerStatus =
                increment > timerWorkIntervalNumber ? "completed" : "work";

              return {
                ...state,

                timerWorkIntervalCounter: increment,
                timerStatus: newTimerStatus,
              };
            },
            false,
            "timer/increaseTimerWorkIntervalCounter"
          );
        },

        decreaseTimerWorkIntervalCounter() {
          set(
            (state) => {
              const { timerWorkIntervalCounter } = state;

              const decrement =
                timerWorkIntervalCounter >= 1
                  ? timerWorkIntervalCounter - 1
                  : 1;

              return {
                ...state,

                timerWorkIntervalCounter: decrement,
              };
            },
            false,
            "timer/decreaseTimerWorkIntervalCounter"
          );
        },

        increaseTimerRestIntervalCounter() {
          set(
            (state) => {
              const { timerRestIntervalCounter, timeManager } = state;
              const { setLongRestIntervalEvery } = timeManager;

              const increment = timerRestIntervalCounter + 1;

              const timerStatus =
                increment % setLongRestIntervalEvery === 0
                  ? "longRest"
                  : "shortRest";

              return {
                ...state,

                timerRestIntervalCounter: increment,
                timerStatus,
              };
            },
            false,
            "timer/increaseTimerRestIntervalCounter"
          );
        },

        increaseTimerWorkIntervalDuration() {
          set(
            (state) => {
              const increment =
                state.timerWorkIntervalDuration +
                state.timeManager.changeIntervalTimeStep;
              return {
                ...state,

                timerWorkIntervalDuration: increment,

                time: {
                  minutes: increment,
                  seconds: 0,
                },
              };
            },
            false,
            "timer/increaseTimerWorkIntervalDuration"
          );
        },

        decreaseTimerWorkIntervalDuration() {
          set(
            (state) => {
              const decrement =
                state.timerWorkIntervalDuration -
                  state.timeManager.changeIntervalTimeStep >
                state.timeManager.workIntervalDuration
                  ? state.timerWorkIntervalDuration -
                    state.timeManager.changeIntervalTimeStep
                  : state.timeManager.workIntervalDuration;
              return {
                ...state,

                timerWorkIntervalDuration: decrement,

                time: {
                  minutes: decrement,
                  seconds: 0,
                },
              };
            },
            false,
            "timer/decreaseTimerWorkIntervalDuration"
          );
        },

        throwTimerError(errorMessage: string) {
          set(
            (state) => {
              return {
                ...state,

                timerError: errorMessage,
              };
            },
            false,
            "timer/throwTimerError"
          );
        },

        getTimerError() {
          return get().timerError;
        },

        clearTimerInterval() {
          set(
            (state) => {
              const { timerId } = state;

              if (timerId) {
                clearInterval(timerId);
              }

              return {
                ...state,

                timerId: null,
              };
            },
            false,
            "timer/clearTimerInterval"
          );
        },

        getTime() {
          return get().time;
        },

        getTimerStatus() {
          return get().timerStatus;
        },
        //* time management
        setWorkIntervalDuration(workIntervalDuration) {
          set(
            (state) => {
              return {
                ...state,

                timerWorkIntervalDuration: workIntervalDuration,
                time: {
                  minutes: workIntervalDuration,
                  seconds: 0,
                },
                timeManager: {
                  ...state.timeManager,
                  workIntervalDuration,
                },
              };
            },
            false,
            "timer/setWorkIntervalDuration"
          );
        },

        setShortRestIntervalDuration(shortRestIntervalDuration) {
          set(
            (state) => {
              return {
                ...state,
                timeManager: {
                  ...state.timeManager,
                  shortRestIntervalDuration,
                },
              };
            },
            false,
            "timer/setShortRestIntervalDuration"
          );
        },

        setLongRestIntervalDuration(longRestIntervalDuration) {
          set(
            (state) => {
              return {
                ...state,
                timeManager: {
                  ...state.timeManager,
                  longRestIntervalDuration,
                },
              };
            },
            false,
            "timer/setLongRestIntervalDuration"
          );
        },

        setLongRestIntervalFrequency(setLongRestIntervalEvery) {
          set(
            (state) => {
              return {
                ...state,
                timeManager: {
                  ...state.timeManager,
                  setLongRestIntervalEvery,
                },
              };
            },
            false,
            "timer/setLongRestIntervalFrequency"
          );
        },
      };
    }, persistOptions)
    //****
  )
);
