import { useCallback, useState } from 'react';

export const useSignUpState = () => {
  const [email , setEmail]  =useState('');
  const [password, setPassword] = useState('');

  const setSignupEmail = useCallback((e: string) => {
    setEmail(e);
  },[]);
  const setSignupPassword = useCallback((p : string) => {
    setPassword(p);
  }, []);

  // const signUpFirebase = useCallback(() => {
  // 	return createUserWithEmailAndPassword(firebaseAuth, email, password);
  // }, [firebaseAuth, email, password]);

  return {
    email,password, setSignupPassword, setSignupEmail
  };
};