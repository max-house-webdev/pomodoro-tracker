import { useColorModeValue } from "@chakra-ui/react";
import { extendedTheme } from "../theme";
import type { TRed } from "../theme";

type TMode = keyof TRed;

export function useBrandRedModeValue(mode: TMode) {
  const { brandRed, brandInvertedRed } = extendedTheme.colors as Record<
    string,
    TRed
  >;

  const color = useColorModeValue(brandRed[mode], brandInvertedRed[mode]);

  return color;
}
