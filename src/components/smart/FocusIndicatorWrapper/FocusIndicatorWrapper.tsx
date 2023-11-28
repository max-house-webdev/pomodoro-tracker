import React from "react";
import { useDayStatistic } from "../../../hooks";
import { MetricIndicator } from "../../../components";

export function FocusIndicatorWrapper() {
  const dayStatistic = useDayStatistic();
  const ROLE = "focus";

  const value =
    dayStatistic && dayStatistic.focusFraction_percent
      ? Math.round(dayStatistic.focusFraction_percent * 100)
      : 0;

  return <MetricIndicator role={ROLE} value={value} gridArea={ROLE} />;
}
