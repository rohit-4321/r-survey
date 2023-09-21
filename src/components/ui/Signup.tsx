import React, {FC, memo, useCallback, useState } from 'react';
import { AuthButton } from './AuthButton';

const useSignUpState = () => {
  const [name, setName] = useState('');
  const [email , setEmail]  =useState('');
  const [password, setPassword] = useState('');

  const setSignupEmail = useCallback((e: string) => {
    setEmail(e);
  },[]);
  const setSignupPassword = useCallback((p : string) => {
    setPassword(p);
  }, []);

  const setSignupName = useCallback((s: string) => {setName(s);}, []);

  const signUpFirebase = useCallback(() => {

  }, [email, password]);

  return {
    email,password, setSignupPassword, setSignupEmail, signUpFirebase, name, setSignupName
  };
};
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
    name,
    setSignupName,
    signUpFirebase
  } = useSignUpState();

  return <div className="flex flex-col items-center gap-2 w-[22rem] border-gray-400 border-2 rounded px-5 py-10">

    <span className="self-start text-[2rem] font-bold">Signup</span>

    <input className="bg-transparent px-5 py-2 border-2 w-full focus:outline-none rounded text-slate-200 font-medium" 
      type="text" 
      placeholder="Name" 
      value={name} 
      onChange={(e) => {setSignupName(e.target.value);}}
    />
    <input className="bg-transparent px-5 py-2 border-2 w-full focus:outline-none rounded text-slate-200 font-medium" 
      type="text" placeholder="Email" 
      value={email}
      onChange={(e) => {setSignupEmail(e.target.value);}}
    />
    <input className="bg-transparent px-5 py-2 border-2 w-full focus:outline-none rounded text-slate-200 font-medium" 
      type="text" 
      placeholder="Password" 
      value={password} 
      onChange={(e) => {setSignupPassword(e.target.value);}}
    />
    <AuthButton onClick={() => {
      signUpFirebase();
    }} value='Signup'/>
	
    {children}
  </div>;
};

export default memo(Signup);