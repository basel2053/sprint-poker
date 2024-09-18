import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GuessCard, Card } from '@/features/room/components/Card';
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Button,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';

import { PiEyeBold } from 'react-icons/pi';

const fibonacciSeries = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55];
const name = String(localStorage.getItem('name'));

export const Room = () => {
  const [estimation, setEstimation] = useState<string | number>('??');
  const [websocket, setWebsocket] = useState<WebSocket | null>();
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [users, setUsers] = useState<{ name: string; estimation: string | number }[]>([]);
  const { roomId } = useParams();
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5000/ws');
    ws.onopen = () => {
      console.log('Connected to WS server');
      ws.send(JSON.stringify({ type: 'join', roomId, name }));
      ws.onmessage = (message) => {
        const data = JSON.parse(message.data);
        console.log(data);
        switch (data.type) {
          case 'estimation':
            if (name === data.name) setEstimation(data.value);
            setUsers((oldUsers) =>
              oldUsers.map((user) =>
                user.name === data.name ? { ...user, estimation: data.value } : user,
              ),
            );
            break;

          case 'join':
            setUsers((oldUsers) => [...oldUsers, { name: data.name, estimation: '??' }]);
            break;
        }
      };
      setWebsocket(ws);
    };
    return () => {
      ws.close();
    };
  }, [roomId]);

  const handleSelect = (value: number) => {
    setEstimation(value);
    websocket?.send(JSON.stringify({ type: 'estimation', value, name }));
  };

  const handleEstimationVisbility = () => {};

  return (
    <>
      <Heading as="h1" textAlign="center">
        {roomId}
      </Heading>
      <Box mt={5}>
        <Text textAlign="center" mb={3}>
          This is your estimation card
        </Text>
        <GuessCard value={estimation} isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
        <SimpleGrid columns={5} spacing={5} mt={8} justifyItems="center" mx="auto" w="55%">
          {fibonacciSeries.map((num) => (
            <Card key={num} onClick={() => handleSelect(num)}>
              {num}
            </Card>
          ))}
        </SimpleGrid>
      </Box>
      <TableContainer>
        <Table variant="simple" colorScheme="teal">
          <TableCaption placement="top" fontWeight="bold" color="white" fontSize="xl">
            Estimation Results
          </TableCaption>
          <Thead>
            <Tr>
              <Th w="40%">Name</Th>
              <Th textAlign="center">Story Points</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map(({ name, estimation }) => (
              <Tr key={name}>
                <Td>{name}</Td>
                <Td textAlign="center">{estimation}</Td>
                <Td textAlign="end">
                  <Button onClick={handleEstimationVisbility}>
                    <PiEyeBold />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
