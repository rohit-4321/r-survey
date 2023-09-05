import { ForwardedRef, useRef, useEffect } from 'react';

export const useCopyRef = (
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  const targetRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    if (!ref) return;
  
    if (typeof ref === 'function') {
      ref(targetRef.current);
    } else {
      ref.current = targetRef.current;
    }
  }, [ref]);
  
  return targetRef;
};