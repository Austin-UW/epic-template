import { combineReducers } from 'redux'
import { snackbarReducer } from './snackbar'
import { loadingReducer } from './loading'

export const reducer = combineReducers({
  isLoading: loadingReducer,
  snackbar: snackbarReducer
})
