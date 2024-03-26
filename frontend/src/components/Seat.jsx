import { Button, Flex } from '@chakra-ui/react'
import React from 'react'

function Seat({Number,select,disabled,setSelect}) {
  return (
    <Flex marginBottom={"10px"}>
        {Number.map((number) => (
          <Button
            key={number}
            marginTop={"6px"}
            marginLeft={"4px"}
            width= '20px'
            height= '30px'
            color='white'
            isDisabled={disabled?.includes(number)}
           
            backgroundColor={
                (disabled && disabled.includes(number))
                  ? 'gray' // or any other color for disabled seats
                  : select.includes(number)
                  ? 'red'
                  : 'green'
              }
              _hover={
                disabled && disabled.includes(number)
                  ? { backgroundColor: 'gray' }
                  : { backgroundColor: 'green.500' }
              }
            onClick={() => {
                setSelect((prevSelect) => {
                    if (!prevSelect.includes(number)) {
                        // Add the number to the selection if not already present
                        return [...prevSelect, number];
                    } else {
                        // Remove the number from selection if already present
                        return prevSelect.filter((item) => item !== number);
                    }
                });
              }}
             >{number}</Button>
            ))}
            </Flex>    
  )
}

export default Seat