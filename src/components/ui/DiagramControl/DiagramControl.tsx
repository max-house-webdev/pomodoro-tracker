import { Box, Button, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useBrandGrayModeValue, useBrandRedModeValue } from "../../../hooks";

import { TWeekday, useStatisticStore } from "../../../store/statisticStore";

export function DiagramControl() {
  const [day, setDay] = useState<TWeekday>("Monday");

  const setDaySelector = useStatisticStore((state) => state.setDaySelector);

  const buttons: Array<{ value: TWeekday; label: string }> = [
    {
      value: "Monday",
      label: "ПН",
    },
    {
      value: "Tuesday",
      label: "ВТ",
    },
    {
      value: "Wednesday",
      label: "СР",
    },
    {
      value: "Thursday",
      label: "ЧТ",
    },
    {
      value: "Friday",
      label: "ПТ",
    },
    {
      value: "Saturday",
      label: "СБ",
    },
    {
      value: "Sunday",
      label: "ВС",
    },
  ];

  const textColor = useBrandGrayModeValue(300);
  const activeColor = useBrandRedModeValue(400);

  return (
    <HStack
      position="relative"
      flexGrow={0}
      flexShrink={0}
      flexBasis={14}
      justifyContent="space-between"
      w="85%"
      px={[2, 4, 14]}
      data-testid="DiagramControl"
      style={{ marginTop: 0 }}
      zIndex={20}
    >
      {buttons.map((button) => (
        <Button
          key={uuidv4().slice(0, 8)}
          value={button.value as string}
          color={button.value === day ? activeColor : textColor}
          variant="ghost"
          flexGrow={0}
          flexShrink={1}
          flexBasis={16}
          style={{ margin: 0 }}
          px={[3, null, null, 10]}
          h="100%"
          fontSize={["md", "lg", "2xl"]}
          rounded="none"
          borderBottomStyle="solid"
          borderBottomWidth="3px"
          _hover={{ borderBottomColor: activeColor }}
          onClick={() => {
            setDay(button.value);
            setDaySelector(button.value);
          }}
        >
          {button.label}
        </Button>
      ))}
    </HStack>
  );
}
