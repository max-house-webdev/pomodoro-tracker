import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { DiagramWrapper } from "./DiagramWrapper";

describe("<DiagramWrapper />", () => {
  test("it should mount", () => {
    render(<DiagramWrapper />);

    const diagramWrapper = screen.getByTestId("DiagramWrapper");

    expect(diagramWrapper).toBeInTheDocument();
  });
});
