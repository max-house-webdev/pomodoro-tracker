import React from "react";
import { HStack } from "@chakra-ui/react";

import { Error } from "../../../components";
import { useTimerControl } from "./useTimerControl";
import { TimerControlButton } from "./TimerControlButton";
import { TTimerStatus, useTimerStore } from "../../../store";

export function TimerControl() {
  const timerStatus = useTimerStore((state) => state.timerStatus);
  const {
    startButtonClick,
    startButtonIsDisabled,
    stopButtonClick,
    stopButtonIsDisabled,
    pauseButtonClick,
    resumeButtonClick,
    skipButtonClick,
    completeButtonClick,
  } = useTimerControl();

  const ControlHOC = (props: { timerStatus: TTimerStatus }) => {
    const { timerStatus } = props;

    switch (timerStatus) {
      case "ready":
      case "stop":
      case "completed": {
        return (
          <>
            <TimerControlButton
              role={"start"}
              isDisabled={startButtonIsDisabled}
              onClick={startButtonClick}
            />
            <TimerControlButton
              role={"stop"}
              isDisabled={stopButtonIsDisabled}
              onClick={stopButtonClick}
            />
          </>
        );
      }

      case "work": {
        return (
          <>
            <TimerControlButton role={"pause"} onClick={pauseButtonClick} />
            <TimerControlButton
              role={"stop"}
              isDisabled={stopButtonIsDisabled}
              onClick={stopButtonClick}
            />
          </>
        );
      }

      case "work-pause": {
        return (
          <>
            <TimerControlButton role={"resume"} onClick={resumeButtonClick} />
            <TimerControlButton
              role={"complete"}
              onClick={completeButtonClick}
            />
          </>
        );
      }

      case "shortRest-pause":
      case "longRest-pause": {
        return (
          <>
            <TimerControlButton role={"resume"} onClick={resumeButtonClick} />
            <TimerControlButton role={"skip"} onClick={skipButtonClick} />
          </>
        );
      }

      case "shortRest":
      case "longRest": {
        return (
          <>
            <TimerControlButton role={"pause"} onClick={pauseButtonClick} />
            <TimerControlButton role={"skip"} onClick={skipButtonClick} />
          </>
        );
      }

      default: {
        return (
          <Error
            errorMessage="Не удалось определить статус таймера"
            fontSize={16}
          />
        );
      }
    }
  };

  return (
    <HStack
      data-testid="TimerControl"
      justifySelf={"flex-end"}
      justifyContent={"center"}
      mt={"auto"}
      spacing={"25px"}
    >
      <ControlHOC timerStatus={timerStatus} />
    </HStack>
  );
}
