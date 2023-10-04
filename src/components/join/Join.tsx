/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import { LoadingSVG } from '../../assets/LoadingSVG';
import { JoinQuizSuccessResponse } from './join.interface';
import { CreateJoinQuizContextProvider } from '../../context/join/JoinQuizContext';
import { getJoinQuizData } from '../../hooks/apis/getJoinQuiz';



type quesType = 'multi' | 'single'
interface QuizSuccessProps {
  data: JoinQuizSuccessResponse
}
const QuizSuccess:FC<QuizSuccessProps> = ({
  data
}) => {
  return (
    <div className='md:w-[70%] w-[98%] flex flex-col gap-5 text-slate-100 mx-auto my-6'>
      <section className='quizHeader'>
        <div>
          {data.title}
        </div>
        <div>
          {data.description}
        </div>
        <section className='questions'>
          {data.questions.map((ques) => {
            if(ques.type as quesType == 'multi'){
              return <div key={ques._id}>
                {ques.value}
              </div>;
            }
            return <div key={ques._id}>
              {ques.value}
            </div>;
          })}
        </section>
      </section>
    </div>
  );
};

interface EnterQuizCompProps {
  onEnter: (quizCode: string) => void
  isLoading: boolean,
  error?: string,
} 
const EnterQuizComp:FC<EnterQuizCompProps> = ({isLoading, error, onEnter}) => {
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
};
const JoinQuizWrapper = () => {
  const {isLoading, trigger} = getJoinQuizData();
  const [data, setData] = useState<any>();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onEnter = (code: string) => {
    trigger({
      quizId: code
    })
      .then(res => {
        setData(res.data);
      });
  };
  return <EnterQuizComp isLoading={isLoading} onEnter={onEnter} />;
};
export const Join = () => {
  return <CreateJoinQuizContextProvider>
    <JoinQuizWrapper/>
  </CreateJoinQuizContextProvider>;
};
