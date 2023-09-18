import { useState } from 'react';
import Login from '../ui/Login';
import Signup from '../ui/Signup';

export const Auth = () => {
  const [authState, setAuthState] = useState<'login' | 'signup'>('login');

  if (authState == 'login') {
    return <div className="h-full overflow-hidden flex flex-col justify-center items-center">
      <Login>
        <p className="mt-7 self-start">
          {'Don\'t'} have an account?
          <span className="text-blue-600 underline cursor-pointer ml-3" onClick={() => setAuthState('signup')}>Sign Up</span>
        </p>
      </Login>
    </div>;
  }
  if (authState == 'signup') {
    return <div className="h-full overflow-hidden flex flex-col justify-center items-center">
      <Signup>
        <p className="mt-7 self-start">
          Already have an account?
          <span className="text-blue-400 underline cursor-pointer ml-3" onClick={() => setAuthState('login')}>Log In</span>
        </p>
      </Signup>
    </div>;
  }
};