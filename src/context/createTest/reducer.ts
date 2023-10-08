import { useCallback, useState } from 'react';
import { Question, TestSchema } from './CreateTestContext';
import { ActionHandler, ExtractSecondParameter, createAllActionMap } from '..';

/// I just want to use Generics 🙂🙂
export const initialValue: TestSchema= {
  title: 'Title',
  description: 'Descriptions',
  questions: [],
};


export const resetState:ActionHandler<TestSchema,undefined> = () => {
  return initialValue;
};

export const setTitle: ActionHandler<TestSchema,string> = (currState, payload) => {
  return {
    ...currState,
    title : payload
  };
};
export const setDescriptions: ActionHandler<TestSchema,string> = (currState, payload) => {
  return {
    ...currState,
    description: payload
  };
};

export const addQuestion: ActionHandler<TestSchema,undefined> = (currState) => {
  const ques: Question = {
    value: '',
    type: 'single',
    options: [],
  };
  return {
    ...currState,
    questions: [...currState.questions, ques]
  };
};

export const modifyQuestion: ActionHandler<TestSchema,{index: number, question: Question}>  =(currState, payload) => {
  const q = [...currState.questions];
  q[payload.index] = payload.question;
  return {
    ...currState,
    questions: q
  };
};

export const removeAllSelectedOption: ActionHandler<TestSchema,number> = (currState, payload) => {
  const quesList = [...currState.questions];
  const questionToModify = { ...quesList[payload] };
  const optionsToModify = [...questionToModify.options];
  const updatedOptions = optionsToModify.map((option) => ({
    ...option,
    isSelected: false
  }));
  questionToModify.options = updatedOptions;
  quesList[payload] = questionToModify;
  return {
    ...currState,
    questions: quesList
  };
};

export const addQuestionText: ActionHandler<TestSchema,{
  quesIndex: number,
  value: string
}> = (
  currState,
  {
    quesIndex,
    value
  }
) => {
  const quesList = [...currState.questions];
  quesList[quesIndex]= {
    ...quesList[quesIndex],
    value,
  };

  return {
    ...currState,
    questions: quesList,
  };
};
export const onQuestionTypeSelected: ActionHandler<TestSchema,{
  quesIndex: number,
  value: 'multi' | 'single'
}> = (currState, {
  quesIndex, value
}) => {
  const quesList = [...currState.questions];
  const options = [...quesList[quesIndex].options];
  const updatedOptions = options.map((op) => ({
    ...op,
    isSelected: false
  }));
  const updatedQuestion = { 
    ...quesList[quesIndex], 
    options: updatedOptions,
    type: value 
  };
  quesList[quesIndex] = updatedQuestion;
  return {
    ...currState,
    questions: quesList
  };
};
export const onRadioOptionSelect: ActionHandler<TestSchema,{
  quesIndex: number,
  optionIndex: number
}> = (
  currState, {
    quesIndex,
    optionIndex
  }
) => {
  const quesList = [...currState.questions];

  const options = [...quesList[quesIndex].options];

  const updatedOptions = options.map((op, i) => ({
    ...op,
    isSelected: i === optionIndex ? !op.isSelected : false
  }));

  const updatedQuestion = { ...quesList[quesIndex], options: updatedOptions };

  quesList[quesIndex] = updatedQuestion;

  return {
    ...currState,
    questions: quesList
  };
};

export const onCheckOptionSelect: ActionHandler<TestSchema,{
  quesIndex: number,
  optionIndex: number
}> = (
  currState, {
    quesIndex,
    optionIndex
  }
) => {
  const quesList = [...currState.questions];
  const options = [...quesList[quesIndex].options];
  const updatedOption = {
    ...options[optionIndex],
    isSelected: !options[optionIndex].isSelected
  };
  options[optionIndex] = updatedOption;
  const updatedQuestion = { ...quesList[quesIndex], options };
  quesList[quesIndex] = updatedQuestion;
  return {
    ...currState,
    questions: quesList
  };
};

export const setOptionText:ActionHandler<TestSchema,{
  quesIndex: number,
  optionIndex: number,
  value: string
}> = (currState, {
  optionIndex,
  quesIndex,
  value
}) => {
  const quesList = [...currState.questions];
  const options = [...quesList[quesIndex].options];
  const updatedOption = { ...options[optionIndex], value };
  options[optionIndex] = updatedOption;
  const updatedQuestion = { ...quesList[quesIndex], options };
  quesList[quesIndex] = updatedQuestion;
 
  return {
    ...currState,
    questions: quesList
  };
};
export const onDeleteOption:ActionHandler<TestSchema,{
  quesIndex: number,
  optionIndex: number
}> = (
  currState,
  {quesIndex, optionIndex}
) => {
  const quesList = [...currState.questions];
  
  const options = [...quesList[quesIndex].options];
  
  options.splice(optionIndex, 1);
  
  const updatedQuestion = { ...quesList[quesIndex], options };
  
  quesList[quesIndex] = updatedQuestion;

  return {
    ...currState,
    questions: quesList
  };
};
export const addOption:ActionHandler<TestSchema,{
  quesIndex: number,
}> = (
  currState,
  {
    quesIndex
  }
) => {
  const quesList = [...currState.questions];
  const question = {
    ...quesList[quesIndex]
  };
  question.options = [...question.options, {
    isSelected: false,
    value: ''
  }]; 
  quesList[quesIndex] = question;
  return {
    ...currState,
    questions: quesList
  };
};


const createQuizSlice  = createAllActionMap({
  initialState: initialValue,
  actions: {
    addQuestion,
    modifyQuestion,
    removeAllSelectedOption,
    setDescriptions,
    setTitle,
    onRadioOptionSelect,
    onQuestionTypeSelected,
    onCheckOptionSelect,
    setOptionText,
    addQuestionText,
    onDeleteOption,
    addOption,
    resetState
  }
});



type DispatchActionType<T, K> = {
  type: T,
  payload: K
};

export type DispatchFunctionType = <T extends keyof typeof createQuizSlice['actions'], K extends ExtractSecondParameter<typeof createQuizSlice['actions'][T]>>(
action: DispatchActionType<T, K>
) => void;

export const useCreateTestState = () => {
  const [state, setState] = useState<TestSchema>(initialValue);
  const dispatch:DispatchFunctionType = useCallback(({type, payload}) => {
    setState((currState) => {
      const func =createQuizSlice['actions'][type];
      return func(currState, payload);
    });
  }, []);

  return [
    state, dispatch
  ] as const;
};