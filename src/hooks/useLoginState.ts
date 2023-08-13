import { useCallback, useState } from 'react';

export const useLoginState = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const setLoginEmail = useCallback((e: string) => {
		setEmail(e);
	}, []);

	const setLoginPassword = useCallback((p: string) => {
		setPassword(p);
	}, []);
	return {
		email, 
		password,
		setLoginEmail,
		setLoginPassword
	};
};