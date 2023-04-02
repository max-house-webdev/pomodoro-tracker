import React from "react";
import { ControlContainer, ControlCheckBox } from "../..";
import { useThemeStore } from "../../../store";

export function ToastCheckboxWrapper() {
  const isToastAllowed = useThemeStore((store) => store.isToastAllowed);

  const toggleIsToastAllowed = useThemeStore(
    (store) => store.toggleIsToastAllowed
  );

  const toggle = () => {
    toggleIsToastAllowed(!isToastAllowed);
  };

  return (
    <ControlContainer>
      <ControlCheckBox
        textContent={"Разрешить всплывающие уведомления"}
        isChecked={isToastAllowed}
        onChange={toggle}
      />
    </ControlContainer>
  );
}
