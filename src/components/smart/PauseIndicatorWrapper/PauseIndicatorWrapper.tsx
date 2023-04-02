import React from "react";
import { useDayStatistic } from "../../../hooks";
import { MetricIndicator } from "../../simple";

export function PauseIndicatorWrapper() {
  const dayStatistic = useDayStatistic();

  const ROLE = "pause";

  const SECONDS_PER_MINUTES = 60;
  const SECONDS_PER_HOUR = 3600;

  const value =
    dayStatistic && dayStatistic.pauseTime
      ? dayStatistic.pauseTime.seconds +
        dayStatistic.pauseTime.minutes * SECONDS_PER_MINUTES +
        dayStatistic.pauseTime.hours * SECONDS_PER_HOUR
      : 0;

  return <MetricIndicator role={ROLE} value={value} gridArea={ROLE} />;
}
