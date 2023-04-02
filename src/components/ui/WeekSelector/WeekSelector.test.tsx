import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { WeekSelector } from "./WeekSelector";

describe("<WeekSelector />", () => {
  test("it should mount", () => {
    render(<WeekSelector />);

    const weekSelector = screen.getByTestId("WeekSelector");

    expect(weekSelector).toBeInTheDocument();
  });
});
