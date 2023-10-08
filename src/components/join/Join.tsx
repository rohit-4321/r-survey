/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback, useState, memo } from 'react';
import { LoadingSVG } from '../../assets/LoadingSVG';
import { JoinQuizSuccessResponse, Question } from './join.interface';
import { CreateJoinQuizContextProvider, useJoinQuizContext } from '../../context/join/JoinQuizContext';
import { getJoinQuizData } from '../../hooks/apis/getJoinQuiz';
import Option from '../create/Option';
import { useSubmitQuiz } from '../../hooks/apis/submitQuiz';
import { createSnackbar } from '../ui/createSnackbar';
import { Modal } from '../ui/Modal';

interface SingleAnswerTypeQuestionsProps {
  onOptionSelect: (optionId:string, questionId: string) => void,
  ques: Question,
  seqNo: number, 
  answers: string[]
}
const SingleAnswerTypeQuestions:FC<SingleAnswerTypeQuestionsProps> = memo(({
  onOptionSelect,
  ques,
  seqNo,
  answers,
}) => {
  return <div className='flex flex-col gap-4 py-6 px-3 rounded border bg-slate-800 border-slate-700'>
    <div className="flex gap-3">
      <span className='text-xl'>Q{seqNo}.</span>
      <span className='bg-transparent line-clamp-none outline-none resize-none text-xl w-full'>{ques.value}</span>
    </div>
    {
      ques.options.map((option) => {
        const isSelected = answers.includes(option._id); 
        return <div className='flex items-center gap-3' key={option._id}>
          <div onClick={() => {
            onOptionSelect(option._id, ques._id);
          }}>
            <Option optionType='radio' isSelected={isSelected}  />
          </div>
          <span
            className='bg-transparent line-clamp-none outline-none resize-none  w-full'
          >
            {option.value}
          </span>
        </div>;
      })
    }
  </div>;
});

interface MultiAnswerTypeQuestionProps {
  onOptionSelect: (optionId: string, questionId: string) => void,
  ques: Question,
  seqNo: number, 
  answers: string[]
}
const MultiAnswerTypeQuestion:FC<MultiAnswerTypeQuestionProps> = memo(({
  onOptionSelect,
  ques,
  seqNo,
  answers,
}) => {
  return <div className='flex flex-col gap-4 py-6 px-3 rounded border bg-slate-800 border-slate-700'>
    <div className="flex gap-3">
      <span className='text-xl'>Q{seqNo}.</span>
      <span className='bg-transparent line-clamp-none outline-none resize-none text-xl w-full'>{ques.value}</span>
    </div>
    {
      ques.options.map((option) => {
        const isSelected = answers.includes(option._id); 
        return <div className='flex items-center gap-3' key={option._id}>
          <div onClick={() => {
            onOptionSelect(option._id, ques._id);
          }}>
            <Option optionType='checkbox' isSelected={isSelected}  />
          </div>
          <span
            className='bg-transparent line-clamp-none outline-none resize-none  w-full'
          >
            {option.value}
          </span>
        </div>;
      })
    }
  </div>;
});

type quesType = 'multi' | 'single'
interface QuizSuccessProps {
  data: JoinQuizSuccessResponse
}

const QuizSuccess:FC<QuizSuccessProps> = memo(() => {
  const {state: {quizData: data, answers}, dispatch}  = useJoinQuizContext();
  const {isLoading: submitQuizLoading, trigger} =  useSubmitQuiz();
  const [onSuccessSubmitModal, setOnSuccessSubmitModal] = useState({
    isVisible: false,
    error: '',
    totalQuestion: 0,
    correctAns: 0,
  });
  const submitQuiz = () => {
    trigger({
      answers,
      creatorEmail: data?.creatorEmail ?? '',
      quizId: data?._id ?? ''
    }).then(res => {
      console.log(res);
      setOnSuccessSubmitModal({
        isVisible: true,
        error: '',
        totalQuestion: res.data.totalQuestions,
        correctAns: res.data.correctAnswers
      });
    }).catch(err => {
      setOnSuccessSubmitModal({
        isVisible: true,
        error: 'Error While Submitting the quiz.',
        totalQuestion: NaN,
        correctAns: NaN
      });
      createSnackbar({
        message: err,
        duration: 'veryLong',
        varient: 'error'
      });
    });
  };
  // const submitQuiz = 
  if(!data) return;

  const onSingleQuestionOptionSelect = useCallback((optionId: string, questionId: string) => {
    dispatch({
      type: 'setSingleAnswer',
      payload: {
        quesId: questionId,
        optionId: optionId
      }
    });
  }, [dispatch]);

  const onMultiQuestionOptionSelect = useCallback((optionId: string, questionId: string) => {
    dispatch({
      type: 'setMultiAnswer',
      payload: {
        quesId: questionId,
        optionId: optionId
      }
    });
  }, [dispatch]);

  return (
    <>
      {
        onSuccessSubmitModal.isVisible && <Modal>
          <h1 className='font-mono text-zinc-700 pb-7'>Score {onSuccessSubmitModal.correctAns} / {onSuccessSubmitModal.totalQuestion}</h1>
          <div className='flex gap-3 justify-end '>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Done</button>
            <button className='bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded'
              onClick={() => setOnSuccessSubmitModal({
                isVisible: false,
                error: '',
                totalQuestion: 0,
                correctAns: 0,
              })}
            >Cancel</button>
          </div>
        </Modal>
      }
    
      <div className='md:w-[70%] w-[98%] flex flex-col gap-5 text-slate-100 mx-auto my-6'>
        <div 
          className='text-3xl'
        >
          {data.title}
        </div>

        <div
          className='text-xl text-slate-300'
        >
          {data.description}
        </div>

        {data.questions.map((ques, i) => {
          if(ques.type as quesType == 'multi'){
            return <MultiAnswerTypeQuestion
              answers={answers[ques._id] ?? []}
              key={ques._id} 
              onOptionSelect={onMultiQuestionOptionSelect}
              ques={ques}
              seqNo={i+1} />;
          }
          return <SingleAnswerTypeQuestions
            answers={answers[ques._id] ?? []}
            key={ques._id}
            onOptionSelect={onSingleQuestionOptionSelect} 
            ques={ques} 
            seqNo={i+1} />;
        })}
        <div>
          <button
            disabled= {submitQuizLoading}
            className='bg-green-300 text-teal-900 font-semibold px-3 py-1 rounded'
            onClick={submitQuiz}
          > {
              submitQuizLoading ? 'Loading....' : 'Submit Quiz'
            }</button>
        </div>
      
      </div>
    </>
  );
});

interface EnterQuizCompProps {
  onEnter: (quizCode: string) => void
  isLoading: boolean,
  error?: string,
} 
const EnterQuizComp:FC<EnterQuizCompProps> = memo(({isLoading, error, onEnter}) => {
  const [quizCode, setQuizCode] = useState('');
  return <div className="flex justify-center h-full items-center">
    <div className="flex flex-col items-center space-y-3 p-8 border rounded  bg-slate-800 border-slate-700">
      <div className="flex flex-col gap-1">
        <input className="outline-none px-4 py-2 bg-slate-700 rounded text-slate-50 focus:border-slate-500 focus:ring-1 focus:ring-slate-200 focus:ring-opacity-50"
          placeholder="Enter Test Code"
          value={quizCode}
          onChange={(e) => {
            setQuizCode(e.target.value);
          }}
        />
        {
          error && <span className="text-red-500 text-sm">{error}</span>
        }
      </div>
      <button className="bg-slate-300 text-slate-900 font-medium px-4 py-2 rounded hover:bg-slate-400 transition ease-in-out duration-200"
        disabled={isLoading} onClick={() => {
          onEnter(quizCode);
        }}
      >
        {
          isLoading ? <LoadingSVG className='fill-slate-600 w-10 h-10' /> : 'Enter'
        }
      </button>
    </div>
  </div> ;
});

const JoinQuizWrapper = () => {
  const {isLoading, trigger} = getJoinQuizData();
  const {state, dispatch} = useJoinQuizContext();
  const [isErr, setIsErr]= useState(false);

  const onEnter = useCallback((code: string) => {
    trigger({
      quizId: code
    })
      .then(res => {
        setIsErr(false);
        console.log(res);
        dispatch({
          type: 'setQuiz',
          payload: res.data
        });
      }).catch(() => {
        setIsErr(true);
      });
  }, [setIsErr, dispatch]);

  if(isErr){
    return <h1>Error Occur</h1>;
  }
  if(state.quizData) {
    return <QuizSuccess data={state.quizData} />;
  }
  return <EnterQuizComp isLoading={isLoading} onEnter={onEnter} />;
};
export const Join = () => {
  return <CreateJoinQuizContextProvider>
    <JoinQuizWrapper/>
  </CreateJoinQuizContextProvider>;
};
