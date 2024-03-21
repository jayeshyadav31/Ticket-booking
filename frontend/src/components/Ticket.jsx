import React from 'react'
import { Box, Flex, Text, Heading, Grid } from '@chakra-ui/react'

const Ticket = ({ ticket }) => {
  return (
    <Box bg="white" p={4} rounded="lg" borderWidth={2} borderColor="gray.500" color={"black"} borderRadius={"6px"} padding={"4px"}>
      <Flex justifyContent="space-between" mb={2}>
        <Heading size="md">Event Name</Heading>
        <Text>GATE: SANT</Text>
      </Flex>
      <Grid templateColumns="repeat(2, 1fr)" gap={4} alignItems="center"> {/* Add alignItems="center" */}
        <Box>
          <Text>Date: {ticket.date}</Text>
          <Text>Time: {ticket.time}</Text>
        </Box>
        <Box>
          <Text>Seat Numbers:</Text>
          {ticket.seats.map((seat, index) => (
            <li key={index}>{seat}</li>
          ))}
        </Box>
        <Box>
          <Text>Parking Slots:</Text>
          {ticket.parkingSlots.map((slot, index) => (
            <li key={index}>{slot}</li>
          ))}
        </Box>
      </Grid>
    </Box>
  )
}

export default Ticket
