import { useColorModeValue } from "@chakra-ui/react";
import { useBrandGrayModeValue, useBrandGreenModeValue } from "../../../hooks";

export function useTodoListItemEditableColorModeValue() {
  const selectionColor = useBrandGrayModeValue(300);
  const inputBgColor = useBrandGrayModeValue(100);
  const outlineColor = useBrandGreenModeValue(400);

  return { selectionColor, inputBgColor, outlineColor };
}
