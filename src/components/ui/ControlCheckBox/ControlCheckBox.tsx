import { Checkbox, CheckboxProps } from "@chakra-ui/react";
import React from "react";

export interface IControlCheckBoxProps {
  textContent: string;
}

export function ControlCheckBox(props: IControlCheckBoxProps & CheckboxProps) {
  const { textContent, onChange, isChecked } = props;

  return (
    <Checkbox variant="brandGreen" onChange={onChange} isChecked={isChecked}>
      {textContent}
    </Checkbox>
  );
}
