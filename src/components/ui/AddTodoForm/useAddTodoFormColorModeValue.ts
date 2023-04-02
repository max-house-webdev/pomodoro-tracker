import { useBrandGrayModeValue, useBrandGreenModeValue } from "../../../hooks";

export function useAddTodoFormColorModeValue() {
  const bgColor = useBrandGrayModeValue(100);
  const color = useBrandGrayModeValue(300);
  const focusColor = useBrandGreenModeValue(100);

  return { bgColor, color, focusColor };
}
