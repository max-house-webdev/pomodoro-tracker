import { Box, Portal } from "@chakra-ui/react";
import React from "react";

export interface IOverlayProps {
  onClick: () => void;
  zIndex?: number;
}

export function Overlay(props: IOverlayProps) {
  const { onClick, zIndex = 100 } = props;
  return (
    <Portal
      children={
        <Box
          as="div"
          aria-label="overlay"
          position={"fixed"}
          zIndex={zIndex}
          backgroundColor="blackAlpha.200"
          top={0}
          bottom={0}
          left={0}
          right={0}
          onClick={onClick}
        ></Box>
      }
    />
  );
}
