import React from "react";
import { ControlContainer, ControlCheckBox } from "../../../components";
import { useThemeStore } from "../../../store";

export function SoundCheckboxWrapper() {
  const isSoundAllowed = useThemeStore((store) => store.isSoundAllowed);
  const toggleIsSoundAllowed = useThemeStore(
    (store) => store.toggleIsSoundAllowed
  );

  const toggle = () => {
    toggleIsSoundAllowed(!isSoundAllowed);
  };

  return (
    <ControlContainer>
      <ControlCheckBox
        textContent={"Разрешить звуковые уведомления"}
        isChecked={isSoundAllowed}
        onChange={toggle}
      />
    </ControlContainer>
  );
}
