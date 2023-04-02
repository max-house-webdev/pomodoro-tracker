import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useBrandRedModeValue } from "../../../hooks";
import { useTimerStore } from "../../../store";

export function ThemeSwitcher() {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const color = useBrandRedModeValue(100);
  const isTimerRunning = useTimerStore((state) => state.isTimerRunning);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color={color}
      marginLeft="2"
      isDisabled={isTimerRunning}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      data-testid="ThemeSwitcher"
      _focusVisible={{ outlineColor: color }}
    />
  );
}
