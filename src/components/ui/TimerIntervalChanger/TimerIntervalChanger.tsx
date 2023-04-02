import React from "react";
import { IconButton } from "@chakra-ui/react";

import { Minus } from "./Minus";
import { Plus } from "./Plus";
import { useTimerIntervalChangerColorModeValue } from "./useTimerIntervalChangerColorModeValue";
import { useTimerIntervalChanger } from "./useTimerIntervalChanger";

export interface ITimerIntervalChangerProps {
  role: "increase" | "decrease";
}

export function TimerIntervalChanger(props: ITimerIntervalChangerProps) {
  const { role } = props;

  const {
    isDecreaseDisabled,
    isIncreaseDisabled,
    increaseTimerWorkIntervalDuration,
    decreaseTimerWorkIntervalDuration,
    increaseCurrentTodoWorkIntervalDuration,
    decreaseCurrentTodoWorkIntervalDuration,
  } = useTimerIntervalChanger();

  const { color, bgColor, bgColorHovered } =
    useTimerIntervalChangerColorModeValue();

  const isDisabled =
    role === "increase" ? isIncreaseDisabled : isDecreaseDisabled;

  const icon =
    role === "increase" ? <Plus color={color} /> : <Minus color={color} />;

  const ariaLabel =
    role === "increase" ? "increase work interval" : "decrease work interval";

  const increase = () => {
    increaseTimerWorkIntervalDuration();
    increaseCurrentTodoWorkIntervalDuration();
  };
  const decrease = () => {
    decreaseTimerWorkIntervalDuration();
    decreaseCurrentTodoWorkIntervalDuration();
  };

  const onClick = role === "increase" ? increase : decrease;

  return (
    <IconButton
      icon={icon}
      isDisabled={isDisabled}
      onClick={onClick}
      bgColor={bgColor}
      _focusVisible={{ outlineColor: bgColor, outlineOffset: "2px" }}
      _hover={{ backgroundColor: bgColorHovered }}
      w={{ base: "2.5rem", "2xl": "3.125rem" }}
      h={{ base: "2.5rem", "2xl": "3.125rem" }}
      borderRadius={"100%"}
      data-testid="TimerIntervalChanger"
      aria-label={ariaLabel}
    />
  );
}
