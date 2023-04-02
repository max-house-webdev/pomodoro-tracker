import { WarningIcon } from "@chakra-ui/icons";
import { Center, Text, TypographyProps } from "@chakra-ui/react";
import React from "react";
import { useBrandRedModeValue } from "../../../hooks";

export interface IErrorProps {
  withIcon?: boolean;
  errorMessage?: string;
  fontSize?: TypographyProps["fontSize"];
}

export function Error(props: IErrorProps) {
  const {
    errorMessage = "Что-то пошло не так...",
    withIcon = true,
    fontSize = "2xl",
  } = props;

  const color = useBrandRedModeValue(400);

  return (
    <Center display="flex" alignItems="center">
      {withIcon && <WarningIcon w="5" h="5" color={color} />}
      <Text
        as="span"
        fontSize={fontSize}
        fontWeight="bold"
        p="1rem"
        color={color}
      >
        {errorMessage}
      </Text>
    </Center>
  );
}
