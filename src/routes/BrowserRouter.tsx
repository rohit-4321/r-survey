import { Auth } from '../components/auth/Auth';
import { Home } from '../components/Home/Home';
export const router = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/auth',
    element: <Auth />
  }
];