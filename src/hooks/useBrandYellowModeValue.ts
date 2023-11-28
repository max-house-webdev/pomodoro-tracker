import { useColorModeValue } from "@chakra-ui/react";
import { extendedTheme } from "../theme";
import type { TYellow } from "../theme";

type TMode = keyof TYellow;

export function useBrandYellowModeValue(mode: TMode) {
  const { brandYellow, brandInvertedYellow } = extendedTheme.colors as Record<
    string,
    TYellow
  >;

  const color = useColorModeValue(brandYellow[mode], brandInvertedYellow[mode]);

  return color;
}
