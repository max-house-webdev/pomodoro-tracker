import { useToast } from "@chakra-ui/react";
import { useThemeStore, useTimerStore } from "../store";

export function useToastWork() {
  const toast = useToast();
  const timerWorkIntervalDuration = useTimerStore(
    (state) => state.timerWorkIntervalDuration
  );
  const isToastAllowed = useThemeStore((state) => state.isToastAllowed);
  if (!isToastAllowed) {
    return () => {};
  }

  const description = `Работайте в течение ${timerWorkIntervalDuration} мин.`;

  return () => {
    toast({
      description,
      duration: 4000,
      isClosable: true,
      status: "success",
    });
  };
}
