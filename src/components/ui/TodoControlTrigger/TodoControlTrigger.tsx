import {
  IconButton,
  Popover,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useBrandGreenModeValue, useTodoById } from "../../../hooks";
import { ThreeCirclesIcon, TodoControl } from "../../../components";
import { useTimerStore } from "../../../store";

export interface ITodoControlTriggerProps {
  todoId: string;
}

export function TodoControlTrigger(props: ITodoControlTriggerProps) {
  const { todoId } = props;

  const {
    isOpen: isPopoverOpen,
    onToggle: popoverOnToggle,
    onClose: popoverOnClose,
  } = useDisclosure();
  const outlineColor = useBrandGreenModeValue(100);
  const timerStatus = useTimerStore((state) => state.timerStatus);
  const timerTodoId = useTimerStore((state) => state.todoId);
  const thisTodo = useTodoById(todoId);

  const editable = thisTodo ? thisTodo.editable : false;
  const isTimerState = timerStatus !== "ready" && timerStatus !== "stop";
  const isInProgress =
    isTimerState && timerTodoId ? todoId === timerTodoId : false;
  const isTriggerDisabled = editable || isInProgress;

  return (
    <Popover isOpen={isPopoverOpen}>
      <PopoverTrigger>
        <IconButton
          variant="button"
          isDisabled={isTriggerDisabled}
          onClick={popoverOnToggle}
          icon={<ThreeCirclesIcon />}
          aria-label={"toggle todo controls"}
          _focusVisible={{ outlineColor }}
          data-testid="TodoControlTrigger"
        />
      </PopoverTrigger>

      {isPopoverOpen && (
        <TodoControl
          todoId={todoId}
          isPopoverOpen={isPopoverOpen}
          popoverOnClose={popoverOnClose}
        />
      )}
    </Popover>
  );
}
