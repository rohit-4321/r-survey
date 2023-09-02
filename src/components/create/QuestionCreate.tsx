import { TextArea } from '../ui/TextArea';
import DeleteIcon from '@mui/icons-material/Delete';
import { Option } from './Option';
import { Question,  } from '../../context/createTest/CreateTestContext';


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
  const onQuestionTypeSelect = (value:  'multi' | 'single') => {
    
    const optArr = question.options.map((op) => ({
      ...op,
      isSelected: false
    }));
    setQuestion(quesIndex,{
      ...question,
      type: value,
      options: optArr
    });

  };

  const onCheckBoxSelect = (optIndex: number) => {
    const optArr = [...question.options];

    optArr[optIndex] = {
      ...optArr[optIndex],
      isSelected: !optArr[optIndex].isSelected
    };

    setQuestion(quesIndex, {
      ...question,
      options: optArr
    });
  };
  const onRadioSelected = (optIndex: number) => {
    let optArr = [...question.options];
    optArr = optArr.map((op, i) => {

      return ({
        ...op,
        isSelected:optIndex === i ? !op.isSelected : false
      });
    }); 
    setQuestion(quesIndex, {
      ...question,
      options: optArr
    });
  };
  return <div className='flex flex-col gap-4 py-6 px-3 rounded border bg-slate-800 border-slate-700'>
    <select
      className='outline-none bg-slate-700 w-[20rem] px-2 py-1'
      value={question.type} 
      name='question-type' 
      onChange={(e) => {
        onQuestionTypeSelect(e.target.value as  'multi' | 'single');
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
      question.type === 'single' ?
        question.options.map((opt, i) => (
          <div className='flex items-center gap-3' key={i}>
            <div onClick={() => {
              onRadioSelected(i);
            }}>
              <Option optionType='radio' isSelected={question.options[i].isSelected}  />
            </div>
            <TextArea
              value={opt.value}
              placeholder={`Option ${i + 1}`}
              onChange={(e) => {
                const o = [...question.options];
                o[i].value = e.target.value;
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
        )) : question.options.map((opt, i) => (
          <div className='flex items-center gap-3' key={i}>
            <div onClick={() => {
              onCheckBoxSelect(i);
            }}>
              <Option optionType='checkbox' isSelected={question.options[i].isSelected}  />
            </div>
            <TextArea
              value={opt.value}
              placeholder={`Option ${i + 1}`}
              onChange={(e) => {
                const o = [...question.options];
                o[i].value = e.target.value;
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
          {
            value: '',
            isSelected: false
          }
        ]
      });
    }}>+ OPTION</button>
  </div>;
};