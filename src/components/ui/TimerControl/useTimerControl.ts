import { useBlipSound, useToastWork } from "../../../hooks";
import {
  useStatisticStore,
  useTimerStore,
  useTodosStore,
} from "../../../store";

export function useTimerControl() {
  const toastWork = useToastWork();
  const playWork = useBlipSound();
  //* todos
  const decreaseTodoWorkIntervalNumber = useTodosStore(
    (state) => state.decreaseTodoWorkIntervalNumber
  );
  //* timer
  const todoId = useTimerStore((state) => state.todoId);
  const timerStatus = useTimerStore((state) => state.timerStatus);
  const timeManager = useTimerStore((state) => state.timeManager);
  const timerWorkIntervalDuration = useTimerStore(
    (state) => state.timerWorkIntervalDuration
  );
  const setTimerStatus = useTimerStore((state) => state.setTimerStatus);
  const getTimerStatus = useTimerStore((state) => state.getTimerStatus);
  const increaseTimerWorkIntervalCounter = useTimerStore(
    (state) => state.increaseTimerWorkIntervalCounter
  );
  const decreaseTimerWorkIntervalCounter = useTimerStore(
    (state) => state.decreaseTimerWorkIntervalCounter
  );
  const updateTime = useTimerStore((state) => state.updateTime);
  const clearTimerInterval = useTimerStore((state) => state.clearTimerInterval);
  //* statistic
  const increaseStatisticStopNumber = useStatisticStore(
    (state) => state.increaseStopNumber
  );

  //* control buttons callback
  //* start
  const startButtonClick = () => {
    const timerStatus = getTimerStatus();
    if (timerStatus === "ready") {
      playWork();
      toastWork();
    }

    setTimerStatus("work");
    increaseTimerWorkIntervalCounter();
  };
  const startButtonIsDisabled = !todoId;

  //* stop
  const stopButtonClick = () => {
    setTimerStatus("stop");
    decreaseTimerWorkIntervalCounter();
    increaseStatisticStopNumber();
  };
  const stopButtonIsDisabled =
    timerStatus === "stop" || timerStatus === "ready";

  //* pause
  const pauseButtonClick = () => {
    const timerStatus = getTimerStatus();

    switch (timerStatus) {
      case "work": {
        setTimerStatus("work-pause");
        break;
      }
      case "shortRest": {
        setTimerStatus("shortRest-pause");
        break;
      }
      case "longRest": {
        setTimerStatus("longRest-pause");
        break;
      }
      default: {
        setTimerStatus("stop");
      }
    }
  };

  //* resume
  const resumeButtonClick = () => {
    const timerStatus = getTimerStatus();

    switch (timerStatus) {
      case "work-pause": {
        setTimerStatus("work");
        break;
      }

      case "shortRest-pause": {
        setTimerStatus("shortRest");
        break;
      }

      case "longRest-pause": {
        setTimerStatus("longRest");
        break;
      }

      default: {
        setTimerStatus("stop");
      }
    }
  };

  //* skip
  const skipButtonClick = () => {
    clearTimerInterval();
    increaseTimerWorkIntervalCounter();
    updateTime({ minutes: timerWorkIntervalDuration, seconds: 0 });
    if (todoId) {
      decreaseTodoWorkIntervalNumber({ id: todoId, timeManager });
    }
  };

  //* complete / done
  const completeButtonClick = () => {
    setTimerStatus("completed");
  };

  return {
    startButtonClick,
    startButtonIsDisabled,
    stopButtonClick,
    stopButtonIsDisabled,
    pauseButtonClick,
    resumeButtonClick,
    skipButtonClick,
    completeButtonClick,
  };
}
