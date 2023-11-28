import { Heading, HeadingProps } from "@chakra-ui/react";
import React from "react";
import { useTextColor } from "../../../hooks";

export interface IControlSubTitleProps {
  textContent: string;
}

export function ControlSubTitle(props: IControlSubTitleProps & HeadingProps) {
  const { textContent, ...rest } = props;
  const textColor = useTextColor();

  return (
    <Heading
      as="h3"
      flex="0 0 50"
      fontSize={[14, null, 18]}
      variant="noSelection"
      color={textColor}
      {...rest}
    >
      {textContent}
    </Heading>
  );
}
