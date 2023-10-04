import { FC, createContext, useContext } from 'react';
import { JoinQuizSuccessResponse } from '../../components/join/join.interface';


interface JoinQuizState {
    isLoading: boolean,
    error?: string,
    quizData?: JoinQuizSuccessResponse
    answers: Record<string,string[]>
}
export const JoinQuizContext = createContext<{
    state: JoinQuizState,
    // dispatch: 
} | null>(null);

export const CreateJoinQuizContextProvider:FC<{
    children: React.ReactNode
}> = ({children}) => {
  const {state} = useJoinQuizContext();

  return <JoinQuizContext.Provider value={{state}}>
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
