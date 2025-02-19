import React from 'react';
import { ChakraProps } from '@chakra-ui/react';

import { Logo } from 'components/navbar/components/Logo';
import logoBlack from 'assets/logos/SDG_BLACK_logo.png';

export const UNDPLogo: React.FC<ChakraProps> = (props) => {
  return (
    <Logo
      w='45px'
      file={logoBlack}
      maxwidthorheight={45}
      onClick={() => window.open('https://sdgailab.org', '_newtab')}
      {...props}
    />
  );
};
