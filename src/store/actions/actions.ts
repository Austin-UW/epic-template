import { TAction, TUser } from 'src/types'
import { Dispatch } from 'redux'
import { API } from 'src/utils'
import { startLoadingA, stopLoadingA, removeErrorA } from '..'
export const setCurrentUserA = (user: TUser): TAction => {
  return {
    type: 'SET_CURRENT_USER',
    user
  }
}
export const toggleA = (open: boolean): TAction => ({ type: 'TOGGLE_MENU', open })

export const logoutA = () => {
  return (dispatch: Dispatch) => {
    localStorage.clear()
    API.setToken(null)
    dispatch(startLoadingA())
    dispatch(setCurrentUserA(null))
    dispatch(removeErrorA())
    dispatch(stopLoadingA())
  }
}
