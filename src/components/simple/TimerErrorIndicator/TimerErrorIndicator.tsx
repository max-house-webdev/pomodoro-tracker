import React from "react";
import { Text } from "@chakra-ui/react";
import { useBrandRedModeValue } from "../../../hooks";

export interface ITimerErrorIndicatorProps {
  errorMessage: string;
}

export function TimerErrorIndicator(props: ITimerErrorIndicatorProps) {
  const { errorMessage } = props;

  const textColor = useBrandRedModeValue(400);

  return (
    <Text
      as="span"
      color={textColor}
      textAlign={"left"}
      fontSize={"0.75rem"}
      variant={"noSelection"}
    >
      {errorMessage}
    </Text>
  );
}
