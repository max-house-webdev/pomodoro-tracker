import React from "react";
import { Text } from "@chakra-ui/react";

import { TodoList } from "../../../components";
import { useBrandGrayModeValue } from "../../../hooks";

import { TTodo, useTodosStore } from "../../../store";

export function TodoListWrapper() {
  const hintColor = useBrandGrayModeValue(300);

  const todos = useTodosStore((state) => state.todos);

  return !todos.length ? (
    <Text color={hintColor} pb="1rem">
      Здесь будет список задач
    </Text>
  ) : (
    <TodoList todos={todos as Array<TTodo>} />
  );
}
