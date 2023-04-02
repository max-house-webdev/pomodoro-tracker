import { getTimeFromMilliseconds } from "./getTimeFromMilliseconds";
import "@testing-library/jest-dom/extend-expect";

describe("getTimeFromMilliseconds", () => {
  test("it should return 0 h 0 m 0 s", () => {
    expect(getTimeFromMilliseconds(0).hours).toEqual(0);
    expect(getTimeFromMilliseconds(0).minutes).toEqual(0);
    expect(getTimeFromMilliseconds(0).seconds).toEqual(0);
  });
  test("it should return 1 h 0 m 0 s", () => {
    expect(getTimeFromMilliseconds(36e5).hours).toEqual(1);
    expect(getTimeFromMilliseconds(36e5).minutes).toEqual(0);
    expect(getTimeFromMilliseconds(36e5).seconds).toEqual(0);
  });
  test("it should return 5 h 25 m 38 s", () => {
    expect(getTimeFromMilliseconds(19538e3).hours).toEqual(5);
    expect(getTimeFromMilliseconds(19538e3).minutes).toEqual(25);
    expect(getTimeFromMilliseconds(19538e3).seconds).toEqual(38);
  });
});
