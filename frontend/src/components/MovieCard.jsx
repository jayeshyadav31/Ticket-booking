import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react'

function MovieCard({ movie, setMovie, navigate }) {
  return (
    <Card
    margin="10px"
    textColor="black"
    bg="white"
    borderWidth="3px"
    borderColor="gray.700"
    direction={{ base: 'column', sm: 'row' }}
    overflow="hidden"
    variant="outline"
    shadow="revert"
    height={"300px"}
    width={{ base: '320px', md: 'calc(50% - 20px)' }} // Adjusted width for responsive layout
    marginBottom={{ base: '20px', md: '10px' }} // Adjusted margin for spacing
          >
            <Image
              objectFit='cover'
              borderRadius={"4px"}
              maxW={{ base: '100%', sm: '200px' }}
              src={movie.image}
              alt={movie.name}
            />
          
            <Stack>
              <CardBody>
                <Heading size='md'>{movie.name}</Heading>
          
                <Text py='1' >
                  {movie.location}
                </Text>
                <Text py='1' >
                  DATE:{movie.date}
                </Text>
                <Text py='1'>
                  Time: {movie.time}
                </Text>
              </CardBody>
          
              <CardFooter padding={"10px"}>
                <Button variant='solid' colorScheme='blue' onClick={(e) =>{
                  e.preventDefault()
                  localStorage.setItem("movie", JSON.stringify(movie));
                  setMovie(movie)
                  navigate(`/seatBooking/${movie._id}`)
                }}>
                  Buy Ticket
                </Button>
              </CardFooter>
            </Stack>
          </Card>
  )
}

export default MovieCard