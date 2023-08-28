import React, { FC, createContext, useRef } from 'react';

interface TestSchema {
    title: string
    description: string
    questions: Question[]
}
interface Question {
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

export const CreateTestContext = createContext<{
    state: TestSchema
}>({
  state: initialValue
});

export const CreateTestProvider:FC<{children: React.ReactNode}> = ({children}) => {
  const testState = useRef(initialValue);
  return <CreateTestContext.Provider value={{
    state: testState.current
  }}>
    {children}
  </CreateTestContext.Provider>;
};