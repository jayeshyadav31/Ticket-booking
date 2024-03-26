import React, { useState, useEffect } from 'react';
import UserHeader from '../components/UserHeader';
import { Flex, Spinner, Heading, Box, Card, Image, Stack, CardBody, Text, CardFooter, Button, StepSeparator } from '@chakra-ui/react';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useNavigate, useParams } from 'react-router-dom';
import Ticket from '../components/Ticket';
import Headers from '../components/Headers';

function Userpage() {
  const { loading, user } = useGetUserProfile();
  const { username } = useParams();
  const [tickets, setTickets] = useState(null);
const currentDate = new Date();
const navigate=useNavigate();
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        if (user) {
          const userId = user._id; // Access the user ID directly from user object
          console.log(userId);
          const res = await fetch(`/api/ticket/user/${userId}`);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          const sortedTickets = data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setTickets(sortedTickets);
        }
      } catch (error) {
        console.log(`Error fetching tickets: ${error}`);
      }
      console.log(tickets);;
    };

    fetchTickets();
  }, [user]);

  if (!user && loading) {
    return (
      <Flex justify={"center"}><Spinner size={"md"} /></Flex>
    );
  }
  if (!user && !loading) {
    return <h2>User not Found</h2>;
  }
  return (
    <>
    <Headers/>
      <UserHeader user={user}/>
      <Box backgroundColor={"white"} borderRadius={"6px"} width="540px" margin={"auto"}>
        <Heading marginTop={"40px"} size={"md"} color={"black"} margin={"30px"}>Past Orders :</Heading>

        {tickets && tickets.map((ticket) => {
          const ticketDate = new Date(ticket.date);
          const isActive = currentDate <= ticketDate;

          return (
            <Card key={ticket._id}
              direction={{ base: 'column', sm: 'row' }}
              overflow='hidden'
              variant='outline'
              margin={"20px"} 
              backgroundColor={'white'}
              textColor={"black"}
              marginBottom={"30px"}
              borderRadius={"2px"}
              borderColor={"gray.400"}
            >
              <Image
                objectFit='cover'
                maxW={{ base: '200%', sm: '200px' }}
                src={ticket.image}
                alt={ticket.name}
              />
              <Stack>
                <CardBody>
                  <Heading size='md' textColor={'black'}>{ticket?.name}</Heading>
                  <Text py='2'>Date: {ticket.date}  </Text>
                  <Text>Time: {ticket.time}</Text>
                  <Text>No of tickets: {ticket.seats.length}</Text>
                  <Flex alignItems="center">
                    <Text>Active: </Text>
                    {isActive ? (
                      <Box w="10px" h="10px" borderRadius="full" bg="green.500" ml="2"/>
                    ) : (
                      <Box w="10px" h="10px" borderRadius="full" bg="red.500" ml="2" />
                    )}
                  </Flex>
                </CardBody>
                <CardFooter>
                  <Button variant='solid' colorScheme='blue' onClick={()=>{navigate(`/ticket/${ticket._id}`)}}>
                    See details
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
          );
        })}
      </Box>
    </>
  );
}

export default Userpage;
