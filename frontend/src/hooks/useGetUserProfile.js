import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useShowToast from './useShowToast';
import { useRecoilState, useSetRecoilState } from 'recoil';
import userAtom from '../Atoms/userAtom';

const  useGetUserPorfile=()=> {
 
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(false);
    const {username}=useParams()
    const showToast=useShowToast()
    useEffect(()=>{
        const getUser=async()=>{
            setLoading(true)
            try {
             // console.log(username);
              const res=await fetch(`/api/users/profile/${username}`)
              const data=await res.json()
              // console.log(data);
              if(data.error){
                showToast("Error",data.error,"error");
                return ;
              }
              setUser(data)
            } catch (error) {
              showToast("Error",error,"error");
            }
            finally{
              setLoading(false)
            }
          };
          getUser()
    },[username,showToast])
   return {user,loading};
}

export default useGetUserPorfile