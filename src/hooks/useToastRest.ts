import { useToast } from "@chakra-ui/react";
import { useThemeStore } from "../store";

export function useToastRest() {
  const toast = useToast();

  const isToastAllowed = useThemeStore((state) => state.isToastAllowed);
  if (!isToastAllowed) {
    return () => {};
  }

  const description = "Сделайте перерыв";

  return () => {
    toast({
      description,
      duration: 4000,
      isClosable: true,
      status: "success",
    });
  };
}
