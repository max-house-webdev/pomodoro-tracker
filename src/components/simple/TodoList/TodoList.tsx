import React from "react";

import { List } from "@chakra-ui/react";
import { TodoListItemWrapper } from "../../../components";

import type { TTodo } from "../../../store";

export interface ITodoListProps {
  todos: TTodo[];
}

export function TodoList(props: ITodoListProps) {
  const { todos } = props;

  return (
    <List maxW="370px" mb="1.25rem" display="flex" flexDirection={"column"}>
      {todos.map((todo, index) => (
        <TodoListItemWrapper todoId={todo.id} index={index} key={todo.id} />
      ))}
    </List>
  );
}
