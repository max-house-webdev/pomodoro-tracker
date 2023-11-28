import React from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { extendedTheme } from "../../theme";

import { ControlPage, ErrorPage, MainPage, StatisticPage } from "../../pages";
import { Header, StatisticProvider } from "../../components";

export function Layout() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={extendedTheme}>
        <Container
          maxW={{ base: "100vw", lg: "1440px" }}
          px={{ base: "0.5rem", md: "1rem", lg: "2.5rem" }}
          py={{ base: "0.5rem", md: "1rem" }}
          mb={5}
        >
          <StatisticProvider />
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/statistic" element={<StatisticPage />} />
            <Route path="/control" element={<ControlPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Container>
      </ChakraProvider>
    </BrowserRouter>
  );
}
