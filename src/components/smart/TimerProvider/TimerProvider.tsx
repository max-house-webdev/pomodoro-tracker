import { useEffect } from "react";

import { useFirstTodo, useTimer } from "../../../hooks";
import { useTimerStore } from "../../../store";

export function TimerProvider() {
  const currentTodo = useFirstTodo();

  const updateCurrentTodo = useTimerStore((state) => state.updateCurrentTodo);
  const resetTimer = useTimerStore((state) => state.resetTimer);

  const timerStatus = useTimerStore((state) => state.timerStatus);

  useEffect(() => {
    if (!currentTodo) {
      resetTimer();
      return;
    }

    const { id, title, workIntervalNumber, workIntervalDuration } = currentTodo;

    updateCurrentTodo({
      todoId: id,
      todoTitle: title,
      workIntervalNumber,
      workIntervalDuration,
    });
  }, [currentTodo, resetTimer, timerStatus, updateCurrentTodo]);

  useTimer();

  return null;
}
