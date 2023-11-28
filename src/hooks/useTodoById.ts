import { useCallback } from "react";

import { useTodosStore } from "../store";

export function useTodoById(todoId: string) {
  const todos = useTodosStore((state) => state.todos);

  const getTodo = useCallback(() => {
    if (!todos.length) return null;

    return todos.find((todo) => {
      if (todo.id === todoId) {
        return todo;
      }
      return null;
    });
  }, [todoId, todos]);

  return getTodo();
}
