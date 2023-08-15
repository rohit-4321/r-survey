import { User, onAuthStateChanged } from 'firebase/auth';
import {createContext, FC, useState, useCallback, useEffect} from 'react';
import { firebaseAuth } from '../global';

interface IUser {
    user: User | undefined,
    setUser: ((user: User | undefined) => void )
}
export const UserContext = createContext<IUser>({
	user: undefined,
	setUser: () => {}
});

export const UserContextProvider:FC<{children: React.ReactNode}> = ({children}) => {
	const [user, _setUser] = useState<IUser['user']>();

	const setUser = useCallback((u: IUser['user']) => {
		_setUser(u);
	}, []);

	useEffect(() => {
		const authCleanUp =  onAuthStateChanged(firebaseAuth, (user) => {
			if(user){
				_setUser(user);
			}else {
				_setUser(undefined);
			}
		});
		return () => {
			authCleanUp();
		};
	}, []);

	return (
		<UserContext.Provider value={{
			user,
			setUser,
		}}>
			{children}
		</UserContext.Provider>
	);
};