import React from "react";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  useDisclosure,
} from "@chakra-ui/react";

import { v4 as uuid } from "uuid";

import { ConfirmDeleteTodo, Overlay } from "../../../components";

import { TodoControlButton } from "./TodoControlButton";
import type { TAction } from "./TodoControlButton";

import { useMaletSound, useTodoById } from "../../../hooks";
import { useTimerStore, useTodosStore } from "../../../store";

export interface ITodoControlProps {
  todoId: string;
  isPopoverOpen: boolean;
  popoverOnClose: () => void;
}

export function TodoControl(props: ITodoControlProps) {
  const { todoId, isPopoverOpen, popoverOnClose } = props;
  const playDelete = useMaletSound();

  const thisTodo = useTodoById(todoId);

  const deleteTodo = useTodosStore((state) => state.deleteTodo);
  const getTodoArrayLength = useTodosStore(
    (state) => state.getTodosArrayLength
  );
  const toggleTodoEditable = useTodosStore((state) => state.toggleTodoEditable);

  const increaseTodoWorkIntervalNumber = useTodosStore(
    (state) => state.increaseTodoWorkIntervalNumber
  );
  const decreaseTodoWorkIntervalNumber = useTodosStore(
    (state) => state.decreaseTodoWorkIntervalNumber
  );
  const timeManager = useTimerStore((state) => state.timeManager);
  const resetTimer = useTimerStore((state) => state.resetTimer);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const onConfirm = () => {
    deleteTodo(todoId);

    if (getTodoArrayLength() === 0) {
      resetTimer();
    }

    popoverOnClose();
  };

  const todoControlButtons = [
    {
      action: "increase",
      isDisabled:
        !thisTodo ||
        thisTodo.workIntervalNumber === timeManager.maxWorkIntervalNumber,
      onClick: () => {
        increaseTodoWorkIntervalNumber({ id: todoId, timeManager });
      },
    },
    {
      action: "decrease",
      isDisabled:
        !thisTodo ||
        thisTodo.workIntervalNumber === timeManager.minWorkIntervalNumber,
      onClick: () => {
        decreaseTodoWorkIntervalNumber({ id: todoId, timeManager });
      },
    },
    {
      action: "edit",
      isDisabled: false,
      onClick: () => {
        toggleTodoEditable({
          id: todoId,
          editable: thisTodo ? !thisTodo.editable : false,
        });

        popoverOnClose();
      },
    },
    {
      action: "delete",
      isDisabled: false,
      onClick: () => {
        playDelete();
        onOpen();
      },
    },
  ];

  return (
    <>
      <PopoverContent w="10rem" zIndex={150}>
        <PopoverArrow />
        <PopoverBody
          display="flex"
          position="relative"
          flexDirection="column"
          color="gray.400"
          zIndex={150}
        >
          {todoControlButtons.map((button) => {
            const { action, isDisabled, onClick } = button;
            return (
              <TodoControlButton
                action={action as TAction}
                isDisabled={isDisabled}
                onClick={onClick}
                key={uuid().slice(0, 8)}
              />
            );
          })}
        </PopoverBody>
      </PopoverContent>

      {isOpen && (
        <ConfirmDeleteTodo
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      )}

      {isPopoverOpen && <Overlay onClick={popoverOnClose} zIndex={1} />}
    </>
  );
}
