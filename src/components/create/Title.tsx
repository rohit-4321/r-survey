import { FC, memo, useCallback, useMemo } from 'react';
import { useCreateTestContext } from '../../context/createTest/CreateTestContext';
import {TextArea} from '../ui/TextArea';
 
interface OwnProps {
  title: string,
  setTitle: (title: string) => void,
  description: string,
  setDescriptions: (des: string) => void,
}
const Title:FC<OwnProps> = ({
  title,
  description,
  setDescriptions,
  setTitle
}) => {
  console.log('Title rendered');
  const onTitleUpdate = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(ev.target.value);
  };
  const onDescriptionChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptions(ev.target.value);
  };

  return <div className='flex flex-col gap-2 py-6 px-3 rounded border bg-slate-800 border-slate-700'>

    <TextArea
      placeholder='Title'
      onChange={onTitleUpdate}
      className='bg-transparent line-clamp-none outline-none resize-none text-3xl px-2 py-4'
      value={title} 
    />
    <TextArea
      className='bg-transparent line-clamp-none outline-none resize-none text-xl text-slate-300 px-2 py-4'
      placeholder='Description'
      onChange={onDescriptionChange}
      value={description} 

    />
    
  </div>;
};

// Trying something........................
const TitleMemoWrapper = () => {
  const {state, dispatch} = useCreateTestContext();
  const onTitleUpdate = useCallback((value: string) => {
    dispatch({
      type: 'setTitle',
      payload: value,
    });
  }, []);
  const onDescriptionUpdate = useCallback((value: string) => {
    dispatch({
      type: 'setDescriptions',
      payload: value,
    });
  }, []);
  return useMemo(() =>  <Title
    title={state.title} 
    description={state.description}
    setTitle={onTitleUpdate}
    setDescriptions={onDescriptionUpdate}
  />, [state.title, state.description, onTitleUpdate, onDescriptionUpdate]);
};
export  default memo(TitleMemoWrapper);