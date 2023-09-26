import { NavLargeScreen } from './NavLargeScreen';
import { NavSmallScreen } from './NavSmallScreen';

export const Header = () => {
  return (
    <div className='bg-[#1A212F] h-[4rem] flex items-center justify-between px-[1rem] md:px-[3rem] lg:px-[5rem] shrink-0 border-b-[1px] border-gray-800'>
      <div className='text-amber-300 text-3xl font-bold tracking-wider w-[10rem] flex justify-center items-center h-9'
      >Class Test</div>
      <div>
        <div className='hidden md:block'>
          <NavLargeScreen />
        </div>
        <div className='md:hidden'>
          <NavSmallScreen />
        </div>
      </div>
    </div>
  );
};