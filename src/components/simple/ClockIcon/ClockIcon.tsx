import { HTMLChakraProps, Icon } from "@chakra-ui/react";
import React from "react";

export function ClockIcon(props: HTMLChakraProps<"svg">) {
  const { boxSize, color } = props;

  return (
    <Icon
      boxSize={boxSize}
      viewBox="0 0 129 129"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z"
        stroke={color as string}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M64.3154 37.1579V64.3158L77.8944 77.8947"
        stroke={color as string}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
