import MovieHeader from "../components/MovieHeader";
import {  useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import movieAtom from "../Atoms/MovieAtom";
import seatAtom from "../Atoms/seatAtom";
import slotAtom from "../Atoms/slotAtom"
import { useNavigate } from "react-router-dom";
const PaymentPage = () => {
  const [isProceeding, setIsProceeding] = useState(false);
  const [dates, setDates] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [movie,setMovie]=useRecoilState(movieAtom)
  const slots=useRecoilValue(slotAtom)
  const [seats,setSeats]=useRecoilState(seatAtom);
  const NoOfSlots=slots?slots.length:0;
  const ticketsAmount=movie?.amount *seats.length
  const parkingAmount= movie.parkingAmount*NoOfSlots
  let amount=ticketsAmount+ parkingAmount
  if(parkingAmount===0){
   amount=ticketsAmount
  }
  const TotalAmount=amount+amount*0.1
  const navigate = useNavigate(); 
  const stripePromise = loadStripe(
    "pk_test_51OrLbTSGDqBhrTFAOwTholFooHVjFTA8atfVVJfPB2Y2y0UYBTXWaKagWT1INoC2sNMr3YmX3Sn8L5IGivP957IM00w72e2Txg"
  );
  const changer = (start, end) => {
    setDates({ start, end });
  };
  
  const booker = async () => {
    try {
      setIsProceeding(true);
  
      // Fetch checkout session details from your server
      const res1 = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: movie.name,
          amount: TotalAmount,
          Id: movie._id,
          dates: dates,
        }),
      });
      const session = await res1.json();
  
      // Initialize the stripe object using the stripePromise
      const stripe = await stripePromise;
  
      // Redirect to the checkout session
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });
      console.log(`result:${result}`);
      // Handle any errors during redirection
      if (result.error) {
        console.log(result.error);
        alert("An error occurred during redirection.");
      }
    } catch (error) {
      console.error("Error during reservation:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsProceeding(false);
    }
  };
  

  return (
    <>
    <MovieHeader movie={movie}/>
    <Box
      className="rounded-2xl booker border-2"
      p={4}
      mt={4}
      mb={8}
      mx="auto"
      textColor={'black'}
      width="90%"
      maxWidth="600px"
    >
      <Flex direction="column" gap={2}>
        {/* Display rates using Chakra UI components */}
        <Flex justify="space-between">
          <Text fontWeight="bold">Tickets Amount</Text>
          <Text>{movie?.amount*seats.length}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontWeight="bold">parking Amount</Text>
          <Text>{parkingAmount}</Text>
        </Flex>
        
        <Flex justify="space-between">
          <Text fontWeight="bold">10% Service fees</Text>
          <Text>{amount*0.1}</Text>
        </Flex>
      </Flex>
      <Divider my={4} />
      <Flex justify="space-between">
          <Text fontWeight="bold">Total Amount:</Text>
          <Text>{TotalAmount}</Text>
        </Flex>
      <Center>
        {/* Additional content for the center */}
      </Center>

      <Button
        mt={4}
        bgColor="#7AA2E3"
        color="white"
        fontSize="lg"
        py={2}
        _hover={{bg:'#008DDA'}}
        borderRadius="xl"
        isLoading={isProceeding}
        onClick={() => booker()}
      >
        {isProceeding ? "Processing..." : "Procceed Now"}
      </Button>
    </Box>
    </>
  );
};

export default PaymentPage;
