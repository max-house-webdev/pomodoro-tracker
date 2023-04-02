import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { DiagramControl } from "./DiagramControl";

describe("<DiagramControl />", () => {
  test("it should mount", () => {
    render(<DiagramControl />);

    const diagramControl = screen.getByTestId("DiagramControl");

    expect(diagramControl).toBeInTheDocument();
  });
});
