import React, {FC, memo, useCallback, useState } from 'react';
import { AuthButton } from './AuthButton';

const useLoginState = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setLoginEmail = useCallback((e: string) => {
    setEmail(e);
  }, []);

  const setLoginPassword = useCallback((p: string) => {
    setPassword(p);
  }, []);

  const loginFirebase = useCallback(() => {
  }, [email, password]);
  return {
    email,
    password,
    setLoginEmail,
    setLoginPassword,
    loginFirebase
  };
};

interface LoginProps {
  children?: React.ReactNode
}
const Login:FC<LoginProps> = ({
  children
}) => {
  const {
    email,
    password,
    setLoginEmail,
    setLoginPassword,
    loginFirebase
  } = useLoginState();
  return <div className="flex flex-col items-center gap-2 w-[22rem] border-gray-400 border-2 rounded px-5 py-10">
    <span className="self-start text-[2rem] font-bold">Login</span>
    <input className="bg-transparent px-5 py-2 border-2 w-full focus:outline-none rounded text-slate-200 font-medium" type="text" placeholder="Email" value={email} onChange={(e) => {setLoginEmail(e.target.value);}} />
    <input className="bg-transparent px-5 py-2 border-2 w-full focus:outline-none rounded text-slate-200 font-semibold" type="text" placeholder="Password" value={password} onChange={(e) => {setLoginPassword(e.target.value);}} />
    <AuthButton value='Login' 
      onClick={() => {
        loginFirebase();
      }}
    />

    {children}
  </div>;
};

export default memo(Login);