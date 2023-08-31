import React, { FC, createContext, useContext, useReducer } from 'react';

export interface TestSchema {
    title: string
    description: string
    questions: Question[]
}
export interface Question {
    value: string,
    type: 'multi' | 'single'
    options: string[],
    answer: string[]
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
      answer: [],
      type: 'single',
      options: [],
    };
    return {
      ...currState,
      questions: [...currState.questions, ques]
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