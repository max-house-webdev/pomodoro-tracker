import {
  Heading,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useBrandGrayModeValue, useKeyframesAnimation } from "../../../hooks";

export interface ITodoCounterProps {
  todoTitle: string;
  completedTodosNumber: number;
}

export function TodoCounter(props: ITodoCounterProps) {
  const { todoTitle, completedTodosNumber } = props;

  const todoTitleColor = useColorModeValue("black", "whiteAlpha.800");
  const spanColor = useBrandGrayModeValue(300);

  const animationCSSInterpolation = `
  from {  opacity: 0.25; }
  to {  opacity: 1; }
`;

  const animationDuration = 600;

  const animation = useKeyframesAnimation({
    animationCSSInterpolation,
    animationDuration,
  });

  return (
    <VStack mb="2rem">
      <HStack justifyContent="center" animation={animation}>
        <Text as="span" px={2} color={spanColor} variant={"selectionGray"}>
          Задача {completedTodosNumber + 1} -
        </Text>
        <Heading
          as="h4"
          variant={"noSelection"}
          color={todoTitleColor}
          fontSize="md"
          fontWeight="normal"
          textAlign="center"
        >
          {todoTitle}
        </Heading>
      </HStack>
    </VStack>
  );
}
