import { defaultState } from '../defaultState'
import { Reducer } from 'redux'
import { TState, TAction } from 'src/types'
// immer so good
console.log(defaultState)
const pureReducer = (state: TState = defaultState, action: TAction): TState => {
  switch (action.type) {
    case 'OPEN_SNACKBAR':
      const { message, variant } = action
      return { ...state, snackbar: { open: true, message, variant } }
    case 'CLOSE_SNACKBAR':
      return { ...state, snackbar: { ...state.snackbar, open: false } }
    case 'SET_CURRENT_USER':
      if (action.user !== null) {
        return {
          ...state,
          auth: {
            isAuthenticated: true,
            user: action.user
          }
        }
      }
      return {
        ...state,
        auth: { isAuthenticated: false, user: null }
      }
    case 'TOGGLE_MENU':
      return { ...state, drawerOpen: true }
    case 'START_LOADING':
      return { ...state, isLoading: true }
    case 'STOP_LOADING':
      return { ...state, isLoading: false }
    case 'RESET':
      return defaultState
    default:
      return state
  }
}

export const reducer: Reducer<TState, TAction> = pureReducer
