import { Button } from "@chakra-ui/react";
import React from "react";
import {
  STATISTIC_STORAGE,
  TIMER_STORAGE,
  TODOS_STORAGE,
} from "../../../store";

export function StorageCleaner() {
  const onclick = () => {
    localStorage.removeItem(STATISTIC_STORAGE);
    localStorage.removeItem(TIMER_STORAGE);
    localStorage.removeItem(TODOS_STORAGE);
  };

  return (
    <Button variant="brandPrimaryRed" onClick={onclick}>
      Очистить хранилище
    </Button>
  );
}
