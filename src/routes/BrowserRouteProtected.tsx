import { useNavigate } from 'react-router-dom';
import { Dashboard } from '../components/dashboard/Dashboard';
import { Create } from '../components/create/Create';
import { Join } from '../components/join/Join';
import { FC, useLayoutEffect } from 'react';
import { createSnackbar } from '../components/ui/createSnackbar';

interface UserProtectedRoutesProps {
    el: React.ReactNode
} 
const UserProtectedRoutes:FC<UserProtectedRoutesProps> = ({el}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  console.log('called');

  useLayoutEffect(() => {
    if (!token || token == ''){
      createSnackbar({
        message: 'Need To Login',
        duration: 'short',
        varient: 'error'
      });
      navigate('/auth');
      return;
    }
  }, []);
  return el; 
};

export const browserRouteProtected = [
  {
    path: '/dashboard',
    element: <UserProtectedRoutes el={<Dashboard />}/>
  },
  {
    path: '/create',
    element:  <UserProtectedRoutes el={<Create />}/>
  },
  {
    path: '/join',
    element:  <UserProtectedRoutes el={<Join />}/>
  },
];