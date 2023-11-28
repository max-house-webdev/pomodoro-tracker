import React from "react";

export interface IThreeCirclesIconProps {
  color?: string;
}

export function ThreeCirclesIcon(props: IThreeCirclesIconProps) {
  const { color = "#c4c4c4" } = props;

  return (
    <svg
      width="26"
      height="6"
      viewBox="0 0 26 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="3" cy="3" r="3" fill={color} />
      <circle cx="13" cy="3" r="3" fill={color} />
      <circle cx="23" cy="3" r="3" fill={color} />
    </svg>
  );
}
