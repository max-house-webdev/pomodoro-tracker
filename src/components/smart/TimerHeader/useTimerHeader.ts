import { useTimerStore } from "../../../store";

export function useTimerHeader() {
  const todoTitle = useTimerStore((state) => state.todoTitle);
  const timerWorkIntervalCounter = useTimerStore(
    (state) => state.timerWorkIntervalCounter
  );
  const timerRestIntervalCounter = useTimerStore(
    (state) => state.timerRestIntervalCounter
  );
  const timerStatus = useTimerStore((state) => state.timerStatus);
  const isTodoDefined = !!useTimerStore((state) => state.todoId);
  const timerError = useTimerStore((state) => state.timerError);

  return {
    timerStatus,
    isTodoDefined,
    todoTitle,
    timerWorkIntervalCounter,
    timerRestIntervalCounter,
    timerError,
  };
}
