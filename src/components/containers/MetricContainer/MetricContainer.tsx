import React from "react";
import { Grid } from "@chakra-ui/react";
import {
  FocusIndicatorWrapper,
  PauseIndicatorWrapper,
  StopIndicatorWrapper,
} from "../../../components";

export function MetricContainer() {
  return (
    <Grid
      h="100%"
      gridTemplateColumns={[
        "1fr",
        null,
        "repeat(2, 1fr)",
        null,
        null,
        "repeat(3, 1fr)",
      ]}
      gridTemplateAreas={[
        `"focus" "pause" "stop"`,
        null,
        null,
        null,
        `"focus pause stop"`,
      ]}
      alignItems="stretch"
      gap={5}
    >
      <FocusIndicatorWrapper />
      <PauseIndicatorWrapper />
      <StopIndicatorWrapper />
    </Grid>
  );
}
