import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import {
  AddTodoForm,
  InstructionListWrapper,
  TimerContainer,
  TodoListContainer,
} from "../components";

export function MainPage() {
  return (
    <Grid
      gridTemplateAreas={[
        ` "instruction"
          "timer"
          "addTodoForm"
          "todoList"`,
        null,
        null,
        ` "instruction  timer"
          "addTodoForm  timer"
          "todoList     timer"`,
      ]}
      gridTemplateColumns={["1fr", null, null, "24rem 1fr", "32.5rem 1fr"]}
      gridTemplateRows={[
        "auto",
        null,
        null,
        "18rem 7.25rem auto",
        "14.5rem 7.25rem auto",
      ]}
      gap={5}
      pt={{ sm: 2, md: 5, xl: 10, "2xl": 100 }}
    >
      <GridItem gridArea="instruction">
        <InstructionListWrapper />
      </GridItem>
      <GridItem gridArea="addTodoForm">
        <AddTodoForm />
      </GridItem>
      <GridItem gridArea="todoList">
        <TodoListContainer />
      </GridItem>
      <GridItem gridArea="timer">
        <TimerContainer />
      </GridItem>
    </Grid>
  );
}
