import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Spinner, Flex, Container } from '@chakra-ui/react';
import { Header, Footer } from '@/components/Layout';

export const Root = () => {
  return (
    <Suspense
      fallback={
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      }
    >
      <Flex direction="column" minH="100vh" bg="gray.700">
        <Header />
        <Container as="main" maxW="container.lg" p={4} color="white">
          <Outlet />
        </Container>
        <Footer />
      </Flex>
    </Suspense>
  );
};
