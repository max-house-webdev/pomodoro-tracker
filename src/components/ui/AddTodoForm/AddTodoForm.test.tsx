import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { AddTodoForm } from "./AddTodoForm";

describe("<AddTodoForm />", () => {
  test("it should mount", () => {
    render(<AddTodoForm />);

    const addTodoForm = screen.getByTestId("AddTodoForm");

    expect(addTodoForm).toBeInTheDocument();
  });
});
