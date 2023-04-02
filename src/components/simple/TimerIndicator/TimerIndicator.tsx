import React from "react";

import { Heading } from "@chakra-ui/react";

export interface ITimerIndicatorProps {
  minutes: number;
  seconds: number;
  color: string;
}

export function TimerIndicator(props: ITimerIndicatorProps) {
  const { minutes, seconds, color } = props;

  const min = minutes.toLocaleString("ru-RU", {
    minimumIntegerDigits: 2,
  });
  const sec = seconds.toLocaleString("ru-RU", {
    minimumIntegerDigits: 2,
  });

  return (
    <Heading
      as="h3"
      variant="noSelection"
      flex={{ base: "0 1 auto", sm: "0 0 50%", md: "1 0 50%", xl: "0 1 75%" }}
      fontSize={{ base: "3rem", md: "6rem", lg: "7rem", xl: "9.5rem" }}
      fontWeight={"thin"}
      lineHeight={1}
      textAlign="center"
      color={color}
    >
      {min} : {sec}
    </Heading>
  );
}
