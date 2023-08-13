import { useState } from 'react';
import  Login from '../ui/Login';
import Signup from '../ui/Signup';
import { useLoginState } from '../../hooks/useLoginState';
import { useSignUpState } from '../../hooks/useSignupState';

export const Auth = () => {
	const [authState, setAuthState] = useState<'login' | 'signup'>('login');
	const  {
		email: loginEmail,
		password: logInPassword,
		setLoginEmail,
		setLoginPassword
	} = useLoginState();

	const {
		email: signUpEmail,
		password: signUpPassword,
		setSignupPassword,
		setSignupEmail
	} = useSignUpState();

	if(authState == 'login'){
		return <div className="h-full overflow-hidden flex flex-col justify-center items-center bg-slate-300">
			<Login email={loginEmail} setEmail={setLoginEmail} password={logInPassword} setPassword={setLoginPassword}>
				<p className="mt-7 self-start">
					{'Don\'t'} have an account?
					<span className="text-blue-600 underline cursor-pointer ml-3" onClick={() => setAuthState('signup') }>Sign Up</span>
				</p>
			</Login>
		</div>;
	}
	if(authState == 'signup'){
		return <div className="h-full overflow-hidden flex flex-col justify-center items-center bg-slate-300">
			<Signup email={signUpEmail} setEmail={setSignupEmail} password={signUpPassword} setPassword={setSignupPassword}>
				<p className="mt-7 self-start">
					Already have an account?
					<span className="text-blue-600 underline cursor-pointer ml-3" onClick={() => setAuthState('login') }>Log In</span>
				</p>
			</Signup>
		</div>;
	}
};