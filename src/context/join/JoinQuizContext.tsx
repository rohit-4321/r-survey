import { FC, createContext, useContext } from 'react';
import { JoinQuizSuccessResponse } from '../../components/join/join.interface';
import { JoinQuizDispatchFunctionType, useJoinQuizState } from './reducer';


export interface JoinQuizState {
    isLoading: boolean,
    error?: string,
    quizData?: JoinQuizSuccessResponse
    answers: Record<string,string[]>
}
export const JoinQuizContext = createContext<{
    state: JoinQuizState,
    dispatch: JoinQuizDispatchFunctionType
} | null>(null);

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
