/* eslint-disable @typescript-eslint/no-explicit-any */
export type ActionHandler<State, Payload> = (state: State, payload: Payload) => State


export type ExtractSecondParameter<T> = T extends (s1: any, b: infer B) => any ? B : never

export function createAllActionMap<K, T extends Record<string, ActionHandler<K, any>>>({
  initialState,
  actions
}: {
  initialState: K,
  actions: T
}
): {
  initialState: K,
  actions : {
    [C in keyof T]: (a : K, b: ExtractSecondParameter<T[C]>) => K
  }
} {
  return {
    initialState,
    actions
  };
}