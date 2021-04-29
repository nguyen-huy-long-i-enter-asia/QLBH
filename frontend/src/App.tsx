import React from "react";
import { Router } from "router";
import { ChakraProvider } from "@chakra-ui/react";

export const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  );
};
