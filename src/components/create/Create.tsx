import { CreateTestProvider, useCreateTestContext,  } from '../../context/CreateTestContext';
import { QuestionCreate } from './QuestionCreate';
import { Title } from './Title';

const Creates = () => {
  const {state, dispatch} = useCreateTestContext();
  const addQuestionHandler = () => {
    dispatch({type: 'addQuestion', payload: undefined});
  };
  return (
    <div className='wrapper md:w-[70%] w-[98%] flex flex-col gap-5 text-slate-100 mx-auto my-6'>
      <Title />
      <QuestionCreate />
      <button className='self-end bg-red-300 text-teal-900 font-semibold px-3 py-1 rounded'>Add Question</button>
    </div>
  );
};



export const Create = () => {
  return (
    <CreateTestProvider>
      <Creates />
    </CreateTestProvider>
  );
};
