import React, {FC, memo } from 'react';
import { AuthButton } from './AuthButton';
import { useSignUpState } from '../../hooks/useSignupState';

interface SignupProps {
    children?: React.ReactNode
}

const Signup:FC<SignupProps> = ({
  children
}) => {
  const {
    email,
    password,
    setSignupPassword,
    setSignupEmail,
    signUpFirebase
  } = useSignUpState();

  return <div className="flex flex-col items-center gap-2 w-[22rem] border-gray-400 border-2 rounded px-5 py-10">
    <span className="self-start text-[2rem] font-bold">Signup</span>
    <input className="bg-transparent px-5 py-2 border-2 w-full focus:outline-none rounded text-slate-200 font-medium" type="text" placeholder="Email" value={email} onChange={(e) => {setSignupEmail(e.target.value);}} />
    <input className="bg-transparent px-5 py-2 border-2 w-full focus:outline-none rounded text-slate-200 font-medium" type="text" placeholder="Password" value={password} onChange={(e) => {setSignupPassword(e.target.value);}} />
    <AuthButton onClick={() => {
      signUpFirebase(email, password);
    }} value='Signup'/>
	
    {children}
  </div>;
};

export default memo(Signup);