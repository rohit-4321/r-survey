import { createBrowserRouter } from 'react-router-dom';
import { Auth } from '../components/auth/Auth';
import { Dashboard } from '../components/dashboard/Dashboard';
export const router = createBrowserRouter([
	{
		path: '/',
		element: <Dashboard />
	},
	{
		path: '/auth',
		element: <Auth />
	}
]);