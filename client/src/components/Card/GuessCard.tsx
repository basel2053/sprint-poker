import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';

const GuessCard = () => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const handleToggle = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <Box
      w="100px"
      h="150px"
      bg={isFlipped ? 'teal.400' : 'gray.200'}
      borderRadius="md"
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={handleToggle}
      cursor="pointer"
      transition="transform 0.6s"
      transform={isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}
    >
      <Text fontSize="3xl" color="white">
        {isFlipped ? 'Yes' : 'No'}
      </Text>
    </Box>
  );
};

export default GuessCard;
