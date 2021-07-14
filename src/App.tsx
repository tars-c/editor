import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import MainScreen from "@screens/MainScreen";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

export const App = () => {
  return (
    <ChakraProvider resetCSS={true}>
      <MainScreen />
    </ChakraProvider>
  );
};
