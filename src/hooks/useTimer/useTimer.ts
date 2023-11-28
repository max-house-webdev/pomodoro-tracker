import { useEffect } from "react";

import { useTimerStore, useStatisticStore, useTodosStore } from "../../store";
import {
  useBlipSound,
  useMaletSound,
  usePositiveSound,
  useToastRest,
  useToastWork,
} from "../../hooks";
import { minutesToMilliseconds } from "./minutesToMilliseconds";
import { secondsToMilliseconds } from "./secondsToMilleseconds";

export function useTimer() {
  //* toast
  const toastWork = useToastWork();
  const toastRest = useToastRest();
  //* sound
  const playWork = useBlipSound();
  const playRest = usePositiveSound();
  const playDelete = useMaletSound();
  //* statistic
  const increaseStatisticCompletedTodosNumber = useStatisticStore(
    (state) => state.increaseCompletedTodosNumber
  );
  const increaseStatisticIntervalsNumber = useStatisticStore(
    (state) => state.increaseIntervalsNumber
  );
  //* todos
  const decreaseTodoWorkIntervalNumber = useTodosStore(
    (state) => state.decreaseTodoWorkIntervalNumber
  );

  //* timer
  const todoId = useTimerStore((state) => state.todoId);
  const timerStatus = useTimerStore((state) => state.timerStatus);
  const timerWorkIntervalDuration = useTimerStore(
    (state) => state.timerWorkIntervalDuration
  );
  const timeManager = useTimerStore((state) => state.timeManager);

  const toggleTimerIsRunning = useTimerStore(
    (state) => state.toggleTimerIsRunning
  );
  const getTimerStatus = useTimerStore((state) => state.getTimerStatus);

  const increaseTimerWorkIntervalCounter = useTimerStore(
    (state) => state.increaseTimerWorkIntervalCounter
  );
  const updateTime = useTimerStore((state) => state.updateTime);
  const setTimerId = useTimerStore((state) => state.setTimerId);
  const clearTimerInterval = useTimerStore((state) => state.clearTimerInterval);
  const getTime = useTimerStore((state) => state.getTime);
  const increaseTimerRestIntervalCounter = useTimerStore(
    (state) => state.increaseTimerRestIntervalCounter
  );

  const throwTimerError = useTimerStore((state) => state.throwTimerError);
  const resetTimer = useTimerStore((state) => state.resetTimer);

  useEffect(() => {
    type TTickArgs = {
      deadline: number;
      callback: () => void;
    };

    const tick = (args: TTickArgs) => {
      const { deadline, callback } = args;
      const now = Date.now() - 1e3;
      const timeDiff = new Date(deadline - now);
      const minutes = timeDiff.getMinutes();
      const seconds = timeDiff.getSeconds();

      updateTime({ minutes, seconds });

      if (timeDiff.getTime() < timeManager.DELAY) {
        updateTime({ minutes: 0, seconds: 0 });
        clearTimerInterval();
        callback();
      }
    };

    switch (timerStatus) {
      case "ready": {
        break;
      }

      case "stop": {
        toggleTimerIsRunning(false);
        clearTimerInterval();
        updateTime({
          minutes: timerWorkIntervalDuration,
          seconds: 0,
        });

        break;
      }

      case "work": {
        toggleTimerIsRunning(true);
        const startTime = Date.now();
        const time = getTime();
        const deadline =
          startTime +
          minutesToMilliseconds(time.minutes) +
          secondsToMilliseconds(time.seconds);

        const callback = () => {
          playRest();
          toastRest();
          increaseTimerRestIntervalCounter();
          const timerStatus = getTimerStatus();

          switch (timerStatus) {
            case "shortRest": {
              updateTime({
                minutes: timeManager.shortRestIntervalDuration,
                seconds: 0,
              });
              break;
            }
            case "longRest": {
              updateTime({
                minutes: timeManager.longRestIntervalDuration,
                seconds: 0,
              });
              break;
            }
            default: {
              updateTime({
                minutes: 0,
                seconds: 0,
              });
            }
          }
        };

        const timerId = setInterval(tick, timeManager.DELAY, {
          deadline,
          callback,
        });

        setTimerId(timerId);

        break;
      }

      case "work-pause": {
        toggleTimerIsRunning(false);
        clearTimerInterval();

        break;
      }

      case "shortRest":
      case "longRest": {
        toggleTimerIsRunning(true);
        const startTime = Date.now();
        const time = getTime();
        const deadline =
          startTime +
          minutesToMilliseconds(time.minutes) +
          secondsToMilliseconds(time.seconds);

        const callback = () => {
          increaseTimerWorkIntervalCounter();
          increaseStatisticIntervalsNumber();

          const timerStatus = getTimerStatus();

          if (timerStatus === "work") {
            playWork();
            toastWork();
          }

          updateTime({ minutes: timerWorkIntervalDuration, seconds: 0 });
          if (todoId) {
            decreaseTodoWorkIntervalNumber({ id: todoId, timeManager });
          }
        };

        const timerId = setInterval(tick, timeManager.DELAY, {
          deadline,
          callback,
        });

        setTimerId(timerId);
        break;
      }

      case "shortRest-pause":
      case "longRest-pause": {
        toggleTimerIsRunning(false);
        clearTimerInterval();
        const time = getTime();
        updateTime(time);
        break;
      }

      case "completed": {
        playDelete();
        clearTimerInterval();
        increaseStatisticCompletedTodosNumber();
        increaseStatisticIntervalsNumber();
        if (todoId) {
          decreaseTodoWorkIntervalNumber({ id: todoId, timeManager });
        }

        resetTimer();
        break;
      }

      default: {
        throwTimerError("Не удалось определить статус");
      }
    }
  }, [
    clearTimerInterval,
    decreaseTodoWorkIntervalNumber,
    getTime,
    getTimerStatus,
    increaseStatisticCompletedTodosNumber,
    increaseStatisticIntervalsNumber,
    increaseTimerRestIntervalCounter,
    increaseTimerWorkIntervalCounter,
    playRest,
    playWork,
    resetTimer,
    setTimerId,
    throwTimerError,
    timeManager,
    timerStatus,
    timerWorkIntervalDuration,
    toastRest,
    toastWork,
    todoId,
    toggleTimerIsRunning,
    updateTime,
  ]);
}
