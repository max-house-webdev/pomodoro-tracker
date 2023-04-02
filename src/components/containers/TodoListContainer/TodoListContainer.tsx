import { VStack } from "@chakra-ui/react";
import React from "react";
import {
  TodoListError,
  TodoListWrapper,
  TotalTimeIndicator,
} from "../../../components";

export function TodoListContainer() {
  return (
    <VStack display="flex" flexDirection="column" alignItems="strech">
      <TodoListWrapper />
      <TodoListError />
      <TotalTimeIndicator />
    </VStack>
  );
}
