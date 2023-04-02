import React, { useEffect } from "react";
import { Portal } from "@chakra-ui/react";

import { Error } from "../../../components";
import { useStatisticStore, useTimerStore } from "../../../store";

export function StatisticProvider() {
  const timerStatus = useTimerStore((state) => state.timerStatus);
  const setAppStart = useStatisticStore((state) => state.setAppStart);

  const getTodayStatistic = useStatisticStore(
    (state) => state.getTodayStatistic
  );

  const todayStatistic = getTodayStatistic();
  const updateRestTime = useStatisticStore((state) => state.updateRestTime);
  const updateWorkTime = useStatisticStore((state) => state.updateWorkTime);
  const updatePauseTime = useStatisticStore((state) => state.updatePauseTime);
  const updateFocusFraction_percent = useStatisticStore(
    (state) => state.updateFocusFraction_percent
  );

  setAppStart();

  useEffect(() => {
    const SECOND = 1e3;
    let timerId: string | number | NodeJS.Timeout | null | undefined = null;
    switch (timerStatus) {
      case "work": {
        const tick = () => {
          updateWorkTime();
          updateFocusFraction_percent();
        };
        timerId = setInterval(tick, SECOND);
        break;
      }

      case "shortRest":
      case "longRest": {
        const tick = () => {
          updateRestTime();
          updateFocusFraction_percent();
        };
        timerId = setInterval(tick, SECOND);
        break;
      }
      case "work-pause":
      case "shortRest-pause":
      case "longRest-pause": {
        const tick = () => {
          updatePauseTime();
        };
        timerId = setInterval(tick, SECOND);
        break;
      }
    }
    if (timerId) {
      return () => clearInterval(timerId as number);
    }
  });

  if (!todayStatistic) {
    return (
      <Portal>
        <Error errorMessage="Не найдена статистика за сегодня" />
      </Portal>
    );
  }

  return null;
}
