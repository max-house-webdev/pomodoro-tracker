import { useCallback } from "react";
import { useTodosStore } from "../store";

export function useFirstTodo() {
  const todos = useTodosStore((state) => state.todos);

  const getTodo = useCallback(() => {
    if (!todos.length) return null;

    return todos[0];
  }, [todos]);

  return getTodo();
}
