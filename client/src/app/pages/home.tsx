import { Box, Button, Heading } from '@chakra-ui/react';

export const Home = () => (
  <>
    <Box textAlign="center">
      <Heading as="h1" my={5}>
        Sprint Poker
      </Heading>
      <Button variant="outline" color="teal.300">
        Create A Room!
      </Button>
    </Box>
  </>
);
