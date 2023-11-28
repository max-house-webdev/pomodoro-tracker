import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { useBrandGrayModeValue } from "../../../hooks";

export interface IControlContainerProps {
  children: ReactNode;
}

export function ControlContainer(props: IControlContainerProps) {
  const bgColor = useBrandGrayModeValue(100);

  const { children } = props;
  return (
    <Flex
      flexDir={["column", null, null, "row"]}
      justifyContent="space-between"
      alignItems={["stretch", null, null, "flex-end"]}
      width={["auto", null, null, "75%"]}
      maxW="44rem"
      gap={5}
      p={5}
      bgColor={bgColor}
      data-testid="MaxWorkIntervalSetter"
    >
      {children}
    </Flex>
  );
}
