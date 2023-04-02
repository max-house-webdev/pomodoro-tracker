import { useColorModeValue } from "@chakra-ui/react";
import { extendedTheme } from "../theme";
import type { TCyan } from "../theme";

type TMode = keyof TCyan;

export function useBrandCyanModeValue(mode: TMode) {
  const { brandCyan, brandInvertedCyan } = extendedTheme.colors as Record<
    string,
    TCyan
  >;

  const color = useColorModeValue(brandCyan[mode], brandInvertedCyan[mode]);

  return color;
}
