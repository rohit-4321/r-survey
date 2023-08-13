import { useCallback, useState } from 'react';
import  Login from '../ui/Login';
import Signin from '../ui/Signin';

export const Auth = () => {
	const [authState, setAuthState] = useState<'login' | 'signin'>('signin');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const setLoginEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}, []);
	const setLoginPassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	}, []);
	if(authState == 'login'){
		return <div className="h-full overflow-hidden flex flex-col justify-center items-center bg-slate-300">
			<Login email={email} setEmail={setLoginEmail} password={password} setPassword={setLoginPassword}>
				<p className="mt-7 self-start">
					{'Don\'t'} have an account?
					<span className="text-blue-600 underline cursor-pointer ml-3" onClick={() => setAuthState('signin') }>Sign In</span>
				</p>
			</Login>
		</div>;
	}
	if(authState == 'signin'){
		return <div className="h-full overflow-hidden flex flex-col justify-center items-center bg-slate-300">
			<Signin email={email} setEmail={setLoginEmail} password={password} setPassword={setLoginPassword}>
				<p className="mt-7 self-start">
					Already have an account?
					<span className="text-blue-600 underline cursor-pointer ml-3" onClick={() => setAuthState('login') }>Log In</span>
				</p>
			</Signin>
		</div>;
	}
};