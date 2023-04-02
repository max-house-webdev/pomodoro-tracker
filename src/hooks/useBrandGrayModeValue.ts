import { useColorModeValue } from "@chakra-ui/react";
import { extendedTheme } from "../theme";
import type { TGray } from "../theme";

type TMode = keyof TGray;

export function useBrandGrayModeValue(mode: TMode) {
  const { brandGray, brandInvertedGray } = extendedTheme.colors as Record<
    string,
    TGray
  >;

  const color = useColorModeValue(brandGray[mode], brandInvertedGray[mode]);

  return color;
}
