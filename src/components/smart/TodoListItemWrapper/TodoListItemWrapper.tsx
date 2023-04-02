import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import {
  TodoControlTrigger,
  TodoListItem,
  TodoListItemEditable,
  TodoItemWorkIntervalIndicator,
  TodoItemTitle,
  ConfirmDeleteTodo,
} from "../../../components";
import { useTodoById } from "../../../hooks";
import { useTimerStore, useTodosStore } from "../../../store";

export interface ITodoListItemWrapperProps {
  todoId: string;
  index: number;
}

export function TodoListItemWrapper(props: ITodoListItemWrapperProps) {
  const { todoId, index } = props;
  const [hover, setHover] = useState(false);

  const thisTodo = useTodoById(todoId);

  const upriseTodo = useTodosStore((state) => state.upriseTodo);
  const deleteTodo = useTodosStore((state) => state.deleteTodo);

  const throwTodoError = useTodosStore((state) => state.throwTodoError);
  const isTimerRunning = useTimerStore((state) => state.isTimerRunning);

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (thisTodo) {
      if (thisTodo.workIntervalNumber === 0) {
        onOpen();
      }
      return;
    }

    throwTodoError(`Не найдена задача по id ${todoId}`);
  }, [onOpen, thisTodo, throwTodoError, todoId]);

  if (!thisTodo) {
    return null;
  }

  const onConfirm = () => {
    deleteTodo(todoId);
  };

  const onClick = () => {
    if (index === 0 || isTimerRunning) {
      return;
    }
    upriseTodo(todoId);
  };

  const onMouseEnter = () => {
    if (isTimerRunning) {
      return;
    }

    setHover(true);
  };

  const onMouseLeave = () => {
    if (isTimerRunning) {
      return;
    }

    setHover(false);
  };

  const { id, title, workIntervalNumber, editable } = thisTodo;

  return (
    <TodoListItem index={index} hover={index !== 0 ? hover : undefined}>
      <TodoItemWorkIntervalIndicator workIntervalNumber={workIntervalNumber} />
      {editable ? (
        <TodoListItemEditable todoId={id} />
      ) : (
        <TodoItemTitle
          title={title}
          onClick={onClick}
          index={index}
          isTimerRunning={isTimerRunning}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      )}
      <TodoControlTrigger todoId={id} />

      {isOpen && (
        <ConfirmDeleteTodo
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      )}
    </TodoListItem>
  );
}
