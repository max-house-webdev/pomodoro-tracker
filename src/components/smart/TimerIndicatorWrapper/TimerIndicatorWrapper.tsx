import React from "react";
import { useTimerStore } from "../../../store";
import { TimerIndicator } from "../../../components";
import {
  useBrandGreenModeValue,
  useBrandRedModeValue,
  useTextColor,
} from "../../../hooks";

export function TimerIndicatorWrapper() {
  const { minutes, seconds } = useTimerStore((state) => state.time);

  const timerStatus = useTimerStore((state) => state.timerStatus);
  const colorWork = useBrandRedModeValue(400);
  const colorRest = useBrandGreenModeValue(100);
  const colorPause = useTextColor();

  let color = colorPause;

  switch (timerStatus) {
    case "work": {
      color = colorWork;
      break;
    }
    case "shortRest":
    case "longRest": {
      color = colorRest;
      break;
    }
    default: {
      color = colorPause;
    }
  }

  return <TimerIndicator minutes={minutes} seconds={seconds} color={color} />;
}
