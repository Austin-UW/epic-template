import { Reducer } from 'redux'
import { TLoadingAction } from '../actions/types'

export const loadingReducer: Reducer<boolean, TLoadingAction> = (
  loading: boolean = false,
  action
) => {
  switch (action.type) {
    case 'START_LOADING':
      return true
    case 'STOP_LOADING':
      return false
    default:
      return loading
  }
}
