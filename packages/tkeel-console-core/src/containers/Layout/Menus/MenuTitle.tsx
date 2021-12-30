import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import {
  ChevronDownFilledIcon,
  ChevronUpFilledIcon,
} from '@tkeel/console-icons';

import MenuItem from './MenuItem';

import { Menu } from '@/mock/types';

type Props = Menu & {
  spread: boolean;
  handleMenuClick: (id: string) => void;
};

function MenuTitle({
  id,
  name,
  icon,
  children,
  spread,
  handleMenuClick,
}: Props) {
  const location = useLocation();
  const active: boolean = (children as Menu[]).some((item) => {
    return item.path && location.pathname.includes(item.path);
  });

  const mode = active ? 'dark' : 'light';
  return (
    <Box
      paddingRight="18px"
      color={active ? 'white' : 'gray.600'}
      backgroundColor={active ? 'grayAlternatives.700' : 'inherit'}
      borderRadius="4px"
      active={active.toString()}
      onClick={() => handleMenuClick(id)}
    >
      <MenuItem
        active={active}
        name={name}
        leftIcon={icon}
        rightIcon={
          spread ? (
            <ChevronUpFilledIcon mode={mode} />
          ) : (
            <ChevronDownFilledIcon mode={mode} />
          )
        }
      />
    </Box>
  );
}

export default MenuTitle;
