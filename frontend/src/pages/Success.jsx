import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Headers from '../components/Headers';
import userAtom from '../Atoms/userAtom';
import movieAtom from '../Atoms/MovieAtom';
import seatAtom from '../Atoms/seatAtom';
import slotAtom from '../Atoms/slotAtom';
import { Box, Button, Flex, Image, Spacer, Text, VStack } from '@chakra-ui/react';

const Success = () => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const user = useRecoilState(userAtom)[0]; 
  const navigate = useNavigate();
  const movie = useRecoilValue(movieAtom);
  const seats = useRecoilValue(seatAtom); 
  const slots = useRecoilValue(slotAtom); 

  let total = (movie?.amount || 0) * seats.length + (slots ?(movie?.parkingAmount || 0) * slots.length:0);
  total = total + total * 0.1;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkoutId = searchParams.get('checkout_id');
  const hallId = searchParams.get('hall_id');
  const start = searchParams.get('start');
  const end = searchParams.get('end');

  // Debounce or throttle ticket creation to prevent duplicates (consider using a library like lodash)
  const debouncedCreateTicket = async () => {
    try {
      const confirmed = await fetch('/api/stripe/confirmation', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: checkoutId }),
      }).then(response => response.json());

      if (confirmed.status !== 'complete') {
        console.warn('Payment not complete, skipping ticket creation');
        return;
      }

      const dates = { start, end };

      const response2 = await fetch('/api/ticket/create', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: movie.name,
          ticketBy: user.id,
          movieId: movie._id,
          seats,
          parkingSlots: slots,
          location: movie.location,
          image: movie.image,
          totalAmount: total,
          date: movie.date,
          time: movie.time,
        }),
      }).then(response => response.json());

      console.log('Ticket creation response:', response2);

      const response3 = await fetch(`/api/movie/update/${movie._id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ bookedSeats: seats, bookedSlots: slots }),
      }).then(response => response.json());

      console.log('Movie update response:', response3);
    } catch (error) {
      console.error('Error in the success page:', error);
    }
  };

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      const response = await fetch('/api/stripe/confirmation', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: checkoutId }),
      }).then(response => response.json());

      setPaymentInfo(response);
    };

    fetchPaymentInfo();

    // Debounced ticket creation (uncomment and adjust as needed)
    debouncedCreateTicket();
  }, [checkoutId]); // Only run when checkoutId changes

  const handleClose = () => {
    navigate('/');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
    <Headers />
    <Box  backgroundColor={"#F8FAE5"} width={"540px"} height={"440px"} borderRadius={"6px"} margin={"auto"} marginTop={"40px"} >
      <Flex justifyContent={"center"}>
        <VStack>
      <Image src="https://res.cloudinary.com/dyylkrsak/image/upload/v1710833145/check_mark_goq73v.png" 
      width={"100px"} height={"100px"} />
      <Text color="green" fontSize={"xl"} textShadow={"initial"} >PAYMENT SUCCESSFULL</Text>
      </VStack>
      </Flex>
      <Spacer/>
      <Flex textColor={"black"} fontSize={"large"} 
      justifyContent={"space-between"} marginLeft={"30px"} 
      marginRight={"60px"} marginTop={"30px"}>
        <Text>Payment Type :</Text>
        <Text>{paymentInfo ? paymentInfo.payment_method_types: 'Loading...'}</Text>
      </Flex>
      <Flex textColor={"black"} fontSize={"large"} 
      justifyContent={"space-between"} marginLeft={"30px"} 
      marginRight={"60px"} marginTop={"10px"} >
        <Text>Payment Id :</Text>
        <Text> {paymentInfo ? paymentInfo.payment_intent: 'Loading...'}</Text>
      </Flex>
      <Flex textColor={"black"} fontSize={"large"} 
      justifyContent={"space-between"} marginLeft={"30px"} 
      marginRight={"60px"} marginTop={"10px"}>
        <Text>Name :</Text>
        <Text>{paymentInfo ? paymentInfo.customer_details.name: 'Loading...'}</Text>
      </Flex>
      <Flex textColor={"black"} fontSize={"large"} 
      justifyContent={"space-between"} marginLeft={"30px"} 
      marginRight={"60px"} marginTop={"10px"}>
        <Text>Email :</Text>
        <Text>{paymentInfo ? paymentInfo.customer_details.email: 'Loading...'}</Text>
      </Flex>
      <Flex textColor={"black"} fontSize={"large"} 
      justifyContent={"space-between"} marginLeft={"30px"} 
      marginRight={"60px"} marginTop={"10px"} fontWeight={"bold"}>
        <Text>Amount Paid :</Text>
        <Text>Rs {paymentInfo ? paymentInfo.amount_total/100: 'Loading...'}</Text>
      </Flex>
      <Flex marginTop={"20px"}>
        <Button color={"Black"} backgroundColor={"#008DDA"} 
        _hover={{ backgroundColor: '#3468C0' }} marginLeft={"170px"}
         onClick={handlePrint}>Print</Button>
        <Button color={"Black"} 
        backgroundColor={"#008DDA"} _hover={{ backgroundColor: '#3468C0' }} 
        marginLeft={"30px"} onClick={handleClose} >Close</Button>
      </Flex>
    </Box>
    </>
  )
}

export default Success