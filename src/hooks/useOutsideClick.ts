import { useEffect, useRef } from 'react';

export const useOutsideClick = <T extends HTMLElement>(onOutsideClick: () => void) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if( ref.current && !ref.current.contains(event.target as Node)){
        onOutsideClick();
      }
    };
    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);
  return ref;
};