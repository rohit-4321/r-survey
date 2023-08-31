import { useCallback } from 'react';
import { useCreateTestContext } from '../../context/CreateTestContext';
import {TextArea} from '../ui/TextArea';
 
export const Title = () => {
  const {state, dispatch} = useCreateTestContext();
  const onTitleUpdate = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: 'setTitle',
      payload: e.target.value
    });

  }, []);

  const onDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: 'setDescriptions',
      payload: e.target.value
    });
  }, []);
  return <div className='flex flex-col gap-2 py-6 px-3 rounded border bg-slate-800 border-slate-700'>

    <TextArea
      placeholder='Title'
      onChange={onTitleUpdate}
      className='bg-transparent line-clamp-none outline-none resize-none text-3xl px-2 py-4'
      value={state.title} 
    />
    <TextArea
      className='bg-transparent line-clamp-none outline-none resize-none text-xl text-slate-300 px-2 py-4'
      placeholder='Description'
      onChange={onDescriptionChange}
      value={state.description} 

    />
    
  </div>;
};