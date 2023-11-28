import { parseDate } from "../parseDate";

export function getTodayKey(): string {
  const appStart = parseDate(new Date());

  const { weekday, day, month } = appStart;
  const key = `${weekday}-${day}-${month}`;

  return key;
}
