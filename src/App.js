import React from "react";
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import SupplyChainAssessment from "./SupplyChainAssessment";

// Custom theme with your brick and steel color palette
const theme = extendTheme({
  colors: {
    brand: {
      lightGray: '#c8c4bd',
      charcoal: '#1d1d1e', 
      brick: '#8b3b29',
      steel: '#535756',
      warmGray: '#c8c4bd',
      cream: '#e8d8a5'
    }
  },
  fonts: {
    heading: 'system-ui, sans-serif',
    body: 'system-ui, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800'
      }
    }
  }
});

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <SupplyChainAssessment />
    </ChakraProvider>
  );
}