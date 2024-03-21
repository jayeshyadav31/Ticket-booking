import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	useColorModeValue,
	Avatar,
	Center,
} from "@chakra-ui/react";
import React, { useRef, useState } from 'react'
import userAtom from '../Atoms/userAtom'
import { useNavigate } from "react-router-dom";
import usePreviewImg from '../hooks/usePreviewImg';
import { useRecoilState, useSetRecoilState } from 'recoil';
import useShowToast from "../hooks/useShowToast";

function UpdateProfilePage() {
	const navigate=useNavigate()
	const setCurrentUser=useSetRecoilState(userAtom)
    const [updating,setUpdating]=useState(false);
    const [user,setUser]=useRecoilState(userAtom);
    const [inputs,setInputs]=useState({
        name: user.name,
		email: user.email,
		password: "",
        phoneNumber:null
    })
    const showToast=useShowToast();
    const fileRef=useRef();
    const {imgUrl,handleImageChange}=usePreviewImg();
    const handleSubmit =async(e)=>{
        e.preventDefault();
		if(updating){
			return ;
		}
		setUpdating(true)
        try {
			const res = await fetch(`/api/users/update/${user._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
				
			});
        const data=await res.json();
		setUser(data);
		setCurrentUser(data)
		localStorage.setItem("user-threads", JSON.stringify(data));
		showToast("Success","Profile Updated Successfully","success");
		navigate(`/${data.name}`)
        } catch (error) {
            showToast("Error",error,"error");
        }
		finally{
			setUpdating(false)
		}
    }
	console.log(`imageUrl${imgUrl}`);
	
  return (
    <form onSubmit={handleSubmit}>
			<Flex align={"center"} justify={"center"} my={6}>
				<Stack
					spacing={4}
					w={"full"}
					maxW={"md"}
					bg={useColorModeValue("white", "gray.dark")}
					rounded={"xl"}
					boxShadow={"lg"}
					p={6}
				>
					<Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
						User Profile Edit
					</Heading>
					<FormControl id='userName'>
						<Stack direction={["column", "row"]} spacing={6}>
							<Center>
								<Avatar size='xl' boxShadow={"md"} src={imgUrl || user.profilePic} />
							</Center>
							<Center w='full'>
								<Button w='full' onClick={() => fileRef.current.click()}>
									Change Avatar
								</Button>
								<Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
							</Center>
						</Stack>
					</FormControl>
					<FormControl>
						<FormLabel>Name</FormLabel>
						<Input
							placeholder='John Doe'
							value={inputs.name}
							onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
							_placeholder={{ color: "gray.500" }}
							type='text'
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Email address</FormLabel>
						<Input
							placeholder='your-email@example.com'
							value={inputs.email}
							onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
							_placeholder={{ color: "gray.500" }}
							type='email'
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Password</FormLabel>
						<Input
							placeholder='password'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
							_placeholder={{ color: "gray.500" }}
							type='password'
						/>
					</FormControl>
                    <FormControl>
						<FormLabel>Phone No</FormLabel>
						<Input
							placeholder='password'
							value={inputs.phoneNumber}
							onChange={(e) => setInputs({ ...inputs, phoneNumber: e.target.value })}
							_placeholder={{ color: "gray.500" }}
							type='number'
						/>
					</FormControl>
					<Stack spacing={6} direction={["column", "row"]}>
						<Button
							bg={"red.400"}
							color={"white"}
							w='full'
							_hover={{
								bg: "red.500",
							}}
                            onClick={()=>{navigate(`/${user.name}`)}}
						>
							Cancel
						</Button>
						<Button
							bg={"green.400"}
							color={"white"}
							w='full'
							_hover={{
								bg: "green.500",
							}}
							type='submit'
							isLoading={updating}
						>
							Submit
						</Button>
					</Stack>
				</Stack>
			</Flex>
		</form>
  )
}

export default UpdateProfilePage