import React, { FC, createContext, useContext, useReducer } from 'react';

export interface TestSchema {
    title: string
    description: string
    questions: Question[]
}
export interface Question {
    value: string,
    type: 'multi' | 'single'
    options: {
      value: string,
      isSelected: boolean
    }[],

}
const initialValue: TestSchema= {
  title: 'Title',
  description: 'Descriptions',
  questions: [],
};

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



const reducer = (currState: TestSchema, action: CreateAction) : TestSchema => {
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
export const CreateTestContext = createContext<{
  state: TestSchema,
   dispatch: React.Dispatch<CreateAction>
} | null>(null);


export const CreateTestProvider:FC<{children: React.ReactNode}> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return <CreateTestContext.Provider value={{
    state,
    dispatch
  }}>
    {children}
  </CreateTestContext.Provider>;
};

export const useCreateTestContext = () => {
  const ctx = useContext(CreateTestContext);
  // console.log(ctx);
  if(!ctx) {
    throw new Error('useCreateTestContext in not inside it\'s provider');
  }
  return ctx;
};