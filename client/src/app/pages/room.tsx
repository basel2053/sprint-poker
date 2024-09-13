import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GuessCard, Card } from '@/features/room/components/Card';
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';

const fibonacciSeries = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55];

export const Room = () => {
  const [estimation, setEstimation] = useState<string | number>('??');
  const { roomId } = useParams();
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5000/ws');
    ws.onopen = () => {
      console.log('Connected to WS server');
      ws.onmessage = (message) => {
        console.log('Received message: ', message);
      };
      ws.send(JSON.stringify({ type: 'message', message: 'Hello There!' }));
    };
    return () => {
      ws.close();
    };
  }, []);

  const handleSelect = (value: number) => {
    setEstimation(value);
  };

  return (
    <>
      <Heading as="h1" textAlign="center">
        {roomId}
      </Heading>
      <Box mt={5}>
        <Text textAlign="center" mb={3}>
          This is your estimation card
        </Text>
        <GuessCard value={estimation} />
        <SimpleGrid columns={5} spacing={5} mt={10}>
          {fibonacciSeries.map((num) => (
            <Card key={num} onClick={() => handleSelect(num)}>
              {num}
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};
