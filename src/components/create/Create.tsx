import { useCallback, useEffect, useState } from 'react';
import { CreateTestProvider, useCreateTestContext,  } from '../../context/createTest/CreateTestContext';
import  QuestionCreate  from './QuestionCreate';
import Title  from './Title';
import { useCreateQuizApi } from '../../hooks/apis/createquiz';
import { createSnackbar } from '../../global';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../ui/Modal';

const Creates = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || token == ''){
      navigate('/auth');
    }
  }, []);
  const {isLoading: quizSavingLoading, trigger } = useCreateQuizApi();
  const {state, dispatch} = useCreateTestContext();
  const addQuestionHandler = () => {
    dispatch({type: 'addQuestion', payload: undefined});
  };
  const onQuizSave = useCallback(() => {
    console.log(state);
    trigger(state)
      .then((res) => {
        createSnackbar({
          message: `Quizes created successfully. ID=${res.data.id}`,
          duration: 'veryLong',
          varient: 'success'
        });
        dispatch({
          type: 'resetState',
          payload: undefined
        });
        setIsModalVisible(false);
      })
      .catch(err => {
        console.log('failed');
        createSnackbar({
          message:  err?.response?.data.errCode,
          duration: 'veryLong',
          varient: 'error'
        });
      });
  }, [state]);
  return (
    <>
      {
        isModalVisible && <Modal>
          <h1 className='font-mono text-zinc-700 pb-7'>Are You sure you want to Create this quiz? </h1>
          <div className='flex gap-3 justify-end '>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={onQuizSave}
            >{
                quizSavingLoading ? 'loading...' : 'Save'
              }</button>
            <button className='bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded'
              onClick={() => setIsModalVisible(false)}
            >Cancel</button>
          </div>
        </Modal>
      }
    
    
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
            onClick={() => setIsModalVisible(true)}
          >Create Quiz</button>
        </div>
      </div>
    </>
  );
};



export const Create = () => {

  return <CreateTestProvider>
    <Creates />
  </CreateTestProvider>;
};
