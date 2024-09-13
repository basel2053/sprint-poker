import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';

interface LinkProps extends ReactRouterLinkProps {
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ children, ...rest }) => (
  <ChakraLink as={ReactRouterLink} {...rest}>
    {children}
  </ChakraLink>
);
