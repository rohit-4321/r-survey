import { Question, TestSchema } from './CreateTestContext';

type Action<T, K> = {
    type: T,
    payload: K
  }
export type CreateAction = Action<'setTitle', string>
   | Action<'setDescriptions', string>
   | Action<'addQuestion', undefined>
   | Action<'modifyQuestion', {
      index: number,
      question: Question
    }>
   | Action<'removeAllSelectedOption', number>
  
  
  
export const reducer = (currState: TestSchema, action: CreateAction) : TestSchema => {
  switch (action.type) {
  case 'setTitle': {
    return {
      ...currState,
      title : action.payload
    };
  }
  case 'setDescriptions': {
    return {
      ...currState,
      description: action.payload
    };
  } 
  case 'addQuestion': {
    const ques: Question = {
      value: '',
      type: 'single',
      options: [],
    };
    return {
      ...currState,
      questions: [...currState.questions, ques]
    };
  }
  case 'modifyQuestion' : {
    const q = [...currState.questions];
    q[action.payload.index] = action.payload.question;
    return {
      ...currState,
      questions: q
    };
  }
  case 'removeAllSelectedOption': {
    const temp= [...currState.questions];
    temp[action.payload].options = temp[action.payload].options.map((o) => ({
      ...o,
      isSelected: false,
    }));
    return {
      ...currState,
      questions: temp
    };
  }
  }
};

  
  