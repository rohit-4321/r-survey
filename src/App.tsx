import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/BrowserRouter';

function App() {
	return <div className='App h-screen'>
		<RouterProvider router={router} />
	</div>;
}

export default App;
