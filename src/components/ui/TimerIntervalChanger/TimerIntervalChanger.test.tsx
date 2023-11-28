import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { TimerIntervalChanger } from "./TimerIntervalChanger";

describe("<TimerIntervalChanger />", () => {
  test("it should mount", () => {
    render(<TimerIntervalChanger role={"increase"} />);

    const timerIntervalChanger = screen.getByTestId("TimerIntervalChanger");

    expect(timerIntervalChanger).toBeInTheDocument();
  });
});
