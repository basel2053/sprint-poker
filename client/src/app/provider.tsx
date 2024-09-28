import { Suspense } from 'react';
import { ChakraProvider, extendTheme, Spinner } from '@chakra-ui/react';
import { QueryClientProvider, QueryClient, MutationCache, Mutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from '@/components/Toast';

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000,
    },
  },
  mutationCache: new MutationCache({
    onError: (
      error: unknown,
      _variables: unknown,
      _context: unknown,
      mutation: Mutation<unknown, unknown, unknown, unknown>,
    ): void => {
      if (isAxiosError(error) && mutation.meta?.ERROR_SOURCE) {
        toast({
          status: 'error',
          description: `${mutation.meta.ERROR_SOURCE}: ${error.response?.data?.message}`,
        });
      }
      if (error instanceof Error && mutation.meta?.ERROR_SOURCE) {
        toast({
          status: 'error',
          description: `${mutation.meta.ERROR_SOURCE}: ${error.message}`,
        });
      }
    },
    onSuccess: (_data, _variables, _context, mutation): void => {
      if (mutation.meta?.SUCCESS_MESSAGE) {
        toast({
          status: 'success',
          description: `${mutation.meta.SUCCESS_MESSAGE}`,
        });
      }
    },
  }),
});

interface ProviderProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<ProviderProps> = ({ children }) => {
  return (
    <Suspense
      fallback={
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      }
    >
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
      </QueryClientProvider>
    </Suspense>
  );
};

export default AppProviders;
