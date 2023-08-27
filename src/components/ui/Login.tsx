import React, {FC, memo } from 'react';
import { AuthButton } from './AuthButton';

interface LoginProps {
    email: string,
    password: string,
    setEmail: (e: string) => void,
    setPassword: (e: string) => void,
	onLogin: (email: string, password: string) => void,
    children?: React.ReactNode
}

const Login:FC<LoginProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  onLogin,
  children
}) => {
  return <div className="flex flex-col items-center gap-2 w-[22rem] border-gray-400 border-2 rounded px-5 py-10">
    <span className="self-start text-[2rem] font-bold">Login</span>
    <input className="px-5 py-2 focus:outline-none w-full text-slate-900 font-semibold" type="text" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value);}} />
    <input className="px-5 py-2 focus:outline-none w-full text-slate-900 font-semibold" type="text" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value);}} />
    <AuthButton value='Login' 
      onClick={() => {
        onLogin(email, password);
      }}
    />

    {children}
  </div>;
};

export default memo(Login);