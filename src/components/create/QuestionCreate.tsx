import { TextArea } from '../ui/TextArea';
import React , {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
export const QuestionCreate = () => {
  const [ques, setQues] = useState('');
  const [quesType, setQuesType] = useState<'multi' | 'single'>('single');
  const [options, setOptions] = useState<string[]>(['']);
  return <div className='flex flex-col gap-4 py-6 px-3 rounded border bg-slate-800 border-slate-700'>
    <select
      className='outline-none bg-slate-700 w-[20rem] px-2 py-1'
      value={quesType} 
      name='question-type' 
      onChange={(e) => {
        setQuesType(e.target.value as 'multi' | 'single');
      }}
    >
      <option value='multi'>Multiple Choice</option>
      <option value='single'>Single Choice</option>
    </select>
    <div className="flex gap-3">
      <span className='text-xl'>Q1.</span>
      <TextArea
        placeholder='Enter Question 1'
        className='bg-transparent line-clamp-none outline-none resize-none text-xl w-full'
        onChange={(e) => {
          setQues(e.target.value);
        }}
        value={ques}
      />
    </div>
    {
      options.map((opt, i) => (
        <div className='flex items-center gap-3' key={i}>
          <input type='radio' className=''/>
          <TextArea
            value={opt}
            placeholder={`Option ${i + 1}`}
            onChange={(e) => {
              setOptions((op) => {
                console.log(e.target.value);
                const o = [...op];
                o[i] = e.target.value;
                console.log(o);
                return o;
              });
            }}
            className='bg-transparent line-clamp-none outline-none resize-none  w-full'
          />
          <DeleteIcon className='cursor-pointer' onClick={()=> {
            const op = [...options];
            op.splice(i, 1);
            setOptions(op);
          } } />
        </div>
      ))
    }
    <button className='self-start bg-green-700 text-teal-50 font-semibold px-3 py-1 rounded' onClick={() => {
      setOptions((op)=> [...op, '']);
    }}>+ OPTION</button>
  </div>;
};