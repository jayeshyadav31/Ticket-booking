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
  Icon
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../Atoms/userAtom';
import LogoutButton from './LogoutButton';
import { FiLogOut } from 'react-icons/fi';

function Headers() {
    const user=useRecoilValue(userAtom)
    // console.log(user);
    const navigate=useNavigate()
  return (
    <Flex   
    justifyContent="space-between"
    mb="10"
    alignItems={"center"}
    borderRadius="16px"
    mt={3}
    textColor={"black"}
    borderColor={"gray"}
    borderWidth={"2px"}
    color="gray.600"
    p={3}
      >
        <Heading as="h1" size="md" borderColor={"gray.500"}>
          <Link as={RouterLink} to="/">
            Event Ease
          </Link>
        </Heading>
        <Spacer />
        { user &&
        <>
<Menu >
  <MenuButton as={Button} rightIcon={<Avatar size="sm" name={user?.name} />} variant="outline" 
  textColor="gray.500" borderWidth={"2px"} borderColor={"gray.300"}>
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
      <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
    </svg>
  </MenuButton>
  <MenuList backgroundColor={"white"}>
    <MenuItem  backgroundColor={"white"} onClick={() => { navigate(`/${user?.name}`) }} _hover={{bg:'gray.400'}}>My Account</MenuItem>
    <MenuItem backgroundColor={"white"} _hover={{bg:'gray.400'}} onClick={() => { navigate('/contact') }}>Contact</MenuItem>
  </MenuList>
</Menu>
<LogoutButton/>
        </>
}
    </Flex>
  )
}

export default Headers