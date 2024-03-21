import React, { useEffect,useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import userAtom from '../Atoms/userAtom';
import movieAtom from '../Atoms/MovieAtom';
import seatAtom from '../Atoms/seatAtom';
import slotAtom from '../Atoms/slotAtom';
import { Box ,Button,Flex,Image, Spacer, Text, VStack} from '@chakra-ui/react';

const Success = () => {
  const [paymentInfo,setPaymentInfo]=useState(null)
  const user=useRecoilState(userAtom);
  const navigate=useNavigate()
  //  console.log(user);
  const movie=useRecoilState(movieAtom)
  //  console.log(movie);
  const seats=useRecoilState(seatAtom);
  // console.log(seats[0]);
  const slots=useRecoilState(slotAtom)
  //console.log(slots);
  let total=movie[0].amount*seats[0].length + movie[0].parkingAmount*slots[0]?.length ;
  total=total+total*0.1
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkoutId = searchParams.get('checkout_id');
  const hallId = searchParams.get("hall_id");
  const start=searchParams.get('start');
  const end=searchParams.get('end')
  useEffect(()=>{
    //console.log(checkoutId);
    try {
      const confirmer=async()=>{
        const response = await fetch('/api/stripe/confirmation', {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id: checkoutId,
          }),
        });
        
        const result1=await response.json();
        console.log(result1);
        setPaymentInfo(result1)
        if(result1.status=="complete"){
          const dates={
            start,
            end
          }
        }
        console.log("user",user[0]._id);
        const response2=await fetch('/api/ticket/create',{
          method:"POST",
          headers:{
            "content-type":"application/json",
          },
          body:JSON.stringify({
            name:movie[0].name,
            ticketBy:user[0]._id,
            movieId:movie[0]._id,
            seats:seats[0],
            parkingSlots:slots[0],
            location:movie[0].location,
            image:movie[0].image,
            totalAmount:total,
            date:movie[0].date,
            time:movie[0].time
          })
        })
        const result2=await response2.json();
        // console.log(result2);
      const response3=await fetch(`/api/movie/update/${movie[0]._id}`,{
        method:"PUT",
        headers:{
          "content-type":"application/json",
        },
        body:JSON.stringify({
          bookedSeats:seats[0],
          bookedSlots:slots[0]
        })
      })
      const res3=await response3.json();
      console.log(res3);
    }
      confirmer()
    } catch (error) {
      console.log(`Error in the success page : ${error}`)
    }
  },[hallId,setPaymentInfo])

  const handleClose = () => {
    // Your close logic here, for example:
    navigate('/')
  };
  const handlePrint = () => {
    window.print();
  };
  return (
    <Box  backgroundColor={"#F8FAE5"} width={"540px"} height={"440px"} borderRadius={"6px"} margin={"auto"} >
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
  )
}

export default Success