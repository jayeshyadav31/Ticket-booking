import { Box, Button, CardBody, CardFooter, Flex, HStack, Heading, Stack, VStack,Text, Card, Divider, ButtonGroup,Image } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import Slot from '../components/Slot'
import slotAtom from '../Atoms/slotAtom'
import { useRecoilState } from 'recoil'
import useShowToast from '../hooks/useShowToast'
import { useNavigate, useParams } from 'react-router-dom'
import seatAtom from '../Atoms/seatAtom'
import MovieHeader from '../components/MovieHeader'

function SlotBookingPage() {
    const [select,setSelect]=useState([])
    const showToast=useShowToast()
    const [disabled,setDisabled]=useState()
    const Number1=[1,2,3,4,5]
    const Number2=[6,7,8,9,10]
    const Number3=[11,12,13,14,15]
    const Number4=[16,17,18,19,20]
    const Number5=[21,22,23,24,25]
    const Number6=[26,27,28,29,30]
    const Number7=[31,32,33,34,35]
    const Number8=[36,37,38,39,40]
    const Number9=[41,42,43,44,45]
    const Number10=[46,47,48,49,50]
    const Number11=[51,52,53,54,55]
    const Number12=[56,57,58,59,60]
    const [movie,setMovie]=useState(null)
    const {id}=useParams()
    const navigate=useNavigate()
    const [seats,setSeats]=useRecoilState(seatAtom)
    const [slots,setSlots]=useRecoilState(slotAtom)
    useEffect(()=>{
        // console.log(select?.length);
          const getMovie=async()=>{
              try {
                  const res=await fetch(`/api/movie/${id}`)
                  const data=await res.json()
                //   console.log(data);
                  setMovie(data);
                 setDisabled(data.bookedSlots)
              } catch (error) {
                  showToast("Error",error.message,"error");
              }
          }
        getMovie()
      },[setSelect,showToast])
      const handleProceed = () => {
        if (select.length > 10) {
          showToast('Warning', "You can't book more than 10 slots", 'warning');
        } else {
          console.log('Proceeding...');
          localStorage.setItem("slots", JSON.stringify(select));
          setSlots(select);
        //   console.log(movie.parkingAmount);
          console.log(`slots:${slots}`)
          console.log(`seats${seats}`)
          navigate(`/payment/${movie._id}`)
        }
      };
    //    useEffect(() => {
    //    console.log(select);  // This will reflect the updated state
    //  }, [select]);
  return (
    <>
    <MovieHeader movie={movie}/>
    <Box backgroundColor={"white.800"} textColor={'black'} width={"full"} height={"800px"}>
        <Heading marginLeft={"330px"} fontSize={"2xl"} alignContent={"center"} marginTop={"10px"}> Select Your Parking Slot</Heading>
        <HStack width={"600px"} height={"540px"} marginLeft={"60px"} marginTop={"50px"}>
                <Box>
                <VStack backgroundColor={"white"} width={"30px"} textColor={"black"} fontWeight={"bold"} borderRadius={"4px"} >
                <Text>E</Text>
                <Text>N</Text>
                <Text>T</Text>
                <Text>R</Text>
                <Text>A</Text>
                <Text>N</Text>
                <Text>C</Text>
                <Text>E</Text>
                </VStack>
                </Box>
            <VStack borderColor={"white"} >
                <Flex>
                    <Slot select={select} setSelect={setSelect} disabled={disabled} Number={Number1} />
                    <Box width={"50px"}></Box>
                    <Slot select={select} setSelect={setSelect} disabled={disabled} Number={Number2} />
                </Flex >
                <Box height={"2px"} width={"600px"} backgroundColor={"white"} ></Box>
                <Flex marginBottom={"60px"}>
                    <Slot select={select} setSelect={setSelect} disabled={disabled} Number={Number3} />
                    <Box width={"50px"}></Box>
                    <Slot select={select} setSelect={setSelect} disabled={disabled} Number={Number4} />
                </Flex>
                <Flex>
                    <Slot select={select} setSelect={setSelect} disabled={disabled} Number={Number5} />
                    <Box width={"50px"}></Box>
                    <Slot select={select} setSelect={setSelect} disabled={disabled} Number={Number6} />
                </Flex>
                <Box height={"2px"} width={"600px"} backgroundColor={"white"} ></Box>
                <Flex marginBottom={"60px"}>
                    <Slot select={select} setSelect={setSelect} disabled={disabled} Number={Number7} />
                    <Box width={"50px"}></Box>
                    <Slot select={select} setSelect={setSelect} disabled={disabled} Number={Number8} /> 
                </Flex>
                <Flex>
                    <Slot select={select} setSelect={setSelect} disabled={disabled} Number={Number9} />
                    <Box width={"30px"}></Box>
                    <Slot select={select} setSelect={setSelect} disabled={disabled} Number={Number10} />
                </Flex>
                <Box height={"2px"} width={"600px"} backgroundColor={"white"} ></Box>
                <Flex>
                    <Slot select={select} setSelect={setSelect} disabled={disabled} Number={Number11} />
                    <Box width={"30px"}></Box>
                    <Slot select={select} setSelect={setSelect} disabled={disabled} Number={Number12} />
                </Flex>
            </VStack>
            <Box>
            <VStack backgroundColor={"white"} width={"30px"}  textColor={"black"} fontWeight={"bold"} borderRadius={"4px"} margin={"10px"}>
                <Text>E</Text>
                <Text>X</Text>
                <Text>I</Text>
                <Text>T</Text>
                </VStack>
                </Box>
                <VStack marginLeft={"100px"} >
                <Card maxW='sm' minWidth={"300px"} bg={'white'} borderRadius={"10px"}
                 borderWidth={"2px"} borderColor={"gray.700"} textColor={"black"} >
                <Image
                 src='https://res.cloudinary.com/dyylkrsak/image/upload/v1709660152/photo-1506521781263-d8422e82f27a_pc6l9z.avif'
                 alt='parking'
                 overflow='hidden'
                 borderRadius={'8px'}
               />
  <CardBody>
    <Stack mt='6' spacing='3' >
      <Heading size='md'>Parking Info</Heading>
      <Text py='2'>
        Number of slots : {select.length}
      </Text>
      <Flex >
      <Text>Slots No : </Text>
      {[...select].sort().map((slot, index) => (
  <Text key={index}>{slot},</Text>
))}
      </Flex>
      <Text color='blue.600' fontSize='2xl'>
       Amount: {select.length*movie?.parkingAmount}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue' onClick={()=>{navigate(`/payment/${movie._id}`)}}>
        Skip
      </Button>
      <Button variant='solid' colorScheme='blue' onClick={handleProceed}>
        Proceed....
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
</VStack>
</HStack>
    </Box>
    </>
  )
}

export default SlotBookingPage