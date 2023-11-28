import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Portal,
} from "@chakra-ui/react";

export interface IConfirmDeleteTodo {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmDeleteTodo(props: IConfirmDeleteTodo) {
  const { isOpen, onClose, onConfirm } = props;

  return (
    <Portal
      children={
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign={"center"}>Удалить задачу?</ModalHeader>
            <ModalCloseButton />

            <ModalBody
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Button
                autoFocus
                variant={"brandPrimaryRed"}
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                Удалить
              </Button>
              <Button
                variant="ghost"
                onClick={onClose}
                fontSize={"1rem"}
                textDecoration={"underline"}
              >
                Отмена
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      }
    />
  );
}
