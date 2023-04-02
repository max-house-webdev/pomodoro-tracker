import {
  Box,
  HStack,
  keyframes,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useBrandGrayModeValue, useBrandRedModeValue } from "../../../hooks";
import { hexToRgba } from "../../../service";
import { TWeekday } from "../../../store";

export interface IDiagramProps {
  diagramData: Array<{ day: TWeekday; fraction: number }>;
  activeDay: TWeekday;
  animate: boolean;
}

export function Diagram(props: IDiagramProps) {
  const { diagramData, activeDay, animate } = props;

  const diagramActiveColumnColor = useBrandRedModeValue(400);
  const diagramColumnColor = useBrandRedModeValue(100);
  const diagramEmptyColumnColor = useBrandGrayModeValue(300);

  const bgColumnColor = hexToRgba({
    hex: diagramColumnColor,
    opacity: 0.25,
  }).rgba;

  const Columns = diagramData.map((item) => {
    const { fraction, day } = item;
    const FULL_FRACTION_PX = 420;
    const height = `${FULL_FRACTION_PX * fraction}px`;

    const animationCSSInterpolation = `
    from {  height: 0 ; opacity: 0; }
    to {  height: ${height}; opacity: 1; }
  `;
    const animationKeyframes = keyframes`${animationCSSInterpolation}`;
    const animationDuration = 800;
    const animationTimingFunction = "ease-in-out";

    return (
      <VStack
        justifyContent="flex-end"
        key={uuidv4().slice(0, 8)}
        bgColor={bgColumnColor}
        position="relative"
        flexGrow={0}
        flexShrink={1}
        flexBasis={[16, null, null, 20]}
        h="100%"
        aria-label="bg-column"
      >
        {fraction > 0 ? (
          <Box
            bgColor={
              day === activeDay ? diagramActiveColumnColor : diagramColumnColor
            }
            h={height}
            w="100%"
            mb={12}
            aria-label="total-workTime-of-the-day"
            animation={
              animate
                ? `${animationKeyframes} ${animationDuration}ms
            ${animationTimingFunction}`
                : undefined
            }
          />
        ) : (
          <Box
            bgColor={diagramEmptyColumnColor}
            h={1}
            w="100%"
            mb={12}
            aria-label="no-data-for-the-day"
          />
        )}
      </VStack>
    );
  });

  return (
    <HStack
      position="absolute"
      top={0}
      bottom={0}
      left={0}
      right="15%"
      justifyContent="space-between"
      px={[2, 4, 14]}
      style={{ marginTop: 0 }}
    >
      {Columns.map((Column) => Column)}
    </HStack>
  );
}
