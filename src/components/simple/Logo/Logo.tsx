import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { TomatoIcon } from "../TomatoIcon";
import { useBrandRedModeValue } from "../../../hooks";

export function Logo() {
  const color = useBrandRedModeValue(400);
  return (
    <Flex alignItems="center">
      <TomatoIcon boxSize={{ base: 5, md: 7, lg: 10 }} />
      <Heading
        as="h3"
        variant={"noSelection"}
        px="0.75rem"
        color={color}
        fontSize={{ base: "md", md: "xl", lg: "2xl" }}
        fontWeight="normal"
      >
        pomodoro_box
      </Heading>
    </Flex>
  );
}
