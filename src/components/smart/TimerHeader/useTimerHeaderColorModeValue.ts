import { useColorModeValue } from "@chakra-ui/react";
import {
  useBrandGrayModeValue,
  useBrandGreenModeValue,
  useBrandRedModeValue,
} from "../../../hooks";

export function useTimerHeaderColorModeValue() {
  const textColor = useColorModeValue("white", "black");
  const bgColorStop = useBrandGrayModeValue(300);
  const bgColorWork = useBrandRedModeValue(400);
  const bgColorRest = useBrandGreenModeValue(100);
  const hintColor = useBrandGrayModeValue(400);

  return { textColor, bgColorStop, bgColorWork, bgColorRest, hintColor };
}
