import React, {FC, memo } from 'react';
import { AuthButton } from './AuthButton';

interface SignupProps {
    email: string,
    password: string,
    setEmail: (e: string) => void,
    setPassword: (e: string) => void,
	onSignup: (email: string, password: string) => void,
    children?: React.ReactNode
}

const Signup:FC<SignupProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  onSignup,
  children
}) => {
  return <div className="flex flex-col items-center gap-2 w-[22rem] border-gray-400 border-2 rounded px-5 py-10">
    <span className="self-start text-[2rem] font-bold">Signup</span>
    <input className="px-5 py-2 focus:outline-none w-full" type="text" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value);}} />
    <input className="px-5 py-2 focus:outline-none w-full" type="text" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value);}} />
    <AuthButton onClick={() => {
      onSignup(email, password);
    }} value='Signup'/>
	
    {children}
  </div>;
};

export default memo(Signup);