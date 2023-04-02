import React, { useEffect, useState } from "react";
import { useTimerStore } from "../../../store";
import {
  ControlContainer,
  ControlSubTitle,
  ControlSlider,
} from "../../../components";

export function ShortRestIntervalSetter() {
  const timeManager = useTimerStore((state) => state.timeManager);
  const setShortRestIntervalDuration = useTimerStore(
    (state) => state.setShortRestIntervalDuration
  );

  const initialValue = timeManager.shortRestIntervalDuration;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = (value: number) => {
    setShortRestIntervalDuration(value);
    setValue(value);
  };

  return (
    <ControlContainer>
      <ControlSubTitle
        textContent={`Продолжительность короткого перерыва - ${value} мин.`}
        mr={5}
      />
      <ControlSlider
        onChange={(value) => {
          onChange(value);
        }}
        defaultValue={value}
        value={value}
        max={10}
        role="restInterval"
      />
    </ControlContainer>
  );
}
