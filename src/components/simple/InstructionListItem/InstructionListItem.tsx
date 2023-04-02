import { CheckIcon } from "@chakra-ui/icons";
import { ListIcon, ListItem, Text } from "@chakra-ui/react";
import React from "react";
import { useBrandRedModeValue, useTextColor } from "../../../hooks";

export interface IInstructionListItemProps {
  instruction: string;
  key: string;
}

export function InstructionListItem(props: IInstructionListItemProps) {
  const { instruction } = props;
  const color = useBrandRedModeValue(600);
  const textColor = useTextColor();

  return (
    <ListItem display="flex">
      <ListIcon
        as={CheckIcon}
        color={color}
        transform="translateY(5px)"
        pr="0.3rem"
      />
      <Text as="h5" variant={"selectionGray"} color={textColor}>
        {instruction}
      </Text>
    </ListItem>
  );
}
