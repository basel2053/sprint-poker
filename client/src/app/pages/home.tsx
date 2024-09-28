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
  useSteps,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { roomAPI } from '@/api';
import { FormStepper } from '@/components/Others';

const steps = [
  { title: 'First', description: 'Room Name' },
  { title: 'Second', description: 'Display Name' },
];

export const Home = () => {
  const [roomName, setRoomName] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activeStep, goToNext } = useSteps({
    index: 1,
    count: steps.length,
  });

  const mutation = useMutation({
    mutationFn: (roomName: string) => roomAPI.createRoom(roomName),
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(roomName);
    // navigate(`/room/${roomName}`);
    onClose();
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    goToNext();
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
          <form onSubmit={activeStep === 2 ? handleCreate : handleNext}>
            <ModalBody>
              <FormStepper steps={steps} activeStep={activeStep} />
              <Text mb={3}> No need to sign up. Just create a room and start directly.</Text>
              <Input
                placeholder={activeStep === 2 ? 'Name' : 'Room Name'}
                value={activeStep === 2 ? name : roomName}
                onChange={(e) =>
                  activeStep === 2 ? setName(e.target.value) : setRoomName(e.target.value)
                }
                outlineColor="teal.500"
                focusBorderColor="teal.400"
              />
            </ModalBody>
            <ModalFooter>
              <Button mr={3} variant="ghost">
                Close
              </Button>
              {
                <Button colorScheme="teal" type="submit">
                  {activeStep === 2 ? 'Create' : 'Next'}
                </Button>
              }
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
