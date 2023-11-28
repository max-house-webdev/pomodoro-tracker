import React from "react";
import { Flex, Heading, keyframes } from "@chakra-ui/react";

import { useTimerHeaderColorModeValue } from "./useTimerHeaderColorModeValue";
import { useTimerHeader } from "./useTimerHeader";
import {
  TimerErrorIndicator,
  TimerHeaderIntervalIndicator,
} from "../../../components";
import { TTimerStatus } from "../../../store";
import { useKeyframesAnimation } from "../../../hooks";

export function TimerHeader() {
  const { bgColorStop, bgColorWork, bgColorRest, textColor, hintColor } =
    useTimerHeaderColorModeValue();

  const {
    isTodoDefined,
    timerStatus,
    todoTitle,
    timerWorkIntervalCounter,
    timerRestIntervalCounter,
    timerError,
  } = useTimerHeader();

  const getBgColor = () => {
    if (timerError) {
      return bgColorStop;
    }

    switch (timerStatus) {
      case "ready":
      case "stop": {
        return bgColorStop;
      }

      case "work":
      case "work-pause": {
        return bgColorWork;
      }

      case "shortRest":
      case "longRest":
      case "shortRest-pause":
      case "longRest-pause": {
        return bgColorRest;
      }

      default: {
        return bgColorStop;
      }
    }
  };

  interface IIntervalIndicatorProps {
    timerStatus: TTimerStatus;
    isTodoDefined: boolean;
    timerError: string | null;
  }

  const IntervalIndicatorHOC = (props: IIntervalIndicatorProps) => {
    const { timerStatus, isTodoDefined, timerError } = props;

    if (timerError) {
      return <TimerErrorIndicator errorMessage={timerError} />;
    }

    if (!isTodoDefined) {
      return null;
    }

    switch (timerStatus) {
      case "ready": {
        return (
          <TimerHeaderIntervalIndicator textColor={textColor} role={"ready"} />
        );
      }
      case "stop": {
        return (
          <TimerHeaderIntervalIndicator
            textColor={textColor}
            role={"stop"}
            timerIntervalCounter={timerWorkIntervalCounter}
          />
        );
      }
      case "work":
      case "work-pause": {
        return (
          <TimerHeaderIntervalIndicator
            timerIntervalCounter={timerWorkIntervalCounter}
            textColor={textColor}
            role={"work"}
          />
        );
      }

      case "shortRest":
      case "shortRest-pause": {
        return (
          <TimerHeaderIntervalIndicator
            timerIntervalCounter={timerRestIntervalCounter}
            textColor={textColor}
            role={"shortRest"}
          />
        );
      }

      case "longRest":
      case "longRest-pause": {
        return (
          <TimerHeaderIntervalIndicator
            timerIntervalCounter={timerRestIntervalCounter}
            textColor={textColor}
            role={"longRest"}
          />
        );
      }

      default: {
        return null;
      }
    }
  };

  const animationCSSInterpolation = `
  from {  transform: translateY(-100%); opacity: 0; }
  to {  transform: translateY(0); opacity: 1; }
`;

  const animationDuration = 600;

  const animation = useKeyframesAnimation({
    animationCSSInterpolation,
    animationDuration,
  });

  const TitleHOC = (props: { isTodoDefined: any; todoTitle: string }) => {
    const { isTodoDefined, todoTitle } = props;

    if (!isTodoDefined)
      return (
        <Heading
          as="h4"
          flex={"0 0 60%"}
          variant={"noSelection"}
          color={hintColor}
          fontSize={"md"}
        >
          {todoTitle}
        </Heading>
      );

    return (
      <Heading
        as="h4"
        flex={"0 0 60%"}
        variant={"noSelection"}
        color={textColor}
        animation={timerStatus === "ready" ? animation : undefined}
        fontSize={"md"}
      >
        {todoTitle}
      </Heading>
    );
  };

  return (
    <Flex
      flexDirection={{ base: "column", md: "row" }}
      justifyContent={{ base: "center", md: "space-between" }}
      alignItems={{ base: "flex-start", md: "center" }}
      minH={{ base: "3.8rem", lg: "3.4375rem" }}
      mb="2.75rem"
      px="1.25rem"
      py={{ base: "0.5rem", lg: "1rem" }}
      bgColor={getBgColor()}
    >
      <TitleHOC isTodoDefined={isTodoDefined} todoTitle={todoTitle} />

      <IntervalIndicatorHOC
        timerStatus={timerStatus}
        isTodoDefined={isTodoDefined}
        timerError={timerError}
      />
    </Flex>
  );
}
