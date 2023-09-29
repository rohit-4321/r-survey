import React, {FC} from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
    children: React.ReactNode
}
export const Modal:FC<ModalProps> = ({children}) => {
  const m = <div className='top-0 bottom-0 left-0 right-0 fixed z-[99] bg-black/30 flex justify-center items-center'>
    <div className='bg-slate-300 absolute p-5 rounded-md'>
      {children}
    </div>
  </div>;

  return <>
    {
      createPortal(m, document.body)
    }
  </>;
};