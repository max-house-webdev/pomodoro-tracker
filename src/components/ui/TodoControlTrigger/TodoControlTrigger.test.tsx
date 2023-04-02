import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { TodoControlTrigger } from "./TodoControlTrigger";

describe("<TodoControlTrigger />", () => {
  test("it should mount", () => {
    render(<TodoControlTrigger todoId={"todoId"} />);

    const todoControlTrigger = screen.getByTestId("TodoControlTrigger");

    expect(todoControlTrigger).toBeInTheDocument();
  });
});
