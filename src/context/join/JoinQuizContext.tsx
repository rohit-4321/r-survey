import { FC, createContext, useCallback, useContext, useState } from 'react';
import { JoinQuizSuccessResponse } from '../../components/join/join.interface';
import { JoinQuizDispatchFunctionType, initialValue, joinQuizSlice } from './reducer';


export interface JoinQuizState {
    quizId: string,
    creatorEmail: string
    quizData: JoinQuizSuccessResponse | null
    answers: Record<string,string[]>
}
export const JoinQuizContext = createContext<{
    state: JoinQuizState,
    dispatch: JoinQuizDispatchFunctionType
} | null>(null);



const useJoinQuizState = () => {
  const [state, setState] = useState<JoinQuizState>(initialValue);
  const dispatch:JoinQuizDispatchFunctionType = useCallback(({type, payload}) => {
    setState((currState) => {
      const func =joinQuizSlice['actions'][type];
      return func(currState, payload);
    });
  }, []);

  return [
    state, dispatch
  ] as const;
};

export const CreateJoinQuizContextProvider:FC<{
    children: React.ReactNode
}> = ({children}) => {
  const [state, dispatch] = useJoinQuizState();
  return <JoinQuizContext.Provider value={{state, dispatch}}>
    {children}
  </JoinQuizContext.Provider>;
};



export const useJoinQuizContext = () => {
  const ctx = useContext(JoinQuizContext);
  if (!ctx) {
    throw new Error('useCreateTestContext is not inside it\'s provider');
  }
  return ctx;
};
