import { useState } from 'react';
import { Card } from './Card';
import { Box } from '@chakra-ui/react';

interface GuessCardProps {
  value?: string | number;
  isFlipped: boolean;
  setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GuessCard: React.FC<GuessCardProps> = ({ value, isFlipped, setIsFlipped }) => {
  const handleToggle = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <Card
      onClick={handleToggle}
      mx="auto"
      bg={isFlipped ? 'gray.500' : 'teal.400'}
      transition="transform 0.6s"
      transform={isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}
    >
      <Box transform={isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}>
        {isFlipped ? value : '??'}
      </Box>
    </Card>
  );
};
