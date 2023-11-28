import React from "react";
import { Button } from "@chakra-ui/react";
import { useBrandGreenModeValue } from "../../../hooks";
import { PlusIcon, MinusIcon, EditIcon, DeleteIcon } from "../../../components";

export type TAction = "increase" | "decrease" | "edit" | "delete";

export interface ITodoControlButtonProps {
  action: TAction;
  isDisabled: boolean;
  onClick: () => void;
}

export function TodoControlButton(props: ITodoControlButtonProps) {
  const { action, isDisabled, onClick } = props;

  const color = useBrandGreenModeValue(100);

  let text = "";
  let icon = <PlusIcon />;

  switch (action) {
    case "increase": {
      text = "Увеличить";
      icon = <PlusIcon color={color} boxSize={5} />;
      break;
    }
    case "decrease": {
      text = "Уменьшить";
      icon = <MinusIcon color={color} boxSize={5} />;
      break;
    }
    case "edit": {
      text = "Редактировать";
      icon = <EditIcon color={color} boxSize={5} />;
      break;
    }
    case "delete": {
      text = "Удалить";
      icon = <DeleteIcon color={color} boxSize={5} />;
      break;
    }
  }

  return (
    <Button
      variant="button"
      isDisabled={isDisabled}
      justifyContent={"flex-start"}
      leftIcon={icon}
      onClick={onClick}
      px="0"
      fontWeight="normal"
      _focusVisible={{ outlineColor: color, border: "none" }}
      _hover={{ bgColor: "gray.50" }}
      _active={{ bgColor: "gray.100" }}
    >
      {text}
    </Button>
  );
}
