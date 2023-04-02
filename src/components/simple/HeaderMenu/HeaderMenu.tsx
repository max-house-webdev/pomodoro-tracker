import { Flex } from "@chakra-ui/react";
import React from "react";
import { Nav, ThemeSwitcher } from "../../../components";

export function HeaderMenu() {
  return (
    <Flex justifyContent={"space-between"} alignItems="center">
      <Nav />
      <ThemeSwitcher />
    </Flex>
  );
}
