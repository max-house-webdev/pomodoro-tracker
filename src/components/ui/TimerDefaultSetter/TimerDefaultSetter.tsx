import { Button } from "@chakra-ui/react";
import React from "react";
import { useFirstTodo } from "../../../hooks";
import { useThemeStore, useTimerStore, useTodosStore } from "../../../store";

export function TimerDefaultSetter() {
  const currentTodo = useFirstTodo();
  const setCurrentTodoWorkIntervalDuration = useTodosStore(
    (state) => state.setWorkIntervalDuration
  );

  const setWorkIntervalDuration = useTimerStore(
    (state) => state.setWorkIntervalDuration
  );
  const setShortRestIntervalDuration = useTimerStore(
    (state) => state.setShortRestIntervalDuration
  );
  const setLongRestIntervalDuration = useTimerStore(
    (state) => state.setLongRestIntervalDuration
  );
  const setLongRestIntervalFrequency = useTimerStore(
    (state) => state.setLongRestIntervalFrequency
  );

  const toggleIsSoundAllowed = useThemeStore(
    (store) => store.toggleIsSoundAllowed
  );
  const toggleIsToastAllowed = useThemeStore(
    (store) => store.toggleIsToastAllowed
  );

  const setDefault = () => {
    const WORK_INTERVAL__DURATION_BY_DEFAULT = 25;
    setWorkIntervalDuration(WORK_INTERVAL__DURATION_BY_DEFAULT);
    const SHORT_REST_INTERVAL__DURATION_BY_DEFAULT = 5;
    setShortRestIntervalDuration(SHORT_REST_INTERVAL__DURATION_BY_DEFAULT);
    const LONG_REST_INTERVAL__DURATION_BY_DEFAULT = 15;
    setLongRestIntervalDuration(LONG_REST_INTERVAL__DURATION_BY_DEFAULT);
    const SET_LONG_REST_INTERVAL_EVERY = 4;
    setLongRestIntervalFrequency(SET_LONG_REST_INTERVAL_EVERY);
    toggleIsSoundAllowed(false);
    toggleIsToastAllowed(true);

    if (!currentTodo) {
      return;
    }
    const { id } = currentTodo;
    setCurrentTodoWorkIntervalDuration({
      id,
      workIntervalDuration: WORK_INTERVAL__DURATION_BY_DEFAULT,
    });
  };
  return (
    <Button
      type="submit"
      variant="brandPrimaryGreen"
      onClick={setDefault}
      alignSelf="flex-start"
      data-testid="TimerDefaultSetter"
    >
      По умолчанию
    </Button>
  );
}
