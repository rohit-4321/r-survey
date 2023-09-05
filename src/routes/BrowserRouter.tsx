import { Auth } from '../components/auth/Auth';
import { Dashboard } from '../components/dashboard/Dashboard';
import { Create } from '../components/create/Create';
import { Join } from '../components/join/Join';
import { Home } from '../components/Home/Home';
export const router = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/create',
    element: <Create />
  },
  {
    path: '/join',
    element: <Join />
  },
  {
    path: '/auth',
    element: <Auth />
  }
];