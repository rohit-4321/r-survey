import { Question, TestSchema } from './CreateTestContext';

/// I just want to use Generics 🙂🙂
export const initialValue: TestSchema= {
  title: 'Title',
  description: 'Descriptions',
  questions: [],
};

export type Handler<T> = (state: TestSchema, payload: T) => TestSchema

export const setTitle: Handler<string> = (currState, payload) => {
  return {
    ...currState,
    title : payload
  };
};
export const setDescriptions: Handler<string> = (currState, payload) => {
  return {
    ...currState,
    description: payload
  };
};

export const addQuestion: Handler<undefined> = (currState) => {
  const ques: Question = {
    value: '',
    type: 'single',
    options: [],
  };
  return {
    ...currState,
    questions: [...currState.questions, ques]
  };
};

export const modifyQuestion: Handler<{index: number, question: Question}>  =(currState, payload) => {
  const q = [...currState.questions];
  q[payload.index] = payload.question;
  return {
    ...currState,
    questions: q
  };
};

export const removeAllSelectedOption: Handler<number> = (currState, payload) => {
  const temp= [...currState.questions];
  temp[payload].options = temp[payload].options.map((o) => ({
    ...o,
    isSelected: false,
  }));
  return {
    ...currState,
    questions: temp
  };
};

export type AllActionsHandler = {
  setTitle: typeof setTitle,
  setDescriptions:  typeof setDescriptions,
  addQuestion: typeof addQuestion,
  modifyQuestion: typeof modifyQuestion,
  removeAllSelectedOption: typeof removeAllSelectedOption
}

const actions: AllActionsHandler = {
  addQuestion,
  modifyQuestion,
  removeAllSelectedOption,
  setDescriptions,
  setTitle,
};
export type AllActions = {
  [key in keyof AllActionsHandler]: Parameters<(AllActionsHandler)[key]>[1]
}



export const reducer = <T extends keyof AllActions,  K extends AllActions[T]>(
  currState: TestSchema,
  action: {key: T, payload: K
}) : TestSchema => {
  const func = actions[action.key];
  return func(currState, action as never);
};

export type DispatchType = Parameters<typeof reducer>[1];