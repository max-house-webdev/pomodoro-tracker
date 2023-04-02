import React from "react";
import { Box, Grid, Heading } from "@chakra-ui/react";
import { Error, FocusIcon, PauseIcon, StopIcon } from "../../../components";
import {
  useBrandCyanModeValue,
  useBrandGrayModeValue,
  useBrandPurpleModeValue,
  useBrandYellowModeValue,
  useTextColor,
} from "../../../hooks";

type TRole = "focus" | "pause" | "stop";

export interface IMetricIndicatorProps {
  role: TRole;
  value: number;
  gridArea: TRole;
}

export function MetricIndicator(props: IMetricIndicatorProps) {
  const { role, value } = props;

  const textColor = useTextColor();
  const bgColorIfNull = useBrandGrayModeValue(100);
  const iconColorIfNull = useBrandGrayModeValue(300);
  const focusBgColor = useBrandYellowModeValue(100);
  const focusIconColor = useBrandYellowModeValue(400);
  const pauseBgColor = useBrandPurpleModeValue(100);
  const pauseIconColor = useBrandPurpleModeValue(400);
  const stopBgColor = useBrandCyanModeValue(100);
  const stopIconColor = useBrandCyanModeValue(400);

  const getComponentProps = (role: TRole) => {
    switch (role) {
      case "focus": {
        const bgColor = focusBgColor;
        const IconComponent = () => (
          <FocusIcon color={value === 0 ? iconColorIfNull : focusIconColor} />
        );
        const labelContent = "Фокус";
        const valueContent = `${value}%`;
        return { IconComponent, bgColor, labelContent, valueContent };
      }

      case "pause": {
        const bgColor = pauseBgColor;
        const IconComponent = () => (
          <PauseIcon color={value === 0 ? iconColorIfNull : pauseIconColor} />
        );
        const labelContent = "Время на паузе";

        const SECONDS_PER_MINUTES = 60;
        const SECONDS_PER_HOUR = 3600;

        const h = Math.trunc(value / SECONDS_PER_HOUR);
        const min = Math.trunc(
          (value - h * SECONDS_PER_HOUR) / SECONDS_PER_MINUTES
        );
        const sec = value % SECONDS_PER_HOUR;

        if (h > 0) {
          const valueContent = `${h}ч ${min}м`;
          return { IconComponent, bgColor, labelContent, valueContent };
        }

        if (min > 0) {
          const valueContent = `${min}м`;
          return { IconComponent, bgColor, labelContent, valueContent };
        }

        if (sec > 0) {
          const valueContent = "1м";
          return { IconComponent, bgColor, labelContent, valueContent };
        }

        const valueContent = "0";
        return { IconComponent, bgColor, labelContent, valueContent };
      }

      case "stop": {
        const bgColor = stopBgColor;
        const IconComponent = () => (
          <StopIcon color={value === 0 ? iconColorIfNull : stopIconColor} />
        );
        const labelContent = "Остановки";
        const valueContent = value;
        return { IconComponent, bgColor, labelContent, valueContent };
      }
      default: {
        return null;
      }
    }
  };

  const componentProps = getComponentProps(role);

  if (!componentProps) {
    return (
      <Error
        errorMessage="Не определена роль компонента метрики"
        withIcon={false}
        fontSize="md"
      />
    );
  }

  const { bgColor, IconComponent, labelContent, valueContent } = componentProps;

  return (
    <Grid
      padding={25}
      gridTemplateColumns={"1fr 8rem"}
      gridTemplateAreas={`"label icon" "value icon"`}
      gap={[3, null, 5]}
      bgColor={value === 0 ? bgColorIfNull : bgColor}
    >
      <Heading as="h4" gridArea="label" fontSize={24} color={textColor}>
        {labelContent}
      </Heading>
      <Heading
        as="h4"
        gridArea="value"
        fontSize={64}
        fontWeight="normal"
        color={textColor}
      >
        {valueContent}
      </Heading>
      <Box gridArea="icon">
        <IconComponent />
      </Box>
    </Grid>
  );
}
