import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { TimerControl } from "./TimerControl";

describe("<TimerControl />", () => {
  test("it should mount", () => {
    render(<TimerControl />);

    const timerControl = screen.getByTestId("TimerControl");

    expect(timerControl).toBeInTheDocument();
  });
});
