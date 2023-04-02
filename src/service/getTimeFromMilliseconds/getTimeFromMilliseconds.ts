export function getTimeFromMilliseconds(milliseconds: number) {
  const hours = Math.floor(milliseconds / 36e5);
  const minutes = Math.floor((milliseconds - hours * 36e5) / 6e4);
  const seconds = Math.floor(
    (milliseconds - hours * 36e5 - minutes * 6e4) / 1e3
  );

  const time = { hours, minutes, seconds };

  return time;
}
