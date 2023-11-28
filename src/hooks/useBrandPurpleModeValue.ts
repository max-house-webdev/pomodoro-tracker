import { useColorModeValue } from "@chakra-ui/react";
import { extendedTheme } from "../theme";
import type { TPurple } from "../theme";

type TMode = keyof TPurple;

export function useBrandPurpleModeValue(mode: TMode) {
  const { brandPurple, brandInvertedPurple } = extendedTheme.colors as Record<
    string,
    TPurple
  >;

  const color = useColorModeValue(brandPurple[mode], brandInvertedPurple[mode]);

  return color;
}
