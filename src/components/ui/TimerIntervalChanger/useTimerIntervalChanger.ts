import { useCallback } from "react";

import { useTimerStore, useTodosStore } from "../../../store";

export function useTimerIntervalChanger() {
  const todoId = useTimerStore((state) => state.todoId);

  const timeManager = useTimerStore((state) => state.timeManager);

  const isTimerRunning = useTimerStore((state) => state.isTimerRunning);
  const increaseTimerWorkIntervalDuration = useTimerStore(
    (state) => state.increaseTimerWorkIntervalDuration
  );
  const decreaseTimerWorkIntervalDuration = useTimerStore(
    (state) => state.decreaseTimerWorkIntervalDuration
  );

  const timerWorkIntervalDuration = useTimerStore(
    (state) => state.timerWorkIntervalDuration
  );

  const increaseTodoWorkIntervalDuration = useTodosStore(
    (state) => state.increaseTodoWorkIntervalDuration
  );

  const increaseCurrentTodoWorkIntervalDuration = useCallback(() => {
    increaseTodoWorkIntervalDuration({ id: todoId, timeManager });
  }, [increaseTodoWorkIntervalDuration, timeManager, todoId]);

  const decreaseTodoWorkIntervalDuration = useTodosStore(
    (state) => state.decreaseTodoWorkIntervalDuration
  );

  const decreaseCurrentTodoWorkIntervalDuration = useCallback(() => {
    decreaseTodoWorkIntervalDuration({ id: todoId, timeManager });
  }, [decreaseTodoWorkIntervalDuration, timeManager, todoId]);

  const isDecreaseDisabled =
    isTimerRunning ||
    timerWorkIntervalDuration <= timeManager.workIntervalDuration;

  const isIncreaseDisabled = isTimerRunning || !todoId;

  return {
    isDecreaseDisabled,
    isIncreaseDisabled,
    increaseTimerWorkIntervalDuration,
    decreaseTimerWorkIntervalDuration,
    increaseCurrentTodoWorkIntervalDuration,
    decreaseCurrentTodoWorkIntervalDuration,
  };
}
