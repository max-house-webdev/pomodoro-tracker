import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ClockIcon, StatisticIcon } from "../../../components";

import { useAppMediaQuery, useBrandRedModeValue } from "../../../hooks";
import { useTimerStore } from "../../../store";
import { SettingsIcon } from "@chakra-ui/icons";

export function Nav() {
  const { md } = useAppMediaQuery();
  const color = useBrandRedModeValue(400);

  const isTimerRunning = useTimerStore((state) => state.isTimerRunning);

  return (
    <Breadcrumb color={color}>
      <BreadcrumbItem>
        <BreadcrumbLink
          as={Link}
          to={"/"}
          display="flex"
          alignItems="center"
          _focusVisible={{ outlineColor: color }}
          isCurrentPage
        >
          <ClockIcon boxSize={5} color={color} />
          {md && (
            <Text as="span" p="0.5rem">
              Главная
            </Text>
          )}
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink
          as={Link}
          to={isTimerRunning ? "/" : "statistic"}
          display="flex"
          alignItems="center"
          _focusVisible={{ outlineColor: color }}
        >
          <StatisticIcon boxSize={5} color={color} />
          {md && (
            <Text as="span" p="0.5rem">
              Статистика
            </Text>
          )}
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink
          as={Link}
          to={isTimerRunning ? "/" : "control"}
          display="flex"
          alignItems="center"
          _focusVisible={{ outlineColor: color }}
        >
          <SettingsIcon boxSize={4} color={color} />
          {md && (
            <Text as="span" p="0.5rem">
              Настройки
            </Text>
          )}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
