import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export const Dashboard = () => {
	const navigate = useNavigate();
	const {user} = useContext(UserContext);

	useEffect(() => {
		if(user){
			console.log('welcome');
		}else {
			navigate('/auth');
		}
	},[user]);

	return <div>User Dashboard</div>;
};