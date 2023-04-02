import React from "react";
import { Heading, Highlight, VStack } from "@chakra-ui/react";
import { TMonth, TTotalTime, TWeekday } from "../../../store";
import {
  useBrandGrayModeValue,
  useBrandRedModeValue,
  useTextColor,
} from "../../../hooks";

export interface IDayIndicatorProps {
  day: number | null;
  month: TMonth | null;
  weekday: TWeekday | null;
  workTime: TTotalTime | null;
}

export function DayIndicator(props: IDayIndicatorProps) {
  const { weekday, workTime, day, month } = props;
  const textColor = useTextColor();
  const bgColor = useBrandGrayModeValue(100);
  const accentTextColor = useBrandRedModeValue(400);

  const NoData = () => (
    <Heading
      as="h5"
      color={textColor}
      fontSize={16}
      fontWeight="normal"
      textAlign="left"
    >
      Нет данных
    </Heading>
  );

  if (!weekday && !workTime) {
    return <NoData />;
  }

  let ruDay: string;

  switch (weekday) {
    case "Monday": {
      ruDay = "Понедельник";
      break;
    }
    case "Tuesday": {
      ruDay = "Вторник";
      break;
    }
    case "Wednesday": {
      ruDay = "Среда";
      break;
    }
    case "Thursday": {
      ruDay = "Четверг";
      break;
    }
    case "Friday": {
      ruDay = "Пятница";
      break;
    }
    case "Saturday": {
      ruDay = "Суббота";
      break;
    }
    case "Sunday": {
      ruDay = "Воскресенье";
      break;
    }
    default: {
      ruDay = "не определено";
    }
  }

  let ruMonth: string;

  switch (month) {
    case "January": {
      ruMonth = "января";
      break;
    }
    case "February": {
      ruMonth = "февраля";
      break;
    }
    case "March": {
      ruMonth = "марта";
      break;
    }
    case "April": {
      ruMonth = "апреля";
      break;
    }
    case "May": {
      ruMonth = "мая";
      break;
    }
    case "June": {
      ruMonth = "июня";
      break;
    }
    case "July": {
      ruMonth = "июля";
      break;
    }
    case "August": {
      ruMonth = "августа";
      break;
    }
    case "September": {
      ruMonth = "сентября";
      break;
    }
    case "October": {
      ruMonth = "октября";
      break;
    }
    case "November": {
      ruMonth = "ноября";
      break;
    }
    case "December": {
      ruMonth = "декабря";
      break;
    }
    default: {
      ruMonth = "не определено";
    }
  }

  const hours = workTime ? workTime.hours : 0;
  const minutes = workTime ? workTime.minutes : 0;

  type TContainerProps = {
    ruMonth: string;
    ruDay: string;
    children: JSX.Element;
  };

  const Container = (props: TContainerProps) => {
    const { children, ruMonth, ruDay } = props;
    return (
      <VStack
        p={25}
        bgColor={bgColor}
        h="100%"
        w="100%"
        alignItems="flex-start"
      >
        <Heading as="h3" fontSize={24} textAlign="left">
          {ruDay}
        </Heading>
        <Heading as="h3" fontSize={24} textAlign="left">
          {day} {ruMonth}
        </Heading>
        {children}
      </VStack>
    );
  };

  if (minutes === 0 && hours === 0) {
    return (
      <Container ruMonth={ruMonth} ruDay={ruDay}>
        <NoData />
      </Container>
    );
  }

  type TGetTimeLabelArgs = {
    hours: number;
    minutes: number;
  };

  const getTimeLabel = (args: TGetTimeLabelArgs) => {
    const { hours, minutes } = args;
    let label = "";

    if (hours) {
      label += ` ${hours} ч`;
      if (minutes) {
        label += ` ${minutes} мин`;
      }

      return label;
    }

    if (minutes < 1) {
      return "менее минуты";
    }

    if (minutes <= 2) {
      return "менее 2 минут";
    }

    switch (minutes % 10) {
      case 2:
      case 3:
      case 4: {
        label += ` ${minutes} минуты`;
        break;
      }
      default: {
        label += ` ${minutes} минут`;
      }
    }

    return label;
  };

  const timeLabel = getTimeLabel({ hours, minutes });
  const message = `Вы работали над задачами в течение ${timeLabel}`;

  return (
    <Container ruMonth={ruMonth} ruDay={ruDay}>
      <Heading
        as="h5"
        color={textColor}
        fontSize={16}
        fontWeight="normal"
        textAlign="left"
      >
        <Highlight query={timeLabel} styles={{ color: accentTextColor }}>
          {message}
        </Highlight>
      </Heading>
    </Container>
  );
}
