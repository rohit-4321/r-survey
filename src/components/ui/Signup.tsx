import React, {FC, memo } from 'react';

interface SignupProps {
    email: string,
    password: string,
    setEmail: (e: string) => void,
    setPassword: (e: string) => void,
    children?: React.ReactNode
}

const Signup:FC<SignupProps> = ({
	email,
	password,
	setEmail,
	setPassword,
	children
}) => {
	return <div className="flex flex-col items-center gap-2 w-[22rem] border-blue-950 border-2 rounded px-5 py-10">
		<span className="self-start text-[2rem] font-bold">Signup</span>
		<input className="px-5 py-2 focus:outline-none w-full" type="text" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value);}} />
		<input className="px-5 py-2 focus:outline-none w-full" type="text" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value);}} />
		<button className="self-start bg-slate-400 px-5 py-2">Signup</button>
		{children}
	</div>;
};

export default memo(Signup);