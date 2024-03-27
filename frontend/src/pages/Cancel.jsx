import React from 'react'
import { Box,Button,Text, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Cancel = () => {
  const navigate=useNavigate()
  return (
    <VStack justifyContent={'center'} textColor={'black'}>
        <Text>Please Retry Again...</Text>
        <Button onClick={()=>{navigate('/')}} backgroundColor={"blue.400"} textColor={'black'}>Click!! To Go On HomePage</Button>
    </VStack>
  
  )
}

export default Cancel