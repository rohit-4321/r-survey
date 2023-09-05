import React, { FC, createContext, useContext, useReducer } from 'react';
import { AllActions, AllActionsHandler, reducer } from './reducer';

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

export const CreateTestContext = createContext<{
  state: TestSchema,
   dispatch: <T extends keyof AllActionsHandler, K extends AllActions[T]>({ type, payload }: {
    type: T;
    payload: K;
}) => void
     }| null>(null);


export const CreateTestProvider:FC<{children: React.ReactNode}> = ({children}) => {
  const [state, reducerDispatch] = useReducer(reducer, initialValue);

  const dispatch = <T extends keyof AllActions, K extends AllActions[T]>(
    {
      type, payload
    }: {
      type: T,
      payload: K,
    }
  ) => {
    console.log('Dispatch funtion called');
    reducerDispatch({
      type,
      payload
    });
  };
  return <CreateTestContext.Provider value={{
    state,
    dispatch
  }}>
    {children}
  </CreateTestContext.Provider>;
};

export const useCreateTestContext = () => {
  const ctx = useContext(CreateTestContext);
  if(!ctx) {
    throw new Error('useCreateTestContext in not inside it\'s provider');
  }
  return ctx;
};