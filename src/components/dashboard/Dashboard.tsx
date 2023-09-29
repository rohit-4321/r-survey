
import { FC } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { createSnackbar } from '../../global';
import { useAllQuizesData } from './useAllQuizesData';
import { copyToClipBoard, formatDateTime } from '../../global/utils';

interface QuizCardProps {
  title: string,
  description: string,
  createdAt: string,
  numberOfResponses: number,
  lastResponse: string,
  numberOfQuestions: number,
  code: string 

}
export const Dashboard = () => {
  const {data, loading } = useAllQuizesData();
  return <div className='wrapper lg:w-[85%] w-[96%] flex flex-col gap-5 text-slate-100 font-light mx-auto my-6'>
    <h1 className='text-gray-200 text-3xl font-semibold border-gray-800 border-b-[2px] py-2'>Quizes Created</h1>
    {/* <div className='w-[400px] self-center'>
      <EmptyQuizSvg  />
    </div> */}
    {
      loading ? <h1>Loading...</h1>
        : <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {
            data.map((i)  => (<QuizCard 
              key={i._id}
              title={i.title}
              description={i.description}
              createdAt={i.createdAt}
              lastResponse={i.lastResponse}
              numberOfQuestions={i.numberOfQuestions}
              numberOfResponses={i.numberOfResponses}
              code={i._id}
            />))
          }
        </div>

    }
  </div>;
};



const QuizCard:FC<QuizCardProps> = ({
  title, 
  description,
  createdAt,
  lastResponse,
  numberOfQuestions,
  numberOfResponses,
  code
}) => {

  return <div className="rounded-lg overflow-hidden bg-gray-800 border border-gray-600 p-6 hover:bg-[#1B232F] cursor-pointer transition-all">
    <h1 className="text-gray-300 text-3xl font-semibold overflow-hidden text-ellipsis line-clamp-1">{title}</h1>
    <p className="text-gray-400 text-sm line-clamp-2 overflow-hidden text-ellipsis font-normal mt-2">{description}</p>
    <div className='flex  items-center text-center border-gray-600 border-[1px] rounded-md px-2 py-1 mt-4 justify-between'>

      <span className='text-gray-300 text-base font-normal overflow-hidden text-ellipsis'>{code}</span>
      
      <div className='hover:bg-[#2b3c55] transition-all decoration-purple-500 rounded-full p-2 flex items-center justify-center'
        onClick={() => {
          copyToClipBoard(code);
          createSnackbar({
            message: 'Copied',
            varient: 'success',
            duration: 'short'
          });
        }}>
        <ContentCopyIcon className='text-gray-300 shrink-0' fontSize="small" />
      </div>
    </div>
    <div className="flex justify-between text-sm mt-4">
      <div>
        <p className="text-gray-400 font-semibold">Created At</p>
        <p className="text-gray-300">{formatDateTime(createdAt)}</p>
        <p className="text-gray-400 font-semibold mt-2">Last Response</p>
        <p className="text-gray-300">{lastResponse}</p>
      </div>
      <div>
        <p className="text-gray-400 font-semibold">No of Responses</p>
        <p className="text-gray-300">{numberOfResponses}</p>
        <p className="text-gray-400 font-semibold mt-2">No of Questions</p>
        <p className="text-gray-300">{numberOfQuestions}</p>
      </div>
    </div>
  </div> ;
};




{/* <div className='flex flex-col gap-2 border-[1px] border-slate-700 rounded px-6 py-5 bg-[#171C28]'>
    <span className=' text-cyan-200 text-3xl font-medium'>{title}</span>
    <span className='text-slate-400 text-sm line-clamp-2 overflow-hidden text-ellipsis from-neutral-300 font-normal'>{description}</span>
    <div className='flex justify-between text-[0.9rem]'>
      <div>
        <p><span className='text-slate-400 font-semibold'>Created At:</span> {createdAt}</p>
        <p><span className='text-slate-400 font-semibold'>Last Response:</span> {lastResponse}</p>
      </div>
      <div>
        <p><span className='text-slate-400 font-semibold'>No of Response:</span> {numberOfResponses}</p>
        <p><span className='text-slate-400 font-semibold'>No of Questions:</span> {numberOfQuestions}</p>
      </div>
    </div>
  </div> */}