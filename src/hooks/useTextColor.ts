import { useColorModeValue } from "@chakra-ui/react";

export function useTextColor() {
  return useColorModeValue("#333333", "whiteAlpha.600");
}
