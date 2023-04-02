import { Flex, HStack } from "@chakra-ui/react";
import React from "react";
import { useBrandGrayModeValue } from "../../../hooks";
import {
  TimerControl,
  TimerHeader,
  TimerIntervalChanger,
  TodoCounterWrapper,
  TimerProvider,
  TimerIndicatorWrapper,
} from "../../../components";

export function TimerContainer() {
  const bgColor = useBrandGrayModeValue(100);

  return (
    <Flex
      flexDirection={"column"}
      minHeight="20rem"
      mx={{ base: "-0.5rem", md: "0" }}
      pb="5rem"
      bgColor={bgColor}
    >
      <TimerProvider />
      <TimerHeader />
      <HStack justifyContent={"space-around"} mb="2rem" px="2.5rem">
        <TimerIntervalChanger role="decrease" />
        <TimerIndicatorWrapper />
        <TimerIntervalChanger role="increase" />
      </HStack>
      <TodoCounterWrapper />
      <TimerControl />
    </Flex>
  );
}
