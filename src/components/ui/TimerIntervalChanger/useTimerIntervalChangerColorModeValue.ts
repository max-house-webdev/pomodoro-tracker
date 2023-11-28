import { useColorModeValue } from "@chakra-ui/react";
import { useBrandGrayModeValue, useBrandGreenModeValue } from "../../../hooks";

export function useTimerIntervalChangerColorModeValue() {
  const bgColor = useBrandGrayModeValue(300);
  const bgColorHovered = useBrandGreenModeValue(400);
  const color = useColorModeValue("white", "black");

  return { bgColor, color, bgColorHovered };
}
