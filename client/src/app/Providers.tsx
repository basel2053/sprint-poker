import { ChakraProvider, extendTheme } from '@chakra-ui/react';

interface ProviderProps {
  children: React.ReactNode;
}

const customTheme = extendTheme({
  colors: {
    lightGray: {
      default: '#C4C4C4',
      hover: '#EEEEEE',
      disabled: '#9E9E9E',
    },
  },
  // I'm just adding one more fontSize than the default ones
  fontSizes: {
    xxs: '0.625rem',
  },
  // I'm creating a new space tokens since the default is represented with numbers
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
});

const Providers: React.FC<ProviderProps> = ({ children }) => (
  <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
);

export default Providers;
