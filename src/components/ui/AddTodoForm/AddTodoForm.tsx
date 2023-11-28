import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  keyframes,
} from "@chakra-ui/react";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useTimerStore, useTodosStore } from "../../../store";

import { useAddTodoFormColorModeValue } from "./useAddTodoFormColorModeValue";

export function AddTodoForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const { color, bgColor, focusColor } = useAddTodoFormColorModeValue();

  const addTodo = useTodosStore((state) => state.addTodo);
  const timeManager = useTimerStore((state) => state.timeManager);

  let timeoutId: string | number | NodeJS.Timeout | undefined;

  useEffect(() => {
    if (!inputRef.current) return;

    inputRef.current.focus();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [inputRef, timeoutId]);

  const onInputChange = () => {
    if (!inputRef.current) return;
    setIsInvalid(false);
    setInputValue(inputRef.current.value);
    setTouched(true);
  };

  const submitButtonOnMouseEnter = () => {
    if (!inputRef.current || submitted) return;
    if (touched) {
      setIsInvalid(inputRef.current.value.length < 3);
    } else {
      setIsInvalid(true);
    }
  };

  const submitButtonOnMouseOut = () => {
    setIsInvalid(false);
    if (submitted) {
      setInputValue("");
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement | HTMLDivElement>) => {
    event.preventDefault();
    if (!inputValue) {
      setIsInvalid(true);

      return;
    }

    setIsInvalid(false);
    addTodo({ title: inputValue, timeManager });
    setSubmitted(true);
    setTouched(false);
  };

  const SubmitButton = () => (
    <Button
      type="submit"
      variant="brandPrimaryGreen"
      onMouseEnter={submitButtonOnMouseEnter}
      onMouseOut={submitButtonOnMouseOut}
      isDisabled={isInvalid}
    >
      Добавить
    </Button>
  );

  const ControlHOC = (props: { isInvalid: any }) => {
    const { isInvalid } = props;

    const animationKeyframes = keyframes`
    from {  transform: translateY(1em); opacity: 0.25; }
    to {  transform: translateY(0); opacity: 1; }
  `;
    const animation = `${animationKeyframes} 600ms ease-in-out`;

    return isInvalid ? (
      <Flex justifyContent={"space-between"}>
        <SubmitButton />
        <FormErrorMessage mx={5} animation={animation}>
          Введите название задачи!
        </FormErrorMessage>
      </Flex>
    ) : (
      <SubmitButton />
    );
  };

  return (
    <FormControl
      as="form"
      isInvalid={isInvalid}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      data-testid="AddTodoForm"
      onSubmit={onSubmit}
    >
      <Input
        ref={inputRef}
        type="text"
        placeholder="Название задачи"
        maxW="370px"
        mb="1.5rem"
        px="1rem"
        py="1.25rem"
        rounded="none"
        bgColor={bgColor}
        color={color}
        _focusVisible={{ outlineColor: focusColor }}
        _selection={{ background: "gray.200" }}
        value={inputValue}
        onChange={onInputChange}
        onFocus={() => {
          setSubmitted(false);
          setIsInvalid(false);
        }}
      />
      <ControlHOC isInvalid={isInvalid} />
    </FormControl>
  );
}
