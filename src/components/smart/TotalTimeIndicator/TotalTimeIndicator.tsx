import React from "react";
import { Text } from "@chakra-ui/react";
import { useBrandGrayModeValue } from "../../../hooks";
import { useTodosStore } from "../../../store";

export function TotalTimeIndicator() {
  const color = useBrandGrayModeValue(400);
  const todos = useTodosStore((state) => state.todos);

  if (!todos.length) return null;

  let minutes = 0;

  todos.forEach((todo) => {
    const { workIntervalDuration, workIntervalNumber } = todo;
    minutes += workIntervalDuration * workIntervalNumber;
  });

  return (
    <Text as="span" variant="selectionGray" color={color}>
      {minutes} мин
    </Text>
  );
}
