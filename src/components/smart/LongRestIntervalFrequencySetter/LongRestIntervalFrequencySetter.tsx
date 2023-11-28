import React, { useEffect, useState } from "react";
import { useTimerStore } from "../../../store";
import {
  ControlContainer,
  ControlSubTitle,
  ControlSlider,
} from "../../../components";

export function LongRestIntervalFrequencySetter() {
  const timeManager = useTimerStore((state) => state.timeManager);
  const setLongRestIntervalFrequency = useTimerStore(
    (state) => state.setLongRestIntervalFrequency
  );

  const initialValue = timeManager.setLongRestIntervalEvery;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = (value: number) => {
    setLongRestIntervalFrequency(value);
    setValue(value);
  };

  const numToWord = (value: number) => {
    switch (value) {
      case 3: {
        return "третий";
      }
      case 4: {
        return "четвертый";
      }
      case 5: {
        return "пятый";
      }
    }
  };

  return (
    <ControlContainer>
      <ControlSubTitle
        textContent={`Частота длинных перерывов - каждый ${numToWord(value)}`}
        mr={5}
      />
      <ControlSlider
        onChange={(value) => {
          onChange(value);
        }}
        defaultValue={value}
        value={value}
        min={3}
        max={5}
        role="restInterval"
      />
    </ControlContainer>
  );
}
