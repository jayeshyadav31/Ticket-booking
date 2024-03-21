import { useToast } from '@chakra-ui/toast';
import { useSetRecoilState } from 'recoil';
import userAtom from '../Atoms/userAtom';
import authScreenAtom from '../Atoms/authAtom';
import {useState} from 'react'
import { Flex, Heading,Stack,Box, HStack, FormControl, FormLabel, Input,Link,Text ,InputGroup,InputRightElement,Button
    ,useColorModeValue,} from '@chakra-ui/react'
import { ViewOffIcon,ViewIcon} from '@chakra-ui/icons';
function LoginPage() {
    const [showPassword,setShowPassword]=useState("");
    const [loading,setLoading]=useState(false)
    const [input, setInput]=useState({
        name:"",
        password:"",
    }
    )
    const toast=useToast()
    const setUser=useSetRecoilState(userAtom);
    const setAuthScreen=useSetRecoilState(authScreenAtom);
    // const showToast = useShowToast();
	const handleLogin = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(input),
			});
			const data = await res.json();
			if (data.error) {
                toast({
                   title:"Error",
                   description:data.error,
                   duration:5000,
                   status:"error",
                   isClosable:true
                });
				// showToast("Error", data.error, "error");
               
				return;
			}
            // console.log("success");
            toast({
                title:"Success",
                description:"Logged in successfully",
               duration:5000,
               status:"success",
               isClosable:true
            })
			localStorage.setItem("user-threads", JSON.stringify(data));
			setUser(data);
		} catch (error) {
            toast({
                title:"Error",
                description:error,
                duration:5000,
                status:"error",
                isClosable:true
             });
			// showToast("Error", error, "error");
		} finally {
			setLoading(false);
		}
	};
  return (
    <Flex align={"center"} justify={"center"}>
        <Stack py={12} px={6} spacing={8} mx={"auto"} maxW={"lg"}>
            <Stack align={"center"}>
                <Heading textAlign={"center"} size={"xl"}> Login</Heading>
            </Stack>
            <Box>
                <Stack spacing={4}>
                        <Box>
                            <FormControl isRequired>
                                <FormLabel>Name:</FormLabel>
                                <Input type='text' 
                                value={input.name}
                                onChange={(e)=>{setInput({...input,name:e.target.value})}}
                                />
                            </FormControl>
                        </Box>
                        <FormControl isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "password"}
									onChange={(e) => setInput({ ...input, password: e.target.value })}
									value={input.password}
								/>
								<InputRightElement h={"full"}>
									<Button
										variant={"ghost"}
										onClick={() => setShowPassword((showPassword) => !showPassword)}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
                        <Stack>
                            <Button
                            loadingText="logging In"
                            size={"lg"}
                            _hover={{
                                bg: useColorModeValue("gray.700", "gray.800"),
                            }}
                            color={"white"}
                            onClick={handleLogin}
                            isLoading={loading}
                            >
                                Login
                            </Button>
                        </Stack>
                        <Stack pt={6}>
							<Text align={"center"}>
								Not a user?{" "}
								<Link color={"blue.400"} onClick={() => setAuthScreen("signup")}>
									Sign Up
								</Link>
							</Text>
						</Stack>
                </Stack>
            </Box>
        </Stack>
    </Flex>
  )
}

export default LoginPage