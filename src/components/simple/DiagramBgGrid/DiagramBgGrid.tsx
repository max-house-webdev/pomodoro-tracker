import {
  Text,
  Divider,
  HStack,
  useColorModeValue,
  VStack,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export interface IDiagramBgGridProps {
  labels: Array<string>;
}

export function DiagramBgGrid(props: IDiagramBgGridProps) {
  const { labels } = props;

  const dividerColor = useColorModeValue("#333333", "#cccccc");

  const spacing = "70px";

  return (
    <VStack
      position="relative"
      flexGrow={1}
      flexShrink={1}
      flexBasis={["100%", null, null, "25rem"]}
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={spacing}
      px={[2, 4, 5]}
    >
      {labels.map((label, index) => {
        return (
          <Flex
            key={uuidv4().slice(0, 8)}
            flexDirection={["column-reverse", "row"]}
            justifyContent={["normal", "space-between", "flex-start"]}
            alignItems={["flex-end", "center"]}
            mt={index === 0 ? spacing : 0}
          >
            <Divider
              flexGrow={0}
              flexShrink={1}
              flexBasis={["auto", "85%"]}
              mr={[0, null, 8]}
              color={dividerColor}
            />
            <Text
              as="span"
              // flexGrow={1}
              // flexShrink={1}
              // flexBasis={["auto", "15%"]}
              color={dividerColor}
              fontSize={"xs"}
            >
              {label}
            </Text>
          </Flex>
        );
      })}
    </VStack>
  );
}
