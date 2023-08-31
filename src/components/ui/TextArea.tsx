
import React, {ChangeEvent, forwardRef, useEffect} from 'react';
import { useCopyRef } from '../../hooks/useCopyRef';
type TextAreaProps = React.ComponentProps<'textarea'> & {
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};



export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((
  { onChange, ...props}, ref
) => {
  const tRef = useCopyRef(ref);

  useEffect(() => {
    if(tRef.current){
      tRef.current.style.height= '0px';
      tRef.current.style.height = `${tRef.current?.scrollHeight}px`;
    }
  }, []);
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event);
    if(tRef.current){
      tRef.current.style.height= '0px';
      tRef.current.style.height = `${tRef.current?.scrollHeight}px`;
    }
  };
  return <textarea
    ref={tRef} 
    onChange={handleChange}
    {...props} />;
});

TextArea.displayName = 'TextArea';