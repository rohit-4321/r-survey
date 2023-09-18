import { User, onAuthStateChanged } from 'firebase/auth';
import { FC, createContext, useContext, useLayoutEffect, useState } from 'react';
import { auth } from '../../global/firebase/init';
import { useNavigate } from 'react-router-dom';


const UserContext = createContext<User | undefined>(undefined);

export const UserContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (ur) => {
      if (ur) {

        setUser(ur);
      } else {
        navigate('/auth');
        setUser(undefined);
      }
    });
  }, []);

  return <UserContext.Provider value={user}>
    {children}
  </UserContext.Provider>;

};

export const useUserContext = () => {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error('useUserContext is not inside it\'s provider');
  }
  return user;
};