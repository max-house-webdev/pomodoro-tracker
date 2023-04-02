import React from "react";
import { Text } from "@chakra-ui/react";

export interface ITimerHeaderIntervalIndicatorProps {
  role: "ready" | "stop" | "work" | "shortRest" | "longRest";
  timerIntervalCounter?: number;
  textColor: string;
}

export function TimerHeaderIntervalIndicator(
  props: ITimerHeaderIntervalIndicatorProps
) {
  const { role, timerIntervalCounter, textColor } = props;

  return (
    <Text
      as="span"
      flex={"0 0 40%"}
      color={textColor}
      textAlign={"end"}
      variant={"selectionGray"}
    >
      {role === "ready" && "Запустите таймер"}
      {role === "stop" && `Помидор ${timerIntervalCounter || 0 + 1}`}
      {role === "work" && `Помидор ${timerIntervalCounter || ""}`}
      {role === "shortRest" && `Перерыв ${timerIntervalCounter || ""}`}
      {role === "longRest" && "Длинный перерыв"}
    </Text>
  );
}
