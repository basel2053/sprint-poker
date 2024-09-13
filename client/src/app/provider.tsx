import { Suspense } from 'react';
import { ChakraProvider, extendTheme, Spinner } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    lightGray: {
      default: '#C4C4C4',
      hover: '#EEEEEE',
      disabled: '#9E9E9E',
    },
  },
  fontSizes: {
    xxs: '0.625rem',
  },
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
});

interface ProviderProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<ProviderProps> = ({ children }) => (
  <Suspense
    fallback={
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    }
  >
    <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
  </Suspense>
);

export default AppProviders;
