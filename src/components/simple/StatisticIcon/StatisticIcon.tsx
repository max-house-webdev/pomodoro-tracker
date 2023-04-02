import { HTMLChakraProps, Icon } from "@chakra-ui/react";
import React from "react";

export function StatisticIcon(props: HTMLChakraProps<"svg">) {
  const { boxSize, color } = props;

  return (
    <Icon
      boxSize={boxSize}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_9503_380)">
        <path
          d="M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z"
          fill={color as string}
        />
      </g>
      <defs>
        <clipPath id="clip0_9503_380">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </Icon>
  );
}
