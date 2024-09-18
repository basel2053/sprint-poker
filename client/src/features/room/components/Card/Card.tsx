import { Center, CenterProps } from '@chakra-ui/react';

interface CardProps extends CenterProps {
  children: React.ReactNode;
  pointer?: string;
}

export const Card: React.FC<CardProps> = ({ children, ...rest }) => (
  <Center
    w="80px"
    h="120px"
    as="button"
    pointer="cursor"
    bg={'teal.400'}
    borderRadius="md"
    fontSize="2xl"
    {...rest}
  >
    {children}
  </Center>
);
