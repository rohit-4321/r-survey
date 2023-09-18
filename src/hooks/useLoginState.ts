import { signInWithEmailAndPassword } from 'firebase/auth';
import { useCallback, useState } from 'react';
import { firebaseAuth } from '../global';
import { useNavigate } from 'react-router-dom';

export const useLoginState = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setLoginEmail = useCallback((e: string) => {
    setEmail(e);
  }, []);

  const setLoginPassword = useCallback((p: string) => {
    setPassword(p);
  }, []);

  const loginFirebase = useCallback((email: string, pass: string) => {
    signInWithEmailAndPassword(firebaseAuth, email, pass)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email, password]);
  return {
    email,
    password,
    setLoginEmail,
    setLoginPassword,
    loginFirebase
  };
};