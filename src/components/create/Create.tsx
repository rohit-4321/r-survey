import { useCallback } from 'react';
import { CreateTestProvider, Question, useCreateTestContext,  } from '../../context/createTest/CreateTestContext';
import { QuestionCreate } from './QuestionCreate';
import Title  from './Title';

const Creates = () => {
  const {state, dispatch} = useCreateTestContext();
  const addQuestionHandler = () => {
    dispatch({type: 'addQuestion', payload: undefined});
  };

  const setQuestion = useCallback((index: number, ques: Question) => {
    dispatch({
      type: 'modifyQuestion',
      payload : {
        index,
        question: ques
      }
    });
  }, []);
  return (
    <div className='wrapper md:w-[70%] w-[98%] flex flex-col gap-5 text-slate-100 mx-auto my-6'>
      <Title />
      {
        state.questions.map((ques, index) => <QuestionCreate
          key={index}
          question={ques}
          setQuestion={setQuestion}
          quesIndex={index}
        />)
      }
      <button className='self-end bg-red-300 text-teal-900 font-semibold px-3 py-1 rounded'
        onClick={addQuestionHandler}
      >Add Question</button>
    </div>
  );
};



export const Create = () => {

  return <CreateTestProvider>
    <Creates />
  </CreateTestProvider>;
};
