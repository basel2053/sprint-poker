import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Text,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleCreate = () => {
    navigate(`/room/${roomName}`);
    onClose();
  };
  return (
    <>
      <Box textAlign="center">
        <Heading as="h1" my={5}>
          Sprint Poker
        </Heading>
        <Button variant="outline" color="teal.300" onClick={onOpen}>
          Create A Room!
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Instant Room</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleCreate}>
            <ModalBody>
              <Text mb={3}> No need to sign up. Just create a room and start directly.</Text>
              <Input
                placeholder="Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button mr={3} variant="ghost">
                Close
              </Button>
              <Button colorScheme="blue" type="submit">
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
