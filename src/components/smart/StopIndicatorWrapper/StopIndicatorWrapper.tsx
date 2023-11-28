import React from "react";
import { useDayStatistic } from "../../../hooks";
import { MetricIndicator } from "../../simple";

export function StopIndicatorWrapper() {
  const dayStatistic = useDayStatistic();
  const ROLE = "stop";

  const value =
    dayStatistic && dayStatistic.stopNumber ? dayStatistic.stopNumber : 0;

  return <MetricIndicator role={ROLE} value={value} gridArea={ROLE} />;
}
