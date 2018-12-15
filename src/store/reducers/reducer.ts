import { createReducer } from './createReducer'
import { defaultState } from 'src/utils'
import { TAddError, TOpenSnackbar, TSetCurrentUser, TState, TToggleMenu } from 'src/types'
// immer so good
const OPEN_SNACKBAR = (state: TState, action: TOpenSnackbar) => {
  state.snackbar = { open: true, message: action.message, variant: action.variant }
}
const CLOSE_SNACKBAR = (state: TState) => {
  state.snackbar = { ...state.snackbar, open: false }
}
const SET_CURRENT_USER = (state: TState, action: TSetCurrentUser) => {
  if (action.user) {
    state.auth = {
      isAuthenticated: true,
      user: action.user
    }
  } else {
    state.auth = {
      isAuthenticated: false,
      user: null
    }
  }
}
const TOGGLE_MENU = (state: TState, action: TToggleMenu) => {
  state.drawerOpen = action.open
}
const ADD_ERROR = (state: TState, action: TAddError) => {
  state.error = { ...state.error, message: action.error }
}
const REMOVE_ERROR = (state: TState) => {
  state.error = { ...state.error, message: null }
}
const START_LOADING = (state: TState) => {
  state.isLoading = true
}
const STOP_LOADING = (state: TState) => {
  state.isLoading = false
}
const RESET = (state: TState) => defaultState
export const reducer = createReducer(defaultState, {
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
  SET_CURRENT_USER,
  TOGGLE_MENU,
  ADD_ERROR,
  REMOVE_ERROR,
  START_LOADING,
  STOP_LOADING,
  RESET
})
