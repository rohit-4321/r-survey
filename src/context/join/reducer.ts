import { JoinQuizSuccessResponse } from './../../components/join/join.interface';
import { ExtractSecondParameter, createAllActionMap, ActionHandler } from '..';
import { JoinQuizState } from './JoinQuizContext';


export const initialValue: JoinQuizState = {
  creatorEmail: '',
  quizId: '',
  quizData: null,
  answers: {}
};

const setQuiz:ActionHandler<JoinQuizState, JoinQuizSuccessResponse | null> = (state, payload) => {
  const data = {...state};
  data.quizData = payload;
  data.quizId = payload?._id ?? '';
  data.creatorEmail = payload?.creatorEmail ?? '';

  return data;
};

const setSingleAnswer:ActionHandler<JoinQuizState, {
  quesId: string,
  optionId: string
}> = (state, payload) => {
  const data = {...state};
  const getQuestionId = payload.quesId;
  if(!getQuestionId) return state;
  if(state.answers[getQuestionId] && state.answers[getQuestionId][0] ===  payload.optionId){
    const ans = {
      ...state.answers,
    };
    delete ans[getQuestionId];
    data.answers = ans;
    return data;
  }
  const ans = {
    ...state.answers,
    [getQuestionId]: [payload.optionId]
  };
  data.answers = ans;
  return data;
};

const setMultiAnswer:ActionHandler<JoinQuizState, {
  quesId: string,
  optionId: string
}> = (state, payload) => {
  const data = {...state};
  const getQuestionId = payload.quesId;
  if(!getQuestionId) return state;

  if(state.answers[getQuestionId]){
    const index = state.answers[getQuestionId].indexOf(payload.optionId);
    if(index !== -1){
      const ans = {
        ...state.answers,
      };
      const allAns = [...ans[getQuestionId]];
      allAns.splice(index, 1);
      ans[getQuestionId] = allAns;
      data.answers = ans;
      return data;
    } 
  }
  const ans = {
    ...state.answers,
    [getQuestionId]: [...(state.answers[getQuestionId] ?? []), payload.optionId]
  };
  data.answers = ans;
  return data;
};

export const joinQuizSlice  = createAllActionMap({
  initialState: initialValue,
  actions: {
    setQuiz,
    setSingleAnswer,
    setMultiAnswer
  }
});



type DispatchActionType<T, K> = {
  type: T,
  payload: K
};

export type JoinQuizDispatchFunctionType = <T extends keyof typeof joinQuizSlice['actions'], K extends ExtractSecondParameter<typeof joinQuizSlice['actions'][T]>>(
action: DispatchActionType<T, K>
) => void;
