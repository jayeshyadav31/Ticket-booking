import { Flex, Heading,Stack,Box, HStack, FormControl, FormLabel, Input,Link,Text ,InputGroup,InputRightElement,Button
    ,useColorModeValue,
    useToast} from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useSetRecoilState } from "recoil";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import authScreenAtom from '../Atoms/authAtom'
import userAtom from '../Atoms/userAtom';

function SignupPage() {
    const setUser=useSetRecoilState(userAtom)
    const [showPassword,setShowPassword]=useState(false);
    const setAuthScreen = useSetRecoilState(authScreenAtom);
    const [input, setInput]=useState({
        name:"",
        email:"",
        password:"",
    }
    )
    const toast=useToast();
    const handleSignUp=async()=>{
        try {
            const res = await fetch("/api/users/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(input),
			});
			const data = await res.json();
            // console.log(data.error);
			if (data.error) {
				toast({
                    title: "error",
                    description: data.error,
                    status: "error", // "success", "error", "warning", "info"
                    duration: 3000, // Duration in milliseconds
                    isClosable: true, // Whether the toast can be closed by the user
                  });
				return;
			}
            localStorage.removeItem("user-threads");
            localStorage.setItem("user-threads", JSON.stringify(data));
            setUser(data)
        } catch (error) {
            console.log(error);
            toast({
                title: "error",
                description: error,
                status: "error", // "success", "error", "warning", "info"
                duration: 3000, // Duration in milliseconds
                isClosable: true, // Whether the toast can be closed by the user
              });
        }
    }
  return (
    <Flex align={"center"} justify={"center"} textColor={"black"}>
        <Stack py={12} px={6} spacing={8} mx={"auto"} maxW={"lg"}>
            <Stack align={"center"}>
                <Heading textAlign={"center"} size={"xl"}> Sign up</Heading>
            </Stack>
            <Box>
                <Stack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Name:</FormLabel>
                                <Input type='text' value={input.name} 
                                borderColor={'black'}
                                onChange={(e)=>{setInput({...input,name:e.target.value})}}
                                _hover={{borderColor:'gray.800'}}
                                ></Input>
                            </FormControl>
                    <FormControl isRequired>
							<FormLabel>Email address</FormLabel>
							<Input
								type='email'
								onChange={(e) => setInput({ ...input, email: e.target.value })}
								value={input.email}
                                borderColor={"black"}
                                _hover={{borderColor:'gray.800'}}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "password"}
									onChange={(e) => setInput({ ...input, password: e.target.value })}
									value={input.password}
                                    borderColor={"black"}
                                    _hover={{borderColor:'gray.800'}}
								/>
								<InputRightElement h={"full"}>
									<Button
										variant={"ghost"}
                                        backgroundColor={"gray.900"}
										onClick={() => setShowPassword((showPassword) => !showPassword)}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
                        <Stack>
                            <Button
                            loadingText="submitting"
                            size={"lg"}
                            backgroundColor={'#008DDA'}
                            _hover={{
                                bg: '#41C9E2',
                            }}
                            color={"white"}
                            onClick={handleSignUp}
                            >
                                Sign Up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
							<Text align={"center"}>
								Already a user?{" "}
								<Link color={"blue.400"} onClick={() => setAuthScreen("login")}>
									Login
								</Link>
							</Text>
						</Stack>
                </Stack>
            </Box>
        </Stack>
    </Flex>
  )
}

export default SignupPage