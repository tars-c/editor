import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import MainScreen from "@screens/MainScreen";

export const App = () => {
  return (
    <ChakraProvider resetCSS={true}>
      <MainScreen />
    </ChakraProvider>
  );
};
