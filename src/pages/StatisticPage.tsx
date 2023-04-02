import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import {
  DayIndicatorWrapper,
  DiagramWrapper,
  MetricContainer,
  PageHeading,
  TomatoIndicatorWrapper,
  WeekSelector,
} from "../components";

export function StatisticPage() {
  return (
    <Grid
      gridTemplateAreas={[
        ` "you-activity you-activity"
          "week-selector week-selector"
          "diagram diagram"
          "day-indicator tomato-indicator"
          "metric-container metric-container"`,
        ` "you-activity week-selector"
          "diagram diagram"
          "day-indicator tomato-indicator"
          "metric-container metric-container"`,
        null,

        ` "you-activity you-activity . . week-selector week-selector"
        "diagram diagram diagram diagram diagram diagram"
        "day-indicator day-indicator day-indicator tomato-indicator tomato-indicator tomato-indicator"
        "metric-container metric-container metric-container metric-container metric-container metric-container"`,

        ` "you-activity       .                 week-selector"
          "day-indicator      diagram           diagram"
          "tomato-indicator   diagram           diagram"
          "metric-container   metric-container  metric-container"`,
      ]}
      gridTemplateColumns={[
        "repeat(2, 1fr)",
        null,
        null,
        "repeat(6, 1fr)",
        "19rem 1fr 23rem",
      ]}
      gridTemplateRows={[
        "1rem 3.5rem minmax(29rem, auto) 11.25rem 11.25rem",
        "3.5rem minmax(29rem, auto) 11.25rem 11.25rem",
        null,
        null,
        "3.5rem 16.25rem minmax(11.25rem, auto) 11.25rem",
      ]}
      gap={5}
      pt={{ sm: 2, md: 5, xl: 10, "2xl": 100 }}
    >
      <GridItem gridArea="you-activity">
        <PageHeading textcontent={" Ваша активность"} />
      </GridItem>
      <GridItem gridArea="week-selector">
        <WeekSelector />
      </GridItem>
      <GridItem
        gridArea="day-indicator"
        justifySelf="stretch"
        alignSelf="stretch"
      >
        <DayIndicatorWrapper />
      </GridItem>
      <GridItem
        gridArea="tomato-indicator"
        justifySelf="stretch"
        alignSelf="end"
      >
        <TomatoIndicatorWrapper />
      </GridItem>
      <GridItem gridArea="diagram" justifySelf="stretch" alignSelf="stretch">
        <DiagramWrapper />
      </GridItem>
      <GridItem
        gridArea="metric-container"
        justifySelf="stretch"
        alignSelf="stretch"
      >
        <MetricContainer />
      </GridItem>
    </Grid>
  );
}
