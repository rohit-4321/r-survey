import { Route,  Routes } from 'react-router-dom';
import { router } from './routes/BrowserRouter';
import { Header } from './components/ui/header/Header';

function App() {

  return <div className='App h-screen bg-[#1A212F] text-slate-300 flex flex-col'>
    <Header />
    <div className='flex-auto overflow-auto'>
      <Routes>
        {
          router.map((route) => <Route key={route.path} path={route.path} element={route.element} />)
        }
      </Routes>
    </div>
  </div>
  ;
}

export default App;
