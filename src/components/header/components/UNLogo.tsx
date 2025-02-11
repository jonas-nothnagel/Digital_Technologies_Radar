import { ChakraProps } from '@chakra-ui/react';
import React from 'react';
import { Logo } from 'components/navbar/components/Logo';

import logo from 'assets/logos/UNDP_logo.png';

export const UNLogo: React.FC<ChakraProps> = (props) => (
  <Logo
    file={logo}
    maxwidthorheight={55}
    onClick={() => window.open('https://www.undp.org/', '_newtab')}
    {...props}
  />
);
