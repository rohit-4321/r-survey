import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/BrowserRouter';
import { UserContextProvider } from './context/UserContext';

function App() {
	return <div className='App h-screen'>
		<UserContextProvider>
			<RouterProvider router={router} />
		</UserContextProvider>
	</div>;
}

export default App;
