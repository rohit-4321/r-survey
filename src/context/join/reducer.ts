import { JoinQuizSuccessResponse } from './../../components/join/join.interface';
import { useCallback, useState } from 'react';
import { ExtractSecondParameter, createAllActionMap, ActionHandler } from '..';
import { JoinQuizState } from './JoinQuizContext';


const initialValue: JoinQuizState = {
  isLoading: false,
  answers: {}
};

const setQuiz:ActionHandler<JoinQuizState, JoinQuizSuccessResponse> = (state, payload) => {
  const data = {...state};
  data.quizData = payload;
  return data;
};
const setLoadingState:ActionHandler<JoinQuizState, boolean> = (state, payload) => {
  const data = {...state};
  data.isLoading = payload;
  return data;
};
const setError:ActionHandler<JoinQuizState, string | undefined> = (state, payload) => {
  const data = {...state};
  data.error = payload;
  return data;
};

const setAnswer:ActionHandler<JoinQuizState, {
  questionIndex: number,
  ansArr: string[]
}> = (state, payload) => {
  const data = {...state};
  const getQuestionId = state.quizData?.questions[payload.questionIndex]._id;
  if(!getQuestionId) return state;
  const ans = {
    ...state.answers,
    [getQuestionId]: payload.ansArr
  };
  data.answers = ans;
  return data;
};

const joinQuizSlice  = createAllActionMap({
  initialState: initialValue,
  actions: {
    setQuiz,
    setLoadingState,
    setError,
    setAnswer
  }
});



type DispatchActionType<T, K> = {
  type: T,
  payload: K
};

export type JoinQuizDispatchFunctionType = <T extends keyof typeof joinQuizSlice['actions'], K extends ExtractSecondParameter<typeof joinQuizSlice['actions'][T]>>(
action: DispatchActionType<T, K>
) => void;

export const useJoinQuizState = () => {
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