import { Box, Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text, VStack,Flex } from '@chakra-ui/react'
import React, {useState, useEffect } from 'react'
import userShowToast from '../hooks/useShowToast'
import { useRecoilState, useSetRecoilState } from 'recoil'
import movieAtom from '../Atoms/MovieAtom'
import { useNavigate } from 'react-router-dom'
import Headers from '../components/Headers'

function HomePage() {
    const [movies,setMovies]=useState([])
    const setMovie=useSetRecoilState(movieAtom)
    const showToast=userShowToast();
    const navigate=useNavigate()
    localStorage.removeItem("movie")
    localStorage.removeItem("seats")
    localStorage.removeItem("slots")
    useEffect(()=>{
        const getMoives=async()=>{
            try {
                const res=await fetch('/api/movie/getMovies')
                const data=await res.json()
                //console.log(data);
                setMovies(data);
                }
             catch (error) {
                console.log(error.message);
                showToast("Error",error.message,"error")
            }
        }
            getMoives();
        },[setMovies])
  return (
    <>
     <Headers />
    <VStack>
    {
        movies?.map((movie)=>(
            <Flex padding={"10px"} justifyContent={"center"} width="620px" key={movie._id} >
            <VStack >
            <Card
            marginTop={"10px"}
            textColor={"black"}
            bg={"white"}
            borderWidth={"3px"}
            borderColor={"gray.700"}
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            shadow={'revert'}
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
          
              <CardFooter>
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
          </VStack>
          </Flex>
        ))
    }
    </VStack>
   </>
  )
}

export default HomePage