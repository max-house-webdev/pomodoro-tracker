import React from "react";

import { TomatoIndicator } from "../../../components";
import { useDayStatistic } from "../../../hooks";

export function TomatoIndicatorWrapper() {
  const dayStatistic = useDayStatistic();

  const workIntervalNumber: number = dayStatistic
    ? dayStatistic.intervalsNumber
    : 0;

  return <TomatoIndicator workIntervalNumber={workIntervalNumber} />;
}
