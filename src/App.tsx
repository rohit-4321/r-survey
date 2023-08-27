import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/BrowserRouter';
import { UserContextProvider } from './context/UserContext';

function App() {
  return <UserContextProvider>
    <div className='App h-screen bg-slate-900 text-slate-300 flex flex-col'>
      <div className='bg-[#10192d] h-[4rem] flex items-center justify-between px-[1rem] md:px-[3rem] lg:px-[5rem]'>
        <div className='text-amber-300 text-3xl font-bold tracking-wider w-[10rem] flex justify-center items-center h-9'
        >Class Test</div>
        <div>
          <ul className='hidden gap-10 text-xl md:flex'>
            <li>
              Dashboard
            </li>
            <li>
              Create Test
            </li>
            <li>
              Join Test
            </li>
          </ul>
        </div>

      </div>
      <div className='flex-auto'>
        <RouterProvider router={router} />
      </div>
    </div>
  </UserContextProvider>
  ;
}

export default App;
