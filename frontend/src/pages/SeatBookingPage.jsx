import { HStack,Flex,Box, Text, Stack, VStack, Button,Heading,Card,CardBody, CardFooter, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import useShowToast from '../hooks/useShowToast';
import seatAtom from '../Atoms/seatAtom';
import Seat from '../components/Seat';

function SeatBookingPage() {
  const Number1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const Number2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const Number3 = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  const Number4 = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
  const Number5 = [41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
  const Number6 = [51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
  const Number7 = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70];
  const Number8 = [71, 72, 73, 74, 75, 76, 77, 78, 79, 80];

  const showToast = useShowToast();
  const [select, setSelect] = useState([]);
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const [seats, setSeats] = useRecoilState(seatAtom);
  const [disabled, setDisabled] = useState([]);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await fetch(`/api/movie/${id}`);
        const data = await res.json();
        setMovie(data);
        setDisabled(data.bookedSeats);
      } catch (error) {
        showToast('Error', error.message, 'error');
      }
    };
    getMovie();
  }, [id, showToast]);

  useEffect(() => {
    if (select.length > 10) {
      showToast("Message", "You can't book more than 10 tickets", "message");
    }
  }, [select.length, showToast]);

  const handleProceed = async () => {
    if (select.length > 10) {
      showToast('Warning', "You can't book more than 10 tickets", 'warning');
    } else {
      if (select.length === 0) {
        showToast('message', 'Select At Least One Seat', 'warning');
        return 
      }
      localStorage.setItem('seats', JSON.stringify(select));
      setSeats(select);
      navigate(`/slotBooking/${movie._id}`);
    }
  };


  return (
    <Stack backgroundColor={'gray.800'} height={'540px'}>
        <Flex justifyItems={'flex-start'}>
            
            <VStack width={"540px"}>
            <Box height={"30px"} marginTop={"30px"} borderRadius={"8px"} width={"200px"}backgroundColor={"white"}
            justifyContent={"center"} marginBottom={"30px"} >
                <Text align={"center"} color={'black'} fontWeight={"bold"} >SCREEN</Text>
            </Box>
                <Seat Number={Number1} select={select} setSelect={setSelect} disabled={disabled}></Seat>
                <Seat Number={Number2} select={select} setSelect={setSelect} disabled={disabled}></Seat>
                <Seat Number={Number3} select={select} setSelect={setSelect} disabled={disabled}></Seat>
                <Seat Number={Number4} select={select} setSelect={setSelect} disabled={disabled}></Seat>
                <Seat Number={Number5} select={select} setSelect={setSelect} disabled={disabled}></Seat>
                <Seat Number={Number6} select={select} setSelect={setSelect} disabled={disabled}></Seat>
                <Seat Number={Number7} select={select} setSelect={setSelect} disabled={disabled}></Seat>
                <Seat Number={Number8} select={select} setSelect={setSelect} disabled={disabled}></Seat>
                <Flex>
            <Flex alignItems={"center"} marginRight={"20px"}>
                    <Box borderRadius={"20px"} backgroundColor={"gray"}  width={'15px'} height={"15px"} marginRight={"10px"}/>
                    <Text color={"dark"}> Booked Seats</Text>
                </Flex>
                <Flex alignItems={"center"} marginRight={"15px"}>
                    <Box borderRadius={"20px"} backgroundColor={"red"}  width={'15px'} height={"15px"} marginRight={"10px"}/>
                    <Text color={"dark"}>Your Selected Seats</Text>
                </Flex>
                <Flex alignItems={"center"}>
                    <Box borderRadius={"20px"} backgroundColor={"green"}  width={'15px'} height={"15px"} marginRight={"10px"}/>
                    <Text color={"dark"}> Available Seats</Text>
                </Flex>
                </Flex>
            </VStack>
            <VStack width={"540px"}>
            <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  width={"350px"}
  marginTop={"20px"}
>

  <Stack>
  <Image
    objectFit='cover'
    width={"350px"}
    borderRadius={"4px"}
    // maxW={{ base: '100%', sm: '200px' }}
    src='https://res.cloudinary.com/dyylkrsak/image/upload/v1709663024/download_4_g6pyyq.jpg'
    alt='Caffe Latte'
  />
    <CardBody>
      <Heading size='md'>Ticket Info:</Heading>
      <Text py='2'>
        Number of seats : {select.length}
      </Text>
      <Flex >
      <Text>Seat Number : </Text>
      {select.map((seat,index)=>(<Text key={index}>{seat},</Text>))}
      </Flex>
      <Text marginTop={"8px"}>Amount: {movie?.amount*select.length}</Text>
    </CardBody>

    <CardFooter>
      <Button variant='solid' colorScheme='blue' onClick={handleProceed}>
        Proceed
      </Button>
    </CardFooter>
  </Stack>
</Card>
            </VStack>
        </Flex>
    </Stack>
  )
}

export default SeatBookingPage