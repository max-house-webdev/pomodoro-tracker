import React from "react";
import { Heading, HStack, useColorModeValue, VStack } from "@chakra-ui/react";
import { useBrandGrayModeValue, useBrandRedModeValue } from "../../../hooks";

import { TomatoIcon } from "../../simple";
import { TomatoSmiledIcon } from "../../simple/TomatoSmiledIcon";

export interface ITomatoIndicatorProps {
  workIntervalNumber: number;
}

export function TomatoIndicator(props: ITomatoIndicatorProps) {
  const { workIntervalNumber } = props;

  const bgColor = useBrandGrayModeValue(100);
  const footerBgColor = useBrandRedModeValue(400);
  const textColor = useColorModeValue("white", "blackAlpha.800");
  const spanColor = useBrandGrayModeValue(400);

  let tomato = "помидор";

  switch (workIntervalNumber % 10) {
    case 1: {
      tomato = "помидор";
      break;
    }
    case 2:
    case 3:
    case 4: {
      tomato = "помидора";
      break;
    }
    default: {
      tomato = "помидоров";
    }
  }

  return workIntervalNumber ? (
    <VStack pt={[4, null, null, null, 6]} bgColor={bgColor}>
      <HStack mb={7}>
        <TomatoIcon boxSize="5rem" />
        <Heading as="h3" fontSize={24} color={spanColor}>
          x {workIntervalNumber}
        </Heading>
      </HStack>

      <VStack
        justifyContent="center"
        minH="3.125rem"
        w="100%"
        bgColor={footerBgColor}
      >
        <Heading as="h3" fontSize={24} textAlign="center" color={textColor}>
          {workIntervalNumber} {tomato}
        </Heading>
      </VStack>
    </VStack>
  ) : (
    <VStack justifyContent="center" py={{ base: 9, xl: 10 }} bgColor={bgColor}>
      <TomatoSmiledIcon />
    </VStack>
  );
}
