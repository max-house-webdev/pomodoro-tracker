import { useColorModeValue } from "@chakra-ui/react";
import {
  useBrandGrayModeValue,
  useBrandRedModeValue,
  useTextColor,
} from "../../../hooks";

export function useWeekSelectorColorModeValue() {
  const textColor = useTextColor();
  const iconColor = useBrandRedModeValue(600);
  const bgColor = useBrandGrayModeValue(100);
  const outlineColor = useBrandRedModeValue(100);
  const selectedColor = useBrandGrayModeValue(300);
  const hoverColor = useColorModeValue("gray.200", "whiteAlpha.300");

  return {
    textColor,
    iconColor,
    bgColor,
    outlineColor,
    selectedColor,
    hoverColor,
  };
}
