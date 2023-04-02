import React from "react";
import { Text, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { useBrandGrayModeValue } from "../../../hooks";

export interface ITodoItemTitleProps {
  index: number;
  title: string;
  isTimerRunning?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

export function TodoItemTitle(props: ITodoItemTitleProps) {
  const {
    title,
    onMouseEnter,
    onMouseLeave,
    onClick,
    index,
    isTimerRunning = false,
  } = props;

  const tooltipBgcolor = useBrandGrayModeValue(100);
  const tooltipColor = useColorModeValue("blackAlpha.700", "whiteAlpha.700");

  return (
    <Tooltip
      placement="right-start"
      hasArrow
      label={
        isTimerRunning
          ? "Изменение порядка доступно после остановки таймера"
          : "Установить эту задачу первой в списке"
      }
      maxW={"12rem"}
      bg={tooltipBgcolor}
      color={tooltipColor}
      isDisabled={index === 0}
    >
      <Text
        variant={"selectionGray"}
        flex="1 0 15rem"
        mx="0.25rem"
        px="0.35rem"
        py="0.5rem"
        textDecorationColor="gray.600"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        cursor={index === 0 || isTimerRunning ? "auto" : "pointer"}
        onMouseEnter={index === 0 ? onMouseLeave : onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        {title}
      </Text>
    </Tooltip>
  );
}
