
import { Button } from '@chakra-ui/react';
import React from 'react'
import { FiLogOut } from "react-icons/fi";
import {  useSetRecoilState } from 'recoil';
import userAtom from '../Atoms/userAtom';
import useShowToast from '../hooks/useShowToast';
function LogoutButton() {
    const setUser =useSetRecoilState(userAtom);
    const showToast=useShowToast();
    const handleLogout = async () => {
		try {
			const res = await fetch("/api/users/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();

			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}

			localStorage.removeItem("user-threads");
			setUser(null);
		} catch (error) {
			showToast("Error", error, "error");
		}
	};
  return (
    <Button marginLeft={"10px"} p={2} size={"md"} onClick={handleLogout} color={"gray.500"}>
			<FiLogOut size={20} />
		</Button>
  )
}

export default LogoutButton