import { Avatar, Box, Flex, VStack, Text, Menu, MenuButton, Portal, Button, MenuList, MenuItem, useToast, HStack,Spacer } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../Atoms/userAtom';
import { Link as routerLink } from "react-router-dom";
import useShowToast from '../hooks/useShowToast';

function UserHeader({ user }) {
  const currentUser = useRecoilValue(userAtom);
  const [updating, setUpdating] = useState(false);
  const showToast = useShowToast();
  const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      showToast({
        // title: 'Account created.', // Optional title
        description: "Copied",
      });
    });
  };

  return (
    <VStack gap={4}>
      <HStack
        bgColor={"#AC4459"}
        width={"540px"}
        alignItems={"center"}
        borderRadius={"12px"}
        padding="4"
      >
       {user.profilePic &&
                 <Avatar src={user.profilePic} name='Mark Zuckerberg' size={{
                    base:"md",
                    md:"xl"
                }}></Avatar>
                }
          {!user.profilePic &&  
                <Avatar src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlwMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABQYHBAEDAv/EADkQAAIBAwEEBwUFCQEAAAAAAAABAgMEBREGITFREiJBYXGx0ROBkaHBJDNCUmIWIyUyQ5KTssIU/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwDUgAaZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIHaLaCON+z2yjO6a138Ka7+/uAmq1ajQh069WFOPOckl8zjWbxTl0f8A32/968zObq5r3dV1bmrOpN9s3r8D5FNazTnCpBTpzjOL/FFpo/RltjfXOPqqpaVZU32pcH4rgy+YDN08tRalFQuYLrw5967iCWAAAAAAAAAAAAAAAAAAHJlb2OPx9a5aTcY9RP8AFLgl8TMq1SdarOrVk51JycpSfFlv28rSja2lBN6TnKT9ySXmU0pQAFQOixu6tjdU7mg+vB66c1yfic4JVjVravC5t6dek9YVIqSfifUgtjK0quEUJNv2VWUVry3P6k6QAAAAAAAAAAAAAAAAVPb2HUsZ984/6lQNA2wtHc4aU4x1lQkqm7ktz+TM/KUABUAASrF62Ihph6kvzV5eUSwkfgLR2WItqM46T6PSn3N7/qSBAAAAAAAAAAAAAAAAB5JKScZLVNaNPtRn20GCqYytKpSi5Wkn1ZLf0O5+poR40nFppNPc01qgMlBod3s1irmWroOlJ9tGTj8uByrY7H6/e3OnLpR9CijFk2XwM7mtTvLuDjbwalCMuNR9nu8yx2ez2Ms5KdO3U5p6qdVubX0+RKEAAAAAAAAAAAAAAAAAAjM1mrfE0uv168lrClF733vkgJGdSFOLnUkoxXGUnokQd7tXjrdtUHK5kvybo/FlPyWUu8lV6VzVbgn1acd0Y+76s4imrNW2yu5fc2tGmv1Nz9D4ftdk9dejb/436kABiLRR2zuIv7RaUprnCbj56kzYbTY27ajKo7eb4KruT9/Az4DDWtKSaTT1T4Ndp6Ztic1eYyaVOfToa76M3u93IvmLydtlLf2ttLet06cv5oPv9SK7QAAAAAAAAAAAPJSUYuUnpFLVvkuYEdncrTxNn7R6SrT3UoPtfPwRnVxXq3NadavNzqTespPtOzOZCWSyNStv9kurSi+yK9eJHgAAaQAAAAADpx97Xx91C4tpaTj2PhJcmcwIrUMZf0clZwuaD3PdKP5XyZ1mfbKZJ2GRVOpLShX6stXui+xmg/IgAAAAAAAAENtZdu1w1RQbU679mvB8flqTJT9vav7yyodijOb8W0l5MCqAAqAAKAAAAAAAABpuFu3fYu3uJPWcoaTf6luZmRdthavTxtxSf9OtqvBpejIqygAgAAAAABR9un/FKC5UP+megCtgA0gAAAAAAAAAABb9gX1L1dnSh5M8BKLaACNAACP/2Q=='
                 name='Mark Zuckerberg' size={{
                    base:"md",
                    md:"xl"
                }}></Avatar>}
               
        
          <Text fontSize={"xl"} color="white">Hi, {user?.name || "User"}</Text>
        
        <Menu>
          <MenuButton as={Button} size="sm" variant="ghost">
          </MenuButton>
          <Portal>
            <MenuList>
              <MenuItem onClick={copyUrl}>Copy URL</MenuItem>
              {/* Add more menu items as needed */}
            </MenuList>
          </Portal>
        </Menu>
      </HStack>

      <Box bg="white" borderRadius="lg" p={4} mt={4} width={"540px"}> {/* Separate box for Account Details */}
        <Flex justifyContent="flex-start">  {/* Use justifyContent="flex-start" for left alignment */}
          <Text fontSize={"xl"} textColor={"gray.600"} fontWeight={"bold"} mb={2}>
            Account Details:
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
        <Flex>
        <Text fontSize={"md"} textColor={"gray.800"} >Email Address :</Text>
        <Spacer width={"10px"}/> 
          <Text fontSize={"md"} textColor={"gray.800"} >{user?.email || ""}</Text>  
        </Flex>      
        </Flex>
        <Flex justifyContent="space-between">
        <Flex>
        <Text fontSize={"md"} textColor={"gray.800"} >Phone Number :</Text>
        <Spacer width={"10px"}/> 
          <Text fontSize={"md"} textColor={"gray.800"} >{user?.phoneNumber || ""}</Text>  
        </Flex>      
        </Flex>
        <Link as={routerLink} to={'/update'}  >
            <Button size="sm" marginTop={"6px"} bgColor={"gray.600"} _hover={{bgColor:"gray.400"}}>update Profile</Button></Link>
      </Box>
    </VStack>
  );
}

export default UserHeader;


// import { Avatar, Box, Flex, VStack,Text, Menu, MenuButton, Portal,Button, MenuList, MenuItem, useToast, HStack} from '@chakra-ui/react'
// import React, { useState } from 'react'
// import { BsInstagram } from "react-icons/bs";
// import {CgMoreO} from "react-icons/cg"
// import { Link } from 'react-router-dom'
// import { useRecoilValue } from 'recoil';
// import userAtom from '../Atoms/userAtom';
// import {Link as routerLink} from "react-router-dom"
// import useShowToast from '../hooks/useShowToast';
// function UserHeader({user}) {
//     const currentUser=useRecoilValue(userAtom);
    
//     const [updating ,setUpdating]=useState(false)
//     const showToast=useShowToast();
//     const copyUrl=()=>{
//         const currentUrl=window.location.href;
//         navigator.clipboard.writeText(currentUrl).then(()=>{
//             toast({
//                 // title: 'Account created.',
//                 description: "copied",
//               })
//         });
//     }
//   return (
//     <VStack gap={4} >
//         <HStack bgColor={"#AC4459"} width={"540px"} alignItems={"center"}  borderRadius={"12px"} >
//                 {user.profilePic &&
//                  <Avatar src={user.profilePic} name='Mark Zuckerberg' size={{
//                     base:"md",
//                     md:"xl"
//                 }}
//                 padding={"10px"}></Avatar>
//                 }
//                 {!user.profilePic &&  
//                 <Avatar src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlwMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABQYHBAEDAv/EADkQAAIBAwEEBwUFCQEAAAAAAAABAgMEBREGITFREiJBYXGx0ROBkaHBJDNCUmIWIyUyQ5KTssIU/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwDUgAaZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIHaLaCON+z2yjO6a138Ka7+/uAmq1ajQh069WFOPOckl8zjWbxTl0f8A32/968zObq5r3dV1bmrOpN9s3r8D5FNazTnCpBTpzjOL/FFpo/RltjfXOPqqpaVZU32pcH4rgy+YDN08tRalFQuYLrw5967iCWAAAAAAAAAAAAAAAAAAHJlb2OPx9a5aTcY9RP8AFLgl8TMq1SdarOrVk51JycpSfFlv28rSja2lBN6TnKT9ySXmU0pQAFQOixu6tjdU7mg+vB66c1yfic4JVjVravC5t6dek9YVIqSfifUgtjK0quEUJNv2VWUVry3P6k6QAAAAAAAAAAAAAAAAVPb2HUsZ984/6lQNA2wtHc4aU4x1lQkqm7ktz+TM/KUABUAASrF62Ihph6kvzV5eUSwkfgLR2WItqM46T6PSn3N7/qSBAAAAAAAAAAAAAAAAB5JKScZLVNaNPtRn20GCqYytKpSi5Wkn1ZLf0O5+poR40nFppNPc01qgMlBod3s1irmWroOlJ9tGTj8uByrY7H6/e3OnLpR9CijFk2XwM7mtTvLuDjbwalCMuNR9nu8yx2ez2Ms5KdO3U5p6qdVubX0+RKEAAAAAAAAAAAAAAAAAAjM1mrfE0uv168lrClF733vkgJGdSFOLnUkoxXGUnokQd7tXjrdtUHK5kvybo/FlPyWUu8lV6VzVbgn1acd0Y+76s4imrNW2yu5fc2tGmv1Nz9D4ftdk9dejb/436kABiLRR2zuIv7RaUprnCbj56kzYbTY27ajKo7eb4KruT9/Az4DDWtKSaTT1T4Ndp6Ztic1eYyaVOfToa76M3u93IvmLydtlLf2ttLet06cv5oPv9SK7QAAAAAAAAAAAPJSUYuUnpFLVvkuYEdncrTxNn7R6SrT3UoPtfPwRnVxXq3NadavNzqTespPtOzOZCWSyNStv9kurSi+yK9eJHgAAaQAAAAADpx97Xx91C4tpaTj2PhJcmcwIrUMZf0clZwuaD3PdKP5XyZ1mfbKZJ2GRVOpLShX6stXui+xmg/IgAAAAAAAAENtZdu1w1RQbU679mvB8flqTJT9vav7yyodijOb8W0l5MCqAAqAAKAAAAAAAABpuFu3fYu3uJPWcoaTf6luZmRdthavTxtxSf9OtqvBpejIqygAgAAAAABR9un/FKC5UP+megCtgA0gAAAAAAAAAABb9gX1L1dnSh5M8BKLaACNAACP/2Q=='
//                  name='Mark Zuckerberg' size={{
//                     base:"md",
//                     md:"xl"
//                 }}
//                 padding={"10px"}></Avatar>}
//                <Text fontSize={"xl"}>Hi {user?.name}</Text>
//             </HStack>
//             <Flex alignItems={"flex-start"}>
//             <Text fontSize={"xl"} textColor={"gray.600"} fontWeight={"bold"} >Account Details:</Text>
//             <Text fontSize={"xl"}  > {user?.name}</Text>
//             <Text fontSize={"xl"}>{user.email}</Text>
//             <Link as={routerLink} to={'/update'}>
//                 <Button size="sm">update Profile</Button>
//             </Link>
//             </Flex>
           
//     </VStack>
//   )
// }

// export default UserHeader