import React from "react";

import { TodoCounter, Error } from "../../../components";
import { useStatisticStore, useTimerStore } from "../../../store";

export function TodoCounterWrapper() {
  const getTodayStatistic = useStatisticStore(
    (state) => state.getTodayStatistic
  );

  const todayStatistic = getTodayStatistic();

  const todoTitle = useTimerStore((state) => state.todoTitle);
  const todoId = useTimerStore((state) => state.todoId);

  if (!todayStatistic) {
    return (
      <Error
        errorMessage="Не удалось определить статистику"
        fontSize={12}
        withIcon={false}
      />
    );
  }

  const { completedTodosNumber } = todayStatistic;

  return todoId ? (
    <TodoCounter
      data-testid="TodoCounterWrapper"
      todoTitle={todoTitle}
      completedTodosNumber={completedTodosNumber}
    />
  ) : null;
}
