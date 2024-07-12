import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import {
  Box,
  Heading,
  Text,
  Grid,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import Headers from '../components/Headers'
import { FaPhoneAlt, FaUserAlt, FaLocationArrow } from "react-icons/fa";
import { MdEmail, MdSend } from "react-icons/md";
import { FaLinkedin, FaTwitterSquare, FaInstagramSquare } from "react-icons/fa";
// import { saveAs } from 'file-saver';
import useShowToast from '../hooks/useShowToast';

function Contact() {
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const showToast=useShowToast()
  const formRef = useRef(null); // Create a reference to the form element
  const isMdOrLarger = useBreakpointValue({ base: false, md: true });

  const handleSend = (e) => {
    e.preventDefault();
    console.log(data);
    const templateParams = {
      from_name: data.name,
      to_name: "jayesh",
      from_email: data.email,
      subject: data.subject,
      message: data.message,
    };
    const form = document.createElement("form");
    form.style.display = "none";

    for (const key in templateParams) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = templateParams[key];
      form.appendChild(input);
    }

    document.body.appendChild(form);
    emailjs
      .sendForm('service_tkdktbl', 'template_s4akw3l', form, 'CXS2Wzk0pkHsaU4XR')
      .then((response) => {
         setData({name:"",email:"",subject:"",message:"" }); // Reset form data to empty strings
        console.log('Email sent successfully:', response);
        showToast("Success","Email Sent Succesfully","success")
      })
      .catch((error) => {
        showToast("error","Unable To Send Email","error")
        console.error('Email failed to send:', error);
        return ;
      });
      
  };

  return (
    <>
    <Headers />
    <Box className="parent py-24 mt-4" backgroundColor={"white"} textColor={"black"} borderRadius={"6px"}>
      <Heading size="md" textAlign="center" paddingTop={"5px"}>
        Feel Free To Contact Us
      </Heading>
      <Grid templateColumns={isMdOrLarger ? "repeat(2, 1fr)" : "1fr"} marginTop={"30px"} marginLeft={"30px"}>
        {/* Contact Form */}
        <Box>
          <Heading size="md" mb={4} color={"gray.500"}>
            Get In <Text as="span" color={"black"}>Touch</Text>
          </Heading>
          <Box>
            <Flex>
              <FormControl isRequired mb={4} borderColor={"darkgray"}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Name"
                  borderColor={"black"}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  _hover={{borderColor:'gray.900'}}
                  value={data.name}
                />
              </FormControl>
              <FormControl isRequired mb={4} marginLeft={"10px"} borderColor={"darkgray"}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  type="email"
                  borderColor={"black"}
                  name="email"
                  placeholder="Email"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  value={data.email}
                  _hover={{borderColor:'gray.900'}}
                />
              </FormControl>
            </Flex>
            <FormControl isRequired mb={4} borderColor={"darkgray"}>
              <FormLabel htmlFor="subject">Subject</FormLabel>
              <Input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                borderColor={"black"}
                _hover={{borderColor:'gray.900'}}
                onChange={(e) => setData({ ...data, subject: e.target.value })}
                value={data.subject}
              />
            </FormControl>
            <FormControl isRequired mb={4} borderColor={"darkgray"}>
              <FormLabel htmlFor="message">Message</FormLabel>
              <Textarea
                id="message"
                name="message"
                placeholder="Message"
                borderColor={"black"}
                rows={5}
                _hover={{borderColor:'gray.900'}}
                onChange={(e) => setData({ ...data, message: e.target.value })}
                value={data.message}
              />
            </FormControl>
            <Button type="submit" rightIcon={<MdSend />} marginBottom={"40px"} 
            _hover={{bg:'#41C9E2'}} onClick={handleSend} backgroundColor={'#008DDA'}>
              Send Message
            </Button>
          </Box>

        </Box>

        {/* Contact Info */}
        <Box mt={isMdOrLarger ? 0 : 8} marginLeft={"30px"} marginTop={"30px"}>
          <Heading size="md" mb={4}>
            Contact Info
          </Heading>
          <Flex direction="column" gap={4}>
            <Flex alignItems="center">
              <IconButton icon={<FaUserAlt />} color="primary.500" />
              <Text fontWeight="medium" marginLeft={"10px"} >Customer Care</Text>
            </Flex>
            <Flex alignItems="center">
              <IconButton icon={<FaPhoneAlt />} color="primary.500" />
              <Text fontWeight="medium" marginLeft={"10px"}>70561564</Text>
            </Flex>
            <Flex alignItems="center">
              <IconButton icon={<MdEmail />} color="primary.500" />
              <Text fontWeight="medium" marginLeft={"10px"}>yadavjayesh8074@gmail.com</Text>
            </Flex>
            <Flex alignItems="center">
              <IconButton icon={<FaLocationArrow />} color="primary.500" />
              <Text fontWeight="medium" marginLeft={"10px"}>Sonipat</Text>
            </Flex>
          </Flex>
          <Flex alignItems="center" mt={8}>
            <Text as="h3" fontSize="xl">
              Social
            </Text>
            <Box bg="primary.500" h="2px" w="10px" color={"gray.800"} />
            <IconButton icon={<FaLinkedin />}  color="primary.500" href="/" target="_blank" />
            <IconButton icon={<FaTwitterSquare />} ml={2} color="primary.500" href="/" target="_blank" />
            <IconButton icon={<FaInstagramSquare />} ml={2} color="primary.500" href="/" target="_blank" />
          </Flex>
        </Box>
      </Grid>
    </Box>
    </>
  );
}

export default Contact;
