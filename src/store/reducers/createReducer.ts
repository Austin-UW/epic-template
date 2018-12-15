/**
 * basically, immer makes it so that we can mutate state!
 * this is a utlity function
 * @example
 * const handler = (state, action) => {
 *   state.canBeMutated = true
 * }
 * createReducer(defaultState, {
 *   ACTION_NAME_NO_STRING: handler // handler should not be called as handler()
 * })
 */
import createNextState from 'immer'
import { TState, TAction } from 'src/types'
// with immer so we can feel mutable!
export function createReducer(initialState: TState, actionsMap: any) {
  return (state: TState = initialState, action: TAction) => {
    return createNextState(state, (draft: any) => {
      const caseReducer = actionsMap[action.type]

      if (caseReducer) {
        return caseReducer(draft, action)
      }

      return draft
    })
  }
}
