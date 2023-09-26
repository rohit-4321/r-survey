import { useCallback, useEffect, useState } from 'react';
import { CreateTestProvider, useCreateTestContext,  } from '../../context/createTest/CreateTestContext';
import  QuestionCreate  from './QuestionCreate';
import Title  from './Title';
import { CreateQuizApi } from '../../hooks/apis/createquiz';
import { createSnackbar } from '../../global';
import { useNavigate } from 'react-router-dom';

const Creates = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || token == ''){
      navigate('/auth');
    }
  }, []);
  const [quizSavingLoading, setQuizSaveLoading] = useState(false);
  const {state, dispatch} = useCreateTestContext();
  const addQuestionHandler = () => {
    dispatch({type: 'addQuestion', payload: undefined});
  };
  const onQuizSave = useCallback(() => {
    console.log(state);
    setQuizSaveLoading(true);
    CreateQuizApi(state)
      .then((res) => {
        setQuizSaveLoading(false);
        createSnackbar({
          message: `Quizes created successfully. ID=${res.data.id}`,
          duration: 'veryLong',
          varient: 'success'
        });
      })
      .catch(err => {
        setQuizSaveLoading(false);
        createSnackbar({
          message:  err?.response?.data.errCode,
          duration: 'veryLong',
          varient: 'error'
        });
      });
  }, [state]);
  return (
    <div className='wrapper md:w-[70%] w-[98%] flex flex-col gap-5 text-slate-100 mx-auto my-6'>
      <Title />
      {
        state.questions.map((ques, index) => <QuestionCreate
          key={index}
          question={ques}
          quesIndex={index}
        />)
      }
      <div className='self-end flex gap-2'>
        <button className='bg-red-300 text-teal-900 font-semibold px-3 py-1 rounded'
          onClick={addQuestionHandler}
        >Add Question</button>
        <button
          disabled= {quizSavingLoading}
          className='bg-green-300 text-teal-900 font-semibold px-3 py-1 rounded'
          onClick={onQuizSave}
        >{
            quizSavingLoading ? 'loading...' : 'Create Quiz'
          }</button>
      </div>
    </div>
  );
};



export const Create = () => {

  return <CreateTestProvider>
    <Creates />
  </CreateTestProvider>;
};
