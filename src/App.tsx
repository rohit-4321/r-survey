import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { router } from './routes/BrowserRouter';
import { UserContextProvider } from './context/UserContext';
import { Header } from './components/ui/header/Header';

function App() {
  return <UserContextProvider>
    <BrowserRouter>
      <div className='App h-screen bg-slate-900 text-slate-300 flex flex-col'>
        <Header />
        <div className='flex-auto overflow-auto'>
          <Routes>
            {
              router.map((route) => <Route key={route.path} path={route.path} element = {route.element}/>)
            }
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </UserContextProvider>

  ;
}

export default App;
