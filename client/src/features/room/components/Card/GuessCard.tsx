import { useState } from 'react';
import { Card } from './Card';

interface GuessCardProps {
  value?: string | number;
}

export const GuessCard: React.FC<GuessCardProps> = ({ value }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
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
      {value}
    </Card>
  );
};
