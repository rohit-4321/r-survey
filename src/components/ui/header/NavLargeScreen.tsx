import { NavLink } from 'react-router-dom';

export const NavLargeScreen = () => {
  return  <ul className='gap-10 text-xl flex'>
    <li>
      <NavLink to='/dashboard'> Dashboard </NavLink>
    </li>
    <li>
      <NavLink to='/create'> Create </NavLink>
    </li>
    <li>
      <NavLink to='/join'> Join </NavLink>
    </li>
  </ul>;
};