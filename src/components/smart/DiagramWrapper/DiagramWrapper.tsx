import React from "react";
import { VStack } from "@chakra-ui/react";

import { DiagramBgGrid, Diagram, DiagramControl } from "../../../components";
import { useBrandGrayModeValue, usePrevious } from "../../../hooks";
import { TWeekSelector, useStatisticStore } from "../../../store";

export function DiagramWrapper() {
  const weekSelector = useStatisticStore((state) => state.weekSelector);
  const daySelector = useStatisticStore((state) => state.daySelector);
  const getWeekStatistic = useStatisticStore((state) => state.getWeekStatistic);
  const bgColor = useBrandGrayModeValue(100);

  const prevWeekSelector = usePrevious<TWeekSelector>(weekSelector);

  const animate = prevWeekSelector !== weekSelector;

  const weekStatistic = getWeekStatistic();
  const MINUTES_PER_HOUR = 60;
  const workTimeArray = weekStatistic.map((day) => {
    return day.workTime
      ? day.workTime.hours + day.workTime.minutes / MINUTES_PER_HOUR
      : 0;
  });

  const MAX_TIME_BY_DEFAULT = 2.5;
  const maxTime =
    Math.max(...workTimeArray) === 0
      ? MAX_TIME_BY_DEFAULT
      : Math.ceil(Math.max(...workTimeArray));

  const diagramData = weekStatistic.map((dayStatistic) => ({
    fraction: dayStatistic.workTime
      ? (dayStatistic.workTime.hours +
          dayStatistic.workTime.minutes / MINUTES_PER_HOUR) /
        maxTime
      : 0,
    day: dayStatistic.appStart.weekday,
  }));

  const getHoursMinutes = (h: number) => {
    const hours = Math.trunc(h);
    const minutes = Math.trunc((h - hours) * MINUTES_PER_HOUR);
    return { hours, minutes };
  };

  const getLabel = (fraction: number) => {
    let label = "";
    const h = getHoursMinutes(maxTime * fraction).hours;
    if (h) {
      label = `${h} ч`;
    }
    const min = getHoursMinutes(maxTime * fraction).minutes;
    if (min) {
      label += ` ${min} мин`;
    }

    return label;
  };

  const FIFTH_FRACTION = 0.2;

  const labels = [
    getLabel(4 * FIFTH_FRACTION),
    getLabel(3 * FIFTH_FRACTION),
    getLabel(2 * FIFTH_FRACTION),
    getLabel(FIFTH_FRACTION),
  ];

  return (
    <VStack
      justifyContent="space-between"
      alignItems="stretch"
      position="relative"
      h="100%"
      bgColor={bgColor}
      data-testid="DiagramWrapper"
    >
      <DiagramBgGrid labels={labels} />
      <DiagramControl />
      <Diagram
        activeDay={daySelector}
        diagramData={diagramData}
        animate={animate}
      />
    </VStack>
  );
}
