import { CreateTestContext, CreateTestProvider } from '../../context/CreateTestContext';
import React, { useContext } from 'react';

export const Create = () => {
  return (
    <CreateTestProvider>
      <div className='wrapper md:w-[70%] w-[98%]  text-slate-100 mx-auto my-6'>
        <Title />
      </div>
    </CreateTestProvider>
  );
};

export const Title = () => {
  const {state} = useContext(CreateTestContext);
  const onTitleChange = (e: React.FormEvent<HTMLDivElement>) => {
    state.title = e.currentTarget.textContent || '';
  };
  const onDescriptionChange = (e: React.FormEvent<HTMLDivElement>) => {
    state.description = e.currentTarget.textContent || '';
  };

  return <div className='flex flex-col gap-5 py-6 px-3 rounded border bg-slate-800 border-slate-700'>
    <div
      id='title'
      className='outline-0 text-4xl font-medium'
      suppressContentEditableWarning
      contentEditable
      placeholder='Title'
      onInput={onTitleChange}>
      {state.title}
    </div>
    <div
      id='description'
      className='outline-0 text-xl text-slate-300 font-sm'
      suppressContentEditableWarning
      contentEditable
      onInput={onDescriptionChange}>
      {state.description}
    </div>
  </div>;
};