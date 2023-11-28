import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Button, Collapse, List, ListItem } from "@chakra-ui/react";
import React, { useState } from "react";

import { TWeekSelector, useStatisticStore } from "../../../store";
import { Overlay } from "../../simple";
import { useWeekSelectorColorModeValue } from "./useWeekSelectorColorModeValue";

type TWeekOptions = {
  label: string;
  value: TWeekSelector;
};

export function WeekSelector() {
  const weekOptions: Array<TWeekOptions> = [
    { label: "Эта неделя", value: "this-week" },
    { label: "Прошедшая неделя", value: "last-week" },
    { label: "Две недели назад", value: "two-weeks-ago" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const weekSelector = useStatisticStore((state) => state.weekSelector);

  const initialState = weekOptions.findIndex(
    (item) => item.value === weekSelector
  );

  const [weekState, setWeekState] = useState(weekOptions[initialState]);
  const setWeekSelector = useStatisticStore((store) => store.setWeekSelector);

  const {
    textColor,
    iconColor,
    bgColor,
    outlineColor,
    selectedColor,
    hoverColor,
  } = useWeekSelectorColorModeValue();

  return (
    <Box position="relative" data-testid="WeekSelector">
      <Button
        aria-label={"select"}
        m={0}
        w="100%"
        py={7}
        rounded="none"
        color={textColor}
        bgColor={bgColor}
        justifyContent="space-between"
        rightIcon={
          isOpen ? (
            <ChevronUpIcon color={iconColor} boxSize={7} />
          ) : (
            <ChevronDownIcon color={iconColor} boxSize={7} />
          )
        }
        onClick={() => setIsOpen(!isOpen)}
        _focusVisible={{ outlineColor, outlineWidth: "3px" }}
      >
        {weekState.label}
      </Button>

      <Collapse in={isOpen} animateOpacity>
        <List position="absolute" top="3.5rem" left={0} right={0} zIndex={150}>
          {weekOptions.map((weekOption) => {
            const { value, label } = weekOption;
            return value === weekState.value ? null : (
              <ListItem
                key={value}
                value={value}
                p={0}
                borderTopStyle="solid"
                borderTopWidth={2}
                borderTopColor={selectedColor}
                bgColor={bgColor}
              >
                <Button
                  variant="ghost"
                  py={7}
                  px={5}
                  w="100%"
                  textAlign="left"
                  justifyContent="flex-start"
                  rounded="none"
                  color={textColor}
                  _hover={{ bgColor: hoverColor }}
                  _focusVisible={{ outlineColor, outlineWidth: "3px" }}
                  onClick={() => {
                    setWeekState(weekOption);
                    setWeekSelector(weekOption.value);
                    setIsOpen(false);
                  }}
                >
                  {label}
                </Button>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
      {isOpen && <Overlay onClick={() => setIsOpen(false)} />}
    </Box>
  );
}
