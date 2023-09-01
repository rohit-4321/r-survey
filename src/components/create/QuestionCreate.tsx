import { TextArea } from '../ui/TextArea';
import DeleteIcon from '@mui/icons-material/Delete';
import { Option } from './Option';
import { Question,  } from '../../context/CreateTestContext';


type QuestionsCreateProps = {
  question: Question,
  setQuestion: (index: number, ques: Question) => void,
  quesIndex:number
}
export const QuestionCreate = ({
  question,
  setQuestion,
  quesIndex
}: QuestionsCreateProps) => {
  return <div className='flex flex-col gap-4 py-6 px-3 rounded border bg-slate-800 border-slate-700'>
    <select
      className='outline-none bg-slate-700 w-[20rem] px-2 py-1'
      value={question.type} 
      name='question-type' 
      onChange={(e) => {
        setQuestion(quesIndex,{
          ...question, 
          type: e.target.value as  'multi' | 'single'
        });
      }}
    >
      <option value='multi'>Multiple Choice</option>
      <option value='single'>Single Choice</option>
    </select>
    <div className="flex gap-3">
      <span className='text-xl'>Q{quesIndex+1}.</span>
      <TextArea
        placeholder={`Enter Question ${quesIndex + 1}`}
        className='bg-transparent line-clamp-none outline-none resize-none text-xl w-full'
        onChange={(e) => {
          setQuestion(quesIndex, {
            ...question,
            value: e.target.value
          });
        }}
        value={question.value}
      />
    </div>
    {
      question.options.map((opt, i) => (
        <div className='flex items-center gap-3' key={i}>
          <div onClick={() => {
            const o : Question = {
              ...question,
              answer: [i]
            };
            setQuestion(quesIndex, o);
          }}>
            <Option isSelected={question.answer[0] === i}  />
          </div>
          <TextArea
            value={opt}
            placeholder={`Option ${i + 1}`}
            onChange={(e) => {
              const o = [...question.options];
              o[i] = e.target.value;
              setQuestion(quesIndex, {
                ...question,
                options: o
              });
            }}
            className='bg-transparent line-clamp-none outline-none resize-none  w-full'
          />
          <DeleteIcon className='cursor-pointer' onClick={()=> {
            const op = [...question.options];
            op.splice(i, 1);
            setQuestion(quesIndex, {
              ...question,
              options: op
            });
          } } />
        </div>
      ))
    }
    <button className='self-start bg-green-700 text-teal-50 font-semibold px-3 py-1 rounded' onClick={() => {
      setQuestion(quesIndex, {
        ...question,
        options:[
          ...question.options,
          ''
        ]
      });
    }}>+ OPTION</button>
  </div>;
};