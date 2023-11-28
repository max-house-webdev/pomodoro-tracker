import { ListItem } from "@chakra-ui/react";
import React from "react";
import { useKeyframesAnimation, useTextColor } from "../../../hooks";

export interface ITodoListItemProps {
  index: number;
  children: React.ReactNode;
  onClick?: () => void;
  hover?: boolean;
}

export function TodoListItem(props: ITodoListItemProps) {
  const { children, onClick, index, hover } = props;

  const textColor = useTextColor();

  const animationCSSInterpolation = `
    0% {  transform: translateY(-100%) scale(0.5); opacity: 0; }
    75% {  transform: translateY(10%) scale(1); opacity: 0.75; }
    100% {  transform: translateY(0); opacity: 1; }
  `;

  const animationDuration = 200 + index * 200;

  const animation = useKeyframesAnimation({
    animationCSSInterpolation,
    animationDuration,
  });

  return (
    <ListItem
      display="flex"
      alignItems="baseLine"
      py="0.5rem"
      borderTopColor="gray.100"
      borderTopWidth="2px"
      animation={animation}
      color={textColor}
      _hover={
        hover
          ? {
              transform: "scale(0.9) translateY(-2px)",
              transition: "400ms ease-in-out",
              boxShadow: "0px 4px 8px 0px rgba(34, 60, 80, 0.2)",
            }
          : undefined
      }
      _last={{ borderBottomColor: "gray.100", borderBottomWidth: "2px" }}
      onClick={onClick}
    >
      {children}
    </ListItem>
  );
}
