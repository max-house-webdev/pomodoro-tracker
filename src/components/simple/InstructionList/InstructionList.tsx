import React from "react";
import { List } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import { InstructionListItem } from "../../../components";

export function InstructionList() {
  const instructions = [
    "Выберите категорию и напишите название текущей задачи",
    "Запустите таймер («помидор»)",
    "Работайте пока «помидор» не прозвонит",
    "Сделайте короткий перерыв (3-5 минут)",
    "Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут)",
  ];

  return (
    <List data-testid="InstructionList">
      {instructions.map((instruction) => (
        <InstructionListItem
          key={uuid().slice(0, 8)}
          instruction={instruction}
        />
      ))}
    </List>
  );
}
