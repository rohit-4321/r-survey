import { TextArea } from '../ui/TextArea';
import DeleteIcon from '@mui/icons-material/Delete';
import Option  from './Option';
import {useCallback, useMemo} from 'react';
import { Question, useCreateTestContext,  } from '../../context/createTest/CreateTestContext';


type QuestionsCreateProps = {
  question: Question,
  quesIndex:number,
  onQuestionTypeSelect:(value: 'multi' | 'single') => void,
  setQuestionText: (ques: string) => void,
  setOptiontext: (value:string, optIndex: number) => void,
  onDeleteOption: (optIndex: number) => void,
  onRadioSelected: (optIndex: number) => void,
  onCheckboxSlected: (optIndex: number) => void,
  addOption: () => void
}
const QuestionCreate = ({
  question,
  quesIndex,
  onQuestionTypeSelect,
  setQuestionText,
  onRadioSelected,
  onDeleteOption,
  onCheckboxSlected,
  setOptiontext,
  addOption
}: QuestionsCreateProps) => {
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
          setQuestionText(e.target.value);
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
                setOptiontext(e.target.value, i);
              }}
              className='bg-transparent line-clamp-none outline-none resize-none  w-full'
            />
            <DeleteIcon
              className='cursor-pointer' 
              onClick={()=> {
                onDeleteOption(i);
              } } />
          </div>
        )) : question.options.map((opt, optionIndex) => (
          <div className='flex items-center gap-3' key={optionIndex}>
            <div onClick={() => {
              onCheckboxSlected(optionIndex);
            }}>
              <Option
                optionType='checkbox'
                isSelected={question.options[optionIndex].isSelected}
              />
            </div>
            <TextArea
              value={opt.value}
              placeholder={`Option ${optionIndex + 1}`}
              onChange={(e) => {
                setOptiontext(e.target.value, optionIndex);
              }}
              className='bg-transparent line-clamp-none outline-none resize-none  w-full'
            />
            <DeleteIcon className='cursor-pointer' onClick={()=> {
              onDeleteOption(optionIndex);
            } } />
          </div>
        ))
    }
    <button className='self-start bg-green-700 text-teal-50 font-semibold px-3 py-1 rounded' onClick={() => {
      addOption();
    }}>+ OPTION</button>
  </div>;
};

const QuestionCreateWrapper = ({
  quesIndex,
  question
}: Pick<QuestionsCreateProps, 'question' | 'quesIndex'>) => {
  const {dispatch} = useCreateTestContext();
  const onRadioOptionSelected = useCallback((optionIndex: number) => {
    dispatch({
      type: 'onRadioOptionSelect',
      payload: {
        quesIndex,
        optionIndex
      }
    });
  },[dispatch]);

  const onQuestionTypeSelected = useCallback((value: 'multi' | 'single') => {
    dispatch({
      type: 'onQuestionTypeSelected',
      payload: {
        quesIndex,
        value,
      }
    });
  }, [dispatch]);

  const onCheckboxSelected = useCallback((optionIndex: number) => {
    dispatch({
      type: 'onCheckOptionSelect',
      payload: {
        quesIndex,
        optionIndex,
      }
    });
  },[dispatch]);
  const setOptionText = useCallback((value: string, optionIndex: number) => {
    console.log(value);
    dispatch({
      type: 'setOptionText',
      payload: {
        quesIndex: quesIndex,
        optionIndex: optionIndex,
        value,
      }
    });
  },[dispatch]);
  const setQuestionText = useCallback((value: string) => {
    dispatch({
      type: 'addQuestionText',
      payload: {
        quesIndex,
        value,
      }
    });
  },[dispatch]);
  const deleteQuestion = useCallback((optionIndex: number) => {
    dispatch({
      type: 'onDeleteOption',
      payload: {
        quesIndex,
        optionIndex
      }
    });
  },[dispatch]);
  const addOption = useCallback(() => {
    console.log('vcalles');
    dispatch({
      type: 'addOption',
      payload: {
        quesIndex,
      }
    });
  }, [dispatch]);


  return useMemo(() => <QuestionCreate
    onRadioSelected={onRadioOptionSelected}
    quesIndex={quesIndex}
    question={question}
    onQuestionTypeSelect={onQuestionTypeSelected}
    onCheckboxSlected={onCheckboxSelected}
    setOptiontext={setOptionText}
    setQuestionText={setQuestionText}
    onDeleteOption={deleteQuestion}
    addOption={addOption}
  />,[
    addOption,
    deleteQuestion,
    setQuestionText,
    setOptionText,
    onCheckboxSelected,
    onQuestionTypeSelected,
    question,
    quesIndex,
    onRadioOptionSelected
  ]);
};

export default QuestionCreateWrapper;