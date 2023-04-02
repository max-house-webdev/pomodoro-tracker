import { HTMLChakraProps, Icon } from "@chakra-ui/react";
import React from "react";

export function Minus(props: HTMLChakraProps<"svg">) {
  const { boxSize, color } = props;

  return (
    <Icon
      boxSize={boxSize}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: "translateY(0.3125rem)" }}
    >
      <path
        d="M9.27559 3.13214L6.72441 3.13214L0 3.13214V0.702896H6.72441H9.27559H16V3.13214H9.27559Z"
        fill={color as string}
      />
    </Icon>
  );
}
