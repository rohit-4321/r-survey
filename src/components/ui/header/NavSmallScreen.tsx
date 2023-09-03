import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useOutsideClick } from '../../../hooks/useOutsideClick';

export const NavSmallScreen= () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const ref = useOutsideClick<HTMLDivElement>(() => {
    setIsPopupVisible((d) => d ? !d : d);
  });
  const onItemClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    setIsPopupVisible((v) => !v);
  };

  return (
    <div ref={ref} className='relative border border-zinc-50 flex justify-center items-center p-1 rounded'
    >
      <MenuIcon className='cursor-pointer' onClick={() => {
        setIsPopupVisible((v) => !v);
      }}/>
      {
        isPopupVisible &&
        <div  
          className='absolute bottom-0 right-0 translate-y-[calc(100%+1.5rem)]  bg-black'>
          <ul className='bg-slate-800 gap-10 text-lg flex-col flex px-10 py-7 border border-white rounded-md text-white'>
            <li onClick={onItemClick} className='cursor-pointer'>
              <NavLink to='/dashboard'> Dashboard </NavLink>
            </li>
            <li  onClick={onItemClick} className='cursor-pointer'>
              <NavLink to='/create'> Create </NavLink>
            </li>
            <li  onClick={onItemClick} className='cursor-pointer'>
              <NavLink to='/join'> Join </NavLink>
            </li>
          </ul>
        </div>
      } 
    </div>
  );
};