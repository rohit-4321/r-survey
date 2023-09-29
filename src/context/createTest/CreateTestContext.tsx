import React, { FC, createContext, useContext } from 'react';
import { AllActions, AllActionsHandler, useCreateTestState } from './reducer';

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

export const CreateTestContext = createContext<{
  state: TestSchema,
  dispatch: <T extends keyof AllActionsHandler, K extends AllActions[T]>({ type, payload }: {
    type: T;
    payload: K;
  }) => void
    } | null>(null);


export const CreateTestProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useCreateTestState();
 
  return <CreateTestContext.Provider value={{
    state,
    dispatch
  }}>
    {children}
  </CreateTestContext.Provider>;
};

export const useCreateTestContext = () => {
  const ctx = useContext(CreateTestContext);
  if (!ctx) {
    throw new Error('useCreateTestContext is not inside it\'s provider');
  }
  return ctx;
};