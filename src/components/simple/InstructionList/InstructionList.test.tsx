import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { InstructionList } from "./InstructionList";

describe("<InstructionList />", () => {
  test("it should mount", () => {
    render(<InstructionList />);

    const instructionList = screen.getByTestId("InstructionList");

    expect(instructionList).toBeInTheDocument();
  });
});
