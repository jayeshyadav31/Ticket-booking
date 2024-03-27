import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import useShowToast from '../hooks/useShowToast';

function Seat({Number,select,disabled,setSelect}) {
  const showToast=useShowToast();
  const handleClick = (number) => {
    // Check if the seat is already selected
    const isAlreadySelected = select.includes(number);

    // Check if adding the seat exceeds the limit of 4 seats
    const exceedsLimit = !isAlreadySelected && select.length >= 4;

    if (exceedsLimit) {
      // If adding the seat exceeds the limit, do not update the selection
      showToast("message","You Can't Select More Than 4 Seats","error");
      return;
    }

    // Toggle the selection of the seat
    setSelect(prevSelect => {
      if (!isAlreadySelected) {
        // Add the seat to the selection
        return [...prevSelect, number];
      } else {
        // Remove the seat from the selection
        return prevSelect.filter(item => item !== number);
      }
    });
  };

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
            onClick={() => handleClick(number)}
             >{number}</Button>
            ))}
            </Flex>    
  )
}

export default Seat