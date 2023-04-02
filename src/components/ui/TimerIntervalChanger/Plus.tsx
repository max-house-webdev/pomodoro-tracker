import { HTMLChakraProps, Icon } from "@chakra-ui/react";
import React from "react";

export function Plus(props: HTMLChakraProps<"svg">) {
  const { boxSize, color } = props;

  return (
    <Icon
      boxSize={boxSize}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.27559 9.13215V16H6.72441V9.13215H0V6.70291H6.72441V0H9.27559V6.70291H16V9.13215H9.27559Z"
        fill={color as string}
      />
    </Icon>
  );
}
