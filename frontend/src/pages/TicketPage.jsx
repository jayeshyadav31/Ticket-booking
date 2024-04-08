import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Divider, Flex, HStack, Heading, Spacer, Text, VStack } from '@chakra-ui/react';
import useShowToast from '../hooks/useShowToast';
import Barcode from "react-barcode";
import Headers from '../components/Headers';
function TicketPage() {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [movie, setMovie] = useState(null);
    const showToast = useShowToast();

    useEffect(() => {
        try {
            const getTicket = async () => {
                const data = await fetch(`/api/ticket/${id}`);
                const res = await data.json();
                setTicket(res);
            };
            getTicket();
        } catch (error) {
            console.log("error", error);
            showToast("error", error, "error");
        }
    }, [setTicket, showToast]);

    const formatDateTime = (ticket) => {
        const updatedAtString = ticket?.updatedAt;
        const updatedAtDate = new Date(Date.parse(updatedAtString));
        return updatedAtDate.toLocaleString();
    };
        const printTicket = () => {
          window.print(); // This will trigger the browser's print dialog
        }
    return (
        <>
        <Headers/>
        <Box textAlign="center" margin="auto" justifyContent={'space-between'}>
            <Flex justifyContent={"space-between"}>
            <Text>Thank You for Using Event Ease</Text>
           <Button colorScheme="teal" onClick={printTicket} alignItems={"center"}>
              Print Ticket
            </Button>
            </Flex>
            <Box backgroundColor="#FFEBD8" textColor="black" borderRadius="6px" margin="auto" marginTop="30px" 
            borderTop="dotted" width={'-moz-fit-content'}>
                <Text>Dear Customer, your Ticket has been confirmed!</Text>
                <Flex>
                    <VStack align="start" spacing={4}  marginLeft={4} marginRight={4}>
                        <Flex backgroundColor="#F6F193"  >
                            <Heading  size={"md"}  padding="3px" borderRadius="6px">EVENT EASE</Heading>
                        </Flex>
                        <Heading size={"md"} alignItems={"start"} > {ticket?.name}</Heading>
                        <Text wordBreak={"break-word"}>{ticket?.location}</Text>
                        <Text>Ticket ID: {ticket?._id}</Text>
                        <Text>Show Time: {ticket?.time}</Text>
                        <Text>Date Of Show: {ticket?.date}</Text>
                        <Flex>
                            <Text>Seat Numbers:</Text>
                            {ticket && ticket.seats.map((seat, index) => (
                                <React.Fragment key={index}>
                                    <Text>{seat}{index !== ticket.seats.length - 1 && ','}</Text>
                                </React.Fragment>
                            ))}
                        </Flex>
                        <Flex>
                            <Text>Parking Slot Numbers:</Text>
                            {ticket && ticket.parkingSlots?.map((slot, index) => (
                                <React.Fragment key={index}>
                                    <Text>{slot}{index !== ticket.parkingSlots.length - 1 && ','}</Text>
                                </React.Fragment>
                            ))}
                        </Flex>
                        <Text>Booking Time: {ticket ? formatDateTime(ticket) : ''}</Text>
                    </VStack>
                    <VStack width={"100px"}>
                    </VStack >
                    <VStack  align="start" spacing={4} marginLeft={4} marginRight={4} width={"340px"} marginTop={"160px"}>
                        <Text>Amount:  {Math.ceil(ticket?.totalAmount/1.1)}</Text>
                        <Text>Conveneince Fees:   {Math.ceil(ticket?.totalAmount-ticket?.totalAmount/1.1)}</Text>
                        <Box backgroundColor={"Black"} height={"3px"} width={"full"}></Box>
                        <Text>Total Amount  :{Math.ceil(ticket?.totalAmount)}</Text>
                        <Barcode value={ticket?._id} width={1} height={50}/>
                    </VStack>                
                </Flex>
                <Box marginTop={"20px"}>
                <Text>Thank you for choosing Event Ease. Enjoy the show</Text>
                <Text>Best Regards</Text>
                <Text>EVENT EASE</Text>
            </Box>
            </Box>
            
        </Box>
        </>
    );
}

export default TicketPage;
