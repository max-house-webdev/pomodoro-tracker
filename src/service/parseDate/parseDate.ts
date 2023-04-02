export type TWeekday =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | null;

export type TMonth =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December"
  | null;

export function parseDate(date: Date) {
  let weekday: TWeekday = null;

  switch (date.getDay()) {
    case 0: {
      weekday = "Sunday";
      break;
    }
    case 1: {
      weekday = "Monday";
      break;
    }
    case 2: {
      weekday = "Tuesday";
      break;
    }
    case 3: {
      weekday = "Wednesday";
      break;
    }
    case 4: {
      weekday = "Thursday";
      break;
    }
    case 5: {
      weekday = "Friday";
      break;
    }
    case 6: {
      weekday = "Saturday";
      break;
    }
    default: {
      weekday = null;
    }
  }

  let month: TMonth = null;

  switch (date.getMonth()) {
    case 0: {
      month = "January";
      break;
    }
    case 1: {
      month = "February";
      break;
    }
    case 2: {
      month = "March";
      break;
    }
    case 3: {
      month = "April";
      break;
    }
    case 4: {
      month = "May";
      break;
    }
    case 5: {
      month = "June";
      break;
    }
    case 6: {
      month = "July";
      break;
    }
    case 7: {
      month = "August";
      break;
    }
    case 8: {
      month = "September";
      break;
    }
    case 9: {
      month = "October";
      break;
    }
    case 10: {
      month = "November";
      break;
    }
    case 11: {
      month = "December";
      break;
    }

    default: {
      month = null;
    }
  }

  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const timeStamp_milliseconds = date.getTime();

  return { weekday, month, day, hours, minutes, timeStamp_milliseconds };
}
