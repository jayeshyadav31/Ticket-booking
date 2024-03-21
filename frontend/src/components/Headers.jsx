import React from 'react';
import {
  Box,
  Flex,
  Spacer,
  Link,
  Button,
  Heading,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../Atoms/userAtom';
import LogoutButton from './LogoutButton';

function Headers() {
    const user=useRecoilValue(userAtom)
    console.log(user);
    const navigate=useNavigate()
  return (
    <Flex   justifyContent="space-between"
    mb="6"
    borderRadius="16px"
    mt={6}
    bgColor="gray.800"
    color="gray.300"
    p={3}
      >
        <Heading as="h1" size="md">
          <Link as={RouterLink} to="/">
            Event Ease
          </Link>
        </Heading>
        <Spacer />
        { user &&
        <>
        <Menu>
          <MenuButton as={Button} rightIcon={<Avatar size="sm" name="User" />} variant="outline">
            Profile
          </MenuButton>
          <MenuList>
            <MenuItem onClick={()=>{navigate(`/${user?.name}`)}}>My Account</MenuItem>
            {/* <MenuItem>Settings</MenuItem> */}
            <MenuItem onClick={()=>{navigate('/contact')}}>Contact</MenuItem>
          </MenuList>
        </Menu>
        <LogoutButton/>
        </>
}
    </Flex>
  )
}

export default Headers