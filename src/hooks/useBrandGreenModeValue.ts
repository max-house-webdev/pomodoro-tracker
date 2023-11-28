import { useColorModeValue } from "@chakra-ui/react";
import { extendedTheme } from "../theme";
import type { TGreen } from "../theme";

type TMode = keyof TGreen;

export function useBrandGreenModeValue(mode: TMode) {
  const { brandGreen, brandInvertedGreen } = extendedTheme.colors as Record<
    string,
    TGreen
  >;

  const color = useColorModeValue(brandGreen[mode], brandInvertedGreen[mode]);

  return color;
}
