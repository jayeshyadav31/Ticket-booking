import { Flex,Text, Heading, VStack ,Icon} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import movieAtom from '../Atoms/MovieAtom'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

function MovieHeader({movie}) {
    const navigate=useNavigate()
  return (
    <Flex   
    justifyContent="space-between"
    mb="6"
    maxWidth={"full"}
    alignItems={"center"}
    mt={6}
    textColor={"black"}
    color="gray.600"
    p={3}
    borderWidth={"2px"}
    borderBottomColor={"gray.300"}
      >
        <VStack alignItems={'start'}>
        <Heading size={"md"}>{movie?.name}</Heading>
        <Text>{movie?.location}</Text>
        </VStack>
        <Icon as={SmallCloseIcon} onClick={(e)=>{navigate('/')} } _hover={{bg:"gray.300" }} borderRadius="32px" ></Icon>
    </Flex>
  )
}

export default MovieHeader