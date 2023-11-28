import React from "react";
import { HStack, VStack } from "@chakra-ui/react";
import {
  LongRestIntervalFrequencySetter,
  LongRestIntervalSetter,
  PageHeading,
  ShortRestIntervalSetter,
  SoundCheckboxWrapper,
  StorageCleaner,
  TimerDefaultSetter,
  ToastCheckboxWrapper,
  WorkIntervalSetter,
} from "../components";

export function ControlPage() {
  return (
    <VStack
      alignItems={["stretch", null, null, "flex-start"]}
      pt={{ sm: 2, md: 5, xl: 10, "2xl": 100 }}
      gap={5}
    >
      <PageHeading textcontent={"Настройки таймера"} />
      <WorkIntervalSetter />
      <ShortRestIntervalSetter />
      <LongRestIntervalSetter />
      <LongRestIntervalFrequencySetter />
      <SoundCheckboxWrapper />
      <ToastCheckboxWrapper />
      <HStack
        maxW="44rem"
        width={["auto", null, null, "75%"]}
        justifyContent="space-between"
      >
        <TimerDefaultSetter />
        <StorageCleaner />
      </HStack>
    </VStack>
  );
}
