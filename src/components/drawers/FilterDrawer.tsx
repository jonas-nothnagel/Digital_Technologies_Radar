import React from 'react';
import { Heading } from '@chakra-ui/react';

import { LittleDrawer } from './components/LittleDrawer';
import { LittleDrawerIconButton } from './components/LittleDrawerIconButton';
import { CustomFilter } from './filter/CustomFilter';

export const FilterDrawer: React.FC = () => (
  // <LittleDrawer
  //   icon={({ onToggle, isOpen }) => (
  //     <LittleDrawerIconButton
  //       isOpen={isOpen}
  //       onToggle={onToggle}
  //       type='COG'
  //       label='Filter'
  //     />
  //   )}
  // >
  //   <Heading as='h6' fontSize='20'>
  //     Filter
  //   </Heading>
  //   {/* TODO: make Radar come without styles, perhaps even think about overriding */}
  //   {/* it altogether with own filtering compoenet (just suplying methods to children) */}
  //   <CustomFilter />
  // </LittleDrawer>
  <CustomFilter />
);
