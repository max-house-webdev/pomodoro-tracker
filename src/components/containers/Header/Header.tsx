import React from "react";
import { Box } from "@chakra-ui/react";
import { Logo } from "../../../components";
import { HeaderMenu } from "../../simple/HeaderMenu";

export function Header() {
  return (
    <Box
      as="header"
      minH="4.375rem"
      display="flex"
      justifyContent="space-between"
      alignItems={"center"}
    >
      <Logo />
      <HeaderMenu />
    </Box>
  );
}
