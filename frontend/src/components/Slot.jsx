import { Button, Flex } from '@chakra-ui/react'
import React from 'react'

function Slot({ Number, select, disabled, setSelect }) {
  return (
    <Flex marginBottom={"2px"}>
      {Number.map((number) => (
        <Button
          key={number}
          marginLeft={"6px"}
          width='50px'
          height='70px'
          color='white'
          borderRadius={"4px"}
          isDisabled={disabled && disabled.includes(number)} // Check if disabled is defined before accessing its methods
          backgroundColor={
            disabled && disabled.includes(number)
              ? 'gray.500' // Use a different color scheme for disabled slots
              : select.includes(number)
              ? 'red'
              : 'green'
          }
          _hover={(disabled && disabled.includes(number)?{bg:"gray"}:{bg:"green.500"})}
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

export default Slot
