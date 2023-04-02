import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { TimerDefaultSetter } from "./TimerDefaultSetter";

describe("<TimerDefaultSetter />", () => {
  test("it should mount", () => {
    render(<TimerDefaultSetter />);

    const timerDefaultSetter = screen.getByTestId("TimerDefaultSetter");

    expect(timerDefaultSetter).toBeInTheDocument();
  });
});
