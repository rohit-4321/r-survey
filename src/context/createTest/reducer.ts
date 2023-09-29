import { resetState } from './reducer';
import { useCallback, useState } from 'react';
import { Question, TestSchema } from './CreateTestContext';

/// I just want to use Generics 🙂🙂
export const initialValue: TestSchema= {
  title: 'Title',
  description: 'Descriptions',
  questions: [],
};

export type Handler<T> = (state: TestSchema, payload: T) => TestSchema

export const resetState:Handler<undefined> = () => {
  return initialValue;
};

export const setTitle: Handler<string> = (currState, payload) => {
  return {
    ...currState,
    title : payload
  };
};
export const setDescriptions: Handler<string> = (currState, payload) => {
  return {
    ...currState,
    description: payload
  };
};

export const addQuestion: Handler<undefined> = (currState) => {
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

export const modifyQuestion: Handler<{index: number, question: Question}>  =(currState, payload) => {
  const q = [...currState.questions];
  q[payload.index] = payload.question;
  return {
    ...currState,
    questions: q
  };
};

export const removeAllSelectedOption: Handler<number> = (currState, payload) => {
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

export const addQuestionText: Handler<{
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
export const onQuestionTypeSelected: Handler<{
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
export const onRadioOptionSelect: Handler<{
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

export const onCheckOptionSelect: Handler<{
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

export const setOptionText:Handler<{
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
export const onDeleteOption:Handler<{
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
export const addOption:Handler<{
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

export type AllActionsHandler = {
  setTitle: typeof setTitle,
  setDescriptions:  typeof setDescriptions,
  addQuestion: typeof addQuestion,
  modifyQuestion: typeof modifyQuestion,
  removeAllSelectedOption: typeof removeAllSelectedOption
  onRadioOptionSelect: typeof onRadioOptionSelect,
  onQuestionTypeSelected: typeof onQuestionTypeSelected,
  onCheckOptionSelect: typeof onCheckOptionSelect,
  setOptionText: typeof setOptionText,
  addQuestionText: typeof addQuestionText,
  onDeleteOption: typeof onDeleteOption,
  addOption: typeof addOption,
  resetState: typeof resetState,
}

const actions: AllActionsHandler = {
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
};
export type AllActions = {
  [key in keyof AllActionsHandler]: Parameters<(AllActionsHandler)[key]>[1]
}



export const reducer = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currState: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any,
) => {
  const func = actions[action.type as keyof AllActions];
  return func(currState, action.payload as never);
};

export type DispatchType = Parameters<typeof reducer>[1];

export const useCreateTestState = () => {
  const [state, setState] = useState<TestSchema>(initialValue);
  const dispatch = useCallback(<T extends keyof AllActions, K extends AllActions[T]>(
    {
      type, payload
    }: {
      type: T,
      payload: K,
    }
  ) => {
    setState((state) => reducer(state, {
      type,
      payload
    }));
  }, []);

  return [
    state, dispatch
  ] as const;
};