import { useCallback, useState } from 'react';
import { CreateTestProvider, useCreateTestContext,  } from '../../context/createTest/CreateTestContext';
import  QuestionCreate  from './QuestionCreate';
import Title  from './Title';
import { useCreateQuizApi } from '../../hooks/apis/createquiz';
import { createSnackbar } from '../ui/createSnackbar';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { Modal } from '../ui/Modal';
import { copyToClipBoard } from '../../global/utils';
import { useNavigate } from 'react-router-dom';

const Creates = () => {
  const navigate = useNavigate();
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);



  const [onSuccessModalVisible, setonSuccessModalVisible] = useState(false);
  const [onSuccessQuizId, setOnSuccessQuizId] = useState('');


  const {isLoading: quizSavingLoading, trigger } = useCreateQuizApi();
  const {state, dispatch} = useCreateTestContext();
  const addQuestionHandler = () => {
    dispatch({type: 'addQuestion', payload: undefined});
  };
  const onQuizSave = useCallback(() => {
    console.log(state);
    trigger(state)
      .then((res) => {
        dispatch({
          type: 'resetState',
          payload: undefined
        });
        // Set Success Modal
        setonSuccessModalVisible(true);
        setOnSuccessQuizId(res.data.id);
        // Confirmation Modal
        setIsConfirmModalVisible(false);
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
        isConfirmModalVisible && <Modal>
          <h1 className='font-mono text-zinc-700 pb-7'>Are You sure you want to Create this quiz? </h1>
          <div className='flex gap-3 justify-end '>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={onQuizSave}
            >{
                quizSavingLoading ? 'loading...' : 'Save'
              }</button>
            <button className='bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded'
              onClick={() => setIsConfirmModalVisible(false)}
            >Cancel</button>
          </div>
        </Modal>
      }
      {
        onSuccessModalVisible && <Modal>
          <h1 className='text-gray-600 text-lg'>Quiz created Successfully</h1>
          <div className='flex  items-center text-center border-gray-600 border-[1px] gap-3 rounded-md px-2 py-1 mt-4 mb-4 justify-between'>
            <span className=''>{onSuccessQuizId}</span>
            <div className='hover:bg-[#b8b8b8] transition-all rounded-full p-2 flex items-center justify-center'
              onClick={() => {
                copyToClipBoard(onSuccessQuizId);
                createSnackbar({
                  message: 'Copied',
                  varient: 'success',
                  duration: 'short'
                });
              }}>
              <ContentCopyIcon className=' shrink-0' fontSize="small" />
            </div>
          </div>
          <div className='flex gap-3 justify-end '>
            <button className='bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded'
              onClick={() =>{navigate('/dashboard');}}
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
            onClick={() => setIsConfirmModalVisible(true)}
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
