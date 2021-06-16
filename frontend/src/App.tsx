import React from "react";
import { Router } from "router";
import { ChakraProvider, theme } from "@chakra-ui/react";
import "./App.css";
import { MyTheme } from "theme/index";

export const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  );
};
