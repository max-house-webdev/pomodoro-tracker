import React from "react";
import { Text } from "@chakra-ui/react";

export interface ITodoItemWorkIntervalIndicatorProps {
  workIntervalNumber: number;
  onClick?: () => void;
}

export function TodoItemWorkIntervalIndicator(
  props: ITodoItemWorkIntervalIndicatorProps
) {
  const { workIntervalNumber, onClick } = props;

  return (
    <Text
      as="span"
      flex="0 0 1.75rem"
      position="relative"
      mr="0.25rem"
      w="1.75rem"
      h="1.75rem"
      fontSize="1rem"
      textAlign="center"
      variant="selectionGray"
      onClick={onClick}
      visibility={workIntervalNumber === 0 ? "hidden" : undefined}
      _after={{
        content: '""',
        display: "inline-block",
        position: "absolute",
        left: "0px",
        w: "100%",
        h: "100%",
        borderColor: "gray.100",
        borderWidth: "2px",
        borderRadius: "50%",
      }}
    >
      {workIntervalNumber}
    </Text>
  );
}
