import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useCallback, useState } from 'react';
import { firebaseAuth } from '../global';
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom';

export const useSignUpState = () => {
  const navigate = useNavigate();
  const [email , setEmail]  =useState('');
  const [password, setPassword] = useState('');

  const setSignupEmail = useCallback((e: string) => {
    setEmail(e);
  },[]);
  const setSignupPassword = useCallback((p : string) => {
    setPassword(p);
  }, []);

  const signUpFirebase = useCallback((email: string, pass: string) => {
    createUserWithEmailAndPassword(firebaseAuth, email, pass)
      .then((userCredential) => {
        userCredential.user.getIdTokenResult(true)
          .then((tk) => {
            axiosInstance.post('/sync', {
              email,
            }, {
              headers: {
                Authorization: `Bearer ${tk.token}`
              }
            })
              .then(() => {
                userCredential.user.getIdTokenResult(true).then((tkk) => { navigate('/'); console.log(tkk.claims); });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch(() => {
            console.log('No token available');
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email, password]);

  return {
    email,password, setSignupPassword, setSignupEmail, signUpFirebase
  };
};