import React, { FormEvent, useEffect, useRef, useState } from "react";

import { Text, Input, FormControl, Button } from "@chakra-ui/react";

import { useTodoById } from "../../../hooks";
import { useTodosStore } from "../../../store";

import { useTodoListItemEditableColorModeValue } from "./useTodoListItemEditableColorModeValue";

export interface ITodoListItemEditableProps {
  todoId: string;
}

export function TodoListItemEditable(props: ITodoListItemEditableProps) {
  const { todoId } = props;

  const { selectionColor, inputBgColor, outlineColor } =
    useTodoListItemEditableColorModeValue();

  const updateTodoTitle = useTodosStore((state) => state.updateTodoTitle);

  const toggleTodoEditable = useTodosStore((state) => state.toggleTodoEditable);

  const inputRef = useRef<HTMLInputElement>(null);

  const buttonSubmitRef = useRef<HTMLButtonElement>(null);

  const thisTodo = useTodoById(todoId);
  const title = thisTodo ? thisTodo.title : "";

  const [inputValue, setInputValue] = useState(title);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.focus();
  });

  const onInputBlur = () => {
    if (!buttonSubmitRef.current) {
      return;
    }
    if (!inputValue.length) {
      setInputValue(title);
      inputRef.current?.focus();
      return;
    }

    buttonSubmitRef.current.click();
  };

  const onInputChange = () => {
    setInputValue(inputRef.current ? inputRef.current.value : "");
  };

  const onSubmitTodoChanges = (
    event: FormEvent<HTMLFormElement | HTMLDivElement>
  ) => {
    event.preventDefault();

    if (!inputValue.length) {
      setInputValue(title);
      inputRef.current?.focus();
      return;
    }

    updateTodoTitle({ id: todoId, title: inputValue });
    toggleTodoEditable({ id: todoId, editable: false });
  };

  return (
    <FormControl
      as="form"
      position={"relative"}
      display="flex"
      onSubmit={onSubmitTodoChanges}
    >
      <Text
        as={"span"}
        position={"absolute"}
        left={0}
        maxW={"290px"}
        maxH={"40px"}
        p="0.5rem"
        bgColor={inputBgColor}
        color={"transparent"}
      >
        {inputValue}
      </Text>
      <Input
        ref={inputRef}
        value={inputValue}
        position={"relative"}
        mr="0.5rem"
        ml={0}
        px="0.5rem"
        rounded="none"
        bgColor={"transparent"}
        border="none"
        _hover={{ outline: `1px solid ${outlineColor}` }}
        _focusVisible={{ outline: "none" }}
        _selection={{ color: selectionColor }}
        autoFocus
        onChange={onInputChange}
        onBlur={onInputBlur}
      />
      <Button
        type="submit"
        ref={buttonSubmitRef}
        visibility={"hidden"}
        aria-label={"save todo changes"}
      />
    </FormControl>
  );
}
