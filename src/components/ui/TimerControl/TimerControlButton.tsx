import { Button, ButtonProps } from "@chakra-ui/react";

interface ITimerControlButton extends ButtonProps {
  role: "start" | "stop" | "pause" | "resume" | "skip" | "complete";
}

export function TimerControlButton(props: ITimerControlButton) {
  const { role, isDisabled, onClick } = props;

  let variant = "";
  let textContent = "";

  switch (role) {
    case "start": {
      variant = "brandPrimaryGreen";
      textContent = "Старт";

      break;
    }

    case "pause": {
      variant = "brandPrimaryGreen";
      textContent = "Пауза";

      break;
    }

    case "resume": {
      variant = "brandPrimaryGreen";
      textContent = "Продолжить";

      break;
    }

    case "skip": {
      variant = "brandSecondaryRed";
      textContent = "Пропустить";

      break;
    }

    case "complete": {
      variant = "brandSecondaryRed";
      textContent = "Сделано";

      break;
    }

    case "stop": {
      variant = "brandSecondaryRed";
      textContent = "Стоп";

      break;
    }
  }

  return (
    <Button variant={variant} isDisabled={isDisabled} onClick={onClick}>
      {textContent}
    </Button>
  );
}
