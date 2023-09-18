import { useState } from 'react';
import Login from '../ui/Login';
import Signup from '../ui/Signup';
import { useLoginState } from '../../hooks/useLoginState';
import { useSignUpState } from '../../hooks/useSignupState';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../global';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import { auth } from '../../global/firebase/init';

export const Auth = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<'login' | 'signup'>('login');
  const {
    email: loginEmail,
    password: logInPassword,
    setLoginEmail,
    setLoginPassword,
  } = useLoginState();

  const {
    email: signUpEmail,
    password: signUpPassword,
    setSignupPassword,
    setSignupEmail,
  } = useSignUpState();

  const signupFirebase = (email: string, pass: string) => {
    createUserWithEmailAndPassword(firebaseAuth, email, pass)
      .then(() => {
        auth.currentUser?.getIdTokenResult(true).then((tk) => {
          axiosInstance.post('/sync', {
            email,
          }, {
            headers: {
              Authorization: `Bearer ${tk.token}`
            }
          })
            .then(() => {
              auth.currentUser?.getIdTokenResult(true).then((tkk) => { navigate('/'); console.log(tkk.claims); });
            }).catch((err) => {
              console.log(err);
            });
        }).catch(() => {
          console.log('No token available');
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginFirebase = (email: string, pass: string) => {
    signInWithEmailAndPassword(firebaseAuth, email, pass)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (authState == 'login') {
    return <div className="h-full overflow-hidden flex flex-col justify-center items-center">
      <Login
        email={loginEmail}
        setEmail={setLoginEmail}
        password={logInPassword}
        setPassword={setLoginPassword}
        onLogin={loginFirebase}
      >
        <p className="mt-7 self-start">
          {'Don\'t'} have an account?
          <span className="text-blue-600 underline cursor-pointer ml-3" onClick={() => setAuthState('signup')}>Sign Up</span>
        </p>
      </Login>
    </div>;
  }
  if (authState == 'signup') {
    return <div className="h-full overflow-hidden flex flex-col justify-center items-center">
      <Signup
        email={signUpEmail}
        setEmail={setSignupEmail}
        password={signUpPassword}
        setPassword={setSignupPassword}
        onSignup={signupFirebase}
      >
        <p className="mt-7 self-start">
          Already have an account?
          <span className="text-blue-400 underline cursor-pointer ml-3" onClick={() => setAuthState('login')}>Log In</span>
        </p>
      </Signup>
    </div>;
  }
};