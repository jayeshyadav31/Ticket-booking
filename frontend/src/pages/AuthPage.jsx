import React from 'react'
import { useRecoilValue } from 'recoil'
import authScreenAtom from '../Atoms/authAtom'
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

function AuthPage() {
   
    const authScreen=useRecoilValue(authScreenAtom);
    // console.log(authScreen);
  return (
    <>
    {
        authScreen==='login'?<LoginPage/>:<SignupPage/>
    }
    </>
    
  )
}

export default AuthPage