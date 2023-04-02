import React, { useEffect, useState } from "react";
import { useFirstTodo } from "../../../hooks";
import { useTimerStore, useTodosStore } from "../../../store";
import { ControlContainer } from "../../containers";
import { ControlSubTitle } from "../../simple";
import { ControlSlider } from "../../ui";

export function WorkIntervalSetter() {
  const currentTodo = useFirstTodo();
  const setCurrentTodoWorkIntervalDuration = useTodosStore(
    (state) => state.setWorkIntervalDuration
  );

  const timeManager = useTimerStore((state) => state.timeManager);
  const setWorkIntervalDuration = useTimerStore(
    (state) => state.setWorkIntervalDuration
  );
  const initialValue = timeManager.workIntervalDuration;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = (value: number) => {
    setWorkIntervalDuration(value);
    setValue(value);
    if (!currentTodo) {
      return;
    }

    const { id } = currentTodo;
    setCurrentTodoWorkIntervalDuration({ id, workIntervalDuration: value });
  };

  return (
    <ControlContainer>
      <ControlSubTitle
        textContent={`Продолжительность одного "помидора" - ${value} мин.`}
        mr={5}
      />
      <ControlSlider
        onChange={(value) => {
          onChange(value);
        }}
        defaultValue={value}
        value={value}
        max={30}
        role="workInterval"
      />
    </ControlContainer>
  );
}
