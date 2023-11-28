import { useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useTodosStore } from "../../../store";

export function TodoListError() {
  const todoError = useTodosStore((state) => state.todoError);
  const resetTodoError = useTodosStore((state) => state.resetTodoError);

  const toast = useToast();

  useEffect(() => {
    if (todoError) {
      toast({
        title: todoError,
        status: "error",
        duration: 2000,
        isClosable: true,
        onCloseComplete: () => {
          resetTodoError();
        },
      });
    }
  }, [resetTodoError, toast, todoError]);

  return null;
}
