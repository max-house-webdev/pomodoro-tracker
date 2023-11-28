import { useCallback } from "react";
import { useStatisticStore } from "../store";

export function useDayStatistic() {
  const weekSelector = useStatisticStore((state) => state.weekSelector);
  const daySelector = useStatisticStore((state) => state.daySelector);
  const getWeekStatistic = useStatisticStore((state) => state.getWeekStatistic);

  const weekStatistic = useCallback(getWeekStatistic, [
    getWeekStatistic,
    weekSelector,
  ])();

  return weekStatistic.find((day) => day.appStart.weekday === daySelector);
}
