import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import useShowToast from '../hooks/useShowToast';

function Slot({ Number, select, disabled, setSelect }) {
  const showToast=useShowToast()
  const handleClick=(number)=>{
    const isAlreadySelected=select.includes(number);
    const exceedsLimit=!isAlreadySelected && select.length>=2
    if(exceedsLimit){
      showToast("Alert","You Can't Select More Than 2 Seats","error");
      return 
    }
    setSelect(prevSelect => {
      if (!isAlreadySelected) {
        // Add the seat to the selection
        return [...prevSelect, number];
      } else {
        // Remove the seat from the selection
        return prevSelect.filter(item => item !== number);
      }
    });
  }
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
          onClick={() => handleClick(number)}
         >{number}</Button>
        ))}
    </Flex>    
  )
}

export default Slot
