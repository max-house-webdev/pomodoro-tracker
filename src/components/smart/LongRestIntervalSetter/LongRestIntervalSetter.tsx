import React, { useEffect, useState } from "react";
import { useTimerStore } from "../../../store";
import {
  ControlContainer,
  ControlSubTitle,
  ControlSlider,
} from "../../../components";

export function LongRestIntervalSetter() {
  const timeManager = useTimerStore((state) => state.timeManager);
  const setLongRestIntervalDuration = useTimerStore(
    (state) => state.setLongRestIntervalDuration
  );

  const initialValue = timeManager.longRestIntervalDuration;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = (value: number) => {
    setLongRestIntervalDuration(value);
    setValue(value);
  };

  return (
    <ControlContainer>
      <ControlSubTitle
        textContent={`Продолжительность длинного перерыва - ${value} мин.`}
        mr={5}
      />
      <ControlSlider
        onChange={(value) => {
          onChange(value);
        }}
        defaultValue={value}
        value={value}
        max={20}
        role="restInterval"
      />
    </ControlContainer>
  );
}
